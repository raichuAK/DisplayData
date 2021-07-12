/**
 * @jest-environment jsdom
 */
import template from '../static/my-pop-up-template.mjs';
import createTree from '../static/js/view.js';

describe('View is rendered', () => {
  test('MyPopUp is template has value', async () => {
    expect(template).toBeDefined();
  });
});

describe('Tree is rendered', () => {
  test('Load tree', async () => {
    expect(createTree).toBeDefined();
  });
});
