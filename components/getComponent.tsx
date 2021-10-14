import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { componentType as FooType } from "./Foo";
import { componentType as IconsType } from "./Icons/componentType";

const Foo = dynamic(() => import("./Foo"));
const Icons = dynamic(() => import("./Icons/component"));

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case FooType:
      return Foo;

    case IconsType:
      return Icons;

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
