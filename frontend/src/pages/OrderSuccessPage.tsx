// import { Button, Container, Typography } from "@mui/material";
// // import { CheckCircleOutline } from "@mui/icons-material";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useNavigate } from "react-router-dom";

// const OrderSuccessPage = () => {
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate("/");
//   };
//   return (
//     <Container
//       fixed
//       sx={{
//         mt: 2,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 2,
//       }}
//     >
//       <CheckCircleOutlineIcon
//         sx={{ color: "green", fontSize: "80px" }}
//       />
//       <Typography variant="h4" fontWeight="bold">Thanks for you order.</Typography>
//       <Typography color="text.secondary">
//         {" "}
//         We started procrssing it, and we will get back to you soon
//       </Typography>
//       <Button variant="contained" sx={{ mt: 2 }} onClick={handleHome}>
//         Go to Home
//       </Button>
//       {/* <CheckCircleOutline></CheckCircleOutline> */}
//     </Container>
//   );
// };

// export default OrderSuccessPage;
import {
  Box,
  Button,
  Container,
  Typography,
  Fade,
  Grow,
  useTheme,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderSuccessPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.secondary.light} 20%, ${theme.palette.primary.light} 80%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        p: 2,
        overflow: "hidden",
      }}
    >
      {/* Simple emoji “confetti” */}
      {[...Array(30)].map((_, i) => (
        <Typography
          key={i}
          component="span"
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 24 + 12}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `fall 3s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.8,
          }}
        >
          🎉
        </Typography>
      ))}

      <Fade in={mounted} timeout={800}>
        <Container
          sx={{
            maxWidth: 400,
            textAlign: "center",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
          }}
        >
          <Grow in={mounted} timeout={1000}>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 80,
                color: theme.palette.success.main,
                mb: 2,
                "@keyframes pulse": {
                  "0%": { transform: "scale(0.9)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(0.9)" },
                },
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </Grow>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Thank you for your order!
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            We’re processing it now and will update you when it ships.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/my-orders")}
            >
              View My Orders
            </Button>
          </Box>
        </Container>
      </Fade>

      {/* Confetti fall animation */}
      <Box
        component="style"
        children={`
          @keyframes fall {
            0% { transform: translateY(-100vh) rotate(0deg); }
            100% { transform: translateY(100vh) rotate(360deg); }
          }
        `}
      />
    </Box>
  );
};

export default OrderSuccessPage;
