(function($) {

  $(window).on('load', function(){
    $.instagramFeed({
      'username': 'mccarthy_uniforms',
      'container': ".instagram-slider",
      'items': 12,
      'styling': false,
      'display_profile': false,
      'display_biography': false,
      'get_raw_json': true,
      'callback': createInstagramGallery
    });
  });

  function createInstagramGallery(rawJSON) {
    var instaObject = JSON.parse(rawJSON);
    var imageArray = instaObject.images;

    console.log(imageArray);

    if (imageArray.length > 0) {
      for (var i = 0; i < imageArray.length; ++i) {

          var src = imageArray[i].node.thumbnail_resources[3].src;
          var alt = imageArray[i].node.accessibility_caption;
          var caption = imageArray[i].node.edge_media_to_caption.edges[0].node.text;
          var title = imageArray[i].node.accessibility_caption;
          var link = 'https://www.instagram.com/p/' + imageArray[i].node.shortcode;
          var likes = imageArray[i].node.edge_liked_by.count;

          var figure = document.createElement('figure');
          var img = document.createElement('img');
          var figcaption = document.createElement('figcaption');
          var ahref = document.createElement('a');
          var span = document.createElement('span');

          figure.classList.add('_card');
          img.classList.add('_image');
          figcaption.classList.add('_caption');
          ahref.classList.add('_link');
          span.classList.add('icon--heart');

          img.setAttribute('src', src);
          img.setAttribute('alt', alt);
          ahref.setAttribute('title', title + ', opens in new tab')
          ahref.setAttribute('target', '_blank');
          ahref.setAttribute('rel', 'noopener noreferrer');
          ahref.setAttribute('href', link);
          span.innerText = likes;
          figcaption.innerHTML = caption;
          figure.appendChild(img);
          figure.appendChild(figcaption);
          figcaption.appendChild(span);
          ahref.appendChild(figure);

          var instagramSlider = document.getElementById('instagramSlider');
          instagramSlider.appendChild(ahref);
      }
    }

    $(document).ready(function(){
      $('#instagramSlider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        prevArrow: $('._left-arrow'),
        nextArrow: $('._right-arrow'),
        slidesToScroll: 1,
        speed: 500,
        autoplay: false,
        lazyLoad: 'ondemand',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    });
  }

})(jQuery);
