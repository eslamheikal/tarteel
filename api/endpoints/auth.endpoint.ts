import type { VercelRequest, VercelResponse } from '@vercel/node';
import { applyCors, handlePreflight } from '../utils/cors';
import { handleError } from '../helpers/handle-error.helper';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return;

  applyCors(req, res);
  
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

    return res.status(405).json({
      error: 'Method not allowed or invalid action'
    });

  } catch (error) {
    console.error('Auth API Error:', error);
    return handleError(res, error);
  }
}