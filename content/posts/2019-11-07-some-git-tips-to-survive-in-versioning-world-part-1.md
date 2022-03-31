---
title: Some git tips to survive in versioning world – Part 1
author: Fahad Ahammed
type: post
date: 2019-11-07T09:06:03+00:00
url: /some-git-tips-to-survive-in-versioning-world-part-1/
featured_image: /wp-content/uploads/2019/11/gitlogo.png
classic-editor-remember:
  - block-editor
categories:
  - programming
  - Technology
tags:
  - git

---
I am gonna talk about Git. We all somehow use git and thus it is important for us to better use **.gitignore**.

<!--more-->

## How to allow only certain files of a repository on git commit?

To deny all and allow few, we can use **&#8220;!&#8221;**.

<pre class="wp-block-preformatted"># Ignore all with * and ! to not to ignore /
*
!/
# Allow only NewFolder and it's contents
!NewFolder
!NewFolder/*</pre>

Remember to change the **&#8220;.gitignore&#8221;** file before committing all the files.