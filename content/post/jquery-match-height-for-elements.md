+++
tags = [
  "JQuery",
  "Match Height",
  "HTML"
]
comments = true
author = ""
slug = "jquery-match-height-for-elements"
menu = ""
draft = false
title = "JQuery Match Height For Elements"
share = true
date = "2017-06-01T14:52:41+01:00"
image = "images/js-bg.jpg"

+++

I needed to match the height of multiple div's that contained an image and text, but the amount of text was never a set amount.

I've created a fiddle for this. <a href="https://jsfiddle.net/shinyash/fywg0nzq/" title="JSFiddle JQuery Match Height For Elements" target="_blank">See it here</a>

```
// Fire the function on window resize
$(window).on('resize',matchHeight);

// Set up function
function matchHeight() {

	// If the window width is tablet or desktop
   if ($(window).width() > 767 ) {

      // Reset the height for resize
      $('.news-box p').css('height','auto');

      // Set a base value
      var setHeight = -1;

		// Work out the height
      $('.news-box p').each(function() {
         setHeight = setHeight > $( this ).height() ? setHeight : $( this ).height();
      });
		// Set the height
      $('.news-box p').each(function() {
         $( this ).height(setHeight);
      });
   }
   else if ($(window).width() < 767) {

   	// Set height to auto if mobile veiw
      $('.news-box p').css('height','auto');
   }
}matchHeight();
```
