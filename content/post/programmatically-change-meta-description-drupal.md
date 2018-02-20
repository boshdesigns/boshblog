+++
draft = false
image = "images/drupal-bg.jpg"
share = true
author = ""
date = "2017-05-01T15:36:17+01:00"
title = "Programmatically Change Meta Description Drupal"
slug = "programmatically-change-meta-description-drupal"
menu = ""
comments = true
tags = [
  "Drupal",
  "Metatags",
  "Template"
]

+++

```
function themename_html_head_alter(&$head_elements) {
  $head_elements['metatag_description_0']['#value'] = t('This is my new meta description');
}
```
