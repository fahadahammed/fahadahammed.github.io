---
title: Some quick and useful git commands
author: Fahad Ahammed
type: post
date: 2020-12-26T17:03:27+00:00
url: /some-quick-and-useful-git-commands/
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - git
  - un-add the file
  - un-commit the last commit

---
Using git is somehow easier when you just stick into normal workflow or working all alone in a project. Also it is easier as there are many GUI available. But there are some possibility on falling into critical situations where GUI may not be the right tool to stick with. I will share some situations here and the right commands which will save you from doing useless commits.

<!--more-->

You have changed some files and committed. But not pushed yet. Suddenly you think that you do not need this commit but the changes.

<pre class="wp-block-code"><code>$ git reset --soft HEAD^</code></pre>

It will un-commit the last commit but all the changes will be there.

You have changed some files and committed. But not pushed yet. Suddenly you think that you do not need this commit and all the changes.

<pre class="wp-block-code"><code>$ git reset --hard HEAD^</code></pre>

It will un-commit the last commit and also remove all the changes from last-last commit.

Let you have created a file called ‘file.txt’ and added all the articles you need to put in it. Somehow you created a copy of that file and named “file.txt.1” and accidentally you used “file add .” command which added all the changes including file.txt.1  
But you need to remove that from added and future commit.

<pre class="wp-block-code"><code>git reset HEAD &lt;file></code></pre>

It will un-add the file. Then you can just remove the file.

These are all I have in my mind right now. I will share more when I can present you a presentable version of the situation. Thank you.