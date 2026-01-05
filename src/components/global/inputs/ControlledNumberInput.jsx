import { Box, Collapse, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function ControlledNumberInput({
  name,
  label = "",
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
      defaultValue=""
      render={({ field }) => {
        const handleChange = (e) => {
          let v = e.target.value.replace(/[^0-9.]/g, "");
          const parts = v.split(".");
          if (parts.length > 2 || parts[1]?.length > 2) return;
          field.onChange(v);
        };

        return (
          <Box sx={{ width: "100%" }}>
            <TextField
              {...field}
              label={label}
              error={!!fieldError}
              onChange={handleChange}
              sx={{
                "&.MuiTextField-root": { width: "100% !important" },
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
                  width: "100%",
                  backgroundColor: "background.default",
                  borderRadius: "8px",
                },

                ...sx,
              }}
              inputProps={{ inputMode: "decimal" }}
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
        );
      }}
    />
  );
}
