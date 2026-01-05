import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function PasswordInput({ name, label, sx = {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const { control } = useFormContext();
  const theme = useTheme();

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <Box>
          <TextField
            {...field}
            label={label}
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            error={!!error}
            sx={{
              "&.MuiTextField-root": { margin: 0 },
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      sx={{ p: 0 }}
                      onClick={toggleVisibility}
                    >
                      {showPassword ? (
                        <EyeClosed
                          strokeWidth={2.25}
                          style={{
                            width: "20px",
                            height: "20px",
                            color: theme.palette.text.primary,
                          }}
                        />
                      ) : (
                        <Eye
                          strokeWidth={2.25}
                          style={{
                            width: "20px",
                            height: "20px",
                            color: theme.palette.text.primary,
                          }}
                        />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Collapse in={error?.message}>
            <Typography
              sx={{
                color: theme.palette.error.main,
                mt: 1,
                ml: 1,
                textAlign: "left",
                fontSize: "12px",
              }}
            >
              {error?.message}
            </Typography>
          </Collapse>
        </Box>
      )}
    />
  );
}
