(function () {

  var form           = $('#form-login'),
      messageSuccess = $('#alert-success'),
      messageError   = $('#alert-error'),
      messages       = messageSuccess.add(messageError),
      inputUsername  = $('#input-username'),
      inputPassword  = $('#input-password'),
      inputs         = inputUsername.add(inputPassword),
      handleError;

  form.on('submit', function (event) {

    event.preventDefault();

    messages.hide();
    inputs.removeClass('error');

    $.ajax('http://interview-js.dev:8080', {
      method: 'POST',
      data:   form.serialize()
    })
    .success(function (response) {
      if (response.err) handleError(response);
      else messageSuccess.show();
    })
    .error(handleError);

  });

  handleError = function (response) {

    if (response && response.err) {
      ({ user: inputUsername,
         pass: inputPassword
      })[response.err].addClass('error');
    }

    messageError.show();

  };

})();
