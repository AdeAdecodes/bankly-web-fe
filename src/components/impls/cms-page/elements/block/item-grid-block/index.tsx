import AspectRatio from '~/components/shared/aspect-ratio';
import CssGrid from '~/components/shared/css-grid';
import { Column, Spacer } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import parseColumns from '~/helpers/parse-columns';
import parseValue from '~/helpers/parse-value';
import { BlockDef } from '~/types';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type ItemGridBlockProps = {
  block: BlockDef<'item-grid-block'>;
};

function ItemGridBlock({ block }: ItemGridBlockProps) {
  if (!block.items?.length) return null;

  return (
    <CssGrid columns={parseColumns(block.columns || '3')} spacing={4}>
      {block.items.map((item) => (
        <Item key={item.id} item={item} aspectRatio={block.mediaAspectRatio} />
      ))}
    </CssGrid>
  );
}

type ItemProps = {
  item: NonNullable<ItemGridBlockProps['block']['items']>[number];
  aspectRatio?: any;
};

function Item({ item, aspectRatio }: ItemProps) {
  return (
    <Column
      component={item.action?.enabled ? Link : undefined}
      {...(item.action?.enabled
        ? { href: getActionHref(item.action.value!) }
        : undefined)}
      crossAxisAlignment={item.centered ? 'center' : 'start'}
    >
      <MediaWidget item={item} aspectRatio={aspectRatio} />
      <Spacer sy={2} />
      <RichTextField
        value={item.content! as any}
        textAlign={item.centered ? 'center' : 'left'}
      />
      {/*item.action?.enabled && (
        <React.Fragment>
          <Flexible sx={{ minHeight: 24 }} />
          <ActionField action={item.action?.value} />
        </React.Fragment>
        )*/}
    </Column>
  );
}

type MediaWidgetProps = ItemProps;

function MediaWidget({ item, aspectRatio }: MediaWidgetProps) {
  if (!aspectRatio) {
    return (
      <MediaField
        media={item.icon}
        fit="contain"
        position={item.centered ? 'center' : 'left'}
      />
    );
  }

  return (
    <AspectRatio value={parseValue(aspectRatio)} borderRadius={1}>
      <MediaField
        media={item.icon}
        fit="contain"
        position={item.centered ? 'center' : 'left'}
      />
    </AspectRatio>
  );
}

export default ItemGridBlock;
