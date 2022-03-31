---
title: Linux File/Folder Search from Terminal
author: Fahad Ahammed
type: post
date: 2013-05-05T05:16:18+00:00
url: /linux-filefolder-search-from-terminal/
categories:
  - Technology
tags:
  - file search from terminal ubuntu
  - how to find a file or folder from terminal in linux ?
  - Linux File/Folder Search from Terminal
  - serach a file or directory from terminal

---
Sometimes we need to find file or folder . It is easy in graphical file manager . But in terminal you have to be tricky .<!--more-->

For search a file from whole system :

<pre>find / -type f -name "index.php"</pre>

For searching a file from a folder where you are in now :

<pre>find ./ -type f -name "index.php"</pre>

For searching a file from a specific folder :

<pre>find /etc/init.d/ -type f -name "index.php"</pre>

For searching a folder from whole system :

<pre>find / -type d -name "apache2"</pre>

For searching a folder from a folder where you are in now :

<pre>find ./ -type d -name "apache2"</pre>

For finding a folder from specific folder :

<pre>find /var/www/ -type d -name "blog"</pre>

<h4 style="text-align: center;">
  Thank You
</h4>