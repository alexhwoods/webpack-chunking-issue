import { ComponentType } from "react";
import dynamic from "next/dynamic";

import { componentName as IconsName } from "./Icons";
import { componentName as FooName } from "./Foo";

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case FooName:
      return dynamic(import("./Foo"));

    case IconsName:
      return dynamic(import("./Foo"));

    default:
      throw Error(`Dont have component type ${type}`);
  }
}
