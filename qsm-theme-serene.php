<?php
/**
 * Plugin Name: QSM Theme - Serene
 * Plugin URI: https://quizandsurveymaster.com
 * Description: Free quiz theme for Quiz & Survey Master plugin
 * Author: QSM Team
 * Author URI: https://quizandsurveymaster.com
 * Version: 1.0.0
 *
 * @author QSM Team
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * This class is the main class of the plugin
 *
 * When loaded, it loads the included plugin files and add functions to hooks or filters.
 *
 * @since 1.0.0
 */
class QSMThemeSerene {

	/**
	 * Version Number
	 *
	 * @var string
	 * @since 1.0.0
	 */
	public $version = '1.0.0';

	/**
	 * Main Construct Function
	 *
	 * Call functions within class
	 *
	 * @since 1.0.0
	 * @uses QSMThemeSerene::load_dependencies() Loads required filed
	 * @uses QSMThemeSerene::check_license() check license
	 * @uses QSMThemeSerene::add_hooks() Adds actions to hooks and filters
	 * @return void
	 */
	public function __construct() {
		define( 'QSM_THEME_SERENE_VERSION', $this->version );
		define( 'QSM_THEME_SERENE_URL', plugin_dir_url( __FILE__ ) );
		define( 'QSM_THEME_SERENE_PATH', plugin_dir_path( __FILE__ ) );
		define( 'QSM_THEME_SERENE_CSS_URL', QSM_THEME_SERENE_URL . 'css' );
		define( 'QSM_THEME_SERENE_JS_URL', QSM_THEME_SERENE_URL . 'js' );
		define( 'QSM_THEME_SERENE_PHP_DIR', QSM_THEME_SERENE_PATH . 'php' );
		$this->load_dependencies();
		$this->check_license();
		$this->add_hooks();
	}

	/**
	 * Load File Dependencies
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function load_dependencies() {
		include QSM_THEME_SERENE_PHP_DIR . '/license.php';
		include QSM_THEME_SERENE_PHP_DIR . '/addon-settings-tab-content.php';
		include QSM_THEME_SERENE_PHP_DIR . '/admin_hooks.php';
	}

	/**
	 * Add Hooks
	 *
	 * Adds functions to relavent hooks and filters
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function add_hooks() {
		add_action( 'admin_init', 'qsm_addon_theme_serene_register_stats_tabs' );
	}

	/**
	 * Checks license
	 *
	 * Checks to see if license is active and, if so, checks for updates
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function check_license() {

		if ( ! class_exists( 'EDD_SL_Plugin_Updater' ) ) {
			// Loads our custom updater.
			include 'php/EDD_SL_Plugin_Updater.php';
		}

		// Retrieves our license key from the DB.
		$settings    = get_option( 'qsm_addon_theme_serene_settings', '' );
		$license_key = isset( $settings['license_key'] ) ? trim( $settings['license_key'] ) : '';

		// Sets up the updater.
		$edd_updater = new EDD_SL_Plugin_Updater(
			'https://quizandsurveymaster.com',
			__FILE__,
			array(
				'version'   => $this->version,
				'license'   => $license_key,
				'item_name' => 'serene',
				'author'    => 'QSM Team',
			)
		);
	}

	/**
	 * Default settings value
	 *
	 * @since 1.0.0
	 * @return array
	 */
	public static function default_setting() {
		$settings   = array();
		$settings[] = array(
			'id'      => 'background_color',
			'label'   => __( 'Background Color', 'qsm-theme-serene' ),
			'type'    => 'color',
			'default' => '#FFF',
		);
		$settings[] = array(
			'id'      => 'primary_color',
			'label'   => __( 'Primary Color', 'qsm-theme-serene' ),
			'type'    => 'color',
			'default' => '#229ACD',
		);
		$settings[] = array(
			'id'      => 'secondary_color',
			'label'   => __( 'Secondary Color', 'qsm-theme-serene' ),
			'type'    => 'color',
			'default' => '#fff',
		);
		$settings[] = array(
			'id'      => 'title_color',
			'label'   => __( 'Question Color', 'qsm-theme-serene' ),
			'type'    => 'color',
			'default' => '#1D4759',
		);
		$settings[] = array(
			'id'      => 'text_color',
			'label'   => __( 'Text Color', 'qsm-theme-serene' ),
			'type'    => 'color',
			'default' => '#547482',
		);

		return maybe_serialize( $settings );
	}
}

add_action( 'plugins_loaded', 'qsm_addon_serene_load' );

/**
 * Checks if QSM version 7.2.0 or above is installed
 *
 * @since 1.0.0
 * @return void
 */
function qsm_addon_serene_load() {
	$deactivate = true;
	if ( class_exists( 'MLWQuizMasterNext' ) ) {
		global $mlwQuizMasterNext;
			$current_version = $mlwQuizMasterNext->version;
		if ( version_compare( $current_version, '7.2.0', '>=' ) ) {
			new QSMThemeSerene();
			$deactivate = false;
		} else {
			add_action( 'admin_notices', 'qsm_addon_serene_version_qsm' );
		}
	} else {
		add_action( 'admin_notices', 'qsm_addon_serene_missing_qsm' );
	}
	if ( $deactivate ) {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
		$dir  = basename( dirname( __FILE__ ) );
		$file = basename( __FILE__ );
		deactivate_plugins( $dir . '/' . $file );
	}
}

/**
 * Generates admin notice if QSM is not installed
 *
 * @since 1.0.0
 * @return void
 */
function qsm_addon_serene_missing_qsm() {
	echo '<div class="error"><p>QSM - Themes requires Quiz And Survey Master. Please install and activate the Quiz And Survey Master plugin.</p></div>';
}

/**
 * Genereates admin notice if installed QSM in below 7.2.0
 *
 * @return void
 */
function qsm_addon_serene_version_qsm() {
	echo '<div class="error"><p>QSM - Themes requires at least Quiz And Survey Master V 7.2.0. Please update and reinstall</p></div>';
}

/**
 * Updates theme and default settings
 */
register_activation_hook(
	__FILE__,
	function () {
		if ( class_exists( 'MLWQuizMasterNext' ) ) {
			global $mlwQuizMasterNext;
				$current_version = $mlwQuizMasterNext->version;
			if ( version_compare( $current_version, '7.2.0', '>=' ) ) {
				$name     = 'Serene';
				$settings = QSMThemeSerene::default_setting();
				$dir      = basename( dirname( __FILE__ ) );
				$mlwQuizMasterNext->theme_settings->update_theme_status( true, $dir, $name, $settings );
			}
		}
	}
);

/**
 * Deactivates theme
 */
register_deactivation_hook(
	__FILE__,
	function () {
		if ( class_exists( 'MLWQuizMasterNext' ) ) {
			global $mlwQuizMasterNext;
				$current_version = $mlwQuizMasterNext->version;
			if ( version_compare( $current_version, '7.2.0', '>=' ) ) {
				$dir = basename( dirname( __FILE__ ) );
				$mlwQuizMasterNext->theme_settings->update_theme_status( false, $dir );}
		}
	}
);
