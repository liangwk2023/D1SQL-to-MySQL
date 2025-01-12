# D1 MySQL Adapter for Cloudflare Workers

## 项目简介

这个项目是一个适配器，用于在 Cloudflare Workers 中将 D1 SQL 数据库作为 MySQL 数据库使用。它提供了基本的 SQL 查询功能，并处理一些常见的 MySQL 和 D1 SQL 之间的语法差异。

## 文件结构

- `src/`
  - `d1-mysql-adapter.js`  # D1 MySQL 适配器实现
  - `worker.js`             # Cloudflare Worker 入口文件
- `wrangler.toml`             # Wrangler 配置文件
- `package.json`              # 项目依赖和脚本

## 使用说明

### 先决条件

- 确保你已经安装了 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)。
- 安装 [Wrangler](https://developers.cloudflare.com/workers/wrangler/get-started) CLI 工具：
``` bash
npm install -g wrangler
```

### 设置项目

1. **克隆或下载项目**：

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **安装依赖**：

   ```bash
   npm install
   ```

3. **登录 Cloudflare**：

   ```bash
   wrangler login
   ```

4. **创建 D1 数据库**：

   ```bash
   wrangler d1 create my-database
   ```

5. **更新 `wrangler.toml`**：

   在 `wrangler.toml` 中，确保 `database_id` 是你创建的 D1 数据库的 ID。

6. **创建表和插入数据**：

   使用以下命令在远程数据库中创建 `users` 表并插入测试数据：

   ```bash
   wrangler d1 execute my-database --remote --command="CREATE TABLE users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT,
       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );"

   wrangler d1 execute my-database --remote --command="INSERT INTO users (name) VALUES ('测试用户1'), ('测试用户2');"
   ```

### 部署项目

1. **部署到 Cloudflare Workers**：

   ```bash
   npm run deploy
   ```

2. **访问你的 Worker**：

   访问 `https://<your-worker-name>.<your-subdomain>.workers.dev`，你应该能看到用户数据的 JSON 响应。

### 开发和测试

- 使用以下命令在本地开发模式下运行 Worker：

   ```bash
   npm run dev
   ```

## 网页版部署
若是你不想在本地安装环境，可以前往网页版部署。
1. 前往 [Cloudflare](https://dash.cloudflare.com/login) 并登录。
3. 点击 `Create（创建）` 按钮。
4. 点击 `Create Worker（创建 Worker）` 按钮。
5. 随便写一个名称，点击`Deploy（部署）`按钮。
6. 至此，你也可以选择`Edit Code（编辑代码）`和`Continue to Dashboard（继续处理项目）`。
- 6.1：若是点击`Edit Code（编辑代码）`请在worker.js输入[/blob/main/src/worker.js](src/worker.js)，新建文件`d1-mysql-adapter.js`输入[src\d1-mysql-adapter.js](/blob/main/src/d1-mysql-adapter.js)点击`Deploy（部署）`按钮就完事了，然后看6.2。
- 6.2：若是点击`Continue to Dashboard（继续处理项目）`请来到左侧栏点击`Data and Storage（数据和存储库）`右边的小箭头展开，点击`D1 Databases（D1 数据库）`，点击`Create D1 Database（创建 D1 数据库）`，名字写为`d1-mysql-adapter`，点击`Create（创建）`按钮。
- 6.2.1：回到`Workers 和 Pages`页面，点击刚才创建的项目，然后按照6.1部署代码。

### 贡献

欢迎任何形式的贡献！如果你有建议或发现了问题，请提交问题或拉取请求。

### 许可证

此项目使用 MIT 许可证。请查看 [LICENSE](LICENSE) 文件以获取更多信息。