import React, { useState } from "react";
import { TextField, Switch, Button, MenuItem, Select, FormControl, InputLabel, Typography, Box } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [tickets, setTickets] = useState("Free");
  const [requireApproval, setRequireApproval] = useState(false);
  const [capacity, setCapacity] = useState("Unlimited");

  const handleSubmit = async () => {
    const eventData = {
      name: document.querySelector('input[aria-label="Event Name"]').value,
      startDate,
      endDate,
      location: eventLocation,
      description,
      tickets,
      requireApproval,
      capacity,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
  
      if (response.ok) {
        alert("Event created successfully!");
      } else {
        alert("Error creating event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ padding: "2rem", maxWidth: "600px", margin: "auto", backgroundColor: "#fdf7ff", borderRadius: "10px" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
        Create Event
      </Typography>
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField fullWidth label="Event Name" variant="outlined" placeholder="Enter Event Name" />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <DateTimePicker
            label="Start"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
          <DateTimePicker
            label="End"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </LocalizationProvider>
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField
          fullWidth
          label="Event Location"
          variant="outlined"
          placeholder="Offline location or virtual link"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <FormControl fullWidth>
          <InputLabel>Tickets</InputLabel>
          <Select value={tickets} onChange={(e) => setTickets(e.target.value)}>
            <MenuItem value="Free">Free</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Require Approval</Typography>
          <Switch checked={requireApproval} onChange={(e) => setRequireApproval(e.target.checked)} />
        </Box>
      </Box>
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField
          fullWidth
          label="Capacity"
          variant="outlined"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Unlimited"
        />
      </Box>
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Create Event
      </Button>
    </Box>
  );
};

export default App;