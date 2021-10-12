import React, { useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// import { shipWeight } from "../components/Ship";
const shipWeight = 2000;

const Ship = dynamic(import("../components/Ship"));

const Home: NextPage = () => {
  const [viewShip, setViewShip] = useState(false);
  return (
    <div>
      <p>The ship weighs {shipWeight}lbs.</p>
      <p>Its a pretty impressive ship.</p>
      <button onClick={() => setViewShip(!viewShip)}>View Ship</button>
      {viewShip && <Ship />}
    </div>
  );
};

export default Home;
