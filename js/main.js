(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
    // Booking Form
    const bookingButton = document.querySelector(".btn.btn-primary.w-100");
    if (bookingButton) {
        bookingButton.addEventListener("click", async () => {
            const checkIn = document.querySelector('#date1 input')?.value;
            const checkOut = document.querySelector('#date2 input')?.value;
            const adult = document.querySelectorAll("select")[0]?.value;
            const child = document.querySelectorAll("select")[1]?.value;

            try {
                const response = await fetch('/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ checkIn, checkOut, adult, child })
                });

                const result = await response.json();
                alert(result.message);
            } catch (error) {
                alert("Error submitting booking");
            }
        });
    }
});


//service page newsletter email submission
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('newsletterSubmit');
    const emailInput = document.getElementById('newsletterEmail');
    const message = document.getElementById('newsletterMsg');
  
    submitBtn.addEventListener('click', function () {
      const email = emailInput.value.trim();
  
      if (email && email.includes('@')) {
        localStorage.setItem('newsletterEmail', email);
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';
        emailInput.value = ''; // Clear input
      } else {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
      }
    });
  });
//  service page newsletter js ends here


  document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.querySelector("#booking-form");

    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            checkIn: document.querySelector("#check-in").value,
            checkOut: document.querySelector("#check-out").value,
            adults: document.querySelector("#adults").value,
            children: document.querySelector("#children").value
        };

        // Validate the form (optional)
        if (!formData.checkIn || !formData.checkOut || !formData.adults) {
            alert("Please fill in all required fields.");
            return;
        }
        alert("Booking submitted successfully!");
        bookingForm.reset();
        });
    });

