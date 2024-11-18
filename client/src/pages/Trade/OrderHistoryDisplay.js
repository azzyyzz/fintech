import React, { useEffect, useState } from "react";

const OrderHistoryDisplay = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch orders from the backend
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:4040/orders/orders", {
                method: "GET",
                credentials: "include", // Include cookies in the request
            });

            if (!response.ok) {
                console.log("-----------");
                console.log(response);
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Stop an open trade
    const stopOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:4040/orders/orders/${orderId}/stop`, {
                method: "POST",
                credentials: "include", // Include cookies in the request
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                alert("Order stopped successfully.");
                fetchOrders(); // Refresh the order list
            } else {
                alert(`Failed to stop order: ${data.message}`);
            }
        } catch (err) {
            alert("An error occurred while stopping the order.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="text-white">Loading orders...</p>;
    if (error) return <p className="text-white">Error: {error}</p>;

    // Categorize orders by status
    const openOrders = orders.filter((order) => order.type === "open");
    const partialOrders = orders.filter((order) => order.type === "partial");
    const closedOrders = orders.filter((order) => order.type === "closed");

    return (
        <>        
        {/* <h2 className="text-white">Order History</h2> */}
        <div id="orderHistory" className="text-white flex flex-row">
            {/* Open Orders */}
            {openOrders.length > 0 && (
                <div className="flex flex-col">
                <h3>Open Orders</h3>
                <div className="text-white flex flex-col" >
                    {openOrders.map((order) => (
                        <div key={order.id} className="flex flex-row space-x-6">
                            <p>Symbol: {order.symbol}</p>
                            <p>Initial Amount: {order.amount_initial}</p>
                            <p>Left Amount: {order.amount_left}</p>
                            <p>Price: {order.price}</p>
                            <p>Sell/Buy: {order.sellbuy}</p>
                            <button onClick={() => stopOrder(order.id)} className="border border-red-500 text-red-600">Stop Order</button>
                        </div>
                    ))}
                </div>
                </div >
            )}

            {/* Partial Orders */}
            {partialOrders.length > 0 && (
                <div className="text-white">
                    <h3>Partial Orders</h3>
                    {partialOrders.map((order) => (
                        <div key={order.id} className="flex flex-row space-x-6">
                            <p>Symbol: {order.symbol}</p>
                            <p>Amount Left: {order.amount_left}/{order.amount_initial}</p>
                            <p>Price: {order.price}</p>
                            <p>Sell/Buy: {order.sellbuy}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Closed Orders */}
            {closedOrders.length > 0 && (
                <div>
                    <h3>Closed Orders</h3>
                    {closedOrders.map((order) => (
                        <div key={order.id} className="flex flex-row space-x-6">
                            <p>Symbol: {order.symbol}</p>
                            <p>Amount: {order.amount_initial}</p>
                            <p>Price: {order.price}</p>
                            <p>Sell/Buy: {order.sellbuy}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* No Orders */}
            {orders.length === 0 && <p className="text-white">No orders to display.</p>}
        </div>
        </>

    );
};

export default OrderHistoryDisplay;
