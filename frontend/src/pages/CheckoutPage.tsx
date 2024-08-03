/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import { useRef } from "react";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>();

  const renderCartItems = () => (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
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
              width: "100%",
            }}
          >
            <img src={item.image} alt="" width={100} />
            <Box
              sx={{
                display: "flex",
                flexDirection: " row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.quantity} * {item.unitPrice} SYR
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box>
        <Typography variant="body1" sx={{ textAlign: "right" }}>
          Total Amount: {totalAmount.toFixed(2)} SYR
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container
      fixed
      sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery Address"
        name="address"
        fullWidth
      ></TextField>
      {renderCartItems()}
      <Button variant="contained" fullWidth sx={{ mt: 1, mb: 2 }}>
        Pay Now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
