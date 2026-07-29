import { Page, RecordLike } from '~/types';

export type RichTextNode =
  | RichTextElNode
  | RichTextTextNode
  | RichTextLinkNode
  | RichTextVideoNode
  | RichTextMediaNode
  | RichTextSpacerNode;

type RichTextTextNode = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  color?: string;
};

type RichTextElNode = {
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'caption'
    | 'ul'
    | 'li'
    | 'ol'
    | 'quote';
  children: RichTextTextNode[];
};

export type RichTextLinkNode =
  | RichTextInternalLinkNode
  | RichTextCustomLinkNode;

type RichTextInternalLinkNode = {
  type: 'link';
  linkType: 'internal';
  doc: {
    value: Page;
    relationTo: string;
  };
  newTab: boolean;
  children: RichTextTextNode[];
};

type RichTextCustomLinkNode = {
  type: 'link';
  linkType: 'custom';
  url: string;
  newTab: boolean;
  children: RichTextTextNode[];
};

export type RichTextMediaNode = {
  type: 'upload';
  value: Media;
  relationTo: string;
  children: RichTextTextNode[];
  fields: {
    maxHeight?: any;
    centered?: boolean;
    fullWidth?: boolean;
  };
};

type Media = RecordLike<{
  id: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  url: string;
}>;

export type RichTextVideoNode = {
  type: 'video';
  value: {
    source: 'youtube' | 'vimeo';
    id: string;
  };
  children: RichTextTextNode[];
};

export type RichTextSpacerNode = {
  type: 'spacer';
  value: number;
  children: RichTextTextNode[];
};
