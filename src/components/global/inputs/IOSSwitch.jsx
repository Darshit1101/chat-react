import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 60,
  height: 32,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 4,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 24,
    height: 24,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.25)",
  },

  "& .MuiSwitch-track": {
    borderRadius: 32 / 2,
    backgroundColor: "#F5F5FF",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 300,
    }),
  },
}));

export default IOSSwitch;
