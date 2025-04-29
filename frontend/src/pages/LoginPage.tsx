// import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useRef, useState } from "react";
// import { BASE_URL } from "../constants/baseUrl";
// import { useAuth } from "../context/Auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [error, setError] = useState("");
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const onSubmit = async () => {
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
//     if (!email || !password) {
//       setError("Check submitted data!");
//       return;
//     }
//     // console.log(email, password);
//     const response = await fetch(`${BASE_URL}/user/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//     if (!response.ok) {
//       setError("Enable to login, please try different credientials!");
//       return;
//     }
//     const token = await response.json();
//     if (!token) {
//       setError("Incorrect token");
//       return;
//     }

//     login(email, token);
//     // console.log(token);
//     navigate("/");
//   };
//   const handleRegisterButton = () => {
//     navigate(`/register`);
//   };
//   return (
//     <Container>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           mt: 4,
//         }}
//       >
//         <Typography variant="h5">Login to home</Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             mt: 2,
//             gap: 2,
//             border: 1,
//             p: 2,
//             borderColor: "#f5f5f5",
//           }}
//         >
//           <TextField inputRef={emailRef} label="Email" name="email"></TextField>
//           <TextField
//             inputRef={passwordRef}
//             label="Password"
//             name="password"
//             type="password"
//           ></TextField>
//           <Button variant="contained" onClick={onSubmit}>
//             Login
//           </Button>
//           <Button onClick={handleRegisterButton}>i don't have account</Button>
//           {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default LoginPage;

import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Link,
  Paper,
  Fade,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger Fade in
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const token = await res.json();
      login(email, token);
      navigate("/");
    } catch (e: any) {
      setError(e.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Fade in={mounted} timeout={600}>
        <Paper
          elevation={8}
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 4,
            borderRadius: 3,
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Welcome Back
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw(!showPw)}
                      edge="end"
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Log In"}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Link>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/register")}
              >
                Create account
              </Link>
            </Box>
          </Box>

          {/* Social login */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" gutterBottom color="text.secondary">
              Or sign in with
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton color="primary">
                <GoogleIcon />
              </IconButton>
              <IconButton sx={{ color: "#1877F2" }}>
                <FacebookIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default LoginPage;
