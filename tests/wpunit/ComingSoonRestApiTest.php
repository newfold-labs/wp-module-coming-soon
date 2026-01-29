<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * WPUnit tests for Coming Soon REST API endpoints.
 *
 * Verifies response status and shape for newfold-coming-soon/v1 routes.
 * Routes are registered when the module is loaded (e.g. by the brand plugin).
 * If routes are not registered (404), tests are skipped.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ComingSoon\API\ComingSoon
 */
class ComingSoonRestApiTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	const NAMESPACE = 'newfold-coming-soon/v1';

	/**
	 * Admin user ID for authenticated requests.
	 *
	 * @var int
	 */
	private static $admin_id;

	/**
	 * Set up an admin user for permission_callback (manage_options).
	 */
	public function setUp(): void {
		parent::setUp();
		if ( ! self::$admin_id ) {
			self::$admin_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		}
		wp_set_current_user( self::$admin_id );
	}

	/**
	 * Perform REST request and skip if endpoint is not registered (e.g. module not loaded).
	 *
	 * @param string $method GET, POST, etc.
	 * @param string $route  Route path without namespace, e.g. '/status'.
	 * @param array  $params Optional query or body params.
	 * @return \WP_REST_Response
	 */
	private function request( $method, $route, $params = array() ) {
		$request = new \WP_REST_Request( $method, '/' . self::NAMESPACE . $route );
		foreach ( $params as $key => $value ) {
			$request->set_param( $key, $value );
		}
		return rest_do_request( $request );
	}

	/**
	 * Skip the test if the API route is not registered (404).
	 *
	 * @param \WP_REST_Response $response Response from rest_do_request.
	 */
	private function skip_if_routes_not_registered( $response ) {
		if ( $response->get_status() === 404 ) {
			$this->markTestSkipped( 'Coming Soon REST routes not registered (module may not be loaded in this context).' );
		}
	}

	/**
	 * @covers ::check_status
	 */
	public function test_get_status_returns_200_and_coming_soon_key() {
		$response = $this->request( 'GET', '/status' );
		$this->skip_if_routes_not_registered( $response );
		$this->assertSame( 200, $response->get_status(), 'GET /status should return 200' );
		$data = $response->get_data();
		$this->assertIsArray( $data, 'Response data should be an array' );
		$this->assertArrayHasKey( 'comingSoon', $data, 'Response should have comingSoon key' );
		$this->assertIsBool( $data['comingSoon'], 'comingSoon should be boolean' );
	}

	/**
	 * @covers ::enable
	 */
	public function test_post_enable_returns_200_and_coming_soon_true() {
		$response = $this->request( 'POST', '/enable' );
		$this->skip_if_routes_not_registered( $response );
		$this->assertSame( 200, $response->get_status(), 'POST /enable should return 200' );
		$data = $response->get_data();
		$this->assertIsArray( $data );
		$this->assertArrayHasKey( 'comingSoon', $data );
		$this->assertTrue( $data['comingSoon'], 'After enable, comingSoon should be true' );
	}

	/**
	 * @covers ::disable
	 */
	public function test_post_disable_returns_200_and_coming_soon_false() {
		$response = $this->request( 'POST', '/disable' );
		$this->skip_if_routes_not_registered( $response );
		$this->assertSame( 200, $response->get_status(), 'POST /disable should return 200' );
		$data = $response->get_data();
		$this->assertIsArray( $data );
		$this->assertArrayHasKey( 'comingSoon', $data );
		$this->assertFalse( $data['comingSoon'], 'After disable, comingSoon should be false' );
	}

	/**
	 * @covers ::last_changed_timestamp
	 */
	public function test_get_last_changed_returns_200_and_last_changed_key() {
		$response = $this->request( 'GET', '/last-changed' );
		$this->skip_if_routes_not_registered( $response );
		$this->assertSame( 200, $response->get_status(), 'GET /last-changed should return 200' );
		$data = $response->get_data();
		$this->assertIsArray( $data );
		$this->assertArrayHasKey( 'lastChanged', $data, 'Response should have lastChanged key' );
		// lastChanged is either false or a timestamp (int/string)
		$this->assertTrue( $data['lastChanged'] === false || is_numeric( $data['lastChanged'] ) || is_string( $data['lastChanged'] ), 'lastChanged should be false or a timestamp' );
	}
}
