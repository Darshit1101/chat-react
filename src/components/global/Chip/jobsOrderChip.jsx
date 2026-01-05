import { jobStatusMap } from "../../../constants/jobStatusMap";
import { Chip } from "@mui/material";

const statusColors = {
  BOOKED: { color: "#1976d2", bg: "rgba(25,118,210,0.1)" },
  DRIVER_ASSIGNED: { color: "#5c6bc0", bg: "rgba(92,107,192,0.1)" },
  PICKUP_SCHEDULED: { color: "#009688", bg: "rgba(0,150,136,0.1)" },
  PICKED_UP: { color: "#2e7d32", bg: "rgba(46,125,50,0.1)" },
  LAUNDROMAT: { color: "#7b1fa2", bg: "rgba(123,31,162,0.1)" },
  LAUNDRY_FINISHED: { color: "#2e7d32", bg: "rgba(46,125,50,0.1)" },
  DELIVERY_SCHEDULED: { color: "#f57c00", bg: "rgba(245,124,0,0.1)" },
  DELIVERED: { color: "#388e3c", bg: "rgba(56,142,60,0.1)" },
  CANCELED: { color: "#d32f2f", bg: "rgba(211,47,47,0.1)" },
};

const JobStatusChip = ({ status, label: customLabel }) => {
  const key = status?.toUpperCase()?.replaceAll(" ", "_");
  const defaultLabel = jobStatusMap[key] || status;
  const label = customLabel || defaultLabel;
  const { color, bg } = statusColors[key] || {
    color: "#6c757d",
    bg: "rgba(108,117,125,0.1)",
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        color,
        backgroundColor: bg,
        fontWeight: 600,
        fontSize: "13px",
        textTransform: "capitalize",
      }}
    />
  );
};

export default JobStatusChip;
