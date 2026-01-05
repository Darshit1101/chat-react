import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2C3276",
      light: "#9FA4E8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#365361",
      light: "#8d9ba3",
      dark: "#837e61",
      contrastText: "#efeeea",
    },
    mute: { primary: "#ABABAB" },

    success: {
      main: "#16a34a",
    },
    error: {
      main: "#e11d48",
    },
    warning: {
      main: "#d3b300",
      light: "#fee453ff",
    },
    info: {
      main: "#3b82f6",
    },
    purple: {
      main: "#9c27b0",
    },
    neutral: {
      50: "#fbfbfb",
      100: "#f5f5f5",
      200: "#ebebeb",
      300: "#e5e5e5",
      400: "#9c9c9c",
      900: "#060215",
    },

    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
      mute: "#f8f8f8",
      blur: "rgba(255, 255, 255, 0.8)",
    },
    text: {
      primary: "#2C3276",
      primaryContrast: "#ffffff",
      secondary: "#151515",
      mute: "#ABABAB",
    },
  },

  customShadows: {
    soft: "0 0 6px rgba(0,0,0,0.15)",
    primary: "0px 0px 10px 5px rgba(159, 164, 232, 0.25)",
  },

  blur: {
    sm: "5px",
    md: "8px",
    lg: "12px",
    xl: "20px",
  },

  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontFamily: "Manrope, sans-serif",
    body1: { fontSize: "0.95rem" },
    body2: { fontSize: "0.85rem" },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "5px",
          padding: "7px 16px",
          "&.Mui-disabled": {
            pointerEvents: "initial",
            cursor: "not-allowed",
          },
        },
        outlinedPrimary: {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
        containedGray: {
          backgroundColor: theme.palette.neutral[200],
          color: theme.palette.neutral[900],
          "&:hover": {
            backgroundColor: theme.palette.neutral[300],
          },
        },
        outlinedError: {
          backgroundColor: "white",
        },
        outlinedGray: {
          borderColor: theme.palette.neutral[300],
          color: theme.palette.neutral[900],
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: theme.palette.neutral[100],
          },
        },
        textGray: {
          color: theme.palette.neutral[900],
          "&:hover": {
            backgroundColor: theme.palette.neutral[100],
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-colorOutlinedGray": {
            border: `1px solid ${theme.palette.neutral[300]}`,
            color: theme.palette.neutral[900],
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: theme.palette.neutral[100],
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto !important",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          backgroundColor: "white",
          maxWidth: "100%",
          width: "300px",
          "& .MuiInputBase-input": {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "1.75",
            color: theme.palette.text.primary,
            padding: "8px 12px",
            height: "auto",
          },
          "&.MuiInputBase-fullWidth": {
            width: "100%",
          },
          "&.MuiInputBase-multiline": {
            padding: 0,
          },
          "& .MuiInputBase-input::placeholder": {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.neutral[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.neutral[300],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: theme.palette.primary.main,
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
          "&.Mui-focusVisible .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: theme.palette.primary.main,
            boxShadow: `0px 0px 0px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.neutral[300],
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error.main,
          },
          "&:has(> input:-webkit-autofill)": {
            backgroundColor: alpha(theme.palette.primary.light, 0.1),
          },
          input: {
            "&:-webkit-autofill": {
              transitionDelay: "9999s",
              transitionProperty: "background-color, color",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiSelect-icon": {
            width: "18px",
            top: "initial",
            right: "9px",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xxl",
      },
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.neutral[300],
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          "& .MuiDivider-root": {
            marginBlock: "4px !important",
          },
        },
        paper: {
          border: `1px solid ${theme.palette.neutral[300]}`,
          borderRadius: "5px",
          boxShadow: `0px 4px 6px ${alpha(theme.palette.neutral[900], 0.1)}`,
        },
        list: {
          paddingBlock: "4px",
          "& .MuiMenuItem-root.Mui-selected": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          },
          "& .MuiMenuItem-root.Mui-selected.Mui-focusVisible": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          },
          "& .MuiMenuItem-root.Mui-focusVisible": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
          },
          "& .MuiMenuItem-root.Mui-selected.Mui-disabled": {
            backgroundColor: "transparent",
            color: theme.palette.text.secondary,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          minHeight: "initial",
          gap: "10px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 600,
            color: theme.palette.neutral[400],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          padding: "10px 14px",
          borderColor: theme.palette.neutral[300],
        },
        body: {
          height: "61px",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root:hover": {
            backgroundColor: theme.palette.neutral[50],
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          minWidth: "36px",
          height: "36px",
          borderRadius: "36px",
          marginInline: "1px",
          "&.Mui-disabled": {
            pointerEvents: "initial",
            cursor: "not-allowed",
          },
          "& .MuiPaginationItem-icon": {
            width: "18px",
            strokeWidth: "1.7",
          },
          "&.MuiPaginationItem-ellipsis": {
            lineHeight: "2",
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          ml: "24px",
          maxWidth: "400px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "auto",
          fontSize: "13px",
        },
        label: {
          paddingBlock: "1px",
        },
        outlined: {
          backgroundColor: "white",
        },
        filledWarning: {
          backgroundColor: "#fffbe7",
          color: theme.palette.warning.main,
          border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`,
        },
        filledPrimary: {
          backgroundColor: "#e1e4ff",
          color: theme.palette.primary.main,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        },
        filledSuccess: {
          backgroundColor: "#ccefd9",
          color: theme.palette.success.main,
          border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
        },
        filledError: {
          backgroundColor: "#ffe1e8",
          color: theme.palette.error.main,
          border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
        },
        filledPurple: {
          backgroundColor: "#f9dcfe",
          color: theme.palette.purple.main,
          border: `1px solid ${alpha(theme.palette.purple.main, 0.3)}`,
        },
        filledInfo: {
          backgroundColor: "#d7e6ff",
          color: theme.palette.info.main,
          border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
