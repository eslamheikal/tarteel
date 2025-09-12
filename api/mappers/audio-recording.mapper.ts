import { AudioTypeEnum } from '../enums/audio-type.enum';
import { DB_TABLES } from '../config/db-tables.const';
import { AudioRecording } from '../models/audio-recording';

export class AudioRecordingMapper {
  
  /**
   * Map API AudioRecording to App AudioRecording
   */
  static toModel(audioRecording: any): AudioRecording {
    // Handle both Firebase field names and model field names
    const id = audioRecording[DB_TABLES.AUDIO_RECORDINGS.ID] || audioRecording.id;
    const userId = audioRecording[DB_TABLES.AUDIO_RECORDINGS.USER_ID] || audioRecording.userId;
    const title = audioRecording[DB_TABLES.AUDIO_RECORDINGS.TITLE] || audioRecording.title;
    const audioUrl = audioRecording[DB_TABLES.AUDIO_RECORDINGS.AUDIO_URL] || audioRecording.audioUrl;
    const duration = audioRecording[DB_TABLES.AUDIO_RECORDINGS.DURATION] || audioRecording.duration;
    const recitationType = audioRecording[DB_TABLES.AUDIO_RECORDINGS.RECITATION_TYPE] || audioRecording.recitationType;

    return {
      id: typeof id === 'string' ? parseInt(id) : id,
      userId: typeof userId === 'string' ? parseInt(userId) : userId,
      title,
      audioUrl,
      duration,
      recitationType: recitationType as AudioTypeEnum
    };
  }

  /**
   * Map App AudioRecording to DB AudioRecording
   */
  static toDbModel(audioRecording: AudioRecording): any {
    const dbModel: any = {
      [DB_TABLES.AUDIO_RECORDINGS.ID]: audioRecording.id
    };

    // Only add fields that are not undefined
    if (audioRecording.userId !== undefined) {
      dbModel[DB_TABLES.AUDIO_RECORDINGS.USER_ID] = audioRecording.userId;
    }

    if (audioRecording.title !== undefined) {
      dbModel[DB_TABLES.AUDIO_RECORDINGS.TITLE] = audioRecording.title;
    }

    if (audioRecording.audioUrl !== undefined) {
      dbModel[DB_TABLES.AUDIO_RECORDINGS.AUDIO_URL] = audioRecording.audioUrl;
    }

    if (audioRecording.duration !== undefined) {
      dbModel[DB_TABLES.AUDIO_RECORDINGS.DURATION] = audioRecording.duration;
    }

    if (audioRecording.recitationType !== undefined) {
      dbModel[DB_TABLES.AUDIO_RECORDINGS.RECITATION_TYPE] = audioRecording.recitationType;
    }

    return dbModel;
  }
}
