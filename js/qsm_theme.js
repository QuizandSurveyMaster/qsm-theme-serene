let quiz_time = 0;
start_quiz = 0;
quiz_id = 0;
logic_enabled = true;
no_featured_image = false;

jQuery(document).ready(function () {

	if (typeof qmn_quiz_data_new !== 'undefined') {
		jQuery.each(qmn_quiz_data_new, function (quiz_id, data) {
			if (data.length > 0) {
				logic_enabled = true;
			}
		})
	}
	jQuery('.quiz_theme_qsm-theme-serene').each(function () {
		var quiz_id = jQuery(this).find('.qmn_quiz_id').val();
		if (!qmn_quiz_data[quiz_id].hasOwnProperty('pagination') && Object.keys(qmn_quiz_data[quiz_id].qpages).length == 1) {
			addHeader(quiz_id);
		}
	});

	jQuery('.ui-slider-handle.ui-state-default ').css('left', '50%');
	jQuery('.qsm_total_questions').html('<span class="que-number">' + jQuery('#total_questions').val() + '</span>' + '<span class="que-text"> Questions</span>');
	if (typeof qsm_theme_serene_object.featured_image !== 'undefined' && qsm_theme_serene_object.featured_image.trim().length > 0) {
		jQuery('.quiz_theme_qsm-theme-serene.qsm_auto_pagination_enabled').css('background-image', 'url(' + qsm_theme_serene_object.featured_image + ')').css('background-size', 'cover');
		jQuery('.quiz_theme_qsm-theme-serene:not(.qsm_auto_pagination_enabled) .quiz_section.quiz_begin').prepend('<img src=' + qsm_theme_serene_object.featured_image + '>');
	} else {
		no_featured_image = true;
	}

	jQuery('.quiz_theme_qsm-theme-serene:is(.qsm_auto_pagination_enabled) .qsm-auto-page-row.quiz_begin,.quiz_theme_qsm-theme-serene:not(.random) .qsm-auto-page-row.quiz_begin').last().append(`

		<div class='qsm-svg-holder'><svg id="svg-3" viewBox="0 0 790 239" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M790 72.5001V239H0.0661621V10.5001C0.0661621 10.5001 72.5 -17.2314 196 20.0002C319.5 57.2317 597 155.47 686 128.5C775 101.53 790 72.5001 790 72.5001Z" fill="url(#paint0_linear)"/>
			<defs>
			<linearGradient id="paint0_linear" x1="395.033" y1="-81.5373" x2="395.033" y2="185.078" gradientUnits="userSpaceOnUse">
			<stop stop-color="#229ACD" stop-opacity="0"/>
			<stop offset="0.53125" stop-color="#229ACD" stop-opacity="0.78"/>
			<stop offset="1" stop-color="#229ACD"/>
			</linearGradient>
			</defs>
			</svg>
			<svg id="svg-4" viewBox="0 0 790 69" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 0H790V39C790 55.5685 776.569 69 760 69H30C13.4314 69 0 55.5685 0 39V0Z" fill="#229ACD"/>
			</svg>
		</div>
		`);

	jQuery('.quiz_theme_qsm-theme-serene:not(.qsm_auto_pagination_enabled)').append(`<div class='qsm-svg-holder'>
			<svg id="svg-1" viewBox="0 0 791 175" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M790.003 12.3409V174.571H0.0699463V36.3009C0.0699463 36.3009 50 105.186 201.5 115.169C353 125.153 488 37.8872 601.5 12.3407C715 -13.2057 790.003 12.3409 790.003 12.3409Z" fill="#229ACD"/>
			</svg>
			<svg id="svg-2" viewBox="0 0 791 43" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.00280762 0.0715332H790.003V13C790.003 29.5685 776.571 43 760.003 43H30.0028C13.4342 43 0.00280762 29.5685 0.00280762 12.9999V0.0715332Z" fill="#229ACD" />
			</svg></div>
			`);

	jQuery('.quiz_theme_qsm-theme-serene .qsm-auto-page-row:not(.quiz_begin)').append(`<div class='qsm-svg-holder'>
			<svg id="svg-1" viewBox="0 0 791 175" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M790.003 12.3409V174.571H0.0699463V36.3009C0.0699463 36.3009 50 105.186 201.5 115.169C353 125.153 488 37.8872 601.5 12.3407C715 -13.2057 790.003 12.3409 790.003 12.3409Z" fill="#229ACD"/>
			</svg>
			<svg id="svg-2" viewBox="0 0 791 43" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.00280762 0.0715332H790.003V13C790.003 29.5685 776.571 43 760.003 43H30.0028C13.4342 43 0.00280762 29.5685 0.00280762 12.9999V0.0715332Z" fill="#229ACD" />
			</svg></div>
			`);
	jQuery('.quiz_theme_qsm-theme-serene.qsm-quiz-container:not(.qsm_auto_pagination_enabled)').append(`<div class='qsm-svg-holder'>
			<svg id="svg-6" viewBox="0 0 791 175" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M790.003 12.3409V174.571H0.0699463V36.3009C0.0699463 36.3009 50 105.186 201.5 115.169C353 125.153 488 37.8872 601.5 12.3407C715 -13.2057 790.003 12.3409 790.003 12.3409Z" fill="#229ACD"/>
			</svg>

			`);

	if (parseInt(qsm_theme_serene_object.randomness_order) != 0 && jQuery('.quiz_theme_qsm-theme-serene').find('.qsm-apc-1').length == 0) {
		jQuery('.quiz_theme_qsm-theme-serene').addClass('qsm_random_quiz');
	}

	if (jQuery('.quiz_theme_qsm-theme-serene').find('.qsm-page-1').length || jQuery('.quiz_theme_qsm-theme-serene').find('.qsm-auto-page-row').length) {
		check_pagination = setInterval(function () {
			if (jQuery('.quiz_theme_qsm-theme-serene .qmn_pagination').length > 0) {
				clearInterval(check_pagination);
			}
		}, 10);
		if (no_featured_image) {
			if (!jQuery('.quiz_theme_qsm-theme-serene').hasClass('qsm_random_quiz')) {
				jQuery('.quiz_theme_qsm-theme-serene').find('.quiz_begin').css({
					position: 'relative',
					bottom: '0px'
				});
			}
		}
	}

	jQuery('.quiz_theme_qsm-theme-serene .qsm-welcome-screen .qsm-message-before-footer .mlw_next, .quiz_theme_qsm-theme-serene .qsm-auto-page-row .qsm-message-before-footer .mlw_next').click(function () {
		jQuery(this).parents('.quiz_theme_qsm-theme-serene').find('.qsm-serene-featured-image').hide();
		jQuery(this).parents('.quiz_theme_qsm-theme-serene').find('.qmn_pagination').show();
		jQuery('.quiz_theme_qsm-theme-serene.qsm_auto_pagination_enabled').css('background-image', 'none');;
	});

	if (jQuery('.quiz_theme_qsm-theme-serene').find('.qsm-page-1').length) {
		jQuery('.quiz_theme_qsm-theme-serene').find('.quiz_begin').addClass('qsm-welcome-screen');
	}

	jQuery('.quiz_theme_qsm-theme-serene .mlw_answer_file_upload').each(function () {
		fileUpload = '<div class="serene-file-upload-container">' +
			'<span class="dashicons dashicons-cloud-upload serene-file-upload-logo"></span>' +
			'<div class="serene-file-upload-message"> Drag and Drop File Here or <a class="serene-file-upload-link" href="#">Browse </a>' +
			'</div>' +
			'<div class="serene-file-upload-name"></div>' +
			'<div class="serene-file-upload-error"></div>' +
			'</div>' +
			'</div>';
		jQuery(fileUpload).insertAfter(jQuery(this));
	});

	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on('click', function (e) {
		e.preventDefault();
		jQuery(this).prev('.mlw_answer_file_upload').trigger('click');
	});

	jQuery('.mlw_answer_file_upload').on('change', function () {
		jQuery(this).next('.serene-file-upload-container').find('.serene-file-upload-name').html(jQuery(this)[0].files[0].name);
		jQuery(this).next('.serene-file-upload-container').find('.serene-file-upload-error').html('Uploading...').show();
	});

	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on(
		'dragover',
		function (e) {
			e.preventDefault();
			e.stopPropagation();
			jQuery(this).addClass('file-hover');
		}
	)
	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on(
		'dragenter',
		function (e) {
			e.preventDefault();
			e.stopPropagation();
		}
	)
	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on(
		'dragleave',
		function (e) {
			e.preventDefault();
			e.stopPropagation();
			jQuery(this).removeClass('file-hover');
		}
	)
	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on(
		'drop',
		function (e) {
			jQuery(this).removeClass('file-hover');
			jQuery(this).find('.serene-file-upload-name').html(e.originalEvent.dataTransfer.files[0].name).fadeIn();
			// jQuery(this).find('.serene-file-upload-error').fadeOut();
			if (e.originalEvent.dataTransfer) {
				if (e.originalEvent.dataTransfer.files.length) {
					e.preventDefault();
					e.stopPropagation();
					jQuery(this).prev('.mlw_answer_file_upload').prop('files', e.originalEvent.dataTransfer.files);
					jQuery(this).prev('.mlw_answer_file_upload').trigger('change');
				}
			}
		}
	);
	jQuery('.quiz_theme_qsm-theme-serene .serene-file-upload-container').on('mouseleave', function () {
		jQuery(this).removeClass('file-hover');
	});

	sereneQuizSetup();
	checkHeightForHorizontalElements();

	jQuery(document).on('qsm_next_button_click_after qsm_previous_button_click_after', function(event, quiz_id){
		if( jQuery( '.quiz_theme_qsm-theme-serene .quiz_begin').is(':visible') ){
			jQuery('.quiz_theme_qsm-theme-serene.qsm_auto_pagination_enabled').css('background-image', 'url(' + qsm_theme_serene_object.featured_image + ')').css('background-size', 'cover');
		}else{
			jQuery('.quiz_theme_qsm-theme-serene.qsm_auto_pagination_enabled').css('background-image', 'none');;
		}
	});

	// Next page
	jQuery(document).on('qsm_next_button_click_after', function(event, quiz_id){
		current = jQuery('.current_page_hidden').val();
		if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
			total = jQuery('.total_pages_hidden').val();
			if (qmn_quiz_data[quiz_id].disable_first_page == 1) {
				if (3 == current) {
					if (jQuery('.qsm-serene-section-info').length == 0) {
						addHeader(quiz_id);

					}
				}
			} else {
				if (2 == current) {
					if (jQuery('.qsm-serene-section-info').length == 0) {
						addHeader(quiz_id);

					}
				}
			}
		} else {
			total = Object.keys(qmn_quiz_data[quiz_id].qpages).length;
			if (1 == qmn_quiz_data[quiz_id].contact_info_location) {
				total++;
			}
			if (1 == current) {
				if (jQuery('.qsm-serene-section-info').length == 0) {
					addHeader(quiz_id);
				}
			}
		}

		checkProgressBar(current, total, quiz_id);
		updateTitle(quiz_id);

		if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
			if(qmn_quiz_data[quiz_id].hasOwnProperty('first_page') && qmn_quiz_data[quiz_id].first_page){
				if (qmn_quiz_data[quiz_id].hasOwnProperty('advanced_timer') && qmn_quiz_data[quiz_id].hasOwnProperty('timer_limit_val') && qmn_quiz_data[quiz_id].timer_limit_val > 0 ) {
					var start_timer = parseInt(qmn_quiz_data[quiz_id].advanced_timer.start_timer_page);
					if(jQuery('#quizForm' + quiz_id).closest('.qmn_quiz_container').find('.qmn_pagination > .slide_number_hidden').length > 0) {
						if (jQuery('#quizForm' + quiz_id).closest('.qmn_quiz_container').find('.qmn_pagination > .slide_number_hidden').val() == start_timer && 'right_bottom_timer' === qmn_quiz_data[quiz_id].advanced_timer.timer_design ) {
							initTimer(quiz_id);
						}
					}
				}
			}
		}

		if (!qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
			if(qmn_quiz_data[quiz_id].hasOwnProperty('first_page') && qmn_quiz_data[quiz_id].first_page){
				if (qmn_quiz_data[quiz_id].hasOwnProperty('advanced_timer') && qmn_quiz_data[quiz_id].hasOwnProperty('timer_limit_val') && qmn_quiz_data[quiz_id].timer_limit_val > 0 ) {
					var start_timer = parseInt(qmn_quiz_data[quiz_id].advanced_timer.start_timer_page);
					if(jQuery('#quizForm' + quiz_id).closest('.qmn_quiz_container').find('.qmn_pagination > .current_page_hidden').length > 0) {
						if (jQuery('#quizForm' + quiz_id).closest('.qmn_quiz_container').find('.qmn_pagination > .current_page_hidden').val() == start_timer && 'right_bottom_timer' === qmn_quiz_data[quiz_id].advanced_timer.timer_design  ) {
							initTimer(quiz_id);
						}
					}
				}

			}
		}

	});

	// Previews page
	jQuery(document).on('qsm_previous_button_click_after', function (event, quiz_id) {
		current = jQuery('.current_page_hidden').val();
		if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
			total = jQuery('.total_pages_hidden').val();
			if (1 == current) {
				jQuery('.quiz_theme_qsm-theme-serene .qsm_theme_serene_header').remove();
			}
		} else {
			total = Object.keys(qmn_quiz_data[quiz_id].qpages).length;
			if (1 == qmn_quiz_data[quiz_id].contact_info_location) {
				total++;
			}
			if (0 == current) {
				jQuery('.quiz_theme_qsm-theme-serene .qsm_theme_serene_header').remove();
			}
		}
		checkProgressBar(current, total, quiz_id);
		updateTitle(quiz_id);
	});

	jQuery(document).on('qsm_after_file_upload', function (e, container, response) {
		container.find('.serene-file-upload-error').html(response.message).fadeIn();
		container.find('.mlw_file_upload_hidden_value').val(response.file_url);
	})
});

