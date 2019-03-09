$(function(){
   function buildHTML(message){
    var kari = `<div class="chat__user"><span style="font-size:16px; font-family:bold; color:#434A54";>
                ${message.user_name}</span>
                ${message.date}
                </div>
                <div class="chat__chat">
               <p class="lower-message__content">
                ${message.body}</p>`

    if (message.image.url !== null){
      var kari = `${kari}<img src="${message.image.url}" class="lower-message__image">`
    }

    var html =`${kari}</div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.chat__wrapper').append(html)
      $('.new_message')[0].reset()

      var message = $('.chat__wrapper')[0].scrollHeight
      $('.chat__wrapper').animate({scrollTop: message});
    })

    .fail(function(){
      alert('error');
    })
  })
})
