---
title: Other side of Python eval() function
author: Fahad Ahammed
type: post
date: 2020-10-26T16:49:32+00:00
url: /other-side-of-python-eval-function/
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
tags:
  - eval
  - eval()
  - python
  - python3

---
The built-in function &#8220;eval()&#8221; of python is useful in many cases. But I am gonna talk about it&#8217;s negative one.

Let, you have a function that take arguments from user. If you do eval() on that input, it might create a havoc.

<!--more-->

As an example &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">def check_pin(pin):
    if type(eval(pin)) is int:
        "Do some other stuff"
        return True
    else:
        return False


def process_users_ping(pin):
    return check_pin(pin=pin)

pins = [
    "1234", "500", "__import__('os').system('ls /')"
]

for i in pins:
    print(process_users_ping(pin=i))
</pre>

Running above code where last pin is a string which has function imported and ran a command. This can create a big problem.

<pre class="wp-block-preformatted">"9**987987987987"</pre>

This eval expression can really make your CPU hang in the tree. So, be aware to use eval without properly knowing what it might be evaluating.