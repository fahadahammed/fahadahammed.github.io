---
title: Getting habit to use TMUX
author: Fahad Ahammed
type: post
date: 2022-01-24T13:41:22+00:00
url: /getting-habit-to-use-tmux/
featured_image: /wp-content/uploads/2022/01/pexels-photo-310452-825x510.jpeg
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - terminal multiplexer
  - tmux

---
Recently been practicing **TMUX** for my day to day tasks. To be honest, I am late. I should have get used to it earlier. It is much more robust and well sorted than the other **terminal multiplexers** such as **screen**. How am I adapting?

<!--more-->

## Default Session set to TMUX when create a new terminal session

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">if [ -z "$TMUX" ]; then
    tmux attach -t default || tmux new -s default
fi</pre>

I do set this code block to the **.bashrc**. So that, Whenever I create new window of the terminal or ssh to a server, I get into the default tmux session. Thus no fear of failed operation in case of network error.

## Basic Commands

  * `tmux new -s playground` &#8211; Create a tmux session naming playground
  * ctrl+b then d &#8211; To detach session
  * `tmux ls` &#8211; list of sessions
  * ctrl+b &#8211; To give command to tmux
  * ctrl+b then o &#8211; To go to next pane
  * `tmux a -t playground` &#8211; Attach to the session playground
  * ctrl+b then &#8221; &#8211; To horizontally split the pane
  * ctrl+b then % &#8211; To vertically split the pane
  * ctrl+b then arrow keys &#8211; To change pane left, right, up, down
  * ctrl+b then x &#8211; To kill session, you can also just use exit
  * ctrl+b then z &#8211; Zoom a pane

I will try to update this post once I have time managing more time to write about tmux.