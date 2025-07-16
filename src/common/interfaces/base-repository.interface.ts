import { SearchRequest } from "./search-request.interface";

export interface OperationOptions<Transaction> {
  // populate all related fields
  populate?: boolean;
  // only populate selected fields
  populateFields?: string[];
  // ex. updateById doesnt find id
  raiseException?: boolean;
  // to bind multiple queries ex. 1 fails all fail
  transaction?: Transaction;
  // columns to exclude from the query
  dontSelectFields?: string[];
  // to select specific fields
  selectFields?: string[];
}

export interface IBaseRepository<T, CreateDTO, UpdateDTO, Transaction> {
  create(
    createDto: CreateDTO,
    options?: OperationOptions<Transaction>
  ): Promise<T>;
  findAll(options?: OperationOptions<Transaction>): Promise<T[]>;
  findMany(
    filters: Record<string, any>,
    options?: OperationOptions<Transaction>
  ): Promise<T[]>;
  findByPagination(searchRequest: SearchRequest): Promise<{
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  }>;
  findById(
    id: string | number,
    options?: OperationOptions<Transaction>
  ): Promise<T | null>;
  findOne(
    filters: Record<string, any>,
    options?: OperationOptions<Transaction>
  ): Promise<T | null>;
  updateById(
    id: string | number,
    updateDto: UpdateDTO,
    options?: OperationOptions<Transaction>
  ): Promise<T>;
  deleteById(
    id: string | number,
    options?: OperationOptions<Transaction>
  ): Promise<{ message: string }>;
  deleteMany(
    ids: (string | number)[],
    options?: OperationOptions<Transaction>
  ): Promise<{ message: string }>;
}
