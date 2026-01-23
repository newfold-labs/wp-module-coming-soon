/**
 * Coming Soon Module Test Helpers for Playwright
 */
import { expect } from '@playwright/test';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve plugin directory from PLUGIN_DIR env var (set by playwright.config.mjs) or process.cwd()
const pluginDir = process.env.PLUGIN_DIR || process.cwd();

// Build path to plugin helpers (.mjs extension for ES module compatibility)
const finalHelpersPath = join(pluginDir, 'tests/playwright/helpers/index.mjs');

// Import plugin helpers using file:// URL
const helpersUrl = pathToFileURL(finalHelpersPath).href;
const pluginHelpers = await import(helpersUrl);

// Destructure plugin helpers
let { auth, wordpress, newfold, a11y, utils } = pluginHelpers;
const { fancyLog } = utils;
const { setCapability } = newfold;

/**
 * Remove WooCommerce plugin
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function removeWooCommerce(page) {
  try {
    await wordpress.wpCli('plugin uninstall woocommerce', {
      timeout: 15000,
      failOnNonZeroExit: false,
    });
  } catch (error) {
    fancyLog('Failed to remove WooCommerce:' + error.message, 55, 'yellow');
  }
}

/**
 * Install and activate WooCommerce plugin
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function installWooCommerce(page) {
  try {
    await wordpress.wpCli('plugin install woocommerce --activate', {
      timeout: 15000,
    });
  } catch (error) {
    fancyLog('Failed to install WooCommerce:' + error.message, 55, 'yellow');
  }
}

/**
 * Uninstall WooCommerce and extensions
 */
async function uninstallWooCommerce() {
  try {
    await wordpress.wpCli(
      'plugin uninstall woocommerce --deactivate',
      {
        timeout: 20000,
        failOnNonZeroExit: false,
      }
    );
  } catch (error) {
    fancyLog('Failed to uninstall WooCommerce:' + error.message, 55, 'yellow');
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
    // Convert boolean to WordPress option format (1/0)
    const value = enabled ? '1' : '0';
    await wordpress.setOption(optionName, value);
  } catch (error) {
    fancyLog(`Failed to set ${optionName}:` + error.message, 55, 'yellow');
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
 * Enable coming soon mode via dashboard widget
 * Navigates to dashboard and clicks the enable button if coming soon is currently disabled
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function enableComingSoon(page) {
  await page.goto('/wp-admin/index.php');
  await page.waitForLoadState('networkidle');
  
  const enableButton = page.locator('[data-test-id="nfd-coming-soon-enable"]');
  const disableButton = page.locator('[data-test-id="nfd-coming-soon-disable"]');
  
  // Wait for either button to be visible (widget loaded)
  await expect(enableButton.or(disableButton)).toBeVisible({ timeout: 10000 });
  
  // If enable button is visible, coming soon is currently disabled - click to enable
  if (await enableButton.isVisible()) {
    await enableButton.click();
    await page.waitForLoadState('networkidle');
    // Wait for disable button to appear (confirms state change)
    await expect(disableButton).toBeVisible({ timeout: 10000 });
  }
}

/**
 * Disable coming soon mode via dashboard widget
 * Navigates to dashboard and clicks the disable button if coming soon is currently enabled
 * 
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function disableComingSoon(page) {
  await page.goto('/wp-admin/index.php');
  
  const enableButton = page.locator('[data-test-id="nfd-coming-soon-enable"]');
  const disableButton = page.locator('[data-test-id="nfd-coming-soon-disable"]');
  
  // Wait for either button to be visible (widget loaded)
  await expect(enableButton.or(disableButton)).toBeVisible({ timeout: 20000 });
  
  // If disable button is visible, coming soon is currently enabled - click to disable
  if (await disableButton.isVisible()) {
    await disableButton.click();
    // Wait for enable button to appear (confirms state change)
    await expect(enableButton).toBeVisible({ timeout: 20000 });
  }
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

export {
  // Plugin helpers (re-exported for convenience)
  auth,
  wordpress,
  newfold,
  a11y,
  utils,
  // Coming Soon helpers
  removeWooCommerce,
  installWooCommerce,
  uninstallWooCommerce,
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
  enableComingSoon,
  disableComingSoon,
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
