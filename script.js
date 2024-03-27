$(() => {
  // $(window).on("beforeunload", function () {
  //     $(window).scrollTop(0);
  //   });

  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    userAgent.indexOf("android") !== -1 ||
    userAgent.indexOf("iphone") !== -1 ||
    userAgent.indexOf("ipad") !== -1;

  //Gsap
  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#welcome",
      start: "bottom bottom",
      end: `+=${document.querySelector("#welcome").offsetHeight}`,
      scrub: 2,
      pin: true,
    },
  });

  timeline
    .to("#welcome-bg", {
      scale: "1.1",
      maskImage: "radial-gradient(circle, transparent 100%, #fff)",
      duration: 3,
      scrub: 3,
    })
    .to(
      "#welcome-content",
      {
        opacity: 0,
        scale: "1.1",
        duration: 2.5,
        scrub: 2.5,
      },
      "-=3"
    )
    .to(
      "#welcome-sky-content h2",
      {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        scrub: 2.5,
      },
      "-=1"
    )
    .to(
      "#welcome-sky-content img",
      {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        scrub: 2.5,
      },
      "-=2.6"
    );

  const globeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#phone-section",
      scrub: 3,
      start: "top top",
      end: "bottom top+=40%",
    },
  });

  globeTimeline
    .to("#video-globe", {
      y: `${isMobile ? "38%" : "59%"}`,
      scale: "0.1",
      duration: 30,
    })
    .to(".star-1", {
      x: `${isMobile ? "-240%" : "-300%"}`,
      y: `${isMobile ? "415%" : "355%"}`,
      scale: 1,
    })
    .to(".star-2", {
      x: "-209%",
      y: "440%",
      scale: 1,
    })
    .to(".star-3", {
      x: `${isMobile ? "50%" : "195%"}`,
      y: `${isMobile ? "510%" : "350%"}`,
      scale: 1,
    })
    .to(".star-4", {
      x: `${isMobile ? "-200%" : "335%"}`,
      y: `${isMobile ? "1030%" : "370%"}`,
      scale: 1,
    });
  //Gsap

  //Swiper
  const textContentData = [
    {
      title: "Start your day empowered",
      text: "Inura helps start your day with clear understanding of how yourstars align today.",
    },
    {
      title: "Real-time connection",
      text: "Get an answer to any question that troubles you. It is a confusing world out there, a little help can go a long way.",
    },
    {
      title: "Reveal your cosmic blueprint",
      text: "Inura creates a personalised and detailed natal chart for you. It also explains what your natal chart might mean for you in easy to understand bitesize pieces.",
    },
    {
      title: "Decode the language of dreams",
      text: "Let Inura explain to you what your dream meant. You won't have to torment yourself with questions and guesses anymore.",
    },
    {
      title: "Discover your harmonious bond",
      text: "Inura helps you understand your relationship's strengths and weaknesses. Help yourself build what you've long dreamed of.",
    },
    {
      title: "Find your spiritual guide",
      text: "Individuals and tribes have invoked their 'totem' animals in tough times. Discover the wisdom and guidance your totem animal can offer.",
    },
  ];

  const changeTextBlockHTML = ({ title, text }) => {
    const html = `<h3>${title}</h3><p>${text}</p>`;
    $(".text-block").fadeOut(300, function () {
      // Change the content
      $(".text-block").html(html);

      // Fade in the text block with new content
      $(".text-block").fadeIn(300);
    });
  };

  const swiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "vertical",
    // autoplay: {
    //   delay: 5000,
    //   stopOnLastSlide: true,
    // },
    allowTouchMove: false,
    loop: false,
    effect: "fade",
    // fadeEffect: {
    //   crossFade: true,
    // },
  });

  swiper.on("slideChange", function (el) {
    const index = el.realIndex;
    $(".navigation-swiper li.active").removeClass("active");
    $(`.navigation-swiper li[data-index="${index}"]`).addClass("active");
    changeTextBlockHTML(textContentData[index]);
  });

  $(".navigation-swiper li").click(function () {
    swiper.slideTo($(this).data("index"));
  });

  new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      swiper.params.autoplay.delay = 5000;
      swiper.params.autoplay.stopOnLastSlide = true;
      swiper.update();
      swiper.autoplay.start();
    }
  }).observe(document.querySelector(".swiper-container"));

  // new IntersectionObserver((entries, observer) => {
  //   $("#statistics").toggleClass("show-stars", entries[0].isIntersecting);
  // }).observe(document.querySelector("#statistics .card p"));
  //Swiper

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

  //scroll to sections
  const scrollTo = (elementId) => {
    // $("html, body").scrollTop($("#form-section-block").offset().top);

    $("html, body").animate(
      { scrollTop: $(`#${elementId}`).offset().top },
      3000
    );
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
