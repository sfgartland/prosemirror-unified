import type { Node as ProseMirrorNode, Schema } from "prosemirror-model";
import type { Node as UnistNode, Parent } from "unist";

import type { ConverterContext } from "./ConverterContext";
import type { SyntaxExtension } from "./SyntaxExtension";

export class MdastToProseMirrorConverter {
  private readonly extensions: Array<SyntaxExtension<UnistNode>>;

  public constructor(extensions: Array<SyntaxExtension<UnistNode>>) {
    this.extensions = extensions;
  }

  private static mdastNodeIsParent(node: UnistNode): node is Parent {
    return "children" in node;
  }

  // TODO: Move schema to a property?
  // TODO: Better error handling?
  public convert(
    mdast: UnistNode,
    schema: Schema<string, string>
  ): ProseMirrorNode | null {
    const context: ConverterContext<unknown> = {};
    const rootNode = this.convertNode(mdast, schema, context);
    for (const extension of this.extensions) {
      extension.postMdastToProseMirrorHook(context);
    }
    if (rootNode.length !== 1) {
      return null;
    }
    return rootNode[0];
  }

  private convertNode(
    node: UnistNode,
    schema: Schema<string, string>,
    context: ConverterContext<unknown>
  ): Array<ProseMirrorNode> {
    for (const extension of this.extensions) {
      // TODO: This is needlessly slow, a map would be better
      if (!extension.mdastNodeMatches(node)) {
        continue;
      }
      let convertedChildren: Array<ProseMirrorNode> = [];
      if (MdastToProseMirrorConverter.mdastNodeIsParent(node)) {
        convertedChildren = node.children.flatMap((child) =>
          this.convertNode(child, schema, context)
        );
      }
      return extension.mdastNodeToProseMirrorNodes(
        node,
        schema,
        convertedChildren,
        context
      );
    }
    console.warn(
      "Couldn't find any way to convert mdast node of type \"" +
        node.type +
        '" to a ProseMirror node.'
    );
    return [];
  }
}
