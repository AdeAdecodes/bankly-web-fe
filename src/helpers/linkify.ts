import React from 'react';

const URL_PATTERN = /(https?:\/\/[^\s<>()]+[^\s<>().,;:!?])/g;

/** Wraps bare URLs in plain text with anchors (used for service lead copy). */
export default function linkify(
  text: string,
  renderLink: (url: string, key: number) => React.ReactNode
): React.ReactNode[] {
  return text
    .split(URL_PATTERN)
    .map((part, index) =>
      URL_PATTERN.test(part) && /^https?:\/\//.test(part)
        ? renderLink(part, index)
        : part
    );
}
