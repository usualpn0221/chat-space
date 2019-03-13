$(function(){
   function buildHTML(message){
    var kari = `<div class="chat__user" data-id="${message.id}"><span style="font-size:16px; font-family:bold; color:#434A54";>
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

  var log = function(){
    var url = $("#new_message").attr('action')
    if($('.chat__user')[0]){
      var message_id = $('.chat__user:last').data('id');
    } else {
      var message_id = 0
    }

    if (url !== undefined){
      $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        data: { message_id: message_id},
      })

      .done(function(messages) {
         if (messages.length !== 0) {
           messages.forEach(function(message){
            var html = buildHTML(message);
            $('.chat__wrapper').append(html)
           });
         }
      })

      .fail(function() {
        alert('メッセージ検索に失敗しました');
      })
    }
  };
  setInterval(log,5000);
})
