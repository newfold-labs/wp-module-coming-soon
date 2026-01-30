<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

use function NewfoldLabs\WP\Module\ComingSoon\isComingSoonActive;
use function NewfoldLabs\WP\Module\ComingSoon\isWoocommerceActive;
use function NewfoldLabs\WP\Module\ComingSoon\optionExists;

/**
 * WPUnit tests for coming-soon helper functions.
 *
 * @covers ::NewfoldLabs\WP\Module\ComingSoon\optionExists
 * @covers ::NewfoldLabs\WP\Module\ComingSoon\isComingSoonActive
 * @covers ::NewfoldLabs\WP\Module\ComingSoon\isWoocommerceActive
 */
class FunctionsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	public function tearDown(): void {
		delete_option( 'nfd_coming_soon' );
		parent::tearDown();
	}

	/**
	 * @covers ::optionExists
	 */
	public function test_option_exists_returns_false_when_option_not_set() {
		$this->assertFalse( optionExists( 'nonexistent_option_xyz' ) );
	}

	/**
	 * @covers ::optionExists
	 */
	public function test_option_exists_returns_true_when_option_set() {
		update_option( 'test_option_for_functions', 'value' );
		$this->assertTrue( optionExists( 'test_option_for_functions' ) );
		delete_option( 'test_option_for_functions' );
	}

	/**
	 * @covers ::optionExists
	 */
	public function test_option_exists_returns_true_when_option_empty_string() {
		update_option( 'test_option_empty', '' );
		$this->assertTrue( optionExists( 'test_option_empty' ) );
		delete_option( 'test_option_empty' );
	}

	/**
	 * @covers ::isComingSoonActive
	 */
	public function test_is_coming_soon_active_false_when_disabled() {
		( new Service() )->disable();
		$this->assertFalse( isComingSoonActive() );
	}

	/**
	 * @covers ::isComingSoonActive
	 */
	public function test_is_coming_soon_active_true_when_enabled() {
		( new Service() )->enable();
		$this->assertTrue( isComingSoonActive() );
	}

	/**
	 * @covers ::isWoocommerceActive
	 */
	public function test_is_woocommerce_active_false_when_woocommerce_not_loaded() {
		$this->assertFalse( isWoocommerceActive() );
	}
}
