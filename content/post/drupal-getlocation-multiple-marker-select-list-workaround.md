+++
share = true
image = ""
title = "Drupal Getlocation Multiple Marker Select List Workaround"
date = "2017-12-07T11:23:58Z"
menu = ""
author = ""
draft = false
slug = "drupal-getlocation-multiple-marker-select-list-workaround"
tags = [
  "Drupal",
  "Getlocation",
  "Custom Module",
  "Jquery",
  "PHP",
]
comments = true

+++
I had recently been asked to implement a custom Google Map for a client in which there would be multiple markers for different locations, but also a select list of all the locations that the user can click on and the map in turn would focus on.

Now in my workplace, we use the Drupal GetLocation module to deal with any Google Maps on the sites. I did some some digging around, messing with views and (a lot) of searching on online and I couldn't figure out a way, via GetLocations, to achieve this. Feel free to comment below if anyone else has done this. I would love to know how you did it!

But anyway, I decided to find a workaround instead :)

Background:
So, the developer before me had already set up a block type which held information relating to each location. So this meant the info was already sorted.

I didn't want to use the Google Map settings supplied by GetLocations and wanted to use MaplaceJS instead.

MaplaceJS is a very nice plugin to embed a Google Map with a lot of extendable features one of them being select list locations.

Setting it up:
I used a custom feature already existing on the site to add everything. Within the .module file of the custom feature, I started by setting up hook_preprocess_page(&$vars). This had to used instead of _node because on one page several nodes could be printed for different sections. So any code a ran would be reiterated several times for each node on the page.

First in my _page function I add the CDN for MaplaceJS and also the .js file which I made within the custom feature to load MaplaceJS later.

```
// Add the necessary JS / CSS
drupal_add_js(drupal_get_path("module", "custom_feature") . '/js/custom.file.gmaps.js', array('scope' => 'footer'));
drupal_add_js("https://cdnjs.cloudflare.com/ajax/libs/maplace-js/0.2.10/maplace.min.js", 'external', array('scope' => 'footer'));
drupal_add_css(drupal_get_path("module", "custom_feature") . '/css/custom.file.gmaps.css');

// array('scope' => 'footer') will place the JS in to the footer of the site instead of the default header
```

I don't need to add the Google Maps API because that will already be there from GetLocations.

Next I set up the Nid variable to make sure this is the correct page, then grab all the information I need from bean blocks:

```
// Set up the NID
if ($node = menu_get_object()) { $nid = $node->nid; }

// Check the NID is there and it's 279
if (isset($nid) && !empty($nid) && $nid == 279) {

  // Add the nesscary JS / CSS
  drupal_add_js(drupal_get_path("module", "custom_feature") . '/js/custom.file.gmaps.js', array('scope' => 'footer'));
  drupal_add_js("https://cdnjs.cloudflare.com/ajax/libs/maplace-js/0.2.10/maplace.min.js", 'external', array('scope' => 'footer'));
  drupal_add_css(drupal_get_path("module", "custom_feature") . '/css/custom.file.gmaps.css');

  // Load the beans
  $load_beans = entity_load('bean');

}
```

Before I start handling the data I set up a quick little empty array in which I can push the info into. I use a foreach to loop of the results and do a first check, making sure the bean type is correct. Another check is made to make sure the Lat and Lons are there, if not then we'll skip it as there is no point including it. Finally I create an array for the data and array_push this to my empty array.

```
// Set up the array
$array = [];

// Do a foreach to get the info
foreach($load_beans as $bean) {
  // Make sure it's the correct type
  if($bean->type == 'correct_bean_type'){
    // Check the fields first
    if(isset($bean->bean_field['und'][0]['lat']) &&
       !empty($bean->bean_field['und'][0]['lat']) &&
       isset($bean->bean_field['und'][0]['lon']) &&
       !empty($bean->bean_field['und'][0]['lon'])) {
      // Push the data to the array above
      $array[] = array(
        'title' => ucwords(strtolower($bean->title)),
        'lat' => $bean->bean_field['und'][0]['lat'],
        'lon' => $bean->bean_field['und'][0]['lon'],
        'html' => '<span class="gmap--bubble"><h4>' . ucwords(strtolower($bean->title)) . '</h4>' . $bean->field_description['und'][0]['value'] . '</span><a class="button gmap-button" href="' . $bean->field_link['und'][0]['url'] . '" target="_blank">View Details</a>',
        'zoom' => 8,
      );
    }
  }
}
```

I now sort the array in alphabetical order

```
// Sort the array by the title
usort($array, function($a, $b) {
    return strcmp(strtolower($a['title']), strtolower($b['title']));
});
```

I now need to get this data into my custom.file.gmaps.js file. I used drupal_add_js settings feature to add the array to Drupal's global storage so JavaScript to access it.

```
// Make the array globally accessible
drupal_add_js(array('custom_feature' => array('array' => $array)), 'setting');
```

This meant I could now access the data within my custom.file.gmaps.js file with Drupal.settings.MyModule.varname. I now passed this into the call to MaplaceJS to indicate where each location is at.

```
(function ($) {

  $(window).load(function() {

    // Set up var with the array
    var LocA = Drupal.settings.custom_feature.array;

    // Fire off the MaplaceJS
    new Maplace({
      show_markers: true,
      locations: LocA,
      generate_controls: true,
      controls_on_map: false,
      controls_type: "list"
    }).Load();

  });

})(jQuery);
```

**Note: you may notice the call is wrapped in .load. I did this just to make sure that all scripts necessary for MaplaceJS to work are loaded before I try to initialise the map.

Now all that was needed was some styling to make it look presentable :)
