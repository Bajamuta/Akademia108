<?php
/**
 * Twenty Seventeen Child functions and definitions
 *
 */

function get_parent_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
}
 
add_action('wp_enqueue_scripts', 'get_parent_styles');