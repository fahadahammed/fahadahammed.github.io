---
title: Pythons datetime of a timezone
author: Fahad Ahammed
type: post
date: 2021-03-31T05:04:09+00:00
url: /pythons-datetime-of-a-timezone/
featured_image: /wp-content/uploads/2021/03/pexels-photo-1178684-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
tags:
  - datetime with timezone and pytz
  - python datetime
  - timedelta
  - timezone conflict

---
In python, we can use **datetime** module from standard library for manipulating dates and times. From the documentation, we can say, date and time objects may be categorized as “aware” or “naive” depending on whether or not they include timezone information. How can we get a **datetime**?

<!--more--><figure class="wp-block-image size-large">

[<img loading="lazy" width="660" height="496" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?resize=660%2C496&#038;ssl=1" alt="brown hourglass on brown wooden table" class="wp-image-5362" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?w=1731&ssl=1 1731w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?resize=300%2C225&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?resize=1024%2C769&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?resize=768%2C577&ssl=1 768w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?resize=1536%2C1154&ssl=1 1536w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?w=1320&ssl=1 1320w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]<figcaption>Photo by Mike on <a href="https://www.pexels.com/photo/brown-hourglass-on-brown-wooden-table-1178684/" rel="nofollow">Pexels.com</a></figcaption></figure> 

There are several ways to do that.

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.now()</pre>

datetime acquired by this method is in a format like:

<pre class="wp-block-preformatted">'2021-03-30 14:53:47.118846'</pre>

It is naive, doesn&#8217;t have **timezone** information. What this now() does is taking local systems timezone to give the **datetime**. So, it does depend on the system it will be running on.

If somehow you forgot to check the timezone of the system, then it can cause a problem. Depending on the system is not always suggested. Obviously it depends on your choice.

By the way, you can also get defined datetime of a specific timezone.

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.utcnow()</pre>

It will give you the datetime of utc, always. You can also get datetime of utc with timezone in it.

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.now(datetime.timezone.utc)</pre>

<pre class="wp-block-preformatted">'2021-03-30 14:44:37.652991+00:00'</pre>

But you might want to always get the datetime of a specific timezone, not only UTC.

Thus, you can use &#8211;

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.now(tz=??)</pre>

Here you need to pass tzinfo, abstract base class for time zone info classes. For ease of use, I think you might want to get the timezone by mentioning the City. On that case, you need another module from pypi which is not built in, called <a rel="noreferrer noopener" href="https://pypi.org/project/pytz/" target="_blank">pytz</a>.

After importing pytz, you can then get datetime &#8211;

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.now(tz=pytz.timezone(<strong>"Asia/Dhaka"</strong>))</pre>

<pre class="wp-block-preformatted">'2021-03-30 21:00:16.877009+06:00'</pre>

This is good, but problem is you are depending on another library for the timezone. You can bypass this by using datetime itself to get the datetime with timezone in it of a preferred timezone. But you need to know the difference from UTC. As of my case, Asia/Dhaka is 6 hours ahead of UTC. So it is UTC+6. What I can do to get the similar datetime &#8211;

<pre class="wp-block-preformatted">&gt;&gt;&gt; datetime.datetime.now(tz=datetime.timezone(offset=datetime.timedelta(hours=6)))</pre>

Here I am using offset with timedelta of 6 hours to get the preferred datetime.

<pre class="wp-block-preformatted">'2021-03-30 21:04:35.772636+06:00'</pre>

Using `.now()` is suggested in python doc over `.utcnow()`.

So, if I summarize, for production, you always should check which timezone your code is using. Otherwise, you will fall into a chaos with data.

By the way, datetime is a very powerful module. I will post some unique queries which can be handled by datetime and it&#8217;s functions.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2021/03/pexels-photo-1178684.jpeg?ssl=1