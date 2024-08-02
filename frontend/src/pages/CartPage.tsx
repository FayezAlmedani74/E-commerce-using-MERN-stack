/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
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
                <Button>RemoveItem</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button>-</Button>
              <Button>+</Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box>
          <Typography variant="h4">Total Amount: {totalAmount} SYR</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
