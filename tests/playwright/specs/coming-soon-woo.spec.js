const { test, expect } = require('@playwright/test');
const path = require('path');

// Use environment variable to resolve plugin helpers
const pluginDir = process.env.PLUGIN_DIR || path.resolve(__dirname, '../../../../../../');
const { auth } = require(path.join(pluginDir, 'tests/playwright/helpers'));
const comingSoon = require('../helpers');

test.describe('Coming Soon with WooCommerce', () => {
  test.describe.configure({ timeout: 60000 });
  const pluginId = process.env.PLUGIN_ID || 'bluehost';

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);

    // Activate WooCommerce
    await comingSoon.installWooCommerce(page);

    // Set coming soon options
    await comingSoon.setComingSoonOption(page, true, 'mm_coming_soon');
    await comingSoon.setComingSoonOption(page, true, 'nfd_coming_soon');

    // Navigate to WordPress admin
    await comingSoon.navigateToWpAdmin(page);
  });

  test.afterAll(async () => {
    // Uninstall WooCommerce and extensions - we can't use page in afterAll
    // await comingSoon.uninstallWooCommerceAndExtensions(page);
  });

  test("Replace our admin bar site status badge with WooCommerce's when active", async ({ page }) => {
    // Visit settings page
    await comingSoon.navigateToSettings(page, pluginId);
    // Force refresh
    await page.reload();

    // Verify WooCommerce coming soon is active
    await comingSoon.verifyWooCommerceComingSoonActive(page);
  });

  test('Our plugin settings should toggle WooCommerce admin bar badge', async ({ page }) => {
    // Visit settings page
    await comingSoon.navigateToSettings(page, pluginId);

    // Deactivate coming soon - Launch Site
    await comingSoon.toggleComingSoon(page);

    // WooCommerce badge should now be live
    await comingSoon.verifyWooCommerceComingSoonInactive(page);

    // Re-enable coming soon mode
    await comingSoon.toggleComingSoon(page);

    // WooCommerce badge should now be coming soon
    const comingSoonBadge = page.locator('#wp-toolbar .woocommerce-site-status-badge-coming-soon a.ab-item');
    await expect(comingSoonBadge).toBeVisible();
    await expect(comingSoonBadge).toContainText('Coming soon');
  });

  test('Hide our site preview notice when WooCommerce is active', async ({ page }) => {
    // Visit settings page
    await comingSoon.navigateToSettings(page, pluginId);

    // Visit frontend
    await comingSoon.navigateToFrontend(page);
    
    // Verify site preview warning is hidden
    await comingSoon.verifySitePreviewWarningHidden(page);
  });
});
