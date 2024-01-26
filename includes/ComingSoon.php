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
	 * @param Container $container the container from the module loader
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		// setup args
		$defaults   = array(
			'admin_screen_id'       => container()->plugin()->id,
			'admin_app_url'         => \admin_url( 'admin.php?page=newfold' ),
			'admin_notice_text'     => __( 'Your site has Coming Soon mode active.', 'newfold-module-coming-soon' ),
			'admin_bar_text'        => '<div>' . __( 'Coming Soon Active', 'newfold-module-coming-soon' ) . '</div>',
			'admin_bar_label'       => __( 'Site Status: ', 'newfold-module-coming-soon' ),
			'admin_bar_cs_active'   => __( 'NOT LIVE', 'newfold-module-coming-soon' ),
			'admin_bar_cs_inactive' => __( 'LIVE', 'newfold-module-coming-soon' ),
			'template_page_title'   => __( 'Coming Soon!', 'newfold-module-coming-soon' ),
			'template_styles'       => false,
			'template_content'      => false,
			'template_h1'           => __( 'Coming Soon!', 'newfold-module-coming-soon' ),
			'template_h2'           => __( 'A New WordPress Site!', 'newfold-module-coming-soon' ),
			'template_login_btn'    => false,
			'template_p'            => __( 'Be the first to know when we launch, enter your email address and we will let you know when we go live and any future website updates we have.', 'newfold-module-coming-soon' ),
			'template_msg_success'  => __( 'Thank you, please check your email to confirm your subscription.', 'newfold-module-coming-soon' ),
			'template_msg_active'   => __( 'Your email address is already subscribed to this website. Stay tuned to your inbox for our updates or try a different email address.', 'newfold-module-coming-soon' ),
			'template_msg_invalid'  => __( 'There was an error with your submission and you were not subscribed. Please try again with a valid email address.', 'newfold-module-coming-soon' ),
			'template_email_label'  => __( 'Email', 'newfold-module-coming-soon' ),
			'template_email_ph'     => __( 'Enter your email address', 'newfold-module-coming-soon' ),
			'template_subscribe'    => __( 'Subscribe', 'newfold-module-coming-soon' ),
			'template_footer_t'     => __( 'Is this your website? Log in to WordPress to launch your site.', 'newfold-module-coming-soon' ),
		);
		$this->args = wp_parse_args( $container->has( 'comingsoon' ) ? $container['comingsoon'] : array(), $defaults );

		if ( false !== $this->args['template_styles'] && isset( $container['plugin'] ) ) {
			// add plugin version to plugin styles file for cache busting
			$this->args['template_styles'] = $this->args['template_styles'] . '?v=' . container()->plugin()->version;
		}
		// set up all actions
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		\add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
		\add_action( 'newfold/onboarding/completed', array( $this, 'handle_onboarding_completed' ) );
		\add_action( 'admin_notices', array( $this, 'notice_display' ) );
		\add_action( 'template_redirect', array( $this, 'maybe_load_template' ) );
		\add_action( 'wp_ajax_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'wp_ajax_nopriv_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
		\add_action( 'plugins_loaded', array( $this, 'coming_soon_prevent_emails' ) );
		\add_action( 'admin_bar_menu', array( $this, 'newfold_site_status' ), 100 );
		\add_action( 'wp_body_open', array( $this, 'site_preview_warning' ) );
		\add_action( 'admin_head', array( $this, 'admin_bar_coming_soon_admin_styles' ) );
		\add_action( 'wp_head', array( $this, 'admin_bar_coming_soon_admin_styles' ) );
		\add_filter( 'default_option_nfd_coming_soon', array( $this, 'filter_coming_soon_fallback' ) );
		\add_action( 'update_option_nfd_coming_soon', array( $this, 'on_update_nfd_coming_soon' ), 10, 2 );
		\add_action( 'update_option_mm_coming_soon', array( $this, 'on_update_mm_coming_soon' ), 10, 2 );
		\add_filter( 'jetpack_is_under_construction_plugin', array( $this, 'filter_jetpack_is_under_construction' ) );

		new PrePublishModal();
	}

	/**
	 * When the coming soon state is updated, make sure we trigger actions and update the legacy option value.
	 *
	 * @param mixed $old_value
	 * @param mixed $value
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
	 * @param mixed $old_value
	 * @param mixed $value
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
	 * @param bool $isEnabled
	 *
	 * @return void
	 */
	public function conditionally_trigger_coming_soon_action_hooks( bool $isEnabled ) {

		if ( ! did_action( 'init' ) ) {
			add_action( 'init', function () use ( $isEnabled ) {
				$this->conditionally_trigger_coming_soon_action_hooks( $isEnabled );
			}, 99 );

			return;
		}

		if ( $isEnabled ) {
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
			ray( 'enabled' );
			do_action( 'newfold/coming-soon/enabled' );
		}
	}

	/**
	 * Trigger the disabled action hook.
	 *
	 * @return void
	 */
	public function trigger_disabled_action_hook() {
		if ( ! did_action( 'newfold/coming-soon/disabled' ) ) {
			ray( 'disabled' );
			do_action( 'newfold/coming-soon/disabled' );
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
		$assetsDir = container()->plugin()->url . 'vendor/newfold-labs/wp-module-coming-soon/static/js/';

		wp_enqueue_script(
			'newfold-coming-soon-api',
			$assetsDir . 'coming-soon.js',
			array( 'wp-api-fetch', 'nfd-runtime' ),
			container()->plugin()->version,
			true
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
			// formatting
			'strong' => array(),
			'em'     => array(),
			// and links
			'a'      => array(
				'href'  => array(),
				'title' => array(),
			),
		);

		if (
			isComingSoonActive() && // coming soon is active
			false === strpos( $screen->id, $this->args['admin_screen_id'] ) && // not on our app screen
			current_user_can( 'manage_options' ) // current user can manage options
		) {
			?>
            <div class='notice notice-warning'>
                <p><?php echo wp_kses( $this->args['admin_notice_text'], $allowed_notice_html ); ?></p>
            </div>
			<?php
		}
	}

	/**
	 * Some basic styles to control visibility of the coming soon state in the admin bar
	 */
	public function admin_bar_coming_soon_admin_styles() {
		?>
        <style>
            #nfd-site-status {
                background-color: #F8F8F8;
                color: #333333;
                padding: 0 16px;
				font-weight: 510;
				display:flex;
				height: 22px;
				align-items: center;
				gap: 2px;
				border-radius: 2px;
				margin-top: 4px;
            }

			#wpadminbar #wp-admin-bar-site-status  .ab-item{
				height:22px;
			}

            #nfd-site-status-coming-soon {
                color: #E01C1C;
                display: none;
				font-weight: 510;
            }

            #nfd-site-status-live {
                color: #048200;
                display: none;
				font-weight: 510;
            }

			#nfd-site-status[data-coming-soon="true"] {
				border: 1px solid var(--Dark-Red, #C71919);
            }
			
			#nfd-site-status[data-coming-soon="false"] {
				border: 1px solid var(--A11y-GRN, #278224);
			}

            #nfd-site-status[data-coming-soon="true"] #nfd-site-status-coming-soon {
                display: inline-block;
            }

            #nfd-site-status[data-coming-soon="false"] #nfd-site-status-live {
                display: inline-block;
            }
        </style>
		<?php
	}

	/**
	 * Customize the admin bar with site status.
	 *
	 * @param \WP_Admin_Bar $admin_bar An instance of the WP_Admin_Bar class.
	 */
	public function newfold_site_status( \WP_Admin_Bar $admin_bar ) {
		if ( current_user_can( 'manage_options' ) ) {

			$is_coming_soon = isComingSoonActive();
			$current_state  = $is_coming_soon ? 'true' : 'false';
			$content        = '<div id="nfd-site-status" data-coming-soon="' . $current_state . '">';
			$content        .= $this->args['admin_bar_label'];
			$content        .= '<span id="nfd-site-status-coming-soon" class="nfd-coming-soon-active">';
			$content        .= $this->args['admin_bar_cs_active'];
			$content        .= '</span>';
			$content        .= '<span id="nfd-site-status-live" class="nfd-coming-soon-inactive">';
			$content        .= $this->args['admin_bar_cs_inactive'];
			$content        .= '</span>';
			$content        .= '</div>';

			$site_status_menu = array(
				'id'     => 'site-status',
				'parent' => 'top-secondary',
				'href'   => admin_url( 'admin.php?page=' . $this->container->plugin()->id . '&nfd-target=coming-soon-section#/settings' ),
				'title'  => $content,
				'meta'   => array(
					'title' => esc_attr__( 'Launch Your Site', 'newfold-module-coming-soon' ),
				),
			);
			$admin_bar->add_menu( $site_status_menu );
		}
	}

	/**
	 * Load warning on site Preview
	 */
	public function site_preview_warning() {
		if ( isComingSoonActive() ) {
			echo "<div style='background-color: #e71616; padding: 0 16px;color:#ffffff;font-size:16px;text-align:center;font-weight: 590;'>" . esc_html__( 'Site Preview - This site is NOT LIVE, only admins can see this view.', 'newfold-module-coming-soon' ) . "</div>";
		}
	}

	/**
	 * Load the coming soon page, if necessary.
	 */
	public function maybe_load_template() {
		if ( ! is_user_logged_in() || 'preview=coming_soon' === $_SERVER['QUERY_STRING'] ) {
			if ( isComingSoonActive() ) {
				self::coming_soon_content( $this->args );
				die();
			}
		}
	}

	/**
	 * Render the coming soon page.
	 *
	 * @param array $args the args from container and defaults to pass to the template
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
		$email      = sanitize_email( wp_unslash( $_POST['email'] ) );

		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( wp_unslash( $_POST['nonce'] ), 'newfold_coming_soon_subscribe_nonce' ) ) {

			$a_response['message'] = __( 'Gotcha!', 'newfold-module-coming-soon' );
			$a_response['status']  = 'nonce_failure';

		} else {

			if ( ! is_email( $email ) ) {

				$a_response['message'] = __( 'Please provide a valid email address', 'newfold-module-coming-soon' );
				$a_response['status']  = 'invalid_email';

			} else {

				// Initialize JetPack_Subscriptions
				$jetpack = \Jetpack_Subscriptions::init();

				// ensure jetpack subscribe is callable, bail if not.
				if ( ! is_callable( array( $jetpack, 'subscribe' ) ) ) {
					$a_response['message'] = __( 'Jetpack encountered an error with the subscription', 'newfold-module-coming-soon' );
					$a_response['status']  = 'jetpack-error';
					wp_send_json( $a_response );
					exit;
				}

				// Get JetPack response and subscribe email if response is true
				$response = $jetpack->subscribe(
					$email,
					0,
					false,
					// See Jetpack subscribe `extra_data` attribute
					array(
						'server_data' => jetpack_subscriptions_cherry_pick_server_data(),
					)
				);

				if ( isset( $response[0]->errors ) ) {

					$error_text = array_keys( $response[0]->errors );
					$error_text = $error_text[0];

					$a_response['message'] = __( 'There was an error with the subscription', 'newfold-module-coming-soon' );
					$a_response['status']  = $error_text;

				} else {

					$a_response['message'] = __( 'Subscription successful', 'newfold-module-coming-soon' );
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
	 *
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
	 * @param bool $value
	 *
	 * @return bool
	 */
	public function filter_jetpack_is_under_construction( $value ) {
		if ( isComingSoonActive() ) {
			return true;
		}

		return $value;
	}

}
