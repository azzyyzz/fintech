import React, { useState, useEffect } from "react";

const Symbol = ({ symbol }) => {
    const [tickerData, setTickerData] = useState({
        price: "Loading...",
        change: "Loading...",
        high: "Loading...",
        low: "Loading...",
    });

    // Fetch data for the given symbol
    const fetchTickerData = async () => {
        try {
            const response = await fetch(
                `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
            );
            const data = await response.json();
            setTickerData({
                price: parseFloat(data.lastPrice).toFixed(2),
                change: parseFloat(data.priceChangePercent).toFixed(2),
                high: parseFloat(data.highPrice).toFixed(2),
                low: parseFloat(data.lowPrice).toFixed(2),
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setTickerData({
                price: "Error",
                change: "Error",
                high: "Error",
                low: "Error",
            });
        }
    };

    // Fetch data on mount and every 5 seconds
    useEffect(() => {
        fetchTickerData(); // Initial fetch
        const intervalId = setInterval(fetchTickerData, 1000); // Fetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [symbol]);

    return (
        <div className="flex md:flex-row flex-col sm:space-x-6 items-center p-4 rounded-lg w-full">
            <div className="flex md:flex-row items-center md:space-x-6 justify-between md:w-auto w-full">
                {/* Symbol */}
                <div className="text-lg font-semibold text-white">{symbol}</div>

                {/* Price */}
                <div className="text-sm text-white text">
                    <span className="text-green-400 text-2xl">${tickerData.price}</span>
                </div>
            </div>

            {/* 24h% Change */}
            <div className="text-sm">
                <strong className="text-white">24h%:</strong>
                <span
                    className={`${tickerData.change.startsWith("-") ? "text-red-500" : "text-green-400"
                        }`}
                >
                    {tickerData.change}%
                </span>
            </div>

            {/* 24h High */}
            <div className="text-sm text-white">
                <strong>24h High:</strong> <span className="text-yellow-400">${tickerData.high}</span>
            </div>

            {/* 24h Low */}
            <div className="text-sm text-white">
                <strong>24h Low:</strong> <span className="text-blue-400">${tickerData.low}</span>
            </div>
        </div>
    );
};

export default Symbol;
