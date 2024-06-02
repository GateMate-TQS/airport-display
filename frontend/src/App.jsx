import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/coiso.scss";
import { FaPlaneDeparture } from "react-icons/fa";

function Flight({ flight }) {
  const generateDepartureBoard = (flightNumber, destination, gate, status) => {
    const rowsize = 32;

    let flightNumberStr = flightNumber.padEnd(7, " ");
    let destinationStr = destination.padEnd(9, " ");
    let gateStr = gate.padEnd(5, " ");
    let statusStr = status.padEnd(10, " ");

    let flightInfo = flightNumberStr + destinationStr + gateStr + statusStr;
    flightInfo = flightInfo.padEnd(rowsize, " ");

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
  const [flights, setFlights] = useState([]);

  const getRandomGate = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letter = letters[Math.floor(Math.random() * letters.length)];
    const number = Math.floor(Math.random() * 30) + 1;
    return `${letter}${number}`;
  };

  const getRandomStatus = () => {
    const statuses = ["On time", "Delayed", "Boarding", "Cancelled"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost/api/flight/allFlights"
        );
        const flightsData = response.data
          .map((flight) => ({
            id: flight.id,
            flightNumber: flight.flightIata,
            destination: flight.destination.name,
            gate: getRandomGate(),
            status: getRandomStatus(),
            scheduledTime: new Date(flight.destination.scheduled),
          }))
          .filter((flight) => flight.destination.length <= 8)
          .sort((a, b) => a.scheduledTime - b.scheduledTime)
          .slice(0, 10);
        setFlights(flightsData);
      } catch (error) {
        console.error("Error fetching flights data:", error);
      }
    };

    fetchFlights();

    const interval = setInterval(fetchFlights, 60000);

    return () => clearInterval(interval);
  }, []);

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
