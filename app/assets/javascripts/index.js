$(document).on('turbolinks:load',function() {
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
   $("#user-search-result").append(html);
  }

   function appendErrMsgToHTML(msg) {
    var html = `<p class="chat-group-user__name">${ msg }</p>`
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var group_id =$(".chat__group_id").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input ,group_id: group_id},
      dataType: 'json'
    })

    .done(function(users) {
       $("#user-search-result").empty();
       if (users.length !== 0) {
         users.forEach(function(user){
           appendUser(user);
         });
       }
       else {
         appendErrMsgToHTML();
       }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    })
  });

  $(document).on("click", ".user-search-add", function() {
    $(this).parent().remove();
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
               <input name='group[user_ids][]' type='hidden' value=`+$(this).data('user-id')+`>
                <p class='chat-group-user__name'>`+$(this).data('user-name')+`</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    $("#chat-group-users").append(html);

    var group_id =$(".chat__group_id").val();

    $.ajax({
      type: 'PATCH',
      url: "/groups/"+group_id,
      data: { group_id: group_id ,user_id: $(this).data('user-id')},
      dataType: 'json'
    })
  });

  $(document).on("click", ".user-search-remove", function() {
    var user_id =$(this).siblings('input');
    var user_id =$(user_id[0]).val()

    $(this).parent().remove();

    var group_id =$(".chat__group_id").val();

    $.ajax({
      type: 'DELETE',
      url: "/groups/"+group_id,
      data: { group_id: group_id ,user_id:user_id},
      dataType: 'json'
    })
  });
});
