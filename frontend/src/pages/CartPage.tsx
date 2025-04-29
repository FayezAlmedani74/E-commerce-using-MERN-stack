// import { Box, Container, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import { useCart } from "../context/Cart/CartContext";
// import { useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const {
//     cartItems,
//     totalAmount,
//     updateItemInCart,
//     removeItemFromCart,
//     clearCart,
//   } = useCart();
//   const navigate = useNavigate();
//   const handleQuantity = (productId: string, quantity: number) => {
//     if (quantity <= 0) {
//       return;
//     }
//     updateItemInCart(productId, quantity);
//   };
//   const handleRemoveItem = (productId: string) => {
//     removeItemFromCart(productId);
//   };
//   const handleCheckout = () => {
//     navigate("/checkout");
//   };
//   const renderCartItems = () => (
//     <Box display={"flex"}  flexDirection={"column"} gap={4}>
//       {cartItems.map((item: { image: any; title: any; quantity: number; unitPrice: any; productId: string; }) => (
//         <Box
//           display={"flex"}
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           // sx={{
//           //   border: 1,
//           //   borderColor: "#f2f2f2",
//           //   borderRadius: 5,
//           //   padding: 1,
//           // }}
//            sx={{
//     border: 1,
//     borderColor: "divider",
//     borderRadius: 3,
//     padding: 2,
//     boxShadow: 2,
//     transition: "box-shadow 0.3s",
//     "&:hover": {
//       boxShadow: 4,
//     },
//   }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: " row",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <img src={item.image} alt="" width={100} />
//             <Box>
//               <Typography variant="h6">{item.title}</Typography>
//               <Typography>
//                 {item.quantity} * {item.unitPrice} SYR
//               </Typography>
//               <Button onClick={() => handleRemoveItem(item.productId)}>
//                 RemoveItem
//               </Button>
//             </Box>
//           </Box>
//           <ButtonGroup  variant="outlined"
//   color="primary"
//   size="small"
//   sx={{ borderRadius: 2 }} aria-label="Basic button group">
//             <Button
//               onClick={() => handleQuantity(item.productId, item.quantity - 1)}
//             >
//               -
//             </Button>
//             <Button
//               onClick={() => handleQuantity(item.productId, item.quantity + 1)}
//             >
//               +
//             </Button>
//           </ButtonGroup>
//         </Box>
//       ))}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: " row",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h4">Total Amount: {totalAmount} SYR</Typography>
//         <Button variant="contained" onClick={() => handleCheckout()}>
//           Go to checkout
//         </Button>
//       </Box>
//     </Box>
//   );

//   return (
//     <Container sx={{ mt: 2 }}>
//       <Box
//         display={"flex"}
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         sx={{ mb: 2 }}
//       >
//         <Typography variant="h4">My Cart</Typography>
//         <Button
//           variant="outlined"
//           onClick={() => clearCart()}
//           startIcon={<DeleteIcon />}
//         >
//           Clear Cart
//         </Button>
//       </Box>

//       {cartItems.length ? (
//         renderCartItems()
//       ) : (
//         <Typography>
//           Cart is empty. Please start shopping and add items first.
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default CartPage;

import {
  Box,
  Container,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Divider,
  useTheme,
  Slide,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems, totalAmount, updateItemInCart, removeItemFromCart, clearCart } = useCart();

  const [mounted, setMounted] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const applyCoupon = () => {
    // dummy coupon logic
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(0.1); // 10%
    }
  };

  const handleQuantity = (id: string, qty: number) => {
    if (qty > 0) updateItemInCart(id, qty);
  };

  const handleCheckout = () => navigate("/checkout");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(150deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Your Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: "center",
              mt: 4,
              borderRadius: 3,
              opacity: mounted ? 1 : 0,
              transition: "opacity 500ms ease-in",
            }}
          >
            <Badge
              badgeContent={0}
              color="secondary"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <ShoppingCartIcon sx={{ fontSize: 80, color: "grey.400" }} />
            </Badge>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Box sx={{ position: "relative", mb: 12 }}>
            {cartItems.map((item, i) => (
              <Slide
                key={item.productId}
                direction="up"
                in={mounted}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unit Price: {item.unitPrice} SYR
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantity(item.productId, item.quantity - 1)}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantity(item.productId, item.quantity + 1)}
                      >
                        <AddCircleOutline />
                      </IconButton>
                      <Typography sx={{ ml: 2, fontWeight: 600 }}>
                        {(item.quantity * item.unitPrice).toFixed(2)} SYR
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => removeItemFromCart(item.productId)}>
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Slide>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* Coupon & totals */}
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <TextField
                label="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalOfferIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined" onClick={applyCoupon}>
                Apply
              </Button>
              <Box flexGrow={1} />
              <Box textAlign="right">
                <Typography variant="subtitle1">
                  Subtotal: {totalAmount.toFixed(2)} SYR
                </Typography>
                {discount > 0 && (
                  <Typography variant="subtitle1" color="success.main">
                    Discount: {(discount * 100).toFixed(0)}%
                  </Typography>
                )}
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                  Total: {(totalAmount * (1 - discount)).toFixed(2)} SYR
                </Typography>
              </Box>
            </Box>

            {/* Sticky action bar */}
            <Box
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "background.paper",
                boxShadow: 4,
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={<DeleteIcon />}
                onClick={clearCart}
                color="error"
              >
                Clear Cart
              </Button>
              <Button variant="contained" size="large" onClick={handleCheckout}>
                Checkout ({cartItems.length})
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
