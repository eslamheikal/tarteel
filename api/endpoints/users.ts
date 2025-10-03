import type { Handler } from '@netlify/functions';
import { User } from '../models/user.model';

export const handler: Handler = async (event) => {
  try {
    const method = event.httpMethod;
    const action = (event.queryStringParameters?.action ?? '').toString();

    if (method === 'GET' && action === 'readers') {
      const result: User[] = [
        { id: 1, name: 'John Doe',  email: 'john.doe@example.com', phone: '1234567890', password: 'password' },
        { id: 2, name: 'Jane Doe',  email: 'jane.doe@example.com', phone: '1234567890', password: 'password' },
      ] as User[];

      const safe = result.map(({ password, ...u }) => u);

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' } as Record<string, string>,
        body: JSON.stringify({ success: true, value: safe }),
      };
    }

    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'GET',
      } as Record<string, string>,
      body: JSON.stringify({ error: 'Method not allowed or invalid action' }),
    };
  } catch (error) {
    console.error('Users Function Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' } as Record<string, string>,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
