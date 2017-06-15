+++
draft = false
comments = true
share = true
date = "2017-06-15T11:29:13+01:00"
title = "Database Import Via Drush"
menu = ""
author = ""
slug = "database-import-via-drush"
tags = [
  "Drupal",
  "Drush",
  "Database",
  "SQL"
]
image = ""

+++

A small command but this has come into it's own quite recently for me. Saves time having to import databases via MySQL each time.


```
$ drush sql-cli < ~/my-sql-dump-file-name.sql
```
