$(() => {
  function isMacBook() {
    const userAgent = navigator.userAgent.toLowerCase();
    return (
      userAgent.indexOf("macintosh") !== -1 &&
      userAgent.indexOf("intel mac os x") !== -1
    );
  }

  const isAndroid = () => /Android/i.test(navigator.userAgent);

  alert(isAndroid());

  function isDesktopSize() {
    const width = $(window).width();
    const minWidth = 1024;
    return width > minWidth;
  }

  const videoData = {
    mobile: {
      url: "./media/videos/phone-section/bubblе.mov",
      type: "video/mp4",
    },
    desktop: {
      url: "./media/videos/phone-section/globe.webm",
      type: "video/webm",
    },
  };

  if (!isDesktopSize()) {
    $("#video-globe").html(
      `<source src="${
        isAndroid() ? videoData.desktop.url : videoData.mobile.url
      }" type="${
        isAndroid() ? videoData.desktop.type : videoData.mobile.type
      }"/>`
    );
    $("#video-globe")[0].play();
  } else {
    $("#video-globe").html(
      `<source src="${
        isMacBook() ? videoData.mobile.url : videoData.desktop.url
      }" type="${
        isMacBook() ? videoData.mobile.type : videoData.desktop.type
      }"/>`
    );
  }

  //Menu
  $("#navTrigger").click(function () {
    $(this).toggleClass("active");
    $("header .menu").toggleClass("showMenu");
    if (!$(this).hasClass("active")) {
      $("body").css("overflow", "auto");
    } else {
      $("body").css("overflow", "hidden");
    }
  });
  //Menu

  //scroll to sections
  const scrollTo = (elementId) => {
    if (elementId === "phone-section") {
      $("html, body").animate({ scrollTop: $(window).height() * 4 }, 3000);
    } else {
      $("html, body").animate(
        { scrollTop: $(`#${elementId}`).offset().top },
        3000
      );
    }
  };

  $(".scrollLink").click(function (event) {
    event.preventDefault();
    if ($(this).data("location") === "header") {
      $("#navTrigger").removeClass("active");
      $("header .menu").removeClass("showMenu");
      $("body").css("overflow", "auto");
      setTimeout(() => {
        scrollTo($(this).data("section"));
      }, 1000);
    } else {
      scrollTo($(this).data("section"));
    }
  });

  //scroll to sections
});
