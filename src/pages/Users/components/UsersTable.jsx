import ColorChip from "../../../components/global/Chip/ColorChip";
import DataTable from "../../../components/global/tables/DataTable";
import apiList from "../../../constants/apiList";
import apiService from "../../../services/apiService";
import { useAuth } from "../../../stores/useAuth";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersTable = () => {
  const { id: currentUserId } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiService(apiList.AUTH.USERS);
        if (res.success) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      id: "_id",
      label: "ID",
      render: (users) => {
        const isCurrentUser = users._id === currentUserId;
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                textDecoration: "none",
                color: isCurrentUser ? "text.secondary" : "primary.main",
                fontWeight: 500,
                cursor: isCurrentUser ? "default" : "pointer",
              }}
              component={isCurrentUser ? "span" : Link}
              to={isCurrentUser ? undefined : `/chat/${users._id}`}
            >
              {users?._id}
            </Typography>
            {isCurrentUser && <ColorChip label="You" color="blue" />}
          </Box>
        );
      },
    },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
  ];

  return <DataTable rows={users} columns={columns} />;
};

export default UsersTable;
