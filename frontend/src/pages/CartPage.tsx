/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };
  const handleRemoveItem = (productId: string) => {
    removeItemFromCart(productId);
  };
  const handleCheckout = () => {
    navigate("/checkout");
  };
  const renderCartItems = () => (
    <Box display={"flex"} flexDirection={"column"} gap={4}>
      {cartItems.map((item) => (
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            border: 1,
            borderColor: "#f2f2f2",
            borderRadius: 5,
            padding: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: " row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={item.image} alt="" width={100} />
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} * {item.unitPrice} SYR
              </Typography>
              <Button onClick={() => handleRemoveItem(item.productId)}>
                RemoveItem
              </Button>
            </Box>
          </Box>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
            >
              -
            </Button>
            <Button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
          flexDirection: " row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Total Amount: {totalAmount} SYR</Typography>
        <Button variant="contained" onClick={() => handleCheckout()}>
          Go to checkout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container sx={{ mt: 2 }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button
          variant="outlined"
          onClick={() => clearCart()}
          startIcon={<DeleteIcon />}
        >
          Clear Cart
        </Button>
      </Box>

      {cartItems.length ? (
        renderCartItems()
      ) : (
        <Typography>
          Cart is empty. Please start shopping and add items first.
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
