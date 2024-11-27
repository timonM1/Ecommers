import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CategoryFilter from "./CategoryFilter";
import CloseIcon from "@mui/icons-material/Close";
import AttributeManager from "./AttributeManager";

export default function ProductForm({
  onAddProduct,
  onClose,
  open,
  categories,
  product,
  onUpdateProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    attributes: [],
    price: 0,
    stock: 1,
    id_category: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        attributes: product.attributes || [],
        price: product.price,
        stock: Math.max(product.stock, 1),
        id_category: product.id_category,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (formData.price < 0) {
      alert("El precio no puede ser negativo.");
      return;
    }

    if (formData.stock < 1) {
      alert("El stock no puede ser menor que 1.");
      return;
    }

    if (product) {
      const updatedProduct = { ...formData };
      onUpdateProduct(updatedProduct);
    } else {
      onAddProduct(formData);
    }

    setFormData({
      name: "",
      description: "",
      attributes: [],
      price: 0,
      stock: 1,
      id_category: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          my: 2,
          fontWeight: 900,
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center", textTransform: "uppercase" }}>
          {product ? "Actualizar Producto" : "Agregar Nuevo Producto"}
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 5,
            top: -10,
          }}
        >
          <CloseIcon color="error" sx={{ fontSize: 30 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Descripción"
              type="text"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Grid>
          <Grid size={12}>
            {!product && (
              <CategoryFilter
                selectedCategory={formData.id_category}
                setSelectedCategory={(value) =>
                  setFormData({ ...formData, id_category: value })
                }
                categories={categories}
              />
            )}
          </Grid>
          <Grid size={12}>
            <TextField
              label="Precio"
              type="number"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                // Validación para que el precio no sea negativo
                setFormData({
                  ...formData,
                  price: Math.max(0, Number(e.target.value)),
                })
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Stock"
              type="number"
              fullWidth
              value={formData.stock}
              onChange={(e) =>
                // Validación para que el stock no baje de 1
                setFormData({
                  ...formData,
                  stock: Math.max(1, Number(e.target.value)),
                })
              }
            />
          </Grid>
          <Grid size={12}>
            <AttributeManager
              attributes={formData.attributes}
              setAttributes={(newAttributes) =>
                setFormData({ ...formData, attributes: newAttributes })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="small"
        >
          {product ? "Actualizar" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
