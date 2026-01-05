import { Button as MuiButton, useTheme } from "@mui/material";
export default function Button({
  children,
  type = "button",
  variant = "contained",
  loading = false,
  size = "small",
  sx = {},
  ...rest
}) {
  const theme = useTheme();
  return (
    <MuiButton
      loading={loading}
      type={type}
      variant={variant}
      size={size}
      sx={{
        textTransform: "initial",
        color: loading ? "transparent !important" : "inherited",
        "&.Mui-disabled": {
          backgroundColor: "background.mute",
          color: "text.mute",
          border: `1px solid ${theme.palette.mute.primary}`,
        },
        "&.MuiButton-outlined": {
          border: `1px solid`,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
