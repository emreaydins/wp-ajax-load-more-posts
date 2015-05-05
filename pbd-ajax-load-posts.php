<?php
/**
 * Plugin Name: PBD AJAX Load Posts
 * Plugin URI: http://www.problogdesign.com/
 * Description: Load the next page of posts with AJAX.
 * Version: 0.1
 * Author: Pro Blog Design
 * Author URI: http://www.problogdesign.com/
 * License: GPLv2
 */
 
/* Initialization. Add your script if needed on this page */

function pbd_alp_init() {
	global $wp_query;
	// Add code to index pages.
	
	// Queue JavaScript
	wp_enqueue_script(
		'pbd-alp-load-posts',
 		plugin_dir_url( __FILE__ ) . 'js/load-posts.js',
 		array('jquery'),
 		'1.0',
 		true
 	);
 	
 	// What page are we on and what is the pages limit?
 	$max = $wp_query->max_num_pages;
 	$paged = ( get_query_var('paged') > 1 ) ? get_query_var('paged') : 1;
 	
 	// Add some parameters for the JavaScript
 	wp_localize_script(
 		'pbd-alp-load-posts',
 		'pbd_alp',
 			array(
 				'startPage' => $paged,
 				'maxPages' => $max,
 				'nextLink' => next_posts($max, false)
 			)
 	);
 }
 
 add_action('template_redirect', 'pbd_alp_init');
 
 ?>