function addHeader(quiz_id) {

	header ="<div class='qsm_theme_serene_header'>" +
				"<div class='serene_header_content'>"+
					"<span class='serene-title'></span>"+
				"</div>"+
			"</div>";
	if (0 == jQuery('.qsm_theme_serene_header').length) {
		jQuery(header).insertAfter('#mlw_top_of_quiz');
	}

	initProgressbar(quiz_id);

	if (0 == jQuery('.qsm-theme-serene-submit-btn').length) {
		sereneSubmit = "<a class='qmn_btn mlw_qmn_quiz_link qsm-theme-serene-submit-btn' href='#' style='display:none;'>Submit</a>";
		jQuery('.quiz_theme_qsm-theme-serene .qmn_pagination').append(sereneSubmit);
	}

	if(qmn_quiz_data[quiz_id].hasOwnProperty('first_page') && qmn_quiz_data[quiz_id].first_page == false && qmn_quiz_data[quiz_id].hasOwnProperty('advanced_timer') && qmn_quiz_data[quiz_id].hasOwnProperty('timer_limit_val') && qmn_quiz_data[quiz_id].timer_limit_val > 0 ) {
		initTimer(quiz_id);
	}

}

function sereneQuizSetup() {
	jQuery('.quiz_theme_qsm-theme-serene .mlw_qmn_question_number').each(function () {
		if (jQuery(this).next().hasClass('qsm-featured-image')) {
			number = jQuery(this);
			jQuery(number).insertAfter(jQuery(this).next());
		}
	});
}

