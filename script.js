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
    .to("#arch", {
      scale: "3",
      opacity: 1,
    })
    .to(
      "#welcome-content",
      {
        opacity: 0,
        scale: "0.7",
        duration: 0.3,
      },
      "-=0.5"
    )
    .to(
      "#welcome-sky-content",
      {
        opacity: 1,
      },
      "-=0.27"
    )
    .to(
      "#welcome-sky-content h2",
      {
        scale: 1,
      },
      "-=0.5"
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
      y: `${isMobile ? "41%" : "68%"}`,
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
      x: "335%",
      y: "370%",
      scale: 1,
    })
    .to(".star-5", {
      x: "-250%",
      y: "410%",
      scale: 1,
    })
    .to(".star-6", {
      x: "220%",
      y: "200%",
      scale: 1,
    })
    .to(".star-7", {
      x: `${isMobile ? "-200%" : "-25%"}`,
      y: `${isMobile ? "960%" : "295%"}`,
      scale: 1,
    });

  // const globTimeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#video-globe",
  //     start: "bottom bottom",
  //     end: `top bottom`,
  //     scrub: 2,
  //     pin: true,
  //   },
  // });
  //Gsap

  //Swiper
  const textContentData = [
    {
      title: "Find daly forecast",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
    },
    {
      title: "Ask question in the chat",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
    },
    {
      title: "Discover yor natal chart",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
    },
    {
      title: "Analizing your dream",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
    },
    {
      title: "Check your compatibility",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
    },
    {
      title: "Find out your totem animal",
      text: "Lorem ipsum dolor sit amet consectetur. Eget cras tellus nibh in augue pellentesque.",
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
