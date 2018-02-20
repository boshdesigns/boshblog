+++
comments = true
author = ""
date = "2017-08-11T16:50:26+01:00"
title = "Extra Drupal Body Classes"
tags = [
  "Drupal",
  "Template",
  "HTML",
  "CSS"
]
share = true
image = "images/drupal-bg.jpg"
menu = ""
slug = "extra-drupal-body-classes"
draft = false

+++
You can programmatically add extra classes to the body tag via the themes template.php.

```
function themename_preprocess_html(&$variables) {
  // Add a extra class to the body element
  $variables['classes_array'][] = 'body__bg-color';
}
```
