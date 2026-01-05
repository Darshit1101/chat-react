import TextField from "@mui/material/TextField";

function NumberInput({
  value = "",
  onChange,
  disabled = false,
  label = "Qty",
  size = "small",
  sx = { width: 90 },

  // ✅ new props
  error = false,
  helperText = "",
}) {
  const handleChange = (e) => {
    let v = e.target.value.replace(/[^0-9]/g, "");

    // limit to 3 digits
    if (v.length > 3) return;

    const num = Number(v);
    if (num >= 0 && num <= 999) {
      onChange?.(v);
    }
  };

  const handleKeyDown = (e) => {
    if (
      ["e", "E", "+", "-", ".", ","].includes(e.key) ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
    }
  };

  return (
    <TextField
      type="text"
      size={size}
      disabled={disabled}
      sx={sx}
      label={label}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onWheel={(e) => e.target.blur()}
      error={error}
      helperText={helperText}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
    />
  );
}

export default NumberInput;
