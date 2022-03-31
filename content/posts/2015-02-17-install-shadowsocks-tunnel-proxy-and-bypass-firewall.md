---
title: Install Shadowsocks Tunnel Proxy and Bypass Firewall
author: Fahad Ahammed
type: post
date: 2015-02-17T14:53:44+00:00
url: /install-shadowsocks-tunnel-proxy-and-bypass-firewall/
categories:
  - Technology
tags:
  - Bypass any restriction on visiting websites by shadowsocks
  - Bypass firewall by shadowsocks
  - Shadow SOCKS protocol error in NAT vps
  - Shadow SOCKS protocol error lowendspirit vps
  - Shadowsocks as http proxy
  - Shadowsocks setup on vps ipv6/v4 NAT or alternative method to bypass GFW of China

---
I am going to explain how you can bypass any firewall and become anonymous with the steps to install shadowsocks and then i will also show you how you can connect to one server/location but will show your public ip another. Shadowsocks is very fast tunnel proxy which can bypass the most dangerous firewall like &#8220;**Great Firewall of China**&#8220;.

<!--more-->

&nbsp;

<h2 style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/02/Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall.png"><img loading="lazy" class="alignnone size-medium wp-image-2047" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/02/Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall-300x300.png?resize=300%2C300" alt="Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/02/Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/02/Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2015/02/Install-Shadowsocks-Tunnel-Proxy-and-Bypass-Firewall.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</h2>

## \# How to Install Shadowsocks

### Debian / Ubuntu:

<pre>apt-get install -y python-pip
pip install shadowsocks</pre>

### CentOS:

<pre>yum install python-setuptools && easy_install pip
pip install shadowsocks</pre>

## \# How To Configure it. ``

To run in the background:

<pre>sudo ssserver -p 8388 -k password -m rc4-md5 --user nobody -d start</pre>

Or just(**recommended**):

<pre>sudo ssserver -p 8388 -k password -m rc4-md5 -d start</pre>

To stop:

<pre>sudo ssserver -d stop</pre>

To check the log:

<pre>sudo less /var/log/shadowsocks.log</pre>

This above method is the perfect procedure for your lowendspirit or Megavz/NanoVZ/Ninja or NATed vps. You can use your own port after &#8220;-p&#8221;. It is important to avoid **aes-256-cfb** in NATed vps, rc4-md5 is good for them.

<div class="markdown-body">
  <p>
    You can use a configuration file instead of command line arguments.
  </p>
  
  <p>
    Create a config file <strong>/etc/shadowsocks.json</strong>. Example:
  </p>
  
  <pre>{
    "server":"<span style="color: #ff0000;">Your_server_ip_or_NATed_vps_Public_IP</span>",
    "server_port":<span style="color: #ff0000;">8388</span>,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"mypassword",
    "timeout":300,
    "method":"<span style="color: #ff0000;">aes-256-cfb</span>",
    "fast_open": false
}
</pre>
  
  <p>
    To run Shadowsocks by that config in the background:
  </p>
  
  <pre><code>ssserver -c /etc/shadowsocks.json -d start
ssserver -c /etc/shadowsocks.json -d stop</code></pre>
</div>

##  # How to use it.

To use in Android mobiles go to <a title="Shadowsocks" href="https://play.google.com/store/apps/details?id=com.github.shadowsocks" target="_blank">here</a>. To use it in windows go to <a title="Every Clients." href="http://link.fahad.pw/1A2wblp" target="_blank">here</a>.

##  # How to connect to an ip but show another.

Let you have two vps. One in USA and other in Russia. If you want to connect to USA vps shadowsocks but want to appear in the world wide web as Russian then this section is for you.

First install Shadowsocks in both machine and make it running. It will be good if you chose same port in both and also same password.

Let,

<pre>111.222.333.444 - USA</pre>

<pre>444.333.222.111 - Russia</pre>

Now as you want to connect to Russian vps then in that vps install haproxy.

<pre>apt-get install -y haproxy</pre>

Now edit /etc/haproxy/haproxy.cfg and change port and ip according to yours.

<pre>global
        ulimit-n  51200

defaults
        log global
        mode    tcp
        option  dontlognull
        contimeout 1000
        clitimeout 150000
        srvtimeout 150000

frontend ss-in
        bind *:<span style="color: #ff0000;">8388</span>
        default_backend ss-out

backend ss-out
        server <span style="color: #ff0000;">USA IP_of_Your_USA_VPS(as mine 111.222.333.444):8388</span> maxconn 20480</pre>

Now, stop ssserver or shadowsocks (by the method you started) before turning on haproxy.

<pre>ssserver -c /etc/shadowsocks.json -d stop</pre>

or

<pre>sudo ssserver -d stop</pre>

Turn on haproxy as daemon.

<pre>haproxy -D -f /etc/haproxy/haproxy.cfg</pre>

Start Shadowsocks.

<pre>ssserver -c /etc/shadowsocks.json -d start</pre>

or

<pre>sudo ssserver -p 8388 -k password -m rc4-md5 -d start</pre>

Then you can easily connect to Russian vps by Shadowsocks and surf internet or World Wide Web but you will be introduced as American. 🙂

## \# How To make it as http proxy.

You can also make your vps a http proxy which will encrypt your data.

First install polipo and turn it off:

<div class="highlight highlight-bash">
  <pre>apt-get install polipo</pre>
  
  <pre>service polipo stop</pre>
  
  <p>
    Now,start with parent proxy set to Shadowsocks:
  </p>
  
  <pre>polipo socksParentProxy=localhost:1080 &</pre>
  
  <p>
    Now you can use your Shadowsocks as http proxy.<br /> Proxy_IP: IP_of_Your_Polipo_Installed_VPS<br /> Proxy_PORT: PORT_of_Your_ShadowSocks
  </p>
  
  <p style="text-align: center;">
    Thank You.
  </p>
</div>