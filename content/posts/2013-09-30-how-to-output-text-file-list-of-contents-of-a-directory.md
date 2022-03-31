---
title: How to output text file list of contents of a directory?
author: Fahad Ahammed
type: post
date: 2013-09-30T18:05:44+00:00
url: /how-to-output-text-file-list-of-contents-of-a-directory/
categories:
  - Technology
tags:
  - How to output text file list of contents of a directory?
  - List Folder Contents to Text File

---
If you have a folder with huge contents and you want to get a list from them what will you do ? Write down one by one ? 😛

In Linux based distributions you can get a list by a simple command.

<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/How_to_output_text_file_list_of_contents_of_a_directory.png"><img loading="lazy" class="aligncenter  wp-image-1709" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/How_to_output_text_file_list_of_contents_of_a_directory.png?resize=412%2C412" alt="How_to_output_text_file_list_of_contents_of_a_directory" width="412" height="412" data-recalc-dims="1" /></a>
</p>

Open terminal. Go to your desired folder by cd command.

<pre>cd /your/folder/path/</pre>

Now if you want to get the list of that folder contents then you can simply get by below command.

<pre>ls &gt; file_list.txt</pre>

If you want to get a detailed list of that folder contents then use this.

<pre>ls -l &gt; file_list.txt</pre>

If you want to get a list of that folder contents with hidden ones then use this.

<pre>ls -a &gt; file_list.txt</pre>

If you want to get a detailed list of that folder contents with hidden ones then use this.

<pre>ls -la &gt; file_list.txt</pre>

If you want to get a list of that folder and all sub-folder contents then use this.

<pre>ls -R &gt; file_list.txt</pre>

If you want to get a detailed list of that folder and all sub-folder contents then use this.

<pre>ls -lR &gt; file_list.txt</pre>

If you want to get a detailed list of that folder and all sub-folder contents with hidden ones then use this.

<pre>ls -laR &gt; file_list.txt</pre>

<p style="text-align: center;">
  Thank You.
</p>