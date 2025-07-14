export enum FilterOperator {
  CONTAINS = "contains",
  EQUALS = "equals",
  LESS_THAN = "lessThan",
  GREATER_THAN = "greaterThan",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  IN = "in",
  BETWEEN = "between",
}

export interface SearchRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  filters?: Record<string, { value: any; operator: FilterOperator }>;
}
