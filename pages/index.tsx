import React, { useState } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// import { shipWeight } from "../components/Ships";
const shipWeight = 200000;

const Ship = dynamic(import("../components/Ships"));

const Home: NextPage = () => {
  const [viewShip, setViewShip] = useState(false);
  return (
    <div>
      <p>Did you know a ship can weigh up to {shipWeight}tons?</p>
      <p>Its a pretty impressive ship.</p>
      <button onClick={() => setViewShip(!viewShip)}>View Ships</button>
      {viewShip && <Ship />}
    </div>
  );
};

export default Home;
