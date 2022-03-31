---
title: Single Command to Download and Install All Bangla Fonts in Your Linux
author: Fahad Ahammed
type: post
date: 2014-01-15T13:37:06+00:00
url: /single-command-to-download-and-install-all-bangla-fonts-in-your-linux/
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - AdorshoLipi_20-07-2007.ttf
  - akaashnormal.ttf
  - all bangla fonts instant download for your ubuntu linuxmint netrunner kororaa
  - AponaLohit.ttf
  - bangla fonts for kali linux
  - bangla fonts for netrunner
  - Bangla.ttf
  - BenSen.ttf
  - Charu Chandan
  - charu chandan for ubuntu linux
  - charuchandan bangla font
  - get all bangla font in your Linux
  - get All bangla fonts
  - get Bangla fonts for Ubuntu
  - kalpurush_ANSI.ttf
  - kalpurush.ttf
  - Lohit_14-04-2007.ttf
  - mitra.ttf
  - Mukti_1.99_PR.ttf
  - muktinarrow.ttf
  - Nikosh.ttf
  - NikoshBAN.ttf
  - NikoshGrameen.ttf
  - NikoshLight.ttf
  - NikoshLightBan.ttf
  - Noto Sans Bengali
  - One Click bangla font installer ubuntu
  - One Click font installer ubuntu
  - sagarnormal.ttf
  - scripts
  - Siyam Rupali ANSI.ttf
  - SolaimanLipi_20-04-07.ttf
  - SutonnyMJ.ttf
  - Vrinda.ttf

---
I have created a script which will download and install 70 Bangla fonts(with variations of them) without searching. Just run this script in your Linux based PC/Laptops terminal and get all Bangla fonts instantly without hassle.

<!--more-->

<div class="wp-block-image">
  <figure class="aligncenter"><a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/bash_fonts_image.png"><img loading="lazy" width="660" height="472" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/bash_fonts_image.png?resize=660%2C472" alt="bash_fonts_image" class="wp-image-1469" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/bash_fonts_image.png?w=696&ssl=1 696w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/bash_fonts_image.png?resize=300%2C215&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" /></a></figure>
</div>

<figure class="wp-block-table is-style-regular">

<table>
  <tr>
    <td>
      AdorshoLipi_20-07-2007.ttf<br />akaashnormal.ttf<br />AponaLohit.ttf<br />Bangla.ttf<br />BenSen.ttf<br />kalpurush.ttf<br />kalpurush_ANSI.ttf<br />Lohit_14-04-2007.ttf
    </td>
    
    <td>
      mitra.ttf<br />Mukti_1.99_PR.ttf<br />muktinarrow.ttf<br />NikoshBAN.ttf<br />NikoshGrameen.ttf<br />NikoshLightBan.ttf<br />NikoshLight.ttf<br />Nikosh.ttf<br />
    </td>
    
    <td>
      sagarnormal.ttf<br />Siyam Rupali ANSI.ttf<br />SolaimanLipi_20-04-07.ttf<br />SutonnyMJ.ttf<br />Vrinda.ttf<br />Charu Chandan<br />Noto Sans Bengali
    </td>
  </tr>
</table><figcaption>Fonts that LBFI can give you !</figcaption></figure> 

**<span style="color: #800000;">How To:</span>** Now open your terminal copy full line and paste in your terminal and press enter. And after some time you will see that all fonts are downloading and installing without any hassle. 🙂

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ pip3 install --upgrade lbfi
$ lbfi --install yes</pre>

If it doesn&#8217;t work, try below one:

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ wget --no-check-certificate https://raw.githubusercontent.com/fahadahammed/linux-bangla-fonts/master/font.sh -O font.sh;chmod +x font.sh;bash font.sh;rm font.sh</pre>

If it also doesn&#8217;t work, try below one:

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ wget --no-check-certificate https://raw.githubusercontent.com/fahadahammed/linux-bangla-fonts/master/dist/lbfi -O lbfi;chmod +x lbfi;./lbfi</pre>

_**Upgrade 2018-03-15:** Edited the script for further update mechanisms and added some new fonts._

_**Upgrade 2019-02-05:**&nbsp;Added support for Ubuntu-18.04 and also checked some cases to handle. This script now will not work on CentOS or Fedora or RHEL, I have to work on this part._

_**Upgrade 2019-10-29:** Added new script_

**Upgrade 2021-03-31:** Added a pypi project, thus new install script

Fonts are collected from different sources. Fonts are hard work of the creators. Respect their work.

I have tested the script only from Debian Based Distributions Like Debian itself, Ubuntu, Linux Mint, Kali, Netrunner etc. I hope it will also work on RPM based Distributions like Fedora, OpenSuse, Mandriva, CentOS etc. It should also work with others&nbsp; like Archlinux.

If you want to contribute then use:&nbsp;

1. <https://github.com/fahadahammed/linux-bangla-fonts>

2. <https://github.com/fahadahammed/lbfi>

Please leave feedback about it is working or not. Thank you.