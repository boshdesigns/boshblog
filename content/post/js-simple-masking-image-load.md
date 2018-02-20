+++
author = ""
comments = true	# set false to hide Disqus
date = "2018-02-16T15:52:40Z"
draft = false
image = "images/js-bg.jpg"
menu = ""		# set "main" to add this content to the main menu
share = true	# set false to hide share buttons
slug = "js-simple-masking-image-load"
tags = ["Javascript","VanillaJS","Masking","Lazy Load"]
title = "JS Simple Masking Image Load"
+++

I wanted to do something

```
if(document.querySelectorAll('.slick img')) {

  imagesLoaded( document.querySelectorAll('.slick img'), function( instance ) {

    instance.images.forEach(function(element) {
        if(element.isLoaded) {
          element.img.classList.add('loaded');
        }
    });

    // Catch any cloned Slick slide if there are any
    if(document.querySelector('.slick li.slick-cloned')) {
      document.querySelectorAll('.slick li.slick-cloned img').forEach(function(element) {
        element.classList.add('loaded');
      });
    }

  });
}


// CSS
.slick li {
  background-color: #000000;
  background-image: url(../image/loading-image.svg);
  background-position: center center;
  background-repeat: no-repeat;
}

.slick li img {
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.slick li img {
  opacity: 1;
}
```
