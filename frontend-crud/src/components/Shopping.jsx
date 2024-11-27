import React, { useState } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./CartModal";
import { useCart } from "../contexts/CartContext";

export default function Shopping({ setProducts }) {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartIcon sx={{ fontSize: 40 }} />
        </Badge>
      </IconButton>

      <CartModal open={open} onClose={handleClose} setProducts={setProducts} />
    </div>
  );
}
