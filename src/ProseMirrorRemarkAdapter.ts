import { defaultMarkdownSerializer } from "prosemirror-markdown";
import type { Node as ProseMirrorNode, Schema } from "prosemirror-model";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { type Processor, unified } from "unified";

import { MdastToProseMirrorConverter } from "./MdastToProseMirrorConverter";
import type { ProseMirrorRemarkExtension } from "./ProseMirrorRemarkExtension";
import { ProseMirrorToMdastConverter } from "./ProseMirrorToMdastConverter";
import { SchemaBuilder } from "./SchemaBuilder";

export class ProseMirrorRemarkAdapter {
  private readonly builtSchema: Schema<string, string>;
  private readonly mdastToProseMirrorConverter: MdastToProseMirrorConverter;
  private readonly proseMirrorToMdastConverter: ProseMirrorToMdastConverter;
  private readonly remark: Processor;

  public constructor(extensions: Array<ProseMirrorRemarkExtension> = []) {
    this.builtSchema = new SchemaBuilder(extensions).build();
    this.mdastToProseMirrorConverter = new MdastToProseMirrorConverter(
      extensions
    );
    this.proseMirrorToMdastConverter = new ProseMirrorToMdastConverter(
      extensions
    );
    this.remark = unified().use(remarkParse).use(remarkStringify);
  }

  public parse(markdown: string): ProseMirrorNode | null {
    const mdast = this.remark.runSync(this.remark.parse(markdown));
    const ret = this.mdastToProseMirrorConverter.convert(mdast, this.schema());
    console.log(ret);
    return ret;
  }

  // TODO: Replace "string" with a string literal
  public schema(): Schema<string, string> {
    return this.builtSchema;
  }

  public serialize(doc: ProseMirrorNode): string {
    return defaultMarkdownSerializer.serialize(doc);
  }
}
