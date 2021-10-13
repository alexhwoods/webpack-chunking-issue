import React from "react";
import type { NextPage } from "next";

import { getComponent } from "../components/getComponent";
const Component = getComponent("Foo");

const Home: NextPage = () => {
  return (
    <div>
      <Component />
    </div>
  );
};

export default Home;
