import { SearchRequest } from "./search-request.interface";

export interface OperationOptions<Transaction> {
  populate?: boolean;
  raiseException?: boolean;
  transaction?: Transaction;
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
