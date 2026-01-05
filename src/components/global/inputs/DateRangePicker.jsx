import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useState } from "react";

const FreeDateRangePicker = ({
  value,
  onChange,
  handleClear,
  showClearButton = false,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [start, end] = value;

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartChange = (newValue) => {
    onChange([newValue, end]);
  };

  const handleEndChange = (newValue) => {
    onChange([start, newValue]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* SINGLE INPUT */}
      <TextField
        fullWidth
        placeholder="Date Range"
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            boxShadow: "none !important",
          },
          ...sx,
        }}
        value={
          start && end
            ? `${dayjs(start).format("DD/MM/YYYY")} - ${dayjs(end).format(
                "DD/MM/YYYY"
              )}`
            : ""
        }
        onClick={handleOpen}
        InputProps={{
          readOnly: true,
          style: { padding: "auto" },
          endAdornment: (
            <InputAdornment position="end">
              {showClearButton && (start || end) && (
                <IconButton onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton>
                <CalendarMonthIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* POPUP RANGE PICKER */}
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box display="flex" gap={2} p={2}>
          <DatePicker
            label="Start Date"
            value={start}
            onChange={handleStartChange}
          />
          <DatePicker
            label="End Date"
            value={end}
            minDate={start}
            onChange={handleEndChange}
          />
        </Box>
      </Popover>
    </LocalizationProvider>
  );
};

export default FreeDateRangePicker;
