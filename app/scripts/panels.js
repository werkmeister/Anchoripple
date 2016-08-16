/**
 * FOLD PANEL
 * http://codyhouse.co/gem/3d-folding-panel/
 */

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
