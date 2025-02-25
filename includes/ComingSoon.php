<?php

namespace NewfoldLabs\WP\Module\ComingSoon;

use NewfoldLabs\WP\ModuleLoader\Container;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * This class adds a coming soon page functionality.
 **/
#[\AllowDynamicProperties]
class ComingSoon {

	/**
	 * Register functionality using WordPress Actions.
	 *
	 * @param Container $container the container from the module loader.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		// setup args.
		$defaults   = array(
			'admin_screen_id'      => container()->plugin()->id,
			'admin_app_url'        => \admin_url( 'admin.php?page=newfold' ),
			'admin_notice_text'    => __( 'Your site has Coming Soon mode active.', 'wp-module-coming-soon' ),
			'template_page_title'  => __( 'Coming Soon!', 'wp-module-coming-soon' ),
			'template_styles'      => false,
			'template_content'     => false,
			'template_h1'          => __( 'Coming Soon!', 'wp-module-coming-soon' ),
			'template_h2'          => __( 'A New WordPress Site!', 'wp-module-coming-soon' ),
			'template_login_btn'   => false,
			'template_p'           => __( 'Be the first to know when we launch, enter your email address and we will let you know when we go live and any future website updates we have.', 'wp-module-coming-soon' ),
			'template_msg_success' => __( 'Thank you, please check your email to confirm your subscription.', 'wp-module-coming-soon' ),
			'template_msg_active'  => __( 'Your email address is already subscribed to this website. Stay tuned to your inbox for our updates or try a different email address.', 'wp-module-coming-soon' ),
			'template_msg_invalid' => __( 'There was an error with your submission and you were not subscribed. Please try again with a valid email address.', 'wp-module-coming-soon' ),
			'template_email_label' => __( 'Email', 'wp-module-coming-soon' ),
			'template_email_ph'    => __( 'Enter your email address', 'wp-module-coming-soon' ),
			'template_subscribe'   => __( 'Subscribe', 'wp-module-coming-soon' ),
			'template_footer_t'    => __( 'Is this your website? Log in to WordPress to launch your site.', 'wp-module-coming-soon' ),
		);
		$this->args = wp_parse_args( $container->has( 'comingsoon' ) ? $container['comingsoon'] : array(), $defaults );

		if ( false !== $this->args['template_styles'] && isset( $container['plugin'] ) ) {
			// add plugin version to plugin styles file for cache busting.
			$this->args['template_styles'] = $this->args['template_styles'] . '?v=' . container()->plugin()->version;
		}

		new WooCommerceOptionsSync();

		// set up all actions.
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		\add_action( 'init', array( __CLASS__, 'load_text_domain' ), 0 );
		\add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		\add_action( 'newfold/onboarding/completed', array( $this, 'handle_onboarding_completed' ) );
		\add_action( 'admin_notices', array( $this, 'notice_display' ) );
		\add_action( 'template_redirect', array( $this, 'maybe_load_template' ) );
		\add_action( 'wp_ajax_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'wp_ajax_nopriv_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'plugins_loaded', array( $this, 'coming_soon_prevent_emails' ) );
		\add_filter( 'default_option_nfd_coming_soon', array( $this, 'filter_coming_soon_fallback' ) );
		\add_action( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ), 10, 2 );
		\add_action( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ), 10, 2 );
		\add_filter( 'jetpack_is_under_construction_plugin', array( $this, 'filter_jetpack_is_under_construction' ) );

		new AdminBarSiteStatusBadge( $container );
		new SitePreviewWarning();
		new PrePublishModal();
	}

	/**
	 * When the coming soon state is updated, make sure we trigger actions and update the legacy option value.
	 *
	 * @param mixed $old_value Old option value.
	 * @param mixed $value New option value.
	 *
	 * @return mixed
	 */
	public function on_update_nfd_coming_soon( $old_value, $value ) {

		// Ensure the value is a boolean.
		$value = wp_validate_boolean( $value );

		// Trigger any actions associated with the coming soon state.
		$this->conditionally_trigger_coming_soon_action_hooks( $value );

		// When the database value changes for the new value, make sure we update the legacy value.
		remove_filter( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ) );
		update_option( 'mm_coming_soon', $value );
		add_filter( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ), 10, 2 );

		return $value;
	}

	/**
	 * When the coming soon state is updated, make sure we trigger actions and update the new option value.
	 *
	 * @param mixed $old_value Old option value.
	 * @param mixed $value New option value.
	 *
	 * @return mixed
	 */
	public function on_update_mm_coming_soon( $old_value, $value ) {

		// Ensure the value is a boolean.
		$value = wp_validate_boolean( $value );

		// Trigger any actions associated with the coming soon state.
		$this->conditionally_trigger_coming_soon_action_hooks( $value );

		// When the database value changes for the legacy value, make sure we update the new value.
		remove_filter( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ) );
		update_option( 'nfd_coming_soon', $value );
		add_filter( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ), 10, 2 );

		return $value;
	}

	/**
	 * Conditionally trigger coming soon actions.
	 *
	 * The data module only starts listening for events after the init hook.
	 *  - If the init hook has run, we trigger the action immediately.
	 *  - If the init hook has not run, we add a callback to the init hook to trigger the action.
	 *
	 * @param bool $is_enabled True if coming soon is enabled, false otherwise.
	 *
	 * @return void
	 */
	public function conditionally_trigger_coming_soon_action_hooks( bool $is_enabled ) {

		if ( ! did_action( 'init' ) ) {
			add_action(
				'init',
				function () use ( $is_enabled ) {
					$this->conditionally_trigger_coming_soon_action_hooks( $is_enabled );
				},
				99
			);

			return;
		}

		if ( $is_enabled ) {
			$this->trigger_enabled_action_hook();
		} else {
			$this->trigger_disabled_action_hook();
		}
	}

	/**
	 * Trigger the enabled action hook.
	 *
	 * @return void
	 */
	public function trigger_enabled_action_hook() {
		if ( ! did_action( 'newfold/coming-soon/enabled' ) ) {
			do_action( 'newfold/coming-soon/enabled' ); // phpcs:ignore
		}
	}

	/**
	 * Trigger the disabled action hook.
	 *
	 * @return void
	 */
	public function trigger_disabled_action_hook() {
		if ( ! did_action( 'newfold/coming-soon/disabled' ) ) {
			do_action( 'newfold/coming-soon/disabled' ); // phpcs:ignore
		}
	}

	/**
	 * If nfd_coming_soon is not defined, set it to the value of mm_coming_soon.
	 *
	 * @return bool
	 */
	public function filter_coming_soon_fallback() {
		return wp_validate_boolean( get_option( 'mm_coming_soon', false ) );
	}

	/**
	 * Enqueue admin scripts.
	 */
	public function enqueue_admin_scripts() {
		$assets_dir = container()->plugin()->url . 'vendor/newfold-labs/wp-module-coming-soon/static/js/';

		wp_enqueue_script(
			'newfold-coming-soon-api',
			$assets_dir . 'coming-soon.js',
			array( 'wp-api-fetch', 'nfd-runtime', 'wp-i18n' ),
			container()->plugin()->version,
			true
		);

		self::load_js_translations(
			'newfold-coming-soon-api',
			'wp-module-coming-soon',
			NFD_COMING_SOON_DIR . '/languages'
		);
	}

	/**
	 * Register the coming soon route.
	 */
	public function rest_api_init() {
		new API\ComingSoon();
	}

	/**
	 * Handle the onboarding complete action.
	 * When the onboarding is complete, disable the coming soon page if the user has not opted in.
	 *
	 * @return void
	 */
	public function handle_onboarding_completed() {
		$coming_soon_service = container()->get( 'comingSoon' );

		$coming_soon_last_changed = $coming_soon_service->get_last_changed_timestamp();
		if ( ! $coming_soon_last_changed ) {
			$coming_soon_service->disable();
		}
	}

	/**
	 * Display coming soon notice.
	 */
	public function notice_display() {

		$screen = get_current_screen();

		$allowed_notice_html = array(
			// formatting.
			'strong' => array(),
			'em'     => array(),
			// and links.
			'a'      => array(
				'href'  => array(),
				'title' => array(),
			),
		);

		if (
			isComingSoonActive() && // coming soon is active.
			false === strpos( $screen->id, $this->args['admin_screen_id'] ) && // not on our app screen.
			current_user_can( 'manage_options' ) // current user can manage options.
		) {
			?>
			<div class='notice notice-warning'>
				<p><?php echo wp_kses( $this->args['admin_notice_text'], $allowed_notice_html ); ?></p>
			</div>
			<?php
		}
	}

	/**
	 * Load the coming soon page, if necessary.
	 */
	public function maybe_load_template() {
		if ( ! is_user_logged_in() || ( isset( $_SERVER['QUERY_STRING'] ) && 'preview=coming_soon' === $_SERVER['QUERY_STRING'] ) ) {
			if ( isComingSoonActive() ) {
				self::coming_soon_content( $this->args );
				die();
			}
		}
	}

	/**
	 * Render the coming soon page.
	 *
	 * @param array $args The args from container and defaults to pass to the template.
	 */
	public static function coming_soon_content( $args ) {
		$coming_soon_template = __DIR__ . '/template/index.php';
		load_template( $coming_soon_template, true, $args );
	}

	/**
	 * Handle the AJAX subscribe action.
	 */
	public function coming_soon_subscribe() {

		$response   = array();
		$a_response = array();
		$email      = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';

		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( wp_unslash( $_POST['nonce'] ), 'newfold_coming_soon_subscribe_nonce' ) ) {

			$a_response['message'] = __( 'Gotcha!', 'wp-module-coming-soon' );
			$a_response['status']  = 'nonce_failure';

		} else {

			if ( ! is_email( $email ) ) {

				$a_response['message'] = __( 'Please provide a valid email address', 'wp-module-coming-soon' );
				$a_response['status']  = 'invalid_email';

			} else {

				// Initialize JetPack_Subscriptions.
				$jetpack = \Jetpack_Subscriptions::init();

				// ensure jetpack subscribe is callable, bail if not.
				if ( ! is_callable( array( $jetpack, 'subscribe' ) ) ) {
					$a_response['message'] = __( 'Jetpack encountered an error with the subscription', 'wp-module-coming-soon' );
					$a_response['status']  = 'jetpack-error';
					wp_send_json( $a_response );
					exit;
				}

				// Get JetPack response and subscribe email if response is true.
				$response = $jetpack->subscribe(
					$email,
					0,
					false,
					// See Jetpack subscribe `extra_data` attribute.
					array(
						'server_data' => jetpack_subscriptions_cherry_pick_server_data(),
					)
				);

				if ( isset( $response[0]->errors ) ) {

					$error_text = array_keys( $response[0]->errors );
					$error_text = $error_text[0];

					$a_response['message'] = __( 'There was an error with the subscription', 'wp-module-coming-soon' );
					$a_response['status']  = $error_text;

				} else {

					$a_response['message'] = __( 'Subscription successful', 'wp-module-coming-soon' );
					$a_response['status']  = 'success';

				}
			}

			wp_send_json( $a_response );
			exit;

		}
	}

	/**
	 * When the coming soon module is enabled, add a filter to override Jetpack to prevent emails from being sent.
	 */
	public function coming_soon_prevent_emails() {

		if ( isComingSoonActive() ) {
			add_filter(
				'jetpack_subscriptions_exclude_all_categories_except',
				__CLASS__ . '\\coming_soon_prevent_emails_return_array'
			);
		}
	}

	/**
	 * Prevent emails from being sent.
	 *
	 * @return string[]
	 * @see coming_soon_prevent_emails
	 */
	public function coming_soon_prevent_emails_return_array() {

		return array(
			'please-for-the-love-of-all-things-do-not-exist',
		);
	}

	/**
	 * Filter Jetpack's is_under_construction_plugin to return true if the coming soon module is active.
	 *
	 * @see https://github.com/Automattic/jetpack/blob/trunk/projects/plugins/jetpack/_inc/lib/class.core-rest-api-endpoints.php#L1149-L1184
	 *
	 * @param bool $value Current value.
	 *
	 * @return bool
	 */
	public function filter_jetpack_is_under_construction( $value ) {
		if ( isComingSoonActive() ) {
			return true;
		}

		return $value;
	}

	/**
	 * Load text domain for Module
	 *
	 * @return void
	 */
	public static function load_text_domain() {

		\load_plugin_textdomain(
			'wp-module-coming-soon',
			false,
			NFD_COMING_SOON_DIR . '/languages'
		);
	}

	/**
	 * Sets translated strings for a script.
	 *
	 * @global WP_Scripts $wp_scripts The WP_Scripts object for printing scripts.
	 *
	 * @param string $script_handle Script handle the textdomain will be attached to.
	 * @param string $domain Text domain. Default 'default'.
	 * @param string $languages_dir The full file path to the directory containing translation files.
	 * @return bool True if the text domain was successfully localized, false otherwise.
	 */
	public static function load_js_translations( $script_handle, $domain, $languages_dir ) {
		\add_filter(
			'load_script_translation_file',
			function ( $file, $handle, $domain ) use ( $script_handle, $languages_dir ) {
				global $wp_scripts;

				if ( $script_handle !== $handle ) {
					return $file;
				}

				$src = $wp_scripts->registered[ $handle ]->src ?? false;

				if ( ! $src ) {
					return $file;
				}

				$locale  = determine_locale();
				$baseurl = plugins_url( '/', $languages_dir );
				$hash    = md5( str_replace( $baseurl, '', $src ) );
				$file    = "{$languages_dir}/{$domain}-{$locale}-{$hash}.json";

				return $file;
			},
			10,
			3
		);

		return \wp_set_script_translations(
			$script_handle,
			$domain,
			$languages_dir
		);
	}
}
