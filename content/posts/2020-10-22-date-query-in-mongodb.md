---
title: Date Query in MongoDB
author: Fahad Ahammed
type: post
date: 2020-10-22T07:34:52+00:00
url: /date-query-in-mongodb/
classic-editor-remember:
  - block-editor
categories:
  - Technology
tags:
  - mongo
  - mongodb

---
You have some data in MongoDB with date object in them. You want to delete data from certain date, then here it is:-

<pre class="wp-block-code"><code>db.COLLECTION.remove({created_at: {$gt: ISODate('2020-10-22')}})</code></pre>