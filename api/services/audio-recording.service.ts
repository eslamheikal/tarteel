import { DbQueries } from "../lib/db-queries";
import { AudioRecording } from "../models/audio-recording";
import { AudioRecordingMapper } from "../mappers/audio-recording.mapper";
import { Result } from "../utils/result";
import { DbCommands } from "../lib/db-commands";
import { DB_TABLES } from "../config/db-tables.const";
import { AudioTypeEnum } from "../enums/audio-type.enum";

const audioRecordingCommands = new DbCommands(DB_TABLES.AUDIO_RECORDINGS.TABLE, DB_TABLES.AUDIO_RECORDINGS.ID);
const audioRecordingQueries = new DbQueries(DB_TABLES.AUDIO_RECORDINGS.TABLE, DB_TABLES.AUDIO_RECORDINGS.ID);

export class AudioRecordingService {

  async getAudioRecordings(userId: number, recitationType: AudioTypeEnum): Promise<Result<AudioRecording[]>> {
    try {
      const audioRecordings = await audioRecordingQueries.query({ 
        where: { 
          [DB_TABLES.AUDIO_RECORDINGS.USER_ID]: userId, 
          [DB_TABLES.AUDIO_RECORDINGS.RECITATION_TYPE]: recitationType 
        } 
      });

      return Result.success(audioRecordings.map(recording => AudioRecordingMapper.toModel(recording)));
    } catch (error) {
      console.error('Error getting audio recordings by user:', error);
      return Result.failure(['حدث خطأ في تحميل التسجيلات الصوتية']);
    }
  }

  async addAudioRecording(audioRecording: AudioRecording): Promise<Result<AudioRecording>> {
    try {
      await audioRecordingCommands.create(AudioRecordingMapper.toDbModel(audioRecording));
      return Result.success(audioRecording);
    } catch (error) {
      console.error('Error adding audio recording:', error);
      return Result.failure(['حدث خطأ في إضافة التسجيل الصوتي']);
    }
  }

  async deleteAudioRecording(audioRecordingId: number): Promise<Result<boolean>> {
    try {
      const result = await audioRecordingCommands.delete(audioRecordingId);
      return result ? Result.success(true) : Result.failure(['التسجيل الصوتي غير موجود']);
    } catch (error) {
      console.error('Error deleting audio recording:', error);
      return Result.failure(['حدث خطأ في حذف التسجيل الصوتي']);
    }
  }

}
