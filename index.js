
const express = require("express");
const app = express();
app.use(express.json());
const PORT = 9000;

const halls = [
    {
        id: "1",
        numberOfSeats: 100,
        amenities: ["Ac", "chairs", "discolights"],
        price: 5000,
        ifBooked: "Booked",
        RoomId: 201,
        RoomName: "Duplex",
        customerName: "Mahi",
        date: "05-feb-2022",
        startTime: "10-feb-2022 at 12PM",
        endTime: "11-feb-2020 at 11am",
    },
    {
        id: "2",
        numberOfSeats: 100,
        amenities: ["Ac", "chairs", "discolights"],
        price: 6000,
        ifBooked: "true",
        RoomId: 202,
        RoomName: "Super-Duplex",
        customerName: "jhon",
        date: "1-march-2023",
        startTime: "1-march-2023 at 2PM",
        endTime: "1-march-2023 at 1am"
    },
    {
        id: "3",
        numberOfSeats: 100,
        amenities: ["Ac", "chairs", "discolights"],
        price: 4000,
        ifBooked: "false",
        RoomId: 203,
        RoomName: "Gallexy",
        customerName: "",
        date: "",
        startTime: "",
        endTime: "",
    },
]
/**
 * HOME PAGE ROUTE
 */
app.get("/", (req, res) => {
    res.send("Welcome to Hotel Bridhaven...")
});
/**
 * GET ALL DETAILS IN API ENDPOINT */

app.get("/hall/details", (req, res) => {
    res.send(halls);
});
/**
 * 1)CREATING THE NEW HALL
 */
app.post("/hall/create", (req, res) => {
    const newHall = {
        id: halls.length + 1,
        numberOfSeats: req.body.numberOfSeats,
        amenities: req.body.amenities,
        RoomId: req.body.RoomId,
        ifBooked: req.body.ifBooked,
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        RoomName: req.body.RoomName,
    }
    console.log(req.body);
    halls.push(newHall);
    res.send(halls);
})
/**
 * 2)BOOKING A ROOM 
 */
app.put("/halls/booking/:id", (req, res) => {
    const { id } = req.params;
    const Hall = halls.find(hall => hall.id === id);
    if (Hall.ifBooked === "Booked") {
        res.status(400).send("Sorry This Hall is Already Booked")
    }
    else {
        Hall.RoomId = req.body.RoomId;
        Hall.date = req.body.date;
        Hall.startTime = req.body.startTime;
        Hall.endTime = req.body.endTime;
        Hall.customerName = req.body.customerName;
        Hall.ifBooked = "Booked"
        res.status(200).json({
            message: "Room Booking Sucessfully!!!"
        })
    }
})
/**
 * 3) LIST ALL ROOMS WITH BOOKED DATA * 
 */
app.get("/booked/halls", (req, res) => {
    res.status(200).send(
        halls.map((room) => {
            if (room.ifBooked === "Booked") {
                return {
                    "RoomName": room.RoomName,
                    "ifBooked": room.ifBooked,
                    "customerName": room.customerName,
                    "date": room.date,
                    "StartTime": room.startTime,
                    "endTime": room.endTime
                }
            }
            else {
                return { "RoomName": room.RoomName, "ifBooked": "vacant" }
            }
        })
    )
})
/**
 * 4)LIST OF ALL CUSTOMER BOOKED DATA
 */
app.get("/customer/details", (req, res) => {
    res.status(200).send(
        halls.map((room) => {
            if (room.ifBooked === "Booked") {
                return {
                    "customerName": room.customerName,
                    "RoomName": room.RoomName,
                    "ifBooked": room.ifBooked,
                    "date": room.date,
                    "StartTime": room.startTime,
                    "endTime": room.endTime
                }
            }
            else {
                return { "RoomName": room.RoomName, "ifBooked": "vacant" }
            }
        })
    )
})

//set server listen under port: 5000
app.listen(`${PORT}`, () => console.log(`server started in localhost:${PORT}`))