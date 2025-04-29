// import { Box, Grid } from "@mui/material";
// import { Container } from "@mui/material/";
// import ProductCard from "../components/ProductCard";
// import { useEffect, useState } from "react";
// import { Product } from "../types/Product";
// import { BASE_URL } from "../constants/baseUrl";

// const HomePage = () => {
//   const [products, setproducts] = useState<Product[]>([]);
//   const [error, setError] = useState(false);
//   // useEffect(() => {
//   //   fetch(`${BASE_URL}/product`)
//   //     .then(async (response) => {
//   //       const data = await response.json();
//   //       setproducts(data);
//   //       console.log(data);
//   //     })
//   //     .catch((err) => console.log(err));
//   // }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/product`);

//         const data = await response.json();
//         setproducts(data);
//       } catch {
//         setError(true);
//       }
//     };
//     fetchData();
//   }, []);
//   if (error) {
//     return <Box>Something went wrong , please try again!</Box>;
//   }
//   return (
//     <Container sx={{ mt: 2 }}>
//       <Grid container spacing={2}>
//         {products.map((p: { _id: any; }) => (
//           <Grid item md={4} key={p._id}>
//             <Box
//               sx={{
//                 transition: "transform 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.03)",
//                 },
//               }}
//             >
//               <ProductCard title={""} image={""} price={""} {...p}></ProductCard>
//             </Box>{" "}
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default HomePage;

// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Alert,
//   Button,
//   useTheme,
// } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import ProductCard from "../components/ProductCard";
// import { Product } from "../types/Product";
// import { BASE_URL } from "../constants/baseUrl";

// const HomePage = () => {
//   const theme = useTheme();
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/product`);
//         const data: Product[] = await res.json();
//         setProducts(data);
//       } catch {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const scroll = (distance: number) => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: distance, behavior: "smooth" });
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           height: "80vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress size={48} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Alert severity="error">Failed to load products. Try again later.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${theme.palette.primary.light} 20%, ${theme.palette.secondary.light} 80%)`,
//         py: 6,
//       }}
//     >
//       <Container>
//         {/* Hero */}
//         <Typography
//           variant="h3"
//           gutterBottom
//           sx={{
//             fontWeight: 700,
//             textAlign: "center",
//             mb: 4,
//             background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//           }}
//         >
//           Featured Picks
//         </Typography>

//         {/* Carousel */}
//         <Box
//           sx={{
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <IconButton
//             onClick={() => scroll(-window.innerWidth * 0.2)}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: 0,
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               bgcolor: "rgba(255,255,255,0.7)",
//             }}
//           >

//             <ArrowBackIosIcon />
//           </IconButton>

//           <Box
//             ref={carouselRef}
//             sx={{
//               display: "flex",
//               gap: 2,
//               overflowX: "auto",
//               scrollSnapType: "x mandatory",
//               px: 6,
//               "&::-webkit-scrollbar": { display: "none" },
//             }}
//           >
//             {products.slice(0, 8).map((p) => (
//               <Box
//                 key={p._id}
//                 sx={{
//                   flex: "0 0 70%",
//                   scrollSnapAlign: "center",
//                   cursor: "pointer",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 4,
//                   },
//                 }}
//               >
//                 <ProductCard {...p} />
//               </Box>
//             ))}
//           </Box>

//           <IconButton
//             onClick={() => scroll(window.innerWidth * 0.2)}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               right: 0,
//               transform: "translateY(-50%)",
//               zIndex: 1,
//               bgcolor: "rgba(255,255,255,0.7)",
//             }}
//           >
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </Box>

//         {/* “See All” CTA */}
//         <Box textAlign="center" mt={4}>
//           <Button
//             variant="contained"
//             size="small"
//             sx={{
//               px: 4,
//               py: 1.5,
//               fontWeight: 600,
//               borderRadius: 8,
//               background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
//             }}
//             onClick={() =>
//               carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" })
//             }
//           >
//             Explore All Products
//           </Button>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HomePage;

import {
  Box,
  Container,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const carouselRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/product`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scrollCarousel = (distance: number) => {
    carouselRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Failed to load products. Try again later.</Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 20%, ${theme.palette.secondary.light} 80%)`,
        py: 6,
      }}
    >
      <Container>
        {/* --- Carousel Hero --- */}
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Featured Picks
        </Typography>

        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <IconButton
            onClick={() => scrollCarousel(-window.innerWidth * 0.8)}
            sx={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "rgba(255,255,255,0.8)",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Box
            ref={carouselRef}
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              px: 4,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {products.slice(0, 8).map((p) => (
              <Box
                key={p._id}
                sx={{
                  flex: "0 0 auto",
                  width: {
                    xs: "80vw",
                    sm: "50vw",
                    md: "30vw",
                  },
                  scrollSnapAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                  },
                }}
              >
                <ProductCard {...p} />
              </Box>
            ))}
          </Box>

          <IconButton
            onClick={() => scrollCarousel(window.innerWidth * 0.8)}
            sx={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "rgba(255,255,255,0.8)",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* --- CTA to Scroll Down --- */}
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 8,
              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            }}
            onClick={() =>
              allRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore All Products
          </Button>
        </Box>

        {/* --- All Products Section --- */}
        <Box ref={allRef} sx={{ mt: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
          >
            All Products
          </Typography>
          <Grid container spacing={3}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p._id}>
                <Box
                  sx={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": { transform: "scale(1.02)", boxShadow: 3 },
                  }}
                >
                  <ProductCard {...p} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
