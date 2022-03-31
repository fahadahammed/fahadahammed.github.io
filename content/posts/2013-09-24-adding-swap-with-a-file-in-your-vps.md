---
title: Adding swap with a File in Your VPS
author: Fahad Ahammed
type: post
date: 2013-09-24T03:24:45+00:00
url: /adding-swap-with-a-file-in-your-vps/
categories:
  - Technology
tags:
  - get swap in digital ocean droplet
  - swap file
  - swap in DO
  - swap in droplets
  - swap in linux vps
  - swap space
  - swap space with a file in ubuntu

---
If you don’t have any additional disks, you can create a file somewhere on your filesystem, and use that file for swap space. Normally some vps providers don&#8217;t give swap. For those who has that type of vps will need this tutorial to get a swap to faster website or vps.

<!--more-->

Linux divides its physical RAM (random access memory) into chucks of memory called pages. Swapping is the process whereby a page of memory is copied to the preconfigured space on the hard disk, called swap space, to free up that page of memory. The combined sizes of the physical memory and the swap space is the amount of virtual memory available.

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/Adding_swap_with_a_File_in_Your_VPS.png"><img loading="lazy" class="aligncenter  wp-image-1677" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/Adding_swap_with_a_File_in_Your_VPS.png?resize=397%2C397" alt="Adding_swap_with_a_File_in_Your_VPS" width="397" height="397" data-recalc-dims="1" /></a>
</p>

I will show you by adding 1024mb or 1gb swap space. Put below commands to your terminal and press enter.

<pre>dd if=/dev/zero of=/swap bs=1M count=1024</pre>

by above command you are creating **1024mb** sized file naming swap which will be in **/** directory. If you change the **1024** number to whatever you want you will get that sized swap file. As **2048** for **2gb**.

Now give permission to that file to accessed only by root.

<pre>chmod 600 /swap</pre>

Now let us make swap.

<pre>mkswap /swap</pre>

Now enable the swap.

<pre>swapon /swap</pre>

Now let us activate this swap as enable in every boot. Edit /etc/fstab file.

<pre>nano /etc/fstab</pre>

And put below line there (end). Do not paste , just write word by word , use TAB button to write word after word.

<pre>/swap               swap                    swap    defaults        0 0</pre>

And save. Now reboot. And check if it is working or not.

<pre>swapon -s</pre>

And also by :

<pre>free -m</pre>

Now if you want to turn off / turn on swap then use :

For Turning OFF:

<pre>swapoff -a</pre>

For TURNING ON:

<pre>swapon -a</pre>

&nbsp;

<h2 style="text-align: center;">
  Thank You
</h2>