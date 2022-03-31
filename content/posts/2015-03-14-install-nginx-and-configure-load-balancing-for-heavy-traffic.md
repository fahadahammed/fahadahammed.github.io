---
title: Install Nginx and Configure Load Balancing for Heavy Traffic
author: Fahad Ahammed
type: post
date: 2015-03-14T12:00:12+00:00
url: /install-nginx-and-configure-load-balancing-for-heavy-traffic/
categories:
  - Technology
tags:
  - load balancing with nginx
  - load balancing with small servers by nginx setup
  - nginx to load balance your website
  - transfer your websites load to several small vps with nginx

---
Load Balancing is the mechanism which will balance the load upon server towards several servers which ultimately can handle heavy traffic. I will show you the basic configurations with normal HTML based webpages only but it will help you to build for PHP based websites.

<!--more-->

&nbsp;

[<img loading="lazy" class="size-medium wp-image-2038 aligncenter" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/03/Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic-300x300.png?resize=300%2C300" alt="Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/03/Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/03/Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/03/Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />][1]

I am going to use a main server for Load Balancer and 4 others as load balance support. We will install nginx and individually make sure we can access the website with certain port. This is actually a testing based procedure. And obviously i can&#8217;t guarantee that it will be useful to DDOS attack. It just simply transfer the load to other servers. Problem is the main server handles the first loads. You can test the efficiency of this type of balancing by Apache Benchmark.

Let,

<pre>0.0.0.0 = Master Server
1.1.1.1 = s1
2.2.2.2 = s2
3.3.3.3 = s3
4.4.4.4 = s4</pre>

Let, your domain is domain.com. Create A record respectively.

<pre>domain.com. &gt;&gt; 0.0.0.0
m.domain.com &gt;&gt; 0.0.0.0
s1.domain.com &gt;&gt; 1.1.1.1
s2.domain.com &gt;&gt; 2.2.2.2
s3.domain.com &gt;&gt; 3.3.3.3
s4.domain.com &gt;&gt; 4.4.4.4</pre>

### \# Install nginx in all your servers, master and slave.

<pre>apt-get update;apt-get install nginx -y</pre>

### \# Configure Master nginx virtualhost

Create a vhost file &#8220;domain.com&#8221;  and create folder of the root of that website.

<pre>touch /etc/nginx/sites-enabled/s1.domain.com
mkdir -p /var/www/domain.com</pre>

Put your website in /var/www/domain.com by sftp or something and change the ownership.

<pre>chown -R www-data:www-data /var/www/domain.com</pre>

And then put below configuration to the vhost.

<pre>nano /etc/nginx/sites-enabled/domain.com</pre>

<pre>upstream balancer {
 server s1.domain.com:7777 weight=1;
 server s2.domain.com:7777 weight=2;
 server s3.domain.com:7777 weight=3;
 server s4.domain.com:7777 weight=4;
 }
 server {
 listen 80;
 root /var/www/domain.com;
 index index.html index.htm index.php;
server_name domain.com;
location / {
 proxy_pass http://balancer;
 proxy_set_header Host $host;
 }
 }</pre>

Save the file and restart. Now you will not be able to access the website. To get access of your master server copy of your website you have to configure another vhost. &#8220;m.domain.com&#8221; whose domain root will be your website root.

<pre>server {
 listen 7777;
 root /var/www/domain.com;
 index index.html index.htm index.php;
 server_name m.domain.com;
 }</pre>

Now save it and restart nginx.

<pre>service nginx restart</pre>

Now create and transfer your website to all your slaves.

### \# Slave1

<pre>mkdir -p /var/www/s1.domain.com</pre>

Transfer the files to the folder and change ownership.

<pre>chown -R www-data:www-data /var/www/s1.domain.com</pre>

And then put below configuration to the vhost.

<pre>nano /etc/nginx/sites-enabled/s1.domain.com</pre>

<pre>server {
 listen 7777;
 root /var/www/s1.domain.com;
 index index.html index.htm index.php;
 server_name s1.domain.com;
 }</pre>

### \# Slave2

<pre>mkdir -p /var/www/s2.domain.com</pre>

Transfer the files to the folder and change ownership.

<pre>chown -R www-data:www-data /var/www/s2.domain.com</pre>

And then put below configuration to the vhost.

<pre>nano /etc/nginx/sites-enabled/s2.domain.com</pre>

<pre>server {
 listen 7777;
 root /var/www/s2.domain.com;
 index index.html index.htm index.php;
 server_name s2.domain.com;
 }</pre>

### \# Slave3

<pre>mkdir -p /var/www/s3.domain.com</pre>

Transfer the files to the folder and change ownership.

<pre>chown -R www-data:www-data /var/www/s3.domain.com</pre>

And then put below configuration to the vhost.

<pre>nano /etc/nginx/sites-enabled/s3.domain.com</pre>

<pre>server {
 listen 7777;
 root /var/www/s3.domain.com;
 index index.html index.htm index.php;
 server_name s3.domain.com;
 }</pre>

### \# Slave4

<pre>mkdir -p /var/www/s4.domain.com</pre>

Transfer the files to the folder and change ownership.

<pre>chown -R www-data:www-data /var/www/s4.domain.com</pre>

And then put below configuration to the vhost.

<pre>nano /etc/nginx/sites-enabled/s4.domain.com</pre>

<pre>server {
 listen 7777;
 root /var/www/s4.domain.com;
 index index.html index.htm index.php;
 server_name s4.domain.com;
 }</pre>

# FINAL STEP

Make sure you have restarted nginx in all your slaves and master server.

<pre>service nginx restart</pre>

You should be able to access every slave individually by the port and then you can just use &#8220;domain.com&#8221; and you will be ok with the load balancing. You can sort out which server will be hit first and so on by &#8220;weight=#&#8221; in your main config file.

By default, requests are distributed between the servers using a weighted round-robin balancing method. In the above example, each 10 requests will be distributed as follows: 4 requests go to s4.domain.com, 3 requests go to s3.domain.com, 2 requests go to s2.domain.com and 1 request to s1.domain.com. If an error occurs during communication with a server, the request will be passed to the next server and so on until all of the functioning servers will be tried. If a successful response could not be obtained from any of the servers, the client will receive the result of the communication with the last server.

Hope this works. It is just a fun project or setup i did with one of my website. If it looks good or useless or you face problem then please leave feedback. Thank You. 🙂

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/03/Install_Nginx_and_Configure_Load_Balancing_for_Heavy_Traffic.png