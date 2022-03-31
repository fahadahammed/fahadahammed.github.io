---
title: 'Installing Squid Proxy Server with User & Password'
author: Fahad Ahammed
type: post
date: 2013-07-08T20:40:07+00:00
url: /installing-squid-proxy-server-with-user-password/
categories:
  - Proxy Server
tags:
  - proxy vps
  - squid
  - squid proxy from vps
  - squid proxy server
  - squid proxy server with user and password
  - squid with user and password

---
If you work remotely, or have to handle corporate files on the road, then chances are you’ve used a specific type of proxy and may not even be aware of it. In fact, proxies are used by workers all over the world in the form of a VPN. A virtual private network is one specific type of proxy which provides you with the ability to work remotely and securely.So , here i will help you to install and configure squid proxy server in your vps or server .<!--more-->

[<img loading="lazy" class="aligncenter size-large wp-image-1516" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/07/squid_user_password-1024x472.png?resize=640%2C295" alt="squid_user_password" width="640" height="295" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/07/squid_user_password.png?resize=1024%2C472&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/07/squid_user_password.png?resize=300%2C138&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/07/squid_user_password.png?w=1149&ssl=1 1149w" sizes="(max-width: 640px) 100vw, 640px" data-recalc-dims="1" />][1]

Log in on Ubuntu Server, then type command below to Install squid :

<pre><strong>sudo apt-get install squid3 ccze bind9 dnsutils apache2-utils</strong></pre>

&nbsp;

Create directory for Cache, on this case cache directory placed on  
directory /home/precise/cache/. Then change  
the permissions cache directory to 777 and owner proxy:proxy

&nbsp;

<pre><strong>sudo mkdir -p /home/<span style="color: #ff0000;">precise</span>/cache/</strong></pre>

<pre><strong>sudo chmod 777 /home/<span style="color: #ff0000;">precise</span>/cache/</strong></pre>

<pre><strong>sudo chown proxy:proxy /home/<span style="color: #ff0000;">precise</span>/cache/</strong></pre>

&nbsp;

Before editing squid configuration, Make a backup of your  
/etc/squid3/squid.conf file for future reference. Squid.conf has  
nearly all the options listed and it is recommended to go through that  
file to know more about squid options.

&nbsp;

<pre><strong>sudo cp /etc/squid3/squid.conf /etc/squid3/squid.conf.origin</strong></pre>

<pre><strong>sudo chmod a-w /etc/squid3/squid.conf.origin</strong></pre>

&nbsp;

Now edit /etc/squid3/squid.conf file, delete all options  
in /etc/squid3/squid.conf then replace with squid3 configuration below :

&nbsp;

<pre><strong>sudo nano /etc/squid3/squid.conf</strong></pre>

&nbsp;

**Squid3 configuration:**

&nbsp;

<pre># ACCESS CONTROLS OPTIONS
# ====================
#
acl QUERY urlpath_regex -i cgi-bin ? .php$ .asp$ .shtml$ .cfm$ .cfml$ .phtml$ .php3$ localhost
acl all src
acl localnet src 10.0.0.0/8
acl localnet src 192.168.1.0/24 # Your network here
acl localhost src 127.0.0.1/32
acl safeports port 21 70 80 210 280 443 488 563 591 631 777 901 81 3128 1025-65535
acl sslports port 443 563 81 2087 10000
acl manager proto cache_object
acl purge method PURGE
acl connect method CONNECT

#

http_access allow manager localhost
http_access deny manager
http_access allow purge localhost
http_access deny purge
http_access deny !safeports
http_access deny CONNECT !sslports
http_access allow localhost
http_access allow localnet
#http_access deny all
http_access allow all

