//define functions here
var createGist = function(file_name, content, description, token){
  let gist = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }

  $.ajax({
    url: `https://api.github.com/gists`,
    method: 'POST',
    headers: {
      Authorization: 'token ' + token
    },
    data: JSON.stringify(gist),
    success: function (gist) {
      myGists(gist.owner.login, token)
    },
    error: function () {
      console.log('Something went wrong, please check your token');
    }
  })
};

var myGists = function (username, token){
  $.ajax({
    url: `https://api.github.com/users/${username}/gists`,
    method: 'GET',
    headers: {
      Authorization: 'token ' + token
    },
    success: function (data) {
      renderGists(data)
    }
  })
};

var renderGists = function (gists) {
  $('#gists').empty()
  gists.forEach(gist => {
    $('#gists').append(
      `<p><a href="${gist.html_url}">${gist.description}</a></p>`
    )
  })
}

var bindCreateButton = function(event) {
  event.preventDefault()

  let $gistForm = $('.gistForm')
  let token = $gistForm.find('#token').val()
  let filename = $gistForm.find('#filename').val()
  let content = $gistForm.find('#content').val()
  let description = $gistForm.find('#description').val()

  createGist(filename, content, description, token)
};

$(document).ready(function(){
  $('.gistForm button').on('click', bindCreateButton)
});
