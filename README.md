## Mixing static and dynamic imports affects bundle size

We have a function, `getComponent` that can return one of two components — `Foo` or `Icons`.

`Foo` is tiny
```typescript
const Foo = (): JSX.Element => <div>Foo</div>;

export default Foo;

```
`Icons` is huge
```typescript
import * as allIcons from "@mui/material";

const Icons = (): JSX.Element => {
  console.log(allIcons);
  return <div>I include many icons</div>;
};

export default Icons;
```

Of course, we want to dynamically import these, so `Icons` doesn't affect `Foo`'s bundle size.

Here's our `getComponent` function.
```typescript
import { ComponentType } from "react";
import dynamic from "next/dynamic";

export function getComponent(type: string): ComponentType<any> {
  switch (type) {
    case 'Foo':
      return dynamic(import("./Foo"));

    case 'Icons':
      return dynamic(import("./Icons"));

    default:
      throw Error(`Dont have component type ${type}`);
  }
}

```

Our main page looks like this, and won't change
```typescript
import { getComponent } from "../components/getComponent";
const Component = getComponent("Foo");

const Home: NextPage = () => {
  return (
    <div>
      <Component />
    </div>
  );
};
```

Currently, all is well with the world. Gzipped, our bundle size is 91.5KB.

![Base Browser](/demo-images/base-browser.png)

All of this is because the `Icons` component, which references a massive chunk called
`static/chunks/869.e762f...`, which is 127KB, containing all material icons, **is not included in our bundle**.

![Base](/demo-images/base.png)

In summary,
| Metric               | Value       |
| -----------          | ----------- |
| Bundle Size          | 91.5KB      |
| Icons Chunk Included | no          |

## Importing a single export is fine
Let's start on the path towards having components define their own type, but we'll introduce a
bug as well to show that this alone doesn't affect bundle size.

Here's our diff.

In `getComponent`
```diff
 import { ComponentType } from "react";
 import dynamic from "next/dynamic";

+import { componentType as FooType } from "./Foo";
+import { componentType as IconsType } from "./Icons";
+
 export function getComponent(type: string): ComponentType<any> {
   switch (type) {
-    case "Foo":
+    case FooType:
       return dynamic(import("./Foo"));

-    case "Icons":
-      return dynamic(import("./Icons"));
+    case IconsType:
+      return dynamic(import("./Foo")); // this is a bug!

     default:
       throw Error(`Dont have component type ${type}`);
```

And in our `Foo` component:
```diff
 const Foo = (): JSX.Element => <div>Foo</div>;

+export const componentType = "Foo";
+
 export default Foo;
```

And in the `Icons` component
```diff
 import * as allIcons from "@mui/material";

+export const componentType = "Icons";
+
 const Icons = (): JSX.Element => {
   console.log(allIcons);
   return <div>I include many icons</div>;
```

Let's re-check all our performance stats.
| Metric               | Value       |
| -----------          | ----------- |
| Bundle Size          | 89.9KB      |
| Icons Chunk Included | no          |

All our metrics are looking good! All the icons were even tree-shaken out.

![With Bug Foam Tree](/demo-images/with-bug-foam-tree.png)

Ah, of course, that's because we have that bug. Let's fix that.

## Fixing the bug

```diff
       return dynamic(import("./Foo"));

     case IconsType:
-      return dynamic(import("./Foo")); // this is a bug!
+      return dynamic(import("./Icons"));

     default:
       throw Error(`Dont have component type ${type}`);
```

Now let's re-check our performance metrics.

We can see the chunk with all the icons is back, now it's called
`static/chunks/943-8935575082e47b2d103e.js`.

![Final Foam Tree](/demo-images/final-foam-tree.png)

But wait, it's included in our bundle!

![Final Browser](/demo-images/final-browser.png)

And now all our performance metrics are worse.

| Metric               | Value       |
| -----------          | ----------- |
| Bundle Size          | 221KB       |
| Icons Chunk Included | yes         |


# Conclusion

Mixing dynamic and single static imports nullifies the benefit of either of them.


# To Run Yourself
```bash
npm install

ANALYZE=true npm run build && npm run start
```

And we're interested in the client Foam Tree.