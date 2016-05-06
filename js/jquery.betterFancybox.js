/*!
 * betterFancybox - jQuery Plugin
 * @requires jQuery v1.6 or later
 * @requires fancyBox v2.1.5 or later
 *
 */
(function ($, window, document, undefined) { 'use strict'; $(function () {

  if ( !jQuery().fancybox ) {
    return;
  }

  $.betterFancybox = (function () {

    var init = function () {
      addStyles();
      bindCloseElements();
      bindDeepLink();
      deepLink();
    }

    var attach = function ( element, customOptions ) {
      customOptions = typeof customOptions !== 'undefined' ? customOptions : {};

      var config = {
        title: function() {
          var options = getInlineOptions( this[0] );

          var title = ( options.title ? options.title : customOptions.title );

          return title;
        },

        closeBtn: false,

        beforeShow: function() {
          var options = getInlineOptions( this.element[0] );

          beforeShow( this, options, customOptions );
        },

        afterShow: function() {
          var options = getInlineOptions( this.element[0] );

          afterShow( this, options, customOptions );
        }
      };

      $(element).fancybox( config );
    }

    var open = function ( element, customOptions ) {
      customOptions = typeof customOptions !== 'undefined' ? customOptions : {};

      var options = element;

      if( element.nodeType ) {
        options = getInlineOptions( element );
      }

      var config = {
        href: ( customOptions.href ? customOptions.href : null ),
        type: ( customOptions.type ? customOptions.type : null ),
        content: ( customOptions.content ? customOptions.content : null ),
        title: ( customOptions.title ? customOptions.title : null ),

        closeBtn: false,

        beforeShow: function() {
          beforeShow( this, options, customOptions );
        },

        afterShow: function() {
          afterShow( this, options, customOptions );
        }
      };

      if( customOptions.ajax ) config.ajax = customOptions.ajax;
      if( customOptions.iframe ) config.iframe = customOptions.iframe;
      if( customOptions.helpers ) config.helpers = customOptions.helpers;

      if( options.href ) config.href = options.href;
      if( options.type ) config.type = options.type;
      if( options.content ) config.content = options.content;
      if( options.title ) config.title = options.title;

      if( $(config.href).length && $(config.href)[0].tagName.toLowerCase() == 'script' ) {
        var attrs = {};

        $.each($(config.href)[0].attributes, function(idx, attr) {
          attrs[attr.nodeName] = attr.nodeValue;
        });

        $(config.href).replaceWith(function () {
          return $('<div />', attrs).append( $(this).html() );
        });

        $(config.href).hide();
      }

      $.fancybox.open( config );
    }

    var beforeShow = function ( fancybox, options, customOptions ) {
      customOptions = typeof customOptions !== 'undefined' ? customOptions : {};

      fancybox.overlay = $('.fancybox-overlay');

      fancybox.inner.wrapInner('<div class="better-fancybox-inner-inner fancybox-inner-inner"></div>');
      fancybox.innerInner = fancybox.wrap.find('.fancybox-inner-inner');

      fancybox.wrap.addClass('better-fancybox');
      fancybox.skin.addClass('better-fancybox-skin');
      fancybox.outer.addClass('better-fancybox-outer');
      fancybox.inner.addClass('better-fancybox-inner');
      fancybox.overlay.addClass('better-fancybox-overlay');

      if( customOptions.class ) fancybox.wrap.addClass( customOptions.class );
      if( customOptions.skinClass ) fancybox.skin.addClass( customOptions.skinClass );
      if( customOptions.outerClass ) fancybox.outer.addClass( customOptions.outerClass );
      if( customOptions.innerClass ) fancybox.inner.addClass( customOptions.innerClass );
      if( customOptions.innerInnerClass ) fancybox.innerInner.addClass( customOptions.innerInnerClass );
      if( customOptions.overlayClass ) fancybox.overlay.addClass( customOptions.overlayClass );

      if( options.class ) fancybox.wrap.addClass( options.class );
      if( options.skinClass ) fancybox.skin.addClass( options.skinClass );
      if( options.outerClass ) fancybox.outer.addClass( options.outerClass );
      if( options.innerClass ) fancybox.inner.addClass( options.innerClass );
      if( options.innerInnerClass ) fancybox.innerInner.addClass( options.innerInnerClass );
      if( options.overlayClass ) fancybox.overlay.addClass( options.overlayClass );

      var close = false;
      var closeBtn = ('closeBtn' in options) ? options.closeBtn : customOptions.closeBtn;

      if( closeBtn !== false ) {
        if( $('.js-fancybox-close').length ) {
          close = $('.js-fancybox-close').html();
        }

        if( $(closeBtn).length ) {
          close = $(closeBtn).html();
        }
      }

      if( close ) {
        fancybox.inner.prepend( close );
      }

      $('.js-fancybox-close-btn').addClass('better-fancybox-close');

      if( customOptions.beforeShow ) {
        customOptions.beforeShow.apply(fancybox);
      }
    }

    var afterShow = function ( fancybox, options, customOptions ) {
      customOptions = typeof customOptions !== 'undefined' ? customOptions : {};

      fancybox.wrap.find('.fancybox-nav').appendTo(fancybox.inner);

      fancybox.wrap.find('.fancybox-title').appendTo(fancybox.inner);

      if( customOptions.titleClass ) fancybox.wrap.find('.fancybox-title').addClass( customOptions.titleClass );

      if( options.titleClass ) fancybox.wrap.find('.fancybox-title').addClass( options.titleClass );

      if( customOptions.afterShow ) {
        customOptions.afterShow.apply(fancybox);
      }
    }

    var getInlineOptions = function ( element ) {
      var options = element.getAttribute('data-options'),
          options = (options) ? JSON.parse(options) : {};

      return options;
    }

    var addStyles = function () {
      var css = [
        '.better-fancybox {',
          'width: auto !important;',
          'height: auto !important;',
          'position: fixed !important;',
          'top: 0 !important;',
          'left: 0 !important;',
          'right: 0 !important;',
          'bottom: 0 !important;',
        '}',

        '.better-fancybox-skin {',
          'display: table !important;',
          'width: 100% !important;',
          'height: 100% !important;',
          'padding: 0 !important;',
          'background: transparent !important;',
          'color: inherit !important;',
          'border-radius: 0 !important;',
          '-webkit-box-shadow: none !important;',
          'box-shadow: none !important;',
        '}',

        '.better-fancybox-outer {',
          'display: table-cell !important;',
          'vertical-align: middle !important;',
        '}',

        '.better-fancybox-inner {',
          'width: auto !important;',
          'height: auto !important;',
          'margin: 0 auto !important;',
          'overflow: visible !important;',
          '-webkit-overflow-scrolling: auto !important;',
        '}',

        '.better-fancybox-inner-inner {',
          'position: relative !important;',
          'overflow: auto !important;',
          '-webkit-overflow-scrolling: touch !important;',
        '}',

        '.better-fancybox-close {',
          'z-index: 9999 !important;',
        '}',

        '.better-fancybox-overlay {',
          'overflow: hidden !important;',
        '}'
      ].join('');

      var head = document.head || document.getElementsByTagName('head')[0];

      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style>' + css + '</style>';
      head.appendChild( div.childNodes[1] );
    }

    var bindCloseElements = function () {
      $(document).on('click', '.js-fancybox-close-btn', function() {
        $.fancybox.close();
        return false;
      });

      $(document).on('click', '.fancybox-outer', function(e) {
        if( e.target != this ) return;
        $.fancybox.close();
      });
    }

    var bindDeepLink = function () {
      $(window).on('hashchange',function(){
        deepLink( window.location.hash );
      });
    }

    var deepLink = function (hash) {
      hash = typeof hash !== 'undefined' ? hash : window.location.hash;

      if( ! hash || ! $(hash).length ) {
        return;
      }

      var options = getInlineOptions( $(hash)[0] );

      if( options.deepLink ) {
        setTimeout(function() {
          $(hash).trigger('click');
        });
      }
    }

    return {
      init: init,
      attach: attach,
      open: open
    };

  })();

  $.betterFancybox.init();

}); })(jQuery, window, document);