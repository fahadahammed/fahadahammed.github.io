---
title: Resetting Administrator Password in Windows 2008
author: Fahad Ahammed
type: post
date: 2014-06-20T13:18:28+00:00
url: /resetting-administrator-password-in-windows-2008/
categories:
  - Technology
tags:
  - Reset Windows Server 2008 Administrative password
  - Reset Windows server password

---
I have normally worked with linux servers but sometimes i used Windows too. I have faced password forgetting moments and then after searching and trying i have got the solution to reset Windows Server 2008 R2.<!--more-->

<p style="text-align: center;">
  <a href="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/06/Resetting_Administrator_Password_in_Windows_2008.png"><img loading="lazy" class="alignnone size-medium wp-image-2070" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/06/Resetting_Administrator_Password_in_Windows_2008-300x300.png?resize=300%2C300" alt="Resetting_Administrator_Password_in_Windows_2008.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/06/Resetting_Administrator_Password_in_Windows_2008.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/06/Resetting_Administrator_Password_in_Windows_2008.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/06/Resetting_Administrator_Password_in_Windows_2008.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" /></a>
</p>

You will need to follow the steps.

  1. Boot from the Micrsoft Windows Server 2008 DVD.
  2. From the Install Windows menu, click **“Next”**.
  3. Select** **“Repair your computer”.
  4. In the System Recovery Options, select the Operating System instance that you wish to repair and click **“Next”**. If you don&#8217;t see any Operating system then you must load drivers.
  5. Select **“Command Prompt”**.
  6. At the command prompt, run the following commands:

<pre>c:
 cd windowssystem32
 ren Utilman.exe Utilman.exe.old
 copy cmd.exe Utilman.exe</pre>

  1. Reboot the server allowing Windows to load as normal.
  2. At the logon screen, press **Windows Key + U**.
  3. As the command prompt, enter the following command:

<pre>net user administrator Password12</pre>

_  
This will set the password for the Administrator user to be Password12 (case sensitive)._

Closing the command prompt, you should now be able to log back onto the server using the password you have provided in the last step.

### 

### Cleanup Steps

Once you have verified you can log on to the server you will have repeat the steps above and boot using the Windows Server 2008 DVD/ISO and run the command prompt again.

  * Delete the newly created **Utilman.exe** from **C:WindowsSystem32**
  * Rename **Utilman.exe.old** back to **Utilman.exe**

You should be back up and running as if nothing ever happened.