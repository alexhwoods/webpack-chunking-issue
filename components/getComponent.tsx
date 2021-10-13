import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { componentType as FooType } from "./Foo";
import { componentType as IconsType } from "./Icons";

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case FooType:
      return dynamic(import("./Foo"));

    case IconsType:
      return dynamic(import("./Foo")); // this is a bug!

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
