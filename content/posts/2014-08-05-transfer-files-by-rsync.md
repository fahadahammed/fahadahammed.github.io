---
title: Transfer Files by Rsync
author: Fahad Ahammed
type: post
date: 2014-08-05T15:41:39+00:00
url: /transfer-files-by-rsync/
categories:
  - Technology
tags:
  - backup full site to a remote server
  - backup system by rsync and mysqldump
  - backup wordpress site to a different server
  - make mirror by rsync and also mysql dump
  - rsync
  - transfer files by rsync without giving password
  - Transfer files via rsync

---
<a title="Rsync" href="http://link.fahad.pw/1y0uO1F" target="_blank"><strong>rsync</strong></a> is a free software computer program for Unix and Linux like systems which synchronizes files and directories from one location to another while minimizing data transfer using delta encoding when appropriate. An important feature of rsync not found in most similar programs/protocols is that the mirroring takes place with only one transmission in each direction. This tool is very appropriate to keep backup or setup mirror service. In this article you will get some clear idea.

<!--more-->

<p style="text-align: center;">
  <p style="text-align: center;">
    <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Transfer_Files_by_Rsync.png"><img loading="lazy" class="alignnone size-medium wp-image-2060" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Transfer_Files_by_Rsync-300x300.png?resize=300%2C300" alt="Transfer_Files_by_Rsync.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Transfer_Files_by_Rsync.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Transfer_Files_by_Rsync.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Transfer_Files_by_Rsync.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
  </p>
  
  <p>
    It can perform differential uploads and downloads (synchronization) of files across the network, transferring only data that has changed. The rsync remote-update protocol allows rsync to transfer just the differences between two sets of files across the network connection.
  </p>
  
  <h2>
    Install:
  </h2>
  
  <p>
    If you are using Debian or Ubuntu Linux, type the following command:
  </p>
  
  <pre>apt-get install rsync</pre>
  
  <p>
    OR
  </p>
  
  <pre>sudo apt-get install rsync</pre>
  
  <p>
    If you are using Red Hat Enterprise Linux (RHEL) / CentOS 4.x or older version, type the following command:
  </p>
  
  <pre>up2date rsync</pre>
  
  <p>
    RHEL / CentOS 5.x or newer (or Fedora Linux) user type the following command:
  </p>
  
  <pre>yum install rsync</pre>
  
  <h2>
    SSH-Keygen Generates Keys:
  </h2>
  
  <p>
    It is safe to use rsync over ssh. To safely use rsync and to be secured you can generate keys to use rsync without giving password. This key will help you to keep backup. For better knowledge you can visit my another post by clicking <a title="Crontab Rsync without Password" href="http://obakfahad.com/crontab-rsync-without-password/" target="_blank">here</a>.
  </p>
  
  <pre>ssh-keygen</pre>
  
  <p>
    Enter passphrase (empty for no passphrase):
  </p>
  
  <p>
    Enter same passphrase again:
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    Use remote machine ip to access without password.
  </p>
  
  <pre>ssh-copy-id -i ~/.ssh/id_rsa.pub "root@<strong>111.222.333.444</strong> -p 22"</pre>
  
  <h2>
    Tasks:
  </h2>
  
  <p>
    Here i will show you some tasks or examples.
  </p>
  
  <h3>
    #1. Copy file from a local computer to a remote server.
  </h3>
  
  <p>
    Copy file from /var/www/backup.tar.gz to a remote servers /var/www/ folder, called server1.domain.com
  </p>
  
  <pre>rsync -v -e ssh /var/www/backup.tar.gz root@server1.domain.com:~/var/www/</pre>
  
  <p>
    Please note that symbol ~ indicate the users home directory (/home/user).
  </p>
  
  <h3>
    #2. Copy file from a remote server to a local computer.
  </h3>
  
  <p>
    Copy file /var/www/backup.tar.gz from a remote server server1.domain.com to a local computer&#8217;s /var/www/ directory:
  </p>
  
  <pre>rsync -v -e ssh root@server1.domain.com:~/var/www/backup.tar.gz /var/www/</pre>
  
  <h3>
    #3. Synchronize a local directory with a remote directory. (From local to server)
  </h3>
  
  <pre>rsync -r -a -v -e "ssh -l root -p 22" --delete /var/www/ server1.domain.com:/var/www/</pre>
  
  <h3>
    #4. Synchronize a remote directory with a local directory. (From server to local)
  </h3>
  
  <pre>rsync -r -a -v -e "ssh -l root -p 22" --delete server1.domain.com:/var/www/ /var/www/</pre>
  
  <h3>
    #5. Synchronize a local directory with a remote rsync server or vise-versa.
  </h3>
  
  <pre>rsync -r -a -v --delete rsync://server1.domain.com/backup /var/www/backup</pre>
  
  <p>
    OR
  </p>
  
  <pre>rsync -r -a -v --delete /var/www/backup rsync://server1.domain.com/backup</pre>
  
  <h3>
    #6. Mirror a directory between my &#8220;old&#8221; and &#8220;new&#8221; web server/ftp
  </h3>
  
  <p>
    You can mirror a directory between my &#8220;old&#8221; (server1.domain.com) and &#8220;new&#8221; web server with the command (assuming that ssh keys are set for password less authentication)
  </p>
  
  <pre>rsync -zavrR --delete --links --rsh="ssh -l root -p 22" server1.domain.com:/var/www /var/www</pre>
  
  <p>
    &nbsp;
  </p>
  
  <h2>
    Backup Database:
  </h2>
  
  <p>
    Below command will be very helpful for backing up a database.
  </p>
  
  <pre>mysqldump --opt -Q -u root --password='password' dbname | gzip &gt; /var/www/dbname.gz</pre>
  
  <p>
    Above command will backup the database by compressing that to gzip.
  </p>