import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handlePreflight } from '../utils/cors';
import { handleError } from '../helpers/handle-error.helper';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserRoleEnum } from '../enums/user-role.enum';

const userService = new UserService();
const authService = new AuthService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apply CORS headers first
  applyCors(req, res);

  // Handle preflight request
  if (handlePreflight(req, res)) return;

  try {

    const { method } = req;
    const { action } = req.query;

    const token = req.headers.authorization;

    if (method === 'GET' && action === 'readers') {
      const result = await userService.getReaders(token?.length ? UserRoleEnum.Admin : UserRoleEnum.Unauthorized);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'get') {
      const { uniqueUrl } = req.query;

      const result = await userService.getUserByUniqueUrl(uniqueUrl as string);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    const isValidToken = await authService.isTokenValid(token!);
    if (!isValidToken) {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    const userId = await authService.getUserIdFromToken(token!);
    if (!userId.isSuccess) {
      return res.status(401).json({
        error: userId.errors
      });
    }

    // Get user role for authorization
    const userRole = await authService.getUserRoleFromToken(token!);
    if (!userRole?.isSuccess) {
      return res.status(401).json({
        error: userRole?.errors
      });
    }

    if (method === 'POST' && action === 'create') {
      // Only admins can create users
      if (userRole?.value !== UserRoleEnum.Admin) {
        return res.status(403).json({
          error: 'Access denied. Admin role required.'
        });
      }

      const user = req.body;
      const result = await userService.addUser(user);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'PUT' && action === 'update') {
      // Only admins can update users
      if (userRole?.value !== UserRoleEnum.Admin) {
        return res.status(403).json({
          error: 'Access denied. Admin role required.'
        });
      }

      const user = req.body;
      const result = await userService.updateUser(user);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'DELETE' && action === 'delete') {
      // Only admins can delete users
      if (userRole?.value !== UserRoleEnum.Admin) {
        return res.status(403).json({
          error: 'Access denied. Admin role required.'
        });
      }

      const { id } = req.query;
      const result = await userService.deleteUser(+id!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }


    return res.status(405).json({
      error: 'Method not allowed or invalid action'
    });

  } catch (error) {
    console.error('Users API Error:', error);
    return handleError(res, error);
  }
}