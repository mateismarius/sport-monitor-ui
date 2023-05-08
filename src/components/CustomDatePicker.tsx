import Stack from "@mui/material/Stack";
import AdapterDateFns from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { TextField } from "@mui/material";
import roLocale  from 'date-fns/locale/ro'

export default function CustomDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={roLocale} >
      <Stack spacing={4} sx={{ width: "86%"}}>
        <DatePicker
          label="Data achizitionarii"
          renderInput={(params) => <TextField {...params} />}
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue)
          }}

        />
      </Stack>
    </LocalizationProvider>
  );
}
