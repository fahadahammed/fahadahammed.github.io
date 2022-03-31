---
title: Browser Caching with htaccess
author: Fahad Ahammed
type: post
date: 2013-05-18T01:20:01+00:00
url: /browser-caching-with-htaccess/
categories:
  - Technology
tags:
  - Browser Caching with htaccess
  - caching files by htaccess
  - enable php extension expires
  - enable php extension header
  - enable php extension rewrite
  - speedup with htaccess caching

---
Browser caching is a good idea to make/feel your site speedy . Your sites visitors will find it much speedier after first visit . If you test your page in pingdom and google speed analysis tool you will see a recommendation there to enable caching . That is why i am sharing this .<!--more-->

[<img loading="lazy" class="aligncenter size-full wp-image-1435" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/05/browser_cache_image.jpg?resize=635%2C205" alt="browser_cache_image" width="635" height="205" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/05/browser_cache_image.jpg?w=635&ssl=1 635w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/05/browser_cache_image.jpg?resize=300%2C97&ssl=1 300w" sizes="(max-width: 635px) 100vw, 635px" data-recalc-dims="1" />][1]

First make sure all three module is enabled :

<pre>a2enmod rewrite

a2enmod expires

a2enmod headers</pre>

After that you have to restart Apache !

<pre>service apache2 restart</pre>

If you want to disable later ,

<pre>a2dismod rewrite

a2dismod expires

a2dismod headers</pre>

And again ,

<pre>service apache2 restart</pre>

So , after enabling those modules you have actually enabled your htaccess power ! Power to cache or other !

Create a **.htaccess** file in your websites root folder , that means where index file is . Then Follow below procedures ! I have copy-pasted them from some of sites but all examples are teested by me and works well !

## Apache .htaccess caching code ^

<div>
  <pre id="ptb0"># 1 YEAR
&lt;filesMatch ".(ico|pdf|flv)$"&gt;
Header set Cache-Control "max-age=29030400, public"
&lt;/FilesMatch&gt;
# 1 WEEK
&lt;filesMatch ".(jpg|jpeg|png|gif|swf)$"&gt;
Header set Cache-Control "max-age=604800, public"
&lt;/FilesMatch&gt;
# 2 DAYS
&lt;filesMatch ".(xml|txt|css|js)$"&gt;
Header set Cache-Control "max-age=172800, proxy-revalidate"
&lt;/FilesMatch&gt;
# 1 MIN
&lt;filesMatch ".(html|htm|php)$"&gt;
Header set Cache-Control "max-age=60, private, proxy-revalidate"
&lt;/FilesMatch&gt;</pre>
</div>

### For fail-safe code implement this to the above ^

<div>
  <pre id="ptb1">&lt;ifModule mod_expires.c&gt;
# any Expires Directives go here
&lt;/ifModule&gt;

&lt;ifModule mod_headers.c&gt;
# any Header directives go here
&lt;/ifModule&gt;</pre>
</div>

At least one of the 2 modules needs to be built into Apache; although they are included in the distribution, they are not turned on by default. To find out if the modules are enabled in your server, find the httpd binary and run <tt>httpd -l</tt>; this should print a list of the available modules. The modules we&#8217;re looking for are mod\_expires and mod\_headers.

If they aren&#8217;t available, and you have administrative access, you can recompile Apache to include them. This can be done either by uncommenting the appropriate lines in the Configuration file, or using the <tt>-enable-module=expires</tt> and <tt>-enable-module=headers</tt> arguments to configure (1.3 or greater).

## Caching Concepts ^

**Web Caching TutorialBy setting an expiry time** for the files on your Web site, you can go even farther than merely relying on the conditional GET and the 304 response that a server sends when a file has not changed&#8230; **You can prevent the contact with the server** from happening at all by using the Expires header and the Cache-control header.

> If a browser receives an image with the cache control headers that say the image can be considered fresh for 2 weeks, then for 2 weeks the image can be pulled directly from the browser&#8217;s (or proxy&#8217;s) cache on subsequent requests.**This is noticeably faster than even a conditional GET and a 304 response from the server since there is no round trip.** After two weeks, a conditional GET would be sent to the server to check the Last-Modified date, then again, no requests would be made for the duration of the specified freshness period.

So, briefly, these 2 mechanisms require no coding changes to your existing Web pages, and they works to avoid the unnecessary requests and connections to your Web server for files that do not need to be requested with each visit. Part of the rationale behind ETags is to provide sub-one second resolution in validating cached entities, where Last-Modified are limited to one second resolution. The ETag certainly has its uses, but it serves more as an alternative to the Last-Modified value rather than an expiry-based caching mechanism.

You can use mod\_expires to take care of expires and max-age, and use mod\_headers to &#8220;manually&#8221; configure the following:

**Cache-Control: no-store** This object may not be stored in any cache, even the requestor&#8217;s browser cache. **Cache-Control: no-cache** This object may be held in any cache but it must be revalidated every time it is requested. **Cache-Control: private** This object can be stored in the requesting browserÃ‚Â´s cache but not in a shared cache &#8230; **Cache-Control: must-revalidate** Tells caches that they must obey any freshness information you give them about an object. The HTTP allows caches to take liberties with the freshness of objects; by specifying this header, you&#8217;re telling the cache that you want it to strictly follow your rules. **Cache-Control: proxy-revalidate** Similar to must-revalidate, except that it only applies to proxy caches.

## Caching with **mod_expires** _1.3|2.0|2.2_ ^

### Apache Module mod_expires Summary ^

This module controls the setting of the Expires HTTP header and the max-age directive of the Cache-Control HTTP header in server responses. The expiration date can set to be relative to either the time the source file was last modified, or to the time of the client access.

These HTTP headers are an instruction to the client about the document&#8217;s validity and persistence. If cached, the document may be fetched from the cache rather than from the source until this time has passed. After that, the cache copy is considered &#8220;expired&#8221; and invalid, and a new copy must be obtained from the source.

#### mod_expires Caching EX. 1 ^

<div>
  <pre id="ptb2">&lt;ifModule mod_expires.c&gt;
ExpiresActive On
ExpiresDefault A300
ExpiresByType image/x-icon A2592000
ExpiresByType application/x-javascript A3600
ExpiresByType text/css A3600
ExpiresByType image/gif A604800
ExpiresByType image/png A604800
ExpiresByType image/jpeg A604800
ExpiresByType text/plain A300
ExpiresByType application/x-shockwave-flash A604800
ExpiresByType video/x-flv A604800
ExpiresByType application/pdf A604800
ExpiresByType text/html A300
&lt;/ifModule&gt;</pre>
</div>

#### mod_expires Caching EX. 2 ^

<div>
  <pre id="ptb3">&lt;ifModule mod_expires.c&gt;
ExpiresActive On
ExpiresByType image/gif A2592000
ExpiresByType image/png A2592000
ExpiresByType image/jpg A2592000
ExpiresByType image/x-icon A2592000
ExpiresByType application/pdf A2592000
ExpiresByType application/x-javascript A2592000
ExpiresByType text/plain A2592000

# Expires after 4.8 hours
ExpiresByType text/css A17200
&lt;/ifModule&gt;</pre>
</div>

#### mod_expires Caching EX. 3 ^

<div>
  <pre id="ptb4">&lt;ifModule mod_expires.c&gt;
ExpiresActive On
ExpiresDefault A86400
ExpiresByType image/x-icon A2592000
ExpiresByType application/x-javascript A2592000
ExpiresByType text/css A2592000
ExpiresByType image/gif A604800
ExpiresByType image/png A604800
ExpiresByType image/jpeg A604800
ExpiresByType text/plain A604800
ExpiresByType application/x-shockwave-flash A604800
ExpiresByType video/x-flv A604800
ExpiresByType application/pdf A604800
ExpiresByType text/html A900
&lt;/ifModule&gt;</pre>
</div>

## Caching with **mod_headers** _1.3|2.0|2.2_ ^

### Apache Module mod_headers Summary ^

This module provides directives to control and modify HTTP request and response headers. Headers can be merged, replaced or removed.

#### mod_headers Caching EX. 1 ^

<div>
  <pre id="ptb5">&lt;ifModule mod_headers.c&gt;
# YEAR
&lt;filesMatch ".(ico|gif|jpg|jpeg|png|flv|pdf)$"&gt;
  Header set Cache-Control "max-age=29030400"
&lt;/FilesMatch&gt;
# WEEK
&lt;filesMatch ".(js|css|swf)$"&gt;
  Header set Cache-Control "max-age=604800"
&lt;/FilesMatch&gt;
# 45 MIN
&lt;filesMatch ".(html|htm|txt)$"&gt;
  Header set Cache-Control "max-age=2700"
&lt;/FilesMatch&gt;
&lt;/ifModule&gt;</pre>
</div>

#### mod_headers Caching EX. 2 ^

<div>
  <pre id="ptb6"># Turn on Expires and set default expires to 3 days
ExpiresActive On
ExpiresDefault A259200

# Set up caching on media files for 1 month
&lt;filesMatch ".(ico|gif|jpg|jpeg|png|flv|pdf|swf|mov|mp3|wmv|ppt)$"&gt;
  ExpiresDefault A2419200
  Header append Cache-Control "public"
&lt;/FilesMatch&gt;

# Set up 2 Hour caching on commonly updated files
&lt;filesMatch ".(xml|txt|html|js|css)$"&gt;
  ExpiresDefault A7200
  Header append Cache-Control "private, must-revalidate"
&lt;/FilesMatch&gt;

# Force no caching for dynamic files
&lt;filesMatch ".(php|cgi|pl|htm)$"&gt;
  ExpiresDefault A0
  Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
  Header set Pragma "no-cache"
&lt;/FilesMatch&gt;</pre>
</div>

#### mod_headers Caching EX. 3 ^

**Article:** Another example using Headers

<div>
  <pre id="ptb7"># 3 Month
&lt;filesMatch ".(flv|gif|jpg|jpeg|png|ico|swf)$"&gt;
    Header set Cache-Control "max-age=7257600"
&lt;/FilesMatch&gt;
# 1 Week
&lt;filesMatch ".(js|css|pdf|txt)$"&gt;
    Header set Cache-Control "max-age=604800"
&lt;/FilesMatch&gt;
# 10 Minutes
&lt;filesMatch ".(html|htm)$"&gt;
    Header set Cache-Control "max-age=600"
&lt;/FilesMatch&gt;
# NONE
&lt;filesMatch ".(pl|php|cgi|spl)$"&gt;
    Header unset Cache-Control
    Header unset Expires
    Header unset Last-Modified
    FileETag None
    Header unset Pragma
&lt;/FilesMatch&gt;</pre>
</div>

**NOTE:** Using FilesMatch and Files in htaccess

## .htaccess Time Cheatsheet ^

<div>
  <pre id="ptb8"># TIME CHEAT SHEET
#      300   5 MIN
#      600  10 MIN
#      900  15 MIN
#     1800  30 MIN
#     2700  45 MIN
#
#     3600   1 HR
#     7200   2 HR
#    10800   3 HR
#    14400   4 HR
#    18000   5 HR
#    36000  10 HR
#    39600  11 HR
#    43200  12 HR
#    46800  13 HR
#    50400  14 HR
#    54000  15 HR
#    86400  24 HR
#
#    86400   1 DAY
#   172800   2 DAY
#   259200   3 DAY
#   345600   4 DAY
#   432000   5 DAY
#   518400   6 DAY
#   604800   7 DAY
#
#   604800   1 WEEK
#  1209600   2 WEEK
#  1814400   3 WEEK
#  2419200   4 WEEK
#
#  2419200   1 MONTH
#  4838400   2 MONTH
#  7257600   3 MONTH
#  9676800   4 MONTH
# 12096000   5 MONTH
# 14515200   6 MONTH
# 16934400   7 MONTH
# 19353600   8 MONTH
# 21772800   9 MONTH
# 24192000  10 MONTH
# 26611200  11 MONTH
# 29030400  12 MONTH</pre>
</div>

cache,caching,modified,if-modified-since,date,header,headers,mod\_expires,mod\_headers,http,cached,apache,speed,optimized,optimize,proxy,revalidate,private,no-cache,cache-control,set,append,max-age,cachesc

## Cache-Control ^

The Cache-Control general-header field is used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain. The directives specify behavior intended to prevent caches from adversely interfering with the request or response. These directives typically override the default caching algorithms. Cache directives are unidirectional in that the presence of a directive in a request does not imply that the same directive is to be given in the response.

Note that HTTP/1.0 caches might not implement Cache-Control and might only implement Pragma: no-cache .

Cache directives MUST be passed through by a proxy or gateway application, regardless of their significance to that application, since the directives might be applicable to all recipients along the request/response chain. It is not possible to specify a cache- directive for a specific cache.

<div>
  <pre id="ptb9">    Cache-Control   = "Cache-Control" ":" 1#cache-directive

    cache-directive = cache-request-directive
         | cache-response-directive

    cache-request-directive =
           "no-cache"
         | "no-store"
         | "max-age" "=" delta-seconds
         | "max-stale" [ "=" delta-seconds ]
         | "min-fresh" "=" delta-seconds
         | "no-transform"
         | "only-if-cached"
         | cache-extension

     cache-response-directive =
           "public"
         | "private" [ "=" &lt;"&gt; 1#field-name &lt;"&gt; ]
         | "no-cache" [ "=" &lt;"&gt; 1#field-name &lt;"&gt; ]
         | "no-store"
         | "no-transform"
         | "must-revalidate"
         | "proxy-revalidate"
         | "max-age" "=" delta-seconds
         | "s-maxage" "=" delta-seconds
         | cache-extension

    cache-extension = token [ "=" ( token | quoted-string ) ]</pre>
</div>

When a directive appears without any 1#field-name parameter, the directive applies to the entire request or response. When such a directive appears with a 1#field-name parameter, it applies only to the named field or fields, and not to the rest of the request or response. This mechanism supports extensibility; implementations of future versions of the HTTP protocol might apply these directives to header fields not defined in HTTP/1.1.

### The cache-control directives can be broken down into these general categories: ^

  * Restrictions on what are cacheable; these may only be imposed by the origin server.
  * Restrictions on what may be stored by a cache; these may be imposed by either the origin server or the user agent.
  * Modifications of the basic expiration mechanism; these may be imposed by either the origin server or the user agent.
  * Controls over cache revalidation and reload; these may only be imposed by a user agent.
  * Control over transformation of entities.
  * Extensions to the caching system.

### What is Cacheable? ^

By default, a response is cacheable if the requirements of the request method, request header fields, and the response status indicate that it is cacheable. Section 13.4 summarizes these defaults for cacheability. The following Cache-Control response directives allow an origin server to override the default cacheability of a response:

#### public ^

Indicates that the response MAY be cached by any cache, even if it would normally be non-cacheable or cacheable only within a non-shared cache.

#### private ^

Indicates that all or part of the response message is intended fora single user and MUST NOT be cached by a shared cache. This allows an origin server to state that the specified parts of the response are intended for only one user and are not a valid response for requests by other users. A private (non-shared) cache MAY cache the response.

**Note**: This usage of the word private only controls where the response may be cached, and cannot ensure the privacy of the message content.

#### no-cache ^

If the no-cache directive does not specify a field-name, then a cache MUST NOT use the response to satisfy a subsequent request without successful revalidation with the origin server. This allows an origin server to prevent caching even by caches that have been configured to return stale responses to client requests.

If the no-cache directive does specify one or more field-names, then a cache MAY use the response to satisfy a subsequent request, subject to any other restrictions on caching. However, the specified field-name(s) MUST NOT be sent in the response to a subsequent request without successful revalidation with the origin server. This allows an origin server to prevent the re-use of certain header fields in a response, while still allowing caching of the rest of the response.

**Note**: Most HTTP/1.0 caches will not recognize or obey this directive.

### What May be Stored by Caches? ^

#### no-store ^

The purpose of the no-store directive is to prevent the inadvertent release or retention of sensitive information (for example, on backup tapes). The no-store directive applies to the entire message, and MAY be sent either in a response or in a request. If sent in a request, a cache MUST NOT store any part of either this request or any response to it. If sent in a response, a cache MUST NOT store any part of either this response or the request that elicited it. This directive applies to both non- shared and shared caches. &#8220;MUST NOT store&#8221; in this context means that the cache MUST NOT intentionally store the information in non-volatile storage, and MUST make a best-effort attempt to remove the information from volatile storage as promptly as possible after forwarding it.

