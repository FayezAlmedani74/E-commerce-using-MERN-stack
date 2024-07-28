import { Box, Grid } from "@mui/material";
import { Container } from "@mui/material/";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";

const HomePage = () => {
  const [products, setproducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  // useEffect(() => {
  //   fetch(`${BASE_URL}/product`)
  //     .then(async (response) => {
  //       const data = await response.json();
  //       setproducts(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);

        const data = await response.json();
        setproducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
  }, []);
  if (error) {
    return <Box>Something went wrong , please try again!</Box>;
  }
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item md={4} key={p._id}>
            <ProductCard {...p}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
