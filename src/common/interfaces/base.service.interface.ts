import { SearchRequest } from "./search-request.interface";

export interface IBaseService<T, CreateDTO, UpdateDTO, Transaction> {
  create(createDto: CreateDTO): Promise<T>;
  findAll(): Promise<T[]>;
  findMany(filters: Record<string, any>): Promise<T[]>;
  findByPagination(searchRequest: SearchRequest): Promise<{
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  }>;
  findById(id: string | number): Promise<T | null>;
  findOne(filters: Record<string, any>): Promise<T | null>;
  updateById(id: string | number, updateDto: UpdateDTO): Promise<T>;
  deleteById(id: string | number): Promise<{ message: string }>;
  deleteMany(ids: (string | number)[]): Promise<{ message: string }>;
}
