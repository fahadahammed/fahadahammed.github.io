---
title: Server Read Only By “fstab” and Rescue It
author: Fahad Ahammed
type: post
date: 2013-11-15T11:44:19+00:00
url: /server-read-only-by-fstab-and-rescue-it/
categories:
  - Technology
tags:
  - fstab
  - kvm
  - ssh readonly files in server
  - ssh readonly files to fix
  - systemrescue
  - ubuntu

---
As you are reading this post i can assume you are the victim of server system read-only. It happens when you messed up your fstab. But you can&#8217;t re-edit the /etc/fstab file as your system is in read-only state now. So what to do ? You need a<!--more-->distribution called 

<a href="http://www.sysresccd.org/SystemRescueCd_Homepage" target="_blank">SystemRescueCD</a> in your system mounted. Ask your provider for this if you don&#8217;t have in your VPS/Server Panel. Better use Boot order as CD room first.

After connecting by VNC you will see below screen and you will have to select first option.

[<img loading="lazy" class="aligncenter size-full wp-image-860" alt="rcd-1" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-1.png?resize=632%2C469" width="632" height="469" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-1.png?w=632&ssl=1 632w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-1.png?resize=300%2C223&ssl=1 300w" sizes="(max-width: 632px) 100vw, 632px" data-recalc-dims="1" />][1]You will be asked for keymap where you should chose default one or just press enter. Now you will see a screen like below.

[<img loading="lazy" class="aligncenter size-full wp-image-861" alt="rcd-2" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-2.png?resize=660%2C345" width="660" height="345" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-2.png?w=723&ssl=1 723w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-2.png?resize=300%2C157&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][2]Run below command to know the exact drive which you use and became read-only.

<pre>fsarchiver probe detailed</pre>

You will see some drives information there like mine one. I installed my OS in ext4. So my OS &#8220;/&#8221; is in <span style="color: #ff0000;"><strong>/dev/vda2</strong></span>

[<img loading="lazy" class="aligncenter size-full wp-image-862" alt="rcd-3" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-3.png?resize=660%2C195" width="660" height="195" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-3.png?w=715&ssl=1 715w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-3.png?resize=300%2C89&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][3]

Now mount the partition with /etc/fstab in it.

<pre>mount <span style="color: #ff0000;"><strong>/dev/vda2</strong></span> <strong>/mnt</strong></pre>

Your VPS drives are mounted at **/mnt** in SystemRescueCD live.

Now access the directory.

<pre>cd /mnt
ls /mnt</pre>

Now edit /mnt/etc/fstab with an editor according to the faults.

<pre>nano /mnt/etc/fstab</pre>

now un-mount the partition.

<pre>umount <strong>/mnt</strong></pre>

Now just reboot the system by changing boot order to harddisk only and you will be able to access your files and folders by ssh.

<p style="text-align: center;">
  <strong>Thank You.</strong>
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-1.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-2.png
 [3]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/11/rcd-3.png