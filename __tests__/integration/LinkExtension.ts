import type { Node as UnistNode } from "unist";

import type { UnistText } from "./TextExtension";

export interface UnistLink extends UnistNode {
  type: "link";
  children: Array<UnistText>;
}
