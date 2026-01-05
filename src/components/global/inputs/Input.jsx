import { Box, Collapse, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function Input({
  name,
  label = "",
  type = "text",
  sx = {},
  ...props
}) {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = name.split(".").reduce((acc, key) => acc?.[key], errors);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box sx={{ width: "100%" }}>
          <TextField
            {...field}
            type={type}
            label={label}
            fullWidth
            error={!!fieldError}
            aria-invalid={!!fieldError}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "14.5px !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                boxShadow: "none !important",
              },
              "& .MuiInputLabel-root": {
                color: theme.palette.text.mute,
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.default",
                borderRadius: "8px",
              },
              ...sx,
            }}
            {...props}
          />

          <Collapse in={!!fieldError}>
            <Typography
              sx={{
                color: theme.palette.error.main,
                mt: 1,
                ml: 1,
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {fieldError?.message}
            </Typography>
          </Collapse>
        </Box>
      )}
    />
  );
}
