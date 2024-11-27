import { TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Grid from "@mui/material/Grid2";

export default function AttributeManager({ attributes, setAttributes }) {
  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", values: [""] }]);
  };

  const handleAttributeNameChange = (index, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].name = value;
    setAttributes(updatedAttributes);
  };

  const handleAttributeValueChange = (attrIndex, valueIndex, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIndex].values[valueIndex] = value;
    setAttributes(updatedAttributes);
  };

  const handleAddValue = (index) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index].values.push("");
    setAttributes(updatedAttributes);
  };

  const handleRemoveValue = (index) => {
    const updatedAttributes = [...attributes];
    if (updatedAttributes[index].values.length > 1) {
      updatedAttributes[index].values = updatedAttributes[index].values.slice(
        0,
        -1
      );
      setAttributes(updatedAttributes);
    }
  };

  const handleRemoveAttribute = () => {
    if (attributes.length > 0) {
      setAttributes(attributes.slice(0, -1));
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddAttribute}
        >
          Agregar Atributo
        </Button>
        <Button
          color="secondary"
          startIcon={<RemoveIcon />}
          onClick={handleRemoveAttribute}
          disabled={attributes.length === 0}
        >
          Quitar Atributo
        </Button>
      </Grid>
      {attributes.map((attribute, attrIndex) => (
        <Grid container key={`attribute-${attrIndex}`} spacing={1}>
          <Grid>
            <TextField
              label={`Nombre del Atributo ${attrIndex + 1}`}
              type="text"
              fullWidth
              value={attribute.name}
              onChange={(e) =>
                handleAttributeNameChange(attrIndex, e.target.value)
              }
            />
          </Grid>

          {attribute.values.map((value, valueIndex) => (
            <Grid key={`value-${attrIndex}-${valueIndex}`}>
              <TextField
                margin="dense"
                label={`Valor ${valueIndex + 1}`}
                type="text"
                fullWidth
                value={value}
                onChange={(e) =>
                  handleAttributeValueChange(
                    attrIndex,
                    valueIndex,
                    e.target.value
                  )
                }
              />
            </Grid>
          ))}
          <Grid>
            <Button
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleAddValue(attrIndex)}
            >
              Agregar Valor
            </Button>
            <Button
              color="secondary"
              startIcon={<RemoveIcon />}
              onClick={() => handleRemoveValue(attrIndex)}
              disabled={attribute.values.length <= 1}
            >
              Quitar Valor
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
