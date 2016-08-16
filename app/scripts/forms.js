var form = $('#ajax-contact');

$(form).submit(function(e) {
  e.preventDefault();

  var formData = $(form).serialize();

  $('.formfield').removeClass('error');

  $.ajax({
    type: 'POST',
    url: $(form).attr('action'),
    data: formData
  })
  .done(function() {
    $('.formfield').val('');

    $(form).toggleClass('hidden');
    $('.thankyoumessage').toggleClass('hidden');
  })
  .fail(function(data) {
    $.each(JSON.parse(data.responseText), function( idx, element ) {
      $('#' + element).addClass('error');
    });
  });
});
