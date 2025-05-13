import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import './FormSection.css'; // Import the CSS file

const FormSection = ({ label, name, value, handleChange, options, type }) => {
  return (
    <Grid item xs={12} sm={6} md={4} className="form-section">
      {options ? (
        <div className="tooltip">
        <FormControl fullWidth variant="outlined">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            name={name}
            value={value}
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span className="tooltiptext">{label}</span>
        </div>
      ) : (
        <div className="tooltip">
        <TextField
          fullWidth
          label={label}
          name={name}
          value={value}
          onChange={handleChange}
          variant="outlined"
          type={type || 'text'}
          InputLabelProps={{
            shrink: true,
          }}
          className="tooltip"
        />
        <span className="tooltiptext">{label}</span>
        </div>
      )}
    </Grid>
  );
};

export default FormSection;
