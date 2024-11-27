import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useCart } from "../contexts/CartContext";
import { updateClient } from "../services/clientService";
import { createOrder } from "../services/orderService";
import { updateProduct } from "../services/productService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Responsive width (80% of the screen size)
  maxWidth: 450, // Maximum width
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh", // Max height for responsiveness
  overflowY: "auto", // Enables scroll if content overflows
  "&::-webkit-scrollbar": {
    width: "8px", // Slightly wider scrollbar for aesthetics
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888", // Color of the scrollbar thumb
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555", // Darker thumb on hover
  },
};

export default function CartModal({ open, onClose, setProducts }) {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();

  const handleRemoveProduct = (productId) => {
    removeFromCart(productId);
  };

  const handleChangeQuantity = (product, newQuantity) => {
    const adjustedQuantity = Math.min(Math.max(newQuantity, 1), product.stock);
    const adjustedProduct = { ...product, quantity: adjustedQuantity };
    addToCart(adjustedProduct);
  };

  const isCartEmpty = cart.length === 0;

  const handlePurchase = async () => {
    try {
      if (cart.some((product) => product.stock <= 1)) {
        alert("Uno o más productos no tienen suficiente stock.");
        return;
      }
      const products = cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        total: product.price * product.quantity,
      }));

      const clientData = { shoppingCart: products };
      await updateClient("6746b58fcab3ccafe726d83d", clientData);

      await createOrder("6746b58fcab3ccafe726d83d", products);

      for (const product of cart) {
        const newStock = product.stock - product.quantity;
        await updateProduct(product._id, { ...product, stock: newStock });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, stock: newStock } : p
          )
        );
      }

      clearCart();

      alert("Compra realizada con éxito");
    } catch (error) {
      console.error("Error realizando la compra:", error);
      alert("Hubo un error al procesar la compra");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          Carrito de compra
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="body1">El carrito está vacío</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 50px",
                gap: 2,
                borderBottom: "1px solid #ddd",
                paddingBottom: 1,
                mb: 2,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Nombre
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Cantidad
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Total
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Eliminar
              </Typography>
            </Box>

            {cart.map((product) => (
              <Box
                key={product._id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 50px",
                  gap: 2,
                  alignItems: "center",
                  mb: 2,
                  borderBottom: "1px solid #ddd",
                  pb: 1,
                }}
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name.length > 20
                    ? product.name.slice(0, 20) + "..."
                    : product.name}
                </Typography>

                <TextField
                  type="number"
                  size="small"
                  value={product.quantity}
                  onChange={(e) =>
                    handleChangeQuantity(product, Number(e.target.value))
                  }
                  sx={{ width: 60 }}
                />

                <Typography variant="body2">
                  ${product.price * product.quantity}
                </Typography>

                <IconButton onClick={() => handleRemoveProduct(product._id)}>
                  <ClearIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
            mx: 3,
          }}
        >
          <Button onClick={onClose} variant="outlined" color="secondary">
            Salir
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isCartEmpty}
            onClick={handlePurchase}
          >
            Comprar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
