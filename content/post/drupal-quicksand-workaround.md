+++
author = "ash"
tags = [
  "Drupal",
  "Jquery",
  "Jquery Quicksand",
  "Views",
  "Better Exposed Filters",
]
share = true
image = "images/drupal-bg.jpg"
comments = true
menu = ""
title = "Drupal 7 Views Quicksand Workaround"
date = "2017-02-20T17:57:56Z"
draft = false
slug = "drupal-7-views-quicksand-workaround"

+++

Recently I've been working on a project at work, which needed to the use of Jquery Quicksand coupled with Views to bring in and filter content. Each page when being created would be tagged with a Taxonomy Term to help define what the content is related to. The page needed links above the content which printed out each tag dynamically so the user could filter the content using the Jquery Quicksand animation.

Easy you say, download Views, BEF and Views Quicksand, mess around with it a bit and there you go...

Not that simple for me and my situation. Through some research I found Views Quicksand doesn't play well with the version of Better Exposed Filters we currently have and even then the dev version of BEF still needs a patch applied to get it to work. This too is also not an option as we have a Drupal platform that we build our sites on to. As most of the contrib modules we use are installed on the platform, this means I'm limited to what I can mess around with. I could make said changes to get one site working but... ultimately this could f**k up others along the way. Negatory.

In which case I needed to find the best way (the best in my mind anyway) to get this working.

And this is it:

So with some test content added, I used the Taxonomy Term tagging to tag each page with the correct term. I created a View page bring in the correct fields for my content.

<!--image-->

I added the filters of Content Type and added the Taxonomy Term, applying it as an exposed filter.
Lastly for the filters, I also added a contextual filter of the Taxonomy Term by node.

Next step, using the BEF, the exposed term filter can be changed to basic links.

<!--image-->

I included the Jquery Quicksand script from their website <a href="https://razorjack.net/quicksand/">https://razorjack.net/quicksand/</a>.

```
drupal_add_js(js/jquery-quicksand.js)
```

Views is printing each piece of content as li's and to each of these I need the HTML5 data-type with the value of the Taxonomy Term to allow for these to filter when the link is clicked on. So this meant bring the view_views_list.php.tpl local to my site and programmatically print these out.

```
$tid = $node->tid;
$term = taxonomy_term_load($tid);

<li data-type="<php print $term->name" ?>" ...and so on
```

This solved the data-type issue.

Here is the slight hacky part of my solution. I need to set up the BEF links to do certain things. I needed to disable the link so it went nowhere and add the class name of the Taxonomy Term to each link. Is was done via a theme hook in the template.php (though it could be put inside a custom feature).

```
function theme_select_as_links($variables) {

}
```

Last step was to create a custom Jquery function to fire off Quicksand.

And there you have it, my workaround. Probably not the cleanest way but it works and maybe this will help out someone doing thing similar. Leave a comment below if there are ways to improve this process.
