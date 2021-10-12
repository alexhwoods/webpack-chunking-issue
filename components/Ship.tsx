import Image from 'next/image'
import shipImage from './ship.jpg'


function Ship() {
  return (
    <div>
      <p>Im a ship</p>
      <Image src={shipImage} alt="ship" />
    </div>
  )
}

export default Ship
