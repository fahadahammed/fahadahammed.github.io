---
title: Squirrelmail Error With Ispconfig
author: Fahad Ahammed
type: post
date: 2013-10-06T02:49:06+00:00
url: /squirrelmail-error-with-ispconfig/
categories:
  - Technology
tags:
  - attachment problem squirrelmail
  - squirrelmail
  - 'SquirrelMail Error - Could not move/copy file. File not attached'
  - squirrelmail error attachment

---
If you have installed ispconfig by following <a title="http://www.howtoforge.com/" href="http://www.howtoforge.com/" target="_blank">http://www.howtoforge.com/</a>  then you have also installed squirrel mail. You may face attachment problem, Saying data directory is not writable. Here is the solution.

<!--more-->

[<img loading="lazy" class="aligncenter  wp-image-1835" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig.png?resize=446%2C446" alt="Squirrelmail_Error_With_Ispconfig" width="446" height="446" data-recalc-dims="1" />][1]

First in terminal run this command:

<pre>squirrelmail-configure</pre>

choose **4** (General Options) and press Enter.

Check the directories.

[<img loading="lazy" class="aligncenter  wp-image-1836" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig-Data_and_Attachment_Directory.png?resize=470%2C405" alt="Squirrelmail_Error_With_Ispconfig-Data_and_Attachment_Directory" width="470" height="405" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig-Data_and_Attachment_Directory.png?w=556&ssl=1 556w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig-Data_and_Attachment_Directory.png?resize=300%2C258&ssl=1 300w" sizes="(max-width: 470px) 100vw, 470px" data-recalc-dims="1" />][2]

Type &#8220;Q&#8221; to quit.

Now Check the user:group of data folder.

<pre>ls -la /var/lib/squirrelmail/data/</pre>

Use www-data (if you are using nginx and ispconfig and you don&#8217;t wanna give permission to any other vhost to access squirrelmail then you have to use ispconfig:ispconfig instead of www-data:www-data ).

<pre>chown -R www-data:www-data /var/lib/squirrelmail/data/</pre>

Now give read-write access.

<pre>chmod 733 -R /var/lib/squirrelmail/data/</pre>

Now create an attachment page in &#8220;/usr/share/squirrelmail/&#8221;

<pre>mkdir -p /usr/share/squirrelmail/attach</pre>

Set permission.

<pre>chmod 733 -R /usr/share/squirrelmail/attach</pre>

Now make sure you have created the &#8220;tmp&#8221; directory.

<pre>mkdir /var/lib/squirrelmail/tmp</pre>

and permission is set to &#8220;www-data&#8221; group.

<pre>chown www-data /var/lib/squirrelmail/tmp</pre>

Now restart nginx

<pre>service nginx restart</pre>

or Restart Apache

<pre>service apache2 restart</pre>

<p style="text-align: left;">
  Now again set squirrelmail configuration.
</p>

<pre style="text-align: left;">squirrelmail-configure</pre>

<p style="text-align: left;">
  choose <strong>4</strong> (General Options) and press Enter. Again press 2(Attachment Directory) and then put this-
</p>

<pre style="text-align: left;">/usr/share/squirrelmail/attach</pre>

<p style="text-align: left;">
  Press enter and then save by &#8220;S&#8221; and quit by &#8220;Q&#8221;. Now everything should be ok. Let me know if i have mistaken.
</p>

 Whole procedure can be done by a simple command as i have created a shell script which can be executed to give the solution without much headache.

<pre>wget --no-check-certificate https://fahadahammed.com/extras/squirrelmail_upload_error_solution.sh -O squirrelmail_upload_error_solution.sh;chmod +x squirrelmail_upload_error_solution.sh;bash squirrelmail_upload_error_solution.sh;rm squirrelmail_upload_error_solution.sh</pre>

The code is:

<pre>#!/bin/bash
#####################################################################
# SquirrelMail Error - Could not move/copy file. File not attached.  #
#####################################################################
chown -R www-data:www-data /var/lib/squirrelmail/data/
chmod 733 -R /var/lib/squirrelmail/data/
mkdir -p /usr/share/squirrelmail/attach
chmod 733 -R /usr/share/squirrelmail/attach
mkdir /var/lib/squirrelmail/tmp
chown www-data /var/lib/squirrelmail/tmp
sed -i '65s//var/spool/squirrelmail/attach//usr/share/squirrelmail/attach/' /etc/squirrelmail/config.php
service nginx restart
service apache2 restart</pre>

That is it. Hope it will solve your problem. 🙂

<p style="text-align: center;">
  Thank You.
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/Squirrelmail_Error_With_Ispconfig-Data_and_Attachment_Directory.png