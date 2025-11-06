"use client";

import React from "react";
import {
  Button,
  Typography,
  Stack,
  Pagination as MUIPagination,
} from "@mui/material";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  theme?: "light" | "dark";
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  theme = "light",
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ mt: 3, px: 2 }}
    >
      <Typography
        variant="body2"
        sx={{
          color: theme === "dark" ? "#9ca3af" : "#4b5563",
        }}
      >
        Showing{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: 600,
            color: theme === "dark" ? "#e5e7eb" : "#1f2937",
          }}
        >
          {startIndex}
        </Typography>{" "}
        to{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: 600,
            color: theme === "dark" ? "#e5e7eb" : "#1f2937",
          }}
        >
          {endIndex}
        </Typography>{" "}
        of{" "}
        <Typography
          component="span"
          sx={{
            fontWeight: 600,
            color: theme === "dark" ? "#e5e7eb" : "#1f2937",
          }}
        >
          {totalItems}
        </Typography>{" "}
        results
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{
            borderColor: theme === "dark" ? "#334155" : "#d1d5db",
            color: "#6b7280",
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#334155" : "#f9fafb",
              borderColor: theme === "dark" ? "#334155" : "#d1d5db",
            },
            "&:disabled": {
              borderColor: theme === "dark" ? "#334155" : "#d1d5db",
              opacity: 0.5,
            },
          }}
        >
          Previous
        </Button>

        <MUIPagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          size="small"
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme === "dark" ? "#d1d5db" : "#374151",
              backgroundColor: theme === "dark" ? "#1a1a24" : "#ffffff",
              border: `1px solid ${theme === "dark" ? "#334155" : "#d1d5db"}`,
              "&:hover": {
                backgroundColor: theme === "dark" ? "#334155" : "#f9fafb",
              },
              "&.Mui-selected": {
                background: "linear-gradient(to right, #8b5cf6, #4f46e5)",
                color: "white",
                border: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #7c3aed, #4338ca)",
                },
              },
            },
          }}
        />

        <Button
          variant="outlined"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{
            borderColor: theme === "dark" ? "#334155" : "#d1d5db",
            color: "#6b7280",
            backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#334155" : "#f9fafb",
              borderColor: theme === "dark" ? "#334155" : "#d1d5db",
            },
            "&:disabled": {
              borderColor: theme === "dark" ? "#334155" : "#d1d5db",
              opacity: 0.5,
            },
          }}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default Pagination;
