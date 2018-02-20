+++
slug = "drupal-getlocations-map-resize"
menu = ""
image = "images/drupal-bg.jpg"
share = true
author = ""
comments = true
draft = false
title = "Drupal Getlocations Map Resize"
date = "2017-08-05T15:33:09+01:00"
tags = [
  "Drupal",
  "Get Locations",
  "Google Maps",
  "Map Resize"
]

+++
I've found recently that Google Maps doesn't play well within tabbed content.

Google's T&C demands that the map be visible at all times, if their software detects that the map request is hidden then it aborts the load which looks like what is happening with this.

To fix this we will need to trigger the resize event when you click on the tab.

Easy enough but when using Drupal and the module Getlocations we need make sure the JS including the resize is being called after the Getlocation JS, which is initialising the Google Map.

```
// First check there is a tab
if($('.tab-to-show-google-map').length > 0) {
  // when the tab is clicked fire of the resize to update the map
  $('#used-vehicle-map').click(function(e) {
    var key = 'key_2';
    var center = getlocations_map[key].getCenter();
    google.maps.event.trigger(getlocations_map[key], "resize");
    getlocations_map[key].setCenter(center);
  });
}
```
