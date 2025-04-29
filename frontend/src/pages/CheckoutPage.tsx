// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
// import { useCart } from "../context/Cart/CartContext";
// import { useRef } from "react";
// import { BASE_URL } from "../constants/baseUrl";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/Auth/AuthContext";

// const CheckoutPage = () => {
//   const { cartItems, totalAmount } = useCart();
//   const { token } = useAuth();
//   const addressRef = useRef<HTMLInputElement>(null);
//   const navigate = useNavigate();
//   const handleConfirmOrder = async () => {
//     const address = addressRef.current?.value;

//     if (!address) return;

//     const response = await fetch(`${BASE_URL}/cart/checkout`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         address,
//       }),
//     });
//     if (!response.ok) return;
//     navigate("/order-success");
//   };
//   const renderCartItems = () => (
//     <Box display={"flex"} flexDirection={"column"} gap={2}>
//       {cartItems.map((item) => (
//         <Box
//           display={"flex"}
//           flexDirection={"row"}
//           justifyContent={"space-between"}
//           alignItems={"center"}
//           sx={{
//             border: 1,
//             borderColor: "#f2f2f2",
//             borderRadius: 5,
//             padding: 1,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: " row",
//               alignItems: "center",
//               gap: 1,
//               width: "100%",
//             }}
//           >
//             <img src={item.image} alt="" width={100} />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: " row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 width: "100%",
//               }}
//             >
//               <Typography variant="h6">{item.title}</Typography>
//               <Typography>
//                 {item.quantity} * {item.unitPrice} SYR
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//       <Box>
//         <Typography variant="body1" sx={{ textAlign: "right" }}>
//           Total Amount: {totalAmount.toFixed(2)} SYR
//         </Typography>
//       </Box>
//     </Box>
//   );

//   return (
//     <Container
//       fixed
//       sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
//     >
//       <Box
//         display={"flex"}
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         sx={{ mb: 2 }}
//       >
//         <Typography variant="h4">Checkout</Typography>
//       </Box>
//       <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
//       <TextField
//         inputRef={addressRef}
//         label="Delivery Address"
//         name="address"
//         fullWidth
//       ></TextField>
//       {renderCartItems()}
//       <Button
//         variant="contained"
//         onClick={handleConfirmOrder}
//         fullWidth
//         sx={{ mt: 1, mb: 2 }}
//       >
//         Pay Now
//       </Button>
//       </Paper>
//     </Container>
//   );
// };

// export default CheckoutPage;
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Fade,
  useTheme,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useState, useEffect, ChangeEvent } from "react";
import { useCart } from "../context/Cart/CartContext";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";

const CheckoutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { token } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [activeStep] = useState(1); // 0=Cart, 1=Checkout, 2=Success

  // Shipping form
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");

  // Payment form
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shippingCost = totalAmount > 100 ? 0 : 9.99;
  const grandTotal = (totalAmount + shippingCost).toFixed(2);

  const handlePlaceOrder = async () => {
    setError("");
    // basic validation
    if (!address || !city || !postal || !country) {
      setError("Please complete all shipping fields.");
      return;
    }
    if (method === "card") {
      if (!cardNumber || !expiry || !cvv) {
        setError("Please complete all payment fields.");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shipping: { address, city, postal, country },
          payment: { method, cardNumber, expiry, cvv },
        }),
      });
      if (!res.ok) throw new Error("Checkout failed. Please try again.");
      clearCart();
      navigate("/order-success");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
        py: 6,
      }}
    >
      <Fade in={mounted} timeout={600}>
        <Container maxWidth="lg">
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {["Cart", "Checkout", "Success"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={4}>
            {/* LEFT: Form */}
            <Grid item xs={12} md={7}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Shipping Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Postal / ZIP"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Typography variant="h5" gutterBottom>
                    Payment Method
                  </Typography>
                  <RadioGroup
                    row
                    value={method}
                    onChange={(_: ChangeEvent, v: string) =>
                      setMethod(v as "card" | "paypal")
                    }
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CreditCardIcon /> Credit Card
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AccountBalanceWalletIcon /> PayPal
                        </Box>
                      }
                    />
                  </RadioGroup>

                  {method === "card" && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                ****  
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          type="password"
                        />
                      </Grid>
                    </Grid>
                  )}

                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {error}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    {loading ? <CircularProgress size={24} /> : "Place Order"}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* RIGHT: Order Summary */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  position: { xs: "static", md: "sticky" },
                  top: theme.spacing(10),
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                <Box>
                  {cartItems.map((item) => (
                    <Box
                      key={item.productId}
                      display="flex"
                      justifyContent="space-between"
                      mb={2}
                    >
                      <Typography>{item.title} x{item.quantity}</Typography>
                      <Typography>
                        {(item.quantity * item.unitPrice).toFixed(2)} SYR
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box my={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>{totalAmount.toFixed(2)} SYR</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Shipping</Typography>
                    <Typography>
                      {shippingCost === 0 ? "Free" : `${shippingCost.toFixed(2)} SYR`}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={1}
                    pb={1}
                    borderBottom={1}
                    borderColor="divider"
                  >
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>{grandTotal} SYR</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </Box>
  );
};

export default CheckoutPage;
