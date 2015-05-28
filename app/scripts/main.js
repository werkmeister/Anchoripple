'use strict';

function navResize(offset, flip) {
  var height = 200 - (offset);
  var imgWidth = 264 - (offset * 1.75);
  var margin = -132 + (offset * 0.875);
  var top = 80 - (offset * 0.4);

  $('.header.full').css({
    'height': height + 'px',
  });
  $('.header.full ul').css('top', top + 'px');
  $('.header-img').css({
    'margin-left': margin,
    'width': imgWidth
  });

  $('.header-img').toggleClass('rotate', flip);
}

function headerScroll() {
  var offset = window.pageYOffset;

  if (offset < 135) {
    navResize(offset, false);
  } else {
    offset = 134;
    navResize(offset, true);
  }
}

$('.fa-bars').on('click', function() {
  $('.header.small').toggleClass('open');
  $('.header.small ul').toggleClass('hidden');
});

window.onload = headerScroll();

$(window).on('scroll', function() {
  headerScroll();
});

/************
// FOLD PANEL : AUTHOR Sebastiano Guerriero http://codyhouse.co/gem/3d-folding-panel/
************/
function viewportSize() {
  return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/\'/g, '');
}
function toggleContent(url, bool) {
  if ( bool ) {
    /* load and show new content */
    var foldingContent = $('.cd-fold-content');

    foldingContent.load(url + ' .cd-fold-content > *', function() {
      setTimeout(function() {
        $('body').addClass('overflow-hidden');
        $('.cd-folding-panel').addClass('is-open');
        $('.cd-main').addClass('fold-is-open');
      }, 100);

    });
  } else {
    var mq = viewportSize();
    $('.cd-folding-panel').removeClass('is-open');
    $('.cd-main').removeClass('fold-is-open');

    (mq === 'mobile' || $('.no-csstransitions').length > 0) ? $('body').removeClass('overflow-hidden') :
      $('.cd-main').find('.cd-item').eq(0)
        .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          $('body').removeClass('overflow-hidden');
          $('.cd-main').find('.cd-item').eq(0)
            .off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      });// jshint ignore: line
  }
}
function openItemInfo(url) {
  if ( $('.cd-gallery').offset().top > $(window).scrollTop() ) {
    $('body,html').animate({
      'scrollTop': $('.cd-gallery').offset().top
    }, 100, function() {
      toggleContent(url, true);
    });

  } else {
    toggleContent(url, true);
  }
}
$('.cd-gallery a').on('click', function(event) {
  event.preventDefault();
  openItemInfo($(this).attr('href'));
});

$('.cd-folding-panel .cd-close').on('click', function(event) {
  event.preventDefault();
  toggleContent('', false);
});

$('.cd-gallery').on('click', function(event) {
  if ( $(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) {
    toggleContent('', false);
  }
});

/********
 INPUTS : AUTHOR bonzo https://github.com/ded/bonzo; crnacura https://github.com/codrops/TextInputEffects
*********/
function classReg(className) {
  return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
}

var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
  hasClass = function(elem, c) {
    return elem.classList.contains(c);
  };
  addClass = function(elem, c) {
    elem.classList.add(c);
  };
  removeClass = function(elem, c) {
    elem.classList.remove(c);
  };
} else {
  hasClass = function(elem, c) {
    return classReg(c).test(elem.className);
  };
  addClass = function(elem, c) {
    if (!hasClass(elem, c)) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function(elem, c) {
    elem.className = elem.className.replace(classReg(c), ' ');
  };
}

function toggleClass(elem, c) {
  var fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

var define;
// transport
if (typeof define === 'function' && define.amd) {
  // AMD
  define(classie);
} else {
  // browser global
  window.classie = classie;
}
