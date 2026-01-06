export default function formatDateTime(timestamp) {
  const createdAt = new Date(timestamp);

  const date = createdAt.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = createdAt.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${date} at ${time}`;
}
