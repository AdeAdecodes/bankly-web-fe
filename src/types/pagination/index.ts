export type PaginatedParams<T> = T & {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = T & {
  pagination: {
    current_page: number;
    next_page: number;
    total: number;
    last_page: number;
  };
};
