---
title: Dual User Permission at Same Folder in Linux
author: Fahad Ahammed
type: post
date: 2014-05-10T17:32:19+00:00
url: /dual-user-permission-at-same-folder-in-linux/
categories:
  - Technology
tags:
  - access a folder with several user in linux
  - same folder but several user
  - same folder but several user read write access
  - ubuntu fodler permission for 2 or more users

---
It is a pain to handle folder permission for new linux users or VPS users. Even some Pro-Linux users also face this problem. However, I will explain here how to give two users to read-write access of a same folder.

<!--more-->

Lets start. (Every Command need to execute by root or super user or sudo)

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/Folder-System-icon.png"><img loading="lazy" class="aligncenter size-medium wp-image-1409" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/Folder-System-icon-300x300.png?resize=300%2C300" alt="Folder-System-icon" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/Folder-System-icon.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/Folder-System-icon.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/Folder-System-icon.png?w=512&ssl=1 512w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

First Create Two User if you don&#8217;t have already.

<pre>adduser user1</pre>

<pre>adduser user2</pre>

Now as you have two user **user1** and **user2** , you need to create a group which will be a common for both of them.

<pre>addgroup group12</pre>

Now, you need to add the users to this group.

<pre>adduser user1 group12</pre>

<pre>adduser user2 group12</pre>

To test if those users are added to that group or not by below command.

<pre>groups user1</pre>

<pre>groups user2</pre>

If you see that group **group12** then all ok.

Now, you need to create folder.

<pre>mkdir /root/folder</pre>

By default it will created by user **root** and group **root**. But Now we need to change this folders group.

<pre>chown -R root.group12 /root/folder</pre>

Now you will need to give that group to read-write access of that folder including create folders,files etc.

<pre>chmod -R g+rwx /root/folder</pre>

Now those users will be able to read and write inside that folder.