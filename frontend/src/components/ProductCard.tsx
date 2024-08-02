import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}
export default function ProductCard({ title, image, price }: Props) {
  console.log("Image path:", image); // Add this line
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200, width: "100%" }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price} SYP
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
