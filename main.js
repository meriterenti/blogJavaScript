var root = 'https://jsonplaceholder.typicode.com';

let postAPIcall = $.ajax({
  url: root + '/posts',
  method: 'GET'
})
let start = 0;
let limit = 5;

let showPosts = (start, limit) => {
  postAPIcall.then(function(data) {
    if(start >= data.length) {
      return false;
    }
    if(limit >= data.length){
      limit = data.length - 1
    }
    let posts = $("#posts")
    for(let i = start; i < limit; ++i){
      let postsInString = "<p class='showHide'>" + data[i].title + "</p><div class='postContent'><span class='content'>" + data[i].body + "</span><br>"
      postsInString += "<div class='showComments'> SHOW COMMENTS </div><div class='commentsBlock'>"
      commentAPIcall(data[i].id).then( (comment) => {
        for(let j = 0; j < comment.length; ++j){
          let newComments = "<div class = 'showHideComm commentName'> Name: " + comment[j].name + "</div> <div class = 'showHideComm commentBody'> Comment: " + comment[j].body + "</div>"
          postsInString += newComments
        }
        postsInString += "<div class='forAppend'></div><div id = 'userComment'>  </div><input type='text' class='yourName' id='name' placeholder='your name .. ' required> <br>"
        postsInString += "<input type='text' class='yourText' id='comment' placeholder='Type your comment here .. '> <br>"
        postsInString += "<input type='submit' class='button' value='Submit New Comment' onclick='showInput()'> </div></div>"
        posts.append(postsInString)
      })
    }

  });
  return true;
}

showPosts(start, limit)

function loadMore(){
  start = limit
  limit += 5
  showPosts(start, limit)
}



$(document).on("click",".showHide", function () {
  console.log($(this).next())
  $(this).next('.postContent').toggle()
})

$(document).on("click",".showComments", function () {
  $(this).next('.commentsBlock').toggle()
})

$(document).on("click","#createNewPost", function () {
  $('#popup').toggle()
})

$(document).on("click","#close", function () {
  $('#popup').hide()
})
/*
$("#createPost").click(function(){
    $("#popup").hide()
    $("#createdMessage").show(0).delay(1500).hide(0)
});*/

$('#popup').click( function (e) {
  let subject = $("#newPost");
  if(e.target.id != subject.attr('id') && !subject.has(e.target).length)
  {
      $('#popup').fadeOut();
  }
})

// ---- comments block ----
const commentAPIcall = (id) => {
  let comment = $.ajax({
    url: root + '/comments?postId='+id,
    method: 'GET'
  })
  return comment
}

function showInput(){
  $('.forAppend').append("<div class = 'commentName'> Name: " + document.getElementById('name').value + "</div> <div class = 'commentBody'> Comment: " + document.getElementById('comment').value + '</div>')
}

function sendPost(){
  let sendComment = $.ajax({
    url: root + '/posts',
    method: 'POST',
    data: { title: $('#title').val(), body: $('#newcontent').val() }
  })
  sendComment.then(function(data){
    $("#popup").hide()
    $("#createdMessage").show(0).delay(1500).hide(0)
    console.log(data)
  })
return false;
}
