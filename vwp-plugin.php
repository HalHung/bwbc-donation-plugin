<?php
/**
 * @wordpress-plugin
 * Plugin Name:       籌備處捐款外掛
 * Plugin URI:        https://luciditv.com
 * Description:       籌備處捐款外掛
 * Version:           1.0.24
 * Author:            澈見國際資訊
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}
if (!class_exists('VwpPlugin')) {
    class VwpPlugin
    {
        public $plugin;

        public function __construct()
        {
            $this->plugin = plugin_basename(__FILE__);
        }

        public function register()
        {
            add_action('admin_menu', array($this, 'add_admin_page'));
            add_action('admin_enqueue_scripts', array($this, 'enqueue_assets'));
            add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
            add_filter("plugin_action_links_$this->plugin", array($this, 'settings_link'));
            add_action('wp_ajax_luciditv_submit_api_key', [$this, 'submit_api_key']);
            add_action('wp_ajax_nopriv_luciditv_get_api_key', [$this, 'get_api_key']);
            add_action('wp_ajax_luciditv_get_api_key', [$this, 'get_api_key']);
        }

        public function settings_link($links)
        {
            $settings_link = '<a href="admin.php?page=vwp_plugin">Settings</a>';
            array_push($links, $settings_link);
            return $links;
        }

        public function enqueue_assets()
        {
            wp_enqueue_style("$this->plugin-css", plugins_url('/public/styles.css', __FILE__));
            wp_enqueue_script("$this->plugin-js", plugins_url('/public/scripts.js', __FILE__), null, null, true);
        }

        public function add_admin_page()
        {
            add_menu_page("籌備處捐款外掛", '籌備處捐款外掛', 'manage_options', 'vwp_plugin', array($this, 'admin_index'), '');
        }

        public function admin_index()
        {
            require_once plugin_dir_path(__FILE__) . 'templates/admin/index.php';
        }

        public function submit_api_key()
        {
            $id = sanitize_title_with_dashes('api_key', '', 'save');
            $value = sanitize_text_field($_POST['api_key']);
            $option_name = 'luciditv-plugin_' . $id;
            update_option($option_name, $value);
            exit(json_encode(array('success' => true)));
        }

        public function get_api_key()
        {
            $id = sanitize_title_with_dashes('api_key', '', 'save');
            $option_name = 'luciditv-plugin_' . $id;
            $option_value = get_option($option_name, '');
            exit(json_encode(array('api_key' => $option_value)));
        }
    }
}

if (class_exists('VwpPlugin')) {
    $vwpPlugin = new VwpPlugin();
    $vwpPlugin->register();
}

// Activation
require_once plugin_dir_path(__FILE__) . 'inc/vwp-plugin-activate.php';
register_activation_hook(__FILE__, array('VwpPluginActivate', 'activate'));

// Deactivation
require_once plugin_dir_path(__FILE__) . 'inc/vwp-plugin-deactivate.php';
register_deactivation_hook(__FILE__, array('VwpPluginDeactivate', 'deactivate'));
