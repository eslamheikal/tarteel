!(function ($) {
  "use strict";

  // ==============================================
  // MOBILE NAVIGATION
  // ==============================================
  
  /**
   * Initialize mobile navigation
   */
  function initMobileNav() {
    if ($('.nav-menu').length && !$('.mobile-nav').length) {
      const $mobileNav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      
      $('body').append($mobileNav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
    }
  }

  /**
   * Close mobile navigation
   */
  function closeMobileNav() {
    $('body').removeClass('mobile-nav-active');
    $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
    $('.mobile-nav-overly').fadeOut();
  }

  /**
   * Open mobile navigation
   */
  function openMobileNav() {
    $('body').addClass('mobile-nav-active');
    $('.mobile-nav-toggle i').removeClass('icofont-navigation-menu').addClass('icofont-close');
    $('.mobile-nav-overly').fadeIn();
  }

  /**
   * Initialize mobile navigation event handlers
   */
  function initMobileNavEvents() {
    // Remove existing event handlers to avoid duplicates
    $(document).off('click', '.mobile-nav-toggle');
    $(document).off('click', '.mobile-nav .drop-down > a');
    $(document).off('click', '.mobile-nav a');
    
    // Mobile nav toggle event
    $(document).on('click', '.mobile-nav-toggle', function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = $('body').hasClass('mobile-nav-active');
      isActive ? closeMobileNav() : openMobileNav();
    });

    // Dropdown events
    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    // Close mobile nav when clicking outside
    $(document).on('click', function (e) {
      const container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          closeMobileNav();
        }
      }
    });

    // Close mobile nav when clicking on mobile nav links
    $(document).on('click', '.mobile-nav a', function (e) {
      closeMobileNav();
    });
  }

  // ==============================================
  // SMOOTH SCROLL
  // ==============================================
  
  /**
   * Handle smooth scrolling for navigation links
   */
  function initSmoothScroll() {
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
          location.hostname === this.hostname) {
        e.preventDefault();
        
        const target = $(this.hash);
        if (target.length) {
          let scrollto = target.offset().top;
          const scrolled = 20;

          if ($('#header').length) {
            scrollto -= $('#header').outerHeight();
            if (!$('#header').hasClass('header-scrolled')) {
              scrollto += scrolled;
            }
          }

          if ($(this).attr("href") === '#header') {
            scrollto = 0;
          }

          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');

          // Update active navigation item
          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }

          // Close mobile nav if open
          if ($('body').hasClass('mobile-nav-active')) {
            closeMobileNav();
          }
          
          return false;
        }
      }
    });
  }

  // ==============================================
  // HEADER SCROLL EFFECTS
  // ==============================================
  
  /**
   * Initialize header scroll effects
   */
  function initHeaderScroll() {
    const $header = $('#header');
    
    function handleScroll() {
      if ($(window).scrollTop() > 100) {
        $header.addClass('header-scrolled');
        $('.back-to-top').fadeIn('slow');
      } else {
        $header.removeClass('header-scrolled');
        $('.back-to-top').fadeOut('slow');
      }
    }

    // Initial check
    handleScroll();
    
    // Bind scroll event
    $(window).on('scroll', handleScroll);
  }

  /**
   * Initialize sticky header
   */
  function initStickyHeader() {
    if ($("#header").length) {
      $("#header").sticky({
        topSpacing: 0,
        zIndex: '50'
      });
    }
  }

  // ==============================================
  // BACK TO TOP BUTTON
  // ==============================================
  
  /**
   * Initialize back to top button
   */
  function initBackToTop() {
    $('.back-to-top').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
  }

  // ==============================================
  // CAROUSEL
  // ==============================================
  
  /**
   * Initialize hero carousel
   */
  function initHeroCarousel() {
    const $heroCarousel = $("#heroCarousel");
    const $heroCarouselIndicators = $("#hero-carousel-indicators");
    
    if ($heroCarousel.length && $heroCarouselIndicators.length) {
      $heroCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
        const indicator = index === 0 ? 
          `<li data-target='#heroCarousel' data-slide-to='${index}' class='active'></li>` :
          `<li data-target='#heroCarousel' data-slide-to='${index}'></li>`;
        $heroCarouselIndicators.append(indicator);
      });

      $heroCarousel.on('slid.bs.carousel', function () {
        $(this).find('.carousel-content').addClass('animated fadeInDown');
      });
    }
  }

  /**
   * Initialize portfolio details carousel
   */
  function initPortfolioCarousel() {
    if ($(".portfolio-details-carousel").length) {
      $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
      });
    }
  }

  // ==============================================
  // PORTFOLIO
  // ==============================================
  
  /**
   * Initialize portfolio isotope and filter
   */
  function initPortfolio() {
    $(window).on('load', function () {
      const $portfolioContainer = $('.portfolio-container');
      
      if ($portfolioContainer.length) {
        const portfolioIsotope = $portfolioContainer.isotope({
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
          $("#portfolio-flters li").removeClass('filter-active');
          $(this).addClass('filter-active');

          portfolioIsotope.isotope({
            filter: $(this).data('filter')
          });
        });
      }

      // Initialize venobox
      if ($('.venobox').length) {
        $('.venobox').venobox();
      }
    });
  }

  // ==============================================
  // SKILLS SECTION
  // ==============================================
  
  /**
   * Initialize skills section animations
   */
  function initSkills() {
    if ($('.skills-content').length) {
      $('.skills-content').waypoint(function () {
        $('.progress .progress-bar').each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
      }, {
        offset: '80%'
      });
    }
  }

  // ==============================================
  // AOS ANIMATIONS
  // ==============================================
  
  /**
   * Initialize AOS (Animate On Scroll)
   */
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: "ease-in-out"
      });
    }
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  
  /**
   * Initialize all components
   */
  function init() {
    // Initialize mobile navigation
    initMobileNav();
    initMobileNavEvents();
    
    // Initialize other components
    initSmoothScroll();
    initHeaderScroll();
    initStickyHeader();
    initBackToTop();
    initHeroCarousel();
    initPortfolioCarousel();
    initPortfolio();
    initSkills();
    initAOS();
  }

  // Initialize on DOM ready
  $(document).ready(init);
  
  // Re-initialize mobile nav after delays to ensure Angular has rendered
  setTimeout(initMobileNav, 1000);
  setTimeout(initMobileNav, 2000);
  setTimeout(initMobileNavEvents, 1000);
  setTimeout(initMobileNavEvents, 2000);
  
  // Re-initialize on window load
  $(window).on('load', function() {
    initMobileNav();
    initMobileNavEvents();
  });

})(jQuery);