import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { type Processor, unified } from "unified";
import type { Node as UnistNode } from "unist";

import type { Extension } from "./Extension";

export class UnifiedBuilder {
  private readonly extensions: Array<Extension>;

  public constructor(extensions: Array<Extension>) {
    this.extensions = extensions;
  }

  public build(): Processor<UnistNode, UnistNode, UnistNode, string> {
    let processor: Processor<UnistNode, UnistNode, UnistNode, string> =
      unified().use(remarkParse).use(remarkStringify);
    for (const extension of this.extensions) {
      processor = extension.initializeUnified(processor);
    }
    return processor;
  }
}
