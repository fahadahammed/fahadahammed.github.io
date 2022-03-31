---
title: Installing Squid Proxy Server in Ubuntu
author: Fahad Ahammed
type: post
date: 2013-04-15T13:28:50+00:00
url: /installing-squid-proxy-server-in-ubuntu/
classic-editor-remember:
  - classic-editor
categories:
  - Proxy Server
tags:
  - ban domain access in squid proxy server
  - ban google by squid proxy
  - proxy vps
  - squid
  - squid proxy from vps
  - squid proxy server
  - squid proxy server with user and password

---
Log in on Ubuntu Server, then type command below to Install squid :<!--more-->

<span style="color: #ff6600;"><strong>sudo apt-get install squid3 ccze</strong></span>

Create directory for Cache, on this case cache directory placed on  
directory <span style="color: #339966;">/home/precise/cache/</span>. Then change  
the permissions cache directory to 777 and owner <span style="color: #339966;">proxy:proxy</span>

**<span style="color: #ff6600;">sudo mkdir -p /home/precise/cache/</span>**

**<span style="color: #ff6600;">sudo chmod 777 /home/precise/cache/</span>**

**<span style="color: #ff6600;">sudo chown proxy:proxy /home/precise/cache/</span>**

Before editing squid configuration, Make a backup of your  
/etc/squid3/squid.conf file for future reference. Squid.conf has  
nearly all the options listed and it is recommended to go through that  
file to know more about squid options.

<span style="color: #ff6600;"><strong>sudo cp /etc/squid3/squid.conf /etc/squid3/squid.conf.origin</strong></span>

**<span style="color: #ff6600;">sudo chmod a-w /etc/squid3/squid.conf.origin</span>**

Now edit <span style="color: #339966;">/etc/squid3/squid.conf</span> file, delete all options  
in <span style="color: #339966;">/etc/squid3/squid.conf</span> then replace with squid3 configuration below

**<span style="color: #ff6600;">sudo nano /etc/squid3/squid.conf</span>**

**Squid3 configuration:**

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
acl ym dstdomain .messenger.yahoo.com .psq.yahoo.com
acl ym dstdomain .us.il.yimg.com .msg.yahoo.com .pager.yahoo.com
acl ym dstdomain .rareedge.com .ytunnelpro.com .chat.yahoo.com
acl ym dstdomain .voice.yahoo.com
acl ymregex url_regex yupdater.yim ymsgr myspaceim
#
http_access deny ym
http_access deny ymregex
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
cache_dir aufs /home/</pre>

**<span style="color: #ff6600;">precise</span>**

<pre>/cache 10000 14 256
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
cache_mgr fahad@obakfahad.com
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
dns_nameservers 192.168.1.1 8.8.8.8 8.8.4.4 # DNS Server
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

<span style="color: #ff6600;"><strong>squid3 -z</strong></span>

Restart squid3:

**<span style="color: #ff6600;">sudo /etc/init.d/squid3 restart</span>**

<span style="color: #993366;">Your squid proxy server installation and configuration is complete . You have to set ip and port (which is by default 3128) in your firefox.</span>