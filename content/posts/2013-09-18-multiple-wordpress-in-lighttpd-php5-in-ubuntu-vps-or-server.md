---
title: 'Multiple WordPress in Lighttpd & Php5 in Ubuntu VPS or Server'
author: Fahad Ahammed
type: post
date: 2013-09-18T00:58:15+00:00
url: /multiple-wordpress-in-lighttpd-php5-in-ubuntu-vps-or-server/
categories:
  - Technology
tags:
  - lighttpd
  - lighttpd server
  - lighttpd vhost
  - lighttpd wordpress
  - mysql php5 lighttpd ubuntu wordpress debian
  - ubuntu 12.04 lighttpd server with multiple wordpress
  - ubuntu vps lighttpd wordpress

---
Lighttpd = Security, speed, compliance, and flexibility.

It is pronounced as &#8220;Lighty&#8221;. Lighttpd is rapidly redefining efficiency of a webserver . It is Designed and optimized for high performance environments. With a small memory footprint compared to other webservers. 128mb ram can run it like a mig29 with several wordpress(I will try two today). It has advanced feature set like FastCGI, SCGI, Auth, Output-Compression,URL Rewriting and many more. It is perfect for every server and also for VPSs with low memory. You will be amazed by its speed with low ram and swap. It is totally free.

<!--more-->

Let&#8217;s install Lighttpd with MySql with PHP-FPM in Ubuntu or maybe Debian, But i tried in Ubuntu. Look my VPS which is 128mb ram with 256mb swap and running two wordpress with lightspeed.

[<img loading="lazy" class="aligncenter size-full wp-image-723" alt="lighttpd8" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd8.png?resize=644%2C384" width="644" height="384" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd8.png?w=644&ssl=1 644w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd8.png?resize=300%2C179&ssl=1 300w" sizes="(max-width: 644px) 100vw, 644px" data-recalc-dims="1" />][1]

First open putty or terminal and connect to your vps or server. Then after login upgrade Ubuntu.

<pre>sudo apt-get update;sudo apt-get upgrade;sudo apt-get dist-upgarde</pre>

Reboot system and reconnect by ssh.

<pre>reboot</pre>

Now Install mysql.

<pre>sudo apt-get install mysql-server mysql-client</pre>

You will be asked to set mysql root password. Now remove apache if it is pre-installed.

<pre>/etc/init.d/apache2 stop
apt-get purge apache2
apt-get autoremove</pre>

Then put this.

<pre>update-rc.d -f apache2 remove</pre>

Now install lighttpd.

<pre>sudo apt-get install lighttpd</pre>

Now in the browser you can access your lighttpd server by this.

<pre>http://xxx.xxx.xxx.xxx/index.lighttpd.html</pre>

<span style="color: #ff0000;"><strong><em>xxx.xxx.xxx.xxx is your server or vps ip address.</em></strong></span>

You will get a page like below.

[<img loading="lazy" class="aligncenter size-large wp-image-701" alt="lighttpd1" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd1-1024x467.png?resize=625%2C285" width="625" height="285" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd1.png?resize=1024%2C467&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd1.png?resize=300%2C137&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd1.png?w=1267&ssl=1 1267w" sizes="(max-width: 625px) 100vw, 625px" data-recalc-dims="1" />][2]

Now let us Install php5, php-fpm.

<pre>sudo apt-get install php5-fpm php5</pre>

Now we have to edit a file. I use nano for editing files.

<pre>sudo apt-get install nano</pre>

Now let us edit php.ini.

<pre>sudo nano /etc/php5/fpm/php.ini</pre>

You will see many text. Now press **ctrl+w** and write **cgi.fix_pathinfo=1** in the below appeared field. And delete &#8220;**;**&#8221; symbol from the lines start. Press **ctrl+x** the **y** and then press **Enter** to save the file.

