---
title: Clear Bash History Completely?
author: Fahad Ahammed
type: post
date: 2014-05-19T10:20:32+00:00
url: /clear-bash-history-completely/
categories:
  - Technology
tags:
  - clean bash history
  - What is Bash ?

---
If you have linux server or linux operating system(distribution) in your pc then you are using bash. Bash is a command processor and Unix Shell, typically run in a text window, allowing the user to type commands which cause actions. Bash can also read commands from a file, called a script. Bash keep records of executing commands and all. Sometimes if you want to clean all your records you can follow this.<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/bash_image.png"><img loading="lazy" class="aligncenter size-full wp-image-1466" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/bash_image.png?resize=660%2C416" alt="bash_image" width="660" height="416" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/bash_image.png?w=675&ssl=1 675w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/bash_image.png?resize=300%2C189&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" /></a>
</p>

`~/.bash_history` holds the history.

To clear the bash history completely on the server. You can open terminal and type

`cat /dev/null > ~/.bash_history`

Other alternative way is to link

`~/.bash_history` to `/dev/null`

On my Debian Wheezy box, The history comes back when I login back. I guess because the history entries has a copy in the memory and it will flush back to the file when you log out. The following command worked for me.

`cat /dev/null > ~/.bash_history && history -c && exit`

I think this will do the work. 🙂  
Thank You for reading and if it helps leave feedback.