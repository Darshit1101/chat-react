import useApiCall from "../../../hooks/useApiCall";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function AsyncSearchSelect({
  name,
  control,
  label,
  searchUrl,
  searchKey = "search",
  multiple = false,
  extractOptions = (res) => res?.data || [],
  additionalQueries = {},
  sx = {},
  autoFetch = false,
  renderOption,
  noOptionsText = "Start typing to search...",
  disabled = false,
  ...rest
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);

  const { data, loading, apiCall } = useApiCall({
    url: searchUrl,
    method: "GET",
    autoFetch,
    params: { [searchKey]: searchTerm, ...additionalQueries },
  });

  useEffect(() => {
    if (data) {
      const extracted = extractOptions(data);
      setOptions(extracted);
    }
  }, [data, extractOptions]);

  useEffect(() => {
    if (searchTerm.length < 2) return;
    const delay = setTimeout(() => {
      apiCall({ params: { [searchKey]: searchTerm, ...additionalQueries } });
    }, 400);
    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field, fieldState }) => (
        <Autocomplete
          disabled={disabled}
          multiple={multiple}
          options={options}
          value={field.value || (multiple ? [] : null)}
          getOptionLabel={(option) =>
            typeof option?.label === "string" ? option?.label : ""
          }
          isOptionEqualToValue={(opt, val) => opt?.value === val?.value}
          loading={loading}
          onChange={(_, selected) => field.onChange(selected)}
          onInputChange={(_, newValue) => setSearchTerm(newValue)}
          noOptionsText={
            searchTerm.length < 2 ? noOptionsText : "No matching results"
          }
          renderOption={(props, option) =>
            renderOption ? (
              renderOption(props, option)
            ) : (
              <li {...props} key={option.label}>
                {option?.label}
              </li>
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "14.5px !important",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  boxShadow: "none !important",
                },
                "& .MuiAutocomplete-endAdornment": {
                  background: "#fff",
                  borderRadius: 1,
                },
                "& .MuiOutlinedInput-root": {
                  p: "0px !important",
                  pl: "8px !important",
                  ".MuiChip-label": { pr: "6px" },
                  ".MuiChip-deleteIcon": { m: "1px" },
                },
                ...sx,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && (
                      <CircularProgress
                        size={16}
                        sx={{ marginRight: "12px" }}
                      />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              {...rest}
            />
          )}
        />
      )}
    />
  );
}
