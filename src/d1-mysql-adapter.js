/**
 * D1 MySQL 适配器
 * @class D1MySQLAdapter
 */
export class D1MySQLAdapter {
  /**
   * @param {D1Database} d1 - D1 数据库实例
   */
  constructor(d1) {
    this.d1 = d1;
  }

  /**
   * 执行 SQL 查询
   * @param {string} sql - SQL 查询语句
   * @param {Array} params - 查询参数
   * @returns {Promise<Array>} 查询结果
   */
  async query(sql, params = []) {
    // 转换 MySQL 语法到 D1 支持的语法
    const convertedSQL = this.convertSQLSyntax(sql);
    
    try {
      // 执行查询
      const result = await this.d1.prepare(convertedSQL).bind(...params).all();
      return result;
    } catch (error) {
      console.error('查询执行错误:', error);
      throw error;
    }
  }

  /**
   * 转换 SQL 语法
   * @param {string} sql - 原始 SQL 语句
   * @returns {string} 转换后的 SQL 语句
   */
  convertSQLSyntax(sql) {
    let convertedSQL = sql;

    // 替换 NOW() 为 DATETIME('now')
    convertedSQL = convertedSQL.replace(/NOW\(\)/gi, "DATETIME('now')");

    // 替换 AUTO_INCREMENT 为 AUTOINCREMENT
    convertedSQL = convertedSQL.replace(/AUTO_INCREMENT/gi, 'AUTOINCREMENT');

    // 替换 LIMIT x,y 语法为 LIMIT y OFFSET x
    convertedSQL = convertedSQL.replace(/LIMIT\s+(\d+)\s*,\s*(\d+)/gi, 'LIMIT $2 OFFSET $1');

    // 替换 ON DUPLICATE KEY UPDATE 语法
    if (convertedSQL.match(/ON DUPLICATE KEY UPDATE/i)) {
      throw new Error('D1 不支持 ON DUPLICATE KEY UPDATE，请使用 INSERT OR REPLACE');
    }

    return convertedSQL;
  }
} 