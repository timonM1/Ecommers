import React, { useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircleIcon from "@mui/icons-material/Circle";
import ProductForm from "./ProductForm";
import { updateProduct } from "../services/productService";

export const ProductDetailContent = ({ product, categories, role }) => {
  const [openForm, setOpenForm] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await updateProduct(product._id, updatedProduct);
      console.log("Producto actualizado en el servidor");
      setUpdatedProduct(updatedProduct);
    } catch (err) {
      console.error("Error al actualizar el producto:", err);
    } finally {
      setOpenForm(false);
    }
  };

  const defaultImage =
    "https://blog.chattigo.com/hubfs/ECommerceCreceM%C3%A9xicoOk.jpg";

  return (
    <Grid container spacing={2} gap={10}>
      <Grid xs={12} sm={5}>
        <Box
          component="img"
          src={defaultImage}
          alt={updatedProduct.name}
          sx={{
            minWidth: 350,
            minHeight: 350,
            maxWidth: 450,
            maxHeight: 450,
            borderRadius: 1,
            boxShadow: 2,
            objectFit: "cover",
          }}
        />
      </Grid>

      <Grid xs={12} sm={12} lg={12}>
        <Typography variant="h3" gutterBottom>
          {updatedProduct.name}
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
          {updatedProduct.description || "No description available"}
        </Typography>

        <Typography variant="h6">
          <strong>Price:</strong> ${updatedProduct.price || "0.00"}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          <strong>Stock:</strong> {updatedProduct.stock || "Out of stock"}
        </Typography>

        {updatedProduct.attributes && updatedProduct.attributes.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Características:
            </Typography>
            <List sx={{ pl: 2, mt: -2 }}>
              {updatedProduct.attributes.map((attr, index) => (
                <Box key={index}>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: "unset" }}>
                      <CircleIcon sx={{ fontSize: 10, mr: 1 }} />
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      component="span"
                    >
                      {attr.name}:
                    </Typography>
                  </ListItem>

                  <List sx={{ pl: 4, mt: -2 }}>
                    {attr.values.map((value, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon sx={{ minWidth: "unset" }}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mr: 1 }}
                          >
                            -
                          </Typography>
                        </ListItemIcon>
                        <Typography variant="body2" color="textSecondary">
                          {value}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>

                  {index < updatedProduct.attributes.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Box>
        )}
        {role === "Admin" && (
          <Button variant="outlined" onClick={() => setOpenForm(true)}>
            ACTUALIZAR
          </Button>
        )}
      </Grid>

      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onUpdateProduct={handleUpdateProduct}
        categories={categories}
        product={updatedProduct}
      />
    </Grid>
  );
};
