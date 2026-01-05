import { Box, Card, Grid, Skeleton } from "@mui/material";
import React from "react";

const DashboardCardSkeleton = ({ numberOfCards = 2 }) => {
  return (
    <>
      <Grid container spacing={2}>
        {[...Array(numberOfCards)].map((_, i) => (
          <Grid key={i} item size={{ xs: 12, md: 6 }}>
            <Card sx={{ p: 2, height: "100%" }}>
              <Box>
                {/* Name */}
                <Box sx={{ display: "flex", mb: 0.5 }}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width="60%" height={20} sx={{ ml: 1 }} />
                </Box>

                {/* Pickup Id */}
                <Box sx={{ display: "flex", mb: 0.5 }}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width="50%" height={20} sx={{ ml: 1 }} />
                </Box>

                {/* Pickup Date */}
                <Box sx={{ display: "flex", mb: 0.5 }}>
                  <Skeleton width={120} height={20} />
                  <Skeleton width="50%" height={20} sx={{ ml: 1 }} />
                </Box>
              </Box>

              <Skeleton
                variant="rectangular"
                height={35}
                sx={{ mt: 2, borderRadius: 1 }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardCardSkeleton;
