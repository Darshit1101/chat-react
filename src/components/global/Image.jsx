import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

export default function Image({
  src,
  alt = "image",
  width = "100%",
  height = "auto",
  borderRadius = 1,
  objectFit = "cover",
  mixBlendMode,
  fallbackSrc = "/placeholder.png",
  sx = {},
  ...props
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      borderRadius={borderRadius}
      overflow="hidden"
      sx={{ ...sx }}
    >
      {loading && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      <Box
        component="img"
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        sx={{
          width: "100%",
          height: "100%",
          objectFit,
          mixBlendMode,
          display: loading ? "none" : "block",
        }}
        {...props}
      />
    </Box>
  );
}
