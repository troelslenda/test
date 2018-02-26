var App = App || {};

/**
 * [description]
 * @return {[type]} [description]
 */
App.Demo = (function ($) {
    'use strict';

    // Selectors for DOM elements
    var selectors = {
        container: '.js-my-partial',
        link: '.js-my-partial-link'
    },

        // Class names to toggle with js
        classNames = {
            active: 'is-active'
        },

        // Store cached references to DOM elements
        // that will be used over and over again
        dom = {};

    /**
     * Initialize function
     * @return {void}
     */
    function initialize() {
        // Set up DOM and cache references
        _setupDOM();

        // Add event listeners
        _addEventListeners();
    }

    /**
     * Set up DOM (create?) elements and cache references for future use
     * @return {void}
     */
    function _setupDOM() {
        // Module element(s) for scoping
        dom.$container = $(selectors.container);
        dom.$el = $(selectors.element);
    }

    /**
     * Attach event listeners to DOM elements
     */
    function _addEventListeners() {
        dom.$window.on('click', _onLinkClick);
    }

    /**
     * Click event for module links
     * @return {void}
     */
    function _onLinkClick(event) {
        event.preventDefault();

        // Do something on click
    }


    ////////////////
    // Public API //
    ////////////////

    return {
        initialize: initialize
    };

})(jQuery);