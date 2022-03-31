---
title: Bundle CSS to Load Page Faster
author: Fahad Ahammed
type: post
date: 2013-05-24T17:46:57+00:00
url: /bundle-css-to-load-page-faster/
classic-editor-remember:
  - classic-editor
categories:
  - Technology
tags:
  - bundle css
  - bundle css in wordpress to load faster
  - combine css file to one
  - combine css files to reduce request
  - faster webpage by bundling css
  - load webpages faster
  - optimize webpage by combining css files

---
A test with a simple HTML page over a DSL connection shows that one big stylesheet or css of 50 KB can speed up load time by factor 2 compared to five stylesheets that are 10 KB each in size:

  * 5 Stylesheets (10KB each): 1100ms
  * 1 Stylesheet (50KB): 500ms

So , How to make them one without breaking or editing them ? I am going to show you how to do this .<!--more-->

Let you have 5 Stylesheet or CSS :

  1. style1.css
  2. style2.css
  3. style3.css
  4. style4.css
  5. style5.css

Normally they are like this in your page :

<pre>&lt;link rel="stylesheet" href="css/style1.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style2.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style3.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style4.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style5.css" type="text/css" media="all"&gt;</pre>

Assuming those css files are in &#8220;css&#8221; folder .

Now create a php file where index.php is , naming &#8220;css.php&#8221; and put below codes :

<pre>&lt;?php
header('Content-type: text/css');
# File css.php
readfile("css/style1.css");
readfile("css/style2.css");
readfile("css/style3.css");
readfile("css/style4.css");
readfile("css/style5.css");
?&gt;</pre>

Save this file . And remove :

<pre>&lt;link rel="stylesheet" href="css/style1.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style2.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style3.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style4.css" type="text/css" media="all"&gt;
&lt;link rel="stylesheet" href="css/style5.css" type="text/css" media="all"&gt;</pre>

from your page and replace with :

<pre>&lt;link rel="stylesheet" type="text/css" href="css.php" /&gt;</pre>

And save that page . Now you can check by <a href="https://developers.google.com/speed/pagespeed/insights" target="_blank" rel="noopener">Google PageSpeed Insight</a> .