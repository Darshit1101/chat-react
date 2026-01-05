import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const DataTable = ({
  columns = [], // [{ id: "name", label: "Name", render: (row) => row.name }]
  rows = [],
  loading = false,
  emptyMessage = "No records found.",
  getRowId = (row) => row._id,
  pagination, // optional: { records, pages, page, limit }
}) => {
  const getExpectedRows = () => {
    if (!pagination) return 10;

    const { records = 0, pages = 1, currentPage = 1, limit = 10 } = pagination;

    if (records === 0) return limit;
    if (currentPage < pages) return limit;
    return records % limit || limit;
  };

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 1 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: "primary.main",
                  whiteSpace: "nowrap",
                  "&.MuiTableCell-root": {
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "primary.contrastText",
                  },
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from({ length: getExpectedRows() }).map((_, rowIdx) => (
              <TableRow key={`skeleton-${rowIdx}`}>
                {columns.map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={getRowId(row)} hover>
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    sx={{ whiteSpace: "nowrap", color: "text.secondary" }}
                  >
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography color="text.secondary" sx={{ py: 3 }}>
                  {emptyMessage}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
