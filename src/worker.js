import { D1MySQLAdapter } from './d1-mysql-adapter';

export default {
  async fetch(request, env) {
    const db = new D1MySQLAdapter(env.DB);
    
    try {
      // 更简单的测试查询
      const results = await db.query(
        'SELECT * FROM users'
      );

      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
}; 