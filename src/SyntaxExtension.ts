import type { Node as ProseMirrorNode, Schema } from "prosemirror-model";
import type { Node as UnistNode } from "unist";

import type { ConverterContext } from "./ConverterContext";
import { Extension } from "./Extension";

export abstract class SyntaxExtension<
  Context = Record<string, never>
> extends Extension {
  public mdastNodeMatches(node: UnistNode): boolean {
    return node.type === this.mdastNodeName();
  }

  public postMdastToProseMirrorHook(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _context: ConverterContext<Context>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void {}

  public abstract mdastNodeName(): string;

  // TODO: There is some code duplication in the specializations of this method
  // TODO: Make this generic
  // TODO: UnistNode is a generic
  // TODO: Specialize schema generic
  public abstract mdastNodeToProseMirrorNodes(
    node: UnistNode,
    convertedChildren: Array<ProseMirrorNode>,
    schema: Schema,
    context: ConverterContext<Context>
  ): Array<ProseMirrorNode>;
}
