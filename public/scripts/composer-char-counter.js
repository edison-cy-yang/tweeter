$(document).ready(function() {
  const textarea = $('.new-tweet textarea');
  textarea.on('keyup', function(event) {
    const charactersLeft = 140 - $(this).val().length;
    $(this).siblings('.counter').html(charactersLeft);
    if (charactersLeft < 0) {
      $(this).siblings('.counter').css('color', 'red');
    } else {
      $(this).siblings('.counter').css('color', '#545149');
    }
  });
});