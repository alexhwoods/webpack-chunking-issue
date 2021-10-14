import { ComponentType } from "react";
import dynamic from "next/dynamic";

const Foo = dynamic(() => import("./Foo"));
const Icons = dynamic(() => import("./Icons"));

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case "Foo":
      return Foo;

    case "Icons":
      return Icons;

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
