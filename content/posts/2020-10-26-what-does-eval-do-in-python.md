---
title: What does eval() do in Python?
author: Fahad Ahammed
type: post
date: 2020-10-26T10:28:10+00:00
url: /what-does-eval-do-in-python/
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
tags:
  - eval
  - eval()
  - programming
  - python
  - python3

---
I have always loved the fact that The Python interpreter has a number of functions and types built into it. I am going to explore &#8220;eval()&#8221; in this article.

<!--more-->

Syntax: `eval(<em>expression</em>[, <em>globals</em>[, <em>locals</em>]])`  
or  
`eval(expr, globals=None, locals=None)`

So, mainly eval need string as its argument in expression.<figure class="wp-block-table">

<table>
  <tr>
    <td>
      <code>globals</code>&nbsp;(optional)
    </td>
    
    <td>
      Global namespace to use while executing the source. It must be a dictionary. If not provided then the current global namespace will be used.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>locals</code>&nbsp;(optional)
    </td>
    
    <td>
      Local namespace to use while executing the source. It can be any mapping. If omitted, it defaults to&nbsp;<code>globals</code>&nbsp;dictionary.
    </td>
  </tr>
</table></figure> 

You can check globals and locals by `global()` and `locals().`

### Example

<pre class="wp-block-code"><code>def display(users_name):
    return "Hello " + users_name + " !"

names = &#91;
    "Fahad Ahammed", "Guido Van Rossum"
]

for i in names:
    print(eval(f'display("{i}")'))</code></pre>

The output will be &#8211;

<pre class="wp-block-code"><code>Hello Fahad Ahammed !
Hello Guido Van Rossum !</code></pre>

Isn&#8217;t it cool? 🙂