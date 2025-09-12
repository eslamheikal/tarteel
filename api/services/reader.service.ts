import { DbQueries } from "../lib/db-queries";
import { User } from "../models/user.model";
import { UserMapper } from "../mappers/user.mapper";
import { Result } from "../utils/result";
import { PagedList } from "../utils/paged-list.model";
import { QueryParamsModel } from "../utils/query-params.model";
import { DbCommands } from "../lib/db-commands";
import { DB_TABLES } from "../config/db-tables.const";
import { UserRoleEnum } from "../enums/user-role.enum";

const userCommands = new DbCommands(DB_TABLES.USERS.TABLE, DB_TABLES.USERS.ID);
const userQueries = new DbQueries(DB_TABLES.USERS.TABLE, DB_TABLES.USERS.ID);

export class ReaderService {

  async getReaders(): Promise<Result<User[]>> {
    try {
      const readers = await userQueries.query({ 
        where: { [DB_TABLES.USERS.ROLE]: UserRoleEnum.Reader } 
      });
      return Result.success(readers.map(reader => UserMapper.toModel(reader)));
    } catch (error) {
      console.error('Error getting readers:', error);
      return Result.failure(['Failed to get readers']);
    }
  }

  async getReadersPaged(options: QueryParamsModel): Promise<PagedList<User>> {
    try {
      // Add role filter to options
      const readerOptions = {
        ...options,
        filters: [
          ...(options.filters || []),
          { columnName: DB_TABLES.USERS.ROLE, columnValue: UserRoleEnum.Reader, operator: 'equal' as any, isGlobal: false }
        ]
      };

      const pagedList = await userQueries.getPaged(readerOptions);

      return {
        items: pagedList.items.map(reader => UserMapper.toModel(reader)),
        totalCount: pagedList.totalCount,
        pageCount: pagedList.pageCount
      };
    } catch (error) {
      console.error('Error getting paged readers:', error);
      return {
        items: [],
        totalCount: 0,
        pageCount: 0
      };
    }
  }

  async getReader(readerId: number): Promise<Result<User>> {
    try {
      const reader = await userQueries.getById(readerId);

      if (!reader) {
        return Result.failure(['Reader not found']);
      }

      const mappedReader = UserMapper.toModel(reader);
      
      // Verify this is actually a reader
      if (mappedReader.role !== UserRoleEnum.Reader) {
        return Result.failure(['User is not a reader']);
      }

      return Result.success(mappedReader);
    } catch (error) {
      console.error('Error getting reader:', error);
      return Result.failure(['Failed to get reader']);
    }
  }

  async getReaderByUniqueUrl(uniqueUrl: string): Promise<Result<User>> {
    try {
      const readers = await userQueries.query({ 
        where: { 
          [DB_TABLES.USERS.UNIQUE_URL]: uniqueUrl,
          [DB_TABLES.USERS.ROLE]: UserRoleEnum.Reader
        } 
      });

      if (readers.length === 0) {
        return Result.failure(['Reader not found with this URL']);
      }

      return Result.success(UserMapper.toModel(readers[0]));
    } catch (error) {
      console.error('Error getting reader by unique URL:', error);
      return Result.failure(['Failed to get reader by unique URL']);
    }
  }

  async addReader(readerData: User): Promise<Result<User>> {
    try {
      // Ensure the role is set to Reader
      const readerToCreate = {
        ...readerData,
        role: UserRoleEnum.Reader,
        isActive: true,
        joinedDate: new Date().toISOString()
      };

      // Check if unique URL is already taken
      if (readerToCreate.uniqueUrl) {
        const urlCheck = await this.getReaderByUniqueUrl(readerToCreate.uniqueUrl);
        if (urlCheck.isSuccess) {
          return Result.failure(['This unique URL is already taken']);
        }
      }

      const createdReader = await userCommands.create(UserMapper.toDbModel(readerToCreate));
      return Result.success(UserMapper.toModel(createdReader));
    } catch (error) {
      console.error('Error creating reader:', error);
      return Result.failure(['Failed to create reader']);
    }
  }

  async updateReader(updateData: User): Promise<Result<User>> {
    try {
      // Ensure the role remains Reader
      const readerToUpdate = {
        ...updateData,
        role: UserRoleEnum.Reader
      };

      // Check if unique URL is already taken by another reader
      if (readerToUpdate.uniqueUrl) {
        const urlCheck = await this.getReaderByUniqueUrl(readerToUpdate.uniqueUrl);
        if (urlCheck.isSuccess && urlCheck.value!.id !== readerToUpdate.id) {
          return Result.failure(['This unique URL is already taken']);
        }
      }

      const updatedReader = await userCommands.update(readerToUpdate.id, UserMapper.toDbModel(readerToUpdate));
      return updatedReader ? Result.success(UserMapper.toModel(updatedReader)) : Result.failure(['Reader not found']);
    } catch (error) {
      console.error('Error updating reader:', error);
      return Result.failure(['Failed to update reader']);
    }
  }

  async deleteReader(readerId: number): Promise<Result<boolean>> {
    try {
      const result = await userCommands.delete(readerId);
      return result ? Result.success(true) : Result.failure(['Reader not found']);
    } catch (error) {
      console.error('Error deleting reader:', error);
      return Result.failure(['Failed to delete reader']);
    }
  }

  async hasDuplicateUrl(uniqueUrl: string, excludeId?: number): Promise<Result<boolean>> {
    try {
      const readers = await userQueries.query({ 
        where: { 
          [DB_TABLES.USERS.UNIQUE_URL]: uniqueUrl,
          [DB_TABLES.USERS.ROLE]: UserRoleEnum.Reader
        } 
      });

      const duplicateReader = readers.find(reader => 
        reader[DB_TABLES.USERS.ID] !== excludeId
      );

      return Result.success(duplicateReader !== undefined);
    } catch (error) {
      console.error('Error checking duplicate URL:', error);
      return Result.failure(['Failed to check duplicate URL']);
    }
  }
}
