<?php

/**
 * License Related Functions
 *
 * @author Awesome
 */
if ( ! class_exists( 'QSM_license' ) ) {

	class QSM_license {

		public function __construct() {

		}

		public static function activate( $license_key = '', $item_name = '' ) {
			$response = array(
				'status'  => 'error',
				'message' => __( 'Please try again!', 'qsm-theme-serene' ),
			);
			if ( ! empty( $license_key ) ) {
				$params              = array(
					'timeout'   => 15,
					'sslverify' => false,
					'body'      => array(
						'edd_action' => 'activate_license',
						'license'    => $license_key,
						'item_name'  => rawurlencode( $item_name ), /* The name of product in EDD. */
						'url'        => home_url(),
					),
				);
				$activation_response = wp_remote_post( 'http://quizandsurveymaster.com', $params );
				if ( ! empty( $activation_response ) ) {
					$body = json_decode( $activation_response['body'] );
					if ( $body->success ) {
						$response = array(
							'status'  => 'success',
							'message' => __( 'License validated Successfully', 'qsm-theme-serene' ),
						);
					} else {
						$error_message   = array(
							'missing'               => __( 'License doesn\'t exist', 'qsm-theme-serene' ),
							'missing_url'           => __( 'URL not provided', 'qsm-theme-serene' ),
							'license_not_activable' => __( 'Attempting to activate a bundle\'s parent license', 'qsm-theme-serene' ),
							'disabled'              => __( 'License key revoked', 'qsm-theme-serene' ),
							'no_activations_left'   => __( 'No activations left', 'qsm-theme-serene' ),
							'expired'               => __( 'License has expired', 'qsm-theme-serene' ),
							'key_mismatch'          => __( 'License is not valid for this product', 'qsm-theme-serene' ),
							'invalid_item_id'       => __( 'Invalid Item ID', 'qsm-theme-serene' ),
							'item_name_mismatch'    => __( 'License is not valid for this product', 'qsm-theme-serene' ),
						);
						$message         = __( 'Please try again!', 'qsm-theme-serene' );
						if ( ! empty( $body->error ) ) {
							$message = $error_message[ $body->error ];
						}
						$response = array(
							'status'  => 'error',
							'message' => $message,
						);
					}
				}
			}
			return $response;
		}

		public static function deactivate( $license_key = '', $item_name = '' ) {
			if ( ! empty( $license_key ) ) {
				$params      = array(
					'timeout'   => 15,
					'sslverify' => false,
					'body'      => array(
						'edd_action' => 'deactivate_license',
						'license'    => $license_key,
						'item_name'  => rawurlencode( $item_name ), /* The name of product in EDD. */
						'url'        => home_url(),
					),
				);
				$response    = wp_remote_post( 'http://quizandsurveymaster.com', $params );
			}
			return;
		}

	}

}
