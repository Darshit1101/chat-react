/* eslint-disable react-hooks/set-state-in-effect */
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Collapsible = ({
  title,
  description,
  icon,
  children,
  defaultExpanded = false,
  forceExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (typeof forceExpanded === "boolean") {
      setExpanded(forceExpanded);
    }
  }, [forceExpanded]);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={{
        mb: 2,
        borderRadius: 2,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<KeyboardArrowDown />}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {icon && icon}
            <Typography fontWeight={600} fontSize="18px">
              {title}
            </Typography>
          </Box>

          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Collapsible;
