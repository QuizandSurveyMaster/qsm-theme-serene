<?php
add_action( 'qsm_enqueue_script_style', 'qsm_theme_quiz_serene_style' );
if ( ! function_exists( 'qsm_theme_quiz_serene_style' ) ) {
	/**
	 * QSM serene theme style
	 *
	 * @since 1.0.0
	 * @param object $qmn_quiz_options Quiz options.
	 * @return void
	 */
	function qsm_theme_quiz_serene_style( $qmn_quiz_options ) {
		global $mlwQuizMasterNext;
		$quiz_id              = $qmn_quiz_options->quiz_id;
		$featured_image       = get_option( "quiz_featured_image_$quiz_id" );
		$randomness_order     = $qmn_quiz_options->randomness_order;
		$saved_quiz_theme     = $mlwQuizMasterNext->theme_settings->get_active_quiz_theme_path( $quiz_id );
		$quiz_settings        = isset( $qmn_quiz_options->quiz_settings ) ? maybe_unserialize( $qmn_quiz_options->quiz_settings ) : array();
		$get_saved_quiz_theme = isset( $quiz_settings['quiz_new_theme'] ) ? $quiz_settings['quiz_new_theme'] : '';
		$progress_bar         = $qmn_quiz_options->progress_bar;
		$folder_slug          = QSM_THEME_SLUG . $saved_quiz_theme;

		wp_enqueue_script( 'qsm_theme_serene_js', QSM_THEME_SERENE_JS_URL . '/qsm_theme.js', array( 'jquery' ), QSM_THEME_SERENE_VERSION, true );
		wp_enqueue_style( 'qsm_theme_serene_css', QSM_THEME_SERENE_CSS_URL . '/style.css', array(), QSM_THEME_SERENE_VERSION );
		wp_enqueue_style( 'qsm_theme_serene_responsive_css', QSM_THEME_SERENE_CSS_URL . '/responsive.css', array(), QSM_THEME_SERENE_VERSION );
		wp_localize_script(
			'qsm_theme_serene_js',
			'qsm_theme_serene_object',
			array(
				'featured_image'   => $featured_image,
				'randomness_order' => $randomness_order,
			)
		);
		$theme_id           = $mlwQuizMasterNext->theme_settings->get_active_quiz_theme( $quiz_id );
		$get_theme_settings = $mlwQuizMasterNext->theme_settings->get_active_theme_settings( $quiz_id, $theme_id );
		$color_data         = array();
		foreach ( $get_theme_settings as $data ) {
			$color_data[ $data['id'] ] = $data['default'];
		}
		$get_theme_settings = $color_data;
		$css_root           = ':root {';
		if ( isset( $get_theme_settings['background_color'] ) && '' !== $get_theme_settings['background_color'] ) {
			$css_root .= '--background-color: ' . $get_theme_settings['background_color'] . ' !important;';
		}
		if ( isset( $get_theme_settings['primary_color'] ) && '' !== $get_theme_settings['primary_color'] ) {
			$css_root .= '--primary-color: ' . $get_theme_settings['primary_color'] . ' !important;';
		}
		if ( isset( $get_theme_settings['secondary_color'] ) && '' !== $get_theme_settings['secondary_color'] ) {
			$css_root .= '--secondary-color: ' . $get_theme_settings['secondary_color'] . ' !important;';
		}
		if ( isset( $get_theme_settings['title_color'] ) && '' !== $get_theme_settings['title_color'] ) {
			$css_root .= '--title-color: ' . $get_theme_settings['title_color'] . ' !important;';
		}
		if ( isset( $get_theme_settings['text_color'] ) && '' !== $get_theme_settings['text_color'] ) {
			$css_root .= '--text-color: ' . $get_theme_settings['text_color'] . ' !important;';
		}
		$css_root .= '}';
		if ( isset( $get_theme_settings['primary_color'] ) && '' !== $get_theme_settings['primary_color'] ) {
			$css_root .= '.qsm-svg-holder svg path {
				fill : ' . $get_theme_settings['primary_color'] . ';
			}';
		}
		wp_add_inline_style( 'qsm_theme_serene_css', $css_root );
	}
}

add_filter( 'qmn_begin_shortcode', 'serene_footer', 10, 3 );
if ( ! function_exists( 'serene_footer' ) ) {
	function serene_footer( $return_display, $qmn_quiz_options, $qmn_array_for_variables ) {
		global $mlwQuizMasterNext;
		$saved_quiz_theme = $mlwQuizMasterNext->quiz_settings->get_setting( 'quiz_new_theme' );
		$quiz_settings    = isset( $qmn_quiz_options->quiz_settings ) ? maybe_unserialize( $qmn_quiz_options->quiz_settings ) : array();
		return $return_display;
	}
}
