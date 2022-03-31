---
title: How to create a ramdisk?
author: Fahad Ahammed
type: post
date: 2021-09-16T18:04:45+00:00
url: /how-to-create-a-ramdisk/
featured_image: /wp-content/uploads/2021/09/pexels-photo-2588757-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - create ramdisk
  - linux
  - ramdisk

---
Whether you have SSD with NVME Protocol or good old HDD, It is not going to make you feel superior than your Random Access Memory or RAM.

By creating a **ramdisk**, you can use your unused memory as a super fast disk space and work with it. I do need to use **nginx** and for caching, I always go to **tmpfs** which is filesystem type that typically uses ram. How do I create one?

<!--more-->

Processes are &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">sudo mkdir /tmp/myramdisk
sudo chmod 777 /tmp/myramdisk</pre>

**Fstab** entry &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">myramdisk  /tmp/myramdisk  tmpfs  defaults,size=1G,x-gvfs-show  0  0</pre>

Now, every boot, there will be a **ramdisk** named **myramdisk** for you. By the way, mount with _mount -a_

Thank you for reading this. This is kind of a journal.