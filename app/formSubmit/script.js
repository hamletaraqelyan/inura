$(() => {
  $(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });

  $("#lets-talk-form").validate({
    errorClass: "error-message",
    // focusCleanup: true,
    onfocusout: false,
    onkeyup: (a) => {
      $(a).removeClass("error-message");
      $(a).next(".error-message").remove();
    },
    rules: {
      name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
    },
    submitHandler: (form, event) => {
      event.preventDefault();
      const submitButton = $(form).find('button[type="submit"]');
      submitButton.prop("disabled", true);

      const formData = {};
      $(form)
        .find("input, textarea")
        .each(function () {
          if ($(this).attr("name")) {
            formData[$(this).attr("name")] = $(this).val();
          }
        });
      //   const url = "https://whatmoneyapi.azurewebsites.net/api/Document";

      //   $.ajax({
      //     url: url,
      //     type: "POST",
      //     contentType: "application/json",
      //     data: JSON.stringify(requestBody),
      //     success: (response) => {
      //       submitButton.prop("disabled", false);
      //       $(form).trigger("reset");
      //     },
      //     error: function (jqXHR, textStatus, errorThrown) {
      //       console.error("Error:", errorThrown);
      //       submitButton.prop("disabled", false);
      //     },
      //   });
    },
  });
});
