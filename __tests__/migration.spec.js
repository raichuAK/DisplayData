import MigrationManager from '../migration/main.mjs';

describe('Migration testing', () => {
  test('should intialise migration manager', async () => {
    const mm = new MigrationManager();
    expect(mm).toBeDefined();
    expect(mm.db).toBeDefined();
    const rowsSaved = await mm.performMigration();
    expect(rowsSaved.length).toBe(13);
  });

  test('running again migration should do nothing', async () => {
    const mm = new MigrationManager();
    expect(mm).toBeDefined();
    expect(mm.db).toBeDefined();
    const rowsSaved = await mm.performMigration();
    expect(rowsSaved.length).toBe(13);
    const rowsSavedAgain = await mm.performMigration();
    expect(rowsSavedAgain.length).toBe(13);
  });
});
