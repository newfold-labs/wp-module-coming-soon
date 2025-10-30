const { test, expect } = require('@playwright/test');
const path = require('path');

// Use environment variable to resolve plugin helpers
const pluginDir = process.env.PLUGIN_DIR || path.resolve(__dirname, '../../../../../../');
const { auth } = require(path.join(pluginDir, 'tests/playwright/helpers'));
const comingSoon = require('../helpers');

test.describe('Coming Soon', () => {
  const pluginId = process.env.PLUGIN_ID || 'bluehost';
  const appClass = comingSoon.getAppClass();

  test.beforeAll(async () => {
    // Remove WooCommerce - we can't use page in beforeAll, so we'll do this in beforeEach
    // await comingSoon.removeWooCommerce(page);
  });

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);
    
    // Set coming soon option to true to start with
    await comingSoon.setComingSoonOption(page, true);
    
    // Navigate to WordPress admin
    await comingSoon.navigateToWpAdmin(page);
  });

  test('Coming Soon is active', async ({ page }) => {
    await comingSoon.navigateToSettings(page, pluginId);
    await page.reload();

    // Verify coming soon is active
    await comingSoon.verifyComingSoonActive(page, appClass);
  });

  test.skip('Has Coming Soon Section on Home', async ({ page }) => {
    // This test is skipped because the portal has been removed from the home page.
    // We can remove this test if we dont end up bringing the portal back.
    await comingSoon.navigateToHome(page, pluginId);

    const homeSection = page.locator(`${appClass}-home .nfd-app-section-content`);
    await expect(homeSection.locator('a.nfd-button').filter({ hasText: 'View' }).first()).toHaveCount(1);
    await expect(homeSection.locator('a.nfd-button').filter({ hasText: 'Edit' }).first()).toHaveCount(1);
    await expect(homeSection.first().locator('button').filter({ hasText: 'Launch' })).toHaveCount(1);

    // Coming Soon Admin bar links to setting
    const adminBarBadge = comingSoon.getAdminBarBadge(page);
    await adminBarBadge.locator('a.ab-item').click();
    
    const url = page.url();
    expect(url).toContain('#/settings');
  });

  test('Coming Soon Toggle Turns Coming Soon Off', async ({ page }) => {
    await comingSoon.navigateToSettings(page, pluginId);
    
    // Deactivate coming soon - Launch Site
    await comingSoon.toggleComingSoon(page);

    // Verify coming soon is inactive
    await comingSoon.verifyComingSoonInactive(page);

    // Verify notification appears
    await comingSoon.verifyNotification(page, 'Coming soon deactivated');

    // Coming Soon Toggle Turns Coming Soon Back On
    // Activate Coming Soon - Unlaunch Site
    await comingSoon.toggleComingSoon(page);

    // Verify coming soon is active again
    await comingSoon.verifyComingSoonActive(page, appClass);

    // Verify notification appears
    await comingSoon.verifyNotification(page, 'Coming soon activated');
  });

  test('Displays admin coming soon notice', async ({ page }) => {
    await comingSoon.navigateToWpAdmin(page);
    await comingSoon.verifyAdminNotice(page);
  });

  test('Displays Coming Soon Site Preview Warning', async ({ page }) => {
    await comingSoon.navigateToFrontend(page);
    await comingSoon.verifySitePreviewWarning(page);
  });

  test('Displays Coming Soon on Frontend', async ({ page }) => {
    // Simulate logged-out by clearing cookies and storage
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await comingSoon.navigateToFrontend(page);
    await comingSoon.verifyComingSoonFrontend(page);
  });

  test.skip('Launching launches site', async ({ page }) => {
    // This test is already in the ecommerce module, and the code is in the ecommerce module
    // once the component is moved into this module this test will be used and the ecom test removed
    await comingSoon.navigateToSettings(page, pluginId);
    
    const toggle = comingSoon.getComingSoonToggle(page);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    await comingSoon.navigateToHome(page, pluginId);

    const homeSection = page.locator(`${appClass}-home .nfd-app-section-content`);
    await homeSection.first().locator('button').filter({ hasText: 'Launch your' }).click();
    await page.waitForTimeout(100);

    await expect(homeSection.first().locator('button').filter({ hasText: 'Launch your' })).toHaveCount(0);

    await auth.logout(page);
    await comingSoon.navigateToFrontend(page);
    await comingSoon.verifySiteLiveFrontend(page);

    await auth.loginToWordPress(page);
    await comingSoon.navigateToSettings(page, pluginId);

    const toggleAfter = comingSoon.getComingSoonToggle(page);
    await expect(toggleAfter).toHaveAttribute('aria-checked', 'false');
  });
});
