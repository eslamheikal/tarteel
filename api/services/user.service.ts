import { DbQueries } from "../lib/db-queries";
import { User } from "../models/user.model";
import { UserMapper } from "../mappers/user.mapper";
import { UserRoleEnum } from "../enums/user-role.enum";
import { Result } from "../utils/result";
import { DbCommands } from "../lib/db-commands";
import { DB_TABLES } from "../config/db-tables.const";
import { PagedList } from "../utils/paged-list.model";
import { QueryParamsModel } from "../utils/query-params.model";

const userCommands = new DbCommands(DB_TABLES.USERS.TABLE, DB_TABLES.USERS.ID);
const userQueries = new DbQueries(DB_TABLES.USERS.TABLE, DB_TABLES.USERS.ID);

export class UserService {

  async getAdmins(): Promise<Result<User[]>> {
    const users = await userQueries.query({ where: { [DB_TABLES.USERS.ROLE]: UserRoleEnum.Admin } });
    return Result.success(users.map(user => UserMapper.toModel(user)));
  }

  async getUser(userId: number, currentUserId: number, currentUserRole: UserRoleEnum): Promise<Result<User>> {
    
    const canAccessUser = await this.canAccessUser(userId, currentUserId, currentUserRole);
    if (!canAccessUser.isSuccess) {
      return Result.failure(canAccessUser.errors!);
    }

    const user = await userQueries.getById(userId);
    if (!user) {
      return Result.failure(['User not found']);
    }

    const mappedUser = UserMapper.toModel(user);
    return Result.success(mappedUser);
  }

  async getUserByUniqueUrl(uniqueUrl: string): Promise<Result<User>> {
    try {
      const users = await userQueries.query({ 
        where: { [DB_TABLES.USERS.UNIQUE_URL]: uniqueUrl } 
      });

      if (users.length === 0) {
        return Result.failure(['User not found with this URL']);
      }

      return Result.success(UserMapper.toModel(users[0]));
    } catch (error) {
      console.error('Error getting user by unique URL:', error);
      return Result.failure(['Failed to get user by unique URL']);
    }
  }

  async addUser(user: User): Promise<Result<User>> {
    // check if user already exists by email or phone
    const hasDuplicate = await this.hasDuplicate(user);
    if (!hasDuplicate.isSuccess) {
      return hasDuplicate;
    }

    const createdUser = await userCommands.create(UserMapper.toDbModel(user!));
    return Result.success(UserMapper.toModel(createdUser));
  }

  async updateUser(updateData: User): Promise<Result<User>> {
    // check if user already exists by email or phone
    const hasDuplicate = await this.hasDuplicate(updateData);
    if (!hasDuplicate.isSuccess) {
      return hasDuplicate;
    }

    const updatedUser = await userCommands.update(updateData.id, UserMapper.toDbModel(updateData));
    return updatedUser ? Result.success(UserMapper.toModel(updatedUser)) : Result.failure(['User not found']);
  }

  async activateUser(userId: number): Promise<Result<boolean>> {
    const result = await userCommands.update(userId, { [DB_TABLES.USERS.IS_ACTIVE]: true });
    return result ? Result.success(true) : Result.failure(['User not found']);
  }

  async deactivateUser(userId: number): Promise<Result<boolean>> {
    const result = await userCommands.update(userId, { [DB_TABLES.USERS.IS_ACTIVE]: false });
    return result ? Result.success(true) : Result.failure(['User not found']);
  }

  async deleteUser(userId: number): Promise<Result<boolean>> {
    const result = await userCommands.delete(userId);
    return result ? Result.success(true) : Result.failure(['User not found']);
  }

  async hasDuplicate(user: User): Promise<Result<User>> {
    // Check if user already exists by email, phone, or unique URL
    const emailCheck = await userQueries.query({ where: { [DB_TABLES.USERS.EMAIL]: user.email } });
    const phoneCheck = user.phone ? await userQueries.query({ where: { [DB_TABLES.USERS.PHONE]: user.phone } }) : [];
    const urlCheck = user.uniqueUrl ? await userQueries.query({ where: { [DB_TABLES.USERS.UNIQUE_URL]: user.uniqueUrl } }) : [];

    if (emailCheck.length > 0 && +emailCheck[0].id !== user.id) {
      return Result.failure(['User already exists with this email']);
    }

    if (phoneCheck.length > 0 && +phoneCheck[0].id !== user.id) {
      return Result.failure(['User already exists with this phone']);
    }

    if (urlCheck.length > 0 && +urlCheck[0].id !== user.id) {
      return Result.failure(['User already exists with this unique URL']);
    }

    return Result.success(user);
  }

  async canAccessUser(userId: number, currentUserId: number, currentUserRole: UserRoleEnum): Promise<Result<boolean>> {
    
    // Admin can access any user
    if (currentUserRole === UserRoleEnum.Admin) {
      return Result.success(true);
    }

    // Reader can only access their own profile
    if (currentUserRole === UserRoleEnum.Reader && userId != currentUserId) {
      return Result.failure(['You are not allowed to access this user']);
    }

    return Result.success(true);
  }

  // Reader-specific methods
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