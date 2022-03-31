---
title: Encrypt Any Files in Linux
author: Fahad Ahammed
type: post
date: 2014-08-27T02:36:49+00:00
url: /encrypt-any-files-in-linux/
categories:
  - Technology
tags:
  - Encrypt Any Files and folders in Linux
  - encrypt file via gpg
  - Encrypt files via openssl

---
I have been trying to encrypt files and folders lately. It is fun but useful. You can encrypt any file which can take several years to decrypt for a hacker. That &#8220;Several&#8221; is not less. According to recent super computer &#8220;K Computer&#8221; which is the fastest can calculate 8,200,000,000,000,000 (8.2 quadrillion) calculations per second. Lets see how many seconds would take to decrypt an encrypted file by the way i am showing.<!--more-->

  
[<img loading="lazy" class="size-medium wp-image-2040 aligncenter" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux-300x300.png?resize=300%2C300" alt="http://fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux.png" width="300" height="300" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux.png?w=610&ssl=1 610w" sizes="(max-width: 300px) 100vw, 300px" data-recalc-dims="1" />][1]

## First Step: <span style="color: #ff6600;">Openssl</span>

Openssl is a good choice to encrypt any file. There are several key choice which will make it harder to decrypt. Our magical cracking device &#8220;K Computer&#8221; would take 2.5 trillion years to recover an AES-256 key.

You have to make sure that Openssl is installed.

<pre>apt-get install openssl</pre>

Let, there is a text file named **file.txt** which contains some lines. You can easily read that file by **cat** command.

Create a file by terminal:

<pre>touch file.txt</pre>

Put this line by nano:

<pre>Our magical cracking device would still take 2.5 trillion years to recover an AES-256 key.</pre>

<pre>nano file.txt</pre>

Save it. You can see or read the file by **cat** command.

<pre>cat file.txt</pre>

Let&#8217;s encrypt.

# Encrypt file.txt to file.enc using 256-bit AES in CBC mode

<pre>openssl aes-256-cbc -in file.txt -out file.txt.enc</pre>

It will create an encrypted version of file.txt. You can delete the original file.txt.

# Decrypt binary file.enc

<pre>openssl <span style="color: #ff0000;">aes-256-cbc</span> -d -in file.txt.enc -out file.txt.dec</pre>

There are many cipher like <span style="color: #ff0000;">aes-256-cbc</span>.

<table>
  <tr>
    <td>
      <span style="color: #ff0000;">aes-128-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">aes-128-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">aes-192-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">aes-192-ecb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">aes-256-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">aes-256-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">base64</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">bf</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">bf-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">bf-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">bf-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">bf-ofb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">camellia-128-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">camellia-128-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">camellia-192-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">camellia-192-ecb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">camellia-256-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">camellia-256-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">cast</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">cast-cbc</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">cast5-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">cast5-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">cast5-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">cast5-ofb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">des</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ecb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">des-ede</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede-ofb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">des-ede3</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede3-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede3-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des-ede3-ofb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">des-ofb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">des3</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">desx</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc2</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">rc2-40-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc2-64-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc2-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc2-cfb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">rc2-ecb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc2-ofb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc4</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">rc4-40</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">seed</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">seed-cbc</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">seed-cfb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">seed-ecb</span>
    </td>
  </tr>
  
  <tr>
    <td>
      <span style="color: #ff0000;">seed-ofb</span>
    </td>
    
    <td>
      <span style="color: #ff0000;">zlib</span>
    </td>
  </tr>
</table>

## Second Step: <span style="color: #ff6600;">GPG</span>

To encrypt:

<pre>gpg -c file.txt</pre>

To decrypt:

<pre>gpg file.txt.gpg</pre>

## Folder Encrypt:

To encrypt folder it is better to make it a zip file and then use above encrypting procedure.

<pre>zip -r folder.zip the_folder_to_zip</pre>

That&#8217;s it.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2014/08/Encrypt_Any_Files_in_Linux.png