import { paymentStatusColors } from "../../../constants/paymentStatuses";
import { Chip } from "@mui/material";

export default function PaymentStatusChip({ status }) {
  if (!status) return null;

  const key = status.toLowerCase();
  const label = String(status).replaceAll("_", " ");
  const { color, bg } = paymentStatusColors[key] || {
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
}
