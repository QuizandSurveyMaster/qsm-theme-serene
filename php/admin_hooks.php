<?php 
if(!class_exists('Qsm_Quiz_Theme_Style_5_Manager'))
{
	class Qsm_Quiz_Theme_Style_5_Manager
	{
		public function __construct()
		{
			add_filter('qsm_text_allowed_variables', array($this,'qsm_theme_quiz_serene_text_variable'), 999, 2);
			add_filter( 'mlw_qmn_template_variable_quiz_page', array($this,'mlw_qmn_variable_quiz_total'), 10, 2 );
			add_filter( 'qsm_drip_content', array($this,'qsm_drip_content'), 10, 1 );
		}
		public function qsm_drip_content($content)
		{
			return '<div class="qsm_contact_div qsm-contact-type-checkbox"><span class="qsm_drip_checkbox_span">'.$content.'</span></div>';
		}
		function mlw_qmn_variable_quiz_total($content, $mlw_quiz_array)
		{
			$content = str_replace( '%TOTAL_QUESTIONS%','<div class="qsm_total_questions"><span ></span></div>', $content );
			return $content;
		}
		function qsm_theme_quiz_serene_text_variable($quiz_text_arr, $key)
		{
	
			if($key == 0)
			{
				array_push($quiz_text_arr, '%TOTAL_QUESTIONS%');	
			}

			return $quiz_text_arr;
		}
	}	
	new Qsm_Quiz_Theme_Style_5_Manager;
}