const express = require('express');
const app = express();
const port = 5000;

let appointments = [
  { id: 1, date: '2025-01-15', time: '10:00 AM', booked: false },
  { id: 2, date: '2025-01-15', time: '11:00 AM', booked: false },
  { id: 3, date: '2025-01-15', time: '12:00 PM', booked: false },
];

app.get('/api/appointments', (req, res) => {
  res.json(appointments);
});

app.post('/api/book-appointment', (req, res) => {
  const { id } = req.body;
  appointments = appointments.map((appointment) =>
    appointment.id === id ? { ...appointment, booked: true } : appointment
  );
  res.json({ message: 'تم حجز الموعد بنجاح' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
