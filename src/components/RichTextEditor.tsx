import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { useRef } from "react";
import { uploadThumbnail } from "@/hooks/useBlogPosts";
import { useToast } from "@/hooks/use-toast";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Code,
  Minus,
  Youtube as YoutubeIcon,
} from "lucide-react";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

// Helper type for TipTap editor selections with image nodes
interface ImageNodeSelection {
  node: {
    type: { name: string };
    attrs: { style?: string };
  };
}

const MenuButton = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-[4px] transition-all font-medium ${
      active
        ? "bg-primary text-black shadow-md ring-2 ring-primary/30"
        : "text-muted-foreground hover:text-white hover:bg-muted"
    }`}
  >
    {children}
  </button>
);

const Separator = () => <div className="w-px h-5 bg-border mx-0.5" />;

const RichTextEditor = ({ content, onChange }: Props) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Image.configure({ inline: false, allowBase64: false, HTMLAttributes: { class: "rounded-[4px] shadow-lg shadow-black/20" } }),
      Link.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right", "justify"] }),
      Youtube.configure({ inline: false, ccLanguage: "en", nocookie: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[240px] px-4 py-3 focus:outline-none " +
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:text-left " +
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:text-left " +
          "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-left " +
          "[&_p]:mb-4 [&_p]:text-justify " +
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2 [&_ul]:text-left " +
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2 [&_ol]:text-left " +
          "[&_li]:leading-tight [&_li]:my-0.5 [&_li>p]:my-0 " +
          "[&_h1]:mt-8 [&_h2]:mt-6 " +
          "[&_p:empty]:min-h-[1.5em] [&_p:empty]:before:content-['\\00a0'] " +
          "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic " +
          "[&_img]:rounded-[4px] [&_img]:max-w-full [&_img]:my-3 " +
          "[&_a]:text-primary [&_a]:underline " +
          "[&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_code]:text-xs " +
          "[&_hr]:border-border [&_hr]:my-4 " +
          "[&_iframe]:rounded-[4px] [&_iframe]:my-3 [&_iframe]:max-w-full",
      },
    },
  });

  // Reactive state for BubbleMenu — re-renders on every selection change
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      isH1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      isH2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      isH3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
      isLink: ctx.editor?.isActive("link") ?? false,
    }),
  });

  // Sync content from parent (e.g. draft restore) — only when content differs from editor
  const contentRef = useRef(content);
  useEffect(() => {
    if (!editor) return;
    // Only update if the content actually changed externally (not from editor's own onUpdate)
    if (content !== contentRef.current) {
      contentRef.current = content;
      const currentHtml = editor.getHTML();
      if (currentHtml !== content) {
        editor.commands.setContent(content, { emitUpdate: false });
      }
    }
  }, [content, editor]);

  // Keep ref in sync with editor updates
  useEffect(() => {
    if (!editor) return;
    const handler = () => { contentRef.current = editor.getHTML(); };
    editor.on("update", handler);
    return () => { editor.off("update", handler); };
  }, [editor]);

  if (!editor) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadThumbnail(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Image upload failed", description: errorMessage, variant: "destructive" });
    }
    if (imgRef.current) imgRef.current.value = "";
  };

  const setImageWidth = (width: string) => {
    const { state } = editor;
    const { selection } = state;

    // Try NodeSelection first (image directly selected)
    if ('node' in selection && (selection as ImageNodeSelection).node?.type.name === "image") {
      editor.chain().focus().updateAttributes("image", {
        style: `width: ${width}; border-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);`,
      }).run();
      return;
    }

    // Search around the cursor position for an image node
    const pos = selection.$from.pos;
    let found = false;
    state.doc.nodesBetween(Math.max(0, pos - 2), Math.min(state.doc.content.size, pos + 2), (node, nodePos) => {
      if (found) return false;
      if (node.type.name === "image") {
        found = true;
        editor.chain().focus().setNodeSelection(nodePos).updateAttributes("image", {
          style: `width: ${width}; border-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);`,
        }).run();
        return false;
      }
    });

    if (!found) {
      state.doc.nodesBetween(0, state.doc.content.size, (node, nodePos) => {
        if (found) return false;
        if (node.type.name === "image" && nodePos <= pos && pos <= nodePos + node.nodeSize + 1) {
          found = true;
          editor.chain().focus().setNodeSelection(nodePos).updateAttributes("image", {
            style: `width: ${width}; border-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);`,
          }).run();
          return false;
        }
      });
    }

    if (!found) {
      toast({ title: "Vali kõigepealt pilt", description: "Kliki pildil ja seejärel vali laiuse %", variant: "destructive" });
    }
  };



  const getCurrentImageWidth = (): string | null => {
    const { state } = editor;
    const { selection } = state;
    if ('node' in selection && (selection as ImageNodeSelection).node?.type.name === "image") {
      const imageNode = selection as ImageNodeSelection;
      const style = imageNode.node.attrs.style || "";
      const match = style.match(/width:\s*(\d+%)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const addLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addYoutube = () => {
    const url = prompt("Sisesta YouTube video URL:");
    if (!url) return;
    editor.commands.setYoutubeVideo({ src: url, width: 640, height: 360 });
  };

  const ic = "h-4 w-4";
  const currentWidth = getCurrentImageWidth();

  return (
    <div className="border border-border rounded-[4px] bg-muted/30 overflow-hidden">
      {/* Toolbar - sticky */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-muted/50 sticky top-0 z-10">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <Bold className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <Italic className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
          <UnderlineIcon className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
          <Strikethrough className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Code">
          <Code className={ic} />
        </MenuButton>

        <Separator />

        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1 (Large title)">
          <span className="flex items-center gap-1 text-xs font-bold">
            <Heading1 className={ic} />
            <span>H1</span>
          </span>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2 (Section title)">
          <span className="flex items-center gap-1 text-xs font-bold">
            <Heading2 className={ic} />
            <span>H2</span>
          </span>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3 (Subsection)">
          <span className="flex items-center gap-1 text-xs font-bold">
            <Heading3 className={ic} />
            <span>H3</span>
          </span>
        </MenuButton>

        <Separator />

        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <List className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list">
          <ListOrdered className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
          <Quote className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
          <Minus className={ic} />
        </MenuButton>

        <Separator />

        <MenuButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align left">
          <AlignLeft className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align center">
          <AlignCenter className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align right">
          <AlignRight className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">
          <AlignJustify className={ic} />
        </MenuButton>

        <Separator />

        <MenuButton onClick={addLink} active={editor.isActive("link")} title="Add link">
          <LinkIcon className={ic} />
        </MenuButton>
        <MenuButton onClick={() => imgRef.current?.click()} title="Insert image">
          <ImageIcon className={ic} />
        </MenuButton>
        <MenuButton onClick={addYoutube} title="YouTube video">
          <YoutubeIcon className={ic} />
        </MenuButton>

        <Separator />

        {/* Image width controls */}
        <div className="flex items-center gap-0.5">
          {[
            { label: "25%", value: "25%" },
            { label: "50%", value: "50%" },
            { label: "75%", value: "75%" },
            { label: "100%", value: "100%" },
          ].map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setImageWidth(s.value)}
              title={`Image width ${s.label}`}
              className={`px-1.5 py-1 text-[10px] rounded-[4px] transition-colors ${
                currentWidth === s.value
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <Separator />

        <MenuButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo className={ic} />
        </MenuButton>
      </div>

      {/* Floating bubble menu - appears near selected text */}
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-0.5 rounded-[4px] border border-border bg-popover p-1 shadow-lg shadow-black/40"
      >
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editorState?.isBold} title="Bold">
          <Bold className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editorState?.isItalic} title="Italic">
          <Italic className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editorState?.isUnderline} title="Underline">
          <UnderlineIcon className={ic} />
        </MenuButton>
        <Separator />
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editorState?.isH1} title="Heading 1">
          <Heading1 className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editorState?.isH2} title="Heading 2">
          <Heading2 className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editorState?.isH3} title="Heading 3">
          <Heading3 className={ic} />
        </MenuButton>
        <Separator />
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editorState?.isBulletList} title="Bullet list">
          <List className={ic} />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editorState?.isOrderedList} title="Ordered list">
          <ListOrdered className={ic} />
        </MenuButton>
        <Separator />
        <MenuButton onClick={addLink} active={editorState?.isLink} title="Add link">
          <LinkIcon className={ic} />
        </MenuButton>
      </BubbleMenu>

      {/* Editor */}
      <EditorContent editor={editor} />

      <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
    </div>
  );
};

export default RichTextEditor;
