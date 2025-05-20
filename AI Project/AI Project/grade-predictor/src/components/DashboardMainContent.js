import { Box, Typography, Divider, Grid } from '@mui/material';
import SummaryHeader from './SummaryHeader';
import PerformanceGrid from './PerformanceGrid';
import FeatureImpactSection from './FeatureImpactSection';
import PersonalStatementSection from './PersonalStatementSection';
import Recommendations from './Recommendations';

export default function DashboardMainContent({ performance, filename }) {
  return (
    <Box>
      <SummaryHeader filename={filename} performance={performance} />

      <Divider sx={{ my: 4 }} />

      {/* Row 1: Academic + Personal Statement Side by Side */}
      <Grid container spacing={4}>
        {/* Left Column: Academic Performance Cards */}



        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>📝 Personal Statement</Typography>
          <PersonalStatementSection performance={performance} />
        </Grid>
        
        {/* Right Column: Personal Statement */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>📘 Academic Performance</Typography>
          <PerformanceGrid performance={performance} />
        </Grid>
      </Grid>

      {/* Row 2: Feature Impact Analysis */}
      <Box mt={6}>
        <FeatureImpactSection performance={performance} />
      </Box>


    </Box>
  );
}
