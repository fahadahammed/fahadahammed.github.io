---
title: How to Add and Switch Keyboard Layout in LXDE ?
author: Fahad Ahammed
type: post
date: 2014-05-20T03:13:59+00:00
url: /how-to-add-and-switch-keyboard-layout-in-lxde/
categories:
  - Technology
tags:
  - Change keyboard layout in lubuntu
  - change keyboard layout in lxde
  - Keyboard layout problem in lubuntu or lxde

---
Lubuntu is good. Actually LXDE is good. I love its simplicity. One tricky thing is though **how to add a keyboard layout on Lubuntu/LXDE** (if you didn&#8217;t specify an additional language at installation).  To configure keyboard layouts a big flaw of LXDE. So here is what I did to add a new keyboard layout.<!--more-->

&nbsp;

### 1. Add a layout indicator to the panel

[<img loading="lazy" class="aligncenter wp-image-1476" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-1.png?resize=660%2C548" alt="" width="660" height="548" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-1.png?w=891&ssl=1 891w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-1.png?resize=300%2C249&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]

&nbsp;

[<img loading="lazy" class="aligncenter wp-image-1477" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-2.png?resize=660%2C372" alt="" width="660" height="372" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-2.png?w=767&ssl=1 767w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-2.png?resize=300%2C169&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][2]

&#8211; Right click on the Panel

&#8211; Add/Remove panel items

&#8211; Add

&#8211; Select &#8220;Keyboard Layout Switcher&#8221;

A switcher will be added to the panel, in Panel Applets you can choose the position for the switcher you like.

### 2. Next is to add a new layout

For example, I need Bangla. This will be done by editing a configuration file.

Run:

<pre>gksu leafpad /etc/xdg/lxsession/LXDE/autostart</pre>

Enter your administrative password to open up the document with root privileges. Then scroll down and add the following line (in new line):

<pre>@setxkbmap -option grp:switch,grp:alt_shift_toggle,grp_led:scroll us,<strong>bd</strong></pre>

Save file.

### 3. Logout and relogin.

Press alt+shift to see whether the layout changes or not. Also you can just click on panel layout icon to change the layout. It should change.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-1.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/lxde_layout_image-2.png