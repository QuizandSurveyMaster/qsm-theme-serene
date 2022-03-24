<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers your tab in the addon  settings page
 *
 * @since 1.0.0
 * @return void
 */
function qsm_addon_theme_serene_register_stats_tabs() {
	global $mlwQuizMasterNext;
	if ( ! is_null( $mlwQuizMasterNext ) && ! is_null( $mlwQuizMasterNext->pluginHelper ) && method_exists( $mlwQuizMasterNext->pluginHelper, 'register_quiz_settings_tabs' ) ) {
		$mlwQuizMasterNext->pluginHelper->register_addon_settings_tab( 'QSM Theme serene', 'qsm_addon_theme_serene_addon_settings_tabs_content' );
	}
}

/**
 * Generates the content for your addon settings tab
 *
 * @since 1.0.0
 * @return void
 */
function qsm_addon_theme_serene_addon_settings_tabs_content() {
	global $mlwQuizMasterNext;
	// If nonce is correct, update settings from passed input
	if ( isset( $_POST['theme_serene_nonce'] ) && wp_verify_nonce( $_POST['theme_serene_nonce'], 'theme_serene' ) ) {
		$settings	 = get_option( 'qsm_addon_theme_serene_settings', '' );
		$license	 = isset( $settings['license_key'] ) ? trim( $settings['license_key'] ) : '';

		$saved_license	 = isset( $_POST['license_key'] ) ? sanitize_text_field( wp_unslash( $_POST['license_key'] ) ) : '';
		$new_settings	 = array( 'license_key' => $saved_license );
		// Checks to see if the license key has changed.
		if ( $license !== $saved_license ) {
			$activation = QSM_license::activate( $saved_license, 'serene' );
			if ( 'success' == $activation['status'] ) {
				$mlwQuizMasterNext->alertManager->newAlert( $activation['message'], 'success' );
			} else {
				$new_settings['license_key'] = '';
				$mlwQuizMasterNext->alertManager->newAlert( $activation['message'], 'error' );
			}
			// If previous license key was entered.
			$deactivation = QSM_license::deactivate( $license, 'serene' );
		}
		update_option( 'qsm_addon_theme_serene_settings', $new_settings );
		$mlwQuizMasterNext->alertManager->newAlert( 'Your settings has been saved successfully!', 'success' );
	}
	// Load settings.
	$settings_data = wp_parse_args( get_option( 'qsm_addon_theme_serene_settings', array() ), array(
		'license_key' => '',
		)
	);
	// Show any alerts from saving
	$mlwQuizMasterNext->alertManager->showAlerts();
	?>
	<form action="" method="post">
		<table class="form-table" style="width: 100%;">
			<tr valign="top">
				<th scope="row"><label for="license_key"><?php _e( 'Addon License Key', 'qsm-theme-serene' ); ?></label></th>
				<td><input type="text" name="license_key" id="license_key" value="<?php echo $settings_data['license_key']; ?>"></td>
			</tr>
		</table>
		<?php wp_nonce_field( 'theme_serene', 'theme_serene_nonce' ); ?>
		<button class="button-primary"><?php _e( 'Save Changes', 'qsm-theme-serene' ); ?></button>
	</form>
	<?php
}
