import { Chip } from "@mui/material";

const colorMap = {
  red: { color: "#d32f2f", bg: "rgba(211,47,47,0.1)" },
  green: { color: "#2e7d32", bg: "rgba(46,125,50,0.1)" },
  yellow: { color: "#f57c00", bg: "rgba(245,124,0,0.1)" },
  blue: { color: "#1976d2", bg: "rgba(25,118,210,0.1)" },
  purple: { color: "#7b1fa2", bg: "rgba(123,31,162,0.1)" },
  grey: { color: "#6c757d", bg: "rgba(108,117,125,0.1)" },
};

const ColorChip = ({ color = "grey", label, size = "small", ...props }) => {
  const { color: textColor, bg } = colorMap[color] || colorMap.grey;

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        color: textColor,
        backgroundColor: bg,
        fontWeight: 600,
        fontSize: "12px",
        borderRadius: "6px",
        textTransform: "capitalize",
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default ColorChip;
