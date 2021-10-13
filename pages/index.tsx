import React, { useState } from "react";
import type { NextPage } from "next";

import { getComponent } from "../components/getComponent";
const Component = getComponent("Foo");

const Home: NextPage = () => {
  const [viewShip, setViewShip] = useState(false);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Home;
