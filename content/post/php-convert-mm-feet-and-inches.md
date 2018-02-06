+++
author = ""
slug = "php-convert-mm-into-feet-and-inches"
date = "2018-02-06T17:06:31Z"
comments = true
share = true
menu = ""
title = "PHP Convert mm into Feet and Inches"
tags = [
  "PHP",
  "Measurement Conversion",
]
image = "images/php-bg.jpg"
draft = false

+++
I had to write a little bit of PHP to convert mm into feet and inches.

```
$mm_value = 2590.00;

$convert_to_metres = floor($mm_value) / 1000;
$convert_to_inches = $convert_to_metres * 39.3701;
$feet_value = floor( $convert_to_inches / 12 );
$inches_value = ( $convert_to_inches % 12 );

print $feet_value . '\' ' . $inches_value . '"';
```

Should give you 8' 5" ;)