function checkHeightForHorizontalElements() {
	childCount = 0;
	e1 = e2 = {};
	jQuery('.quiz_theme_qsm-theme-serene .qmn_radio_answers .mlw_horizontal_choice, .quiz_theme_qsm-theme-serene .qmn_check_answers .mlw_horizontal_multiple').each(function () {
		childCount++
		if (childCount % 2 == 0) {
			e2 = jQuery(this);
			if (e2.height() > e1.height()) {
				e1.height(e2.height());
			} else {
				e2.height(e1.height());
			}
			e1 = e2 = {};
		} else {
			e1 = jQuery(this);
		}
	});
}

function checkProgressBar(current, total, quiz_id) {
	if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
		current--;
		total--;
	}
	if (jQuery('#quizForm' + quiz_id).closest('.qmn_quiz_container').find('.empty_quiz_end').length) {
		total--;
	}
	width = parseInt(100 * (current / total));
	width += '%'
	jQuery('.serene_progress_bar .indicator').width(width);
	jQuery('.indicator_text').html(width);
}

function updateTitle(quiz_id) {
	if (qmn_quiz_data[quiz_id].hasOwnProperty('pagination')) {
		current = jQuery('.current_page_hidden').val();
		total = jQuery('.total_pages_hidden').val();
		// will be removed after modification in core
		if (current == total) {
			jQuery('.quiz_theme_qsm-theme-serene .serene-title').html('');
			return;
		}
		title = jQuery('.quiz_theme_qsm-theme-serene .pages_count').html();
		if (title !== undefined) {
			if (0 < title.length) {
				jQuery('.quiz_theme_qsm-theme-serene .serene-title').html('Page ' + title);
			} else {
				jQuery('.quiz_theme_qsm-theme-serene .serene-title').html('');
			}
		}

	} else {
		title = jQuery('.quiz_theme_qsm-theme-serene .qsm-page:visible .pages_count').html();
		if (title !== undefined) {
			jQuery('.quiz_theme_qsm-theme-serene .serene-title').html('Page ' + title);
		} else {
			jQuery('.quiz_theme_qsm-theme-serene .serene-title').html('');
		}
	}
}

