import { Box, Collapse, Typography, useTheme } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

export default function TelInput({
  name,
  label = "Phone Number",
  sx = {},
  ...props
}) {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value, ...restField } }) => (
        <Box sx={{ width: "100%" }}>
          <MuiTelInput
            {...restField}
            value={value}
            onChange={onChange}
            defaultCountry="AU"
            onlyCountries={["AU"]}
            forceCallingCode
            label={label}
            variant="outlined"
            fullWidth
            error={!!errors[name]}
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
              "& .MuiIconButton-root": {
                width: "auto",
                height: "auto",
                border: "none",
                padding: 0,
                paddingRight: "4px",
              },
              ...sx,
            }}
            {...props}
          />
          <Collapse in={!!errors[name]}>
            <Typography
              sx={{
                color: theme.palette.error.main,
                mt: 1,
                ml: 2,
                textAlign: "left",
              }}
            >
              {errors[name]?.message}
            </Typography>
          </Collapse>
        </Box>
      )}
    />
  );
}
