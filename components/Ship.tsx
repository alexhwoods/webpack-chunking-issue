import Image from "next/image";
import * as shipImage from "./ship.jpg";

export const shipWeight = 2000;

function Ship() {
  return (
    <div>
      <p>Im a ship</p>
      <Image src={shipImage} alt="Ship" />
    </div>
  );
}

export default Ship;
