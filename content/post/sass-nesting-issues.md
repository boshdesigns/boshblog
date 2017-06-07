+++
comments = true
date = "2017-04-15T10:39:21+01:00"
tags = [
  "Sass",
  "Nesting",
  "Guidelines"
]
menu = ""
author = ""
draft = false
slug = "sass-nesting-issues"
image = ""
title = "Sass Nesting Issues"
share = true

+++

I have my issues with the nesting ability within Sass and how it is used in some cases.

When I first started using Sass nesting I thought it was the best thing since sliced bread. Using it more and more and over time I started to notice that the code I was writing, through the use of nesting, was starting to become messy and complicated.

Nesting is great and on the face of it, it looks like it's time saving compared to writing normal CSS code. Which it is, to a point. You can created multiple styles without copying the same class name to each. But where you save time the complexity ramps up.

Here is an example of the Foundation Top Bar SCSS file, which I and the rest of the my team use to drop into a project for basic styling.
```
.top-bar {
  #main-menu {
    .menu-icon {
      padding-right: 15px;
    }

    @media #{$large-up} {
      display: table;
      width: 100%;

      & > li {
        display: table-cell;
        float: none;
        text-align: center;

        .menu-icon {
          padding-top: 8px;
          padding-bottom: 8px;
        }

        a {
          height: $topbar-height;
          &:hover,
          &.active {
            background-color: $topbar-link-bg-hover;
            border-bottom-color: #c30001;
            border-bottom-style: solid;
            border-bottom-width: 3px
          }
        }
      }
    }
  }
}
```


When referring to <a href="https://sass-guidelin.es/#selector-nesting" title="Sass Guidelines" target="_blank">Sass Guidelines</a> and comparing the code to the guidelines I notice several problems.

Firstly, the amount of levels this code is nested is far to many. At it's most is nested 6 times.

"To prevent such situations, we talked a lot about the Inception rule a few years back. It advised against nesting more than 3 levels deep, as a reference to the movie Inception from Christopher Nolan. I would be more drastic and recommend to avoid selector nesting as much as possible."

Don't break the Inception Rule. Look how the film turned out.

Lastly the guidelines suggests,

"I would be more drastic and recommend to avoid selector nesting as much as possible"

but with the exception of pseudo-classes and pseudo-elements,

"it is allowed and even recommended to nest pseudo-classes and pseudo-elements within the initial selector."

So in which case, perhaps the above Sass code should really look something like this:


```
.top-bar #main-menu .menu-icon {
  padding-right: 15px
}
@media #{$large-up} {
  .top-bar #main-menu {
    display: table;
    width: 100%;
  }
  .top-bar #main-menu .menu-icon {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .top-bar #main-menu > li {
    display: table-cell;
    float: none;
    text-align: center;
  }
  .top-bar #main-menu > li a {
    height: $topbar-height;
    &:hover,
    &.active {
      background-color: $topbar-link-bg-hover;
      border-bottom-color: #c30001;
      border-bottom-style: solid;
      border-bottom-width: 3px
    }
  }
}
```

Not only is this less lines of code, it seems more logical for other developers to read and at it's maximum is nested 3 levels.



**Final Thought**

As the word 'guidelines' implies these aren't strict rules. If a team of developers (like the team I work within) all agree to nesting heavily I don't see the harm.
But in this lies and issue where, what makes sense to one developer might not to another thus complicating things.
