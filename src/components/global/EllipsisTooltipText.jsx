import { Tooltip, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function EllipsisTooltipText({
  children,
  variant = "body2",
  sx = {},
  ...props
}) {
  const textRef = useRef(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsOverflowed(el.scrollWidth > el.clientWidth);
    }
  }, [children]);

  return (
    <Tooltip
      title={isOverflowed ? children : ""}
      arrow
      placement="top"
      slotProps={{
        tooltip: {
          sx: (theme) => ({
            bgcolor: "white",
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            fontSize: "13px",
            padding: "6px 10px",
          }),
        },
      }}
    >
      <Typography
        ref={textRef}
        variant={variant}
        noWrap
        sx={{
          display: "block",
          fontSize: "14px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...sx,
        }}
        {...props}
      >
        {children}
      </Typography>
    </Tooltip>
  );
}
