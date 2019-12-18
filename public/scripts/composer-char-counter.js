$(document).ready(function() {
  const textarea = $('.new-tweet textarea');
  textarea.on('keyup', function(event) {
    const charactersLeft = 140 - $(this).val().length;
    $(this).siblings('.new-tweet-footer').find('.counter').html(charactersLeft);
    if (charactersLeft < 0) {
      $(this).siblings('.new-tweet-footer').find('.counter').css('color', 'red');
    } else {
      $(this).siblings('.new-tweet-footer').find('.counter').css('color', '#545149');
    }
  });
});