function formatTimeLeft(quiz_id, time) {
	var time_label = '';
	var minutes = Math.floor(time / 60);
	var timer_limit_in_second = Math.floor(qmn_quiz_data[quiz_id].timer_limit_val * 60);
	if (60 <= minutes) {
		hours = Math.floor(minutes / 60);
		minutes = minutes % 60;
		time_label = hours + ':' + minutes.toString().padStart(2, '0');
		jQuery('.serene-timer_text_label').html('HOURS')
	} else if (minutes > 0) {
		seconds = time % 60;
		time_label = minutes + ':' + seconds.toString().padStart(2, '0');
		jQuery('.serene-timer_text_label').html('MINUTES')
	} else {
		time_label = time;
		jQuery('.serene-timer_text_label').html('SECONDS')
	}
	var strokeDashArray = Math.floor( time * 295 / timer_limit_in_second  ) + ' 295';
	jQuery('.base-timer_path-remaining').css('stroke-dasharray', strokeDashArray);

	if (minutes == 0) {
		changeColor(time);
	}

	return time_label;
}

function changeColor(time) {
	if (time > 30 && time <= 45) {
		jQuery('.base-timer_path-remaining').css('stroke', '#229ACD');
	} else if (time > 15 && time <= 30) {
		jQuery('.base-timer_path-remaining').css('stroke', '#FFB800');
	} else if (time <= 15) {
		jQuery('.base-timer_path-remaining').css('stroke', '#FF5555');
	} else {
		jQuery('.base-timer_path-remaining').css('stroke', '#1DD969');
	}
}

