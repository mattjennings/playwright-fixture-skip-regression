import { test as base, expect } from '@playwright/test';

const test = base.extend<{ foo: string }>({
  foo: async ({}, use) => {
    await use('foo')
  }
});

/**
 * Fails in playwright/test@1.43.0, properly skips in 1.42.1
 */
test.describe('using fixture param', () => {
  test.skip(({ foo }) => {    
      return true
  });

  test.beforeEach(async ({}) => { 
      throw new Error('beforeEach should not have run');
  });

  test('should be skipped', () => {
      expect(true).toBe(false);
  });
})

test.describe('not using fixture param', () => {
  test.skip(() => {
      return true
  });

  test.beforeEach(async ({}) => { 
      throw new Error('beforeEach should not have run');
  });

  test('should be skipped', () => {
      expect(true).toBe(false);
  });
})