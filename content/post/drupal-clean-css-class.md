+++
title = "Drupal Clean CSS Class"
tags = [
  "Drupal",
  "PHP",
]
image = "images/drupal-bg.jpg"
date = "2017-03-08T14:37:27+01:00"
menu = ""
comments = true
share = true
slug = "drupal-clean-css-class"
draft = false
author = ""

+++

A small function which has become a bit of a regular use is Drupal's Clean CSS Identifier.

"Prepares a string for use as a CSS identifier (element, class, or ID name)."

```
drupal_clean_css_identifier($identifier, $filter = array(' ' => '-', '_' => '-', '/' => '-', '[' => '-', ']' => ''));
```

This has become very handy in situations.
