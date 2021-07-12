import Database from '../../lib/utlity.mjs';

class APIservice {
  async getConnection() {
    const db = new Database();
    const conn = await db.getConnection();
    return conn;
  }

  /**
   * Method to fetch children of a parent.
   *
   * @param {string} parent id
`  *
   * @returns {array} children for a parent`
   */
  async getChildren(parentId) {
    let dbConnection;
    let statement;
    try {
      dbConnection = await this.getConnection();
      await dbConnection.connect();
      let resultSet;
      if (parentId === 'all') {
        resultSet = await dbConnection.query(
          'SELECT td.name, td.description, td.parent  FROM public.TreeData td',
        );
      } else {
        resultSet = await dbConnection.query(
          'SELECT td.name, td.description, td.parent  FROM public.TreeData td WHERE td.parent = $1',
          { params: [parentId] },
        );
      }
      return resultSet.rows;
    } catch (error) {
      throw new Error(error); // TODO make this custom application error object
    } finally {
      if (statement) {
        await statement.close();
      }
      if (dbConnection) {
        await dbConnection.close(); // Disconnect
      }
    }
  }
}

export default APIservice;
