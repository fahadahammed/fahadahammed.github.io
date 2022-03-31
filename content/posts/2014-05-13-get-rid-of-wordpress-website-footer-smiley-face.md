---
title: Get Rid of WordPress Website Footer Smiley Face
author: Fahad Ahammed
type: post
date: 2014-05-13T08:46:32+00:00
url: /get-rid-of-wordpress-website-footer-smiley-face/
categories:
  - Technology
tags:
  - small smiley face in the bottom of wordpress site
  - Wordpress footer small smiley face

---
Me and also many people use WordPress to run website or blog. What is the most fascinating thing of WordPress ? Obviously its resources. It has so many plugins and themes that can make a simple WordPress website act like a super-platform. I am here to show you how to remove little smiley face on the bottom of Wordpres sites.

<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/smiley_face_prob.png"><img loading="lazy" class="aligncenter size-full wp-image-1421" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/05/smiley_face_prob.png?resize=174%2C201" alt="smiley_face_prob" width="174" height="201" data-recalc-dims="1" /></a>
</p>

You will have to follow my lead. Go to **Appearence => Editor** , It will by default open **style.css** file. You will have to scroll down to bottom of all the codes and then paste below code there and save it.

<pre>img#wpstats{display:none}</pre>

Now you will not see that smiley. If you still see it then open a recent unopened page or clear your browser cache or if you have caching plugins installed in your WordPress then you will need to clean the cache too or just wait for some times.

I think it works for you. But, question is why is that smiley and what is it ?

It is because of WordPress Jetpacks Stats work. That smiley ensures that stats are working and above solution will not hamper the stats. No tension. 🙂