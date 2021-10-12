import Image from "next/image";
import * as shipImage from "./ship.jpg";
import ship1 from "./ships/ship-1.jpg";
import ship2 from "./ships/ship-2.jpg";
import ship3 from "./ships/ship-3.jpg";
import ship4 from "./ships/ship-4.jpg";
import ship5 from "./ships/ship-5.jpg";
import ship6 from "./ships/ship-6.jpg";

export const shipWeight = 200000;

function Ships() {
  return (
    <div>
      <p>So many great ships!</p>
      <Image src={ship1} alt="Ship" />
      <Image src={ship2} alt="Ship" />
      <Image src={ship3} alt="Ship" />
      <Image src={ship4} alt="Ship" />
      <Image src={ship5} alt="Ship" />
      <Image src={ship6} alt="Ship" />
    </div>
  );
}

export default Ships;
