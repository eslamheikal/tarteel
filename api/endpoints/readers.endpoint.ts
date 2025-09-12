import { Request, Response } from 'express';
import { handleError } from '../helpers/handle-error.helper';
import { ReaderService } from '../services/reader.service';
import { AuthService } from '../services/auth.service';

const readerService = new ReaderService();
const authService = new AuthService();

export default async function handler(req: Request, res: Response) {
  try {

    const token = req.headers.authorization;

    // const isValidToken = await authService.isTokenValid(token!);
    // if(!isValidToken) {
    //   return res.status(401).json({
    //     error: 'Invalid token'
    //   });
    // }

    // const userId = await authService.getUserIdFromToken(token!);
    // if(!userId.isSuccess) {
    //   return res.status(401).json({
    //     error: userId.errors
    //   });
    // }

    const { method } = req;
    const { action } = req.query;

    if (method === 'GET' && action === 'all') {
      const result = await readerService.getReaders();
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'paged') {
      const { page, pageSize, sortBy, sortOrder, search } = req.query;
      
      const options = {
        page: page ? +page : 1,
        pageSize: pageSize ? +pageSize : 10,
        sortBy: sortBy as string || 'id',
        sortOrder: sortOrder as string || 'asc',
        search: search as string || ''
      };

      const result = await readerService.getReadersPaged(options);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'get') {
      const { id } = req.query;
      const result = await readerService.getReader(+id!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'unique') {
      const { uniqueUrl } = req.query;
      const result = await readerService.getReaderByUniqueUrl(uniqueUrl as string);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'POST' && action === 'create') {
      const createReaderRequest = req.body;
      const result = await readerService.addReader(createReaderRequest);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'PUT' && action === 'update') {
      const reader = req.body;
      const result = await readerService.updateReader(reader);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'DELETE' && action === 'delete') {
      const { id } = req.query;
      const result = await readerService.deleteReader(+id!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    return res.status(405).json({
      error: 'Method not allowed or invalid action'
    });

  } catch (error) {
    console.error('Readers API Error:', error);
    return handleError(res, error);
  }
}
