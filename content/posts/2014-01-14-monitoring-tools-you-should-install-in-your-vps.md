---
title: Monitoring Tools You Should Install in Your VPS
author: Fahad Ahammed
type: post
date: 2014-01-14T04:41:50+00:00
url: /monitoring-tools-you-should-install-in-your-vps/
categories:
  - Technology
tags:
  - how to monitor vps ?
  - how to use slurm to monitor vps
  - monitor myu vps by htop
  - tools to monitor my vps
  - vps monitoring tools

---
Monitoring server is very important. You can prevent many unwanted things by monitoring regularly. I am assuming that you own a VPS as you are reading this post. You are new happy owner of your personal VPS. So why don&#8217;t you take a look about some monitoring tools?<!--more-->I will show you how to monitor and what are the tools. I will first ask you to install some tools by below command.

Ubuntu/Debian Base VPS:

<pre>apt-get update
apt-get install htop iftop nload slurm</pre>

Fedora/CentOS Base VPS:

<pre>yum update
yum install htop iftop nload slurm</pre>

### HTOP:

By HTOP you can get many information in one window. Just type &#8220;htop&#8221; in your terminal or SSH window like putty.[<img loading="lazy" class="aligncenter size-full wp-image-1086" alt="htop" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/htop.png?resize=660%2C445" width="660" height="445" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/htop.png?w=737&ssl=1 737w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/htop.png?resize=300%2C202&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]You can also get some useful informations by setting up as your need and also this colors are customizable.

### IFTOP:

This is the most powerful tool that will show you the every incoming and outgoing bytes including hostname and IP. Just type &#8220;iftop&#8221; in terminal or putty screen.[<img loading="lazy" class="aligncenter size-full wp-image-1087" alt="iftop" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/iftop.png?resize=660%2C526" width="660" height="526" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/iftop.png?w=815&ssl=1 815w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/iftop.png?resize=300%2C239&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][2]

### NLOAD:

This tool is interactive Upload/Download monitoring tool. Just type &#8220;nload&#8221;.

[<img loading="lazy" class="aligncenter size-full wp-image-1089" alt="nload" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/nload.png?resize=660%2C475" width="660" height="475" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/nload.png?w=807&ssl=1 807w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/nload.png?resize=300%2C216&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][3]

SLURM:

Slurm is another nice Bandwidth monitoring tool.

For KVM/XEN

slurm -i eth0

for OpenVZ

slurm -i venet0

[<img loading="lazy" class="aligncenter size-full wp-image-1090" alt="slurm" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/slurm.jpg?resize=660%2C378" width="660" height="378" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/slurm.jpg?w=708&ssl=1 708w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/slurm.jpg?resize=300%2C172&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][4]

These tools can help you to monitor your server. 🙂

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/htop.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/iftop.png
 [3]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/nload.png
 [4]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/slurm.jpg