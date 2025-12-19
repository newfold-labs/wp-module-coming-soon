import { test, expect } from '@playwright/test';
import {
  auth,
  getAppClass,
  installWooCommerce,
  setComingSoonOption,
  navigateToWpAdmin,
  navigateToSettings,
  navigateToFrontend,
  verifyWooCommerceComingSoonActive,
  verifyWooCommerceComingSoonInactive,
  toggleComingSoon,
  verifySitePreviewWarningHidden,
  removeWooCommerce,
  verifyComingSoonActive,
  verifyComingSoonInactive,
  verifyNotification,
  verifyAdminNotice,
  verifySitePreviewWarning,
  verifyComingSoonFrontend,
  verifySiteLiveFrontend,
} from '../helpers';

// Use environment variable to resolve plugin helpers
const pluginId = process.env.PLUGIN_ID || 'bluehost';

test.describe('Coming Soon', () => {
  const appClass = getAppClass();

  test.beforeAll(async () => {
    // Remove WooCommerce
    await removeWooCommerce();
  });

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);
    
    // Set coming soon option to true to start with
    await setComingSoonOption(page, true);
    
    // Navigate to WordPress admin
    await navigateToWpAdmin(page);
  });

  test('Coming Soon is active', async ({ page }) => {
    await navigateToSettings(page, pluginId);
    await page.reload();

    // Verify coming soon is active
    await verifyComingSoonActive(page, appClass);
  });

  test.skip('Has Coming Soon Section on Home', async ({ page }) => {
    // This test is skipped because the portal has been removed from the home page.
    // We can remove this test if we dont end up bringing the portal back.
    await navigateToHome(page, pluginId);

    const homeSection = page.locator(`${appClass}-home .nfd-app-section-content`);
    await expect(homeSection.locator('a.nfd-button').filter({ hasText: 'View' }).first()).toHaveCount(1);
    await expect(homeSection.locator('a.nfd-button').filter({ hasText: 'Edit' }).first()).toHaveCount(1);
    await expect(homeSection.first().locator('button').filter({ hasText: 'Launch' })).toHaveCount(1);

    // Coming Soon Admin bar links to setting
    const adminBarBadge = getAdminBarBadge(page);
    await adminBarBadge.locator('a.ab-item').click();
    
    const url = page.url();
    expect(url).toContain('#/settings');
  });

  test('Coming Soon Toggle Turns Coming Soon Off', async ({ page }) => {
    await navigateToSettings(page, pluginId);
    
    // Deactivate coming soon - Launch Site
    await toggleComingSoon(page);

    // Verify coming soon is inactive
    await verifyComingSoonInactive(page);

    // Verify notification appears
    await verifyNotification(page, 'Coming soon deactivated');

    // Coming Soon Toggle Turns Coming Soon Back On
    // Activate Coming Soon - Unlaunch Site
    await toggleComingSoon(page);

    // Verify coming soon is active again
    await verifyComingSoonActive(page, appClass);

    // Verify notification appears
    await verifyNotification(page, 'Coming soon activated');
  });

  test('Displays admin coming soon notice', async ({ page }) => {
    await navigateToWpAdmin(page);
    await verifyAdminNotice(page);
  });

  test('Displays Coming Soon Site Preview Warning', async ({ page }) => {
    await navigateToFrontend(page);
    await verifySitePreviewWarning(page);
  });

  test('Displays Coming Soon on Frontend', async ({ page }) => {
    // Simulate logged-out by clearing cookies and storage
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await navigateToFrontend(page);
    await verifyComingSoonFrontend(page);
  });

  test.skip('Launching launches site', async ({ page }) => {
    // This test is already in the ecommerce module, and the code is in the ecommerce module
    // once the component is moved into this module this test will be used and the ecom test removed
    await navigateToSettings(page, pluginId);
    
    const toggle = getComingSoonToggle(page);
    await expect(toggle).toHaveAttribute('aria-checked', 'true');

    await navigateToHome(page, pluginId);

    const homeSection = page.locator(`${appClass}-home .nfd-app-section-content`);
    await homeSection.first().locator('button').filter({ hasText: 'Launch your' }).click();
    await page.waitForTimeout(100);

    await expect(homeSection.first().locator('button').filter({ hasText: 'Launch your' })).toHaveCount(0);

    await auth.logout(page);
    await navigateToFrontend(page);
    await verifySiteLiveFrontend(page);

    await auth.loginToWordPress(page);
    await navigateToSettings(page, pluginId);

    const toggleAfter = getComingSoonToggle(page);
    await expect(toggleAfter).toHaveAttribute('aria-checked', 'false');
  });
});
