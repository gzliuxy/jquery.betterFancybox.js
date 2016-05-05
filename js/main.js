(function ($, window, document, undefined) { 'use strict'; $(function () {

  $.betterFancybox.attach('.js-better-fancybox');

  $('.js-better-fancybox-open').on('click', function() {
    $.betterFancybox.open(this);
    return false;
  });

}); })(jQuery, window, document);