import { Box, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function TextArea({
  name,
  label = "",
  rows = 4,
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
            label={label}
            fullWidth
            multiline
            rows={rows}
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

          {fieldError && (
            <Box sx={{ mt: 0.5 }}>
              <Typography
                variant="body2"
                color="error"
                sx={{ fontSize: "12px" }}
              >
                {fieldError.message}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    />
  );
}
