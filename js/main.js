jQuery(document).ready(
  (function ($) {
    "use strict";
    
    // iOS Safari scroll fix - prevent automatic scroll to top
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      // Disable smooth scrolling behavior completely on iOS
      $('html').css('scroll-behavior', 'auto');
      
      // Prevent any scroll events that might trigger unwanted behavior
      var preventAutoScroll = false;
      
      $(window).on('scroll', function(e) {
        if (preventAutoScroll) {
          e.preventDefault();
          return false;
        }
      });
      
      // Monitor when reaching bottom and prevent any auto-scroll
      $(window).on('scroll', function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        
        if (scrollPosition >= scrollHeight - 10) {
          preventAutoScroll = true;
          setTimeout(function() {
            preventAutoScroll = false;
          }, 500);
        }
      });
    }


    /*--------------------------
        STICKY MAINMENU
    ---------------------------*/
    // Only enable sticky on desktop to avoid mobile scroll issues
    if ($(window).width() > 768) {
      $("#mainmenu-area").sticky({
        topSpacing: 0,
      });
    }

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

    /*--------------------------
       SMOKE EFFECT CONTROL
    ----------------------------*/
    // Hide smoke effect on white background sections
    function checkSmokeVisibility() {
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      var whiteSections = $('.about-area, .menus-area, .gallery-area, .contact-form-area');
      var footerArea = $('.footer-area');
      var shouldHide = false;

      // Check if we're in the footer area first (priority override)
      if (footerArea.length > 0) {
        var footerTop = footerArea.offset().top;
        var footerBottom = footerTop + footerArea.outerHeight();

        // If we can see any part of the footer, show smoke
        if (scrollTop + windowHeight >= footerTop) {
          $('body').removeClass('smoke-hidden');
          return; // Exit early, footer takes priority
        }
      }

      // Check if any white section is dominating the viewport
      whiteSections.each(function() {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();

        // Check if this white section is prominently visible
        if (scrollTop >= sectionTop - 100 && scrollTop <= sectionBottom - windowHeight / 2) {
          shouldHide = true;
          return false; // break the loop
        }
      });

      if (shouldHide) {
        $('body').addClass('smoke-hidden');
      } else {
        $('body').removeClass('smoke-hidden');
      }
    }

    // Check on scroll and initial load
    $(window).on('scroll', checkSmokeVisibility);
    $(document).ready(function() {
      checkSmokeVisibility();
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
    // Only enable scroll to top on desktop to avoid mobile scroll issues
    if ($(window).width() > 768) {
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
    }


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
