import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Product from "../components/Product";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";

import { getCategories } from "../services/categoryService";
import RoleSwitcher from "../components/RoleSwitcher";

import Shopping from "../components/Shopping";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [role, setRole] = useState("Cliente");
  const [products, setProducts] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <RoleSwitcher onRoleChange={handleRoleChange} />
      </Box>

      <Grid container spacing={3} my={4}>
        <Grid size={3} xs={12} sm={6} md={4}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </Grid>
        <Grid size={5} xs={12} sm={6} md={8}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <SearchBar search={search} setSearch={setSearch} />
            {role === "Cliente" && <Shopping setProducts={setProducts} />}
          </Box>
        </Grid>
      </Grid>
      <Product
        selectedCategory={selectedCategory}
        search={search}
        categories={categories}
        role={role}
        products={products}
        setProducts={setProducts}
      />
    </Container>
  );
}
