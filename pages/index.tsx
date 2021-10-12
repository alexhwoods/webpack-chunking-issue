import type { NextPage } from "next";
import Link from "next/link";

import { shipWeight } from "../components/Ship";

const Home: NextPage = () => {
  return (
    <div>
      <p>The ship weighs {shipWeight}lbs.</p>
      <Link href="/ship">
        <a>See ship</a>
      </Link>
    </div>
  );
};

export default Home;
