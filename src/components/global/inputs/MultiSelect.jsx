import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultiSelectCheckbox({
  name,
  control,
  label = "",
  options = [],
  placeholder = "Select...",
  disabled = false,
  sx = {},
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <FormControl fullWidth sx={sx} size="small">
          <InputLabel>{label}</InputLabel>

          <Select
            multiple
            disabled={disabled}
            value={field.value || []}
            onChange={(e) => field.onChange(e.target.value)}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) =>
              selected.length === 0 ? placeholder : selected.join(",")
            }
            MenuProps={MenuProps}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                boxShadow: "none !important",
              },
            }}
            {...rest}
          >
            {options.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                dense
                sx={{
                  py: 0.5, // reduce vertical padding
                  px: 1, // reduce horizontal padding
                  minHeight: "32px", // overall compact height
                  "& .MuiCheckbox-root": {
                    padding: "4px", // reduce checkbox padding
                  },
                }}
              >
                <Checkbox
                  checked={field.value.includes(opt.value)}
                  size="small"
                />
                <ListItemText
                  primary={opt.label}
                  primaryTypographyProps={{ fontSize: "14px" }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}
