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

I was messing with different ways of implementing forms of load masking and came across the site <a href="" title="imagesLoaded JavaScript is all like "You images done yet or what?""" target="_blank">imagesLoaded</a>

So decided to have a little play about.

First I programmatically add the JS' needed to get this to work.

```
function theme_preprocess_page(&$vars) {

  // Implement Simple image load masking
  drupal_add_js("https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js", array('scope' => 'header', 'type' => 'external', 'weight' => -1));
  drupal_add_js(drupal_get_path('module', 'theme') . '/js/image-lazy-load.js', array('scope' => 'footer', 'weight' => 1, 'preprocess' => FALSE));

}
```


I added a few additional options when adding the JS via drupal_add_js.

I wanted to add a class to every image on the page so I could hide it whilst it loads in the background

```
drupal_add_js(var imgs = document.querySelectorAll(\'img\');for (var i = 0; i < imgs.length; i++) {imgs[i].className += \'lazy-load\';}', array('scope' => 'footer', 'type' => 'inline', 'weight' => 0));
```

Next I wrote some VanillaJS to check the each image to see if it's loaded, if so add a new class to make the image display

```
if(document.querySelectorAll('img')) {

  imagesLoaded( document.querySelectorAll('img'), function( instance ) {

    var eachInstance = instance.images;
    for (var a = 0; a < eachInstance.length; a++) {
      if(eachInstance[a].isLoaded) {
        eachInstance[a].img.className += ' loaded';
        eachInstance[a].img.parentElement.className += 'remove-loading';
      }
    }

  });
}


// CSS
li {
  background-color: #000000;
  background-image: url(../image/loading-image.svg);
  background-position: center center;
  background-repeat: no-repeat;
}

li.remove-loading {
  background-color: transparent;
  background-image: none;
}

li img.lazy-load {
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

li img.lazy-load.loaded {
  opacity: 1;
}
```

I also added a extra step after the image had loaded it adds an extra class to the parentElement to remove the loading styling.
