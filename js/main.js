jQuery(document).ready(
  (function ($) {
    "use strict";

    /*--------------------------
        SCROLLSPY ACTIVE
    ---------------------------*/
    var scrollSpyEl = document.querySelector('body');
    if (scrollSpyEl) {
      new bootstrap.ScrollSpy(scrollSpyEl, {
        target: '#navbarNav',
        offset: 50
      });
    }

    /*--------------------------
        STICKY MAINMENU
    ---------------------------*/
    $("#mainmenu-area").sticky({
      topSpacing: 0,
    });

    /*-----------------------------
        SLIDER ACTIVE
    ------------------------------*/
    var mySlider = $(".pogoSlider")
      .pogoSlider({
        pauseOnHover: false,
      })
      .data("plugin_pogoSlider");

    /*----------------------------
        OPEN SEARCH FORM
    ----------------------------*/
    var $searchForm = $(".search-form");
    var $searchFormTrigger = $(".search-form-trigger");
    var $formOverlay = $(".search-form-overlay");
    $searchFormTrigger.on("click", function (event) {
      event.preventDefault();
      toggleSearch();
    });

    function toggleSearch(type) {
      if (type === "close") {
        //close serach
        $searchForm.removeClass("is-visible");
        $searchFormTrigger.removeClass("search-is-visible");
      } else {
        //toggle search visibility
        $searchForm.toggleClass("is-visible");
        $searchFormTrigger.toggleClass("search-is-visible");
        if ($searchForm.hasClass("is-visible"))
          $searchForm.find('input[type="search"]').focus();
        $searchForm.hasClass("is-visible")
          ? $formOverlay.addClass("is-visible")
          : $formOverlay.removeClass("is-visible");
      }
    }


    /*--------------------------
       HOME PARALLAX BACKGROUND
    ----------------------------*/
    $(window).stellar({
      responsive: true,
      positionProperty: "position",
      horizontalScrolling: false,
    });


    /*---------------------------
        SMOOTH SCROLL
    -----------------------------*/
    $(document).on("click", "a[href^='#']", function (event) {
      var href = $(this).attr("href");
      
      if (href && href.length > 1) {
        var targetElement = $(href);
        
        if (targetElement.length > 0) {
          event.preventDefault();
          
          // Special handling for scroll to top
          if (href === "#home" && $(this).hasClass("scrolltotop")) {
            $("html, body").animate({
              scrollTop: 0
            }, 1000, "swing");
          } else {
            // Regular section scrolling
            var offset = 80;
            var target = targetElement.offset().top - offset;
            
            $("html, body").animate({
              scrollTop: target
            }, 1000, "swing");
          }
        }
      }
    });

    /*----------------------------
        SCROLL TO TOP
    ------------------------------*/
    $(window).on("scroll", function () {
      var $totalHeight = $(window).scrollTop();
      var $scrollToTop = $(".scrolltotop");
      
      if ($totalHeight > 300) {
        $scrollToTop.fadeIn();
      } else {
        $scrollToTop.fadeOut();
      }
      
      // Keep button at consistent position
      $scrollToTop.css("bottom", "20px");
      $scrollToTop.css("right", "20px");
      $scrollToTop.css("z-index", "100001");
    });


    /*---------------------------
        MENU DISCOUNT SLIDER
    -----------------------------*/
    $(".menu-discount-offer").owlCarousel({
      merge: true,
      video: true,
      items: 1,
      smartSpeed: 1000,
      loop: false,
      nav: false,
      navText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>',
      ],
      autoplay: false,
      autoplayTimeout: 2000,
      margin: 15,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });





    /*--------------------------
        GALLERY MODAL FUNCTIONALITY
    ----------------------------*/
    var modal = document.getElementById("gallery-modal");
    var modalImg = document.getElementById("gallery-modal-img");
    var galleryThumbnails = document.querySelectorAll(".gallery-thumbnail");
    var closeBtn = document.querySelector(".gallery-close");
    var prevBtn = document.querySelector(".gallery-prev");
    var nextBtn = document.querySelector(".gallery-next");
    var currentImageIndex = 0;

    // Add click event to each thumbnail
    galleryThumbnails.forEach(function(thumbnail, index) {
      thumbnail.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        currentImageIndex = index;
      });
    });

    // Close modal when clicking the X
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    // Previous image
    prevBtn.addEventListener("click", function() {
      currentImageIndex = (currentImageIndex - 1 + galleryThumbnails.length) % galleryThumbnails.length;
      modalImg.src = galleryThumbnails[currentImageIndex].src;
    });

    // Next image
    nextBtn.addEventListener("click", function() {
      currentImageIndex = (currentImageIndex + 1) % galleryThumbnails.length;
      modalImg.src = galleryThumbnails[currentImageIndex].src;
    });

    // Keyboard navigation
    document.addEventListener("keydown", function(event) {
      if (modal.style.display === "block") {
        switch(event.key) {
          case "Escape":
            modal.style.display = "none";
            break;
          case "ArrowLeft":
            currentImageIndex = (currentImageIndex - 1 + galleryThumbnails.length) % galleryThumbnails.length;
            modalImg.src = galleryThumbnails[currentImageIndex].src;
            break;
          case "ArrowRight":
            currentImageIndex = (currentImageIndex + 1) % galleryThumbnails.length;
            modalImg.src = galleryThumbnails[currentImageIndex].src;
            break;
        }
      }
    });

  })(jQuery)
);

jQuery(window).on("load", function () {
  /*--------------------------
        PRE LOADER
    ----------------------------*/
  $(".preloader").fadeOut(1000);
});
