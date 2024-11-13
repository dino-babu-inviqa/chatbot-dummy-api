const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const hotelData = {
  totalRooms: 100,
  availableRooms: 3,
};

function checkAvailability() {
  const available = hotelData.availableRooms > 0;
  return {
    totalRooms: hotelData.totalRooms,
    availableRooms: hotelData.availableRooms,
    message: available ? "Rooms are available." : "No rooms available.",
  };
}

/**
 * Availability API
 *
 */
app.get("/check-room", (req, res) => {
  const { roomDate } = req.body;
  console.log("Check availabiliy for date", roomDate);
  if (!roomDate) {
    return res
      .status(400)
      .json({ message: "Missing roomDate" });
  }
  const availability = checkAvailability();
  res.json(availability);
});

/**
 * Booking API
 *
 */
app.post("/book-room", (req, res) => {
  const { userName, roomDate, roomCount } = req.body;
  console.log("Book Room", userName, roomDate, roomCount);
  if (!userName || !roomDate || !roomCount) {
    return res
      .status(400)
      .json({ message: "Missing userName, roomDate or roomCount" });
  }

  if (roomCount > hotelData.availableRooms) {
    return res.status(400).json({ message: "Not enough rooms available." });
  }

  hotelData.availableRooms -= roomCount;
  res.json({
    message: `Booking successful for ${roomCount} room(s).`,
    roomDate: roomDate,
    userName: userName,
    roomCount: roomCount,
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
