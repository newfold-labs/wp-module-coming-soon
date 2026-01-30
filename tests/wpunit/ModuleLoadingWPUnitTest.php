<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

/**
 * Module loading tests for Coming Soon module.
 *
 * Verifies the Coming Soon module and its core classes are properly loaded.
 * These tests run without requiring the module to be registered in a container
 * (e.g. in the module repo or when run from a brand plugin).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ComingSoon\ComingSoon
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Test that WordPress factory is working.
	 */
	public function test_wordpress_factory_works() {
		$post = static::factory()->post->create_and_get();

		$this->assertInstanceOf( \WP_Post::class, $post );
	}

	/**
	 * Test that the Coming Soon module class is loaded.
	 */
	public function test_coming_soon_class_loaded() {
		$this->assertTrue( class_exists( 'NewfoldLabs\WP\Module\ComingSoon\ComingSoon' ) );
	}

	/**
	 * Test that the Service class is loaded.
	 */
	public function test_service_class_loaded() {
		$this->assertTrue( class_exists( 'NewfoldLabs\WP\Module\ComingSoon\Service' ) );
	}

	/**
	 * Test that the API ComingSoon class is loaded.
	 */
	public function test_api_coming_soon_class_loaded() {
		$this->assertTrue( class_exists( 'NewfoldLabs\WP\Module\ComingSoon\API\ComingSoon' ) );
	}
}
