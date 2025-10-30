/**
 * Coming Soon Module Test Helpers
 * 
 * Specific utilities for testing the coming soon module functionality.
 * Includes WordPress CLI operations, coming soon state management, and UI interactions.
 */

const { expect } = require('@playwright/test');
const { execSync } = require('child_process');

/**
 * WordPress CLI helper for coming soon module
 * 
 * @param {string} cmd - WP-CLI command to execute
 * @param {Object} options - Command options
 * @returns {string} Command output
 */
function wpCli(cmd, options = {}) {
  const defaultOptions = {
    timeout: 30000,
    failOnNonZeroExit: true,
    log: true,
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  try {
    const result = execSync(`npx wp-env run cli wp ${cmd}`, { 
      encoding: 'utf-8',
      stdio: finalOptions.failOnNonZeroExit ? 'pipe' : 'inherit',
      timeout: finalOptions.timeout
    });
    return result.trim();
  } catch (error) {
    if (finalOptions.failOnNonZeroExit) {
      throw new Error(`WP-CLI command failed: ${cmd}\n${error.message}`);
    }
    return '';
  }
}

/**
 * Remove WooCommerce plugin
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function removeWooCommerce(page) {
  try {
    wpCli('plugin uninstall woocommerce', {
      timeout: 40000,
      failOnNonZeroExit: false,
    });
  } catch (error) {
    console.warn('Failed to remove WooCommerce:', error.message);
  }
}

/**
 * Install and activate WooCommerce plugin
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function installWooCommerce(page) {
  try {
    wpCli('plugin install woocommerce --activate', {
      timeout: 40000,
    });
  } catch (error) {
    console.warn('Failed to install WooCommerce:', error.message);
  }
}

/**
 * Uninstall WooCommerce and extensions
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function uninstallWooCommerceAndExtensions(page) {
  try {
    wpCli(
      'plugin uninstall woocommerce yith-stripe-payments-for-woocommerce-extended yith-paypal-payments-for-woocommerce-extended --deactivate',
      {
        timeout: 60000,
        failOnNonZeroExit: false,
      }
    );
  } catch (error) {
    console.warn('Failed to uninstall WooCommerce extensions:', error.message);
  }
}

/**
 * Set coming soon option
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {boolean} enabled - Whether coming soon should be enabled
 * @param {string} optionName - Option name (default: 'nfd_coming_soon')
 */
async function setComingSoonOption(page, enabled, optionName = 'nfd_coming_soon') {
  try {
    wpCli(`option update ${optionName} ${enabled}`, {
      failOnNonZeroExit: false,
    });
  } catch (error) {
    console.warn(`Failed to set ${optionName}:`, error.message);
  }
}

/**
 * Navigate to settings page
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} pluginId - Plugin ID for URL construction
 */
async function navigateToSettings(page, pluginId = 'bluehost') {
  await page.goto(`/wp-admin/admin.php?page=${pluginId}#/settings/settings`);
}

/**
 * Navigate to home page
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} pluginId - Plugin ID for URL construction
 */
async function navigateToHome(page, pluginId = 'bluehost') {
  await page.goto(`/wp-admin/admin.php?page=${pluginId}#/home`);
}

/**
 * Navigate to WordPress admin
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function navigateToWpAdmin(page) {
  await page.goto('/wp-admin/index.php');
}

/**
 * Navigate to frontend
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function navigateToFrontend(page) {
  await page.goto('/');
}

/**
 * Get coming soon toggle element
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Toggle locator
 */
function getComingSoonToggle(page) {
  return page.locator('[data-id="coming-soon-toggle"]');
}

/**
 * Get admin bar site visibility badge
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Badge locator
 */
function getAdminBarBadge(page) {
  return page.locator('#wp-admin-bar-nfd-site-visibility-badge');
}

/**
 * Get WooCommerce admin bar badge
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Badge locator
 */
function getWooCommerceAdminBarBadge(page) {
  return page.locator('#wp-admin-bar-woocommerce-site-visibility-badge');
}

/**
 * Get coming soon section
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} appClass - App class selector
 * @returns {import('@playwright/test').Locator} Section locator
 */
function getComingSoonSection(page, appClass) {
  return page.locator(`${appClass}-app-settings-coming-soon`);
}

/**
 * Get site preview warning
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Warning locator
 */
function getSitePreviewWarning(page) {
  return page.locator('.nfd-site-preview-warning');
}

/**
 * Get admin notice
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Notice locator
 */
function getAdminNotice(page) {
  return page.locator('.notice-warning');
}

/**
 * Get notifications container
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @returns {import('@playwright/test').Locator} Notifications locator
 */
function getNotifications(page) {
  return page.locator('.nfd-notifications');
}

/**
 * Toggle coming soon state
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function toggleComingSoon(page) {
  const toggle = getComingSoonToggle(page);
  await toggle.click();
  await page.waitForTimeout(2000);
}

/**
 * Verify coming soon is active
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} appClass - App class selector
 */
async function verifyComingSoonActive(page, appClass) {
  // Check admin bar badge (if present)
  const adminBarBadge = getAdminBarBadge(page);
  if (await adminBarBadge.count() > 0) {
    await expect(adminBarBadge).toBeVisible();
    const badgeLink = adminBarBadge.locator('a.ab-item');
    await expect(badgeLink).toContainText('Coming soon');
  }
  
  // Check coming soon section
  const comingSoonSection = getComingSoonSection(page, appClass);
  if (await comingSoonSection.count() > 0) {
    await expect(comingSoonSection.locator('h3')).toContainText('Site Status');
    await expect(comingSoonSection.locator('label')).toContainText('Coming');
  }
  
  // Check toggle state
  const toggle = getComingSoonToggle(page);
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
}

/**
 * Verify coming soon is inactive
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyComingSoonInactive(page) {
  // Check admin bar badge shows live (if present)
  const liveBadge = page.locator('#wp-toolbar .nfd-site-status-badge-live a.ab-item');
  if (await liveBadge.count() > 0) {
    await expect(liveBadge).toBeVisible();
    await expect(liveBadge).toContainText('Live');
  }
  
  // Check toggle state
  const toggle = getComingSoonToggle(page);
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
}

/**
 * Verify WooCommerce coming soon is active
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyWooCommerceComingSoonActive(page) {
  // Our badge shouldn't be visible
  const ourBadge = getAdminBarBadge(page);
  await expect(ourBadge).toHaveCount(0);
  
  // WooCommerce badge should be visible
  const wooBadge = getWooCommerceAdminBarBadge(page);
  await expect(wooBadge).toBeVisible();
  
  const badgeLink = wooBadge.locator('a.ab-item');
  await expect(badgeLink).toHaveAttribute('href');
  
  const href = await badgeLink.getAttribute('href');
  expect(href).toContain('wc-settings');
}

/**
 * Verify WooCommerce coming soon is inactive
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyWooCommerceComingSoonInactive(page) {
  // WooCommerce badge should show live
  const liveBadge = page.locator('#wp-toolbar .woocommerce-site-status-badge-live a.ab-item');
  await expect(liveBadge).toBeVisible();
  await expect(liveBadge).toContainText('Live');
}

/**
 * Verify notification appears
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} message - Expected notification message
 */
async function verifyNotification(page, message) {
  const notifications = getNotifications(page);
  const notification = notifications.locator('.nfd-notification');
  await expect(notification).toContainText(message);
}

/**
 * Verify admin notice appears
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyAdminNotice(page) {
  // Filter notices by expected text to avoid strict mode conflicts
  const notice = page.locator('.notice-warning', { hasText: 'Your site is currently' });
  await expect(notice.first()).toBeVisible();
}

/**
 * Verify site preview warning appears
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifySitePreviewWarning(page) {
  const warning = getSitePreviewWarning(page);
  if (await warning.count() > 0) {
    await expect(warning.first()).toBeVisible();
  }
}

/**
 * Verify coming soon page on frontend
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifyComingSoonFrontend(page) {
  const title = await page.title();
  expect(title).toContain('Coming Soon');
  
  const wrap = page.locator('#wrap');
  await expect(wrap.locator('h1')).toHaveCount(1);
  
  const header = page.locator('header');
  await expect(header.locator('.login-link')).toHaveCount(1);
}

/**
 * Verify site is live on frontend
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifySiteLiveFrontend(page) {
  const title = await page.title();
  expect(title).not.toContain('Coming Soon');
  
  const body = page.locator('body');
  await expect(body.locator('text=Coming Soon')).toHaveCount(0);
}

/**
 * Verify site preview warning is hidden
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function verifySitePreviewWarningHidden(page) {
  const warning = getSitePreviewWarning(page);
  await expect(warning).toHaveCount(0);
}

/**
 * Get app class from environment
 * 
 * @returns {string} App class selector
 */
function getAppClass() {
  const appId = process.env.APP_ID || 'bluehost';
  return `.${appId}`;
}

module.exports = {
  wpCli,
  removeWooCommerce,
  installWooCommerce,
  uninstallWooCommerceAndExtensions,
  setComingSoonOption,
  navigateToSettings,
  navigateToHome,
  navigateToWpAdmin,
  navigateToFrontend,
  getComingSoonToggle,
  getAdminBarBadge,
  getWooCommerceAdminBarBadge,
  getComingSoonSection,
  getSitePreviewWarning,
  getAdminNotice,
  getNotifications,
  toggleComingSoon,
  verifyComingSoonActive,
  verifyComingSoonInactive,
  verifyWooCommerceComingSoonActive,
  verifyWooCommerceComingSoonInactive,
  verifyNotification,
  verifyAdminNotice,
  verifySitePreviewWarning,
  verifyComingSoonFrontend,
  verifySiteLiveFrontend,
  verifySitePreviewWarningHidden,
  getAppClass,
};
