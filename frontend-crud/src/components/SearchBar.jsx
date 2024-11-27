import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ search, setSearch }) {
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <OutlinedInput
      fullWidth
      placeholder="Buscar productos"
      value={search}
      onChange={handleSearchChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}