Even when this directive is associated with a response, users might explicitly store such a response outside of the caching system (e.g., with a &#8220;Save As&#8221; dialog). History buffers MAY store such responses as part of their normal operation.

The purpose of this directive is to meet the stated requirements of certain users and service authors who are concerned about accidental releases of information via unanticipated accesses to cache data structures. While the use of this directive might improve privacy in some cases, we caution that it is NOT in any way a reliable or sufficient mechanism for ensuring privacy. In particular, malicious or compromised caches might not recognize or obey this directive, and communications networks might be vulnerable to eavesdropping.

### Saving dynamic file to static file to cache ^

Back up a bit and take a look at this problem from a higher level. If you implement this solution, you will have to manually update that Last-Modified date now and forever. The potential for error is large, and it&#8217;s also a maintenance headache &#8211; You will never be able to take a vacation/holiday without serving a stale file for the duration.

A manual approach involves modifying the script to write its output to a static file, and then serving that static file. When a request arrives, you can use mod_rewrite to check for the existence of that static file. If it exists, serve it. If not, run the script again to re-create it, then serve it.

How you manage the expiration of the static file depends on your needs; You can delete the static file manually to force a regeneration &#8212; which is again a maintenance headache. Or you can set up a cron job to delete it every so many minutes or hours. How you set up cron jobs varies by host, but look in your control panel first.

#### An example of the mod_rewrite code for use in /.htaccess ^

<div>
  <pre id="ptb10"># If static html page exists
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
# rewrite php file requests to it
RewriteRule ^(php-file).php$ /$1.html [L]</pre>
</div>

## HTTP Headers Sent ^

### No mod_expires ^

<div>
  <pre id="ptb11">===&gt; index.html
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:39 GMT
4  X-Powered-By: PHP/4.4.2
5  Keep-Alive: timeout=5, max=5
6  Connection: Keep-Alive
7  Content-Type: text/html

===&gt; robots.txt
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:40 GMT
4  Last-Modified: Wed, 22 Feb 2006 23:23:13 GMT
5  ETag: "129ba06"
6  Accept-Ranges: bytes
7  Content-Length: 31
10 Content-Type: text/plain; charset=iso-8859-1

===&gt; favicon.ico
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:43 GMT
4  Last-Modified: Tue, 13 Dec 2005 12:20:26 GMT
5  ETag: "17c22bd"
6  Accept-Ranges: bytes
7  Content-Length: 894
10 Content-Type: image/x-icon

===&gt; example.css
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:53 GMT
4  Last-Modified: Thu, 23 Feb 2006 02:55:10 GMT
5  ETag: "b57d48"
6  Accept-Ranges: bytes
7  Content-Length: 17547
10 Content-Type: text/css

===&gt; script.js
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:54 GMT
4  Last-Modified: Wed, 22 Feb 2006 11:50:47 GMT
5  ETag: "1cb6dc7"
6  Accept-Ranges: bytes
7  Content-Length: 3898
10 Content-Type: application/x-javascript

===&gt; btn-send.png
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:57 GMT
4  Last-Modified: Thu, 16 Feb 2006 12:07:03 GMT
5  ETag: "b57d55"
6  Accept-Ranges: bytes
7  Content-Length: 608
10 Content-Type: image/png</pre>
</div>

### With mod_expires ^

<div>
  <pre id="ptb12">===&gt; robots.txt
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 21:00:40 GMT
4  Cache-Control max-age=2592000
5  Expires: Mon, 27 Mar 2006 20:59:12 GMT
6  Last-Modified: Wed, 22 Feb 2006 23:23:13 GMT

7  ETag: "129ba06"
8  Accept-Ranges: bytes
9  Content-Length: 31
12 Content-Type: text/plain; charset=iso-8859-1

===&gt; favicon.ico
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 20:59:12 GMT
4  Cache-Control max-age=2592000
5  Expires: Mon, 27 Mar 2006 20:59:12 GMT
6  Last-Modified: Tue, 13 Dec 2005 12:20:26 GMT
7  ETag: "17c22bd"
8  Accept-Ranges: bytes
9  Content-Length: 894
11 Connection: Keep-Alive
12 Content-Type: image/x-icon

===&gt; example.css
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 20:59:19 GMT
4  Cache-Control: max-age=17200
5  Expires: Sun, 26 Feb 2006 01:45:59 GMT
6  Last-Modified: Thu, 23 Feb 2006 02:55:10 GMT
7  ETag: "b57d48"
8  Accept-Ranges: bytes
9  Content-Length: 17547
11 Connection: Keep-Alive
12 Content-Type: text/css

===&gt; script.js
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 20:59:28 GMT
4  Cache-Control max-age=2592000
5  Expires: Mon, 27 Mar 2006 20:59:28 GMT
6  Last-Modified: Wed, 22 Feb 2006 11:50:47 GMT
7  ETag: "1cb6dc7"
8  Accept-Ranges: bytes
9  Content-Length: 3898
11 Connection: Keep-Alive
12 Content-Type: application/x-javascript

===&gt; btn-send.png
1  HTTP/1.1 2 Date: Sat, 25 Feb 2006 20:59:28 GMT
4  Cache-Control max-age=2592000
5  Expires: Mon, 27 Mar 2006 20:59:28 GMT
6  Last-Modified: Thu, 16 Feb 2006 12:07:03 GMT
7  ETag: "b57d55"
8  Accept-Ranges: bytes
9  Content-Length: 608
11 Connection: Keep-Alive
12 Content-Type: image/png</pre>
</div>

## Header Comparison using the below .htaccess ^

<div>
  <pre id="ptb13">AddHandler application/x-httpd-php .htm
Options +FollowSymLinks -Indexes -ExecCGI
DirectoryIndex index.htm
AddDefaultCharset ISO-8859-1
AddCharset ISO-8859-1 .css
DefaultLanguage en
ServerSignature Off

ExpiresActive On
ExpiresByType image/gif A2592000
ExpiresByType image/png A2592000
ExpiresByType image/jpeg A2592000
ExpiresByType image/x-icon A2592000
ExpiresByType application/pdf A2592000
ExpiresByType application/x-javascript A2592000
ExpiresByType text/plain A2592000
ExpiresByType text/css A10800</pre>
</div>

**PDF WITHOUT**

<div>
  <pre id="ptb14">Last-Modified: Mon, 20 Feb 2006 05:52:15 GMT
ETag: "1aa1fe1-36fa1"
Accept-Ranges: bytes
Content-Length: 225185
Connection: close
Content-Type: application/pdf</pre>
</div>

**WITH**

<div>
  <pre id="ptb15">Cache-Control: max-age=2592000
Expires: Tue, 28 Mar 2006 16:12:43 GMT
Last-Modified: Mon, 20 Feb 2006 05:52:15 GMT
ETag: "1aa1fe1"
Accept-Ranges: bytes
Content-Length: 225185
Connection: close
Content-Type: application/pdf
Content-Language: en</pre>
</div>

**CSS WITHOUT**

<div>
  <pre id="ptb16">Last-Modified: Sun, 26 Feb 2006 15:41:13 GMT
ETag: "b57d48-45b4"
Accept-Ranges: bytes
Content-Length: 17844
Connection: close
Content-Type: text/css</pre>
</div>

**WITH**

<div>
  <pre id="ptb17">Cache-Control: max-age=10800
Expires: Sun, 26 Feb 2006 19:21:45 GMT
Last-Modified: Sun, 26 Feb 2006 16:21:38 GMT
ETag: "b57d48"
Accept-Ranges: bytes
Content-Length: 17828
Connection: close
Content-Type: text/css; charset=iso-8859-1
Content-Language: en</pre>
</div>

**JPEG WITHOUT**

<div>
  <pre id="ptb18">Last-Modified: Wed, 22 Feb 2006 12:16:56 GMT
ETag: "b57d54-45e7"
Accept-Ranges: bytes

Content-Length: 17895
Connection: close
Content-Type: image/jpeg</pre>
</div>

**WITH**

<div>
  <pre id="ptb19">Cache-Control: max-age=2592000
Expires: Tue, 28 Mar 2006 16:23:52 GMT
Last-Modified: Wed, 22 Feb 2006 12:16:56 GMT
ETag: "b57d54"
Accept-Ranges: bytes
Content-Length: 17895
Connection: close
Content-Type: image/jpeg
Content-Language: en</pre>
</div>

**JAVASCRIPT WITHOUT HTACCESS**

<div>
  <pre id="ptb20">Last-Modified: Sun, 26 Feb 2006 07:39:29 GMT
ETag: "1cb6dc7-f2e"
Accept-Ranges: bytes
Content-Length: 3886
Connection: close
Content-Type: application/x-javascript</pre>
</div>

**WITH**

<div>
  <pre id="ptb21">Cache-Control: max-age=2592000
Expires: Tue, 28 Mar 2006 16:25:54 GMT
Last-Modified: Sun, 26 Feb 2006 07:39:29 GMT
ETag: "1cb6dc7"
Accept-Ranges: bytes
Content-Length: 3886
Connection: close
Content-Type: application/x-javascript
Content-Language: en</pre>
</div>

**PNG WITHOUT**

<div>
  <pre id="ptb22">Last-Modified: Thu, 16 Feb 2006 14:37:34 GMT
ETag: "6db4e0-141"
Accept-Ranges: bytes
Content-Length: 321
Connection: close
Content-Type: image/png</pre>
</div>

**WITH**

<div>
  <pre id="ptb23">Cache-Control: max-age=2592000
Expires: Tue, 28 Mar 2006 16:26:42 GMT
Last-Modified: Thu, 16 Feb 2006 14:37:34 GMT
ETag: "6db4e0"
Accept-Ranges: bytes
Content-Length: 321
Connection: close
Content-Type: image/png
Content-Language: en</pre>
</div>

* * *

### Modifications of the Basic Expiration Mechanism ^

The expiration time of an entity MAY be specified by the origin server using the Expires header. Alternatively, it MAY be specified using the max-age directive in a response. When the max-age cache-control directive is present in a cached response, the response is stale if its current age is greater than the age value given (in seconds) at the time of a new request for that resource. The max-age directive on a response implies that the response is cacheable (i.e., &#8220;public&#8221;) unless some other, more restrictive cache directive is also present.

If a response includes both an Expires header and a max-age directive, the max-age directive overrides the Expires header, even if the Expires header is more restrictive. This rule allows an origin server to provide, for a given response, a longer expiration time to an HTTP/1.1 (or later) cache than to an HTTP/1.0 cache. This might be useful if certain HTTP/1.0 caches improperly calculate ages or expiration times, perhaps due to desynchronized clocks.

Many HTTP/1.0 cache implementations will treat an Expires value that is less than or equal to the response Date value as being equivalent to the Cache-Control response directive &#8220;no-cache&#8221;. If an HTTP/1.1 cache receives such a response, and the response does not include a Cache-Control header field, it SHOULD consider the response to be non-cacheable in order to retain compatibility with HTTP/1.0 servers.

**Note**: An origin server might wish to use a relatively new HTTP cache control feature, such as the &#8220;private&#8221; directive, on a network including older caches that do not understand that feature. The origin server will need to combine the new feature with an Expires field whose value is less than or equal to the Date value. This will prevent older caches from improperly caching the response. s-maxage If a response includes an s-maxage directive, then for a shared cache (but not for a private cache), the maximum age specified by this directive overrides the maximum age specified by either the max-age directive or the Expires header. The **s-maxage** directive also implies the semantics of the proxy-revalidate directive, i.e., that the shared cache must not use the entry after it becomes stale to respond to a subsequent request without first revalidating it with the origin server. The **s-maxage** directive is always ignored by a private cache.

Note that most older caches, not compliant with this specification, do not implement any cache-control directives. An origin server wishing to use a cache-control directive that restricts, but does not prevent, caching by an HTTP/1.1-compliant cache MAY exploit the requirement that the max-age directive overrides the Expires header, and the fact that pre-HTTP/1.1-compliant caches do not observe the max-age directive.

Other directives allow a user agent to modify the basic expiration mechanism.

#### These directives MAY be specified on a request: ^

#### max-age ^

Indicates that the client is willing to accept a response whose age is no greater than the specified time in seconds. Unless max- stale directive is also included, the client is not willing to accept a stale response.

#### min-fresh ^

Indicates that the client is willing to accept a response whose freshness lifetime is no less than its current age plus the specified time in seconds. That is, the client wants a response that will still be fresh for at least the specified number of seconds.

#### max-stale ^

Indicates that the client is willing to accept a response that has exceeded its expiration time. If max-stale is assigned a value, then the client is willing to accept a response that has exceeded its expiration time by no more than the specified number of seconds. If no value is assigned to max-stale, then the client is willing to accept a stale response of any age.

If a cache returns a stale response, either because of a max-stale directive on a request, or because the cache is configured to override the expiration time of a response, the cache MUST attach a Warning header to the stale response, using Warning 110 (Response is stale).

A cache MAY be configured to return stale responses without validation, but only if this does not conflict with any &#8220;MUST&#8221;-level requirements concerning cache validation (e.g., a &#8220;must-revalidate&#8221; cache-control directive).

If both the new request and the cached entry include &#8220;max-age&#8221; directives, then the lesser of the two values is used for determining the freshness of the cached entry for that request.

### Cache Revalidation and Reload Controls ^

Sometimes a user agent might want or need to insist that a cache revalidate its cache entry with the origin server (and not just with the next cache along the path to the origin server), or to reload its cache entry from the origin server. End-to-end revalidation might be necessary if either the cache or the origin server has overestimated the expiration time of the cached response. End-to-end reload may be necessary if the cache entry has become corrupted for some reason.

End-to-end revalidation may be requested either when the client does not have its own local cached copy, in which case we call it &#8220;unspecified end-to-end revalidation&#8221;, or when the client does have a local cached copy, in which case we call it &#8220;specific end-to-end revalidation.&#8221;

The client can specify these three kinds of action using **Cache-Control request directives**:

End-to-end reload The request includes a &#8220;**no-cache**&#8221; cache-control directive or, for compatibility with HTTP/1.0 clients, &#8220;**Pragma: no-cache**&#8220;. Field names MUST NOT be included with the no-cache directive in a request. The server MUST NOT use a cached copy when responding to such a request.

Specific end-to-end revalidation The request includes a &#8220;max-age=0&#8221; cache-control directive, which forces each cache along the path to the origin server to revalidate its own entry, if any, with the next cache or server. The initial request includes a cache-validating conditional with the client&#8217;s current validator.

Unspecified end-to-end revalidation The request includes &#8220;max-age=0&#8221; cache-control directive, which forces each cache along the path to the origin server to revalidate its own entry, if any, with the next cache or server. The initial request does not include a cache-validating conditional; the first cache along the path (if any) that holds a cache entry for this resource includes a cache-validating conditional with its current validator.

#### max-age ^

When an intermediate cache is forced, by means of a max-age=0 directive, to revalidate its own cache entry, and the client has supplied its own validator in the request, the supplied validator might differ from the validator currently stored with the cache entry. In this case, the cache MAY use either validator in making its own request without affecting semantic transparency.

However, the choice of validator might affect performance. The best approach is for the intermediate cache to use its own validator when making its request. If the server replies with 304 (Not Modified), then the cache can return its now validated copy to the client with a 200 (OK) response. If the server replies with a new entity and cache validator, however, the intermediate cache can compare the returned validator with the one provided in the client&#8217;s request, using the strong comparison function. If the client&#8217;s validator is equal to the origin server&#8217;s, then the intermediate cache simply returns 304 (Not Modified). Otherwise, it returns the new entity with a 200 (OK) response.

If a request includes the no-cache directive, it SHOULD NOT include min-fresh, max-stale, or max-age.

#### only-if-cached ^

In some cases, such as times of extremely poor network connectivity, a client may want a cache to return only those responses that it currently has stored, and not to reload or revalidate with the origin server. To do this, the client may include the only-if-cached directive in a request. If it receives this directive, a cache SHOULD either respond using a cached entry that is consistent with the other constraints of the request, or respond with a 504 (Gateway Timeout) status. However, if a group of caches is being operated as a unified system with good internal connectivity, such a request MAY be forwarded within that group of caches.

#### must-revalidate ^

Because a cache MAY be configured to ignore a server&#8217;s specified expiration time, and because a client request MAY include a max- stale directive (which has a similar effect), the protocol also includes a mechanism for the origin server to require revalidation of a cache entry on any subsequent use. When the must-revalidate directive is present in a response received by a cache, that cache MUST NOT use the entry after it becomes stale to respond to a subsequent request without first revalidating it with the origin server. (I.e., the cache MUST do an end-to-end revalidation every time, if, based solely on the origin server&#8217;s Expires or max-age value, the cached response is stale.)

The must-revalidate directive is necessary to support reliable operation for certain protocol features. In all circumstances an HTTP/1.1 cache MUST obey the must-revalidate directive; in particular, if the cache cannot reach the origin server for any reason, it MUST generate a 504 (Gateway Timeout) response.

Servers SHOULD send the must-revalidate directive if and only if failure to revalidate a request on the entity could result in incorrect operation, such as a silently unexecuted financial transaction. Recipients MUST NOT take any automated action that violates this directive, and MUST NOT automatically provide an unvalidated copy of the entity if revalidation fails.

Although this is not recommended, user agents operating under severe connectivity constraints MAY violate this directive but, if so, MUST explicitly warn the user that an unvalidated response has been provided. The warning MUST be provided on each unvalidated access, and SHOULD require explicit user confirmation.

#### proxy-revalidate ^

The proxy-revalidate directive has the same meaning as the must- revalidate directive, except that it does not apply to non-shared user agent caches. It can be used on a response to an authenticated request to permit the user&#8217;s cache to store and later return the response without needing to revalidate it (since it has already been authenticated once by that user), while still requiring proxies that service many users to revalidate each time (in order to make sure that each user has been authenticated). Note that such authenticated responses also need the public cache control directive in order to allow them to be cached at all.

### No-Transform Directive ^

**no-transform** Implementors of intermediate caches (proxies) have found it useful to convert the media type of certain entity bodies. A non- transparent proxy might, for example, convert between image formats in order to save cache space or to reduce the amount of traffic on a slow link.

Serious operational problems occur, however, when these transformations are applied to entity bodies intended for certain kinds of applications. For example, applications for medical imaging, scientific data analysis and those using end-to-end authentication, all depend on receiving an entity body that is bit for bit identical to the original entity-body.

Therefore, if a message includes the no-transform directive, an intermediate cache or proxy MUST NOT change those headers that are listed in section 13.5.2 as being subject to the no-transform directive. This implies that the cache or proxy MUST NOT change any aspect of the entity-body that is specified by these headers, including the value of the entity-body itself.

### From Apache Caching Guide ^

> **Expiry Periods** The default expiry period for cached entities is one hour, however this can be easily over-ridden by using the CacheDefaultExpire directive. This default is only used when the original source of the content does not specify an expire time or time of last modification. If a response does not include an Expires header but does include a Last-Modified header, mod\_cache can infer an expiry period based on the use of the CacheLastModifiedFactor directive. For local content, mod\_expires may be used to fine-tune the expiry period. The maximum expiry period may also be controlled by using the CacheMaxExpire. A Brief Guide to Conditional Requests When content expires from the cache and is re-requested from the backend or content provider, rather than pass on the original request, Apache will use a conditional request instead. HTTP offers a number of headers which allow a client, or cache to discern between different versions of the same content. For example if a resource was served with an &#8220;Etag:&#8221; header, it is possible to make a conditional request with an &#8220;If-Match:&#8221; header. If a resource was served with a &#8220;Last-Modified:&#8221; header it is possible to make a conditional request with an &#8220;If-Modified-Since:&#8221; header, and so on. When such a conditional request is made, the response differs depending on whether the content matches the conditions. If a request is made with an &#8220;If-Modified-Since:&#8221; header, and the content has not been modified since the time indicated in the request then a terse &#8220;304 Not Modified&#8221; response is issued. If the content has changed, then it is served as if the request were not conditional to begin with. The benefits of conditional requests in relation to caching are twofold. Firstly, when making such a request to the backend, if the content from the backend matches the content in the store, this can be determined easily and without the overhead of transferring the entire resource. Secondly, conditional requests are usually less strenuous on the backend. For static files, typically all that is involved is a call to stat() or similar system call, to see if the file has changed in size or modification time. As such, even if Apache is caching local content, even expired content may still be served faster from the cache if it has not changed. As long as reading from the cache store is faster than reading from the backend (e.g. an in-memory cache compared to reading from disk). What Can be Cached? As mentioned already, the two styles of caching in Apache work differently, mod\_file\_cache caching maintains file contents as they were when Apache was started. When a request is made for a file that is cached by this module, it is intercepted and the cached file is served. mod_cache caching on the other hand is more complex. When serving a request, if it has not been cached previously, the caching module will determine if the content is cacheable. The conditions for determining cachability of a response are;
> 
>   1. Caching must be enabled for this URL. See the CacheEnable and CacheDisable directives.
>   2. The response must have a HTTP status code of 200, 203, 300, 301 or 410.
>   3. The request must be a HTTP GET request.
>   4. If the request contains an &#8220;Authorization:&#8221; header, the response will not be cached.
>   5. If the response contains an &#8220;Authorization:&#8221; header, it must also contain an &#8220;s-maxage&#8221;, &#8220;must-revalidate&#8221; or &#8220;public&#8221; option in the &#8220;Cache-Control:&#8221; header.
>   6. If the URL included a query string (e.g. from a HTML form GET method) it will not be cached unless the response includes an &#8220;Expires:&#8221; header, as per RFC2616 section 13.9.
>   7. If the response has a status of 200 (OK), the response must also include at least one of the &#8220;Etag&#8221;, &#8220;Last-Modified&#8221; or the &#8220;Expires&#8221; headers, unless the CacheIgnoreNoLastMod directive has been used to require otherwise.
>   8. If the response includes the &#8220;private&#8221; option in a &#8220;Cache-Control:&#8221; header, it will not be stored unless the CacheStorePrivate has been used to require otherwise.
>   9. Likewise, if the response includes the &#8220;no-store&#8221; option in a &#8220;Cache-Control:&#8221; header, it will not be stored unless the CacheStoreNoStore has been used.
>  10. A response will not be stored if it includes a &#8220;Vary:&#8221; header containing the match-all &#8220;*&#8221;.
> 
> ### What Should Not be Cached?
> 
> In short, any content which is highly time-sensitive, or which varies depending on the particulars of the request that are not covered by HTTP negotiation, should not be cached.
> 
> If you have dynamic content which changes depending on the IP address of the requester, or changes every 5 minutes, it should almost certainly not be cached.
> 
> If on the other hand, the content served differs depending on the values of various HTTP headers, it is possible that it might be possible to cache it intelligently through the use of a &#8220;Vary&#8221; header.
> 
> #### Variable/Negotiated Content
> 
> If a response with a &#8220;Vary&#8221; header is received by mod\_cache when requesting content by the backend it will attempt to handle it intelligently. If possible, mod\_cache will detect the headers attributed in the &#8220;Vary&#8221; response in future requests and serve the correct cached response.
> 
> If for example, a response is received with a vary header such as;
> 
> <div>
>   <pre id="ptb24">Vary: negotiate,accept-language,accept-charset</pre>
> </div>
> 
> mod_cache will only serve the cached content to requesters with matching accept-language and accept-charset headers matching those of the original request.

## Cache Control Extensions ^

`x-gzip-ok=""`

The Cache-Control header field can be extended through the use of one or more cache-extension tokens, each with an optional assigned value. Informational extensions (those which do not require a change in cache behavior) MAY be added without changing the semantics of other directives. Behavioral extensions are designed to work by acting as modifiers to the existing base of cache directives. Both the new directive and the standard directive are supplied, such that applications which do not understand the new directive will default to the behavior specified by the standard directive, and those that understand the new directive will recognize it as modifying the requirements associated with the standard directive. In this way, extensions to the cache-control directives can be made without requiring changes to the base protocol.

This extension mechanism depends on an HTTP cache obeying all of the cache-control directives defined for its native HTTP-version, obeying certain extensions, and ignoring all directives that it does not understand.

For example, consider a hypothetical new response directive called community which acts as a modifier to the private directive. We define this new directive to mean that, in addition to any non-shared cache, any cache which is shared only by members of the community named within its value may cache the response. An origin server wishing to allow the UCI community to use an otherwise private response in their shared cache(s) could do so by including `Cache-Control: private, community="UCI"`

A cache seeing this header field will act correctly even if the cache does not understand the community cache-extension, since it will also see and understand the private directive and thus default to the safe behavior. Unrecognized cache-directives MUST be ignored; it is assumed that any cache-directive likely to be unrecognized by an HTTP/1.1 cache will be combined with standard directives (or the response&#8217;s default cacheability) such that the cache behavior will remain minimally correct even if the cache does not understand the extension(s).

## Setting headers with non-Apache setup ^

### JSP ^

<div>
  <pre id="ptb25">response.setHeader("P3P","policyref="http://www.mysite.com/w3c/p3p.xml" CP="ALL DSP COR CUR OUR IND PUR"");</pre>
</div>

### iPlanet Web Server ^

Beginning with iPlanet Web Server 6.0 SP2-> Can be accomplished by editing the obj.conf file within the site&#8217;s configuration directory. The following line must be added to obj.conf:

<div>
  <pre id="ptb26">AuthTrans fn="set-variable"
insert-srvhdrs="P3P=policyref='http://www.mydomain.com/path/to/p3&lt;/p&gt;p.xml',CP='NON DSP COR CURa TIA'"</pre>
</div>

### Internet Information Server ^

The Microsoft Internet Information Server (IIS) provides a simple way to add a custom header. The Microsoft Management Console (MMC) can be used to specify a P3P HTTP header. Within MMC, expand the Internet Information Server line, and then expand the ServerName line. At Default Web Site, right click and then choose Properties. Select the HTTP Headers tab. In Custom HTTP Headers, click Add. Under Custom Header Name, type: `P3P`

Next, in Custom Header Value, type `policyref="http://www.mydomain.com/path/to/p3p.xml", CP="NON DSP COR CURa TIA"`

### AOLServer ^

AOLServer becomes customizable through the use of Tcl modules. A Tcl module is used to create custom HTTP headers for a particular web site. The webmaster specifies a directory in which the Tcl module resides, and upon start up of the web server, the modules within that directory are initialized as well. The following directory is commonly used for user-created Tcl modules: `/servers/servername/modules/tcl`

To create a custom P3P HTTP header, create a file within the Tcl module directory. The file extension should be .tcl. Within this file, include the following line: `ns_set put [ns_conn outputheaders] "P3P" "policyref="http://www.mydomain.com/path/to/p3p.xml", CP="NON CURa TIA"`

## Caching Overview ^

The most cacheable representation is one with a long freshness time set. Validation does help reduce the time that it takes to see a representation, but the cache still has to contact the origin server to see if it&#8217;s fresh. If the cache already knows it&#8217;s fresh, it will be served directly.

In order to make the best use of any cache, including effectively using a browser cache, we need to provide some indication of when a resource is no longer valid and should therefore be reacquired. More specifically, we need the ability to indicate caching rules for Web page objects, ranging from setting appropriate expiration times to indicating when a particular object should not be cached at all. Fortunately, we have all of these tools at our disposal in the form of HTTP cache controls rules.

The key to cache awareness lies in understanding the two concepts that govern how caches behave: freshness and validation. Freshness refers to whether or not a cached object is up-to-date, or in more technical terms, whether or not a cached resource is in the same state as that same resource on the origin server. If the browser or other Web cache lacks sufficient information to confirm that a cached object is fresh, it will always err on the side of caution and treat it as possibly out-of-date or stale. Validation is the process by which a cache checks with the origin server to see whether one of those potentially stale cached object is fresh or not. If the server confirms that the cached object is still fresh, the browser will use the local resource; if not, a fresh copy must be served.

Once the data is downloaded to the cache, it is &#8216;stamped,&#8221; indicating where it came from and at what time it was accessed. It may also be stamped with a third piece of information: when it needs to be reacquired. But, since most sites do not stamp their data with this explicit cache control information, we&#8217;ll assume that our example lacks this information.

The user follows the link to page2.html, which has never been visited before and which references image1.gif, image3.gif, and image4.gif. In this case, the browser downloads the markup for the new page but the question is: should it re-download image1.gif and image3.gif even though it already has them cached? The obvious answer would be no, but, how can we be sure that the images have not changed since we downloaded page1.html? Without cache control information, the truth is that we can&#8217;t. Therefore, the browser would need to revalidate the image by sending a request to the server in order to check if each image has been modified. If it has not been changed, the server will send a quick 304 Not Modified response that instructs the browser to go ahead and use the cached image. But, if it has been modified, a fresh copy of the image will have to be downloaded.

From this basic example, it is apparent that, even when CSS, images, and JavaScript are fresh, we may not get the caching benefit we expect, since the browser still has to make a round trip to the server before it can reuse the cached copy.

The default &#8216;Automatic&#8221; setting in Internet Explorer partially reduces this continual chatter between browser and server by skipping revalidation of cached objects during a single browser session. You will notice that page load time is generally much quicker when revisiting the same page during the same browser session. To see the performance penalty that would otherwise be incurred by all those 304 Not Modified responses, instead select &#8216;Every visit to the page.&#8221;

> Minimizing round trips over the Web to revalidate cached items can make a huge difference in browser page load times. Perhaps the most dramatic illustration of this occurs when a user returns to a site for the second time, after an initial browser session. In this case, all page objects will have to be revalidated, each costing valuable fractions of a second (not to mention consuming bandwidth and server cycles). On the other hand, utilizing proper cache control allows each of these previously viewed objects to be served directly out of the browser&#8217;s cache without going back to the server. The effect of adding cache control rules to page objects is often visible at page load time, even with a high bandwidth connection, and users may note that your sites appear to paint faster and that &#8216;flashing&#8221; is reduced between subsequent page loads. Besides improved user perception, the Web server will be offloaded from responding to cache revalidation requests, and thus will be able to better serve new traffic.
> 
> However, in order to enjoy the benefits of caching, a developer needs to take time to write out a set of carefully crafted cache control policies that categorize a site&#8217;s objects according to their intended lifetimes.

## Header Field Definitions &#8211; RFC 2616 section 14.9 ^

### Age ^

The Age response-header field conveys the sender&#8217;s estimate of the amount of time since the response (or its revalidation) was generated at the origin server. A cached response is _&#8220;fresh&#8221;_ if its age does not exceed its freshness lifetime.Age values are non-negative decimal integers, representing time in seconds.If a cache receives a value larger than the largest positive integer it can represent, or if any of its age calculations overflows, it MUST transmit an Age header with a value of 2147483648 (2^31). An HTTP/1.1 server that includes a cache MUST include an Age header field in every response generated from its own cache. Caches SHOULD use an arithmetic type of at least 31 bits of range.

### Cache-Control ^

The Cache-Control general-header field is used to specify directives that MUST be obeyed by all caching mechanisms along the request/response chain. The directives specify behavior intended to prevent caches from adversely interfering with the request or response. These directives typically override the default caching algorithms. Cache directives are unidirectional in that the presence of a directive in a request does not imply that the same directive is to be given in the response.

<tt>Note that HTTP/1.0 caches might not implement Cache-Control and might only implement Pragma: no-cache .</tt>

Cache directives MUST be passed through by a proxy or gateway application, regardless of their significance to that application, since the directives might be applicable to all recipients along the request/response chain. It is not possible to specify a cache- directive for a specific cache.

<div>
  <pre id="ptb27">Cache-Control   = "Cache-Control" ":" 1#cache-directive

    cache-directive = cache-request-directive
         | cache-response-directive

    cache-request-directive =
           "no-cache"
         | "no-store"
         | "max-age" "=" delta-seconds
         | "max-stale" [ "=" delta-seconds ]
         | "min-fresh" "=" delta-seconds
         | "no-transform"
         | "only-if-cached"
         | cache-extension

     cache-response-directive =
           "public
         | "private" [ "=" &lt;"&gt; 1#field-name &lt;"&gt; ]
         | "no-cache" [ "=" &lt;"&gt; 1#field-name &lt;"&gt; ]
         | "no-store"
         | "no-transform"
         | "must-revalidate"
         | "proxy-revalidate"
         | "max-age" "=" delta-seconds
         | "s-maxage" "=" delta-seconds
         | cache-extension

cache-extension = token [ "=" ( token | quoted-string ) ]</pre>
</div>

When a directive appears without any 1#field-name parameter, the directive applies to the entire request or response. When such a directive appears with a 1#field-name parameter, it applies only to the named field or fields, and not to the rest of the request or response. This mechanism supports extensibility; implementations of future versions of the HTTP protocol might apply these directives to header fields not defined in HTTP/1.1.

The cache-control directives can be broken down into these general categories:

  * Restrictions on what are cacheable; these may only be imposed by the origin server.
  * Restrictions on what may be stored by a cache; these may be imposed by either the origin server or the user agent.
  * Modifications of the basic expiration mechanism; these may be imposed by either the origin server or the user agent.
  * Controls over cache revalidation and reload; these may only be imposed by a user agent.
  * Control over transformation of entities.
  * Extensions to the caching system.

  * WP-Cache 2.1 revisited: Compression
  * Prevent WP-Cache from changing feed content-type
  * WordPress Speed Tips
  * 4+1 Ways To Speed Up WordPress With Caching
  * Speeding up WordPress
  * Tips on Speeding Up WordPress
  * Earning Money Blog Reading Tips &#8211; 19 February 2007
  * Modifying WP-Cache 2.0 to generate and cache gzipped output once and serve it multiple times
  * Turbo charging WordPress &#8211; or how I made my WordPress blog 1000% faster
  * 5 ways to speed up your site
  * WordPress Performance tuning
  * How to improve your wordpress blog performance

* * *

### Modifications of the Basic Expiration Mechanism ^

The expiration time of an entity MAY be specified by the origin server using the Expires header . Alternatively, it MAY be specified using the max-age directive in a response. When the max-age cache-control directive is present in a cached response, the response is stale if its current age is greater than the age value given (in seconds) at the time of a new request for that resource. The max-age directive on a response implies that the response is cacheable (i.e., &#8220;public&#8221;) unless some other, more restrictive cache directive is also present.

If a response includes both an Expires header and a max-age directive, the max-age directive overrides the Expires header, even if the Expires header is more restrictive. This rule allows an origin server to provide, for a given response, a longer expiration time to an HTTP/1.1 (or later) cache than to an HTTP/1.0 cache. This might be useful if certain HTTP/1.0 caches improperly calculate ages or expiration times, perhaps due to desynchronized clocks.

Many HTTP/1.0 cache implementations will treat an Expires value that is less than or equal to the response Date value as being equivalent to the Cache-Control response directive &#8220;no-cache&#8221;. If an HTTP/1.1 cache receives such a response, and the response does not include a Cache-Control header field, it SHOULD consider the response to be non-cacheable in order to retain compatibility with HTTP/1.0 servers.

**Note:** An origin server might wish to use a relatively new HTTP cache control feature, such as the &#8220;private&#8221; directive, on a network including older caches that do not understand that feature. The origin server will need to combine the new feature with an Expires field whose value is less than or equal to the Date value. This will prevent older caches from improperly caching the response.

s-maxage
:   If a response includes an s-maxage directive, then for a shared cache (but not for a private cache), the maximum age specified by this directive overrides the maximum age specified by either the max-age directive or the Expires header. The s-maxage directive also implies the semantics of the proxy-revalidate directive , i.e., that the shared cache must not use the entry after it becomes stale to respond to a subsequent request without first revalidating it with the origin server. The s- maxage directive is always ignored by a private cache.

Note that most older caches, not compliant with this specification, do not implement any cache-control directives. An origin server wishing to use a cache-control directive that restricts, but does not prevent, caching by an HTTP/1.1-compliant cache MAY exploit the requirement that the max-age directive overrides the Expires header, and the fact that pre-HTTP/1.1-compliant caches do not observe the max-age directive.

Other directives allow a user agent to modify the basic expiration mechanism. These directives MAY be specified on a request:

max-age
:   Indicates that the client is willing to accept a response whose age is no greater than the specified time in seconds. Unless max- stale directive is also included, the client is not willing to accept a stale response.

min-fresh
:   Indicates that the client is willing to accept a response whose freshness lifetime is no less than its current age plus the specified time in seconds. That is, the client wants a response that will still be fresh for at least the specified number of seconds.

max-stale
:   Indicates that the client is willing to accept a response that has exceeded its expiration time. If max-stale is assigned a value, then the client is willing to accept a response that has exceeded its expiration time by no more than the specified number of seconds. If no value is assigned to max-stale, then the client is willing to accept a stale response of any age.

If a cache returns a stale response, either because of a max-stale directive on a request, or because the cache is configured to override the expiration time of a response, the cache MUST attach a Warning header to the stale response, using Warning 110 (Response is stale).

A cache MAY be configured to return stale responses without validation, but only if this does not conflict with any &#8220;MUST&#8221;-level requirements concerning cache validation (e.g., a &#8220;must-revalidate&#8221; cache-control directive).

If both the new request and the cached entry include &#8220;max-age&#8221; directives, then the lesser of the two values is used for determining the freshness of the cached entry for that request.

### Cache Revalidation and Reload Controls ^

Sometimes a user agent might want or need to insist that a cache revalidate its cache entry with the origin server (and not just with the next cache along the path to the origin server), or to reload its cache entry from the origin server. End-to-end revalidation might be necessary if either the cache or the origin server has overestimated the expiration time of the cached response. End-to-end reload may be necessary if the cache entry has become corrupted for some reason.

End-to-end revalidation may be requested either when the client does not have its own local cached copy, in which case we call it &#8220;unspecified end-to-end revalidation&#8221;, or when the client does have a local cached copy, in which case we call it &#8220;specific end-to-end revalidation.&#8221;

The client can specify these three kinds of action using Cache- Control request directives:

End-to-end reload
:   The request includes a &#8220;no-cache&#8221; cache-control directive or, for compatibility with HTTP/1.0 clients, &#8220;Pragma: no-cache&#8221;. Field names MUST NOT be included with the no-cache directive in a request. The server MUST NOT use a cached copy when responding to such a request.

Specific end-to-end revalidation
:   The request includes a &#8220;max-age=0&#8221; cache-control directive, which forces each cache along the path to the origin server to revalidate its own entry, if any, with the next cache or server. The initial request includes a cache-validating conditional with the client&#8217;s current validator.

Unspecified end-to-end revalidation
:   The request includes &#8220;max-age=0&#8221; cache-control directive, which forces each cache along the path to the origin server to revalidate its own entry, if any, with the next cache or server. The initial request does not include a cache-validating
:   conditional; the first cache along the path (if any) that holds a cache entry for this resource includes a cache-validating conditional with its current validator.

max-age
:   When an intermediate cache is forced, by means of a max-age=0 directive, to revalidate its own cache entry, and the client has supplied its own validator in the request, the supplied validator might differ from the validator currently stored with the cache entry. In this case, the cache MAY use either validator in making its own request without affecting semantic transparency.
:   However, the choice of validator might affect performance. The best approach is for the intermediate cache to use its own validator when making its request. If the server replies with 304 (Not Modified), then the cache can return its now validated copy to the client with a 200 (OK) response. If the server replies with a new entity and cache validator, however, the intermediate cache can compare the returned validator with the one provided in the client&#8217;s request, using the strong comparison function. If the client&#8217;s validator is equal to the origin server&#8217;s, then the intermediate cache simply returns 304 (Not Modified). Otherwise, it returns the new entity with a 200 (OK) response.
:   If a request includes the no-cache directive, it SHOULD NOT include min-fresh, max-stale, or max-age.

only-if-cached
:   In some cases, such as times of extremely poor network connectivity, a client may want a cache to return only those responses that it currently has stored, and not to reload or revalidate with the origin server. To do this, the client may include the only-if-cached directive in a request. If it receives this directive, a cache SHOULD either respond using a cached entry that is consistent with the other constraints of the request, or respond with a 504 (Gateway Timeout) status. However, if a group of caches is being operated as a unified system with good internal connectivity, such a request MAY be forwarded within that group of caches.

must-revalidate
:   Because a cache MAY be configured to ignore a server&#8217;s specified expiration time, and because a client request MAY include a max- stale directive (which has a similar effect), the protocol also includes a mechanism for the origin server to require revalidation of a cache entry on any subsequent use. When the must-revalidate directive is present in a response received by a cache, that cache MUST NOT use the entry after it becomes stale to respond to a
:   subsequent request without first revalidating it with the origin server. (I.e., the cache MUST do an end-to-end revalidation every time, if, based solely on the origin server&#8217;s Expires or max-age value, the cached response is stale.)
:   The must-revalidate directive is necessary to support reliable operation for certain protocol features. In all circumstances an HTTP/1.1 cache MUST obey the must-revalidate directive; in particular, if the cache cannot reach the origin server for any reason, it MUST generate a 504 (Gateway Timeout) response.
:   Servers SHOULD send the must-revalidate directive if and only if failure to revalidate a request on the entity could result in incorrect operation, such as a silently unexecuted financial transaction. Recipients MUST NOT take any automated action that violates this directive, and MUST NOT automatically provide an unvalidated copy of the entity if revalidation fails.
:   Although this is not recommended, user agents operating under severe connectivity constraints MAY violate this directive but, if so, MUST explicitly warn the user that an unvalidated response has been provided. The warning MUST be provided on each unvalidated access, and SHOULD require explicit user confirmation.

proxy-revalidate
:   The proxy-revalidate directive has the same meaning as the must- revalidate directive, except that it does not apply to non-shared user agent caches. It can be used on a response to an authenticated request to permit the user&#8217;s cache to store and later return the response without needing to revalidate it (since it has already been authenticated once by that user), while still requiring proxies that service many users to revalidate each time (in order to make sure that each user has been authenticated). Note that such authenticated responses also need the public cache control directive in order to allow them to be cached at all.

### No-Transform Directive ^

**no-transform** Implementors of intermediate caches (proxies) have found it useful to convert the media type of certain entity bodies. A non- transparent proxy might, for example, convert between image formats in order to save cache space or to reduce the amount of traffic on a slow link.Serious operational problems occur, however, when these transformations are applied to entity bodies intended for certain kinds of applications. For example, applications for medicalimaging, scientific data analysis and those using end-to-end authentication, all depend on receiving an entity body that is bit for bit identical to the original entity-body.Therefore, if a message includes the no-transform directive, an intermediate cache or proxy MUST NOT change those headers as being subject to the no-transform directive. This implies that the cache or proxy MUST NOT change any aspect of the entity-body that is specified by these headers, including the value of the entity-body itself.

### Cache Control Extensions ^

The Cache-Control header field can be extended through the use of one or more cache-extension tokens, each with an optional assigned value. Informational extensions (those which do not require a change in cache behavior) MAY be added without changing the semantics of other directives. Behavioral extensions are designed to work by acting as modifiers to the existing base of cache directives. Both the new directive and the standard directive are supplied, such that applications which do not understand the new directive will default to the behavior specified by the standard directive, and those that understand the new directive will recognize it as modifying the requirements associated with the standard directive. In this way, extensions to the cache-control directives can be made without requiring changes to the base protocol.

This extension mechanism depends on an HTTP cache obeying all of the cache-control directives defined for its native HTTP-version, obeying certain extensions, and ignoring all directives that it does not understand.

For example, consider a hypothetical new response directive called community which acts as a modifier to the private directive. We define this new directive to mean that, in addition to any non-shared cache, any cache which is shared only by members of the community named within its value may cache the response. An origin server wishing to allow the UCI community to use an otherwise private response in their shared cache(s) could do so by including

<div>
  <pre id="ptb28">Cache-Control: private, community="UCI"</pre>
</div>

A cache seeing this header field will act correctly even if the cache does not understand the community cache-extension, since it will also see and understand the private directive and thus default to the safe behavior.

Unrecognized cache-directives MUST be ignored; it is assumed that any cache-directive likely to be unrecognized by an HTTP/1.1 cache will be combined with standard directives (or the response&#8217;s default cacheability) such that the cache behavior will remain minimally correct even if the cache does not understand the extension(s).

### Connection ^

The Connection general-header field allows the sender to specify options that are desired for that particular connection and MUST NOT be communicated by proxies over further connections.

The Connection header has the following grammar:

<div>
  <pre id="ptb29">Connection = "Connection" ":" 1#(connection-token)
connection-token  = token</pre>
</div>

HTTP/1.1 proxies MUST parse the Connection header field before a message is forwarded and, for each connection-token in this field, remove any header field(s) from the message with the same name as the connection-token. Connection options are signaled by the presence of a connection-token in the Connection header field, not by any corresponding additional header field(s), since the additional header field may not be sent if there are no parameters associated with that connection option.

Message headers listed in the Connection header MUST NOT include end-to-end headers, such as Cache-Control.

HTTP/1.1 defines the &#8220;close&#8221; connection option for the sender to signal that the connection will be closed after completion of the response. For example,

<div>
  <pre id="ptb30">Connection: close</pre>
</div>

in either the request or the response header fields indicates that the connection SHOULD NOT be considered \`persistent&#8217; after the current request/response is complete.

HTTP/1.1 applications that do not support persistent connections MUST include the &#8220;close&#8221; connection option in every message.

A system receiving an HTTP/1.0 (or lower-version) message that includes a Connection header MUST, for each connection-token in this field, remove and ignore any header field(s) from the message with the same name as the connection-token. This protects against mistaken forwarding of such header fields by pre-HTTP/1.1 proxies.

### Content-MD5 ^

The Content-MD5 entity-header field, as defined in RFC 1864 [23], is an MD5 digest of the entity-body for the purpose of providing an end-to-end message integrity check (MIC) of the entity-body. (Note: a MIC is good for detecting accidental modification of the entity-body in transit, but is not proof against malicious attacks.)

<div>
  <pre id="ptb31">Content-MD5   = "Content-MD5" ":" md5-digest
md5-digest   = &lt;base64 of 128 bit MD5 digest as per RFC 1864&gt;</pre>
</div>

The Content-MD5 header field MAY be generated by an origin server or client to function as an integrity check of the entity-body. Only origin servers or clients MAY generate the Content-MD5 header field; proxies and gateways MUST NOT generate it, as this would defeat its value as an end-to-end integrity check. Any recipient of the entity- body, including gateways and proxies, MAY check that the digest value in this header field matches that of the entity-body as received.

The MD5 digest is computed based on the content of the entity-body, including any content-coding that has been applied, but not including any transfer-encoding applied to the message-body. If the message is received with a transfer-encoding, that encoding MUST be removed prior to checking the Content-MD5 value against the received entity.

This has the result that the digest is computed on the octets of the entity-body exactly as, and in the order that, they would be sent if no transfer-encoding were being applied.

HTTP extends RFC 1864 to permit the digest to be computed for MIME composite media-types (e.g., multipart/* and message/rfc822), but this does not change how the digest is computed as defined in the preceding paragraph.

There are several consequences of this. The entity-body for composite types MAY contain many body-parts, each with its own MIME and HTTP headers (including Content-MD5, Content-Transfer-Encoding, and Content-Encoding headers). If a body-part has a Content-Transfer- Encoding or Content-Encoding header, it is assumed that the content of the body-part has had the encoding applied, and the body-part is included in the Content-MD5 digest as is &#8212; i.e., after the application. The Transfer-Encoding header field is not allowed within body-parts.

Conversion of all line breaks to CRLF MUST NOT be done before computing or checking the digest: the line break convention used in the text actually transmitted MUST be left unaltered when computing the digest.

<tt>Note: while the definition of Content-MD5 is exactly the same for HTTP as in RFC 1864 for MIME entity-bodies, there are several ways in which the application of Content-MD5 to HTTP entity-bodies differs from its application to MIME entity-bodies. One is that HTTP, unlike MIME, does not use Content-Transfer-Encoding, and does use Transfer-Encoding and Content-Encoding. Another is that HTTP more frequently uses binary content types than MIME, so it is worth noting that, in such cases, the byte order used to compute the digest is the transmission byte order defined for the type. Lastly, HTTP allows transmission of text types with any of several line break conventions and not just the canonical form using CRLF.</tt>

### Date ^

The Date general-header field represents the date and time at which the message was originated, having the same semantics as orig-date in RFC 822. The field value is an HTTP-date; it MUST be sent in RFC 1123 [8]-date format.

<div>
  <pre id="ptb32">Date: Tue, 15 Nov 1994 08:12:31 GMT</pre>
</div>

**Origin servers MUST include a Date header field in all responses, except in these cases**:

  1. If the response status code is 100 (Continue) or 101 (Switching Protocols), the response MAY include a Date header field, at the server&#8217;s option.
  2. If the response status code conveys a server error, e.g. 500 (Internal Server Error) or 503 (Service Unavailable), and it is inconvenient or impossible to generate a valid Date.
  3. If the server does not have a clock that can provide a reasonable approximation of the current time, its responses MUST NOT include a Date header field. In this case, the rules in section 14.18.1 MUST be followed.

A received message that does not have a Date header field MUST be assigned one by the recipient if the message will be cached by that recipient or gatewayed via a protocol which requires a Date. An HTTP implementation without a clock MUST NOT cache responses without revalidating them on every use. An HTTP cache, especially a shared cache, SHOULD use a mechanism, such as NTP [28], to synchronize its clock with a reliable external standard.

Clients SHOULD only send a Date header field in messages that include an entity-body, as in the case of the PUT and POST requests, and even then it is optional. A client without a clock MUST NOT send a Date header field in a request.

The HTTP-date sent in a Date header SHOULD NOT represent a date and time subsequent to the generation of the message. It SHOULD represent the best available approximation of the date and time of message generation, unless the implementation has no means of generating a reasonably accurate date and time. In theory, the date ought to represent the moment just before the entity is generated. In practice, the date can be generated at any time during the message origination without affecting its semantic value.

**Clockless Origin Server Operation** <q>Some origin server implementations might not have a clock available. An origin server without a clock MUST NOT assign Expires or Last- Modified values to a response, unless these values were associated with the resource by a system or user with a reliable clock. It MAY assign an Expires value that is known, at or before server configuration time, to be in the past (this allows &#8220;pre-expiration&#8221; of responses without storing separate Expires values for each resource).</q>

### ETag ^

The ETag response-header field provides the current value of the entity tag for the requested variant. The entity tag MAY be used for comparison with other entities from the same resource.

<div>
  <pre id="ptb33">ETag = "ETag" ":" entity-tag</pre>
</div>

Examples:

<div>
  <pre id="ptb34">ETag: "xyzzy"
ETag: W/"xyzzy"
ETag: ""</pre>
</div>

### Expires ^

The Expires entity-header field gives the date/time after which the response is considered stale. A stale cache entry may not normally be returned by a cache (either a proxy cache or a user agent cache) unless it is first validated with the origin server (or with an intermediate cache that has a fresh copy of the entity).

The presence of an Expires field does not imply that the original resource will change or cease to exist at, before, or after that time.

The format is an absolute date and time as defined by HTTP-date; it MUST be in RFC 1123 date format:

<div>
  <pre id="ptb35">Expires = "Expires" ":" HTTP-date</pre>
</div>

An example of its use is

<div>
  <pre id="ptb36">Expires: Thu, 01 Dec 1994 16:00:00 GMT</pre>
</div>

###### **NOTE**: If a response includes a Cache-Control field with the max-age directive, that directive overrides the Expires field. ^

**HTTP/1.1 clients and caches MUST treat other invalid date formats, especially including the value &#8220;0&#8221;, as in the past (i.e., &#8220;already expired&#8221;).To mark a response as &#8220;already expired,&#8221; an origin server sends an Expires date that is equal to the Date header value.To mark a response as &#8220;never expires,&#8221; an origin server sends an Expires date approximately one year from the time the response is sent. HTTP/1.1 servers SHOULD NOT send Expires dates more than one year in the future.The presence of an Expires header field with a date value of some time in the future on a response that otherwise would by default be non-cacheable indicates that the response is cacheable, unless indicated otherwise by a Cache-Control header field**

### If-Match ^

The If-Match request-header field is used with a method to make it conditional. A client that has one or more entities previously obtained from the resource can verify that one of those entities is current by including a list of their associated entity tags in the If-Match header field. Entity tags are defined in section 3.11. The purpose of this feature is to allow efficient updates of cached information with a minimum amount of transaction overhead. It is also used, on updating requests, to prevent inadvertent modification of the wrong version of a resource. As a special case, the value &#8220;*&#8221; matches any current entity of the resource.

If any of the entity tags match the entity tag of the entity that would have been returned in the response to a similar GET request (without the If-Match header) on that resource, or if &#8220;*&#8221; is given and any current entity exists for that resource, then the server MAY perform the requested method as if the If-Match header field did not exist.

If none of the entity tags match, or if &#8220;*&#8221; is given and no current entity exists, the server MUST NOT perform the requested method, and MUST return a **412** (Precondition Failed) response. This behavior is most useful when the client wants to prevent an updating method, such as PUT, from modifying a resource that has changed since the client last retrieved it.

If the request would, without the If-Match header field, result in anything other than a 2xx or 412 status, then the If-Match header MUST be ignored.

The meaning of &#8220;If-Match: *&#8221; is that the method SHOULD be performed if the representation selected by the origin server (or by a cache, possibly using the Vary mechanism, see section 14.44) exists, and MUST NOT be performed if the representation does not exist.

A request intended to update a resource (e.g., a PUT) MAY include an If-Match header field to signal that the request method MUST NOT be applied if the entity corresponding to the If-Match value (a single entity tag) is no longer a representation of that resource. This allows the user to indicate that they do not wish the request to be successful if the resource has been changed without their knowledge. Examples:

### If-Modified-Since ^

The If-Modified-Since request-header field is used with a method to make it conditional: if the requested variant has not been modified since the time specified in this field, an entity will not be returned from the server; instead, a **304** (not modified) response will be returned without any message-body.

<div>
  <pre id="ptb37">If-Modified-Since = "If-Modified-Since" ":" HTTP-date</pre>
</div>

An example of the field is:

<div>
  <pre id="ptb38">If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT</pre>
</div>

A GET method with an If-Modified-Since header and no Range header requests that the identified entity be transferred only if it has been modified since the date given by the If-Modified-Since header. The algorithm for determining this includes the following cases:

  1. If the request would normally result in anything other than a 200 (OK) status, or if the passed If-Modified-Since date is invalid, the response is exactly the same as for a normal GET. A date which is later than the server&#8217;s current time is invalid.
  2. If the variant has been modified since the If-Modified-Since date, the response is exactly the same as for a normal GET.
  3. If the variant has not been modified since a valid If- Modified-Since date, the server SHOULD return a 304 (Not Modified) response.

The purpose of this feature is to allow efficient updates of cached information with a minimum amount of transaction overhead.

**NOTE:** The Range request-header field modifies the meaning of If- Modified-Since.

**NOTE:** If-Modified-Since times are interpreted by the server, whose clock might not be synchronized with the client.

**NOTE:** When handling an If-Modified-Since header field, some servers will use an exact date comparison function, rather than a less-than function, for deciding whether to send a 304 (Not Modified) response. To get best results when sending an If- Modified-Since header field for cache validation, clients are advised to use the exact date string received in a previous Last- Modified header field whenever possible.

**NOTE:** If a client uses an arbitrary date in the If-Modified-Since header instead of a date taken from the Last-Modified header for the same request, the client should be aware of the fact that this date is interpreted in the server&#8217;s understanding of time. The client should consider unsynchronized clocks and rounding problems due to the different encodings of time between the client and server. This includes the possibility of race conditions if the document has changed between the time it was first requested and the If-Modified-Since date of a subsequent request, and the possibility of clock-skew-related problems if the If-Modified- Since date is derived from the client&#8217;s clock without correction to the server&#8217;s clock. Corrections for different time bases between client and server are at best approximate due to network latency.

### If-None-Match ^

The If-None-Match request-header field is used with a method to make it conditional. A client that has one or more entities previously obtained from the resource can verify that none of those entities is current by including a list of their associated entity tags in the If-None-Match header field. The purpose of this feature is to allow efficient updates of cached information with a minimum amount of transaction overhead. It is also used to prevent a method (e.g. PUT) from inadvertently modifying an existing resource when the client believes that the resource does not exist.

If any of the entity tags match the entity tag of the entity that would have been returned in the response to a similar GET request (without the If-None-Match header) on that resource, or if &#8220;*&#8221; is given and any current entity exists for that resource, then the server MUST NOT perform the requested method, unless required to do so because the resource&#8217;s modification date fails to match that supplied in an If-Modified-Since header field in the request. Instead, if the request method was GET or HEAD, the server SHOULD respond with a **304** (Not Modified) response, including the cache- related header fields (particularly ETag) of one of the entities that matched. For all other request methods, the server MUST respond with a status of **412** (Precondition Failed).

If none of the entity tags match, then the server MAY perform the requested method as if the If-None-Match header field did not exist, but MUST also ignore any If-Modified-Since header field(s) in the request. That is, if no entity tags match, then the server MUST NOT return a **304** (Not Modified) response.

If the request would, without the If-None-Match header field, result in anything other than a 2xx or **304** status, then the If-None-Match header MUST be ignored.

The meaning of &#8220;If-None-Match: *&#8221; is that the method MUST NOT be performed if the representation selected by the origin server (or by a cache, possibly using the Vary mechanism) exists, and SHOULD be performed if the representation does not exist. This feature is intended to be useful in preventing races between PUT operations.

Examples:

<div>
  <pre id="ptb39">If-None-Match: "xyzzy"
If-None-Match: W/"xyzzy"
If-None-Match: "xyzzy", "r2d2xxxx", "c3piozzzz"
If-None-Match: W/"xyzzy", W/"r2d2xxxx", W/"c3piozzzz"
If-None-Match: *</pre>
</div>

### If-Range ^

If a client has a partial copy of an entity in its cache, and wishes to have an up-to-date copy of the entire entity in its cache, it could use the Range request-header with a conditional GET (using either or both of If-Unmodified-Since and If-Match.) However, if the condition fails because the entity has been modified, the client would then have to make a second request to obtain the entire current entity-body.

The If-Range header allows a client to &#8220;short-circuit&#8221; the second request. Informally, its meaning is &#8216;if the entity is unchanged, send me the part(s) that I&#8217;m missing; otherwise, send the entire new entity&#8217;.

If the client has no entity tag for an entity, but does have a Last- Modified date, it MAY use that date in an If-Range header. (The server can distinguish between a valid HTTP-date and any form of entity-tag by examining no more than two characters.) The If-Range header SHOULD only be used together with a Range header, and MUST be ignored if the request does not include a Range header, or if the server does not support the sub-range operation.

If the entity tag given in the If-Range header matches the current entity tag for the entity, then the server SHOULD provide the specified sub-range of the entity using a **206** (Partial content) response. If the entity tag does not match, then the server SHOULD return the entire entity using a **200** (OK) response.

### If-Unmodified-Since ^

The If-Unmodified-Since request-header field is used with a method to make it **conditional**. If the requested resource has not been modified since the time specified in this field, the server SHOULD perform the requested operation as if the _If-Unmodified-Since_ header were not present.If the requested variant has been modified since the specified time, the server MUST NOT perform the requested operation, and MUST return a **412** (Precondition Failed).An example of the field is: `If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT` If the request normally (i.e., without the If-Unmodified-Since header) would result in anything other than a 2xx or 412 status, the If-Unmodified-Since header SHOULD be ignored. If the specified date is invalid, the header is ignored. The result of a request having both an If-Unmodified-Since header field and either an If-None-Match or an If-Modified-Since header fields is undefined by this specification.

### Last-Modified ^

The Last-Modified entity-header field indicates the date and time at which the origin server believes the variant was last modified. Ex. `Last-Modified: Tue, 15 Nov 1994 12:45:26 GMT` The exact meaning of this header field depends on the implementation of the origin server and the nature of the original resource. For files, it may be just the file system last-modified time. For entities with dynamically included parts, it may be the most recent of the set of last-modify times for its component parts. For database gateways, it may be the last-update time stamp of the record. For virtual objects, it may be the last time the internal state changed.An origin server MUST NOT send a Last-Modified date which is later than the server&#8217;s time of message origination. In such cases, where the resource&#8217;s last modification would indicate some time in the future, the server MUST replace that date with the message origination date.An origin server SHOULD obtain the Last-Modified value of the entity as close as possible to the time that it generates the Date value of its response. This allows a recipient to make an accurate assessment of the entity&#8217;s modification time, especially if the entity changes near the time that the response is generated.

### Pragma ^

The Pragma general-header field is used to include implementation- specific directives that might apply to any recipient along the request/response chain. All pragma directives specify optional behavior from the viewpoint of the protocol; however, some systems MAY require that behavior be consistent with the directives.

<div>
  <pre id="ptb40">Pragma            = "Pragma" ":" 1#pragma-directive
pragma-directive  = "no-cache" | extension-pragma
extension-pragma  = token [ "=" ( token | quoted-string ) ]</pre>
</div>

When the no-cache directive is present in a request message, an application SHOULD forward the request toward the origin server even if it has a cached copy of what is being requested. This pragma directive has the same semantics as the no-cache cache-directive and is defined here for backward compatibility with HTTP/1.0. Clients SHOULD include both header fields when a no-cache request is sent to a server not known to be HTTP/1.1 compliant.Pragma directives MUST be passed through by a proxy or gateway application, regardless of their significance to that application, since the directives might be applicable to all recipients along the request/response chain. It is not possible to specify a pragma for a specific recipient; however, any pragma directive not relevant to a recipient SHOULD be ignored by that recipient.HTTP/1.1 caches SHOULD treat &#8220;Pragma: no-cache&#8221; as if the client had sent &#8220;Cache-Control: no-cache&#8221;. No new Pragma directives will be defined in HTTP.

**NOTE:** because the meaning of &#8220;Pragma: no-cache as a response header field is not actually specified, it does not provide a reliable replacement for &#8220;Cache-Control: no-cache&#8221; in a response

### Vary ^

The Vary field value indicates the set of request-header fields that fully determines, while the response is fresh, whether a cache is permitted to use the response to reply to a subsequent request without revalidation. For uncacheable or stale responses, the Vary field value advises the user agent about the criteria that were used to select the representation. A Vary field value of &#8220;*&#8221; implies that a cache cannot determine from the request headers of a subsequent request whether this response is the appropriate representation.An HTTP/1.1 server SHOULD include a Vary header field with any cacheable response that is subject to server-driven negotiation. Doing so allows a cache to properly interpret future requests on that resource and informs the user agent about the presence of negotiation on that resource. A server MAY include a Vary header field with a non-cacheable response that is subject to server-driven negotiation, since this might provide the user agent with useful information about the dimensions over which the response varies at the time of the response.A Vary field value consisting of a list of field-names signals that the representation selected for the response is based on a selection algorithm which considers ONLY the listed request-header field values in selecting the most appropriate representation. A cache MAY assume that the same selection will be made for future requests with the same values for the listed field names, for the duration of time for which the response is fresh.

### Via ^

The Via general-header field MUST be used by gateways and proxies to indicate the intermediate protocols and recipients between the user agent and the server on requests, and between the origin server and the client on responses. It is analogous to the &#8220;Received&#8221; field of RFC 822 [9] and is intended to be used for tracking message forwards, avoiding request loops, and identifying the protocol capabilities of all senders along the request/response chain.

Comments MAY be used in the Via header field to identify the software of the recipient proxy or gateway, analogous to the User-Agent and Server header fields. However, all comments in the Via field are optional and MAY be removed by any recipient prior to forwarding the message.

For example, a request message could be sent from an HTTP/1.0 user agent to an internal proxy code-named &#8220;fred&#8221;, which uses HTTP/1.1 to forward the request to a public proxy at nowhere.com, which completes the request by forwarding it to the origin server at www.ics.uci.edu. The request received by www.ics.uci.edu would then have the following Via header field: `Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)`

## PHP Concepts Overview ^

<blockquote cite="http://www.php.net/manual/en/function.header.php#45756">
  <p>
    How to force browser to use already downloaded and cached file. If you have images in DB, they will reload each time user views them. To prevent this, web server must identify each file with ID. When sending a file, web server attaches ID of the file in header called ETag. <code>header("ETag: "uniqueID");</code> When requesting file, browser checks if the file was already downloaded. If cached file is found, server sends the ID with the file request to server. Server checks if the IDs match and if they do, sends back <code>header("HTTP/1.1 304 Not Modified");</code> else Server sends the file normally.
  </p>
</blockquote>

<div>
  <pre id="ptb41">&lt;?php

  $file = getFileFromDB();

  // generate unique ID
  $hash = md5($file);

  $headers = getallheaders();

  // if Browser sent ID, we check if they match
  if (ereg($hash, $headers['If-None-Match']))
  {
    header('HTTP/1.1 304 Not Modified');
  }
  else
  {
   header("ETag: $hash");
   header("Accept-Ranges: bytes");
   header("Content-Length: ".strlen($file));
   header("Content-Type: $mime");
   header("Content-Disposition: inline; filename=$filename;");
   echo $file;
  }
  exit();

?&gt;</pre>
</div>

#### mod_gzip ^

A good discussion about the mod_expires method can be found on Powweb or SitePoint

### Cache-control Mechanisms ^

The basic cache mechanisms in HTTP/1.1 (server-specified expiration times and validators) are implicit directives to caches. In some cases, a server or client might need to provide explicit directives to the HTTP caches. We use the Cache-Control header for this purpose.The Cache-Control header allows a client or server to transmit a variety of directives in either requests or responses. These directives typically override the default caching algorithms. As a general rule, if there is any apparent conflict between header values, the most restrictive interpretation is applied (that is, the one that is most likely to preserve semantic transparency). However, in some cases, cache-control directives are explicitly specified as weakening the approximation of semantic transparency (for example, &#8220;max-stale&#8221; or &#8220;public&#8221;).The cache-control directives are described in detail in section 14.9.

* * *

### Explicit User Agent Warnings ^

Many user agents make it possible for users to override the basic caching mechanisms. For example, the user agent might allow the user to specify that cached entities (even explicitly stale ones) are never validated. Or the user agent might habitually add &#8220;Cache- Control: max-stale=3600&#8221; to every request. The user agent SHOULD NOT default to either non-transparent behavior, or behavior that results in abnormally ineffective caching, but MAY be explicitly configured to do so by an explicit action of the user.

If the user has overridden the basic caching mechanisms, the user agent SHOULD explicitly indicate to the user whenever this results in the display of information that might not meet the server&#8217;s transparency requirements (in particular, if the displayed entity is known to be stale). Since the protocol normally allows the user agent to determine if responses are stale or not, this indication need only be displayed when this actually happens. The indication need not be a dialog box; it could be an icon (for example, a picture of a rotting fish) or some other indicator.

If the user has overridden the caching mechanisms in a way that would abnormally reduce the effectiveness of caches, the user agent SHOULD continually indicate this state to the user (for example, by a display of a picture of currency in flames) so that the user does not inadvertently consume excess resources or suffer from excessive latency.

### Exceptions to the Rules and Warnings ^

In some cases, the operator of a cache MAY choose to configure it to return stale responses even when not requested by clients. This decision ought not be made lightly, but may be necessary for reasons of availability or performance, especially when the cache is poorly connected to the origin server. Whenever a cache returns a stale response, it MUST mark it as such (using a Warning header) enabling the client software to alert the user that there might be a potential problem. It also allows the user agent to take steps to obtain a first-hand or fresh response. For this reason, a cache SHOULD NOT return a stale response if the client explicitly requests a first-hand or fresh one, unless it is impossible to comply for technical or policy reasons.

### Client-controlled Behavior ^

While the origin server (and to a lesser extent, intermediate caches, by their contribution to the age of a response) are the primary source of expiration information, in some cases the client might need to control a cache&#8217;s decision about whether to return a cached response without validating it. Clients do this using several directives of the Cache-Control header.

A client&#8217;s request MAY specify the maximum age it is willing to accept of an unvalidated response; specifying a value of zero forces the cache(s) to revalidate all responses. A client MAY also specify the minimum time remaining before a response expires. Both of these options increase constraints on the behavior of caches, and so cannot further relax the cache&#8217;s approximation of semantic transparency.

A client MAY also specify that it will accept stale responses, up to some maximum amount of staleness. This loosens the constraints on the caches, and so might violate the origin server&#8217;s specified constraints on semantic transparency, but might be necessary to support disconnected operation, or high availability in the face of poor connectivity.

### Server-Specified Expiration ^

HTTP caching works best when caches can entirely avoid making requests to the origin server. The primary mechanism for avoiding requests is for an origin server to provide an explicit expiration time in the future, indicating that a response MAY be used to satisfy subsequent requests. In other words, a cache can return a fresh response without first contacting the server.Our expectation is that servers will assign future explicit expiration times to responses in the belief that the entity is not likely to change, in a semantically significant way, before the expiration time is reached. This normally preserves semantic transparency, as long as the server&#8217;s expiration times are carefully chosen.The expiration mechanism applies only to responses taken from a cache and not to first-hand responses forwarded immediately to the requesting client.If an origin server wishes to force a semantically transparent cache to validate every request, it MAY assign an explicit expiration time in the past. This means that the response is always stale, and so the cache SHOULD validate it before using it for subsequent requests. See section 14.9.4 for a more restrictive way to force revalidation.If an origin server wishes to force any HTTP/1.1 cache, no matter how it is configured, to validate every request, it SHOULD use the &#8220;must- revalidate&#8221; cache-control directive.Servers specify explicit expiration times using either the Expires header, or the max-age directive of the Cache-Control header.An expiration time cannot be used to force a user agent to refresh its display or reload a resource; its semantics apply only to caching mechanisms, and such mechanisms need only check a resource&#8217;s expiration status when a new request for that resource is initiated.

### Heuristic Expiration ^

Since origin servers do not always provide explicit expiration times, HTTP caches typically assign heuristic expiration times, employing algorithms that use other header values (such as the Last-Modified time) to estimate a plausible expiration time. The HTTP/1.1 specification does not provide specific algorithms, but does impose worst-case constraints on their results. Since heuristic expiration times might compromise semantic transparency, they ought to used cautiously, and we encourage origin servers to provide explicit expiration times as much as possible.

### Age Calculations ^

In order to know if a cached entry is fresh, a cache needs to know if its age exceeds its freshness lifetime. Describes how to calculate the age of a response or cache entry.In this discussion, we use the term &#8220;now&#8221; to mean &#8220;the current value of the clock at the host performing the calculation.&#8221; Hosts that use HTTP, but especially hosts running origin servers and caches, SHOULD use NTP [28] or some similar protocol to synchronize their clocks to a globally accurate time standard.HTTP/1.1 requires origin servers to send a Date header, if possible, with every response, giving the time at which the response was generated . We use the term &#8220;date\_value&#8221; to denote the value of the Date header, in a form appropriate for arithmetic operations.HTTP/1.1 uses the Age response-header to convey the estimated age of the response message when obtained from a cache. The Age field value is the cache&#8217;s estimate of the amount of time since the response was generated or revalidated by the origin server.In essence, the Age value is the sum of the time that the response has been resident in each of the caches along the path from the origin server, plus the amount of time it has been in transit along network paths.We use the term &#8220;age\_value&#8221; to denote the value of the Age header, in a form appropriate for arithmetic operations.

A response&#8217;s age can be calculated in two entirely independent ways:

  1. now minus date_value, if the local clock is reasonably well synchronized to the origin server&#8217;s clock. If the result is negative, the result is replaced by zero.
  2. age_value, if all of the caches along the response path implement HTTP/1.1.

Given that we have two independent ways to compute the age of a response when it is received, we can combine these ascorrected\_received\_age = max(now &#8211; date\_value, age\_value)and as long as we have either nearly synchronized clocks or all- HTTP/1.1 paths, one gets a reliable (conservative) result.Because of network-imposed delays, some significant interval might pass between the time that a server generates a response and the time it is received at the next outbound cache or client. If uncorrected, this delay could result in improperly low ages.Because the request that resulted in the returned Age value must have been initiated prior to that Age value&#8217;s generation, we can correct for delays imposed by the network by recording the time at which the request was initiated. Then, when an Age value is received, it MUST be interpreted relative to the time the request was initiated, not the time that the response was received. This algorithm results in conservative behavior no matter how much delay is experienced. So, we compute:corrected\_initial\_age = corrected\_received\_age + (now &#8211; request\_time)where &#8220;request\_time&#8221; is the time (according to the local clock) when the request that elicited this response was sent.

Summary of age calculation algorithm, when a cache receives a response:

age_value
:   the value of Age: header received by the cache with this response

date_value
:   the value of the origin server&#8217;s Date: header

request_time
:   the (local) time when the cache made the request that resulted in this cached response

response_time
:   the (local) time when the cache received the response

now
:   the current (local) time

<div>
  <pre id="ptb42">apparent_age = max(0, response_time - date_value);
corrected_received_age = max(apparent_age, age_value);
response_delay = response_time - request_time;
corrected_initial_age = corrected_received_age + response_delay;
resident_time = now - response_time;
current_age   = corrected_initial_age + resident_time;</pre>
</div>

The current\_age of a cache entry is calculated by adding the amount of time (in seconds) since the cache entry was last validated by the origin server to the corrected\_initial\_age. When a response is generated from a cache entry, the cache MUST include a single Age header field in the response with a value equal to the cache entry&#8217;s current\_age.

The presence of an Age header field in a response implies that a response is not first-hand. However, the converse is not true, since the lack of an Age header field in a response does not imply that the response is first-hand unless all caches along the request path are compliant with HTTP/1.1 (i.e., older HTTP caches did not implement the Age header field).

### Expiration Calculations ^

In order to decide whether a response is fresh or stale, we need to compare its freshness lifetime to its age. The age is calculated as described in section 13.2.3; this section describes how to calculate the freshness lifetime, and to determine if a response has expired. In the discussion below, the values can be represented in any form appropriate for arithmetic operations.We use the term &#8220;expires\_value&#8221; to denote the value of the Expires header. We use the term &#8220;max\_age\_value&#8221; to denote an appropriate value of the number of seconds carried by the &#8220;max-age&#8221; directive of the Cache-Control header in a response.The max-age directive takes priority over Expires, so if max-age is present in a response, the calculation is simply:freshness\_lifetime = max\_age\_valueOtherwise, if Expires is present in the response, the calculation is:freshness\_lifetime = expires\_value &#8211; date\_valueNote that neither of these calculations is vulnerable to clock skew, since all of the information comes from the origin server.If none of Expires, Cache-Control: max-age, or Cache-Control: s- maxage appears in the response, and the response does not include other restrictions on caching, the cache MAY compute a freshness lifetime using a heuristic. The cache MUST attach Warning 113 to any response whose age is more than 24 hours if such warning has not already been added.Also, if the response does have a Last-Modified time, the heuristic expiration value SHOULD be no more than some fraction of the interval since that time. A typical setting of this fraction might be 10%.The calculation to determine if a response has expired is quite simple:response\_is\_fresh = (freshness\_lifetime > current_age)

### Disambiguating Expiration Values ^

Because expiration values are assigned optimistically, it is possible for two caches to contain fresh values for the same resource that are different.

If a client performing a retrieval receives a non-first-hand response for a request that was already fresh in its own cache, and the Date header in its existing cache entry is newer than the Date on the new response, then the client MAY ignore the response. If so, it MAY retry the request with a &#8220;Cache-Control: max-age=0&#8221; directive , to force a check with the origin server.

If a cache has two fresh responses for the same representation with different validators, it MUST use the one with the more recent Date header. This situation might arise because the cache is pooling responses from other caches, or because a client has asked for a reload or a revalidation of an apparently fresh cache entry.

### Disambiguating Multiple Responses ^

Because a client might be receiving responses via multiple paths, so that some responses flow through one set of caches and other responses flow through a different set of caches, a client might receive responses in an order different from that in which the origin server sent them. We would like the client to use the most recently generated response, even if older responses are still apparently fresh.

Neither the entity tag nor the expiration value can impose an ordering on responses, since it is possible that a later response intentionally carries an earlier expiration time. The Date values are ordered to a granularity of one second.

When a client tries to revalidate a cache entry, and the response it receives contains a Date header that appears to be older than the one for the existing entry, then the client SHOULD repeat the request unconditionally, and include `Cache-Control: max-age=0` to force any intermediate caches to validate their copies directly with the origin server, or `Cache-Control: no-cache` to force any intermediate caches to obtain a new copy from the origin server. If the Date values are equal, then the client MAY use either response (or MAY, if it is being extremely prudent, request a new response). Servers MUST NOT depend on clients being able to choose deterministically between responses generated during the same second, if their expiration times overlap.

### Validation Model ^

When a cache has a stale entry that it would like to use as a response to a client&#8217;s request, it first has to check with the origin server (or possibly an intermediate cache with a fresh response) to see if its cached entry is still usable. We call this &#8220;validating&#8221; the cache entry. Since we do not want to have to pay the overhead of retransmitting the full response if the cached entry is good, and we do not want to pay the overhead of an extra round trip if the cached entry is invalid, the HTTP/1.1 protocol supports the use of conditional methods.The key protocol features for supporting conditional methods are those concerned with &#8220;cache validators.&#8221; When an origin server generates a full response, it attaches some sort of validator to it, which is kept with the cache entry. When a client (user agent or proxy cache) makes a conditional request for a resource for which it has a cache entry, it includes the associated validator in the request.The server then checks that validator against the current validator for the entity, and, if they match , it responds with a special status code (usually, 304 (Not Modified)) and no entity-body. Otherwise, it returns a full response (including entity-body). Thus, we avoid transmitting the full response if the validator matches, and we avoid an extra round trip if it does not match.In HTTP/1.1, a conditional request looks exactly the same as a normal request for the same resource, except that it carries a special header (which includes the validator) that implicitly turns the method (usually, GET) into a conditional.The protocol includes both positive and negative senses of cache- validating conditions. That is, it is possible to request either that a method be performed if and only if a validator matches or if and only if no validators match.Note: a response that lacks a validator may still be cached, and served from cache until it expires, unless this is explicitly prohibited by a cache-control directive. However, a cache cannot do a conditional retrieval if it does not have a validator for the entity, which means it will not be refreshable after it expires.

### Last-Modified Dates ^

The Last-Modified entity-header field value is often used as a cache validator. In simple terms, a cache entry is considered to be valid if the entity has not been modified since the Last-Modified value.

### Entity Tag Cache Validators ^

The ETag response-header field value, an entity tag, provides for an &#8220;opaque&#8221; cache validator. This might allow more reliable validation in situations where it is inconvenient to store modification dates, where the one-second resolution of HTTP date values is not sufficient, or where the origin server wishes to avoid certain paradoxes that might arise from the use of modification dates.Entity Tags are described in section 3.11. The headers used with entity tags are described in sections 14.19, 14.24, 14.26 and 14.44.

### Weak and Strong Validators ^

Since both origin servers and caches will compare two validators to decide if they represent the same or different entities, one normally would expect that if the entity (the entity-body or any entity- headers) changes in any way, then the associated validator would change as well. If this is true, then we call this validator a &#8220;strong validator.&#8221;However, there might be cases when a server prefers to change the validator only on semantically significant changes, and not when insignificant aspects of the entity change. A validator that does not always change when the resource changes is a &#8220;weak validator.&#8221;Entity tags are normally &#8220;strong validators,&#8221; but the protocol provides a mechanism to tag an entity tag as &#8220;weak.&#8221; One can think of a strong validator as one that changes whenever the bits of an entity changes, while a weak value changes whenever the meaning of an entity changes. Alternatively, one can think of a strong validator as part of an identifier for a specific entity, while a weak validator is part of an identifier for a set of semantically equivalent entities.Note: One example of a strong validator is an integer that is incremented in stable storage every time an entity is changed.An entity&#8217;s modification time, if represented with one-second resolution, could be a weak validator, since it is possible that the resource might be modified twice during a single second.Support for weak validators is optional. However, weak validators allow for more efficient caching of equivalent objects; for example, a hit counter on a site is probably good enough if it is updated every few days or weeks, and any value during that period is likely &#8220;good enough&#8221; to be equivalent.A &#8220;use&#8221; of a validator is either when a client generates a request and includes the validator in a validating header field, or when a server compares two validators.Strong validators are usable in any context. Weak validators are only usable in contexts that do not depend on exact equality of an entity. For example, either kind is usable for a conditional GET of a full entity. However, only a strong validator is usable for a sub-range retrieval, since otherwise the client might end up with an internally inconsistent entity.Clients MAY issue simple (non-subrange) GET requests with either weak validators or strong validators. Clients MUST NOT use weak validators in other forms of request.The only function that the HTTP/1.1 protocol defines on validators is comparison. There are two validator comparison functions, depending on whether the comparison context allows the use of weak validators or not:

  * The strong comparison function: in order to be considered equal, both validators MUST be identical in every way, and both MUST NOT be weak.
  * The weak comparison function: in order to be considered equal, both validators MUST be identical in every way, but either or both of them MAY be tagged as &#8220;weak&#8221; without affecting the result.

An entity tag is strong unless it is explicitly tagged as weak. Section 3.11 gives the syntax for entity tags.A Last-Modified time, when used as a validator in a request, is implicitly weak unless it is possible to deduce that it is strong, using the following rules:

  * The validator is being compared by an origin server to the actual current validator for the entity and,
  * That origin server reliably knows that the associated entity did not change twice during the second covered by the presented validator.

or

  * The validator is about to be used by a client in an If- Modified-Since or If-Unmodified-Since header, because the client has a cache entry for the associated entity, and
  * That cache entry includes a Date value, which gives the time when the origin server sent the original response, and
  * The presented Last-Modified time is at least 60 seconds before the Date value.

or

  * The validator is being compared by an intermediate cache to the validator stored in its cache entry for the entity, and
  * That cache entry includes a Date value, which gives the time when the origin server sent the original response, and
  * The presented Last-Modified time is at least 60 seconds before the Date value.

This method relies on the fact that if two different responses were sent by the origin server during the same second, but both had the same Last-Modified time, then at least one of those responses would have a Date value equal to its Last-Modified time. The arbitrary 60- second limit guards against the possibility that the Date and Last- Modified values are generated from different clocks, or at somewhat different times during the preparation of the response. An implementation MAY use a value larger than 60 seconds, if it is believed that 60 seconds is too short.If a client wishes to perform a sub-range retrieval on a value for which it has only a Last-Modified time and no opaque validator, it MAY do this only if the Last-Modified time is strong in the sense described here.A cache or origin server receiving a conditional request, other than a full-body GET request, MUST use the strong comparison function to evaluate the condition.These rules allow HTTP/1.1 caches and clients to safely perform sub- range retrievals on values that have been obtained from HTTP/1.0 servers.

### Rules for When to Use Entity Tags and Last-Modified Dates ^

We adopt a set of rules and recommendations for origin servers, clients, and caches regarding when various validator types ought to be used, and for what purposes.HTTP/1.1 origin servers:

  * SHOULD send an entity tag validator unless it is not feasible to generate one.
  * MAY send a weak entity tag instead of a strong entity tag, if performance considerations support the use of weak entity tags, or if it is unfeasible to send a strong entity tag.
  * SHOULD send a Last-Modified value if it is feasible to send one, unless the risk of a breakdown in semantic transparency that could result from using this date in an If-Modified-Since header would lead to serious problems.

In other words, the preferred behavior for an HTTP/1.1 origin server is to send both a strong entity tag and a Last-Modified value.In order to be legal, a strong entity tag MUST change whenever the associated entity value changes in any way. A weak entity tag SHOULD change whenever the associated entity changes in a semantically significant way.Note: in order to provide semantically transparent caching, an origin server must avoid reusing a specific strong entity tag value for two different entities, or reusing a specific weak entity tag value for two semantically different entities. Cache entries might persist for arbitrarily long periods, regardless of expiration times, so it might be inappropriate to expect that a cache will never again attempt to validate an entry using a validator that it obtained at some point in the past.HTTP/1.1 clients:

  * If an entity tag has been provided by the origin server, MUST use that entity tag in any cache-conditional request (using If- Match or If-None-Match).
  * If only a Last-Modified value has been provided by the origin server, SHOULD use that value in non-subrange cache-conditional requests (using If-Modified-Since).
  * If only a Last-Modified value has been provided by an HTTP/1.0 origin server, MAY use that value in subrange cache-conditional requests (using If-Unmodified-Since:). The user agent SHOULD provide a way to disable this, in case of difficulty.
  * If both an entity tag and a Last-Modified value have been provided by the origin server, SHOULD use both validators in cache-conditional requests. This allows both HTTP/1.0 and HTTP/1.1 caches to respond appropriately.

An HTTP/1.1 origin server, upon receiving a conditional request that includes both a Last-Modified date (e.g., in an If-Modified-Since or If-Unmodified-Since header field) and one or more entity tags (e.g., in an If-Match, If-None-Match, or If-Range header field) as cache validators, MUST NOT return a response status of 304 (Not Modified) unless doing so is consistent with all of the conditional header fields in the request.An HTTP/1.1 caching proxy, upon receiving a conditional request that includes both a Last-Modified date and one or more entity tags as cache validators, MUST NOT return a locally cached response to the client unless that cached response is consistent with all of the conditional header fields in the request.Note: The general principle behind these rules is that HTTP/1.1 servers and clients should transmit as much non-redundant information as is available in their responses and requests. HTTP/1.1 systems receiving this information will make the most conservative assumptions about the validators they receive.HTTP/1.0 clients and caches will ignore entity tags. Generally, last-modified values received or used by these systems will support transparent and efficient caching, and so HTTP/1.1 origin servers should provide Last-Modified values. In those rare cases where the use of a Last-Modified value as a validator by an HTTP/1.0 system could result in a serious problem, then HTTP/1.1 origin servers should not provide one.

### Non-validating Conditionals ^

The principle behind entity tags is that only the service author knows the semantics of a resource well enough to select an appropriate cache validation mechanism, and the specification of any validator comparison function more complex than byte-equality would open up a can of worms. Thus, comparisons of any other headers (except Last-Modified, for compatibility with HTTP/1.0) are never used for purposes of validating a cache entry.

### Response Cacheability ^

Unless specifically constrained by a cache-control (section 14.9) directive, a caching system MAY always store a successful response as a cache entry, MAY return it without validation if it is fresh, and MAY return it after successful validation. If there is neither a cache validator nor an explicit expiration time associated with a response, we do not expect it to be cached, but certain caches MAY violate this expectation (for example, when little or no network connectivity is available). A client can usually detect that such a response was taken from a cache by comparing the Date header to the current time.Note: some HTTP/1.0 caches are known to violate this expectation without providing any Warning.However, in some cases it might be inappropriate for a cache to retain an entity, or to return it in response to a subsequent request. This might be because absolute semantic transparency is deemed necessary by the service author, or because of security or privacy considerations. Certain cache-control directives are therefore provided so that the server can indicate that certain resource entities, or portions thereof, are not to be cached regardless of other considerations.Note that section 14.8 normally prevents a shared cache from saving and returning a response to a previous request if that request included an Authorization header.A response received with a status code of 200, 203, 206, 300, 301 or 410 MAY be stored by a cache and used in reply to a subsequent request, subject to the expiration mechanism, unless a cache-control directive prohibits caching. However, a cache that does not support the Range and Content-Range headers MUST NOT cache 206 (Partial Content) responses.A response received with any other status code (e.g. status codes 302 and 307) MUST NOT be returned in a reply to a subsequent request unless there are cache-control directives or another header(s) that explicitly allow it. For example, these include the following: an Expires header; a &#8220;max-age&#8221;, &#8220;s-maxage&#8221;, &#8220;must- revalidate&#8221;, &#8220;proxy-revalidate&#8221;, &#8220;public&#8221; or &#8220;private&#8221; cache-control directive.

### Constructing Responses From Caches ^

The purpose of an HTTP cache is to store information received in response to requests for use in responding to future requests. In many cases, a cache simply returns the appropriate parts of a response to the requester. However, if the cache holds a cache entry based on a previous response, it might have to combine parts of a new response with what is held in the cache entry.

### End-to-end and Hop-by-hop Headers ^

For the purpose of defining the behavior of caches and non-caching proxies, we divide HTTP headers into two categories:End-to-end headers, which are transmitted to the ultimate recipient of a request or response. End-to-end headers in responses MUST be stored as part of a cache entry and MUST be transmitted in any response formed from a cache entry.Hop-by-hop headers, which are meaningful only for a single transport-level connection, and are not stored by caches or forwarded by proxies.The following HTTP/1.1 headers are hop-by-hop headers:

  * Connection
  * Keep-Alive
  * Proxy-Authenticate
  * Proxy-Authorization
  * TE
  * Trailers
  * Transfer-Encoding
  * Upgrade

All other headers defined by HTTP/1.1 are end-to-end headers.Other hop-by-hop headers MUST be listed in a Connection header, (section 14.10) to be introduced into HTTP/1.1 (or later).

### Non-modifiable Headers ^

Some features of the HTTP/1.1 protocol, such as Digest Authentication, depend on the value of certain end-to-end headers. A transparent proxy SHOULD NOT modify an end-to-end header unless the definition of that header requires or specifically allows that. A transparent proxy MUST NOT modify any of the following fields in a request or response, and it MUST NOT add any of these fields if not already present:

  * Content-Location
  * Content-MD5
  * ETag
  * Last-Modified

A transparent proxy MUST NOT modify any of the following fields in a response: **Expires** but it MAY add any of these fields if not already present. If an Expires header is added, it MUST be given a field-value identical to that of the Date header in that response.

A proxy MUST NOT modify or add any of the following fields in a message that contains the no-transform cache-control directive, or in any request:

  * Content-Encoding
  * Content-Range
  * Content-Type

A non-transparent proxy MAY modify or add these fields to a message that does not include no-transform, but if it does so, it MUST add a Warning 214 (Transformation applied) if one does not already appear in the message.

Warning: unnecessary modification of end-to-end headers might cause authentication failures if stronger authentication mechanisms are introduced in later versions of HTTP. Such authentication mechanisms MAY rely on the values of header fields not listed here.

The Content-Length field of a request or response is added or deleted according to the rules. A transparent proxy MUST preserve the entity-length of the entity-body, although it MAY change the transfer-length.

### Combining Headers ^

When a cache makes a validating request to a server, and the server provides a 304 (Not Modified) response or a 206 (Partial Content) response, the cache then constructs a response to send to the requesting client.

If the status code is 304 (Not Modified), the cache uses the entity- body stored in the cache entry as the entity-body of this outgoing response. If the status code is 206 (Partial Content) and the ETag or Last-Modified headers match exactly, the cache MAY combine the contents stored in the cache entry with the new contents received in the response and use the result as the entity-body of this outgoing response.

The end-to-end headers stored in the cache entry are used for the constructed response, except that

  * any stored Warning headers with warn-code 1xx MUST be deleted from the cache entry and the forwarded response.
  * any stored Warning headers with warn-code 2xx MUST be retained in the cache entry and the forwarded response.
  * any end-to-end headers provided in the 304 or 206 response MUST replace the corresponding headers from the cache entry.

Unless the cache decides to remove the cache entry, it MUST also replace the end-to-end headers stored with the cache entry with corresponding headers received in the incoming response, except for Warning headers as described immediately above. If a header field- name in the incoming response matches more than one header in the cache entry, all such old headers MUST be replaced.

In other words, the set of end-to-end headers received in the incoming response overrides all corresponding end-to-end headers stored with the cache entry (except for stored Warning headers with warn-code 1xx, which are deleted even if not overridden).

Note: this rule allows an origin server to use a 304 (Not Modified) or a 206 (Partial Content) response to update any header associated with a previous response for the same entity or sub- ranges thereof, although it might not always be meaningful or correct to do so. This rule does not allow an origin server to use a 304 (Not Modified) or a 206 (Partial Content) response to entirely delete a header that it had provided with a previous response.

### Combining Byte Ranges ^

A response might transfer only a subrange of the bytes of an entity- body, either because the request included one or more Range specifications, or because a connection was broken prematurely. After several such transfers, a cache might have received several ranges of the same entity-body

.

If a cache has a stored non-empty set of subranges for an entity, and an incoming response transfers another subrange, the cache MAY combine the new subrange with the existing set if both the following conditions are met:

  * Both the incoming response and the cache entry have a cache validator.
  * The two cache validators match using the strong comparison function.

If either requirement is not met, the cache MUST use only the most recent partial response (based on the Date values transmitted with every response, and using the incoming response if these values are equal or missing), and MUST discard the other partial information.

### Caching Negotiated Responses ^

Use of server-driven content negotiation (section 12.1), as indicated by the presence of a Vary header field in a response, alters the conditions and procedure by which a cache can use the response for subsequent requests. See section 14.44 for use of the Vary header field by servers.A server SHOULD use the Vary header field to inform a cache of what request-header fields were used to select among multiple representations of a cacheable response subject to server-driven negotiation. The set of header fields named by the Vary field value is known as the &#8220;selecting&#8221; request-headers.When the cache receives a subsequent request whose Request-URI specifies one or more cache entries including a Vary header field, the cache MUST NOT use such a cache entry to construct a response to the new request unless all of the selecting request-headers present in the new request match the corresponding stored request-headers in the original request.The selecting request-headers from two requests are defined to match if and only if the selecting request-headers in the first request can be transformed to the selecting request-headers in the second requestby adding or removing linear white space (LWS) at places where this is allowed by the corresponding BNF, and/or combining multiple message-header fields with the same field name following the rules about message headers in section 4.2.A Vary header field-value of &#8220;*&#8221; always fails to match and subsequent requests on that resource can only be properly interpreted by the origin server.If the selecting request header fields for the cached entry do not match the selecting request header fields of the new request, then the cache MUST NOT use a cached entry to satisfy the request unless it first relays the new request to the origin server in a conditional request and the server responds with 304 (Not Modified), including an entity tag or Content-Location that indicates the entity to be used.If an entity tag was assigned to a cached representation, the forwarded request SHOULD be conditional and include the entity tags in an If-None-Match header field from all its cache entries for the resource. This conveys to the server the set of entities currently held by the cache, so that if any one of these entities matches the requested entity, the server can use the ETag header field in its 304 (Not Modified) response to tell the cache which entry is appropriate. If the entity-tag of the new response matches that of an existing entry, the new response SHOULD be used to update the header fields of the existing entry, and the result MUST be returned to the client.If any of the existing cache entries contains only partial content for the associated entity, its entity-tag SHOULD NOT be included in the If-None-Match header field unless the request is for a range that would be fully satisfied by that entry.If a cache receives a successful response whose Content-Location field matches that of an existing cache entry for the same Request- ]URI, whose entity-tag differs from that of the existing entry, and whose Date is more recent than that of the existing entry, the existing entry SHOULD NOT be returned in response to future requests and SHOULD be deleted from the cache.

### Shared and Non-Shared Caches ^

For reasons of security and privacy, it is necessary to make a distinction between &#8220;shared&#8221; and &#8220;non-shared&#8221; caches. A non-shared cache is one that is accessible only to a single user. Accessibility in this case SHOULD be enforced by appropriate security mechanisms. All other caches are considered to be &#8220;shared.&#8221; Other sections of this specification place certain constraints on the operation of shared caches in order to prevent loss of privacy or failure of access controls.

### Errors or Incomplete Response Cache Behavior ^

A cache that receives an incomplete response (for example, with fewer bytes of data than specified in a Content-Length header) MAY store the response. However, the cache MUST treat this as a partial response. Partial responses MAY be combined as described in section 13.5.4; the result might be a full response or might still be partial. A cache MUST NOT return a partial response to a client without explicitly marking it as such, using the 206 (Partial Content) status code. A cache MUST NOT return a partial response using a status code of 200 (OK).

If a cache receives a 5xx response while attempting to revalidate an entry, it MAY either forward this response to the requesting client, or act as if the server failed to respond. In the latter case, it MAY return a previously received response unless the cached entry includes the &#8220;must-revalidate&#8221; cache-control directive.

### Side Effects of GET and HEAD ^

Unless the origin server explicitly prohibits the caching of their responses, the application of GET and HEAD methods to any resources SHOULD NOT have side effects that would lead to erroneous behavior if these responses are taken from a cache. They MAY still have side effects, but a cache is not required to consider such side effects in its caching decisions. Caches are always expected to observe an origin server&#8217;s explicit restrictions on caching.

We note one exception to this rule: since some applications have traditionally used GETs and HEADs with query URLs (those containing a &#8220;?&#8221; in the rel_path part) to perform operations with significant side effects, caches MUST NOT treat responses to such URIs as fresh unless the server provides an explicit expiration time. This specifically means that responses from HTTP/1.0 servers for such URIs SHOULD NOT be taken from a cache.

### Invalidation After Updates or Deletions ^

The effect of certain methods performed on a resource at the origin server might cause one or more existing cache entries to become non- transparently invalid. That is, although they might continue to be &#8220;fresh,&#8221; they do not accurately reflect what the origin server would return for a new request on that resource.

There is no way for the HTTP protocol to guarantee that all such cache entries are marked invalid. For example, the request that caused the change at the origin server might not have gone through the proxy where a cache entry is stored. However, several rules help reduce the likelihood of erroneous behavior.

In this section, the phrase &#8220;invalidate an entity&#8221; means that the cache will either remove all instances of that entity from its storage, or will mark these as &#8220;invalid&#8221; and in need of a mandatory revalidation before they can be returned in response to a subsequent request.

Some HTTP methods MUST cause a cache to invalidate an entity. This is either the entity referred to by the Request-URI, or by the Location or Content-Location headers (if present). These methods are:

  * PUT
  * DELETE
  * POST

In order to prevent denial of service attacks, an invalidation based on the URI in a Location or Content-Location header MUST only be performed if the host part is the same as in the Request-URI. A cache that passes through requests for methods it does not understand SHOULD invalidate any entities referred to by the Request-URI.

### Write-Through Mandatory ^

All methods that might be expected to cause modifications to the origin server&#8217;s resources MUST be written through to the origin server. This currently includes all methods except for GET and HEAD. A cache MUST NOT reply to such a request from a client before having transmitted the request to the inbound server, and having received a corresponding response from the inbound server. This does not prevent a proxy cache from sending a 100 (Continue) response before the inbound server has sent its final reply.

The alternative (known as &#8220;write-back&#8221; or &#8220;copy-back&#8221; caching) is not allowed in HTTP/1.1, due to the difficulty of providing consistent updates and the problems arising from server, cache, or network failure prior to write-back.

### Cache Replacement ^

If a new cacheable (see sections 14.9.2, 13.2.5, 13.2.6 and 13.8) response is received from a resource while any existing responses for the same resource are cached, the cache SHOULD use the new response to reply to the current request. It MAY insert it into cache storage and MAY, if it meets all other requirements, use it to respond to any future requests that would previously have caused the old response to be returned. If it inserts the new response into cache storage the rules in section 13.5.3 apply.Note: a new response that has an older Date header value than existing cached responses is not cacheable.

### History Lists ^

User agents often have history mechanisms, such as &#8220;Back&#8221; buttons and history lists, which can be used to redisplay an entity retrieved earlier in a session.History mechanisms and caches are different. In particular history mechanisms SHOULD NOT try to show a semantically transparent view of the current state of a resource. Rather, a history mechanism is meant to show exactly what the user saw at the time when the resource was retrieved.By default, an expiration time does not apply to history mechanisms. If the entity is still in storage, a history mechanism SHOULD display it even if the entity has expired, unless the user has specifically configured the agent to refresh expired history documents.This is not to be construed to prohibit the history mechanism from telling the user that a view might be stale.Note: if history list mechanisms unnecessarily prevent users from viewing stale resources, this will tend to force service authors to avoid using HTTP expiration controls and cache controls when they would otherwise like to. Service authors may consider it important that users not be presented with error messages or warning messages when they use navigation controls (such as BACK) to view previously fetched resources. Even though sometimes such resources ought not to cached, or ought to expire quickly, user interface considerations may force service authors to resort to other means of preventing caching (e.g. &#8220;once-only&#8221; URLs) in order not to suffer the effects of improperly functioning history mechanisms.

### Header Field Definitions ^

This section defines the syntax and semantics of all standard HTTP/1.1 header fields. For entity-header fields, both sender and recipient refer to either the client or the server, depending on who sends and who receives the entity.

### Accept ^

The Accept request-header field can be used to specify certain media types which are acceptable for the response. Accept headers can be used to indicate that the request is specifically limited to a small set of desired types, as in the case of a request for an in-line image.

<div>
  <pre id="ptb43">Accept         = "Accept" ":"
#( media-range [ accept-params ] )

media-range    = ( "*/*"
| ( type "/" "*" )
| ( type "/" subtype )
) *( ";" parameter )
accept-params  = ";" "q" "=" qvalue *( accept-extension )
accept-extension = ";" token [ "=" ( token | quoted-string ) ]</pre>
</div>

The asterisk &#8220;\*&#8221; character is used to group media types into ranges, with &#8220;\*/\*&#8221; indicating all media types and &#8220;type/\*&#8221; indicating all subtypes of that type. The media-range MAY include media type parameters that are applicable to that range.Each media-range MAY be followed by one or more accept-params, beginning with the &#8220;q&#8221; parameter for indicating a relative quality factor. The first &#8220;q&#8221; parameter (if any) separates the media-range parameter(s) from the accept-params. Quality factors allow the user or user agent to indicate the relative degree of preference for that media-range, using the qvalue scale from 0 to 1 (section 3.9). The default value is q=1.Note: Use of the &#8220;q&#8221; parameter name to separate media type parameters from Accept extension parameters is due to historical practice. Although this prevents any media type parameter named &#8220;q&#8221; from being used with a media range, such an event is believed to be unlikely given the lack of any &#8220;q&#8221; parameters in the IANA media type registry and the rare usage of any media type parameters in Accept. Future media types are discouraged from registering any parameter named &#8220;q&#8221;.The example: `Accept: audio/*; q=0.2, audio/basic` SHOULD be interpreted as &#8220;I prefer audio/basic, but send me any audio type if it is the best available after an 80% mark-down in quality.&#8221;If no Accept header field is present, then it is assumed that the client accepts all media types. If an Accept header field is present, and if the server cannot send a response which is acceptable according to the combined Accept field value, then the server SHOULD send a 406 (not acceptable) response.A more elaborate example is

<div>
  <pre id="ptb44">Accept: text/plain; q=0.5, text/html,
text/x-dvi; q=0.8, text/x-c</pre>
</div>

Verbally, this would be interpreted as &#8220;text/html and text/x-c are the preferred media types, but if they do not exist, then send the text/x-dvi entity, and if that does not exist, send the text/plain entity.&#8221;

Media ranges can be overridden by more specific media ranges or specific media types. If more than one media range applies to a given type, the most specific reference has precedence. For example, `Accept: text/*, text/html, text/html;level=1, */*` have the following precedence:

  1. `text/html;level=1`
  2. `text/html`
  3. `text/*`
  4. `*/*`

The media type quality factor associated with a given type is determined by finding the media range with the highest precedence which matches that type. For example,

<div>
  <pre id="ptb45">Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1,
text/html;level=2;q=0.4, */*;q=0.5</pre>
</div>

would cause the following values to be associated:

<div>
  <pre id="ptb46">text/html;level=1         = 1
text/html                 = 0.7
text/plain                = 0.3
image/jpeg                = 0.5
text/html;level=2         = 0.4
text/html;level=3         = 0.7</pre>
</div>

Note: A user agent might be provided with a default set of quality values for certain media ranges. However, unless the user agent is a closed system which cannot interact with other rendering agents, this default set ought to be configurable by the user.

### Accept-Charset ^

The Accept-Charset request-header field can be used to indicate what character sets are acceptable for the response. This field allows clients capable of understanding more comprehensive or special- purpose character sets to signal that capability to a server which is capable of representing documents in those character sets. `Accept-Charset = "Accept-Charset" ":" 1#( ( charset | "*" )[ ";" "q" "=" qvalue ] )` Character set values are described in section 3.4. Each charset MAY be given an associated quality value which represents the user&#8217;s preference for that charset. The default value is q=1. An example is `Accept-Charset: iso-8859-5, unicode-1-1;q=0.8` The special value &#8220;\*&#8221;, if present in the Accept-Charset field, matches every character set (including ISO-8859-1) which is not mentioned elsewhere in the Accept-Charset field. If no &#8220;\*&#8221; is present in an Accept-Charset field, then all character sets not explicitly mentioned get a quality value of 0, except for ISO-8859-1, which gets a quality value of 1 if not explicitly mentioned.If no Accept-Charset header is present, the default is that any character set is acceptable. If an Accept-Charset header is present, and if the server cannot send a response which is acceptable according to the Accept-Charset header, then the server SHOULD send an error response with the 406 (not acceptable) status code, though the sending of an unacceptable response is also allowed.

### Accept-Encoding ^

The Accept-Encoding request-header field is similar to Accept, but restricts the content-codings (section 3.5) that are acceptable in the response.

<div>
  <pre id="ptb47">Accept-Encoding  = "Accept-Encoding" ":" 1#( codings [ ";" "q" "=" qvalue ] )
codings          = ( content-coding | "*" )</pre>
</div>

Examples of its use are:

<div>
  <pre id="ptb48">Accept-Encoding: compress, gzip
Accept-Encoding:
Accept-Encoding: *
Accept-Encoding: compress;q=0.5, gzip;q=1.0
Accept-Encoding: gzip;q=1.0, identity; q=0.5, *;q=0</pre>
</div>

A server tests whether a content-coding is acceptable, according to an Accept-Encoding field, using these rules:

  1. If the content-coding is one of the content-codings listed in the Accept-Encoding field, then it is acceptable, unless it is accompanied by a qvalue of 0. (As defined in section 3.9, a qvalue of 0 means &#8220;not acceptable.&#8221;)
  2. The special &#8220;*&#8221; symbol in an Accept-Encoding field matches any available content-coding not explicitly listed in the header field.
  3. If multiple content-codings are acceptable, then the acceptable content-coding with the highest non-zero qvalue is preferred.
  4. The &#8220;identity&#8221; content-coding is always acceptable, unless specifically refused because the Accept-Encoding field includes &#8220;identity;q=0&#8221;, or because the field includes &#8220;*;q=0&#8221; and does not explicitly include the &#8220;identity&#8221; content-coding. If the Accept-Encoding field-value is empty, then only the &#8220;identity&#8221; encoding is acceptable.

If an Accept-Encoding field is present in a request, and if the server cannot send a response which is acceptable according to the Accept-Encoding header, then the server SHOULD send an error response with the 406 (Not Acceptable) status code.If no Accept-Encoding field is present in a request, the server MAY assume that the client will accept any content coding. In this case, if &#8220;identity&#8221; is one of the available content-codings, then the server SHOULD use the &#8220;identity&#8221; content-coding, unless it has additional information that a different content-coding is meaningful to the client.Note: If the request does not include an Accept-Encoding field, and if the &#8220;identity&#8221; content-coding is unavailable, then content-codings commonly understood by HTTP/1.0 clients (i.e., &#8220;gzip&#8221; and &#8220;compress&#8221;) are preferred; some older clients improperly display messages sent with other content-codings. The server might also make this decision based on information about the particular user-agent or client.Note: Most HTTP/1.0 applications do not recognize or obey qvalues associated with content-codings. This means that qvalues will not work and are not permitted with x-gzip or x-compress.

### Accept-Language ^

The Accept-Language request-header field is similar to Accept, but restricts the set of natural languages that are preferred as a response to the request.

<div>
  <pre id="ptb49">Accept-Language = "Accept-Language" ":"
1#( language-range [ ";" "q" "=" qvalue ] )
language-range  = ( ( 1*8ALPHA *( "-" 1*8ALPHA ) ) | "*" )</pre>
</div>

Each language-range MAY be given an associated quality value which represents an estimate of the user&#8217;s preference for the languages specified by that range. The quality value defaults to &#8220;q=1&#8221;. For example, `Accept-Language: da, en-gb;q=0.8, en;q=0.7` would mean: &#8220;I prefer Danish, but will accept British English and other types of English.&#8221; A language-range matches a language-tag if it exactly equals the tag, or if it exactly equals a prefix of the tag such that the first tag character following the prefix is &#8220;-&#8220;. The special range &#8220;*&#8221;, if present in the Accept-Language field, matches every tag not matched by any other range present in the Accept-Language field.Note: This use of a prefix matching rule does not imply that language tags are assigned to languages in such a way that it is always true that if a user understands a language with a certain tag, then this user will also understand all languages with tags for which this tag is a prefix. The prefix rule simply allows the use of prefix tags if this is the case.The language quality factor assigned to a language-tag by the Accept-Language field is the quality value of the longest language- range in the field that matches the language-tag. If no language- range in the field matches the tag, the language quality factor assigned is 0. If no Accept-Language header is present in the request, the server SHOULD assume that all languages are equally acceptable. If an Accept-Language header is present, then all languages which are assigned a quality factor greater than 0 are acceptable.It might be contrary to the privacy expectations of the user to send an Accept-Language header with the complete linguistic preferences of the user in every request. For a discussion of this issue, see section 15.1.4.As intelligibility is highly dependent on the individual user, it is recommended that client applications make the choice of linguistic preference available to the user. If the choice is not made available, then the Accept-Language header field MUST NOT be given in the request.Note: When making the choice of linguistic preference available to the user, we remind implementors of the fact that users are not familiar with the details of language matching as described above, and should provide appropriate guidance. As an example, users might assume that on selecting &#8220;en-gb&#8221;, they will be served any kind of English document if British English is not available. A user agent might suggest in such a case to add &#8220;en&#8221; to get the best matching behavior.

### Accept-Ranges ^

The Accept-Ranges response-header field allows the server to indicate its acceptance of range requests for a resource:

<div>
  <pre id="ptb50">Accept-Ranges     = "Accept-Ranges" ":" acceptable-ranges
acceptable-ranges = 1#range-unit | "none"</pre>
</div>

Origin servers that accept byte-range requests MAY send `Accept-Ranges: bytes` but are not required to do so. Clients MAY generate byte-range requests without having received this header for the resource involved. Range units are defined in section 3.12.Servers that do not accept any kind of range request for a resource MAY send `Accept-Ranges: none` to advise the client not to attempt a range request.

### Age ^

The Age response-header field conveys the sender&#8217;s estimate of the amount of time since the response (or its revalidation) was generated at the origin server. A cached response is &#8220;fresh&#8221; if its age does not exceed its freshness lifetime. Age values are calculated as specified in section 13.2.3. `Age = "Age" ":" age-value` `age-value = delta-seconds` Age values are non-negative decimal integers, representing time in seconds.If a cache receives a value larger than the largest positive integer it can represent, or if any of its age calculations overflows, it MUST transmit an Age header with a value of 2147483648 (2^31). An HTTP/1.1 server that includes a cache MUST include an Age header field in every response generated from its own cache. Caches SHOULD use an arithmetic type of at least 31 bits of range.

### Allow ^

The Allow entity-header field lists the set of methods supported by the resource identified by the Request-URI. The purpose of this field is strictly to inform the recipient of valid methods associated with the resource. An Allow header field MUST be present in a 405 (Method Not Allowed) response. `Allow = "Allow" ":" #Method` Example of use: `Allow: GET, HEAD, PUT` This field cannot prevent a client from trying other methods. However, the indications given by the Allow header field value SHOULD be followed. The actual set of allowed methods is defined by the origin server at the time of each request.The Allow header field MAY be provided with a PUT request to recommend the methods to be supported by the new or modified resource. The server is not required to support these methods and SHOULD include an Allow header in the response giving the actual supported methods. A proxy MUST NOT modify the Allow header field even if it does not understand all the methods specified, since the user agent might have other means of communicating with the origin server.

### Authorization ^

A user agent that wishes to authenticate itself with a server&#8211; usually, but not necessarily, after receiving a 401 response&#8211;does so by including an Authorization request-header field with the request. The Authorization field value consists of credentials containing the authentication information of the user agent for the realm of the resource being requested. `Authorization = "Authorization" ":" credentials` HTTP access authentication is described in &#8220;HTTP Authentication: Basic and Digest Access Authentication&#8221; [43]. If a request is authenticated and a realm specified, the same credentials SHOULD be valid for all other requests within this realm (assuming that the authentication scheme itself does not require otherwise, such as credentials that vary according to a challenge value or using synchronized clocks).When a shared cache receives a request containing an Authorization field, it MUST NOT return the corresponding response as a reply to any other request, unless one of the following specific exceptions holds:

  1. If the response includes the &#8220;s-maxage&#8221; cache-control directive, the cache MAY use that response in replying to a subsequent request. But (if the specified maximum age has passed) a proxy cache MUST first revalidate it with the origin server, using the request-headers from the new request to allow the origin server to authenticate the new request. (This is the defined behavior for s-maxage.) If the response includes &#8220;s- maxage=0&#8221;, the proxy MUST always revalidate it before re-using it.
  2. If the response includes the &#8220;must-revalidate&#8221; cache-control directive, the cache MAY use that response in replying to a subsequent request. But if the response is stale, all caches MUST first revalidate it with the origin server, using the request-headers from the new request to allow the origin server to authenticate the new request.
  3. If the response includes the &#8220;public&#8221; cache-control directive, it MAY be returned in reply to any subsequent request.

#### Tutorials:  ^

  * HTTP 1.1 Specification
  * Network Appliance Caching Tutorial for Web Authors and Webmasters
  * Brian D. Davison&#8217;s Web Caching and Content Delivery Resources
  * Caching Tutorial for Web Authors and Webmasters

#### Tools: ^

  * HTTP Header Analysis
  * Cacheability Query

2. Prefetching

  * Mozilla Link Prefetching FAQ
  * Test whether your browser is prefetching link

### Order while loading modules ^

When adding this module dynamically you have to keep in mind that mod_gzip should be specified as last one of several LoadModule directives to be used.

This is because Apache will internally build a stack from the LoadModule directives and later evaluate it in reverse order.

mod\_gzip hooks itself into the type\_checker routine of Apache; but only the first of all modules declaring itself as responsible for handling of a request (e. g. ColdFusion and SSL will try to) will really be activated by Apache. So mod\_gzip has to be activated before those modules whose output it wants to redirect into itself and then postprocess &#8211; as long as these modules try to use the same type\_checker interface &#8230; if they don&#8217;t, then it may work independently from this order of directives.

During Apache&#8217;s start message (which can be found e. g. inside the Apache error log) modules having individual version specifications may be listed exactly in the order they appear inside the module chain; there mod_gzip has to be listed before other modules whose output it is intended to compress.

## Caching mod_gzip compressed data using proxy servers ^

### Compression via negotiation ^

Using a configurable compression function like mod_gzip ultimately must always be some kind of content negotiation, i. e. serving different content conditionally for the same requested URL, depending on specific information inside the HTTP headers.On the other hand, HTTP allows the temporary storage of responses to HTTP requests in caches, especially when using proxy servers. If now

  1. a HTTP client sends a request
  2. the corresponding response is served in compressed form and stored by some proxy and
  3. subsequently another HTTP client submits a request for the URL in question

then the proxy server &#8211; not in possession of further information &#8211; has a problem:

  * Is it entitled to serve the cached content to this second HTTP client as well, or
  * must it forward the request to the HTTP server?

For only the HTTP server can ultimately find out (based upon its configuration containing the corresponding filter rules) whether the second HTTP client may receive compressed response data as well.By the way this is not an effect of using a compression procedure alone but a general problem about caching HTTP data whose content cannot be specified unambiguously by an URL inside a proxy server&#8217;s cache or similar memory equipped servers within the transport route. This includes negotiation procedures of any types as well as submitting additional informations in the HTTP headers, like Authentfication data or Cookies.Performance requirementsOf course one can try to avoid the problem by explicitly denying to cache the corresponding response&#8217;s data (by using the corresponding HTTP headers Expires: and Pragma: in HTTP/1.0 and Cache-Control: in HTTP/1.1) to all proxy servers existing on the way between client and server .But the goal of compression is to speed up the data transfer (by reducing the data volume) &#8211; and caching data serves the same goal (by reducing accesses to the HTTP server). And one performance optimization should not lead to another one being no longer usable especially as these two don&#8217;t replace each other but can effectively complement each other in the case in question.Information about negotiation parametersThe HTTP specification contains the definition of the Vary HTTP header where the HTTP server can inform the proxy server about

  * whether the response was the unique result of an URL request or
  * whether other attributes of a request for the same URL could lead to different results.

Its value may contain a list of names of other HTTP headers whose content has been relevant for serving this very response for a request. Thus the HTTP server can even inform the proxy server about which HTTP headers have influenced the decision about the served content.When a proxy server forwards a request to a HTTP server and wants to store the response inside its cache later then it should still be in possession of the HTTP headers of original request when the HTTP server&#8217;s response arrives.Now if the HTTP server marks a conditional content of a response by the corresponding **Vary header** then

  * the proxy server must store inside its cache not only this response&#8217;s content but all the relevant HTTP headers information (whose names were enumerated in the Vary HTTP header&#8217;s value list of the response) from the request as well, and
  * it must not serve this cached content as response to further requests unless the information of the corresponding HTTP headers of such a subsequent request at least &#8216;matches&#8217; those of the original request, i. e. is semantically identical to the original request&#8217;s values for each one of these headers.

### Resulting restrictions for the HTTP server ^

The previous explanations have shown how a proxy server can handle the conditional delivery of HTTP responses (being the result of a Content Negotiation) correctly and with maximum utilization of its caching effect at the same time &#8211; assumed that

  * the HTTP server provides the proxy server with sufficient information about the negotiation parameters and
  * the proxy server is in possession of the corresponding information in case of a subsequent request to the same URL by another HTTP client.

But the latter one now means a restriction for the degrees of freedom for the negotiation process. For if the proxy server must decide about whether it may serve its cache content or not exclusively based upon information within a HTTP request then the negotiation rules of the HTTP servers must not refer to anything other than HTTP header contents!But unfortunately this precondition is not fulfilled by mod_gzip, as of the six classes of filter rules provided

  * two &#8216;legal&#8217; ones (reqheader and uri) exclusively refer to HTTP header contents but
  * four other &#8216;illegal&#8217; ones (rspheader, handler, file and mime) refer to information that will be available only during evaluation of the request by the HTTP server.

So if a mod\_gzip enhanced server uses one of these &#8216;illegal&#8217; filter rules then the proxy server cannot any longer be able to correctly decide about the applicability of its cache content for responding to further requests.In doing so it doesn&#8217;t help the proxy server a lot either if mod\_gzip would notify the proxy server about being evidently overtaxed (by supplying a complete list of the filter rule classes significant for this request within some Vary: header if that would even be legal). All the proxy server could do is using the occurrence of one of these four &#8216;illegal&#8217; filter rule classes as criterion for not caching the response&#8217;s content.This alone would not be that bad &#8211; as long as the HTTP server limits itself to use nothing but &#8216;legal&#8217; rules it would be able to cooperate optimally with a proxy server.But unfortunately doing so is impossible with mod\_gzip 1.3.19.1a.The embedding of mod\_gzip 1.3.19.1a into the Apache 1.3 architecture is done in a relatively complex way: \* In processing phase 1 processing mod\_gzip checks whether it should be interested at all in handling this request&#8217;s results and prepare for it &#8211; based upon the rules of four classes (reqheader, uri, file und handler, i. e. two &#8216;legal&#8217; und two &#8216;illegal&#8217; rule classes) \* In processing phase 2 mod\_gzip checks whether it now should actually compress the (now available) response content &#8211; based upon the rules of two classes (rspheader und mime, both &#8216;illegal&#8217; rule classes).For the successful permission of a request for compression at least the fulfillment of one include rule from either of both phases is required (and the non-fulfillment of all exclude rules).But as both include rule classes from phase 2 are &#8216;illegal&#8217; each list of relevant filter rule classes for a successful compression in the current mod\_gzip implementation must at least cover one &#8216;illegal&#8217; rule class.Thus it is impossible to provide a proxy server with information it can use for deciding about the applicability of some cache content &#8211; the submitted information will always overdo the comprehension of the proxy server.Vary headers in mod\_gzip 1.3.19.2a and upStarting with version 1.3.19.2a, mod\_gzip is sending Vary: headers &#8211; for each and every request where the module has been involved at least once (regardless whether compressed data have been served or not).At this state of research for mod\_gzip each request (regardless whether or not the response has actually been served in compressed form) is potentially a negotiation: \* at least about the Accept-Encoding HTTP header, and \* possibly about other HTTP headers as well (namely all those that occur within filter rules of the reqheader class)As of now, mod\_gzip is not yet able to generate the best possible, i. e. the minimum set of Vary: headers required &#8211; for this it would be necessary to rewrite the rule evaluation procedure of mod\_gzip completely.As a first step the module since Version 1.3.19.2a sends a Vary: header that contains \* the value Accept-Encoding as well as \* the names of every header being used within any reqheader rules,because each one of these rules might make the difference for the result of the negotiation, and in each of these cases the result would depend on the values of the received HTTP headers. In certain cases this may be way too much (and then massively hinder the efficient caching of content), but at least is it something to begin with.As an improvement to this strategy, mod\_gzip 1.3.26.1a is sending no Vary: header if the compression of the request in question has been declined because of a mod\_gzip\_item\_exclude rule of the \* file, \* uri rsp. * handlertype &#8211; as the evaluation of this rule cannot have been dependent on the received HTTP headers, and therefore in these cases actually no negotiation (about dimensions that might contain different values for different HTTP requests) has taken place at all.If you want to have no Vary: headers being sent for files that you are sure to never be served in compressed form because of other configuration rules, you would have to turn off mod_gzip being these.An example for not sending Vary: headers for GIF images that might be cache by some proxy like Squid 2.4 might look like this:`<filesMatch .gif$> mod_gzip_on No </FilesMatch>`For versions to come the following tasks remain open: \* Recognizing in all possible cases that the reaction to the current request can never cause compressed data to be served because some mod\_gzip\_item\_exclude rule independent from the request&#8217;s attributes is firing. \* Recognizing that some negotiation has taken place that cannot be described by a list of HTTP header names &#8211; in this case Vary: \* ought to be sent (and the documentation for mod\_gzip should explicitly point out that these directives be used only if absolutely required as using them will have a negative effect on the work of caching proxies). \* Doublechecking whether constellations are possible where only some subset of header names from all reqheader rules are required in a Vary: header &#8211; the fewer names there, the fewer variants have to be stored in the proxy cache in parallel.Negotiation about other dimensions than HTTP headers

In very special cases, i. e. when using certain configurations directives, some negotiation is done by mod_gzip about dimensions that cannot even be expressed in terms of HTTP header names. This applies to the directives

\* mod\_gzip\_min\_http (minimum HTTP version required) as well as \* mod\_gzip\_handle\_methods (HTTP methods to be handled)

In both cases mod_gzip cannot explain to a proxy what has been done by telling the names of HTTP headers. The appropriate reaction according to the arrowHTTP/1.1 specification is sending the Vary: * HTTP header.

mod\_gzip 1.3.26.1a is sending a Vary: * header if the mod\_gzip\_min\_http directive has been used.

As for the mod\_gzip\_handle_methods directive, it currently seems to be not yet absolutely clear whether two HTTP requests for the same URI but using different HTTP-methods actually ask for the same HTTP entity &#8211; this will decide whether a Vary: * header will have to be sent when using this directive as well, and be an issue to be solved in forthcoming releases.

But as in this case a proxy server cannot understand the type of negotiation performed it isn&#8217;t entitled to store responses bearing this mark inside some cache.

Thus using one of these directives completely disables the proxy caching of each and every response being send by this HTTP server, whether in compressed or in uncompressed form. Therefore we advise you not to use one of these directives any more.The UserAgent as special case

Storing variants of different negotiation parameters in parallel in a proxy cache may be reasonable if only a few possible values may actually occur &#8211; such like in the case of Content-Encoding. If there are a large number of possible values then a parallel storing of variants is no longer feasible.

Exactly this does apply to the UserAgent name as identification of the HTTP client. Each sub-version of a browser is sending a complex UserAgent string that contains not only name and version of the browsers but further information (national language, operating system name and version etc.). There are hundreds of known UserAgent strings &#8211; and beyond this a number of mechanisms to manipulate this UserAgent string. Some browsers (like Opera) even allow the user to explicitly select the content of this UserAgent strings as to pose as a different browser (because many technically incompetent web page creators build their site based on the name of a browser and unnecessarily exclude some browsers from it, or just because their user doesn&#8217;t want to unnecessarily show details about the computer equipment they use, for the sake of keeping his/her privacy).

How reasonable serving compressed web pages conditionally on the identity of a HTTP client may ever be in some cases (like in respect to the numerous bugs of Netscape 4) still the downside of using the UserAgent strings as base of a HTTP negotiation will be that the content of this HTTP header on one hand is too varying to draw reliable conclusions out of it and on the other hand contains too many different values for any caching proxy to ever be able to keep in parallel the results of requests for the same URL for all these negotiation variants.

From version 1.3.19.2a on mod_gzip is sending a Vary: header describing the HTTP header User-Agent: as parameter of the negotiation, if a corresponding directive has been used in the configuration. But the probability for a successive request to contain an exactly identical User-Agent: value (so that this client may therefore receive the already stored content) is very low.

Actually, the HTTP server would treat even large sets of UserAgents (that are assumed to be functionally equivalent due to its configuration) identically during negotiation &#8211; but the Vary: header doesn&#8217;t allow the HTTP server to tell the caching proxy which parts of the UserAgent strings were evaluated by the HTTP server as significant content during negotiation. The proxy server can only get to know that the UserAgent has played some role &#8211; and being aware of this, the proxy must treat individual UserAgents as being different even if the HTTP server would not act like this.

So using filter rules evaluating the UserAgent HTTP header will lead to totally disabling any caching for response packets created this way. The user of mod_gzip should be absolutely aware of this effect &#8211; and therefore use other filter methods (having a smaller number of possible different values) if at all possible, to provide the same type of differentiation between these HTTP Clients.

* * *

### RSS and 301/304 conditional ^

## An example configuration for mod_gzip ^

The exact amount of the requested functions is to be described by additional Apache configuration directives which become available by the mod_gzip module integration.

A really complete documentation of the effect of these directives isn&#8217;t available at the moment; in general assume that

  * about everything can be used in every environment, i.e. 
      * in the complete server scope,
      * in separate virtual hosts,
      * in directories or even
      * in .htaccess files
  * basically the standard overwriting procedures of Apache apply &#8211; except for the directives to specify the selection of contents to be compressed, where things become a bit more complicated.

The configuration described below really isn&#8217;t meant for blindly copying into your own configuration &#8211; its intention rather is to give you a feeling about how many options are provided. And there are lots of options &#8211; at least if you &#8216;just want to get compressed output data&#8217; &#8230;loading responsibilitiesprecompressed bureaucracy data management file sizesrequirements filters transfer encoding loggingproxies

<div>
  <pre id="ptb51">#######################################
### Apache configuration directives ###
###   for mod_gzip 1.3.26.1a        ###
#######################################

##########################
### loading the module ###
##########################

# ---------------------------------------------------------------------
# load DLL / Win32:
# LoadModule gzip_module modules/ApacheModuleGzip.dll
#
# load DSO / UNIX:
# LoadModule gzip_module modules/mod_gzip.so
#
# (none of both if module has been compiled in statically;

#  the exact file name may depend upon the exact compilation method used
#  for this module)

# ---------------------------------------------------------------------

  &lt;ifModule mod_gzip.c&gt;

########################
### responsibilities ###
########################

# ---------------------------------------------------------------------
# use mod_gzip at all?
  mod_gzip_on                   Yes
# (you can especially enable mod_gzip inside the central server
#  configuration but disable it inside some directories ot virtual
#  hosts by using this directive.)
# ---------------------------------------------------------------------

######################################
### statically precompressed files ###
######################################

# ---------------------------------------------------------------------
# let mod_gzip perform 'partial content negotiation'?
  mod_gzip_can_negotiate        Yes
# (if this option is active and a static file is to be served in com-
#  pressed for, then mod_gzip will look for a static precompressed
#  version of this file with a defined additional extension - see next
#  directive - which would be delivered with priority. This would allow
#  for avoiding to repeatedly compress the same static file and thus
#  saving CPU time.
#  No dynamic caching of this file is provided; currently the user
#  himself is responsible for creating and updating the precompressed
#  file's content.

#  From version 1.3.19.2a mod_gzip automatically recognizes whether
#  a statically precompressed file is older than its uncompressed
#  original and in this case will serve the content of the original
#  file in uncompressed form - as to rather serve correct data than
#  outdated ones ...)

# ---------------------------------------------------------------------

# extension (suffix) for statically precompressed files
  mod_gzip_static_suffix        .gz
  AddEncoding              gzip .gz
# (effect: see previous directive; this string will be appended to the
#  name of the original file.
#  be sure to configure the encoding 'gzip' for this extension as well,
#  because mod_gzip doesn't serve the content itself but simply generates
#  an Apache internal redirection to this URL. Therefore the remaining
#  Apache configuration is responsible for setting the 'Content-Encoding'
#  header properly ...
#  prior to version 1.3.19.2a this value was not configurable.)

# ---------------------------------------------------------------------

# automatic updates for statically precompressed files
  mod_gzip_update_static        No
# (if set to 'Yes', this directive (being new in version 1.3.26.1a) would
# cause mod_gzip to automatically update an outdated version of any
# statically precompressed file during the request, i. e. compress the
# originally requested file and overwrite the precompressed variant
# file with it!
# for each automatic update of this type, mod_gzip will write a message
# of the severity 'notice' into the Apache error_log.
# while doing so, mod_gzip will directly read the original file's content.
# therefore this content cannot be interpreted by any other Apache module
# during the request. this might possibly not be what you want - hopefully
# it will be what most users want, because it works fast this way.
# use this configuration with a lot of care, and be sure that you don't
# inadvertantly cause valuable files within the URL tree to be overwritten.
# this isn't a feature to be used for mass hosting servers, especially
# because mod_gzip might experience access control problems there - the
# userid the Apache processes are running under need to have write access
# to the precompressed files of all users, which may not automatically be
# the case.)
# [mod_gzip error handling in this situation??? what will be served?]

# ---------------------------------------------------------------------

###################
### bureaucracy ###
###################

# ---------------------------------------------------------------------
# display status for mod_gzip
  mod_gzip_command_version      '/mod_gzip_status'
# (defines an URL to display the status of mod_gzip; can be specified
# individually for each installation and protected against access via
# &lt;location&gt; section for privacy reasons)
# ---------------------------------------------------------------------
# The status display will look like this:
#       mod_gzip is available...
#       mod_gzip_version = 1.3.26.1a
#       mod_gzip_on = Yes/No
# and thus will provide information about
# - mod_gzip being installed at the server and working correctly,
# - which version has been installed and
# - whether mod_gzip has been set 'active' for this Location
#   (-&gt; mod_gzip_on)
# ---------------------------------------------------------------------

#######################
### data management ###
#######################

# ---------------------------------------------------------------------
# Working directory for temporary files and the compression cache
# if not specified, the following default values are used:
# [Win32=c:temp], [UNIX=/tmp]
# mod_gzip_temp_dir             /tmp
# (This directory must already exist and the userid being used for
#  running the Apache server must have read and write access to this
#  directory.
#  Unlike other Apache directives an absolute path name must be specified
#  here; a relative value will not be interpreted relatively to ServerRoot.
#  This pastname must NOT be terminated with '/'.
#  For maximum performance this directory should be located on a RAM disk,
#  if the file system isn't already being cached efficiently
# ---------------------------------------------------------------------
# Save temporary work files [Yes, No]
  mod_gzip_keep_workfiles       No
# (one file per HTTP request - set to 'yes' for debugging purpose only!)
# ---------------------------------------------------------------------

##################
### file sizes ###
##################

# ---------------------------------------------------------------------
# minimum size (in bytes) for files to be compressed
  mod_gzip_minimum_file_size    500
# (for very small files compression will produce only small absolute gains
#  [you will still save about 50% of the content, but some additional
#  500 bytes of HTTP and TCP headers will always remain uncompressed],
#  but still produce CPU load for both client and server.
#  mod_gzip will automatically set smaller values than 300 bytes for
#  this directive to exactly this value 300.)
# ---------------------------------------------------------------------
# maximum size (in bytes) for files to be compressed
  mod_gzip_maximum_file_size    500000
# (for very large files compression may eventually take rather long and
#  thus delay the start of the transmission.
#  Furthermode a limitation at this point prevents the server from
#  producing output of unlimited size in case of some endless loop
#  inside a CGI script - or even trying to compress streaming data -
#  which might otherwise cause the creation of a temporary file of
#  any size and even fill up the whole hard disk.
#  On the other hand, compression will have a much more perceivable
#  subjective effect for large files ... so be sure to fine-tune this
#  according to your requirements.)
# ---------------------------------------------------------------------
# maximum size (in bytes) for files to be compressed in memory
  mod_gzip_maximum_inmem_size   60000
# (larger files will be compressed into the temp file directory; adapt
#  this value to your server's available main memory.
#  In mod_gzip 1.3.19.x larger values will automatically be limited to
#  60000 because some operating systems are said to have problems
#  allocating more than 64 kb of memory at a time.
# ---------------------------------------------------------------------

####################
### requirements ###
####################

# (see chapter about caching for problems when using these directives.)
# ---------------------------------------------------------------------
# Required HTTP version of the client
# Possible values: 1000 = HTTP/1.0, 1001 = HTTP/1.1, ...
# This directive uses the same numeric protocol values as Apache does
# internally
  mod_gzip_min_http             1000
# (By using this directive you may exclude old browsers, search engines
#  etc. from the compression procedure: if the user agent doesn't
#  declare itself capable of understanding at least the HTTP level
#  specified here, only uncompressed data will be delivered - no matter
#  what else it claims to be able to. The value of '1001' will especially
#  exclude Netscape 4.x. and a lot of proxy servers.)
# ---------------------------------------------------------------------

# HTTP methods to be handled
# Possible values: 'GET', 'POST' or a list of both values.
  mod_gzip_handle_methods        GET POST
# (By using this directive you may particularly exclude POST requests
#  from the compression procedure. There are known cases where the
#  handling of these requests by previous mod_gzip versions could cause
#  problems.
#  Before version 1.3.19.2a this value was not configurable.)

# ---------------------------------------------------------------------

###############
### filters ###
###############

# ---------------------------------------------------------------------
# which files are to be compressed?
#
# The order of processing during each of both phases is not important,
# but to trigger the compression of a request's content this request
# a) must match at least one include rule in each of both phases and
# b) must not match an exclude rule in any of both phases.
# These rules are not minimal, they are meant to serve as example only.
#

# Note that all parameter values of the directives in this section are
# evaluated as regular expressions, and not in a case-sensitive way.

# ---------------------------------------------------------------------
# phase 1: (reqheader, uri, file, handler)
# ========================================
# NO:   special broken browsers which request for gzipped content
#       but then aren't able to handle it correctly
  mod_gzip_item_exclude         reqheader  "User-agent: Mozilla/4.0[678]"

# From version 1.3.19.2a on I advise against using filters
# for User-agents, as this will cause HTTP-Headers 'Vary: User-Agent'
# to be generated, thus making life more difficult for proxy servers.

#
# JA:   HTML-Dokumente
  mod_gzip_item_include         file       .html$
#
# NO:   include files / JavaScript & CSS (due to Netscape4 bugs)
  mod_gzip_item_exclude         file       .js$
  mod_gzip_item_exclude         file       .css$
#
# YES:  CGI scripts
  mod_gzip_item_include         file       .pl$
  mod_gzip_item_include         handler    ^cgi-script$
#
# phase 2: (mime, rspheader)
# ===========================
# YES:  normal HTML files, normal text files, Apache directory listings
  mod_gzip_item_include         mime       ^text/html$
  mod_gzip_item_include         mime       ^text/plain$
  mod_gzip_item_include         mime       ^httpd/unix-directory$
#
# NO:   images (GIF etc., will rarely ever save anything)
  mod_gzip_item_exclude         mime       ^image/
# ---------------------------------------------------------------------
# In fact mod_gzip is checking only the first 4 characters of the 1st
# operand (in case of uri even the first 2 characters only, as to
# allow for values like url).
# ---------------------------------------------------------------------
# The table for mod_gzip_item rules (include and exclude) cannot contain
# more than 256 entries; when this number is exceeded mod_gzip will
# output the message "mod_gzip: ERROR: Item index is full"
# and report a configuration error to the Apache server.
# ---------------------------------------------------------------------
# The directive values described here are meant to describe the requests
# elected for compression most exactly.
# Especially for the mime rules it has to be made clear that the HTTP
# header 'Content-Type' (that will be checked by mod_gzip for this rule)
# in some cases may contain not only a MIME type but additionally a
# character set description (charset) as well.
# If this is the case for the requests to be handled then you need to
# remove the '$' char at the end of the corresponding value so that now
# only the prefix of this value will be tested for matching.
# ---------------------------------------------------------------------

##########################
### transfer encodings ###
##########################

# ---------------------------------------------------------------------
# Allow mod_gzip to eliminate the HTTP header
#    'Transfer-encoding: chunked'
# and join the chunks to one (compressable) packet
  mod_gzip_dechunk              Yes
# (this is required for handling several types of dynamically generated
# contents, especially for CGI and SSI pages, but also for pages produced
# by some Java Servlet interpreters.
# ---------------------------------------------------------------------

###############
### logging ###
###############

# ---------------------------------------------------------------------
# Extended log format (for testing the compression effect)
  LogFormat                     "%h %l %u %t "%V %r" %&lt;s %b mod_gzip: %{mod_gzip_result}n In:%{mod_gzip_input_size}n -&lt; Out:%{mod_gzip_output_size}n = %{mod_gzip_compression_ratio}n pct." common_with_mod_gzip_info2
# ---------------------------------------------------------------------
# Create additional log file
  CustomLog                     logs/mod_gzip.log common_with_mod_gzip_info2
# (surely you can redefine your normal log file format, but you mal well
#  keep its format standard compatible for evaluation by standard web
#  analysis tools. So we just create another log file.)
# ---------------------------------------------------------------------
# Volume computation of the delivered files inside the Apache access_log:
# count HTTP header size (in bytes) as part of total output size
  mod_gzip_add_header_count     Yes
# (This will be more than the pure document content, but it will more
#  realistically describe the total output traffic of the HTTP request)
# ---------------------------------------------------------------------

###############
### proxies ###
###############

# ---------------------------------------------------------------------
# sending a 'Vary' HTTP header
  mod_gzip_send_vary            On
# (see chapter about caching for this directive.)
#  don't change this unless you absolutely know what you are doing!
# ---------------------------------------------------------------------

  &lt;/ifModule&gt;</pre>
</div>

## Other Speed Tips ^

To truly speed up your site, you will want to implement a server-side caching technique. Or you can read more about caching and web cache.

### Apache Caching Guide ^

This document supplements the `<a href="http://askapache.info/trunk/mod/mod_cache.html" title="Apache mod_cache">mod_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_disk_cache.html" title="Apache mod_disk_cache">mod_disk_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_mem_cache.html" title="Apache mod_mem_cache">mod_mem_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_file_cache.html" title="Apache mod_file_cache">mod_file_cache</a>` and htcacheclean reference documentation.

It describes how to use Apache&#8217;s caching features to accelerate web and proxy serving, while avoiding common problems and misconfigurations.

### Apache Caching Guide ^

This document supplements the `<a href="http://askapache.info/trunk/mod/mod_cache.html" title="Apache mod_cache">mod_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_disk_cache.html" title="Apache mod_disk_cache">mod_disk_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_mem_cache.html" title="Apache mod_mem_cache">mod_mem_cache</a>`, `<a href="http://askapache.info/trunk/mod/mod_file_cache.html" title="Apache mod_file_cache">mod_file_cache</a>` and htcacheclean reference documentation.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/05/browser_cache_image.jpg