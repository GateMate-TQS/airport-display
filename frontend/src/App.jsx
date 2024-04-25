import React, { useState } from "react";
//import "./css/main.css";
import "./css/coiso.scss";
import { FaPlaneDeparture } from "react-icons/fa";

function Flight({ flight }) {
  // Function to generate departure board based on flight data
  const generateDepartureBoard = (flightNumber, destination, gate, status) => {
    // Concatenate flight information into a single string
    let flightInfo = `${flightNumber} ${destination} ${gate} ${status}`;
    const rowsize = 32;
    const spaces = rowsize - flightInfo.length;

    // Add spaces to the end of the string to make it 32 characters long
    for (let i = 0; i < spaces; i++) {
      flightInfo += " ";
    }

    // Split the concatenated string into individual letters
    const letters = flightInfo
      .split("")
      .map((letter, index) => (
        <span
          key={index}
          className={`mt-2 letter letter-${
            letter === " " ? "blank" : letter.toUpperCase()
          }`}
        ></span>
      ));
    return letters;
  };

  return (
    <div className="departure-board flex justify-center items-center">
      {generateDepartureBoard(
        flight.flightNumber,
        flight.destination,
        flight.gate,
        flight.status
      )}
    </div>
  );
}

function App() {
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightNumber: "AB123",
      destination: "Madrid",
      gate: "A1",
      status: "On time",
    },
    {
      id: 2,
      flightNumber: "CD456",
      destination: "Lisbon",
      gate: "B2",
      status: "Delayed",
    },
    {
      id: 3,
      flightNumber: "EF789",
      destination: "London",
      gate: "C3",
      status: "Boarding",
    },
    {
      id: 4,
      flightNumber: "GH012",
      destination: "Paris",
      gate: "D4",
      status: "Cancelled",
    },
    {
      id: 5,
      flightNumber: "IJ345",
      destination: "Berlin",
      gate: "E5",
      status: "On time",
    },
    {
      id: 6,
      flightNumber: "KL678",
      destination: "Rome",
      gate: "F6",
      status: "Delayed",
    },
    {
      id: 7,
      flightNumber: "MN901",
      destination: "Amsterdam",
      gate: "G7",
      status: "Boarding",
    },
    {
      id: 8,
      flightNumber: "OP234",
      destination: "Dublin",
      gate: "H8",
      status: "Cancelled",
    },
  ]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="text-4xl mb-8">
          <h1 className="text-center">
            <FaPlaneDeparture className="inline-block" />
            <div>
              <span className="text-2xl">Departures</span>
            </div>
          </h1>
        </div>
        <div className="rounded-lg w-full md:max-w-7xl">
          <div className="bg-gray-800 text-white p-4">
            <div className="flex justify-between font-bold">
              <div className="w-1/4">Flight</div>
              <div className="w-1/4">Destination</div>
              <div className="w-1/4">Gate</div>
              <div className="w-1/4">Status</div>
            </div>
          </div>
          <div>
            {flights.map((flight) => (
              <Flight key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
