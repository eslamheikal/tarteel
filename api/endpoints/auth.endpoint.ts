import { Request, Response } from 'express';
import { handleError } from '../helpers/handle-error.helper';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export default async function handler(req: Request, res: Response) {
  try {
    const { method } = req;
    const { action } = req.query;

    if (method === 'POST' && action === 'login') {
      const { emailOrPhone, password } = req.body;
      
      if (!emailOrPhone || !password) {
        return res.status(400).json({
          error: 'Email/Phone and password are required'
        });
      }
      
      const result = await authService.login(emailOrPhone, password);
      
      if (!result.isSuccess) {
        return res.status(401).json({
          success: false,
          ...result
        });
      }
      
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'POST' && action === 'validate') {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          error: 'Token is required'
        });
      }
      
      const result = await authService.validateToken(token);
      
      if (!result.isSuccess) {
        return res.status(401).json({
          success: false,
          ...result
        });
      }
      
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'user') {
      const token = req.headers.authorization;
      
      if (!token) {
        return res.status(401).json({
          error: 'Authorization token is required'
        });
      }
      
      const result = await authService.getUserFromToken(token);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'POST' && action === 'refresh') {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          error: 'Token is required'
        });
      }
      
      const result = await authService.refreshToken(token);
      
      if (!result.isSuccess) {
        return res.status(401).json({
          success: false,
          ...result
        });
      }
      
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    return res.status(405).json({
      error: 'Method not allowed or invalid action'
    });

  } catch (error) {
    console.error('Auth API Error:', error);
    return handleError(res, error);
  }
}