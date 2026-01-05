import { Box, Collapse, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function MultiSelectPills({
  name,
  label,
  options = [],
  sx = {},
}) {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography sx={{ mb: 1, fontWeight: 600, fontSize: "14px" }}>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => {
          const value = field.value || [];

          const toggleValue = (item) => {
            const exists = value.includes(item);
            const newValue = exists
              ? value.filter((v) => v !== item)
              : [...value, item];

            field.onChange(newValue);
          };

          return (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 2,
                ...sx,
              }}
            >
              {options.map((opt) => {
                const selected = value.includes(opt.value);

                return (
                  <Typography
                    key={opt.value}
                    onClick={() => toggleValue(opt.value)}
                    sx={{
                      py: "14px",
                      textAlign: "center",
                      borderRadius: "20px",
                      border: `2px solid ${selected ? theme.palette.primary.main : "#1C1C4C"}`,
                      backgroundColor: selected
                        ? theme.palette.primary.main
                        : "white",
                      color: selected ? "white" : theme.palette.text.primary,
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "0.2s ease",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    {opt.label}
                  </Typography>
                );
              })}
            </Box>
          );
        }}
      />

      <Collapse in={!!errors[name]}>
        <Typography
          sx={{
            color: theme.palette.error.main,
            mt: 1,
            ml: 1,
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {errors[name]?.message}
        </Typography>
      </Collapse>
    </Box>
  );
}
