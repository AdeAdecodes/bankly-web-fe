import {
  ConsularService,
  Footer,
  Header,
  NewsArticle,
  Page,
  SiteSetting,
  StaffMember,
} from './payload-types';

export * from './payload-types';
export * from './pagination';

export type RecordLike<T> = T & Record<string, any>;

export type RetryableError = Error & {
  retryable: boolean;
  retry?: () => Promise<any>;
};

/** Any block that can appear in `Page.layout`. */
export type Block = Page['layout'][number];

export type BlockType = Block['blockType'];

export type BlockDef<T extends BlockType> = Extract<Block, { blockType: T }>;

/** Blocks the frontend fills server-side (see api/helpers/pages/populate-blocks). */
export type PopulatableBlock = Extract<Block, { populatable?: any }>;

export type PopulatableBlockType = PopulatableBlock['blockType'];

export type PayloadResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

type RawRefMedia = NonNullable<BlockDef<'media-content-block'>['media']>;

export type RefMedia = Omit<RawRefMedia, 'ref'> & {
  ref?: RawRefMedia['ref'];
};

export type ActionGroup = NonNullable<
  BlockDef<'media-content-block'>['actions']
>;

/** Full link/CTA shape (compact nav/footer actions are a structural subset). */
export type Action = NonNullable<ActionGroup[number]['action']>;

export type NavigationItem = Header['items'][number];

export type NavigationGroup = NonNullable<NavigationItem['groups']>[number];

export type SiteGlobals = {
  header?: Header;
  footer?: Footer;
  siteSettings?: SiteSetting;
};

export type SectionSettings = NonNullable<BlockDef<'rich-text'>['section']>;

export type PopulatableBlockPopulated<T extends PopulatableBlockType> = {
  'news-grid': { articles: NewsArticle[] };
  /** keyed by group row id (falls back to the group index) */
  'service-grid': { groups: Record<string, ConsularService[]> };
  'staff-grid': { staff: StaffMember[] };
}[T];

export type PopulatedBlockDef<T extends PopulatableBlockType> = Omit<
  Extract<PopulatableBlock, { blockType: T }>,
  'populatedData'
> & {
  populatedData?: PopulatableBlockPopulated<T>;
};
