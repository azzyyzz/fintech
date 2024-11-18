import { useState, useContext, useEffect } from 'react';
import React, { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

const BuyOrSell = (symbol) => {
    const { userData, setUserData } = useContext(UserContext);
    const [isBuy, setIsBuy] = useState(true); 
    const [price, setPrice] = useState('');   
    const [amount, setAmount] = useState(''); 
    const [message, setMessage] = useState('');
    const [balances, setBalances] = useState({ usdt: 0, btc: 0, eth: 0 }); 

    const handleBuyClick = () => setIsBuy(true);
    const handleSellClick = () => setIsBuy(false);

    useEffect(() => {
        if (userData && userData.id) {
        
            fetchBalance(userData.id); 
        }
    }, [userData]);


    const fetchBalance = async (userId) => {
        try {
            const response = await fetch("http://localhost:4040/wallets/wallets/balances", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: userData.id,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setBalances(data);
            } else {
                setMessage('Failed to fetch balance.');
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            setMessage('Error fetching balance.');
        }
    };

    const hasSufficientBalance = () => {
        if (isBuy) {
            const totalPrice = parseFloat(price) * parseFloat(amount);
            return balances.usdt >= totalPrice;
        } else {
            console.log(symbol);
            console.log(balances.btc);
            console.log(balances.eth);
            console.log(symbol);
            if (symbol.symbol == "BTCUSDT") {
                return balances.btc >= amount;
            } else if (symbol.symbol == "ETHUSDT") {
                return balances.eth >= amount;
            }
        }
        return false;
    };

    const handlePlaceOrder = async () => {
        if (!hasSufficientBalance()) {
            setMessage(`Insufficient ${isBuy ? 'USDT' : userData.selectedAsset} balance for this transaction.`);
            return;
        }
    
        try {
            const response = await fetch("http://localhost:4040/orders/orders", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userData.id,
                    type: "open",
                    symbol: symbol.symbol,
                    sellbuy: isBuy ? 'buy' : 'sell',
                    price: parseFloat(price),
                    amount: parseFloat(amount),
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setMessage('Order placed successfully!');
                console.log('Order placed:', data);
            } else {
                const errorData = await response.json();
                console.log("-=-=-=-=--=-=-=-=-=-=-=-=-");
                console.log(errorData);
                setMessage("hereeee" + errorData.message|| 'Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage('Error placing order.');
        }
    };

    const totalPrice = price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : '0.00';

    return (
        <div id="buyOrSell" className="w-full h-full md:ml-1 mt-1 bg-gray-900 rounded-lg p-4 flex flex-col space-y-4">
            <div className="text-white text-sm mb-4">
                <div><strong>Balances:</strong></div>
                <div>USDT: {balances.usdt}</div>
                <div>BTC: {balances.btc}</div>
                <div>ETH: {balances.eth}</div>
            </div>

            <div className="flex w-full space-x-4">
                <button
                    onClick={handleBuyClick}
                    className={`w-full py-2 rounded-lg font-medium ${isBuy ? 'bg-blue-700 text-white' : 'bg-gray-600 text-gray-400'}`}
                >
                    Buy
                </button>
                <button
                    onClick={handleSellClick}
                    className={`w-full py-2 rounded-lg font-medium ${!isBuy ? 'bg-red-700 text-white' : 'bg-gray-600 text-gray-400'}`}
                >
                    Sell
                </button>
            </div>

            <div className="flex flex-col">
                <label htmlFor="price" className="text-white text-sm mb-2">Price (USDT)</label>
                <input
                    type="number"
                    id="price"
                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="amount" className="text-white text-sm mb-2">Amount</label>
                <input
                    type="number"
                    id="amount"
                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="totalPrice" className="text-white text-sm mb-2">Total Price (USDT)</label>
                <input
                    type="text"
                    id="totalPrice"
                    className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    value={totalPrice}
                    readOnly
                />
            </div>

            {message && <div className="text-red-500">{message}</div>}

            <div className="w-full flex">
                {
                    userData && userData.id 
                    ? (
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                        >
                            Place Order
                        </button>
                    )
                    : (
                        <Link to="/login" type="button" className="w-full px-10 py-2 sm: text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
                            Log in
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default BuyOrSell;
