/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  // @ts-expect-error
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    //@ts-expect-error
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData);
      setData(res.data.data);
      //@ts-expect-error
      setFilters(Object.keys(res.data.data[0] || {})); // Generate filters from column names
      setFilterValues(
        Object.keys(res.data.data[0] || {}).reduce((acc, key) => {
          //@ts-expect-error
          acc[key] = ""; // Initialize filter values as empty
          return acc;
        }, {})
      );
      setFilteredData(res.data.data); // Default data display
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  //@ts-expect-error
  const handleFilterChange = (col, value) => {
    const updatedFilters = { ...filterValues, [col]: value }; // Update specific filter value
    setFilterValues(updatedFilters);

    // Apply all filters to the data
    const filtered = data.filter((row) =>
      Object.entries(updatedFilters).every(([key, filterValue]) =>
        filterValue === "" // Skip empty filters
          ? true
          //@ts-expect-error
          : row[key]?.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Excel Upload and Filter System
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="fileInput"
          >
            Upload Excel File
          </label>
          <input
            id="fileInput"
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </div>

      {filters.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {filters.map((filter) => (
              <div key={filter} className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium text-sm">
                  {filter}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  onChange={(e) => handleFilterChange(filter, e.target.value)}
                  value={filterValues[filter]}
                  placeholder={`Filter by ${filter}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtered Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-gray-800">
                    S.N.
                  </th>
                  {Object.keys(filteredData[0] || {}).map((col) => (
                    <th
                      key={col}
                      className="py-2 px-4 border-b text-left text-gray-800"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-4 border-b">
                 {/* @ts-expect-error */}
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
