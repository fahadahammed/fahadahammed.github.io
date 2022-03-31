---
title: Count Characters in a Google Sheet
author: Fahad Ahammed
type: post
date: 2022-02-18T08:59:55+00:00
url: /count-characters-in-a-google-sheet/
featured_image: 'https://images.unsplash.com/photo-1592609931041-40265b692757?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2NDUxNzQ3ODE&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=825&h=510'
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - custom google sheet function
  - google sheet
  - javascript

---
I was trying explore some data in Google Sheet and stumble upon a unique problem. There were several columns and rows of data containing strings. I wanted to count specific string.

I wanted to find out how many &#8220;aD&#8221; in whole set.

<!--more-->

What I needed to do is create custom function.

```javascript
function countCharacter(input1, input2) {

  function cc(i1, i2) {
    var rgxp = new RegExp(i1, "g");
    return i2.match(rgxp).length;
  }

  if (input2 instanceof Array) {
    return cc(input1, input2.toString())
  } else {
    return cc(input1, input2)
  }

}
```