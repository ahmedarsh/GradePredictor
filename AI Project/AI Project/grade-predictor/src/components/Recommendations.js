import { Typography, List, ListItem, ListItemText } from "@mui/material";

export default function Recommendations({ performance }) {
  const insights = [];

  if (performance.sentiment?.num_grammar_errors > 10) {
    insights.push("Consider improving grammar to enhance clarity.");
  }

  if (performance.math.score < 12) {
    insights.push("Math performance is below average. Focus on practice problems.");
  }

  if (performance.portuguese.score < 12) {
    insights.push("Portuguese score is low. Consider reading and writing exercises.");
  }

  return (
    <>
      <Typography variant="h5" mt={5} mb={2}>
        💡 Recommendations
      </Typography>
      <List>
        {insights.length > 0 ? (
          insights.map((tip, index) => (
            <ListItem key={index}>
              <ListItemText primary={tip} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="Great job! No major issues detected." />
          </ListItem>
        )}
      </List>
    </>
  );
}
