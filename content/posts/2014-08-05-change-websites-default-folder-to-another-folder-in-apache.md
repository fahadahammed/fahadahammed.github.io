---
title: Change Websites Default Folder to Another Folder in Apache
author: Fahad Ahammed
type: post
date: 2014-08-05T07:41:06+00:00
url: /change-websites-default-folder-to-another-folder-in-apache/
classic-editor-remember:
  - classic-editor
categories:
  - Technology
tags:
  - apache
  - apache2
  - apache2 virtualhost or vhost configuration
  - websites default folder to anothe fodler

---
Apache is the most used server. It is used to serve more than half of all active websites. It will be very helpful to understand Apache. Understanding the configuration of virtual host of Apache is important as sometime it will be a tough job to do. I will show you how to set default folder of a website other than root directory of Apache.

<!--more-->

I assume you have your default apache directory is in **/var/www/** and you want to change that for a certain website.

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Change_Websites_Default_Folder_to_Another_Folder_in_Apache.png"><img loading="lazy" class="alignnone size-medium wp-image-2062" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Change_Websites_Default_Folder_to_Another_Folder_in_Apache-300x300.png?resize=300%2C300" alt="Change_Websites_Default_Folder_to_Another_Folder_in_Apache.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Change_Websites_Default_Folder_to_Another_Folder_in_Apache.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Change_Websites_Default_Folder_to_Another_Folder_in_Apache.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Change_Websites_Default_Folder_to_Another_Folder_in_Apache.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

Normally you will have to use folders inside **/var/www/** to get successful result but it will be nice to keep the site in other folder like **/home/domain.com/  
** 

<pre>&lt;VirtualHost *:80&gt;
DocumentRoot /home/domain.com/
ServerName domain.com
 ServerAlias www.domain.com
&lt;Directory /&gt;
 Options FollowSymLinks
 AllowOverride None
 &lt;/Directory&gt;

 &lt;Directory "/home/domain.com/"&gt;
 Options Indexes FollowSymLinks MultiViews
 AllowOverride None
 Require all granted
 &lt;/Directory&gt;
&lt;/VirtualHost&gt;</pre>

Above configuration will do the work. If it works or doesn&#8217;t work please let me know by leaving comment. Thank you.