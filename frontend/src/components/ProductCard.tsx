// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useCart } from "../context/Cart/CartContext";

// interface Props {
//   _id: string;
//   title: string;
//   image: string;
//   price: string;
// }
// export default function ProductCard({ _id, title, image, price }: Props) {
//   // console.log("Image path:", image); // Add this line
//   const { addItemToCart } = useCart();
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 200, width: "100%" }}
//         image={image}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {price} SYP
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="contained"
//           size="small"
//           onClick={() => addItemToCart(_id)}
//         >
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "../context/Cart/CartContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
  isNew?: boolean;
}

export default function ProductCard({ _id, title, image, price, isNew }: Props) {
  const theme = useTheme();
  const { addItemToCart } = useCart();
const handleAdd = () => {
  console.log("Adding to cart:", _id);
  addItemToCart(_id);
};
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 2,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        {isNew && (
          <Chip
            label="New"
            color="secondary"
            size="small"
            sx={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}
          />
        )}
        <CardActionArea onClick={() => addItemToCart(_id)}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              height: 200,
              objectFit: "cover",
              transition: "opacity 0.3s",
              "&:hover": {
                opacity: 0.85,
              },
            }}
          />
          {/* Title + price overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              py: 1,
              px: 2,
              background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.7))",
            }}
          >
            {/* <Typography variant="subtitle1" color="common.white" noWrap>
              {title}
            </Typography>*/}
            <Typography variant="h6" color={theme.palette.primary.dark}>
              {price} $
            </Typography> 
          </Box>
        </CardActionArea>

        {/* Wishlist heart */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
          }}
        >
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Box>

      <CardContent sx={{ pt: 2, pb: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="text.secondary" >
            {/* fallback title if overlay wraps */}
            {title}
          </Typography>
          {/* <Typography variant="subtitle1" color="primary.main">
            {price} $
          </Typography> */}
        </Stack>
      </CardContent>

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAdd}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            bgcolor: theme.palette.secondary.main,
            "&:hover": { bgcolor: theme.palette.secondary.dark },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
}
