$(() => {
  //Video component
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
  //Video component

  //Scroll functionality
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    userAgent.indexOf("android") !== -1 ||
    userAgent.indexOf("iphone") !== -1 ||
    userAgent.indexOf("ipad") !== -1;

  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#welcome",
      start: "bottom bottom",
      end: `+=${
        document.querySelector("#welcome").offsetHeight * (isMobile ? 4 : 3)
      }`,
      scrub: 2,
      pin: true,
    },
  });

  timeline
    .to("#welcome-bg", {
      scale: "1.2",
      rotate: "5deg",
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
      "#circles",
      {
        [!isMobile && "backgroundSize"]: "100%",
        duration: 3,
      },
      "-=1.5"
    )
    .to(
      "#circles .content-block",
      {
        opacity: 1,
        backgroundSize: isMobile ? "85%" : "43%",
        duration: 3,
      },
      "-=3"
    )
    .to(
      "#circles .content-block h3",
      {
        opacity: 1,
        scale: 1,
        duration: 3,
      },
      "-=1.5"
    )
    .to("#circles .card.one", {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 3,
    })
    .to(
      "#circles .card.two",
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: "-50%",
        duration: 3,
      },
      "-=1.5"
    )
    .to(
      "#circles .card.three",
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 3,
      },
      "-=1.5"
    )
    .to("#circles .card.four", {
      opacity: 1,
      scale: 1,
      x: 0,
      y: "-50%",
      duration: 3,
    })
    .to("#circles .card.one", {
      opacity: 0,
      scale: 0.3,
      x: isMobile ? "10%" : "-30%",
      y: isMobile ? "180%" : "150%",
      duration: 3,
    })
    .to(
      "#circles .card.two",
      {
        opacity: 0,
        scale: 0.3,
        x: isMobile ? "-10%" : "-70%",
        y: isMobile ? "0" : "-60%",
        duration: 3,
      },
      "-=1.5"
    )
    .to(
      "#circles .card.three",
      {
        opacity: 0,
        scale: 0.3,
        x: isMobile ? "5%" : "30%",
        y: isMobile ? "-85%" : "-150%",
        duration: 3,
      },
      "-=1.5"
    )
    .to("#circles .card.four", {
      opacity: 0,
      scale: 0.3,
      x: isMobile ? "0%" : "70%",
      y: isMobile ? "-260%" : "-60%",
      duration: 3,
    })
    .to("#circles .content-block h3", {
      opacity: 0,
      scale: 0.7,
      duration: 3,
    })
    .to(
      "#circles .content-block",
      {
        opacity: 0,
        backgroundSize: "30%",
        duration: 3,
      },
      "-=1.5"
    )
    .to(
      "#circles .logo",
      {
        opacity: 1,
        scale: 1,
        duration: 3,
      },
      "-=2.5"
    );
  // .to("#circles", {
  //   scale: "1.1",
  //   maskImage: "radial-gradient(circle, transparent 100%, #fff)",
  //   opacity: 0.5,
  //   duration: 3,
  // });
  // .to(
  //   "#phone-section",
  //   {
  //     opacity: "0.9",
  //     scale: "0.975",
  //     duration: 5,
  //     onStart: () => {
  //       videoComponent.play();
  //     },
  //   },
  //   "-=1.2"
  // )
  // .to("#phone-section", {
  //   opacity: "1",
  //   scale: "1",
  //   duration: 5,
  // });
  // .to("body", {
  //   overflow: "hidden",
  //   onStart: () => {
  //     videoComponent.play();
  //   },
  // });

  const globeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#statistics",
      scrub: 3,
      start: "top bottom",
      end: "top top+=20%",
    },
  });

  // globeTimeline
  //   .to("#video-globe", {
  //     y: "100%",
  //     scale: 0.7,
  //     duration: 30,
  //   })
  //   .to("#video-globe", {
  //     scale: 1.1,
  //     opacity: 0,
  //   });

  globeTimeline.to("#video-globe", {
    y: "57%",
    scale: "0.1",
    duration: 30,
    onStart: () => {
      videoComponent.play();
    },
  });

  const stars = gsap.timeline({
    scrollTrigger: {
      trigger: "#statistics",
      scrub: 3,
      start: "top center",
      end: "top top",
    },
  });

  stars
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
  //Scroll functionality
});
