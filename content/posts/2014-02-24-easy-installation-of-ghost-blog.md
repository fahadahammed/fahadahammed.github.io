---
title: Easy installation of Ghost Blog
author: Fahad Ahammed
type: post
date: 2014-02-24T03:35:29+00:00
url: /easy-installation-of-ghost-blog/
categories:
  - Technology
tags:
  - How to install ghost blog in ubuntu with apache
  - init script of ghost blog
  - Install ghost blog in lighttpd server
  - Install ghost with apache
  - Use ghost blog with mysql database

---
&#8220;Ghost Blog&#8221; is a blogging platform. Just blog. If you are into blogging and sharing your thoughts and nothing else, then you will definitely looking for this one. Very lightweight and super stylish with simplicity look. It is a platform where you will be motivated to write. But it is tricky to install. I will make it simple here.<!--more-->Ubuntu 12.04.4 LTS is my VPS which i am using to show you how to install easily. We will do install nodejs , nginx , mysql etc.

[<img loading="lazy" class="aligncenter size-full wp-image-1230" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/02/ghost.png?resize=660%2C237" alt="ghost" width="660" height="237" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/02/ghost.png?w=816&ssl=1 816w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/02/ghost.png?resize=300%2C108&ssl=1 300w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]

## Step:1 NodeJS

Add nodejs repository and install it.

<pre>sudo apt-get update
sudo apt-get install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs</pre>

Now check if it is really installed or not.

<pre>node -v
npm -v</pre>

## Step:02 Installation of Ghost

Check or install Curl

<pre>apt-get install curl</pre>

Now use below code to download the ghost archive file to install.

<pre>curl -L https://ghost.org/zip/ghost-latest.zip -o ghost.zip</pre>

We need to extract to a folder which is familiar to you. I will use **/var/www/**

<pre>unzip -uo ghost.zip -d /var/www/ghost</pre>

Then go into the ghost folder

<pre>cd /var/www/ghost/</pre>

To install Ghost type: (Note 2 Dashes before production)

<pre>npm install --production</pre>

<span style="color: #ff9900;">Above command is very very important when you transfer ghost blog to another vps.</span>

Now we need to check if it starts or not.

<pre>npm start</pre>

If starts , you can now just ctrl+c to terminate. Terminate it.

You can start ghost as production too.

<pre>npm start --production</pre>

Now we need to edit config file. That file should be in /var/www/ghost/

<pre>nano /var/www/ghost/config.js</pre>

Now find  **// ### Production**. This is the start of Production based configuration. Also find **// **Developers only need to edit below here**** and above this line end of Production based configuration. I am helping you what to keep there and add too.

<pre>// ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: '<span style="color: #ff0000;">http://domain.com</span>',
        mail: {
                transport: 'SMTP',
                options: {
                service: 'Sendmail',
                        }
                },
        database: {
            client: 'mysql',
            connection: {
                    host: '<span style="color: #ff0000;">localhost</span>',
                    user: '<span style="color: #ff0000;">root</span>',
                    password: '<span style="color: #ff0000;">password</span>',
                    database: '<span style="color: #ff0000;">database</span>',
                    charset: 'utf8'
            }
    },

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '<span style="color: #ff0000;">127.0.0.1</span>',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '<span style="color: #ff0000;">2368</span>'
        }
    },</pre>

Above is a good configuration. First red marked domain is the domain by which you want to use your ghost blog. Change it to yours. Second red marked text is for mysql database. You have to create it by terminal or phpmyadmin. Use localhost if you are in same machine where your ghost is. change mysql database user , password , database according to yours. Then the red marked IP , you have to edit it to your VPS/server IP address. and change the red marked port as your wish.

Save it.

## Step:03 Init Script (<span style="color: #ff0000;">One Way</span>)

Linux systems use init scripts to run on system boot. These scripts exist in /etc/init.d. To make Ghost run forever and even survive a reboot you could set up an init script to accomplish that task. The following example will work on Ubuntu and was tested on **Ubuntu 12.04**.  
Create the file /etc/init.d/ghost with the following command:

