# @chmolto/nestjs-core

A reusable core library for NestJS projects that provides base service and repository patterns with advanced CRUD operations, pagination, and filtering capabilities.

## 🚀 Features

- **Generic Repository Pattern**: Type-safe repository interface for any entity
- **Generic Service Pattern**: Reusable service implementation with complete CRUD operations
- **Advanced Filtering**: Support for multiple filter operators (contains, equals, less than, greater than, etc.)
- **Pagination**: Built-in pagination support with metadata
- **Search Functionality**: Flexible search across entity fields
- **TypeScript Support**: Fully typed with generic interfaces
- **Data Source Agnostic**: Works with any data persistence layer (MongoDB, PostgreSQL, MySQL, etc.)

## 📦 Installation

```bash
npm install @chmolto/nestjs-core
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install @nestjs/common rimraf
```

## 🛠️ Usage

### 1. Repository Implementation

First, implement the `IBaseRepository` interface for your specific data source:

```typescript
import { IBaseRepository, SearchRequest } from '@chmolto/nestjs-core';
import { Injectable } from '@nestjs/common';

// Example entity
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// DTOs
interface CreateUserDto {
  name: string;
  email: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Injectable()
export class UserRepository implements IBaseRepository<User, CreateUserDto, UpdateUserDto> {
  // Implement all required methods
  async create(createDto: CreateUserDto, populate?: boolean): Promise<User> {
    // Your implementation here
  }

  async findAll(filters?: Record<string, any>, populate?: boolean): Promise<User[]> {
    // Your implementation here
  }

  async findOne(id: string, populate?: boolean, raiseException?: boolean): Promise<User | null> {
    // Your implementation here
  }

  async findOneBy(filters: Record<string, any>, populate?: boolean, raiseException?: boolean): Promise<User | null> {
    // Your implementation here
  }

  async update(id: string, updateDto: UpdateUserDto, populate?: boolean): Promise<User> {
    // Your implementation here
  }

  async delete(id: string): Promise<{ message: string }> {
    // Your implementation here
  }

  async deleteMany(ids: string[]): Promise<{ message: string }> {
    // Your implementation here
  }

  async findByPagination(searchRequest: SearchRequest): Promise<{
    data: User[];
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  }> {
    // Your implementation here
  }
}
```

### 2. Service Implementation

Extend the `BaseService` to create your entity-specific service:

```typescript
import { BaseService } from '@chmolto/nestjs-core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  // Add custom business logic methods here
  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.findAll({ active: true });
  }
}
```

### 3. Controller Usage

Use your service in controllers:

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SearchRequest } from '@chmolto/nestjs-core';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() filters?: Record<string, any>) {
    return this.userService.findAll(filters);
  }

  @Get('search')
  async search(@Body() searchRequest: SearchRequest) {
    return this.userService.findByPagination(searchRequest);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id, true, true);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
```

## 🔍 Advanced Search and Filtering

The library provides a powerful search system with multiple filter operators:

### Filter Operators

```typescript
import { FilterOperator } from '@chmolto/nestjs-core';

// Available operators:
FilterOperator.CONTAINS      // String contains value
FilterOperator.EQUALS        // Exact match
FilterOperator.LESS_THAN     // Numeric/date less than
FilterOperator.GREATER_THAN  // Numeric/date greater than
FilterOperator.STARTS_WITH   // String starts with value
FilterOperator.ENDS_WITH     // String ends with value
FilterOperator.IN            // Value in array
FilterOperator.BETWEEN       // Value between two values
```

### Search Request Example

```typescript
const searchRequest: SearchRequest = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  search: 'john',
  filters: {
    age: {
      value: 18,
      operator: FilterOperator.GREATER_THAN
    },
    status: {
      value: ['active', 'pending'],
      operator: FilterOperator.IN
    },
    name: {
      value: 'john',
      operator: FilterOperator.CONTAINS
    }
  }
};

const result = await userService.findByPagination(searchRequest);
console.log(result);
// {
//   data: User[],
//   page: 1,
//   limit: 10,
//   totalPages: 5,
//   total: 47
// }
```

## 🏗️ Module Setup

Register your services and repositories in your NestJS module:

```typescript
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
```

## 📚 API Reference

### IBaseRepository<T, CreateDTO, UpdateDTO>

Generic repository interface with the following methods:

- `create(createDto: CreateDTO, populate?: boolean): Promise<T>`
- `findAll(filters?: Record<string, any>, populate?: boolean): Promise<T[]>`
- `findOne(id: string | number, populate?: boolean, raiseException?: boolean): Promise<T | null>`
- `findOneBy(filters: Record<string, any>, populate?: boolean, raiseException?: boolean): Promise<T | null>`
- `update(id: string | number, updateDto: UpdateDTO, populate?: boolean): Promise<T>`
- `delete(id: string | number): Promise<{ message: string }>`
- `deleteMany(ids: (string | number)[]): Promise<{ message: string }>`
- `findByPagination(searchRequest: SearchRequest): Promise<PaginationResult<T>>`

### BaseService<T, CreateDTO, UpdateDTO>

Generic service class that implements all repository methods with additional business logic capabilities.

### SearchRequest Interface

```typescript
interface SearchRequest {
  page?: number;                    // Page number (default: 1)
  limit?: number;                   // Items per page (default: 10)
  sortBy?: string;                  // Field to sort by
  sortOrder?: "asc" | "desc";       // Sort direction
  search?: string;                  // General search term
  filters?: Record<string, {        // Advanced filters
    value: any;
    operator: FilterOperator;
  }>;
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Christian Moltó**
- Email: chfus@proton.me
- GitHub: [@chmolto](https://github.com/chmolto)

## 🐛 Issues

If you find any bugs or have feature requests, please create an issue on the [GitHub repository](https://github.com/chmolto/nestjs-core/issues).

---

Made with ❤️ for the NestJS community 