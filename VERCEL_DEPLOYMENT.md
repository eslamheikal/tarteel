# Vercel Deployment Guide

## الخطوات المطلوبة للرفع على Vercel:

### 1. إعداد Environment Variables في Vercel Dashboard:

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Firebase Configuration  
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
```

### 2. تثبيت Vercel CLI:
```bash
npm i -g vercel
```

### 3. تسجيل الدخول:
```bash
vercel login
```

### 4. رفع المشروع:
```bash
vercel
```

### 5. رفع Environment Variables:
```bash
vercel env add JWT_SECRET
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_PRIVATE_KEY
vercel env add FIREBASE_CLIENT_EMAIL
```

## API Endpoints المتاحة:

### Authentication:
- `POST /api/auth?action=login` - تسجيل الدخول
- `POST /api/auth?action=validate` - التحقق من التوكن
- `POST /api/auth?action=refresh` - تجديد التوكن
- `GET /api/auth?action=user` - الحصول على بيانات المستخدم

### Users (Admin Only):
- `GET /api/users?action=get&id={id}` - الحصول على مستخدم
- `GET /api/users?action=unique&uniqueUrl={url}` - الحصول على مستخدم بالرابط
- `GET /api/users?action=admins` - الحصول على جميع الأدمنز
- `POST /api/users?action=create` - إنشاء مستخدم جديد
- `PUT /api/users?action=update` - تحديث مستخدم
- `DELETE /api/users?action=delete&id={id}` - حذف مستخدم

### Readers:
- `GET /api/readers?action=all` - الحصول على جميع القراء
- `GET /api/readers?action=paged` - الحصول على القراء مع pagination
- `GET /api/readers?action=get&id={id}` - الحصول على قارئ
- `GET /api/readers?action=unique&uniqueUrl={url}` - الحصول على قارئ بالرابط
- `POST /api/readers?action=create` - إنشاء قارئ جديد
- `PUT /api/readers?action=update` - تحديث قارئ
- `DELETE /api/readers?action=delete&id={id}` - حذف قارئ

### Audio Recordings:
- `GET /api/audio-recordings?action=all` - الحصول على جميع التسجيلات
- `GET /api/audio-recordings?action=paged` - الحصول على التسجيلات مع pagination
- `GET /api/audio-recordings?action=get&id={id}` - الحصول على تسجيل
- `POST /api/audio-recordings?action=create` - إنشاء تسجيل جديد
- `DELETE /api/audio-recordings?action=delete&id={id}` - حذف تسجيل

## ملاحظات مهمة:

1. **Firebase Configuration**: تأكد من إعداد Firebase Admin SDK بشكل صحيح
2. **JWT Secret**: استخدم مفتاح قوي وآمن
3. **CORS**: تم إعداد CORS للسماح بالطلبات من جميع المصادر
4. **Error Handling**: جميع الـ endpoints تحتوي على معالجة أخطاء شاملة
5. **Authentication**: معظم الـ endpoints تتطلب authentication token

## Testing:

```bash
# Test login
curl -X POST https://your-app.vercel.app/api/auth?action=login \
  -H "Content-Type: application/json" \
  -d '{"emailOrPhone": "test@example.com", "password": "password"}'

# Test with token
curl -X GET https://your-app.vercel.app/api/auth?action=user \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
