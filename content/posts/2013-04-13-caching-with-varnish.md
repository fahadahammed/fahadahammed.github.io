---
title: Caching with Varnish
author: Fahad Ahammed
type: post
date: 2013-04-13T15:52:23+00:00
url: /caching-with-varnish/
categories:
  - Technology
tags:
  - cache website with varnish
  - caching with varnish
  - Cashing with varnish
  - varnish caching
  - Varnish Cashing
  - varnish vcl to cache

---
**Varnish** is an HTTP accelerator designed for content-heavy dynamic web sites. In contrast to other web accelerators, such as Squid, which began life as a client-side cache, or Apache and nginx, which are primarily origin servers, Varnish was designed as an HTTP accelerator. Varnish is focused exclusively on HTTP, unlike other proxy servers that often support FTP, SMTP and other network protocols.

Here , I will explain how to get varnish in front of apache2 or accelerate apache2 with varnish .

<!--more-->

[<img loading="lazy" class="aligncenter size-full wp-image-482" alt="varnish-logo" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/04/varnish-logo.png?resize=500%2C500" width="500" height="500" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/04/varnish-logo.png?w=500&ssl=1 500w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/04/varnish-logo.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/04/varnish-logo.png?resize=300%2C300&ssl=1 300w" sizes="(max-width: 500px) 100vw, 500px" data-recalc-dims="1" />][1]

First do this :

>   * <span style="color: #ff6600;"><code>sudo -s;curl http://repo.varnish-cache.org/debian/GPG-key.txt | sudo apt-key add -</code></span>
> 
>   * <span style="color: #ff6600;"><code>sudo -s;echo "deb http://repo.varnish-cache.org/ubuntu/ precise varnish-3.0" | sudo tee -a /etc/apt/sources.list</code></span>
> 
>   * <span style="color: #ff6600;"><code>sudo apt-get update</code></span>
> 
>   * <span style="color: #ff6600;"><code>sudo apt-get install varnish</code></span>

Each line seperately run from terminal . or just (not recommended) :

> <span style="color: #ff6600;"><code>sudo apt-get install varnish</code></span>

Now do this :

> <span style="color: #ff6600;">nano /etc/default/varnish</span>

And search for :

> <span style="color: #99cc00;">DAEMON OPTS=&#8221;-a *:<i>6081 </i></span>

And edit that as :

> <span style="color: #99cc00;">DAEMON OPTS=&#8221;-a *:<i>80 </i></span>

Also edit default.vcl to something else, I took &#8220;mysite.vcl&#8221; .

To save use &#8216;ctrl+x&#8217; and then &#8216;y&#8217; and &#8216;enter&#8217; .

Now do this :

> <span style="color: #99cc00;">nano /etc/varnish/mysite.vcl</span>

and put below texts there .

<pre><span style="color: #008000;">## Redirect requests to Apache, running on port 8000 on localhost
backend apache {
        .host = "127.0.0.1";
        .port = "8000";
}

## Fetch
sub vcl_fetch {

if (req.url ~ "^/js/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
  }

if (req.url ~ "^/css/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
 }

if (req.url ~ "^/img/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
 }

		## Remove the X-Forwarded-For header if it exists.
        remove req.http.X-Forwarded-For;

		## insert the client IP address as X-Forwarded-For. This is the normal IP address of the user.
        set    req.http.X-Forwarded-For = req.http.rlnclientipaddr;
		## Added security, the "w00tw00t" attacks are pretty annoying so lets block it before it reaches our webserver
        if (req.url ~ "^/w00tw00t") {
                error 403 "Not permitted";
        }
		## Deliver the content
        return(deliver);

}

# create ACL
acl <span style="color: #993300;">fahad</span> {
  "localhost";
  "<span style="color: #800000;">***.***.***.***</span>";
}

sub vcl_recv {

  if (req.url ~ ".(png|gif|jpg)$") {
       remove req.http.Cookie;  }
#  unset req.http.cookie;  

  # protect admin urls from unauthorized ip's
  if (req.url ~ "^/journal/administrator/") {
    if (client.ip ~ <span style="color: #993300;">fahad</span>) {
      return(pass);
    } else {
      error 405 "Not allowed in admin area . You Should talk to the admin .";
    }
  }

}

# called after fetch or lookup yields a hit
sub vcl_deliver {

}

#
sub vcl_error {

}</span></pre>

&nbsp;

You have to edit above file which is red marked . Above YOUR IP is just your ip to not to allow any other to access a particular folder like wordpress /wp-admin/ . And that red marked &#8220;fahad&#8221; , you can change that to anything but both should be same . If you have no static ip than you should use Below texts :

&nbsp;

<pre><span style="color: #008000;">## Redirect requests to Apache, running on port 8000 on localhost
backend apache {
        .host = "127.0.0.1";
        .port = "8000";
}

## Fetch
sub vcl_fetch {

if (req.url ~ "^/js/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
  }

if (req.url ~ "^/css/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
 }

if (req.url ~ "^/img/") {
    # removing cookie
    unset beresp.http.Set-Cookie;
 set beresp.http.cache-control = "max-age = 9999999";
    # Cache for 10 day
    set beresp.ttl = 1w;
    return(deliver);
 }

		## Remove the X-Forwarded-For header if it exists.
        remove req.http.X-Forwarded-For;

		## insert the client IP address as X-Forwarded-For. This is the normal IP address of the user.
        set    req.http.X-Forwarded-For = req.http.rlnclientipaddr;
		## Added security, the "w00tw00t" attacks are pretty annoying so lets block it before it reaches our webserver
        if (req.url ~ "^/w00tw00t") {
                error 403 "Not permitted";
        }
		## Deliver the content
        return(deliver);

}

sub vcl_recv {

  if (req.url ~ ".(png|gif|jpg)$") {
       remove req.http.Cookie;  }
#  unset req.http.cookie;

}

# called after fetch or lookup yields a hit
sub vcl_deliver {

}

#
sub vcl_error {

}</span></pre>

&nbsp;

Save this .

Now do this :

<span style="color: #ff6600;">nano /etc/apache2/ports.conf</span>

Change:

<pre><span style="color: #99cc00;">NameVirtualHost *:80
Listen 80</span></pre>

To:

<pre><span style="color: #99cc00;">NameVirtualHost *:8000
Listen 127.0.0.1:8000</span></pre>

Apache will listen on that port .

You will have to edit your vhosts as well . Do This :

<span style="color: #ff6600;">nano /etc/apache2/sites-enabled/000-default</span>

Change:

<pre><span style="color: #99cc00;">&lt;Virtualhost *:80&gt;
</span></pre>

To:

<pre><span style="color: #99cc00;">&lt;Virtualhost *:8000&gt;</span></pre>

You should know i am using here a command line text editor named nano which have a key binding of &#8220;ctrl+x&#8221; to save a file . Now do this :

<pre><span style="color: #99cc00;">service apache2 restart;service varnish restart</span></pre>

Now test varnish , open terminal again and do this :

<pre>curl -I your_website_address.TLD</pre>

If you see anything written word &#8220;Varnish&#8221; then your procedure is ok and your varnish cache tool is caching 3 folders elements from your websites css,js and img folder . If you get error please tell me .

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2013/04/varnish-logo.png