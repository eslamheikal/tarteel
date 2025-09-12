import { DateTimeHelper } from '../helpers/date-time.helper';
import { DB_TABLES } from '../config/db-tables.const';
import { User } from '../models/user.model';

export class UserMapper {
  
  /**
   * Map API User to App User
   */
  static toModel(user: any): User {
    // Handle both Firebase field names and model field names
    const id = user[DB_TABLES.USERS.ID] || user.id;
    const name = user[DB_TABLES.USERS.NAME] || user.name;
    const email = user[DB_TABLES.USERS.EMAIL] || user.email;
    const phone = user[DB_TABLES.USERS.PHONE] || user.phone;
    const password = user[DB_TABLES.USERS.PASSWORD] || user.password;
    const role = user[DB_TABLES.USERS.ROLE] || user.role;
    const isActive = user[DB_TABLES.USERS.IS_ACTIVE] !== undefined ? user[DB_TABLES.USERS.IS_ACTIVE] : user.isActive;
    const imageUrl = user[DB_TABLES.USERS.IMAGE_URL] || user.imageUrl;
    const bio = user[DB_TABLES.USERS.BIO] || user.bio;
    const uniqueUrl = user[DB_TABLES.USERS.UNIQUE_URL] || user.uniqueUrl;
    const facebook = user[DB_TABLES.USERS.FACEBOOK] || user.facebook;
    const youtube = user[DB_TABLES.USERS.YOUTUBE] || user.youtube;
    const joinedDate = user[DB_TABLES.USERS.JOINED_DATE] || user.joinedDate;

    return {
      id: typeof id === 'string' ? parseInt(id) : id,
      name,
      email,  
      phone,
      password: '********',
      role,
      isActive: isActive !== undefined ? isActive : true,
      imageUrl: imageUrl || '',
      bio,
      uniqueUrl: uniqueUrl || '',
      facebook,
      youtube,
      joinedDate: joinedDate ? DateTimeHelper.toISOString(joinedDate) : null
    };
  }


  static toDbModel(user: User): any {
    const dbModel: any = {
      [DB_TABLES.USERS.ID]: user.id,
    };

    // Only add fields that are not undefined

    if (user.name !== undefined) {
      dbModel[DB_TABLES.USERS.NAME] = user.name;
    }

    if (user.email !== undefined) {
      dbModel[DB_TABLES.USERS.EMAIL] = user.email;
    }

    if (user.phone !== undefined) {
      dbModel[DB_TABLES.USERS.PHONE] = user.phone;
    }

    if (user.role !== undefined) {
      dbModel[DB_TABLES.USERS.ROLE] = user.role;
    }

    if (user.password !== undefined) {
      dbModel[DB_TABLES.USERS.PASSWORD] = user.password;
    }

    if (user.isActive !== undefined) {
      dbModel[DB_TABLES.USERS.IS_ACTIVE] = user.isActive;
    }

    if (user.uniqueUrl !== undefined) {
      dbModel[DB_TABLES.USERS.UNIQUE_URL] = user.uniqueUrl;
    }

    if (user.imageUrl !== undefined) {
      dbModel[DB_TABLES.USERS.IMAGE_URL] = user.imageUrl;
    }

    if (user.bio !== undefined) {
      dbModel[DB_TABLES.USERS.BIO] = user.bio;
    }

    if (user.facebook !== undefined) {
      dbModel[DB_TABLES.USERS.FACEBOOK] = user.facebook;
    }

    if (user.youtube !== undefined) {
      dbModel[DB_TABLES.USERS.YOUTUBE] = user.youtube;
    }

    if (user.joinedDate !== undefined) {
      dbModel[DB_TABLES.USERS.JOINED_DATE] = user.joinedDate ? DateTimeHelper.toTimestamp(user.joinedDate) : null;
    }

    return dbModel;
  }
}
