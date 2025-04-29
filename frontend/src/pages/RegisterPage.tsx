// import { Box, Button, Container, TextField, Typography } from "@mui/material";
// import { useRef, useState } from "react";
// import { BASE_URL } from "../constants/baseUrl";
// import { useAuth } from "../context/Auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// const RegisterPage = () => {
//   const [error, setError] = useState("");
//   const firstNameRef = useRef<HTMLInputElement>(null);
//   const lastNameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const onSubmit = async () => {
//     const firstName = firstNameRef.current?.value;
//     const lastName = lastNameRef.current?.value;
//     const email = emailRef.current?.value;
//     const password = passwordRef.current?.value;
//     if (!firstName || !lastName || !email || !password) {
//       setError("Check submitted data!");
//       return;
//     }
//     console.log(firstName, lastName, email, password);
//     const response = await fetch(`${BASE_URL}/user/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         firstName,
//         lastName,
//         email,
//         password,
//       }),
//     });
//     if (!response.ok) {
//       setError("Enable to register user, please try different credientials!");
//       return;
//     }
//     const token = await response.json();
//     if (!token) {
//       setError("Incorrect token");
//       return;
//     }

//     login(email, token);
//     console.log(token);
//     navigate("/");
//   };
//   const handleLoginButton = () => {
//     navigate(`/login`);
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
//         <Typography variant="h5">Register New Account</Typography>
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
//           <TextField
//             inputRef={firstNameRef}
//             label="First Name"
//             name="firstName"
//           ></TextField>
//           <TextField
//             inputRef={lastNameRef}
//             label="Last Name"
//             name="lastName"
//           ></TextField>
//           <TextField inputRef={emailRef} label="Email" name="email"></TextField>
//           <TextField
//             inputRef={passwordRef}
//             label="Password"
//             name="password"
//             type="password"
//           ></TextField>
//           <Button variant="contained" onClick={onSubmit}>
//             Register
//           </Button>
//           <Button onClick={handleLoginButton}>
//             i'm already have account login
//           </Button>
//           {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default RegisterPage;

import {
  Box,
  Button,
  Container,
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
import PersonIcon from "@mui/icons-material/Person";
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

const RegisterPage = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree]         = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [mounted, setMounted]     = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignup = async () => {
    setError("");
    if (!firstName || !lastName || !email || !password || !confirmPw) {
      setError("Please complete all fields.");
      return;
    }
    if (password !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (!res.ok) throw new Error("Registration failed.");
      const token = await res.json();
      login(email, token);
      navigate("/");
    } catch (e: any) {
      setError(e.message || "Unable to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
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
            maxWidth: 420,
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
              background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Create Account
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

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
                    <IconButton onClick={() => setShowPw(!showPw)} edge="end">
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
              label="I agree to the Terms & Conditions"
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
              onClick={handleSignup}
              disabled={loading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Link component="button" variant="body2" onClick={() => navigate("/login")}>
                Have an account? Log in
              </Link>
            </Box>
          </Box>

          {/* Social signup */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" gutterBottom color="text.secondary">
              Or sign up with
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

export default RegisterPage;
