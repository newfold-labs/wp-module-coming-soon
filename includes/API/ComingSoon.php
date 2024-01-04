<?php

namespace NewfoldLabs\WP\Module\ComingSoon\API;

use function NewfoldLabs\WP\ModuleLoader\container;

class ComingSoon
{
	private $namespace = 'newfold-coming-soon/v1';

	public function __construct() {
		$this->register_routes();
	}

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/status',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => array( $this, 'check_permissions' ),
				'callback'            => array( $this, 'check_status' ),
			)
		);

		register_rest_route(
			$this->namespace,
			'/enable',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'permission_callback' => array( $this, 'check_permissions' ),
				'callback'            => array( $this, 'enable'),
			)
		);

		register_rest_route(
			$this->namespace,
			'/disable',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'permission_callback' => array( $this, 'check_permissions' ),
				'callback'            => array( $this, 'disable'),
			)
		);
	}

	public function check_status() {
		$coming_soon_service = container()->get( 'comingSoon' );
		return array( 'comingSoon' => $coming_soon_service->is_enabled() );
	}

	public function enable() {
		$coming_soon_service = container()->get( 'comingSoon' );
		$coming_soon_service->enable();
		return array( 'comingSoon' => true );
	}

	public function disable() {
		$coming_soon_service = container()->get( 'comingSoon' );
		$coming_soon_service->disable();
		return array( 'comingSoon' => false );
	}

	public function check_permissions() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error( 'rest_forbidden', esc_html__( 'You cannot access the resource.' ), array( 'status' => 401 ) );
		}
		if ( ! container()->has( 'comingSoon' ) ) {
			return new \WP_Error( 'rest_forbidden', esc_html__( 'Coming Soon module service provider error.' ), array( 'status' => 401 ) );
		}
		return true;
	}
}