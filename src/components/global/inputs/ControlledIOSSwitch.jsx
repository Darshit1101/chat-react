import IOSSwitch from "./IOSSwitch";
import { Box, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

/**
 * RHF controlled iOS-style switch
 */
export default function ControlledIOSSwitch({
  name,
  label,
  disabled = false,
  sx = {},
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            ...sx,
          }}
        >
          {label && <Typography fontWeight={600}>{label}</Typography>}

          <IOSSwitch
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
          />
        </Box>
      )}
    />
  );
}
