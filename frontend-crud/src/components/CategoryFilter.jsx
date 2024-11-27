import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="category-select-label">Categoría</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        input={<OutlinedInput label="Categoría" />}
        renderValue={(selected) =>
          selected ? (
            <Chip
              label={categories.find((cat) => cat._id === selected)?.name}
            />
          ) : (
            <em>categoría</em>
          )
        }
      >
        <MenuItem value="">
          <em>Todas las categorias</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
