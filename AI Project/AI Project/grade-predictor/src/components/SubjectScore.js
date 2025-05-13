import { Card, CardContent, Typography } from "@mui/material";
// import { Card, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";

export default function SubjectScore({ subject, score, data }) {
  const getColor = (score) => {
    if (score >= 15) return "bg-green-500";
    if (score >= 12) return "bg-yellow-500";
    return "bg-red-500";
  };

  // return (
  // <Card className="mb-4">
  //   <CardContent className="py-4">
  //     <h2 className="text-xl font-semibold mb-2">{subject}</h2>
  //     <div className="flex items-center justify-between">
  //       <div className="text-2xl font-bold">{score.toFixed(2)}</div>
  //       <Badge className={getColor(score)}>
  //         {score >= 15 ? "Good" : score >= 12 ? "Average" : "Needs Attention"}
  //       </Badge>
  //     </div>
  //     <Progress value={(score / 20) * 100} className="mt-3" />
  //   </CardContent>
  // </Card>
  // );

  return (
    <Card sx={{ minHeight: 250 }}>
      <CardContent>
        <Typography variant="h5">{subject} Score</Typography>
        <Typography variant="h3" color="primary">
          {data.score}
        </Typography>
      </CardContent>
    </Card>
  );
}
