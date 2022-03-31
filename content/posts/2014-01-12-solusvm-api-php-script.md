---
title: SolusVM API PHP Script
author: Fahad Ahammed
type: post
date: 2014-01-12T06:53:23+00:00
url: /solusvm-api-php-script/
classic-editor-remember:
  - classic-editor
categories:
  - Technology
tags:
  - scripts
  - solusvm api key php script
  - solusvm api script to show vps info in a page

---
The client API is a http based API that allows you and your clients to interact directly with a virtual server with security and ease. The client API can be disabled at any time and access is only granted with a key and hash on a per vps basis.Currently available options are: <!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/solus_php_script.png"><img loading="lazy" class="aligncenter size-full wp-image-1062" alt="solus_php_script" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/solus_php_script.png?resize=543%2C165" width="543" height="165" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/solus_php_script.png?w=543&ssl=1 543w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/01/solus_php_script.png?resize=300%2C91&ssl=1 300w" sizes="(max-width: 543px) 100vw, 543px" data-recalc-dims="1" /></a>
</p>

Here is the script:

<pre>&lt;?php
/**
 *    A php script to show you information of your vps run by solusvm.
 *    by Fahad Ahammed
 */
set_time_limit(180);
$serv_array = array(
    array(//VPS-1
        'api_server' =&gt; 'https://vps1.domain.com:5656', //panel login page
        'api_key'    =&gt; 'AAAAA-BBBBB-CCCCC', //Replace by yours
        'api_hash'   =&gt; '1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a', //Replace by yours

    ),
    array(//VPS-2
        'api_server' =&gt; 'https://vps2.domain.com:5656', //panel login page
        'api_key'    =&gt; 'AAAAA-BBBBB-CCCCC', //Replace by yours
        'api_hash'   =&gt; '1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a', //Replace by yours

);

define('URL_FORMAT', '%s/api/client/command.php?key=%s&hash=%s&action=info&ipaddr=true&bw=true&mem=true&hdd=true&status=true'); //url key hash

foreach ($serv_array as $server) {
$url = sprintf(URL_FORMAT, $server['api_server'], $server['api_key'], $server[api_hash]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);

$data = curl_exec($ch);
curl_close($ch);

preg_match("/&lt;hostname&gt;(.*)&lt;/hostname&gt;/", $data, $hostname);
preg_match("/&lt;vmstat&gt;(.*)&lt;/vmstat&gt;/", $data, $vmstat);
preg_match("/&lt;ipaddr&gt;(.*)&lt;/ipaddr&gt;/", $data, $ipaddr);
preg_match("/&lt;hdd&gt;(.*),(.*),(.*),(.*)&lt;/hdd&gt;/", $data, $hdd);
preg_match("/&lt;bw&gt;(.*),(.*),(.*),(.*)&lt;/bw&gt;/", $data, $bw);
preg_match("/&lt;mem&gt;(.*),(.*),(.*),(.*)&lt;/mem&gt;/", $data, $mem);

$hdd[2] = format_bytes($hdd[2]);
$mem[2] = format_bytes($mem[2]);
$bw[2] = format_bytes($bw[2]);

echo "&lt;strong&gt;Server: &lt;/strong&gt;$hostname[1]&lt;br /&gt;n";
echo "&lt;strong&gt;Status: &lt;/strong&gt;$vmstat[1]&lt;br /&gt;n";
echo "&lt;strong&gt;IP: &lt;/strong&gt;$ipaddr[0]&lt;br /&gt;n";
echo "&lt;strong&gt;HDD used: &lt;/strong&gt;$hdd[2], $hdd[4]%&lt;br /&gt;n";
echo "&lt;strong&gt;Memory used: &lt;/strong&gt;$mem[2], $mem[4]%&lt;br /&gt;n";
echo "&lt;strong&gt;Bandwidth used: &lt;/strong&gt;$bw[2], $bw[4]%&lt;br /&gt;n";
echo "&lt;hr /&gt;";
}

function format_bytes($size) {
$units = array(' B', ' KB', ' MB', ' GB', ' TB');
for ($i = 0; $size &gt;= 1024 && $i &lt; 4; $i++) $size /= 1024;
return round($size, 2).$units[$i];
}

?&gt;</pre>

&nbsp;

From above image , you are seeing some button to reboot, shutdown, boot, reload. They are just html links having desired pattern of solusvm.

Links are:

Shutdown

`https://vps1.domain.com:5656/api/client/command.php?key=AAAAA-BBBBB-CCCCC&hash=1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a&action=shutdown`

Reboot

`https://vps1.domain.com:5656/api/client/command.php?key=AAAAA-BBBBB-CCCCC&hash=1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a&action=reboot`

Boot

`https://vps1.domain.com:5656/api/client/command.php?key=AAAAA-BBBBB-CCCCC&hash=1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a&action=boot`

Reload

`https://vps1.domain.com:5656/api/client/command.php?key=AAAAA-BBBBB-CCCCC&hash=1a1a1a1a1a1a1a1a1a1aa1a1a1a1a1a1aa1a1a1a&action=reload`

Just replace your api key and hash and url of solusvm.

Thank You.