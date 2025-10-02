import type { Request, Response } from 'express';
import { applyCors, handlePreflight } from '../utils/cors';
import { handleError } from '../helpers/handle-error.helper';
import { AudioRecordingService } from '../services/audio-recording.service';
import { AuthService } from '../services/auth.service';
import { AudioTypeEnum } from '../enums/audio-type.enum';

const audioRecordingService = new AudioRecordingService();
const authService = new AuthService();

export default async function handler(req: Request, res: Response) {
  // Apply CORS headers first
  applyCors(req, res);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return handlePreflight(req, res);
  }

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

    if (method === 'GET' && action === 'by-user') {
      const { recitationType } = req.query;
      const result = await audioRecordingService.getAudioRecordings(userId.value!, recitationType as unknown as AudioTypeEnum);
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

    if (method === 'DELETE' && action === 'delete') {
      const { id } = req.query;
      const result = await audioRecordingService.deleteAudioRecording(+id!);
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