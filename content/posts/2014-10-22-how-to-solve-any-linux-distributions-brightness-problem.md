---
title: How To Solve Any Linux Distributions Brightness Problem ?
author: Fahad Ahammed
type: post
date: 2014-10-22T08:42:46+00:00
url: /how-to-solve-any-linux-distributions-brightness-problem/
categories:
  - Technology
tags:
  - Brightness control not working in ubuntu
  - Brightness not changing in Ubuntu
  - Brightness not controllable in Debian
  - Brightness problem in ubuntu
  - Change Brightness of My Laptop in Debian
  - Change Brightness of My Laptop in Linux
  - Change Brightness of My Laptop in Ubuntu

---
I have **Acer Aspire 5733** and i couldn&#8217;t change brightness of my laptop. This is annoying and painful. I have tried many things to do this but couldn&#8217;t solve it as there is no linux graphics driver. At last i have found a solution and i have written an script which will be helpful for you.<!--more-->

&nbsp;

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/10/How_To_Solve_Any_Linux_Distributions_Brightness_Problem.png"><img loading="lazy" class="alignnone size-medium wp-image-2045" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/10/How_To_Solve_Any_Linux_Distributions_Brightness_Problem-300x300.png?resize=300%2C300" alt="How_To_Solve_Any_Linux_Distributions_Brightness_Problem.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/10/How_To_Solve_Any_Linux_Distributions_Brightness_Problem.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/10/How_To_Solve_Any_Linux_Distributions_Brightness_Problem.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/10/How_To_Solve_Any_Linux_Distributions_Brightness_Problem.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

To get that script just <a title="Brightness Shell Script" href="https://obakfahad.com/extras/brightness.sh" target="_blank">click here</a> to download or just run below code.

<pre>wget --no-check-certificate https://obakfahad.com/extras/brightness.sh -O brightness.sh;chmod a+x brightness.sh;bash brightness.sh</pre>

Or you can just read through the codes from below.

<pre>#!/bin/bash
PMAM=`date +%p`;

if [[ "$PMAM" = PM ]]; then
echo "It is `date +%p`."
echo ".................................."
TIME=`date +%H%M`

if (( "$TIME" &gt;= 0000 ));then
  echo "It is `date +%T%p`. So brightness should be 70%."
  `xrandr --output LVDS1 --brightness 0.7`
fi
if (( "$TIME" &gt;= 1300 ));then
  echo "It is `date +%T%p`. So brightness should be 70%."
  `xrandr --output LVDS1 --brightness 0.7`
fi
if (( "$TIME" &gt;= 1700));then
  echo "It is `date +%T%p`. So brightness should be 60%."
  `xrandr --output LVDS1 --brightness 0.6`
fi
if (( "$TIME" &gt;= 1830));then
  echo "It is `date +%T%p`. So brightness should be 50%."
  `xrandr --output LVDS1 --brightness 0.5`
fi


fi


if [[ "$PMAM" = AM ]]; then
echo "It is `date +%p`"
echo ".................................."
TIME=`date +%H%M`

if (( "$TIME" &gt;= 0000 ));then
  echo "It is `date +%T%p`. So brightness should be 70%."
  `xrandr --output LVDS1 --brightness 0.5`
fi
if (( "$TIME" &gt;= 1300 ));then
  echo "It is `date +%T%p`. So brightness should be 70%."
  `xrandr --output LVDS1 --brightness 0.5`
fi
if (( "$TIME" &gt;= 1700));then
  echo "It is `date +%T%p`. So brightness should be 60%."
  `xrandr --output LVDS1 --brightness 0.5`
fi
if (( "$TIME" &gt;= 1830));then
  echo "It is `date +%T%p`. So brightness should be 50%."
  `xrandr --output LVDS1 --brightness 0.5`
fi
if (( "$TIME" &gt;= 2000));then
  echo "It is `date +%T%p`. So brightness should be 50%."
  `xrandr --output LVDS1 --brightness 0.6`
fi</pre>

You can save that by the name brightness.sh and change permission to execute.

<pre>chmod a+x brightness.sh</pre>

### Automatic Brightness:

You can use crontab to make it automatic.

<pre>*/5 * * * * bash /path/to/brightness.sh</pre>

It will now act as automatic brightness controller and also above cron will run every 5 minutes.

### Conclusion:

Linux and Unix-like operating system may change the default from /var/spool/cron/ to something else. Use the following as a guideline for your OS (assuming that user name is fahad):

  * Mac OS X &#8211; /usr/lib/cron/tabs/ (user cron location /usr/lib/cron/tabs/fahad)
  * FreeBSD/OpenBSD/NetBSD &#8211; /var/cron/tabs/ (user cron location /var/cron/tabs/fahad)
  * CentOS/Red Hat/RHEL/Fedora/Scientific Linux &#8211; /var/spool/cron/ (user cron location /var/spool/cron/fahad)
  * Debian / Ubuntu Linux &#8211; /var/spool/cron/crontabs/ (user cron location /var/spool/cron/crontabs/fahad)
  * HP-UX Unix &#8211; /var/spool/cron/crontabs/ (user cron location /var/spool/cron/crontabs/fahad)
  * IBM AIX Unix &#8211; /var/spool/cron/ (user cron location /var/spool/cron/fahad)

I hope this will be helpful for you. Leave comment for further question or if you have any suggestions. Thank You.