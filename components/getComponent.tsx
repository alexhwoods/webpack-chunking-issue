import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { componentType as FooType } from "./Foo";
import { componentType as IconsType } from "./Icons";

const Foo = dynamic(() => import("./Foo"));

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case FooType:
      return Foo;

    case IconsType:
      return Foo; // this is a bug!

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
