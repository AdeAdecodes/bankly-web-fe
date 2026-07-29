import { Typography } from '@mui/material';
import escapeHTML from 'escape-html';
import React from 'react';
import { Text } from 'slate';
import { Spacer } from '~/components/shared/layout';
import parseValue from '~/helpers/parse-value';
import { Action, Media } from '~/types';
import ActionField from '../../action-field';
import MediaField from '../../media-field';
import { RichTextLinkNode, RichTextMediaNode, RichTextNode } from '../types';
import RichTextLabel from './label';
import RichTextVideo from './video';

type NodeRenderer = (node: RichTextNode) => JSX.Element;

type RichTextFieldNodeChildrenProps = {
  value: RichTextNode[];
  renderers?: Record<string, NodeRenderer>;
};

function RichTextFieldNodeChildren({
  value,
  renderers,
}: RichTextFieldNodeChildrenProps) {
  return (
    <React.Fragment>
      {value.map((node, index) => (
        <React.Fragment key={index}>
          {renderNode(node, renderers)}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

function renderNode(
  node: RichTextNode,
  renderers?: RichTextFieldNodeChildrenProps['renderers']
) {
  if (!node) return null;

  if (Text.isText(node) && 'text' in node) {
    let text = (
      <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
    );

    if (node.bold) {
      text = <strong>{text}</strong>;
    }

    if (node.code) {
      text = <code>{text}</code>;
    }

    if (node.italic) {
      text = <em>{text}</em>;
    }

    if (node.underline) {
      text = <span style={{ textDecoration: 'underline' }}>{text}</span>;
    }

    if (node.strikethrough) {
      text = <span style={{ textDecoration: 'line-through' }}>{text}</span>;
    }

    if (node.color) {
      text = <span style={{ color: node.color }}>{text}</span>;
    }

    return text;
  }

  const child = <RichTextFieldNodeChildren value={node.children} />;

  if (!('type' in node)) {
    return <Typography>{child}</Typography>;
  }

  if (renderers?.[node.type]) {
    return renderers[node.type](node);
  }

  switch (node.type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'caption':
      return <Typography variant={node.type}>{child}</Typography>;
    case 'quote':
      return <blockquote>{child}</blockquote>;
    case 'ul':
      return <ul>{child}</ul>;
    case 'ol':
      return <ol>{child}</ol>;
    case 'li':
      return <li>{child}</li>;
    case 'link':
      return <ActionField action={nodeToAction(node)}>{child}</ActionField>;
    case 'upload':
      return (
        <MediaField
          media={nodeToMedia(node)}
          maxHeight={parseValue(node.fields.maxHeight || '')}
          sx={{
            alignSelf: node.fields.centered ? undefined : 'start',
            mx: node.fields.centered ? 'auto' : undefined,
            width: node.fields.fullWidth ? '100%' : undefined,
            objectFit: node.fields.fullWidth ? 'cover' : undefined,
          }}
        />
      );
    case 'label':
      return <RichTextLabel>{child}</RichTextLabel>;
    case 'video':
      return <RichTextVideo node={node} />;
    case 'spacer':
      return <Spacer sy={node.value} />;
    default:
      return <Typography>{child}</Typography>;
  }
}

function nodeToAction(node: RichTextLinkNode): Action {
  if (node.linkType === 'custom') {
    return {
      type: 'custom',
      label: '',
      url: node.url,
      newTab: node.newTab,
      params: [],
    };
  }

  return {
    type: 'reference',
    label: '',
    url: '',
    reference: {
      value: node.doc as any,
    },
    newTab: node.newTab,
  };
}

function nodeToMedia(node: RichTextMediaNode): Media {
  return node.value;
}

export default RichTextFieldNodeChildren;
