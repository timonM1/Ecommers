import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { ProductDetailContent } from "../components/ProductDetailContent";
import { Box, Container, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { role } = state || {};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  if (!product || categories.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="main" sx={{ mt: 12, mb: 3 }}>
      <Container maxWidth="lg">
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Volver
        </Button>
        <ProductDetailContent
          product={product}
          categories={categories}
          role={role}
        />
      </Container>
    </Box>
  );
}
