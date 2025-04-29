// import { Box, Container, Paper, Typography } from "@mui/material";
// import { useAuth } from "../context/Auth/AuthContext";
// import { useEffect } from "react";

// const MyOrdersPage = () => {
//   const { getMyOrders, myOrders } = useAuth();

//   useEffect(() => {
//     getMyOrders();
//   }, [getMyOrders]);

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
//       <Typography>
//         My Orders
//         {myOrders.map(({ _id, address, orderItem, total }) => (
//           // <Box key={_id} sx={{ border: 1, borderColor: grey }}>
//           <Box
//   key={_id}
//   component={Paper}
//   elevation={1}
//   sx={{ p: 2, borderRadius: 3, width: "100%", mb: 2 }}
// >
//             <Typography>ID: {_id}</Typography>
//             <Typography>Address: {address}</Typography>
//             <Typography>Items: {orderItem}</Typography>
//             <Typography>Total: {total}</Typography>
//           </Box>
//         ))}
//       </Typography>
//     </Container>
//   );
// };

// export default MyOrdersPage;

import { Box, Container, Paper, Typography, CircularProgress, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const { getMyOrders, myOrders } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await getMyOrders();
      setLoading(false);
    };
    fetchOrders();
  }, [getMyOrders]);

  if (loading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (myOrders.length === 0) {
    return (
      <Container fixed sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h5">You don't have any orders yet.</Typography>
      </Container>
    );
  }

  return (
    <Container fixed sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3}>
        My Orders
      </Typography>
      <Box display="flex" flexDirection="column" gap={3}>
        {myOrders.map(({ _id, address, orderItem, total, createdAt }) => (
          <Paper key={_id} elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Order ID: {_id}</Typography>
              <Typography color="text.secondary">
                {new Date(createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography fontWeight={600}>Delivery Address:</Typography>
            <Typography mb={2}>{address}</Typography>

            <Typography fontWeight={600} mb={1}>
              Items:
            </Typography>
            <List dense disablePadding>
              {orderItem.map((item: any) => (
                <ListItem key={item.productId} disableGutters>
                  <ListItemText
                    primary={`${item.title} x${item.quantity}`}
                    secondary={`${item.unitPrice} SYR each`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={600}>Total:</Typography>
              <Typography fontWeight={700}>{total.toFixed(2)} SYR</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default MyOrdersPage;
