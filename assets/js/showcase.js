$(document).ready(function () {
  $(".showcase_slide").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    zIndex: 0,
    prevArrow:
      '<button class="top_nav_btn top_nav_btn_left"><i class="fa-light fa-chevron-left"></i></button>',
    nextArrow:
      '<button class="top_nav_btn top_nav_btn_right"><i class="fa-light fa-chevron-right"></i></button>',
  });
});

let typed = new Typed("#typingWord", {
  strings: ["Innovation", "Ingenuity", "Novelty", "Originality", "Creativity"],
  loop: true,
  loopCount: Infinity,
  typeSpeed: 80,
  backSpeed: 80,
});
