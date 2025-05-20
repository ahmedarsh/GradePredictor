
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const SentimentChart = ({ data }) => {
  const sentimentData = [
    { name: 'Positive', value: data?.positive || 0 },
    { name: 'Neutral', value: data?.neutral || 0 },
    { name: 'Negative', value: data?.negative || 0 },
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={sentimentData}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {sentimentData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SentimentChart;
