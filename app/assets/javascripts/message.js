$(function(){
   function buildHTML(message){

    if (message.image.url === null){
    var html = `<div class="chat__user">
                    <span style="font-size:16px; font-family:bold; color:#434A54";>${message.user_name}</span>
                    ${message.date}
                    </div>

                  <div class="chat__chat">

                   <p class="lower-message__content">
                  ${message.body}</p>

                  </div>
                  <div class="last"></div>`
                } else {
    var html = `<div class="chat__user">
                    <span style="font-size:16px; font-family:bold; color:#434A54";>${message.user_name}</span>
                    ${message.date}
                    </div>

                  <div class="chat__chat">

                   <p class="lower-message__content">
                  ${message.body}</p>
                  <img src="${message.image.url}" class="lower-message__image">
                  </div>
                  <div class="last"></div>`}


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
      $('.form__message').val('')
      $('.hidden').val("")

      var message = $('.chat__wrapper')[0].scrollHeight

    $('.chat__wrapper').animate({scrollTop: message});

    })

    .fail(function(){
      alert('error');
    })
  })
})
