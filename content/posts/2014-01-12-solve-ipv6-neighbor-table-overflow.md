---
title: Solve IPV6 Neighbor Table Overflow
author: Fahad Ahammed
type: post
date: 2014-01-12T11:02:31+00:00
url: /solve-ipv6-neighbor-table-overflow/
categories:
  - Technology
tags:
  - IPV6 Neighbor Table Overflow

---
There are sometimes you will get some errors in /var/log/syslog.log saying IPV6 Neighbor Table Overflow and which are really annoying. For fixing this you should follow this.

<!--more-->

  
I got this error in my Debian-7 vps. I have been assigned 6 IPV6. This error was making me crazy. However, i did find the solution and here it is. You have to add below lines in the sysctl config file. Add those lines in the end.

<pre>## works best with &lt;= 500 client computers ##
# Force gc to clean-up quickly
net.ipv6.neigh.default.gc_interval = 3600

# Set ARP cache entry timeout
net.ipv6.neigh.default.gc_stale_time = 3600

# Setup DNS threshold for arp
net.ipv6.neigh.default.gc_thresh3 = 4096
net.ipv6.neigh.default.gc_thresh2 = 2048
net.ipv6.neigh.default.gc_thresh1 = 1024</pre>

<div>
  <div>
    <pre>sysctl -p</pre>
  </div>
</div>

And better reboot your vps.

Thank You.