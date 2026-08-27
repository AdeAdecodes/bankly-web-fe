import React from 'react';
import AlertBar from '~/components/shared/alert-bar';
import getActionHref from '~/helpers/get-action-href';
import { BlockDef } from '~/types';
import SectionWrapper from '../../section-wrapper';

type AlertBarBlockProps = {
  block: BlockDef<'alert-bar'>;
};

/** Inline notice placed within a page (the site-wide bar lives in Site Settings). */
function AlertBarBlock({ block }: AlertBarBlockProps) {
  const [dismissed, setDismissed] = React.useState(false);
  const link =
    block.link?.enabled && block.link.value ? block.link.value : undefined;

  if (dismissed) return null;

  return (
    <SectionWrapper
      section={{ theme: 'paper', spacing: 'compact' }}
      id={block.blockName}
      contentProps={{ maxWidth: 1180 }}
    >
      <AlertBar
        variant="card"
        severity={block.severity}
        badge={block.badge}
        message={block.message}
        link={
          link
            ? {
                href: getActionHref(link, '#'),
                label: link.label || 'Read more',
                newTab: link.newTab,
              }
            : undefined
        }
        onDismiss={block.dismissible ? () => setDismissed(true) : undefined}
      />
    </SectionWrapper>
  );
}

export default AlertBarBlock;
