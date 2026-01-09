import { test, expect } from '@playwright/test';
import {
  auth,
  installWooCommerce,
  setComingSoonOption,
  navigateToWpAdmin,
  navigateToSettings,
  navigateToFrontend,
  verifyWooCommerceComingSoonActive,
  verifyWooCommerceComingSoonInactive,
  enableComingSoon,
  disableComingSoon,
  verifySitePreviewWarningHidden,
  uninstallWooCommerce,
} from '../helpers';

// Use environment variable to resolve plugin helpers
const pluginId = process.env.PLUGIN_ID || 'bluehost';

test.describe('Coming Soon with WooCommerce', () => {
  test.describe.configure({ timeout: 60000 });

  test.beforeEach(async ({ page }) => {
    // Login to WordPress
    await auth.loginToWordPress(page);

    // Activate WooCommerce
    await installWooCommerce(page);

    // Set coming soon options
    await setComingSoonOption(page, true, 'mm_coming_soon');
    await setComingSoonOption(page, true, 'nfd_coming_soon');

    // Navigate to WordPress admin
    await navigateToWpAdmin(page);
  });

  test.afterAll(async () => {
    // Uninstall WooCommerce and extensions
    await uninstallWooCommerce();
  });

  test("Replace our admin bar site status badge with WooCommerce's when active", async ({ page }) => {
    // Visit settings page
    await navigateToSettings(page, pluginId);
    // Force refresh
    await page.reload();

    // Verify WooCommerce coming soon is active
    await verifyWooCommerceComingSoonActive(page);
  });

  test('Our plugin settings should toggle WooCommerce admin bar badge', async ({ page }) => {
    // Disable coming soon via dashboard widget
    await disableComingSoon(page);

    // WooCommerce badge should now show "Live"
    await verifyWooCommerceComingSoonInactive(page);

    // Re-enable coming soon via dashboard widget
    await enableComingSoon(page);

    // WooCommerce badge should now show "Coming soon"
    const comingSoonBadge = page.locator('#wp-toolbar .woocommerce-site-status-badge-coming-soon a.ab-item');
    await expect(comingSoonBadge).toBeVisible();
    await expect(comingSoonBadge).toContainText('Coming soon');
  });

  test('Hide our site preview notice when WooCommerce is active', async ({ page }) => {
    // Visit settings page
    await navigateToSettings(page, pluginId);

    // Visit frontend
    await navigateToFrontend(page);
    
    // Verify site preview warning is hidden
    await verifySitePreviewWarningHidden(page);
  });
});
