---
title: Shell Script to Test Your VPS or Servers Efficiency
author: Fahad Ahammed
type: post
date: 2014-01-12T07:22:44+00:00
url: /shell-script-to-test-your-vps-or-servers-efficiency/
categories:
  - Technology
tags:
  - How to test my vps cpu frequency ?
  - How to test my vps download speed ?
  - how to test my vps I/O Speed ?
  - scripts
  - test my servers download speed
  - test my vps efficiency
  - vps I/O check by a test

---
Server lover like me and you will always try our best to get the full performance from our VPS/Server. Here is a script to show you some interesting thing about your server including download speed from popular Data Center, cpu model, frequency, ram, swap, Uptime I/O Speed etc.

<!--more-->

Lets look at an interesting test.

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/test_vps.png"><img loading="lazy" class="aligncenter size-full wp-image-1075" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/test_vps.png?resize=473%2C307" alt="test_vps" width="473" height="307" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/test_vps.png?w=473&ssl=1 473w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/test_vps.png?resize=300%2C195&ssl=1 300w" sizes="(max-width: 473px) 100vw, 473px" data-recalc-dims="1" /></a>
</p>

Do you want to test ? run below command in your servers ssh or terminal.

<pre><span style="color: #ff0000;"><b>wget --no-check-certificate obakfahad.com/extras/test.sh -O - -o /dev/null|bash</b></span></pre>

The Script is:

<pre>#!/bin/bash
#----------
# VPS Testing Script

cname=$( awk -F: '/model name/ {name=$2} END {print name}' /proc/cpuinfo )
cores=$( awk -F: '/model name/ {core++} END {print core}' /proc/cpuinfo )
freq=$( awk -F: ' /cpu MHz/ {freq=$2} END {print freq}' /proc/cpuinfo )
tram=$( free -m | awk 'NR==2 {print $2}' )
swap=$( free -m | awk 'NR==4 {print $2}' )
up=$(uptime|awk '{ $1=$2=$(NF-6)=$(NF-5)=$(NF-4)=$(NF-3)=$(NF-2)=$(NF-1)=$NF=""; print }')

echo "CPU model : $cname"
echo "Number of cores : $cores"
echo "CPU frequency : $freq MHz"
echo "Total amount of ram : $tram MB"
echo "Total amount of swap : $swap MB"
echo "System uptime : $up"

cachefly=$( wget -O /dev/null http://cachefly.cachefly.net/100mb.test 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from CacheFly: $cachefly "
coloatatl=$( wget -O /dev/null http://speed.atl.coloat.com/100mb.test 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Coloat, Atlanta GA: $coloatatl "
sldltx=$( wget -O /dev/null http://speedtest.dal05.softlayer.com/downloads/test100.zip 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Softlayer, Dallas, TX: $sldltx "
linodejp=$( wget -O /dev/null http://speedtest.tokyo.linode.com/100MB-tokyo.bin 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Linode, Tokyo, JP: $linodejp "
i3d=$( wget -O /dev/null http://mirror.i3d.net/100mb.bin 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from i3d.net, Rotterdam, NL: $i3d"
linodeuk=$( wget -O /dev/null http://speedtest.london.linode.com/100MB-london.bin 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Linode, London, UK: $linodeuk "
leaseweb=$( wget -O /dev/null http://mirror.leaseweb.com/speedtest/100mb.bin 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Leaseweb, Haarlem, NL: $leaseweb "
slsg=$( wget -O /dev/null http://speedtest.sng01.softlayer.com/downloads/test100.zip 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Softlayer, Singapore: $slsg "
slwa=$( wget -O /dev/null http://speedtest.sea01.softlayer.com/downloads/test100.zip 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Softlayer, Seattle, WA: $slwa "
slsjc=$( wget -O /dev/null http://speedtest.sjc01.softlayer.com/downloads/test100.zip 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Softlayer, San Jose, CA: $slsjc "
slwdc=$( wget -O /dev/null http://speedtest.wdc01.softlayer.com/downloads/test100.zip 2&gt;&1 | awk '//dev/null/ {speed=$3 $4} END {gsub(/(|)/,"",speed); print speed}' )
echo "Download speed from Softlayer, Washington, DC: $slwdc "

io=$( ( dd if=/dev/zero of=test_$$ bs=64k count=16k conv=fdatasync && rm -f test_$$ ) 2&gt;&1 | awk -F, '{io=$NF} END { print io}' )
echo "I/O speed : $io"</pre>

Thank You.