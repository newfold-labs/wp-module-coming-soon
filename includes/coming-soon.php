<?php
namespace NewfoldLabs\WP\Module;
use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * This class adds a coming soon page functionality.
 *
**/
class ComingSoon {

	/**
	 * Register functionality using WordPress Actions.
     * @param Container $container
	 */
	public function __construct( Container $container ) {
        $this->container = $container;
		//setup args
        $defaults = array(
            'option_name'          => 'mm_coming_soon',
            'admin_screen_id'      => 'newfold',
            'admin_app_url'        => \admin_url( 'admin.php?page=newfold' ),
            'admin_notice_text'    => __('Your site has `Coming Soon` mode active.', 'newfold-module-coming-soon'),
            'admin_bar_text'       => __('Coming Soon Active', 'newfold-module-coming-soon'),
            'template_page_title'  => __('Coming Soon!', 'newfold-module-coming-soon'),
            'template_h1'          => __('Coming Soon!', 'newfold-module-coming-soon'),
            'template_h2'          => __('A New WordPress Site!', 'newfold-module-coming-soon'),
            'template_p'           => __('Be the first to know when we launch, enter your email address and we will let you know when we go live and any future website updates we have.', 'newfold-module-coming-soon'),
            'template_email_label' => __('Email', 'newfold-module-coming-soon'),
            'template_email_ph'    => __('Enter your email address', 'newfold-module-coming-soon'),
            'template_subscribe'   => __('Subscribe', 'newfold-module-coming-soon'),
            'template_msg_success' => __('Thank you, please check your email to confirm your subscription.', 'newfold-module-coming-soon'),
            'template_msg_active'  => __('Your email address is already subscribed to this website. Stay tuned to your inbox for our updates or try a different email address.', 'newfold-module-coming-soon'),
            'template_msg_invalid' => __('There was an error with your submission and you were not subscribed. Please try again with a valid email address.', 'newfold-module-coming-soon'),
        );
        $this->args = wp_parse_args( $container->has('comingsoon') ? $container['comingsoon'] : [], $defaults );
        // var_dump($this->args);
        
        //actions
        \add_action( 'admin_notices', array( $this, 'notice_display' ) );
        \add_action( 'admin_bar_menu', array( $this, 'add_tool_bar_item' ), 100 );
        \add_action( 'template_redirect', array( $this, 'maybe_load_template' ) );
        \add_action( 'wp_ajax_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
        \add_action( 'wp_ajax_nopriv_newfold_coming_soon_subscribe', array( $this, 'coming_soon_subscribe' ) );
        \add_action( 'plugins_loaded', array( $this, 'coming_soon_prevent_emails' ) );

    }

    /**
     * Display coming soon notice.
     */
    public function notice_display() {
        $screen = get_current_screen();
        if (
                'true' === get_option( esc_attr( $this->args['option_name'] ), 'false' ) && //coming soon is active
                false === strpos( $screen->id, $this->args['admin_screen_id'] ) && // not on our app screen
                current_user_can( 'manage_options' ) // current user can manage options
            ) {
            ?>
            <div class='notice notice-warning'>
                <p><?php echo $this->args['admin_notice_text']; ?></p>
            </div>
            <?php
        }
    }



    /**
     * Customize the admin bar.
     *
     * @param \WP_Admin_Bar $admin_bar An instance of the WP_Admin_Bar class.
     */
    public function add_tool_bar_item( \WP_Admin_Bar $admin_bar ) {
        if ( current_user_can( 'manage_options' ) ) {
            if ( 'true' === get_option( esc_attr( $this->args['option_name'] ), 'false' ) ) {
                $cs_args = array(
                    'id'    => $this->args['admin_screen_id'] . '-coming_soon',
                    'href'  => esc_url( $this->args['admin_app_url'] ),
                    'title' => '<div class="' . $this->args['admin_screen_id'] . '-coming_soon-highlight">' . $this->args['admin_bar_text'] . '</div>',
                    'meta'  => array(
                        'title' => esc_attr__( 'Launch Your Site', 'newfold-module-coming-soon' ),
                    ),
                );
                $admin_bar->add_menu( $cs_args );
            }
        }
    }

    /**
     * Load the coming soon page, if necessary.
     */
    public function maybe_load_template() {
        if ( ! is_user_logged_in() || 'coming_soon' === $_GET["preview"] ) {
            $coming_soon = get_option( esc_attr( $this->args['option_name'] ), 'false' );
            if ( 'true' === $coming_soon ) {
                $this->coming_soon_content($this->args);
                die();
            }
        }
    }

    /**
     * Render the coming soon page.
     */
    public static function coming_soon_content($args) {
        $coming_soon_template = __DIR__ . '/template/index.php';
        // require $coming_soon_template;
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

        }

    }

    /**
     * When the coming soon module is enabled, add a filter to override Jetpack to prevent emails from being sent.
     */
    public function coming_soon_prevent_emails() {

        $enabled = get_option( esc_attr( $this->args['option_name'] ), 'false' );
        if ( 'true' === $enabled ) {
            add_filter(
                'jetpack_subscriptions_exclude_all_categories_except',
                __CLASS__ . '\\coming_soon_prevent_emails_return_array'
            );
        }

    }

    /**
     * Prevent emails from being sent.
     *
     * @see coming_soon_prevent_emails
     *
     * @return string[]
     */
    public function coming_soon_prevent_emails_return_array() {

        return array(
            'please-for-the-love-of-all-things-do-not-exist',
        );

    }

}