import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
  CircularProgress,
  Link,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // UI state
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // form data
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 1: send reset code
  const handleSendCode = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Unknown email address.");
      setSuccessMsg("A reset code has been sent to your email.");
      setStep(2);
    } catch (e: any) {
      setError(e.message || "Failed to send code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify code & set new password
  const handleResetPw = async () => {
    setError("");
    if (!code || !newPw || !confirmPw) {
      setError("All fields are required.");
      return;
    }
    if (newPw !== confirmPw) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password: newPw }),
      });
      if (!res.ok) throw new Error("Invalid code or expired.");
      setSuccessMsg("Your password has been reset! Redirecting to login…");
      setTimeout(() => navigate("/login"), 2500);
    } catch (e: any) {
      setError(e.message || "Reset failed.");
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
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {step === 1 ? "Forgot Password" : "Reset Your Password"}
          </Typography>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {successMsg && (
            <Typography color="success.main" variant="body2" sx={{ mt: 1 }}>
              {successMsg}
            </Typography>
          )}

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            {/* Step 1: Email */}
            {step === 1 && (
              <TextField
                fullWidth
                label="Email Address"
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
            )}

            {/* Step 2: Code + New Password */}
            {step === 2 && (
              <>
                <TextField
                  fullWidth
                  label="Reset Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPw ? "text" : "password"}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
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
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={step === 1 ? handleSendCode : handleResetPw}
              disabled={loading}
              sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : step === 1 ? "Send Code" : "Reset Password"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link component="button" variant="body2" onClick={() => navigate("/login")}>
                Back to Login
              </Link>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ForgotPasswordPage;
