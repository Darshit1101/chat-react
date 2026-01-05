import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const CollapsibleSection = ({
  title,
  icon,
  children,
  defaultExpanded = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (!isMobile) {
    return children;
  }

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<KeyboardArrowDown />}
        collapseIcon={<KeyboardArrowUp />}
      >
        {icon && icon}
        <Typography sx={{ ml: icon ? 1 : 0 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CollapsibleSection;
