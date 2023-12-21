import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

// const content =
//   '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function Editor({editor}) {


  return (
    <RichTextEditor editor={editor} className='list-disc' >
      <RichTextEditor.Toolbar sticky stickyOffset={60} className='flex gap-x-7 gap-y-1 flex-wrap border-primary/30 border py-2 items-center mb-2 justify-between px-5 relative '>
       
      <RichTextEditor.ControlsGroup className='space-x-1 '>

<RichTextEditor.Link classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background  ',linkEditorSave:'bg-primary p-1 text-sm ',linkEditor:'absolute flex items-start gap-1 ',linkEditorDropdown:'absolute ',linkEditorInput:'bg-background text-white outline-none border-primary rounded-none border placeholder:text-muted-foreground p-1 text-sm'}} 
popoverProps={{position:'left-start',
}}

/>




<RichTextEditor.Unlink classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
</RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup className='space-x-1'>
          <RichTextEditor.Bold   classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}  />
          <RichTextEditor.Italic   classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.Underline   classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}  />
          <RichTextEditor.Strikethrough   classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}  />
          <RichTextEditor.ClearFormatting  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}    />
          <RichTextEditor.Highlight  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.Code  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className='space-x-1'>
          <RichTextEditor.H2  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.H3  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.H4  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.H5  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup className='space-x-1'>
          <RichTextEditor.Blockquote   classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.Hr classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.BulletList classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.OrderedList classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.Subscript classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}   />
          <RichTextEditor.Superscript classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background'}}    />
        </RichTextEditor.ControlsGroup>

      

        <RichTextEditor.ControlsGroup className='space-x-1'>
          <RichTextEditor.AlignLeft classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background active:bg-primary active:text-background'}}   />
          <RichTextEditor.AlignCenter classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background active:bg-primary active:text-background'}}   />
          <RichTextEditor.AlignJustify  classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background active:bg-primary active:text-background'}}  />
          <RichTextEditor.AlignRight classNames={{control:'bg-background h-5 w-5 text-primary data-[active="true"]:bg-primary data-[active="true"]:text-background active:bg-primary active:text-background'}}   />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className='relative' placeholder='write your mind'  />
    </RichTextEditor>
  );
}