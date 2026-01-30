<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * WPUnit tests for the Coming Soon Service (endpoint handler logic).
 *
 * Tests the Service class directly so they pass without requiring REST routes
 * or the module container. The API handler (API\ComingSoon) delegates to
 * this service for status, enable, disable, and last-changed.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ComingSoon\Service
 */
class ServiceWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * @var Service
	 */
	private $service;

	public function setUp(): void {
		parent::setUp();
		$this->service = new Service();
	}

	public function tearDown(): void {
		delete_option( 'nfd_coming_soon' );
		delete_option( 'nfd_coming_soon_last_changed' );
		parent::tearDown();
	}

	/**
	 * @covers ::is_enabled
	 */
	public function test_is_enabled_default_false() {
		$this->assertFalse( $this->service->is_enabled() );
	}

	/**
	 * @covers ::enable
	 * @covers ::is_enabled
	 */
	public function test_enable_sets_coming_soon_true() {
		$this->service->enable();
		$this->assertTrue( $this->service->is_enabled() );
	}

	/**
	 * @covers ::disable
	 * @covers ::is_enabled
	 */
	public function test_disable_sets_coming_soon_false() {
		$this->service->enable();
		$this->service->disable();
		$this->assertFalse( $this->service->is_enabled() );
	}

	/**
	 * @covers ::get_last_changed_timestamp
	 */
	public function test_get_last_changed_timestamp_false_when_never_set() {
		$this->assertFalse( $this->service->get_last_changed_timestamp( false ) );
		$this->assertFalse( $this->service->get_last_changed_timestamp( true ) );
	}

	/**
	 * @covers ::enable
	 * @covers ::get_last_changed_timestamp
	 */
	public function test_enable_updates_last_changed() {
		$this->service->enable();
		$as_int = $this->service->get_last_changed_timestamp( false );
		$as_date = $this->service->get_last_changed_timestamp( true );
		$this->assertIsInt( $as_int, 'lastChanged as int should be integer' );
		$this->assertNotEmpty( $as_int, 'lastChanged should be set after enable' );
		$this->assertIsString( $as_date, 'lastChanged as date should be string' );
		$this->assertMatchesRegularExpression( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $as_date, 'lastChanged date should be Y-m-d H:i:s' );
	}

	/**
	 * @covers ::disable
	 * @covers ::get_last_changed_timestamp
	 */
	public function test_disable_updates_last_changed() {
		$this->service->enable();
		$after_enable = $this->service->get_last_changed_timestamp( false );
		$this->service->disable();
		$after_disable = $this->service->get_last_changed_timestamp( false );
		$this->assertIsInt( $after_disable, 'lastChanged should remain an int after disable' );
		$this->assertGreaterThanOrEqual( $after_enable, $after_disable, 'lastChanged should be updated on disable' );
	}

	/**
	 * @covers ::enable
	 */
	public function test_enable_with_timestamp_false_does_not_update_last_changed() {
		$this->service->enable( false );
		$this->assertTrue( $this->service->is_enabled() );
		$this->assertFalse( $this->service->get_last_changed_timestamp( false ), 'last_changed should not be set when enable( false )' );
	}

	/**
	 * @covers ::disable
	 */
	public function test_disable_with_timestamp_false_does_not_update_last_changed() {
		$this->service->enable();
		$ts = $this->service->get_last_changed_timestamp( false );
		$this->service->disable( false );
		$this->assertFalse( $this->service->is_enabled() );
		$this->assertSame( $ts, $this->service->get_last_changed_timestamp( false ), 'last_changed should be unchanged when disable( false )' );
	}

	/**
	 * @covers ::is_enabled
	 */
	public function test_is_enabled_true_when_option_is_truthy() {
		update_option( 'nfd_coming_soon', '1' );
		$this->assertTrue( $this->service->is_enabled() );
		update_option( 'nfd_coming_soon', true );
		$this->assertTrue( $this->service->is_enabled() );
	}

	/**
	 * @covers ::is_enabled
	 */
	public function test_is_enabled_false_when_option_is_falsy() {
		update_option( 'nfd_coming_soon', '0' );
		$this->assertFalse( $this->service->is_enabled() );
		update_option( 'nfd_coming_soon', '' );
		$this->assertFalse( $this->service->is_enabled() );
	}

	/**
	 * @covers ::enable
	 * @covers ::is_enabled
	 */
	public function test_enable_twice_is_idempotent() {
		$this->service->enable();
		$this->service->enable();
		$this->assertTrue( $this->service->is_enabled() );
	}

	/**
	 * @covers ::disable
	 * @covers ::is_enabled
	 */
	public function test_disable_twice_is_idempotent() {
		$this->service->enable();
		$this->service->disable();
		$this->service->disable();
		$this->assertFalse( $this->service->is_enabled() );
	}

	/**
	 * @covers ::get_last_changed_timestamp
	 */
	public function test_get_last_changed_timestamp_returns_int_when_as_date_false() {
		$this->service->enable();
		$result = $this->service->get_last_changed_timestamp( false );
		$this->assertIsInt( $result );
		$this->assertGreaterThan( 0, $result );
	}

	/**
	 * @covers ::get_last_changed_timestamp
	 */
	public function test_get_last_changed_timestamp_returns_date_string_when_as_date_true() {
		$this->service->enable();
		$result = $this->service->get_last_changed_timestamp( true );
		$this->assertIsString( $result );
		$this->assertMatchesRegularExpression( '/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result );
	}
}
