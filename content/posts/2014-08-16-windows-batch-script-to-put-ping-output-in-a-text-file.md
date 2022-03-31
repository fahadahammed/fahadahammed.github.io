---
title: Windows Batch Script to Put Ping Output in a Text File
author: Fahad Ahammed
type: post
date: 2014-08-16T08:31:03+00:00
url: /windows-batch-script-to-put-ping-output-in-a-text-file/
categories:
  - Technology
tags:
  - batch file to test vultrs locations
  - batch script to ping an ip or website
  - digitaloceans all test ips
  - get ping results from digitaloceans all location
  - get ping results in a text file of digital oceans all locations
  - scripts
  - Single click ping test of Vultrs all locations to deploy.

---
In DOS, OS/2, and also Microsoft Windows, batch file is the name given to a type of script file, a text file containing a series of commands to be executed by the command interpreter. A batch file may contain any command the interpreter accepts interactively at the command prompt. A batch file may also have constructs (IF, GOTO, Labels, CALL, etc.) that enable conditional branching and looping within the batch file. Recently i was playing with it and got a cool script while playing with ping command which will output ping results in a text file in Desktop.<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File.png"><img loading="lazy" class="alignnone size-medium wp-image-2053" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File-300x300.png?resize=300%2C300" alt="Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Windows_Batch_Script_to_Put_Ping_Output_in_a_Text_File.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

I have been using that batch file to get <a title="DigitalOcean Cloud Hosting Provider" href="https://www.digitalocean.com/?refcode=eea6b80ee1c4" target="_blank" rel="noopener">DigitalOceans</a> and <a title="Vultr Cloud Hosting Provider" href="http://www.vultr.com/?ref=6809180" target="_blank" rel="noopener">Vultrs</a> all location to get ping result from my network. It helps to take decision which location will be better.

Digitaloceans All locations test ip&#8217;s:

<pre>NYC1: 198.211.112.36
NYC2: 162.243.123.82
AMS1: 146.185.176.179
AMS2: 95.85.7.154
SFO1: 162.243.146.51
SGP1: 128.199.236.18
LON1: 178.62.63.247
SGP1: 2400:6180::d0:0:0:1:5001
LON1: 2a03:b0c0:1:d0::6001</pre>

Batch File to generate a text file by the ping test of above ipv4 addresses.

<pre>@echo off
cd 
echo Batch file created by Fahad Ahammed (www.obakfahad.com) &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean NYC1
echo Digitalocean NYC1 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 198.211.112.36
ping 198.211.112.36 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean NYC2
echo Digitalocean NYC2 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 162.243.123.82
ping 162.243.123.82 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean AMS1
echo Digitalocean AMS1 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 146.185.176.179
ping 146.185.176.179 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean AMS2
echo Digitalocean AMS2 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 95.85.7.154
ping 95.85.7.154 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean SFO1
echo Digitalocean SFO1 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 162.243.146.51
ping 162.243.146.51 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean SGP1
echo Digitalocean SGP1 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 128.199.236.18
ping 128.199.236.18 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"


echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo Digitalocean LON1
echo Digitalocean LON1 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
ping 178.62.63.247
ping 178.62.63.247 &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopdigitalocean_ping_from_yournetwork.txt"

pause
</pre>

You can download already created batch file from <a title="DigitalOcean Ping Batch File" href="http://fahadahammed.com/extras/do_ping.bat" target="_blank" rel="noopener">here</a>.You can just double click to get the result in a text file in your desktop.

## Vultrs batch file for ping test:

<pre>@echo off
cd 
echo Batch file created by Fahad Ahammed (www.obakfahad.com) &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ________________ASIA PACIFIC___________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo  (Asia) Tokyo, Japan 
echo  (Asia) Tokyo, Japan &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping hnd-jp-ping.vultr.com 
ping hnd-jp-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    (AU) Sydney, Australia 
echo    (AU) Sydney, Australia   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   syd-au-ping.vultr.com
ping   syd-au-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ________________EUROPE___________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo  (EU) Frankfurt, DE
echo  (EU) Frankfurt, DE &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping  fra-de-ping.vultr.com
ping  fra-de-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo   (EU) Amsterdam, NL
echo   (EU) Amsterdam, NL &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping  ams-nl-ping.vultr.com
ping  ams-nl-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo   (EU) Paris, France 
echo   (EU) Paris, France  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping  par-fr-ping.vultr.com
ping  par-fr-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo   (EU) London, UK 
echo   (EU) London, UK  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping  lon-gb-ping.vultr.com
ping  lon-gb-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ________________NORTH AMERICA___________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    Seattle, Washington 
echo    Seattle, Washington   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   wa-us-ping.vultr.com 
ping   wa-us-ping.vultr.com  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    New York / New Jersey 
echo    New York / New Jersey   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   nj-us-ping.vultr.com 
ping   nj-us-ping.vultr.com  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo   Chicago, Illinois  
echo   Chicago, Illinois  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   il-us-ping.vultr.com 
ping   il-us-ping.vultr.com  &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    Los Angeles, California  
echo    Los Angeles, California   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping    lax-ca-us-ping.vultr.com  
ping    lax-ca-us-ping.vultr.com   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    Atlanta, Georgia  
echo    Atlanta, Georgia   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping    ga-us-ping.vultr.com  
ping    ga-us-ping.vultr.com   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    Dallas, Texas  
echo    Dallas, Texas   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   tx-us-ping.vultr.com 
ping   tx-us-ping.vultr.com &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo    Miami, Florida 
echo    Miami, Florida   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ___________________________________
echo ___________________________________ &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
ping   fl-us-ping.vultr.com  
ping   fl-us-ping.vultr.com   &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
echo ###################################
echo ################################### &gt;&gt; "C:Users%username%Desktopvultr_ping_from_yournetwork.txt"
pause
</pre>

Vultrs Batch <a href="http://fahadahammed.com/extras/vultr_ping.bat" target="_blank" rel="noopener">file</a> to ping test. Pelase leave feedback.