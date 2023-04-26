import type { Emphasis, Text } from "mdast";
import type {
  DOMOutputSpec,
  MarkSpec,
  Node as ProseMirrorNode,
  Schema,
} from "prosemirror-model";

import { MarkExtension } from "../MarkExtension";

export class ItalicExtension extends MarkExtension {
  public mdastNodeName(): "emphasis" {
    return "emphasis";
  }

  public proseMirrorMarkName(): string {
    return "em";
  }

  public proseMirrorMarkSpec(): MarkSpec {
    return {
      parseDOM: [{ tag: "i" }, { tag: "em" }],
      toDOM(): DOMOutputSpec {
        return ["em"];
      },
    };
  }

  public mdastNodeToProseMirrorNodes(
    _: Emphasis,
    convertedChildren: Array<ProseMirrorNode>,
    schema: Schema
  ): Array<ProseMirrorNode> {
    return convertedChildren.map((child) =>
      child.mark(
        child.marks.concat([schema.marks[this.proseMirrorMarkName()].create()])
      )
    );
  }

  public modifyMdastNode(node: Text): Emphasis {
    return { type: this.mdastNodeName(), children: [node] };
  }
}
