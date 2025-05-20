
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GrammarChart = ({ data }) => {
  const grammarData = [
    { name: 'Spelling Errors', value: data?.spellingErrors || 0 },
    { name: 'Punctuation Errors', value: data?.punctuationErrors || 0 },
    { name: 'Syntax Errors', value: data?.syntaxErrors || 0 },
  ];

  return (
    <BarChart width={600} height={300} data={grammarData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default GrammarChart;
