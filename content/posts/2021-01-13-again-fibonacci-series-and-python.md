---
title: Again Fibonacci Series and Python
author: Fahad Ahammed
type: post
date: 2021-01-13T17:44:23+00:00
url: /again-fibonacci-series-and-python/
featured_image: 'https://images.unsplash.com/photo-1577497381866-8b07193a9a3c?ixid=MXwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=825&h=510'
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Study
tags:
  - fibonacci series in python
  - golden ratio
  - lru_cache in fibonacci
  - Memoization
  - recursion in python

---
I have already wrote a piece about generating Fibonacci series in **BASH**, here in my blog. But today I am gonna do some practice stuff with **Python**.

We all I guess know about **Fibonacci**. It is connected to nature through the golden ratio and the spirals. It is a very interesting series to learn or research deeply. However, I came to know that there is a day declared as &#8220;**Fibonacci Day**&#8221; which is every 23rd, November. But why?

<!--more-->

Because, **-11-23** is a part of the Fibonacci series. How? The algorithm is &#8211;

<pre class="wp-block-preformatted">F0 = 0
F1 = 1
F2 = F1 + F0 = 1
F3 = F2 + F1 = 2
...
F(n) = F(n-1) + F(n-2)
</pre>

In other words, each element is the sum of the two previous elements. Here are the first few values of the series:

<pre class="wp-block-preformatted">0, 1, 1, 2, 3, 5, 8, 13, 21...
</pre>

So, 2nd, 3rd, 4th and 5th number of the series is 1123 or it written as 23rd, November.

However, to get the n-th number of the series, we can use recursion.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">def fibonacci(n):
    if n == 0:
        x = 0
    elif n == 1:
        x = 1
    else:
        x = fibonacci(n-1) + fibonacci(n-2)
    return x</pre>

It does work ok up to 35th number +/- in my 7th Gen Intel Core i5 Laptop. But in 40th number, it took almost 41 seconds !

It should shock anyone. How did I calculate?

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import time
start_time = time.time()
print(fibonacci(40))
end_time = time.time()
print("Time required: ", end_time-start_time)</pre>

This is odd. Recursion has some limitations in Python. Recursive calls are limited to a depth of 1000.

We are calling Fibonacci function multiple times and with the same argument. But each time we are calculating the value all over again. We know that Fibonacci function has no side effects as every time we call it with a particular value, we will always get the same result. 

So, We need is some way to remember all the times it has been called before, store the result, and only calculate it if it is called with a value that has never been seen before.

In this case, We can use lru_cache.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">from functools import lru_cache


@lru_cache(maxsize=2)
def fibonacci(n):
    if n == 0:
        x = 0
    elif n == 1:
        x = 1
    else:
        x = fibonacci(n-1) + fibonacci(n-2)
    return x


import time
start_time = time.time()
print(fibonacci(40))
end_time = time.time()
print("Time required: ", end_time-start_time)</pre>

Now using **lru_cache**, 40th number comes within 0.29+/- seconds.

Here, &#8220;maxsize&#8221; is used 2, which means, to remember last 2 it has calculated. If you change it to 1, it will not work as it was working. In my case, it took more than double time: 87.25252437591553 seconds. Which seems to create overhead instead of giving any benefit.