---
title: Benchmark of Ghost Blog Against WordPress
author: Fahad Ahammed
type: post
date: 2014-03-24T23:55:09+00:00
url: /benchmark-of-ghost-blog-against-wordpress/
categories:
  - Technology
tags:
  - apache2 vs nodejs
  - Benchmark of Ghost Blog
  - Ghost Blog and its performance
  - Ghost Blog Traffic Handling
  - Ghost vs wordpress
  - how to benchmark ghost blog
  - How to install apache benchmark tool
  - nodejs vs apache

---
This week i was trying to be familiar with node and ghost Blog. Launched a blog in my VPS. I will say Over whelming performance. As you can see i have posted how to install it with Apache server. I will now show you some benchmark report by Apache Benchmark tool. Lets see.<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/03/Benchmark_of_Ghost_Blog_Against_Wordpress.png"><img loading="lazy" class="aligncenter  wp-image-1679" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/03/Benchmark_of_Ghost_Blog_Against_Wordpress.png?resize=404%2C404" alt="Benchmark_of_Ghost_Blog_Against_Wordpress" width="404" height="404" data-recalc-dims="1" /></a>
</p>

Before going further you need to install apache benchmark or apache utilities tool.

<pre>apt-get install apache2-utils</pre>

Commands are:

<pre>ab -n 100 -c 100 http://domain.com/</pre>

It is recommended to give &#8220;**/**&#8221; at the end of the domain. **-c 100** means concurrent 100 visitors. -n 100 means per user with 100 request. I used this command for both system.

## WordPress-3.8.1 (Apache-2.2.22,PHP-5.4.4)

### Before test, RAM:

<pre>root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        978        195          0         12         85
-/+ buffers/cache:        881        293
Swap:         1905        450       1455
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        983        191          0         12         88
-/+ buffers/cache:        881        292
Swap:         1905        449       1456
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        983        190          0         12         89
-/+ buffers/cache:        881        292
Swap:         1905        449       1456</pre>

### Test Report:

<pre>Server Software:        Apache/2.2.22
Server Hostname:        domain.com
Server Port:            80

Document Path:          /
Document Length:        17684 bytes

Concurrency Level:      100
<strong>Time taken for tests:   22.930 seconds</strong>
Complete requests:      100
Failed requests:        0
Write errors:           0
Total transferred:      1797500 bytes
HTML transferred:       1768400 bytes
Requests per second:    4.36 [#/sec] (mean)
Time per request:       22929.674 [ms] (mean)
Time per request:       229.297 [ms] (mean, across all concurrent requests)
Transfer rate:          76.55 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       29   31   0.7     31      32
Processing:  2524 12736 7143.8  14682   22894
Waiting:     2493 10441 4965.3  11431   17938
Total:       2555 12767 7143.8  14712   22925

Percentage of the requests served within a certain time (ms)
  50%  14712
  66%  14714
  75%  14955
  80%  22923
  90%  22923
  95%  22924
  98%  22924
  99%  22925
 100%  22925 (longest request)</pre>

### During test, RAM:

<pre>root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174       1123         51          0          1         32
-/+ buffers/cache:       1090         84
Swap:         1905        485       1420
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174       1112         61          0          1         30
-/+ buffers/cache:       1081         93
Swap:         1905        521       1384
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174       1102         72          0          0         39
-/+ buffers/cache:       1061        113
Swap:         1905        554       1351</pre>

# Ghost Blog-0.4 (Nodejs+all)

### Before test, RAM:

<pre>root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        884        290          0         34         78
-/+ buffers/cache:        772        402
Swap:         1905        483       1422
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        884        290          0         34         78
-/+ buffers/cache:        772        402
Swap:         1905        483       1422
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        884        290          0         34         78
-/+ buffers/cache:        772        402
Swap:         1905        483       1422</pre>

### Test Report:

<pre>Server Software:        
Server Hostname:        blog.domain.com
Server Port:            80

Document Path:          /
Document Length:        3795 bytes

Concurrency Level:      100
<strong>Time taken for tests:   1.670 seconds</strong>
Complete requests:      100
Failed requests:        0
Write errors:           0
Total transferred:      403200 bytes
HTML transferred:       379500 bytes
Requests per second:    59.88 [#/sec] (mean)
Time per request:       1670.128 [ms] (mean)
Time per request:       16.701 [ms] (mean, across all concurrent requests)
Transfer rate:          235.76 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:       29   30   0.5     30      33
Processing:   137  949 470.9    927    1632
Waiting:      137  949 470.9    927    1632
Total:        166  979 471.0    957    1665

Percentage of the requests served within a certain time (ms)
  50%    957
  66%   1180
  75%   1441
  80%   1497
  90%   1601
  95%   1650
  98%   1659
  99%   1665
 100%   1665 (longest request)</pre>

### During Test, RAM:

<pre>root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        889        284          0         34         78
-/+ buffers/cache:        777        397
Swap:         1905        482       1423
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        889        284          0         34         78
-/+ buffers/cache:        777        397
Swap:         1905        482       1423
root@vps:~# free -m
             total       used       free     shared    buffers     cached
Mem:          1174        889        284          0         34         78
-/+ buffers/cache:        777        397
Swap:         1905        482       1423</pre>

So, Ghost is perfect for huge traffic handling as its supposed to as it use nodejs to stay alive. I love ghost. You also will love it.