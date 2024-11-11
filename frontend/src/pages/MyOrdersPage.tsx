import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

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
      <Typography>
        My Orders
        {myOrders.map(({ _id, address, orderItem, total }) => (
          <Box key={_id} sx={{ border: 1, borderColor: grey }}>
            <Typography>ID:{_id}</Typography>
            <Typography>Address{address}</Typography>
            <Typography>Items: {orderItem}</Typography>
            <Typography>Total: {total}</Typography>
          </Box>
        ))}
      </Typography>
    </Container>
  );
};

export default MyOrdersPage;
