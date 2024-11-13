const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const hotelData = {
  hotelName: "Sunset Resort",
  rooms: 100,
  availableRooms: 20,
};

function checkAvailability() {
  const available = hotelData.availableRooms > 0;
  return {
    available,
    availableRooms: hotelData.availableRooms,
    hotelName: hotelData.hotelName,
    message: available ? "Rooms are available." : "No rooms available.",
  };
}

/**
 * Availability API
 *
 */
app.get("/check-availability", (req, res) => {
  const availability = checkAvailability();
  res.json(availability);
});

/**
 * Booking API
 *
 */
app.post("/book-hotel", (req, res) => {
  const { name, roomsRequested } = req.body;

  if (!name || !roomsRequested) {
    return res
      .status(400)
      .json({ message: "Missing name or number of rooms." });
  }

  if (roomsRequested > hotelData.availableRooms) {
    return res.status(400).json({ message: "Not enough rooms available." });
  }

  hotelData.availableRooms -= roomsRequested;
  res.json({
    message: `Booking successful for ${roomsRequested} room(s).`,
    name,
    roomsBooked: roomsRequested,
    remainingRooms: hotelData.availableRooms,
  });
});

/**
 * Server Start
 *
 */
app.listen(port, () => {
  console.log(`Hotel API running on http://localhost:${port}`);
});
