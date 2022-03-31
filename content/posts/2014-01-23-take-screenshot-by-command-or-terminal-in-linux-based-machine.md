---
title: Take Screenshot By Command or Terminal in Linux Based Machine
author: Fahad Ahammed
type: post
date: 2014-01-23T16:29:33+00:00
url: /take-screenshot-by-command-or-terminal-in-linux-based-machine/
classic-editor-remember:
  - classic-editor
categories:
  - Technology
tags:
  - Take screenshot by command in your ubuntu
  - Take screenshot in your Debian by terminal

---
Taking screenshot is now a days very important. This is used for many purpose like writing blog post, sharing problem facing in the system and much more things. There are many tools to take shot of your desktop but here i will show you how to take screenshot by terminal or command line interface in linux based machine.<!--more-->

Let, you want to take screenshot of full screen. Then copy below command and run in your terminal.

<pre>sleep 2; xwd -root | convert - capture.png</pre>

Above , **sleep 2** is just asking the command to wait 2 seconds. And capture.png is the screenshot file. This file will be created on the default folder.This command will capture full screen including the terminal you are using to take the shot.See the shot.

[<img loading="lazy" class="aligncenter size-large wp-image-1173" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms1.png?resize=625%2C350" alt="tms1" width="625" height="350" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms1.png?w=1366&ssl=1 1366w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms1.png?resize=300%2C169&ssl=1 300w" sizes="(max-width: 625px) 100vw, 625px" data-recalc-dims="1" />][1]You can click the big window to hide the terminal which you are using to take the screenshot.

[<img loading="lazy" class="aligncenter size-large wp-image-1174" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms2-1024x575.png?resize=625%2C350" alt="tms2" width="625" height="350" data-recalc-dims="1" />][2]Now if you want to take the screenshot of a particular window. Use below code.

<pre>xwd | convert - capture.png</pre>

Above command will show you a &#8220;+&#8221; icon and this will actually ask you to select the window. But if you chose the window below the terminal you are using for taking the shot will include the shadow of that window.

[<img loading="lazy" class="aligncenter size-full wp-image-1175" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms3.png?resize=657%2C386" alt="tms3" width="657" height="386" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms3.png?w=657&ssl=1 657w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms3.png?resize=300%2C176&ssl=1 300w" sizes="(max-width: 657px) 100vw, 657px" data-recalc-dims="1" />][3]But you can take time take the window in the front.

<pre>sleep 2;xwd | convert - capture.png</pre>

Above command will give you 2 second time to take the window to the front and then will show the &#8220;+&#8221; icon to select that window.

[<img loading="lazy" class="aligncenter size-full wp-image-1176" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms4.png?resize=657%2C386" alt="tms4" width="657" height="386" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms4.png?w=657&ssl=1 657w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms4.png?resize=300%2C176&ssl=1 300w" sizes="(max-width: 657px) 100vw, 657px" data-recalc-dims="1" />][4]

That is all for today. I have used LXDE version of Debian Wheezy in Virtualbox. This commands works with XORG. Let me know if it doesn&#8217;t work for you. Thank You for reading.

&nbsp;

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms1.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms2.png
 [3]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms3.png
 [4]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/tms4.png