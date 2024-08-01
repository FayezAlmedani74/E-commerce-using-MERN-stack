import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data!");
      return;
    }
    console.log(firstName, lastName, email, password);
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    if (!response.ok) {
      setError("Enable to register user, please try different credientials!");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    console.log(token);
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
            gap: 2,
            border: 1,
            p: 2,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            name="firstName"
          ></TextField>
          <TextField
            inputRef={lastNameRef}
            label="Last Name"
            name="lastName"
          ></TextField>
          <TextField inputRef={emailRef} label="Email" name="email"></TextField>
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          ></TextField>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
