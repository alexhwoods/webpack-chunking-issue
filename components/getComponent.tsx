import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { componentType as FooType } from "./Foo";
import { componentType as IconsType } from "./Icons";

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case FooType:
      return dynamic(import("./Foo"));

    case IconsType:
      return dynamic(import("./Icons"));

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
