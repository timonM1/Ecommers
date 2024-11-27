import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../services/productService";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import AddIcon from "@mui/icons-material/Add";

export default function Product({
  selectedCategory,
  search,
  categories,
  role,
  products,
  setProducts,
}) {
  const [openForm, setOpenForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log("Deleting product with ID:", id);
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleCreateProduct = async (newProduct) => {
    try {
      const product = await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, product]);
      setOpenForm(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category_id === selectedCategory
      : true;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={5} justifyContent="center">
        {role === "Admin" && (
          <IconButton
            onClick={() => setOpenForm(true)}
            sx={{
              color: "#2e7d32",
              fontSize: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "transparent",
              },
              width: { xs: 200, sm: 250, md: 280 },
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        )}

        {filteredProducts.map((product) => (
          <Grid key={product._id} sx={{ width: { xs: 200, sm: 250, md: 280 } }}>
            <ProductCard
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              role={role}
            />
          </Grid>
        ))}

        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onAddProduct={handleCreateProduct}
          categories={categories}
        />
      </Grid>
    </Box>
  );
}
