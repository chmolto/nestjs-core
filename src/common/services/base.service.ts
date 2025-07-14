import { IBaseRepository } from "../interfaces/base-repository.interface";
import { SearchRequest } from "../interfaces/search-request.interface";

/**
 * A generic, reusable base service that provides core CRUD and pagination logic.
 * It relies on an implementation of IBaseRepository to interact with the data source.
 * This service is data-source agnostic and can be extended for specific application entities.
 *
 * @template T The entity type.
 * @template CreateDTO The DTO used for creating the entity.
 * @template UpdateDTO The DTO used for updating the entity.
 */
export class BaseService<T, CreateDTO, UpdateDTO> {
  /**
   * Injects the repository dependency, which must conform to the IBaseRepository interface.
   * @param repository An instance of a repository that implements IBaseRepository.
   */
  constructor(
    protected readonly repository: IBaseRepository<T, CreateDTO, UpdateDTO>
  ) {}

  /**
   * Creates a new entity.
   * @param createDto The data transfer object for creating the entity.
   * @param populate Whether to populate referenced fields in the returned entity.
   * @returns A promise that resolves to the newly created entity.
   */
  async create(createDto: CreateDTO, populate?: boolean): Promise<T> {
    return this.repository.create(createDto, populate);
  }

  /**
   * Retrieves all entities matching the given filters.
   * @param filters An object containing key-value pairs to filter the results.
   * @param populate Whether to populate referenced fields in the returned entities.
   * @returns A promise that resolves to an array of entities.
   */
  async findAll(
    filters?: Record<string, any>,
    populate?: boolean
  ): Promise<T[]> {
    return this.repository.findAll(filters, populate);
  }

  /**
   * Finds a single entity by its unique identifier (ID).
   * @param id The unique identifier of the entity.
   * @param populate Whether to populate referenced fields in the returned entity.
   * @param raiseException If true, throws an exception if the entity is not found.
   * @returns A promise that resolves to the entity or null if not found (and raiseException is false).
   */
  async findOne(
    id: string | number,
    populate?: boolean,
    raiseException?: boolean
  ): Promise<T | null> {
    return this.repository.findOne(id, populate, raiseException);
  }

  /**
   * Finds a single entity based on a set of filter conditions.
   * @param filters An object containing key-value pairs to filter the results.
   * @param populate Whether to populate referenced fields in the returned entity.
   * @param raiseException If true, throws an exception if the entity is not found.
   * @returns A promise that resolves to the entity or null if not found (and raiseException is false).
   */
  async findOneBy(
    filters: Record<string, any>,
    populate?: boolean,
    raiseException?: boolean
  ): Promise<T | null> {
    return this.repository.findOneBy(filters, populate, raiseException);
  }

  /**
   * Updates an entity by its unique identifier.
   * @param id The unique identifier of the entity to update.
   * @param updateDto The data transfer object with the fields to update.
   * @param populate Whether to populate referenced fields in the returned updated entity.
   * @returns A promise that resolves to the updated entity.
   */
  async update(
    id: string | number,
    updateDto: UpdateDTO,
    populate?: boolean
  ): Promise<T> {
    return this.repository.update(id, updateDto, populate);
  }

  /**
   * Deletes an entity by its unique identifier.
   * This typically performs a soft delete if the repository is configured to do so.
   * @param id The unique identifier of the entity to delete.
   * @returns A promise that resolves to a confirmation message.
   */
  async delete(id: string | number): Promise<{ message: string }> {
    return this.repository.delete(id);
  }

  /**
   * Deletes multiple entities based on an array of unique identifiers.
   * @param ids An array of unique identifiers for the entities to delete.
   * @returns A promise that resolves to a confirmation message.
   */
  async deleteMany(ids: (string | number)[]): Promise<{ message: string }> {
    return this.repository.deleteMany(ids);
  }

  /**
   * Finds and paginates entities based on search and filter criteria.
   * @param searchRequest An object containing pagination, sorting, search, and filter parameters.
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
}
