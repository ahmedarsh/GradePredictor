const pdfParse = require('pdf-parse');
const axios = require('axios');

function pdfTextToDictionary(text) {
    const dictionary = {};
    const lines = text.trim().split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes(':')) {
            const [rawKey, rawValueWithComma] = trimmedLine.split(':').map(part => part.trim());
            const key = rawKey.replace(/[^a-zA-Z0-9_]/g, '');
            let rawValue = rawValueWithComma.replace(/,$/, '').trim();
            let value = rawValue;

            if (value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1);
            } else if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }

            const numberValue = Number(value);
            dictionary[key] = isNaN(numberValue) ? value : numberValue;
        }
    }

    return dictionary;
}

exports.uploadFiles = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const files = Object.values(req.files);
    const analysisResults = []; // Change to an array

    try {
        const analysisPromises = files[0].map(async (file) => {
            try {
                console.log(`Processing file: ${file.name}`);
                const data = await pdfParse(file.data);
                const dataDictionary = pdfTextToDictionary(data.text);
                const response = await axios.post('http://127.0.0.1:5000/predict_grade', { data: dataDictionary });
                return { filename: file.name, analysisId: `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, result: response.data }; // Include analysisId
            } catch (parseError) {
                console.error(`Error parsing PDF file ${file ? file.name : 'undefined'}:`, parseError);
                return { filename: file ? file.name : 'undefined', analysisId: `analysis-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, error: 'Failed to parse PDF' }; // Include analysisId
            }
        });

        const results = await Promise.all(analysisPromises);

        results.forEach(item => {
            analysisResults.push({  // Push objects into the array
                filename: item.filename,
                analysisId: item.analysisId, // Include the ID
                result: item.error ? { error: item.error } : item.result,
            });
        });

        console.log("analysisResults", analysisResults);
        res.status(200).json({  // Send the array in 'initiated'
            message: 'Files uploaded successfully. Analysis initiated in the background.',
            initiated: analysisResults,
        });

    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).send('Error processing files');
    }
};