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
image = ""
comments = true
menu = ""
title = "Drupal 7 Views Quicksand Workaround"
date = "2017-02-20T17:57:56Z"
draft = false
slug = "drupal-7-views-quicksand-workaround"

+++

Recently I've been working on a project at work, which needed to the use of Jquery Quicksand coupled with views to bring in and filter content. Each page when being created would be tag with a Taxomonoy Term to help define what the content is related to. The page needed links above the content which printed out each tag dynamically so the user could filter the content out.

Easy you say, download Views, BEF and Views Quicksand, mess around with it a bit and there you go...

Not that simple for me and my situation. Through some research I found Views Quicksand doesn't play well with the version of Better Exposed Filters we currently have and even then the dev version of BEF still needs to patch applied to get it to work. This too is also not an option as we have a Drupal platform that we build our sites on to. As most of the contrib modules we use are installed on the platform, this means I'm limited to what I can mess around with. I could make said changes to get one site working but... ultimately this could f**k up others along the way. Negatory.

In which case I needed to find the best way (the best in my mind anyway) to get this working.

So with some test content added use the Taxomonoy Term tagging, I created a View page bring in the content.

<image>

I added the filters of Content Type and added the Taxomonoy Term, apply it as an exposed filter.
