+++
tags = [
  "JSfiddle",
  "JQuery",
  "HTML",
  "CSS",
  "Front End"
]
draft = false
comments = true
date = "2017-05-10T16:04:50+01:00"
image = "images/js-bg.jpg"
author = ""
title = "JQuery Opacity Image Based Scroll"
slug = "jquery-opacity-image-based-scroll"
share = true
menu = ""

+++

I had a recent project where the page title has a background image and said image was to fade as the user started scrolling down the page.

The JQuery code below is who I archive it but you can go my JSfiddle to see it in action:

<a href="https://jsfiddle.net/shinyash/k40amfty/" title="JSFiddle JQuery Opacity Image Based Scroll" target="_blank">Fiddle me this</a>

```
// Fade out the page title image as user scrolls
var fadeStart = 0; // 0 scroll or less will equiv to 1 opacity
var fadeUntil = 300; // 300px scroll or more will equiv to 0 opacity
var fading = $('.bg-img');

// bind a function to scroll
$(window).bind('scroll', function(){

	 // Get the window offset value
   var offset = $(window).scrollTop();
   // Set the opacity to 0
   var opacity = 0;

   // Based of the values of the offset, fadeStart + fadeUntil
   // Calculate the opacity
   if( offset<=fadeStart ) {
      opacity = 1;
   } else if( offset<=fadeUntil ) {
      opacity = 1 - offset/fadeUntil;
   }

   // apply the inline opcity to the element
   fading.css('opacity',opacity);
});
```
