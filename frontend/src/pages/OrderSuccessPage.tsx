import { Button, Container, Typography } from "@mui/material";
// import { CheckCircleOutline } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CheckCircleOutlineIcon
        sx={{ color: "green", fontSize: "80px" }}
      ></CheckCircleOutlineIcon>
      <Typography variant="h4">Thanks for you order.</Typography>
      <Typography>
        {" "}
        We started procrssing it, and we will get back to you soon
      </Typography>
      <Button variant="contained" onClick={handleHome}>
        Go to Home
      </Button>
      {/* <CheckCircleOutline></CheckCircleOutline> */}
    </Container>
  );
};

export default OrderSuccessPage;
