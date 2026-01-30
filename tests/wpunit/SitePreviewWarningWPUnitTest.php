<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * WPUnit tests for SitePreviewWarning.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ComingSoon\SitePreviewWarning
 */
class SitePreviewWarningWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Clean up options after each test.
	 */
	public function tearDown(): void {
		delete_option( 'nfd_coming_soon' );
		parent::tearDown();
	}

	/**
	 * Test that site_preview_warning outputs the expected markup.
	 *
	 * @covers ::site_preview_warning
	 */
	public function test_site_preview_warning_outputs_expected_markup() {
		$warning = new SitePreviewWarning();
		ob_start();
		$warning->site_preview_warning();
		$output = ob_get_clean();

		$this->assertStringContainsString( "class='nfd-site-preview-warning'", $output );
		$this->assertStringContainsString( 'Site Preview', $output );
		$this->assertStringContainsString( 'NOT LIVE', $output );
		$this->assertStringContainsString( 'only admins can see this view', $output );
	}
}
