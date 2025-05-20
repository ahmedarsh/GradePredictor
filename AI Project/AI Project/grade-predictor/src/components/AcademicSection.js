import { Box } from '@mui/material';
import PerformanceGrid from './PerformanceGrid';
import FeatureImpactSection from './FeatureImpactSection';

export default function AcademicSection({ performance }) {
  return (
    <Box>
      <PerformanceGrid performance={performance} />
      <FeatureImpactSection performance={performance} />
    </Box>
  );
}
