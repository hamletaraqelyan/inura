$(() => {
  // $(window).on("beforeunload", function () {
  //     $(window).scrollTop(0);
  //   });

  // const swiper = new Swiper(".swiper-container", {
  //   // Optional parameters
  //   direction: "vertical",
  //   // autoplay: {
  //   //   delay: 5000,
  //   //   stopOnLastSlide: true,
  //   // },
  //   allowTouchMove: false,
  //   loop: false,
  //   effect: "fade",
  //   // fadeEffect: {
  //   //   crossFade: true,
  //   // },
  // });

  // swiper.on("slideChange", function (el) {
  //   const index = el.realIndex;
  //   $(".navigation-swiper li.active").removeClass("active");
  //   $(`.navigation-swiper li[data-index="${index}"]`).addClass("active");
  //   changeTextBlockHTML(textContentData[index]);
  // });

  const updateSliderComponents = (index) => {
    $(".navigation-swiper li.active").removeClass("active");
    $(`.navigation-swiper li[data-index="${index}"]`).addClass("active");
    changeTextBlockHTML(textContentData[index]);
  };

  const videoComponent = {
    el: $("#video-slider"),
    activeIndex: 0,
    pause: function () {
      this.el.trigger("pause");
    },
    play: function () {
      this.el.trigger("play");
    },
    playFrom: function (startTime) {
      if (startTime < 0 || startTime > this.el.prop("duration")) {
        console.error(
          "Invalid start time. Please provide a value between 0 and",
          this.el.prop("duration")
        );
        return;
      }

      this.el.prop("currentTime", startTime);
      this.play();
    },
    trackAndCallFunction: function () {
      this.el.on("timeupdate", () => {
        const currentTime = this.el.prop("currentTime");
        if (currentTime >= 0 && currentTime <= 5.749) {
          if (this.activeIndex !== 0) {
            this.activeIndex = 0;
            updateSliderComponents(this.activeIndex);
          }
        } else if (currentTime >= 5.75 && currentTime <= 15.749) {
          if (this.activeIndex !== 1) {
            this.activeIndex = 1;
            updateSliderComponents(this.activeIndex);
          }
        } else if (currentTime >= 15.75 && currentTime <= 26.849) {
          if (this.activeIndex !== 2) {
            this.activeIndex = 2;
            updateSliderComponents(this.activeIndex);
          }
        } else if (currentTime >= 26.85 && currentTime <= 45.39) {
          if (this.activeIndex !== 3) {
            this.activeIndex = 3;
            updateSliderComponents(this.activeIndex);
          }
        } else if (currentTime >= 45.4 && currentTime <= 58.709) {
          if (this.activeIndex !== 4) {
            this.activeIndex = 4;
            updateSliderComponents(this.activeIndex);
          }
        } else if (currentTime >= 58.71) {
          if (this.activeIndex !== 5) {
            this.activeIndex = 5;
            updateSliderComponents(this.activeIndex);
          }
        }
      });
    },
  };

  videoComponent.trackAndCallFunction();

  $(".navigation-swiper li").click(function () {
    if (!$(this).hasClass("active")) {
      const seconds = $(this).data("seconds");
      const index = $(this).data("index");

      $(".navigation-swiper li.active").removeClass("active");
      $(this).addClass("active");

      changeTextBlockHTML(textContentData[index]);
      videoComponent.playFrom(seconds);
    }
  });

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
      end: `+=${document.querySelector("#welcome").offsetHeight * 3}`,
      scrub: 2,
      pin: true,
    },
  });

  timeline
    .to("#welcome-bg", {
      scale: "1.1",
      maskImage: "radial-gradient(circle, transparent 100%, #fff)",
      duration: 3,
    })
    .to(
      "#welcome-content",
      {
        opacity: 0,
        scale: "1.1",
        duration: 2.5,
        pointerEvents: "all",
      },
      "-=3"
    )
    .to("#welcome-content", {
      pointerEvents: "none",
    })
    .to(
      "#welcome-sky-content h2",
      {
        opacity: 1,
        scale: 1,
        duration: 2.5,
      },
      "-=1"
    )
    .to(
      "#welcome-sky-content img",
      {
        opacity: 1,
        scale: 1,
        duration: 2.5,
      },
      "-=2.6"
    )
    .to("#welcome-sky-content", {
      scale: "1.1",
      maskImage: "radial-gradient(circle, transparent 100%, #fff)",
      opacity: 0.5,
      duration: 3,
    })
    .to(
      "#phone-section",
      {
        opacity: "1",
        scale: "1",
        duration: 2.5,
        onStart: () => {
          videoComponent.play();
        },
      },
      "-=1.5"
    );

  const globeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#statistics",
      scrub: 3,
      start: "top bottom",
      end: "top top+=20%",
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
    $(".text-block").fadeOut(200, function () {
      // Change the content
      $(".text-block").html(html);

      // Fade in the text block with new content
      $(".text-block").fadeIn(200);
    });
  };

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
    if (elementId === "phone-section") {
      $("html, body").animate({ scrollTop: $(window).height() * 3 }, 3000);
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
  // const ripples = $("#ripples");

  // ripples.ripples({
  //   resolution: 256,
  //   dropRadius: 50,
  //   perturbance: 0.02,
  // });
});
