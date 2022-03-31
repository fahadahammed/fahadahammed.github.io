---
title: How to Get Ubuntu Back after installing Windows ?
author: Fahad Ahammed
type: post
date: 2015-04-15T14:11:58+00:00
url: /how-to-get-ubuntu-back-after-installing-windows/
categories:
  - Technology
tags:
  - get back ubuntu after windows8
  - get back ubuntu after windows8.1
  - grub repair for ubuntu
  - grub repair ubuntu after windows
  - Ubuntu is lost after windows install
  - ubuntu removed by windows install
  - Windows installation removed my ubuntu

---
Whatever you say against Ubuntu, you can&#8217;t just make it less popular. It is the most popular Linux distribution. Many companies rely on this distribution. I personally use it on my laptop and in my servers. Normally people use windows, and when it comes to Linux it becomes a whole other matter. If someone use Ubuntu but later he wanted to install install latest windows or old alongside Ubuntu, he may face problem as loosing Ubuntu. That is what i am gong to explain &#8220;Ubuntu Recover Procedure&#8221;.<!--more-->

[<img loading="lazy" class="size-medium wp-image-2034 aligncenter" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/04/How_to_Get_Ubuntu_Back_after_installing_Windows-300x300.png?resize=300%2C300" alt="How_to_Get_Ubuntu_Back_after_installing_Windows" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/04/How_to_Get_Ubuntu_Back_after_installing_Windows.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/04/How_to_Get_Ubuntu_Back_after_installing_Windows.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/04/How_to_Get_Ubuntu_Back_after_installing_Windows.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />][1]

Ubuntu use &#8220;Grub&#8221; as boot manager(loader) but windows has different. A boot loader is a computer program that loads an operating system or some other system software for the computer after completion of the power-on self-tests; it is the loader for the operating system itself, which has its own loader for loading ordinary user programs and libraries. When Windows is installed it can&#8217;t recognize other Boot Loaders entries. That is why it generates a fresh menu where only Windows stays though Ubuntu is still there if that drive is not destroyed or formatted.

Recently one of my friend asked me how can he get back Ubuntu, that is why i wanted to keep a good reference on this for me and you too. 🙂

You will need a Ubuntu Bootable Pendrive. Boot from that. Determine the partition number of your Ubuntu main partition. GParted can help you here. I&#8217;m going to assume in this answer that it&#8217;s _/dev/sda3_, but make sure you use the correct partition number for your system!

Mount your partition:

<pre>sudo mount /dev/sda3 /mnt</pre>

Bind mount some other necessary stuff:

<pre>for i in /sys /proc /run /dev; do sudo mount --bind "$i" "/mnt$i"; done</pre>

chroot into your Ubuntu install:

<pre>sudo chroot /mnt</pre>

At this point, you&#8217;re in your install, not the live pendrive, and running as root. Update grub:

<pre>update-grub</pre>

Depending on your situation, you have to re-install grub. Normally grub is installed in _/dev/sda_ and that is the good way.

<pre>grub-install /dev/sda</pre>

Update grub:

<pre>update-grub</pre>

If everything worked without errors, then you&#8217;re all set:

<pre>exit
sudo reboot</pre>

At this point, you should be able to boot normally with your Ubuntu and also Windows with it by choosing from boot menu. Hope it works. You can ask me about things you face. Thanks for reading.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/04/How_to_Get_Ubuntu_Back_after_installing_Windows.png