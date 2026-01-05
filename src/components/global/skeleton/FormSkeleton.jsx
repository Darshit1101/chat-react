import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

export default function FormSkeleton({
  sections = 1,
  fieldsPerSection = 4,
  showButton = true,
}) {
  return (
    <Stack spacing={3}>
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <Card key={sectionIndex} sx={{ boxShadow: "none" }}>
          <CardContent>
            {/* Section title */}
            <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />

            {/* Fields */}
            <Stack spacing={2}>
              {Array.from({ length: fieldsPerSection }).map((_, fieldIndex) => (
                <Skeleton key={fieldIndex} variant="rounded" height={40} />
              ))}
            </Stack>

            {/* Save button */}
            {showButton && (
              <Box sx={{ mt: 3 }}>
                <Skeleton variant="rounded" width={150} height={50} />
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
