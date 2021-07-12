import { Connection } from 'postgresql-client';

class Database {
  async getConnection() {
    const connection = new Connection({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
      timezone: 'Europe/Amsterdam',
    });
    return connection;
  }
}

export default Database;
