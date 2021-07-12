import { DataTypeOIDs } from 'postgresql-client';
import Database from '../lib/utlity.mjs';
import migrationData from './data.mjs';
import createSchema from './schema.mjs';

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
        'insert into TreeData(name, parent, description) values ($1, $2, $3) ON CONFLICT ON CONSTRAINT treedata_pk DO NOTHING',
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
    console.time('Read');
    await this.read();
    console.timeLog('Read');
    console.time('Parse');
    await this.parse();
    console.timeLog('Parse', `${this.parsedData.length}`);
    console.time('transform');
    await this.transform();
    console.timeLog('transform', `${this.transformedData.length}`);
    await this.write();
    console.timeEnd('Migration');
    console.log('Migration Ended');
    return this.transformedData;
  }
}

export default MigrationManager;
