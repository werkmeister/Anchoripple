// 'use strict';

function navResize( offset, flip ) {
  var height = 200 - (offset);
  var imgWidth = 264 - (offset * 1.75);
  var margin = -132 + (offset * 0.875);
  var top = 80 - (offset * 0.4);

    $('.header').css({
      'height': height + 'px',
    });
    $('.header ul').css('top', top + 'px');
    $('.header-img').css({
      'margin-left': margin,
      'width': imgWidth
    });

    $('.header-img').toggleClass('rotate', flip);
}

function headerScroll() {
  var offset = window.pageYOffset;

  if (offset < 135) {
    navResize( offset, false );
  } else {
    offset = 134;
    navResize( offset, true );
  }
}

function navigate() {
  // e.stopPropagation();
  // e.preventDefault();
  $('section').addClass('hidden');

  $('section.' + this.dataset.navigate).toggleClass('hidden');
}

$('a').on('click', navigate);

window.onload = headerScroll();

$(window).on('scroll', function() {
  headerScroll();
});
