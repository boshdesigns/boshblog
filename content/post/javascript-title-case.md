+++
draft = false
slug = "javascript-title-case-function"
image = "images/js-bg.jpg"
comments = true
share = true
menu = ""
author = ""
tags = [
  "Vanilla Javascript",
  "Javascript",
]
date = "2017-07-18T13:57:00+01:00"
title = "Javascript Title Case Function"

+++
I've been tinkering with VueJS lately and one function that I've been using a lot recently is this toTitleCase function.
Bring in dynamic content from an API results sometimes in text that I want to be a heading coming through as lowercase. So this little function with change it to title case for me.


```
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

toTitleCase("web design");

Result: Web Design
```

Theres also a little fiddle for this here. <a href="https://jsfiddle.net/shinyash/72ehs6na/" title="Javascript Title Case" target="_blank">See it here</a>
