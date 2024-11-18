import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Buy from "./Buy";
import TradingViewWidget from "../Trade/Chart";

const Home = () => {
  return (
    <div class="flex-initial h-fit">
      <Navbar />
      <Buy />
    </div>
  )
}

export default Home;
