export class DB_TABLES {

    static readonly USERS = {
        TABLE: 'users',
        ID: 'id',
        NAME: 'name',
        EMAIL: 'email',
        PHONE: 'phone',
        PASSWORD: 'password',
        IS_ACTIVE: 'is_active',
        JOINED_DATE: 'joined_date',
        ROLE: 'role',
        UNIQUE_URL: 'unique_url',
        IMAGE_URL: 'image_url',
        BIO: 'bio',
        FACEBOOK: 'facebook',
        YOUTUBE: 'youtube'
    };


    static readonly AUDIO_RECORDINGS = {
        TABLE: 'audio_recordings',
        ID: 'id',
        USER_ID: 'user_id',
        TITLE: 'title',
        AUDIO_URL: 'audio_url',
        DURATION: 'duration',
        RECITATION_TYPE: 'recitation_type',
    };
}
