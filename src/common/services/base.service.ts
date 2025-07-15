import {
  IBaseRepository,
  OperationOptions,
} from "../interfaces/base-repository.interface";
import { IBaseService } from "../interfaces/base.service.interface";
import { SearchRequest } from "../interfaces/search-request.interface";

/**
 * A generic, reusable base service that provides core CRUD and pagination logic.
 * It relies on an implementation of IBaseRepository to interact with the data source.
 * This service is data-source agnostic and can be extended for specific application entities.
 *
 * @template T The entity type.
 * @template CreateDTO The DTO used for creating the entity.
 * @template UpdateDTO The DTO used for updating the entity.
 * @template Transaction The transaction type.
 */
export class BaseService<T, CreateDTO, UpdateDTO, Transaction>
  implements IBaseService<T, CreateDTO, UpdateDTO, Transaction>
{
  /**
   * Injects the repository dependency, which must conform to the IBaseRepository interface.
   */
  constructor(
    protected readonly repository: IBaseRepository<
      T,
      CreateDTO,
      UpdateDTO,
      Transaction
    >
  ) {}

  /**
   * Creates a new entity.
   * @returns A promise that resolves to the newly created entity.
   */
  async create(createDto: CreateDTO): Promise<T> {
    return this.repository.create(createDto);
  }

  /**
   * Retrieves all entities.
   * @returns A promise that resolves to an array of entities.
   */
  async findAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  /**
   * Retrieves multiple entities based on the given filters.
   * @param populate Whether to populate referenced fields in the returned entities.
   * @returns A promise that resolves to an array of entities.
   */
  async findMany(filters: Record<string, any>): Promise<T[]> {
    return this.repository.findMany(filters);
  }

  /**
   * Finds and paginates entities based on search and filter criteria.
   * @returns A promise that resolves to a paginated result object.
   */
  async findByPagination(searchRequest: SearchRequest): Promise<{
    data: T[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  }> {
    return this.repository.findByPagination(searchRequest);
  }

  /**
   * Finds a single entity based on a set of filter conditions.
   * @returns A promise that resolves to the entity or null if not found (and raiseException is false).
   */
  async findById(id: string | number): Promise<T | null> {
    return this.repository.findById(id);
  }

  /**
   * Finds a single entity by its unique identifier (ID).
   * @returns A promise that resolves to the entity or null if not found (and raiseException is false).
   */
  async findOne(filters: Record<string, any>): Promise<T | null> {
    return this.repository.findOne(filters);
  }

  /**
   * Updates an entity by its unique identifier.
   * @returns A promise that resolves to the updated entity.
   */
  async updateById(id: string | number, updateDto: UpdateDTO): Promise<T> {
    return this.repository.updateById(id, updateDto);
  }

  /**
   * Deletes an entity by its unique identifier.
   * @returns A promise that resolves to a confirmation message.
   */
  async deleteById(id: string | number): Promise<{ message: string }> {
    return this.repository.deleteById(id);
  }

  /**
   * Deletes multiple entities based on an array of unique identifiers.
   * @returns A promise that resolves to a confirmation message.
   */
  async deleteMany(ids: (string | number)[]): Promise<{ message: string }> {
    return this.repository.deleteMany(ids);
  }
}
