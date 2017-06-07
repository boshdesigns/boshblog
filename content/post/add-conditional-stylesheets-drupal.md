+++
draft = false
title = "Add Conditional Stylesheets Drupal"
tags = [
  "Drupal",
  "Stylesheet",
  "Template"
]
comments = true
share = true
menu = ""
author = ""
date = "2017-04-10T15:27:12+01:00"
image = ""
slug = "add-conditional-stylesheets-drupal"

+++

If you ever need to add stylesheets based on old IE browsers this can be done via the template.php file with this function:

```
function themename_preprocess_html(&$variables) {
  // If it's IE8 add this Stylesheet
  drupal_add_css(path_to_theme() . '/css/ie-lte-8.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'lte IE 8', '!IE' => FALSE), 'preprocess' => FALSE));
}
```
