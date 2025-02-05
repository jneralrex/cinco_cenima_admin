import React, { useState } from "react";

const SeatingRowManagement = () => {
  const [rows, setRows] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [seatsPerRow, setSeatsPerRow] = useState(0);
  const [seatOrder, setSeatOrder] = useState("left-to-right");
  const [startFromScreen, setStartFromScreen] = useState(true);

  const generateLayout = () => {
    const newRows = Array.from({ length: numRows }, (_, index) => ({
      rowName: String.fromCharCode(65 + index), // Generate row names like A, B, C...
      seats: Array.from(
        { length: seatsPerRow },
        (_, seatIndex) => seatOrder === "left-to-right" ? seatIndex + 1 : seatsPerRow - seatIndex
      ),
    }));

    setRows(startFromScreen ? newRows : newRows.reverse());
  };

  const updateRowName = (index, name) => {
    const updatedRows = [...rows];
    updatedRows[index].rowName = name;
    setRows(updatedRows);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Seating Row Management</h1>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block mb-2">
          Number of Rows:
          <input
            type="number"
            value={numRows}
            onChange={(e) => setNumRows(Number(e.target.value))}
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        <label className="block mb-2">
          Seats per Row:
          <input
            type="number"
            value={seatsPerRow}
            onChange={(e) => setSeatsPerRow(Number(e.target.value))}
            className="border p-2 rounded w-full mt-1"
          />
        </label>
        <label className="block mb-2">
          Seat Order:
          <select
            value={seatOrder}
            onChange={(e) => setSeatOrder(e.target.value)}
            className="border p-2 rounded w-full mt-1"
          >
            <option value="left-to-right">Left to Right</option>
            <option value="right-to-left">Right to Left</option>
          </select>
        </label>
        <label className="block mb-4">
          Start Rows From:
          <select
            value={startFromScreen ? "screen" : "opposite"}
            onChange={(e) => setStartFromScreen(e.target.value === "screen")}
            className="border p-2 rounded w-full mt-1"
          >
            <option value="screen">Screen</option>
            <option value="opposite">Opposite</option>
          </select>
        </label>
        <button
          onClick={generateLayout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Layout
        </button>
      </div>

      {/* Display Layout */}
      {rows.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Generated Seating Layout</h2>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={row.rowName}
                  onChange={(e) => updateRowName(rowIndex, e.target.value)}
                  className="border p-2 rounded w-16 text-center"
                />
                <span>Row:</span>
                <span>{row.seats.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatingRowManagement;
