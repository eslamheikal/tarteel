import { Request, Response } from 'express';
import { handleError } from '../helpers/handle-error.helper';
import { AudioRecordingService } from '../services/audio-recording.service';
import { AuthService } from '../services/auth.service';
import { AudioTypeEnum } from '../enums/audio-type.enum';

const audioRecordingService = new AudioRecordingService();
const authService = new AuthService();

export default async function handler(req: Request, res: Response) {
  try {

    const token = req.headers.authorization;

    const isValidToken = await authService.isTokenValid(token!);
    if(!isValidToken) {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    const userId = await authService.getUserIdFromToken(token!);
    if(!userId.isSuccess) {
      return res.status(401).json({
        error: userId.errors
      });
    }

    const { method } = req;
    const { action } = req.query;

    if (method === 'GET' && action === 'all') {
      const result = await audioRecordingService.getAudioRecordings();
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

      const result = await audioRecordingService.getAudioRecordingsPaged(options);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'get') {
      const { id } = req.query;
      const result = await audioRecordingService.getAudioRecording(+id!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'by-reader') {
      const { readerId } = req.query;
      const result = await audioRecordingService.getAudioRecordingsByReader(+readerId!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'by-type') {
      const { recitationType } = req.query;
      const result = await audioRecordingService.getAudioRecordingsByRecitationType(recitationType as unknown as AudioTypeEnum);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'by-reader-and-type') {
      const { readerId, recitationType } = req.query;
      const result = await audioRecordingService.getAudioRecordingsByReaderAndType(+readerId!, recitationType as unknown as AudioTypeEnum);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'GET' && action === 'stats') {
      const result = await audioRecordingService.getAudioRecordingStats();
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'POST' && action === 'create') {
      const audioRecording = req.body;
      const result = await audioRecordingService.addAudioRecording(audioRecording);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'PUT' && action === 'update') {
      const audioRecording = req.body;
      const result = await audioRecordingService.updateAudioRecording(audioRecording);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'DELETE' && action === 'delete') {
      const { id } = req.query;
      const result = await audioRecordingService.deleteAudioRecording(+id!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    if (method === 'DELETE' && action === 'delete-by-reader') {
      const { readerId } = req.query;
      const result = await audioRecordingService.deleteAudioRecordingsByReader(+readerId!);
      return res.status(200).json({
        success: true,
        ...result
      });
    }

    return res.status(405).json({
      error: 'Method not allowed or invalid action'
    });

  } catch (error) {
    console.error('Audio Recordings API Error:', error);
    return handleError(res, error);
  }
}