#
# NETWORK OPTIONS
# 
#
http_port 3128
#
# OPTIONS WHICH AFFECT THE CACHE SIZE
# ==============================
#
cache_mem 1000 MB
maximum_object_size_in_memory 100 KB
memory_replacement_policy heap GDSF
cache_replacement_policy heap LFUDA
cache_dir aufs /home/<span style="color: #ff0000;"><strong>precise</strong></span>/cache 10000 14 256
maximum_object_size 128000 KB
cache_swap_low 950
cache_swap_high 990
#
# LOGFILE PATHNAMES AND CACHE DIRECTORIES
# ==================================
#
access_log /var/log/squid3/access.log
cache_log /cache/cache.log
#cache_log /dev/null
cache_store_log none
logfile_rotate 5
log_icp_queries off
#
# OPTIONS FOR TUNING THE CACHE
# ========================
#
cache deny QUERY
refresh_pattern ^ftp: 1440 20% 10080 reload-into-ims
refresh_pattern ^gopher: 1440 0% 1440
refresh_pattern -i .(gif|png|jp?g|ico|bmp|tiff?)$ 10080 95% 43200 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(rpm|cab|deb|exe|msi|msu|zip|tar|xz|bz|bz2|lzma|gz|tgz|rar|bin|7z|doc?|xls?|ppt?|pdf|nth|psd|sis)$ 10080 90% 43200 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(avi|iso|wav|mid|mp?|mpeg|mov|3gp|wm?|swf|flv|x-flv|axd)$ 43200 95% 432000 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(html|htm|css|js)$ 1440 75% 40320
refresh_pattern -i .index.(html|htm)$ 0 75% 10080
refresh_pattern -i (/cgi-bin/|?) 0 0% 0
refresh_pattern . 1440 90% 10080
#
quick_abort_min 0 KB
quick_abort_max 0 KB
quick_abort_pct 100
store_avg_object_size 1355 KB
#
# HTTP OPTIONS
# ===========
vary_ignore_expire on
#
# ANONIMITY OPTIONS
# ===============
#
request_header_access From deny all
request_header_access Server deny all
request_header_access Link deny all
request_header_access Via deny all
request_header_access X-Forwarded-For deny all
#
# TIMEOUTS
# =======
#
forward_timeout 240 second
connect_timeout 30 second
peer_connect_timeout 5 second
read_timeout 600 second
request_timeout 60 second
shutdown_lifetime 10 second
#
# ADMINISTRATIVE PARAMETERS
# =====================
#
cache_mgr <span style="color: #0000ff;">admin@domain.com</span>
cache_effective_user proxy
cache_effective_group proxy
httpd_suppress_version_string on
visible_hostname domain<span style="color: #0000ff;">_proxy</span>
#
ftp_list_width 32
ftp_passive on
ftp_sanitycheck on
#
# DNS OPTIONS
# ==========
#
dns_timeout 10 seconds
dns_nameservers 8.8.8.8 8.8.4.4 # DNS Server
#
# MISCELLANEOUS
# ===========
#
memory_pools off
client_db off
reload_into_ims on
coredump_dir /cache
pipeline_prefetch on
offline_mode off
#
#Marking ZPH
#==========
zph_mode tos
zph_local 0x04
zph_parent 0
zph_option 136
### END CONFIGURATION ###</pre>

Create swap directory,

&nbsp;

<pre><strong>squid3 -z</strong></pre>

&nbsp;

Restart squid3:

&nbsp;

<pre><strong>sudo /etc/init.d/squid3 restart</strong></pre>

&nbsp;

Your squid proxy server installation and configuration is complete . You have to set ip and port (which is by default 3128) in your firefox.

> <span style="color: #ff0000;">Note :</span> Above we have used <span style="color: #ff0000;">precise </span>is red marked and that is the default user . You have to use yours username . There is also Blue marked texts on that configuration file . One is email which you should use your own or servers email and also name of the server owner.

<h3 style="padding-left: 30px;">
  Now if you want to use user and password to access your proxy server then do as below .
</h3>

#### Step # 1: Create a username/password

First create a NCSA password file using htpasswd command. htpasswd is used to create and update the flat-files used to store usernames and password for basic authentication of squid users.  
`htpasswd /etc/squid3/passwd user1`  
Output:

<pre>New password:
Re-type new password:
Adding password for user user1</pre>

Make sure squid can read passwd file:  
`chmod o+r /etc/squid3/passwd`

#### Step # 2: Locate nsca_auth authentication helper

Usually nsca\_auth is located at /usr/lib/squid/ncsa\_auth. You can find out location using rpm (Redhat,CentOS,Fedora) or dpkg (Debian and Ubuntu) command:  
`dpkg -L squid3 | grep ncsa_auth`  
Output:

<pre>/usr/lib/squid/ncsa_auth</pre>

If you are using RHEL/CentOS/Fedora Core or RPM based distro try:  
`rpm -ql squid | grep ncsa_auth`  
Output:

<pre>/usr/lib/squid/ncsa_auth</pre>

#### Step # 3: Configure nsca_auth for squid proxy authentication

Now open /etc/squid3/squid.conf file  
`nano /etc/squid3/squid.conf`  
Put this and save :

**Squid3 configuration:**

&nbsp;

<pre># ACCESS CONTROLS OPTIONS
# ====================
#
###########################################################

auth_param basic program /usr/lib/squid3/ncsa_auth /etc/squid3/passwd
auth_param basic children 5
auth_param basic realm Squid proxy-caching web server
auth_param basic credentialsttl 2 hours
auth_param basic casesensitive off

