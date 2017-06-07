+++
slug = "sass-mixin-list"
tags = [
  "Sass",
  "Mixin",
  "Front End",
  "Compass",
  "Bourdon"
]
title = "Sass Mixin List"
draft = false
author = ""
image = ""
share = true
date = "2017-03-13T09:37:48+01:00"
comments = true
menu = ""

+++

After my previous post for my border radius mixin I thought I would share my must commonly used mixins for projects.

First Transition
```
// Transition
@mixin transition($time) {
  -webkit-transition: all $time ease-in-out;
  -moz-transition: all $time ease-in-out;
  -o-transition: all $time ease-in-out;
  transition: all $time ease-in-out;
}
```

Transform and Rotate aren't mixins I commonly use a lot on their own but I use these together to create sashes to overlay images
```
// Transform
@mixin transform($transforms) {
  -moz-transform: $transforms;
  -o-transform: $transforms;
  -ms-transform: $transforms;
  -webkit-transform: $transforms;
  transform: $transforms;
}

// Rotate
@mixin rotate($deg) {
  @include transform(rotate(#{$deg}deg));
}
```

Background Gradient. Very handy with all the prefixes
```
// Background Gradient
@mixin gradient($top, $bottom) {
    background: $top; // Old browsers
    background: -moz-linear-gradient(top, $top 0%, $bottom 100%); // FF3.6+
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,$top), color-stop(100%,$bottom)); // Chrome,Safari4+
    background: -webkit-linear-gradient(top, $top 0%,$bottom 100%); // Chrome10+,Safari5.1+
    background: -o-linear-gradient(top, $top 0%,$bottom 100%); // Opera 11.10+
    background: -ms-linear-gradient(top, $top 0%,$bottom 100%); // IE10+
    background: linear-gradient(to bottom, $top 0%,$bottom 100%); // W3C
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=$top, endColorstr=$bottom,GradientType=0 ); // IE6-9
}
```

Font-Smoothing to equal out the font cross browsers
```
// Font-Smoothing
@mixin NORfont-smoothing($value: on) {
  @if $value == on {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  @else {
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: auto;
  }
}
```

Opacity which I use more often than I thought I did
```
// Opacity
@mixin NORopacity($alpha) {
  // First set multiple value for IE
  $ie-alpha: $alpha * 100;
  // IE 8
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=#{$ie-alpha})";
  // IE 5-7
  filter: alpha(opacity=$ie-alpha);
  // Netscape
  -moz-opacity: $alpha;
  // Safari 1.x
  -khtml-opacity: $alpha;
  // Good browsers
  opacity: $alpha;
}
```

And of course my Border Radius mixin
```
@mixin border-radius($list) {
  // if the list only has 1 value
  @if length($list) == 1 {
    -webkit-border-radius: $list;
    -moz-border-radius: $list;
    -ms-border-radius: $list;
    border-radius: $list;
  } @else {
    // if more then 1 value loop over the list
    @for $i from 1 through length($list) {
      // need to set up the vars first
      $topbottom: null;
      $leftright: null;
      @if $i == 1 or $i == 2 {$topbottom: top;} @else {$topbottom: bottom;}
      @if $i == 1 or $i == 4 {$leftright: left;} @else {$leftright: right;}
      @if nth($list, $i) > 1 {
        $value: nth($list, $i);
        -webkit-border-#{$topbottom}-#{$leftright}-radius: #{$value};
        -moz-border-radius-#{$topbottom}#{$leftright}: #{$value};
        border-#{$topbottom}-#{$leftright}-radius: #{$value};
      }
    }
  }
}
```

There are others I've used in the past but these are the must commonly used mixin I seem to use.

On a side note: You might ask why I don't just use Bourbon or Compass. Well It's down to personal preference really.
I use these common mixins, which isn't the biggest list to be fair. So to import a whole library seems a little overkill to me.
