// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useAuth } from "../context/Auth/AuthContext";
// import { Badge, Button, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/Cart/CartContext";

// function Navbar() {
//   const { username, isAuthenticated, logout } = useAuth();
//   const { cartItems } = useCart();
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
//     null
//   );
//   const navigate = useNavigate();
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   const hanleMyOrders = () => {
//     navigate("/my-orders");
//     handleCloseUserMenu();
//   };
//   const handleLogin = () => {
//     navigate("/login");
//   };
//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     handleCloseUserMenu();
//   };

//   const handleCart = () => {
//     navigate("cart");
//   };
//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               width: "100%",
//             }}
//           >
//             <Button
//               variant="text"
//               sx={{ color: "white" }}
//               onClick={() => navigate("/")}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <AdbIcon sx={{ display: "flex", mr: 1 }} />
//                 <Typography
//                   variant="h6"
//                   noWrap
//                   component="a"
//                   sx={{
//                     mr: 2,
//                     display: { xs: "none", md: "flex" },
//                     fontFamily: "monospace",
//                     fontWeight: 700,
//                   }}
//                 >
//                   السبيني ماركت
//                 </Typography>
//               </Box>
//             </Button>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 4,
//               }}
//             >
//               <IconButton aria-label="cart" onClick={handleCart}>
//                 <Badge badgeContent={cartItems.length} color="secondary">
//                   <ShoppingCartIcon sx={{ color: "white" }} />
//                 </Badge>
//               </IconButton>
//               {isAuthenticated ? (
//                 <>
//                   <Tooltip title="Open settings">
//                     <Grid
//                       container
//                       alignItems="center"
//                       justifyContent="center"
//                       gap={2}
//                     >
//                       <Grid item>
//                         <Typography>{username}</Typography>
//                       </Grid>
//                       <Grid item>
//                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                           <Avatar
//                             alt={username || ""}
//                             src="/static/images/avatar/2.jpg"
//                           />
//                         </IconButton>
//                       </Grid>
//                     </Grid>
//                   </Tooltip>
//                   <Menu
//                     sx={{ mt: "45px" }}
//                     id="menu-appbar"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     keepMounted
//                     transformOrigin={{
//                       vertical: "top",
//                       horizontal: "right",
//                     }}
//                     open={Boolean(anchorElUser)}
//                     onClose={handleCloseUserMenu}
//                   >
//                     <MenuItem onClick={hanleMyOrders}>
//                       <Typography textAlign="center">My Orders</Typography>
//                     </MenuItem>
//                     <MenuItem onClick={handleLogout}>
//                       <Typography textAlign="center">Logout</Typography>
//                     </MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={handleLogin}
//                 >
//                   Login
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navbar;

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
  Button,
  Container,
  Fade,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { username, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMyOrders = () => {
    navigate("/my-orders");
    handleCloseUserMenu();
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    handleCloseUserMenu();
  };
  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <Fade in timeout={700}>
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, #902eb3 0%, #4facfe 100%)", boxShadow: 3 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            
            {/* Logo and Title */}
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
              <StorefrontIcon sx={{ mr: 1, fontSize: 32 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                KicksLane
              </Typography>
            </Box>

            {/* Right side: Cart + Auth */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {/* Cart Button */}
              <IconButton size="large" onClick={handleCart}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={username || ""} src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleMyOrders}>
                      <Typography textAlign="center">My Orders</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "white",
                    color: "#00bcd4",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#e0f7fa",
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </Fade>
  );
}

export default Navbar;
