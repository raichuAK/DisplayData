import APIservice from '../routes/db-layer/db.mjs';
import wait from './test-util.mjs';

describe('API testing', () => {
  test('should getChildrenData for GET request', async () => {
    const apiService = new APIservice();
    const result = await apiService.getConnection();
    expect(result).toBeDefined();
    const child = await apiService.getChildren();
    expect(child).toBeDefined();
    expect(child.length).toBe(0);
  });

  test('should getChildrenData for GET all request', async () => {
    const apiService = new APIservice();
    const result = await apiService.getConnection();
    expect(result).toBeDefined();
    const child = await apiService.getChildren('all');
    await wait(1);
    expect(child).toBeDefined();
    expect(child.length).toBe(13);
  });

  test('should getChildrenData for GET B-1 request', async () => {
    const apiService = new APIservice();
    const result = await apiService.getConnection();
    expect(result).toBeDefined();
    const child = await apiService.getChildren('B-1');
    await wait(1);
    expect(child).toBeDefined();
    expect(child.length).toBe(2);
  });
});
