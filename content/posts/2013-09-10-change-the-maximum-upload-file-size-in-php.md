---
title: Change The Maximum Upload File Size in Php
author: Fahad Ahammed
type: post
date: 2013-09-10T02:42:57+00:00
url: /change-the-maximum-upload-file-size-in-php/
classic-editor-remember:
  - classic-editor
categories:
  - Technology
tags:
  - apache php upload file size
  - Change The Maximum Upload File Size in Php
  - max upload file size php
  - php upload file size
  - upload bigger sized file by changing php.ini
  - where is php.ini ?

---
This is annoying to get **file exceeds the max size allowed** when you try for uploading files. How can you be able to upload bigger files without any caution or error ? We have to find **php.ini** file from your system.

<!--more-->

From terminal run this code : (For Total work you have to be in su mood in terminal)

<pre>find / -type f -name php.ini</pre>

In my system i got this :

<pre>/etc/php5/fpm/php.ini
/etc/php5/apache2/php.ini
/etc/php5/cgi/php.ini
/etc/php5/cli/php.ini</pre>

Now keep backup of those every file . How ? Do this : (Copy full text and paste in terminal and press enter)

<pre>mkdir /home/phpbackup;cp /etc/php5/fpm/php.ini /home/phpbackup;cp /etc/php5/apache2/php.ini /home/phpbackup;cp /etc/php5/cgi/php.ini /home/phpbackup;cp /etc/php5/cli/php.ini /home/phpbackup</pre>

Now edit every **php.ini** file and search for :

**upload\_max\_filesize**

**post\_max\_size**

How to edit ? let you want to edit **/etc/php5/fpm/php.ini** just do this :

<pre>nano /etc/php5/fpm/php.ini</pre>

and find **upload\_max\_filesize** by **ctrl+w** and paste in the box . change the value as you desire . You have to give double size of **upload\_max\_filesize** in **post\_max\_size** .

[<img loading="lazy" class="size-full wp-image-689 aligncenter" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-1.png?resize=337%2C62" alt="php-1" width="337" height="62" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-1.png?w=337&ssl=1 337w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-1.png?resize=300%2C55&ssl=1 300w" sizes="(max-width: 337px) 100vw, 337px" data-recalc-dims="1" />][1][<img loading="lazy" class="size-full wp-image-688 aligncenter" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-2.png?resize=622%2C85" alt="php-2" width="622" height="85" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-2.png?w=622&ssl=1 622w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-2.png?resize=300%2C41&ssl=1 300w" sizes="(max-width: 622px) 100vw, 622px" data-recalc-dims="1" />][2]Edit like that and save the file and restart apache2 .

<pre>service apache2 restart</pre>

<p style="text-align: center;">
  Thank You
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-1.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/php-2.png