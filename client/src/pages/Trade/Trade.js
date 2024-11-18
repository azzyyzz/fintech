import Navbar from "../Navbar";
import BuyOrSell from "./BuyOrSell";
import TradingViewWidget from "./Chart";
import Symbol from "./Symbol";
import React, { useEffect, useRef, memo, useState, useContext } from 'react';

import {UserContext} from "../../contexts/UserContext"
import OrderHistoryDisplay from "./OrderHistoryDisplay";

const buy_order = {
    1: {
        id: 1,
        amount: 10,
        price: 1
    },
    2: {
        id: 2,
        amount: 11,
        price: 2
    },
    3: {
        id: 2,
        amount: 11,
        price: 2
    },
    4: {
        id: 2,
        amount: 11,
        price: 2
    },
    5: {
        id: 2,
        amount: 11,
        price: 2
    },
    6: {
        id: 2,
        amount: 11,
        price: 2
    },
    7: {
        id: 2,
        amount: 11,
        price: 2
    },
    8: {
        id: 2,
        amount: 11,
        price: 2
    },
    9: {
        id: 2,
        amount: 11,
        price: 2
    },
    10: {
        id: 2,
        amount: 11,
        price: 2
    }
}


const sell_order = {
    "1": {
        "id": 1,
        "amount": 12,
        "price": 2.1
    },
    "2": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "3": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "4": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "4": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "5": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "6": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "7": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "8": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "9": {
        "id": 2,
        "amount": 11,
        "price": 2
    },
    "10": {
        "id": 2,
        "amount": 11,
        "price": 2
    }
}

const Trade = () => {

    const { userData, setUserData } = useContext(UserContext);

    const [symbol, setSymbol] = useState("BTCUSDT"); // Default symbol

    return (
        <div class="bg-slate-800">
            <Navbar />
            <div class="flex flex-col h-screen items-center">
                <div className="md:w-11/12 w-full flex flex-col sm:flex-row sm:space-x-6 items-center p-4 bg-gray-800 dark:bg-gray-900 rounded-lg mt-1">
                    <div clas="">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{symbol}<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                        </button>
                        <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a onClick={() => setSymbol("BTCUSDT")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">BTC/USDT</a>
                            </li>
                            <li>
                                <a onClick={() => setSymbol("ETHUSDT")} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ETH/USDT</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-full">
                        <Symbol symbol={symbol}/>
                    </div>
                </div>
                <div className="md:w-11/12 w-full flex md:flex-row flex-col basis-11/12 ">
                    <div id="symbolData" className="md:w-3/4 h-full flex flex-col items-center overflow-clip">
                        <div class="mt-1 flex md:flex-row flex-col w-full md:basis-9/12 basis-full bg-gray-900 rounded-lg overflow-clip">
                            <div class="md:basis-3/4 h-full">
                                <TradingViewWidget symbol={symbol}/>
                            </div>
                            <div class="md:basis-1/4 md:flex hidden flex-col">
                                <table className="table-auto text-white w-full h-1/2">
                                    <thead className="">
                                        <tr className="">
                                            <th className="px-4">Sell Price(USDT)</th>
                                            <th className="px-4">Amount</th>
                                            <th className="px-4">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {Object.entries(sell_order).map(([key, order]) => (
                                        <tr key={order.id} className="text-white content-center text-center hover:bg-slate-700">
                                            <td className="px-4  text-red-500">{order.price}</td>
                                            <td className="px-4">{order.amount}</td>
                                            <td className="px-4">{order.id}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <table className="table-auto text-white w-full h-1/2">
                                    <thead className="">
                                        <tr className="">
                                            <th className="px-4">Buy Price(USDT)</th>
                                            <th className="px-4">Amount</th>
                                            <th className="px-4">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {Object.entries(buy_order).map(([key, order]) => (
                                        <tr key={order.id} className="text-white content-center text-center hover:bg-slate-700">
                                            <td className="px-4  text-green-400">{order.price}</td>
                                            <td className="px-4">{order.amount}</td>
                                            <td className="px-4">{order.id}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="orderHistory" class="md:basis-3/12 w-full mt-1 bg-gray-900 rounded-lg overflow-scroll">
                            <OrderHistoryDisplay/>
                        </div>
                    </div>
                    <div className="md:w-1/4 w-full h-full overflow-clip">
                        {/* <div id="buyOrSell" className="w-full h-full md:ml-1 mt-1 bg-gray-900 rounded-lg">

                        </div> */}
                        <BuyOrSell symbol={symbol}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trade;