import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Switch, FormControlLabel, TextField } from '@mui/material';
import axios from 'axios';
import FormSection from './FormSection';
import Dashboard from "../components/Dashboard";
const GradeForm = () => {
  const [formData, setFormData] = useState({
    school: 'GP',
    sex: 'F',
    age: 17,
    address: 'U',
    famsize: 'GT3',
    Pstatus: 'T',
    Medu: 4,
    Fedu: 4,
    Mjob: 'health',
    Fjob: 'other',
    reason: 'course',
    guardian_math: 'mother',
    traveltime_math: 1,
    studytime_math: 2,
    failures_math: 0,
    schoolsup_math: 'yes',
    famsup_math: 'no',
    paid_math: 'no',
    activities_math: 'yes',
    nursery: 'yes',
    higher_math: 'yes',
    internet: 'yes',
    romantic_math: 'no',
    famrel_math: 4,
    freetime_math: 3,
    goout_math: 4,
    Dalc_math: 1,
    Walc_math: 1,
    health_math: 5,
    absences_math: 3,
    G1_math: 15,
    G2_math: 14,
    G3_math: 0,
    guardian_por: 'mother',
    traveltime_por: 1,
    studytime_por: 2,
    failures_por: 0,
    schoolsup_por: 'yes',
    famsup_por: 'no',
    paid_por: 'no',
    activities_por: 'yes',
    higher_por: 'yes',
    romantic_por: 'no',
    famrel_por: 4,
    freetime_por: 3,
    goout_por: 4,
    Dalc_por: 1,
    Walc_por: 1,
    health_por: 5,
    absences_por: 3,
    G1_por: 15,
    G2_por: 14,
    G3_por: 0,
    essay:"I want to become a doctor and help people stay healthy."
  });

  const [predictedGrade, setPredictedGrade] = useState(null);
  const [sentiment, setSentiment] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_grade', { data: [formData] });
      console.log(response.data);
      setPredictedGrade(response.data);
      setSentiment(response.data.sentiment.sentiment)
    } catch (error) {
      console.error('Error predicting grade:', error);
    }
  };



  const [essay, setEssay] = useState('');

  const handleEssayChange = (event) => {
    setEssay(event.target.value);
  };
  

  const personalDetails = [
    { label: 'School', name: 'school', options: [{ value: 'GP', label: 'Gabriel Pereira (GP)' }, { value: 'MS', label: 'Mousinho da Silveira (MS)' }] },
    { label: 'Sex', name: 'sex', options: [{ value: 'F', label: 'Female (F)' }, { value: 'M', label: 'Male (M)' }] },
    { label: 'Age', name: 'age', type: 'number' },
    { label: 'Address', name: 'address', options: [{ value: 'U', label: 'Urban (U)' }, { value: 'R', label: 'Rural (R)' }] },
    { label: 'Family Size', name: 'famsize', options: [{ value: 'LE3', label: 'Less or equal to 3 (LE3)' }, { value: 'GT3', label: 'Greater than 3 (GT3)' }] },
    { label: 'Parent\'s Cohabitation Status', name: 'Pstatus', options: [{ value: 'T', label: 'Living together (T)' }, { value: 'A', label: 'Apart (A)' }] },
    { label: 'Mother\'s Education', name: 'Medu', type: 'number' },
    { label: 'Father\'s Education', name: 'Fedu', type: 'number' },
    { label: 'Mother\'s Job', name: 'Mjob', options: [{ value: 'teacher', label: 'Teacher' }, { value: 'health', label: 'Health' }, { value: 'services', label: 'Civil Services' }, { value: 'at_home', label: 'At Home' }, { value: 'other', label: 'Other' }] },
    { label: 'Father\'s Job', name: 'Fjob', options: [{ value: 'teacher', label: 'Teacher' }, { value: 'health', label: 'Health' }, { value: 'services', label: 'Civil Services' }, { value: 'at_home', label: 'At Home' }, { value: 'other', label: 'Other' }] },
    { label: 'Reason for Choosing School', name: 'reason', options: [{ value: 'home', label: 'Close to Home' }, { value: 'reputation', label: 'School Reputation' }, { value: 'course', label: 'Course Preference' }, { value: 'other', label: 'Other' }] }
  ];

  const mathDetails = [
    { label: 'Guardian (Math)', name: 'guardian_math', options: [{ value: 'mother', label: 'Mother' }, { value: 'father', label: 'Father' }, { value: 'other', label: 'Other' }] },
    { label: 'Travel Time (Math)', name: 'traveltime_math', type: 'number' },
    { label: 'Study Time (Math)', name: 'studytime_math', type: 'number' },
    { label: 'Failures (Math)', name: 'failures_math', type: 'number' },
    { label: 'Extra Educational Support (Math)', name: 'schoolsup_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Family Educational Support (Math)', name: 'famsup_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Extra Paid Classes (Math)', name: 'paid_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Extra-curricular Activities (Math)', name: 'activities_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Wants to Take Higher Education (Math)', name: 'higher_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Romantic Relationship (Math)', name: 'romantic_math', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Quality of Family Relationships (Math)', name: 'famrel_math', type: 'number' },
    { label: 'Free Time After School (Math)', name: 'freetime_math', type: 'number' },
    { label: 'Going Out with Friends (Math)', name: 'goout_math', type: 'number' },
    { label: 'Workday Alcohol Consumption (Math)', name: 'Dalc_math', type: 'number' },
    { label: 'Weekend Alcohol Consumption (Math)', name: 'Walc_math', type: 'number' },
    { label: 'Current Health Status (Math)', name: 'health_math', type: 'number' },
    { label: 'Number of School Absences (Math)', name: 'absences_math', type: 'number' },
    { label: 'First Period Grade (Math)', name: 'G1_math', type: 'number' },
    { label: 'Second Period Grade (Math)', name: 'G2_math', type: 'number' },
    { label: 'Final Grade (Math)', name: 'G3_math', type: 'number' }
  ];

  const portugueseDetails = [
    { label: 'Guardian (Portuguese)', name: 'guardian_por', options: [{ value: 'mother', label: 'Mother' }, { value: 'father', label: 'Father' }, { value: 'other', label: 'Other' }] },
    { label: 'Travel Time (Portuguese)', name: 'traveltime_por', type: 'number' },
    { label: 'Study Time (Portuguese)', name: 'studytime_por', type: 'number' },
    { label: 'Failures (Portuguese)', name: 'failures_por', type: 'number' },
    { label: 'Extra Educational Support (Portuguese)', name: 'schoolsup_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Family Educational Support (Portuguese)', name: 'famsup_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Extra Paid Classes (Portuguese)', name: 'paid_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Extra-curricular Activities (Portuguese)', name: 'activities_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Wants to Take Higher Education (Portuguese)', name: 'higher_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Romantic Relationship (Portuguese)', name: 'romantic_por', options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
    { label: 'Quality of Family Relationships (Portuguese)', name: 'famrel_por', type: 'number' },
    { label: 'Free Time After School (Portuguese)', name: 'freetime_por', type: 'number' },
    { label: 'Going Out with Friends (Portuguese)', name: 'goout_por', type: 'number' },
    { label: 'Workday Alcohol Consumption (Portuguese)', name: 'Dalc_por', type: 'number' },
    { label: 'Weekend Alcohol Consumption (Portuguese)', name: 'Walc_por', type: 'number' },
    { label: 'Current Health Status (Portuguese)', name: 'health_por', type: 'number' },
    { label: 'Number of School Absences (Portuguese)', name: 'absences_por', type: 'number' },
    { label: 'First Period Grade (Portuguese)', name: 'G1_por', type: 'number' },
    { label: 'Second Period Grade (Portuguese)', name: 'G2_por', type: 'number' },
    { label: 'Final Grade (Portuguese)', name: 'G3_por', type: 'number' }
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Grade Predictor
      </Typography>
      <form onSubmit={handleSubmit}>
  <Grid container spacing={2}>
    <Grid item xs={12} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <Typography variant="h6">Personal Details</Typography>
      <Grid container spacing={2}>
        {personalDetails.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.name}>
            <FormSection
              label={section.label}
              name={section.name}
              value={formData[section.name]}
              handleChange={handleChange}
              options={section.options}
              type={section.type}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={12} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <Typography variant="h6">Math Details</Typography>
      <Grid container spacing={2}>
        {mathDetails.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.name}>
            <FormSection
              label={section.label}
              name={section.name}
              value={formData[section.name]}
              handleChange={handleChange}
              options={section.options}
              type={section.type}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={12} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <Typography variant="h6">Portuguese Details</Typography>
      <Grid container spacing={2}>
        {portugueseDetails.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.name}>
            <FormSection
              label={section.label}
              name={section.name}
              value={formData[section.name]}
              handleChange={handleChange}
              options={section.options}
              type={section.type}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={12} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h6">Essay Section</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            
            <TextField
              label="Essay"
              name="essay"
              value={formData['essay']}
              onChange={handleChange}
              multiline
              rows={10}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>


  </Grid>
  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
    Predict Grade
  </Button>
</form>



      {predictedGrade !== null && (
        <Grid>
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Predicted Final Grade: {predictedGrade.overall.score}
            
          </Typography>
          <Typography variant="h6" style={{ marginTop: '20px' }}>
          Sentiment Score: {sentiment}
          </Typography>

          <Dashboard performance={predictedGrade} />
        </Grid>
      )}
    </Container>
  );
};

export default GradeForm;




