/**
 * Defines the contract for a Unit of Work, which manages the lifecycle of a database transaction.
 * This ensures that a group of operations either complete successfully or fail together, maintaining data integrity.
 */
export interface IUnitOfWork {
  /**
   * Starts a new transaction manually. Use this for complex scenarios where the `execute` helper is not suitable.
   * You are responsible for calling `commit` or `rollback`.
   */
  start(): Promise<void>;

  /**
   * Manually commits all changes made within the transaction started by `start()`.
   */
  commit(): Promise<void>;

  /**
   * Manually rolls back all changes made within the transaction started by `start()`.
   */
  rollback(): Promise<void>;

  /**
   * Provides access to the underlying native transaction object (e.g., Mongoose ClientSession, Drizzle `tx`).
   * This object is what gets passed to repository methods.
   */
  getTransaction<T>(): T;

  /**
   * Executes a given function within a managed transaction.
   * This is the recommended, safer way to handle most transactions as it automatically handles commit and rollback.
   * @param work The function to execute, which receives the Unit of Work instance.
   */
  execute<T>(work: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
}
