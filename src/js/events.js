$(document).ready(function(){

  if ($(".Locations__header")[0]){

    if (window.location.hash) {
      var onloadLocation = window.location.hash;
      scrollToHash(onloadLocation);
    }

    $('.locationSelectTrigger').change(function(){
       var selectedLocation = $(this).children("option:selected").val();
       scrollToHash(selectedLocation);
   });

   function scrollToHash (location) {
     $('html, body').animate({ scrollTop: $(location).offset().top }, 1000);
   };

  };

  $('.navMenuTrigger').on('click', function () {

    if ($(this).hasClass('isOpen')) {
      $(this).parent('._item').removeClass('isOpen');
      $(this).removeClass('isOpen');
    } else {
      $('._item').removeClass('isOpen');
      $('.navMenuTrigger').removeClass('isOpen');
      $(this).parent('._item').addClass('isOpen');
      $(this).addClass('isOpen');
    }

    window.onclick = function(event) {

      if (!event.target.matches('.navMenuTrigger.isOpen')) {

        var dropdowns = document.getElementsByClassName("navMenuTrigger");
        var i;

        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];

          if (openDropdown.classList.contains('isOpen')) {
            openDropdown.classList.remove('isOpen');
            openDropdown.parentElement.classList.remove('isOpen');
          }
        }
      }
    }

  });

  $('.mobileMenuTrigger').on('click', function() {
    $(this).toggleClass('isActive');
    $('.modalOverlay').toggleClass('isVisable');
    $('.Header__nav-wrapper').toggleClass('isOpen');
  });

  $('.searchButton').on('click', function () {

    $(this).next('.searchWrapper').toggleClass('isOpen');

    // easeDropdownOpen();
  });

  // function easeDropdownOpen(dropdown) {
  //   console.log(dropdown);
  //   if (dropdown.style.maxHeight){
  //     dropdown.style.maxHeight = null;
  //   } else {
  //     dropdown.style.maxHeight = dropdown.scrollHeight + "px";
  //   }
  // };

  $('.closeTrigger').on('click', function () {
    $(this).parent().parent().removeClass('isActive');
  });

  $('.bundleCloseTrigger').on('click', function () {
    $(this).parent().parent().parent().parent('.bundleHeader').toggleClass('isOpen');
    $(this).toggleClass('isActive');
  });

  $('.categoryTrigger').on('click', function() {
    $(this).toggleClass('isActive');
    $(this).next('.sortItems').toggleClass('isOpen');
    $(this).parent('._sort-sidear').toggleClass('isOpen');
  });

  if ($('.Checkout')[0]){

    $('#billing_address').change(function() {
      $('._billing-address-form').toggleClass('isVisible');
    });

    $('.orderDropdownTrigger').on('click', function (event) {
      event.preventDefault();
      $(this).toggleClass('isActive');
      $(this).next('.orderDropdown').toggleClass('isOpen');
    });

  };

});
