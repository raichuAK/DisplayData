import MigrationManager from '../migration/main.mjs';
import Database from '../lib/utlity.mjs';

describe('Migration testing', () => {
  test('should intialise migration manager', () => {
    const mm = new MigrationManager();
    expect(mm).toBeDefined();
    const mock = jest.spyOn(Database, 'getConnection');  // spy on Message.findOne()
    mock.mockImplementation(() => Promise.resolve({
      connect: function () {},
      execute: function () {},
      prepare: function(sql) {
        return {
          execute: function () {},
          close: function () {},
        };
      },
      close: function () {},
    }));
    mm.performMigration();
    expect(mm.transformedData.length).toBe(13);
  });
});
