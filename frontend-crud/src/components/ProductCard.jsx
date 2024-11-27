import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Img = styled(CardMedia)(({ theme }) => ({
  height: 200,
  objectFit: "cover",
  objectPosition: "center",
  cursor: "pointer",
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  textOverflow: "ellipsis",
  fontSize: theme.typography.body2.fontSize,
}));

export default function ProductCard({ product, handleDeleteProduct, role }) {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const isInCart = cart.some((item) => item._id === product._id);
    setAddedToCart(isInCart);
  }, [cart, product._id]);

  const handleClickImage = () => {
    navigate(`/product/${product._id}`, { state: { role } });
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const defaultImage =
    "https://blog.chattigo.com/hubfs/ECommerceCreceM%C3%A9xicoOk.jpg";

  return (
    <Card
      sx={{
        boxShadow: 5,
        borderRadius: 3,
        height: 480,
        display: "flex",
        flexDirection: "column",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        "&:hover": {
          boxShadow: 10,
          backgroundColor: "#f5f5f5",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Img
        component="img"
        image={defaultImage}
        alt={product.name}
        onClick={handleClickImage}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          {product.name}
        </Typography>

        <DescriptionTypography
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {product.description}
        </DescriptionTypography>

        <Typography
          variant="body1"
          color="text.primary"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          ${product.price ? product.price.toFixed(2) : "No disponible"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
          }}
        >
          Stock: {product.stock}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        {role === "Admin" && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDeleteProduct(product._id)}
            sx={{ alignSelf: "flex-end" }}
          >
            Eliminar
          </Button>
        )}
        {role === "Cliente" && (
          <AddShoppingCartIcon
            sx={{
              color: addedToCart ? "gray" : "#1976d2",
              cursor: addedToCart ? "not-allowed" : "pointer",
              fontSize: 30,
            }}
            onClick={!addedToCart ? handleAddToCart : null}
          />
        )}
      </Box>
    </Card>
  );
}