[<img loading="lazy" class="aligncenter size-full wp-image-708" alt="lighttpd2" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd2.png?resize=660%2C194" width="660" height="194" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd2.png?w=671&ssl=1 671w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd2.png?resize=300%2C88&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][3] [<img loading="lazy" class="aligncenter size-large wp-image-709" alt="lighttpd3" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd3.png?resize=625%2C120" width="625" height="120" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd3.png?w=649&ssl=1 649w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd3.png?resize=300%2C58&ssl=1 300w" sizes="(max-width: 625px) 100vw, 625px" data-recalc-dims="1" />][4]

The Lighttpd configuration file for PHP /etc/lighttpd/conf-available/15-fastcgi-php.conf is suitable for use with spawn-fcgi, however, we want to use PHP-FPM, therefore we create a backup of the file (named 15-fastcgi-php-spawnfcgi.conf) and modify 15-fastcgi-php.conf as follows:

<pre>cd /etc/lighttpd/conf-available/
mv 15-fastcgi-php.conf 15-fastcgi-php-spawnfcgi.conf</pre>

Now edit fastcgi and put there the texts from below :

<pre>nano 15-fastcgi-php.conf</pre>

<pre># /usr/share/doc/lighttpd-doc/fastcgi.txt.gz
# http://redmine.lighttpd.net/projects/lighttpd/wiki/Docs:ConfigurationOptions#mod_fastcgi-fastcgi

## Start an FastCGI server for php (needs the php5-cgi package)
fastcgi.server += ( ".php" =&gt;
        ((
                "host" =&gt; "127.0.0.1",
                "port" =&gt; "9000",
                "broken-scriptfilename" =&gt; "enable"
        ))
)</pre>

To enable the fastcgi configuration, run the following commands:

<pre>lighttpd-enable-mod fastcgi
lighttpd-enable-mod fastcgi-php</pre>

This creates the symlinks /etc/lighttpd/conf-enabled/10-fastcgi.conf which points to /etc/lighttpd/conf-available/10-fastcgi.conf and /etc/lighttpd/conf-enabled/15-fastcgi-php.conf which points to /etc/lighttpd/conf-available/15-fastcgi-php.conf:

<pre>ls -l /etc/lighttpd/conf-enabled
service lighttpd restart</pre>

Now let us check if php works or not.

<pre>nano /var/www/info.php</pre>

And put below texts and save.

<pre>&lt;?php phpinfo(); ?&gt;</pre>

Now try accessing the page by browser.

<pre>http://xxx.xxx.xxx.xxx/info.php</pre>

If you see a page with php on the page head then you are passed. 🙂

To get MySQL support in PHP, we can install the php5-mysql package. It&#8217;s a good idea to install some other PHP5 modules as well as you might need them for your applications. You can search for available PHP5 modules like this:

<pre>apt-cache search php5</pre>

Pick the ones you need and install them like this:

<pre>apt-get install php5-mysql php5-curl php5-gd php5-intl php-pear php5-imagick php5-imap php5-mcrypt php5-memcache php5-ming php5-ps php5-pspell php5-recode php5-snmp php5-sqlite php5-tidy php5-xmlrpc php5-xsl</pre>

Xcache is a free and open PHP opcode cacher for caching and optimizing PHP intermediate code. It&#8217;s similar to other PHP opcode cachers, such as eAccelerator and APC. It is strongly recommended to have one of these installed to speed up your PHP page.

Xcache can be installed as follows:

<pre>apt-get install php5-xcache</pre>

Now restart PHP-FPM:

<pre>/etc/init.d/php5-fpm restart</pre>

Now if you reload that page in your browser you will see more module added there.

Now let us install **phpmyadmin** for our easy access to mysql database.

<pre>apt-get install phpmyadmin</pre>

During installation you will be promted to chose one server.

<pre>Apache
Lighttpd</pre>

You will have to select **lighttpd** by pressing **Down Keybord Button** to take marker on lighttpd and Select by **SPACE BAR**.  And then press **TAB** to take the marker to **OK** option and press enter. You will also be asked &#8220;_**Configure database for phpmyadmin with dbconfig-common?**_&#8221; where you will have to select **NO** by pressing **Right** Keybord Button and **Enter** Button to select.

Now in browser you can access phpmyadmin by :

<pre>http://xxx.xxx.xxx.xxx/phpmyadmin</pre>

Now open php-fpm config file by:

<pre>nano /etc/php5/fpm/pool.d/www.conf</pre>

adn search for **listen = 127.0.0.1:9000** and put &#8221; **;** &#8221; in the lines start. and then after that line put this, &#8220;**listen = /tmp/php5-fpm.sock**&#8221; and save the file.

Then restart PHP-FPM:

<pre>/etc/init.d/php5-fpm restart</pre>

Next open Lighttpd&#8217;s PHP configuration file /etc/lighttpd/conf-available/15-fastcgi-php.conf and replace the host and port lines with &#8220;socket&#8221; => &#8220;/tmp/php5-fpm.sock&#8221;:

<pre>nano /etc/lighttpd/conf-available/15-fastcgi-php.conf</pre>

<pre># /usr/share/doc/lighttpd-doc/fastcgi.txt.gz
# http://redmine.lighttpd.net/projects/lighttpd/wiki/Docs:ConfigurationOptions#mod_fastcgi-fastcgi

## Start an FastCGI server for php (needs the php5-cgi package)
fastcgi.server += ( ".php" =&gt;
        ((
                "socket" =&gt; "/tmp/php5-fpm.sock",
                "broken-scriptfilename" =&gt; "enable"
        ))
)</pre>

Finally restart Lighttpd:

<pre>/etc/init.d/lighttpd restart</pre>

Now , let us point domain to server. Open domain control panel and in nameserver you have to select default and then from DNS management you will have to create A record to point your servers IP. If you can&#8217;t, ask your domain host to help you. I will use two domain now to show you how to add multiple site by only pointing by A record.

Now open lighttpd config file.

<pre>nano /etc/lighttpd/lighttpd.conf</pre>

Now remove **#** from front of **&#8220;mod_rewrite&#8221;,** 

And check what is saying **server.document-root ,** normally it is always **/var/www** . If not that , then change that to it.

Now , let you have two website site1.com and site2.com

As we have selected or got /var/www as document root , we have to use /var/www as our default website folder. We have to create two folder for two website.

<pre>mkdir -p /var/www/site1.com/web
mkdir -p /var/www/site1.com/logs
mkdir -p /var/www/site2.com/web
mkdir -p /var/www/site2.com/logs</pre>

This will create two folder with sub folder named **web** and **logs**. Now let us create two index.php file to both domain folder to check virtual host.

FOR SITE1.COM:

<pre>nano /var/www/site1.com/web/index.php</pre>

And put text/code from below and save.

<pre>&lt;?php echo"site1.com"; ?&gt;</pre>

FOR SITE2.COM:

<pre>nano /var/www/site2.com/web/index.php</pre>

And put text/code from below and save.

<pre>&lt;?php echo"site2.com"; ?&gt;</pre>

Now open lighttpd configuration file and add below two lines to the end and save.

<pre>include "site1.com.conf"
include "site2.com.conf"</pre>

Now for both of the site we have to create configuration file.

FOR SITE1.COM:

<pre>nano /etc/lighttpd/site1.com.conf</pre>

Put below code and save the file.

<pre>$HTTP["host"] =~ "(^|.)site1.com$" {
        server.document-root = "/var/www/site1.com/web/"
        accesslog.filename = "/var/www/site1.com/logs/error.log"
}</pre>

FOR SITE2.COM

<pre>nano /etc/lighttpd/site2.com.conf</pre>

Put below code and save file.

<pre>$HTTP["host"] =~ "(^|.)site2.com$" {
        server.document-root = "/var/www/site2.com/web/"
        accesslog.filename = "/var/www/site2.com/logs/error.log"
}</pre>

now save and restart lighttpd by

<pre>service lighttpd restart</pre>

Access the both domains and if you can see in your browser that **site1.com** is showing **site1.com** and **site2.com** is showing **site2.com** then you have done well.

Now let us install wordpress. First access phpmyadmin from browser to create database.

<pre>http://xxx.xxx.xxx.xxx/phpmyadmin</pre>

or

<pre>http://site1.com/phpmyadmin</pre>

or

<pre>http://site2.com/phpmyadmin</pre>

You will be asked for user and password. Use root as user and password as you are chosen earlier. Click on Databases and create Database.

[<img loading="lazy" class="aligncenter size-full wp-image-720" alt="lighttpd5" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd5.png?resize=660%2C369" width="660" height="369" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd5.png?w=802&ssl=1 802w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd5.png?resize=300%2C168&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][5] [<img loading="lazy" class="aligncenter size-large wp-image-721" alt="lighttpd6" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd6.png?resize=625%2C347" width="625" height="347" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd6.png?w=804&ssl=1 804w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd6.png?resize=300%2C167&ssl=1 300w" sizes="(max-width: 625px) 100vw, 625px" data-recalc-dims="1" />][6]

Create Two database for two site/wordpress. I use collation as  utf8\_general\_ci for my native language support and all.

Now from ssh go to site1s default folder:

<pre>cd /var/www/site.com/web/</pre>

And download wordpress from https://wordpress.org/download/ link. You can download zip file or tar.gz . I am showing you how to extract both files.

ZIP:

<pre>wget https://wordpress.org/latest.zip</pre>

Extract By

<pre>unzip latest.zip</pre>

TAR.GZ:

<pre>wget https://wordpress.org/latest.tar.gz</pre>

Extract By

<pre>tar zxvf latest.tar.gz</pre>

whatever you do you will find a folder extracted there named wordpress. If you want to acces wordpress from a folder then let it stay that way or maybe you want your wordpress site access directly by domain name which is the coolest and i follow that. How to move all files from that sub folder of wordpress ? Let us begin. First delete old created index.php file from websites default folder.

<pre>rm /var/www/site1.com/web/index.php</pre>

And now move all files from wordpress to default directory/folder.

<pre>mv /var/www/site1.com/web/wordpress/* /var/www/site1.com/web/</pre>

Now all files moved keeping wordpress folder empty and we don&#8217;t need that folder. So delete it and also delete the archieve file(though you can use that file for site2.com by copying or maybe download ? ).

<pre>rm -r /var/www/site1.com/web/wordpress;rm /var/www/site1.com/web/latest*</pre>

Now follow the same procedure for site2.com.

Let us start wordpress installation. First edit site1.com config file.

First Rename sample config file.

<pre>mv /var/www/site1.com/web/wp-config-sample.php /var/www/site1.com/web/wp-config.php</pre>

Now edit the renamed file.

<pre>nano /var/www/site1.com/web/wp-config.php</pre>

Now put everything like below.

[<img loading="lazy" class="aligncenter size-full wp-image-719" alt="lighttpd7" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd7.png?resize=657%2C552" width="657" height="552" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd7.png?w=657&ssl=1 657w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd7.png?resize=300%2C252&ssl=1 300w" sizes="(max-width: 657px) 100vw, 657px" data-recalc-dims="1" />][7]

Now access your site1.com and put admin informations there and one wordpress installed.

Follow these for second one too. Just change the Database name from wp-config.php file to whatever you chosen when you created from phpmyadmin.

So your two wordpress in a vps with super speedy lightspeed server is created.

<h3 style="text-align: center;">
  Feel Free to ask anything.
</h3>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd8.png
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd1.png
 [3]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd2.png
 [4]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd3.png
 [5]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd5.png
 [6]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd6.png
 [7]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/09/lighttpd7.png