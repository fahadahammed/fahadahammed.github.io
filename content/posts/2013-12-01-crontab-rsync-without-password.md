---
title: Crontab Rsync without Password
author: Fahad Ahammed
type: post
date: 2013-12-01T10:51:24+00:00
url: /crontab-rsync-without-password/
categories:
  - Technology
tags:
  - crontab rsync
  - crontab ssh copy
  - how to remote backup files from server by crontab without password asks
  - How to use ssh-copy-id on a non-standard port
  - rsync
  - rsync without password
  - ssh without password
  - ssh-copy-id different port
  - ssh-copy-id on a different port

---
Perform rsync asks for password on the remote server before starting the transfer. Sometimes we need to run rsync by crontab where it is not possible to give password.  Here is a solution to use crontab to execute rsync without any password.

This is helpful when you are scheduling a cron job for automatic backup using rsync.

<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/12/Crontab_Rsync_without_Password.png"><img loading="lazy" class="aligncenter  wp-image-1662" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/12/Crontab_Rsync_without_Password.png?resize=379%2C379" alt="Crontab_Rsync_without_Password" width="379" height="379" data-recalc-dims="1" /></a>
</p>

Rsync to remote server use ssh. So,Now setup ssh so that it doesn’t ask for password when you perform ssh. Use ssh-keygen on local server to generate public and private keys.

<pre>ssh-keygen
Enter passphrase (empty for no passphrase):
Enter same passphrase again:</pre>

**Note:** When it asks you to enter the passphrase just press enter key, and do not give any password here.

Use ssh-copy-id, to copy the public key to the remote host.

<pre>ssh-copy-id -i ~/.ssh/id_rsa.pub <strong>192.168.23.7</strong></pre>

**Note:** We are using **192.168.23.7** as the remote server. Here you will have to replace this IP with your remote server. The above will ask the password for your account on the remote host, and copy the public key automatically to the appropriate location.

Now, you should be able to ssh to remote host without entering the password. And thus also Rsync.

Now let you have a different ssh port on the remote server. You have to use below code.

<pre>ssh-copy-id -i ~/.ssh/id_rsa.pub "root@192.168.23.7 -p <strong>99</strong>"</pre>

**99** should be replaced by the ssh port of your remote server.

<p style="text-align: center;">
  That is it. 🙂 . Thank You.
</p>