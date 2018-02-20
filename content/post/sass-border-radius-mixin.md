+++
tags = [
  "Sass",
  "Mixin",
  "Front End"
]
slug = "sass-border-radius-mixin"
draft = false
image = "images/sass-bg.jpg"
date = "2017-03-19T09:19:51+01:00"
title = "Sass Border Radius Mixin"
menu = ""
author = ""
comments = true
share = true

+++

I love a good Sass mixin and there are some very nice mixins out there to use.

One mixin for border radius though, I find is a bit blotted. Other mixins for border radius I've found are always split into five different mixins and you have to @include each one.

So I written this little mixin to deal with all the values for border radius, including prefixes, all within one call.


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

// Single value for all corners
@include border-radius(5px);

// Different values for each corner
@include border-radius(10px 3px 5px 0);

```
