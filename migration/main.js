import { DataTypeOIDs } from 'postgresql-client';
import Database from '../lib/utlity.js';
import migrationData from './data.js';
import createSchema from './schema.js';

class MigrationManager {
  constructor() {
    this.db = new Database();
  }

  async read() {
    this.loadData = await migrationData; // Ideally it would have been a stream of value generator
  }

  async parse() {
    this.parsedData = await this.loadData.data;
  }

  async transform() {
    this.transformedData = this.parsedData.filter(item => item.name);
  }

  async write() {
    let statement;
    let dbConn;
    const statementArray = [];
    try {
      dbConn = await this.db.getConnection();
      await dbConn.connect();
      await dbConn.execute(createSchema); // default schema will be username. In this case postgres

      statement = await dbConn.prepare(
        'insert into TreeData(name, parent, description) values ($1, $2, $3)',
        {
          paramTypes: [DataTypeOIDs.Varchar, DataTypeOIDs.Varchar, DataTypeOIDs.Varchar],
        },
      );

      // for (const dataItem of this.transformedData) {
      //   statementArray.push(
      //     statement.execute({ params: [dataItem.name, dataItem.parent, dataItem.description] }),
      //   );
      // }
      this.transformedData.forEach(dataItem => {
        statementArray.push(
          statement.execute({ params: [dataItem.name, dataItem.parent, dataItem.description] }),
        );
      });
      await Promise.all(statementArray); // Not sure if postgresql-client returns insert status
    } finally {
      if (statement) {
        await statement.close();
      }
      if (dbConn) {
        await dbConn.close(); // Disconnect
      }
    }
  }

  async performMigration() {
    console.log('Migration started');
    console.time('Migration');
    const mm = new MigrationManager();
    console.time('Read');
    await mm.read();
    console.timeLog('Read');
    console.time('Parse');
    await mm.parse();
    console.timeLog('Parse', `${mm.parsedData.length}`);
    console.time('transform');
    await mm.transform();
    console.timeLog('transform', `${mm.transformedData.length}`);
    await mm.write();
    console.timeEnd('Migration');
    console.log('Migration Ended');
  }
}

new MigrationManager().performMigration();