acl ncsa_users proxy_auth REQUIRED
http_access allow ncsa_users

###########################################################
acl QUERY urlpath_regex -i cgi-bin ? .php$ .asp$ .shtml$ .cfm$ .cfml$ .phtml$ .php3$ localhost
acl all src
acl localnet src 10.0.0.0/8
acl localnet src 192.168.1.0/24 # Your network here
acl localhost src 127.0.0.1/32
acl safeports port 21 70 80 210 280 443 488 563 591 631 777 901 81 3128 1025-65535
acl sslports port 443 563 81 2087 10000
acl manager proto cache_object
acl purge method PURGE
acl connect method CONNECT

#

http_access allow manager localhost
http_access deny manager
http_access allow purge localhost
http_access deny purge
http_access deny !safeports
http_access deny CONNECT !sslports
http_access allow localhost
http_access allow localnet
#http_access deny all
http_access allow all

#
# NETWORK OPTIONS
# 
#
http_port 3128
#
# OPTIONS WHICH AFFECT THE CACHE SIZE
# ==============================
#
cache_mem 1000 MB
maximum_object_size_in_memory 100 KB
memory_replacement_policy heap GDSF
cache_replacement_policy heap LFUDA
cache_dir aufs /home/<strong>precise</strong>/cache 10000 14 256
maximum_object_size 128000 KB
cache_swap_low 950
cache_swap_high 990
#
# LOGFILE PATHNAMES AND CACHE DIRECTORIES
# ==================================
#
access_log /var/log/squid3/access.log
cache_log /cache/cache.log
#cache_log /dev/null
cache_store_log none
logfile_rotate 5
log_icp_queries off
#
# OPTIONS FOR TUNING THE CACHE
# ========================
#
cache deny QUERY
refresh_pattern ^ftp: 1440 20% 10080 reload-into-ims
refresh_pattern ^gopher: 1440 0% 1440
refresh_pattern -i .(gif|png|jp?g|ico|bmp|tiff?)$ 10080 95% 43200 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(rpm|cab|deb|exe|msi|msu|zip|tar|xz|bz|bz2|lzma|gz|tgz|rar|bin|7z|doc?|xls?|ppt?|pdf|nth|psd|sis)$ 10080 90% 43200 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(avi|iso|wav|mid|mp?|mpeg|mov|3gp|wm?|swf|flv|x-flv|axd)$ 43200 95% 432000 override-expire override-lastmod reload-into-ims ignore-no-cache ignore-private
refresh_pattern -i .(html|htm|css|js)$ 1440 75% 40320
refresh_pattern -i .index.(html|htm)$ 0 75% 10080
refresh_pattern -i (/cgi-bin/|?) 0 0% 0
refresh_pattern . 1440 90% 10080
#
quick_abort_min 0 KB
quick_abort_max 0 KB
quick_abort_pct 100
store_avg_object_size 1355 KB
#
# HTTP OPTIONS
# ===========
vary_ignore_expire on
#
# ANONIMITY OPTIONS
# ===============
#
request_header_access From deny all
request_header_access Server deny all
request_header_access Link deny all
request_header_access Via deny all
request_header_access X-Forwarded-For deny all
#
# TIMEOUTS
# =======
#
forward_timeout 240 second
connect_timeout 30 second
peer_connect_timeout 5 second
read_timeout 600 second
request_timeout 60 second
shutdown_lifetime 10 second
#
# ADMINISTRATIVE PARAMETERS
# =====================
#
cache_mgr admin@domain.com
cache_effective_user proxy
cache_effective_group proxy
httpd_suppress_version_string on
visible_hostname Fahad_Ahammed
#
ftp_list_width 32
ftp_passive on
ftp_sanitycheck on
#
# DNS OPTIONS
# ==========
#
dns_timeout 10 seconds
dns_nameservers 8.8.8.8 8.8.4.4 # DNS Server
#
# MISCELLANEOUS
# ===========
#
memory_pools off
client_db off
reload_into_ims on
coredump_dir /cache
pipeline_prefetch on
offline_mode off
#
#Marking ZPH
#==========
zph_mode tos
zph_local 0x04
zph_parent 0
zph_option 136
### END CONFIGURATION ###</pre>

Create swap directory,

&nbsp;

<pre><strong>squid3 -z</strong></pre>

&nbsp;

Restart squid3:

&nbsp;

<pre><strong>sudo /etc/init.d/squid3 restart</strong></pre>

&nbsp;

Your squid proxy server installation and configuration is complete . You have to set ip and port (which is by default 3128) in your firefox. After this when you will try to connect you will be notified to put username and password .

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/07/squid_user_password.png