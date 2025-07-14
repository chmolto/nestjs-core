import { SearchRequest } from './search-request.interface';
    
    export interface IBaseRepository<T, CreateDTO, UpdateDTO> {
      create(createDto: CreateDTO, populate?: boolean): Promise<T>;
      findAll(filters?: Record<string, any>, populate?: boolean): Promise<T[]>;
      findOne(id: string | number, populate?: boolean, raiseException?: boolean): Promise<T | null>;
      findOneBy(filters: Record<string, any>, populate?: boolean, raiseException?: boolean): Promise<T | null>;
      update(id: string | number, updateDto: UpdateDTO, populate?: boolean): Promise<T>;
      delete(id: string | number): Promise<{ message: string }>;
      deleteMany(ids: (string | number)[]): Promise<{ message: string }>;
      findByPagination(searchRequest: SearchRequest): Promise<{
        data: T[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }>;
    }