function startTimer(quiz_id, seconds) {

	if (start_quiz == 0) {
		timerInterval = setInterval(() => {
			seconds--;
			jQuery('.serene-timer_label').html(formatTimeLeft(quiz_id, seconds));
			if (seconds == 0) {
				clearInterval(timerInterval);
			}
		}, 1000);
	}
	start_quiz++;
}

function initTimer(quiz_id) {

	var timerStarted = localStorage.getItem('mlw_started_quiz' + quiz_id);
	var timerRemaning = localStorage.getItem('mlw_time_quiz' + quiz_id);
	if ('yes' == timerStarted && 0 < timerRemaning) {
		seconds = parseInt(timerRemaning);
	} else {
		seconds = parseFloat(qmn_quiz_data[quiz_id].timer_limit) * 60;
	}

	if (0 == start_quiz) {
		startTimer(quiz_id, seconds);
	}

	if (seconds == 0) {
		jQuery('.qsm-serene-timer').hide();
	} else if( !jQuery('.qsm-serene-section-info').length ) {
		jQuery('#mlw_qmn_timer').remove();
		timer = "<div class='qsm-serene-section-info'><span class='qsm-serene-timer'>" +
			"<div class='base-timer'>" +
			"<svg class='base-timer_svg' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>" +
			"<g class='base-timer_circle'>" +
			"<circle class='base-timer_path-elapsed' cx='50' cy='50' r='47' />" +
			"<circle class='base-timer_path-remaining' cx='50' cy='50' r='47' />" +
			"</g>" +
			"</svg>" +
			"<span class='serene-timer_label'>Timer" +
			"</span>" +
			"</div>" +
			"<span class='serene-timer_text_label'>" +
			"</span>" +
			"</span></div>";
		  jQuery(timer).insertBefore(jQuery('.qsm_theme_serene_header'));
	}
}

function initProgressbar(quiz_id) {
	if_progress_bar = qmn_quiz_data[quiz_id]['progress_bar'];
	if (0 < if_progress_bar && 0 == jQuery('.serene_progress_bar').length) {
		jQuery('.qsm_theme_serene_header').fadeIn(500).css({
			'display': 'flex'
		});
		jQuery('.serene_header_content').append("<span class='indicator_text'></span><div class='serene_progress_bar'><span class='indicator'></span></div>");

	}

}