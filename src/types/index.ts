import {
  BlogPost,
  CaseStudy,
  Header,
  HelpArticle,
  HelpTopic,
  Opening,
  Page,
  PressPost,
  TeamMember,
  Testimonial,
} from './payload-types';

export * from './payload-types';
export * from './pagination';

export type RecordLike<T> = T & Record<string, any>;

export type RetryableError = Error & {
  retryable: boolean;
  retry?: () => Promise<any>;
};

export type Block =
  | NonNullable<Page['sections'][number]['blocks']>[number]
  | NonNullable<Page['hero']>['block'][number];

export type BlockDef<T extends Block['blockType']> = Extract<
  Block,
  { blockType: T }
>;

export type PopulatableBlock = Extract<Block, { populatable?: any }>;

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
export type Action = NonNullable<ActionGroup[number]['action']>;

export type NavigationItem = NonNullable<
  NonNullable<Header['definition']>['items']
>[number];

// help
export type HelpTopicWithArticles = HelpTopic & {
  articles: HelpArticle[];
};

export type PopulatedBlockDef<T extends PopulatableBlock['blockType']> = Omit<
  Extract<PopulatableBlock, { blockType: T }>,
  'populatedData'
> & {
  populatedData: PopulatableBlockPopulated<T>;
};

// populated
export type PopulatableBlockPopulated<T extends PopulatableBlock['blockType']> =
  {
    'blog-posts-block': PayloadResponse<BlogPost>;
    'help-topics-block': { topics: HelpTopic[] };
    'openings-block': { openings: Opening[] };
    'press-posts-block': PayloadResponse<PressPost>;
    'team-members-block': { teamMembers: TeamMember[] };
    'testimonials-block': { testimonials: Testimonial[] };
    'case-studies-block': { caseStudies: CaseStudy[] };
  }[T];
