import Navbar from "../Navbar";
import React, { useState } from "react";

const Deposit = () => {
  const [symbol, setSymbol] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the amount is valid
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      // Send the deposit request to the backend
      const response = await fetch("http://localhost:4040/wallets/wallets/deposit", {
        method: "POST",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("=====================");
        console.log(document.cookie);
        setMessage(`Error: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      setMessage(`Deposit successful: ${data.symbol} wallet balance updated.`);
    } catch (error) {
      console.log(error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-slate-800">
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-1">
        <h2 className="text-2xl font-semibold text-white mb-6">Deposit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="symbol" className="block text-white">Symbol:</label>
            <select
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-white">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
              className="mt-2 w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Deposit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-white">{message}</p>}
      </div>
    </div>
  );
};

export default Deposit;
