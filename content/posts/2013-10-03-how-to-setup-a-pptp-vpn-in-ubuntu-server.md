---
title: How To Setup a PPTP VPN in Ubuntu Server ?
author: Fahad Ahammed
type: post
date: 2013-10-03T05:46:33+00:00
url: /how-to-setup-a-pptp-vpn-in-ubuntu-server/
categories:
  - Technology
tags:
  - How To Setup a PPTP VPN in Ubuntu Server ?
  - pptp vpn install in ubuntu server
  - pptp vpn server

---
VPN secures your computer&#8217;s internet connection to guarantee that all of the data you&#8217;re sending and receiving is encrypted and secured from prying eyes. You can get cheap vpn from many vpn providers. But i will show you how to get a private VPN maintained by yourself by less then 4$.

<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/How_To_Setup_a_PPTP_VPN_in_Ubuntu_Server.png"><img loading="lazy" class="aligncenter  wp-image-1711" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/10/How_To_Setup_a_PPTP_VPN_in_Ubuntu_Server.png?resize=397%2C397" alt="How_To_Setup_a_PPTP_VPN_in_Ubuntu_Server" width="397" height="397" data-recalc-dims="1" /></a>
</p>

You will need a kvm. OpenVZ is normally very much painful. You can try but you need to ask your provider for accessing pptp.

After getting that install Ubuntu-12.04 in it. And then let the vpn installation begin :).

First we need to install pptp server using apt-get

<pre>sudo apt-get install pptpd</pre>

Then we need to configure the pptpd.

<pre>sudo nano /etc/pptpd.conf</pre>

Add server IP and client IP at the end of the file. You can add like below:

<pre>localip <span style="color: #ff0000;"><strong>192.168.0.1</strong></span>
remoteip 192.168.0.100-199</pre>

Replace <span style="color: #ff0000;"><strong>192.168.0.1</strong></span> with your server ip. This sets up the PPTP server to use IP **192.168.0.1** while distributing the IP range **`192.168.0.100-199`** to PPTP clients. Change these as you wish as long as they are private IP addresses and do not conflict with IP addresses already used by your server.

Configure DNS servers to use when clients connect to this PPTP server

<pre>sudo nano /etc/ppp/pptpd-options</pre>

Now comment out require-mppe-128 like below

<pre># Require MPPE 128-bit encryption
# (note that MPPE requires the use of MSCHAP-V2 during authentication)
<span style="color: #ff0000;">#require-mppe-128</span>
# }}}</pre>

Add Googles Public DNS like below

<pre># specifies the primary DNS address; the second instance (if given)
# specifies the secondary DNS address.
# Attention! This information may not be taken into account by a Windows
# client. See KB311218 in Microsoft's knowledge base for more information.
#ms-dns 10.0.0.1
#ms-dns 10.0.0.2

<span style="color: #ff0000;">ms-dns 8.8.8.8</span>
<span style="color: #ff0000;">ms-dns 8.8.4.4</span></pre>

Now add a VPN user in /etc/ppp/chap-secrets file.

<pre>sudo nano /etc/ppp/chap-secrets</pre>

The column is username. Second column is server name, you can put “pptpd” in there. Third column is password. The last column is the IP addresses, you can put * to allow all IP.

<pre># client        server  secret                  IP addresses
username * myPassword *</pre>

Finally start your server

<pre>/etc/init.d/pptpd restart</pre>

&nbsp;

### Setup IP Forwarding {#Setup_IP_Forwarding}

To enable IPv4 forward. Change /etc/sysctl.conf file, add forward rule blew.

<pre>sudo nano /etc/sysctl.conf</pre>

Uncomnent the line

<pre>net.ipv4.ip_forward=1</pre>

Then reload the configuration

<pre>sudo sysctl -p</pre>

Add forward rule in iptables

<pre>sudo nano /etc/rc.local</pre>

adding to the bottom just before the **exit 0**

    iptables -t nat -A POSTROUTING -o <strong>eth0</strong> -j MASQUERADE

Use **venet0** instead of **eth0** if you have Openvz .

Now run below command.

FOR Xen/KVM :

<pre>iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</pre>

FOR OpenVZ :

<pre>iptables -t nat -A POSTROUTING -o venet0 -j MASQUERADE</pre>

You are done. Just reboot your server and you should be able to connect to using PPTPD and send all your traffic through this server.

<h3 style="text-align: center;">
  <span style="color: #00ff00;">Thank<strong> You</strong></span>
</h3>