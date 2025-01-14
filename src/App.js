import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments').then((response) => {
      setAppointments(response.data);
    });
  }, []);

  const handleBooking = (id) => {
    axios
      .post('http://localhost:5000/api/book-appointment', { id })
      .then(() => {
        setAppointments(
          appointments.map((appointment) =>
            appointment.id === id
              ? { ...appointment, booked: true }
              : appointment
          )
        );
      });
  };

  return (
    <div className="App">
      <h1>حجز المواعيد</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <span>
              {appointment.date} - {appointment.time} -{' '}
              {appointment.booked ? 'تم الحجز' : 'متاح'}
            </span>
            {!appointment.booked && (
              <button onClick={() => handleBooking(appointment.id)}>
                احجز
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
