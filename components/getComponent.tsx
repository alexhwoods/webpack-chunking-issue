import { ComponentType } from "react";
import dynamic from "next/dynamic";

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case "Foo":
      return dynamic(import("./Foo"));

    case "Icons":
      return dynamic(import("./Icons"));

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