<pre>sudo curl https://raw.github.com/TryGhost/Ghost-Config/master/init.d/ghost 
  -o /etc/init.d/ghost</pre>

Open the file with `nano /etc/init.d/ghost` and check the following:  
Change the `GHOST_ROOT` variable to the path where you installed Ghost  
Check if the `DAEMON` variable is the same as the output of `which node`  
The Init script runs with it&#8217;s own Ghost user and group on your system, let&#8217;s create them with the following:

<pre>sudo useradd -r ghost -U</pre>

Let&#8217;s also make sure the Ghost user can access the installation:

<pre>sudo chown -R ghost:ghost /var/www/ghost</pre>

Change the execution permission for the init script by typing

<pre>sudo chmod 755 /etc/init.d/ghost</pre>

Now you can control Ghost with the following commands:

<pre>sudo service ghost start
sudo service ghost stop
sudo service ghost restart
sudo service ghost status</pre>

To start Ghost on system start the newly created init script has to be registered for start up. Type the following two commands in command line:

<pre>sudo update-rc.d ghost defaults
sudo update-rc.d ghost enable</pre>

Let&#8217;s make sure your user can change files, config.js for example in the Ghost directory, by assigning you to the ghost group: `sudo adduser USERNAME ghost`  
If you now restart your server Ghost should already be running for you.

## Step:03 Init Script (<span style="color: #ff0000;">Another Way</span>)

Create a blank file as **ghost.conf** in **/etc/init/** folder.

<pre>touch /etc/init/ghost.conf</pre>

Now edit that file by nano and put below code.

<pre># ghost

start on startup

script
cd /var/www/ghost
npm start --production
end script</pre>

And save that file. Now you can start and stop the service by simply running below command.

<pre>service ghost start</pre>

<pre>service ghost status</pre>

<pre>service ghost restart</pre>

<pre>service ghost stop</pre>

This will also act as an auto start configuration file when reboot the server.

## Step:04 Run With Apache Virtual Host

Let you want to use Ghost blog by http://domain.com , you need to create a vhost file in /etc/apache2/sites-available/

<pre>nano /etc/apache2/sites-available/domain.com.vhost</pre>

Paste below codes.

<pre>&lt;VirtualHost *:80&gt;
ServerName <span style="color: #ff0000;">domain.com</span>
ServerAlias www.<span style="color: #ff0000;">domain.com</span>
ProxyPass / http://<span style="color: #ff0000;">127.0.0.1</span>:<span style="color: #ff0000;">2368</span>/
ProxyPassReverse / http://<span style="color: #ff0000;">127.0.0.1</span>:<span style="color: #ff0000;">2368</span>/
ProxyPreserveHost On
&lt;/VirtualHost&gt;</pre>

Change your server/vps ip and port according to your ghost config. Also change the domain name. This is a reverse proxy config. We need to ensure if it is enabled or not.

<pre>sudo a2enmod proxy proxy_http</pre>

Now enable the vhost file.

<pre>ln -s /etc/apache2/sites-available/domain.com.vhost /etc/apache2/sites-enable/domain.com.vhost</pre>

Restart apache.

<pre>sudo service apache2 restart</pre>

Start Ghost

<pre>service ghost restart</pre>

and you are good to go.

## External Post:

I have showed you how to install ghost with Apache server. But Apache is heavy and you can&#8217;t just rely on it for huge traffic and if you rely it will be very costly. You can run a ghost blog and handle almost huge traffic by a 128mb vps.

<p class="entry-title">
  <a title="Install Ghost Blog With Lighttpd and Mariadb" href="http://www.lowendguide.com/3/webservers/install-ghost-blog-with-lighttpd-and-mariadb/" target="_blank"><strong>Install Ghost Blog With Lighttpd and Mariadb</strong></a>
</p>

<p class="entry-title">
  lighttpd and Mariadb is perfect. You can rely on those. Happy blogging.
</p>

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/02/ghost.png