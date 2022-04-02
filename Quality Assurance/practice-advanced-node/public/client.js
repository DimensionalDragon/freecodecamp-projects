const socket = io();

$(document).ready(function () {
  socket.on('user', data => {
    $('#num-users').text(`${data.currentUsers} users online`);
    const message = `${data.name} has ${data.connected ? 'joined' : 'left'} the chat.`;
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  socket.on('chat message', data => {
    const message = `${data.name}, ${data.message}`;
    $('#messages').append($('<li>').html(message));
  })

  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
