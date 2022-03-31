---
title: Some coding practice with Json, Itertools and Lambda in Python
author: Fahad Ahammed
type: post
date: 2020-12-19T18:39:24+00:00
url: /some-coding-practice-with-json-itertools-and-lambda-in-python/
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - groupby
  - itertools
  - json
  - lambda
  - python
  - python3

---
I enjoy coding and solving problems. But as I go forward, I find myself in a sea of unknowns. Thus I decided to learn as much as possible to be confident. So, I am learning even the simplest it seems.

<!--more-->

Let me start.

I have a json file named **data.json** having data &#8211;

<pre class="EnlighterJSRAW" data-enlighter-language="json" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">[
  {
    "name": "Guido Van Rossum",
    "city": "Haarlem",
    "country": "Netherlands",
    "known_for": "Python"
  },
  {
    "name": "Tim Berners-Lee",
    "city": "London",
    "country": "United Kingdom",
    "known_for": "HTML"
  },
  {
    "name": "Brendan Eich",
    "city": "Pittsburgh",
    "country": "United States of America",
    "known_for": "Javascrip"
  },
  {
    "name": "Yukihiro Matsumoto",
    "city": "Osaka",
    "country": "Japan",
    "known_for": "Ruby"
  },
  {
    "name": "James Gosling",
    "city": "Calgary",
    "country": "Canada",
    "known_for": "Java"
  },
  {
    "name": "Linus Torvalds",
    "city": "Helsinki",
    "country": "Finland",
    "known_for": "Linux"
  },
  {
    "name": "Håkon Wium Lie",
    "city": "Halden",
    "country": "Norway",
    "known_for": "C++"
  },
  {
    "name": "Rasmus Lerdorf",
    "city": "Qeqertarsuaq",
    "country": "Denmark",
    "known_for": "php"
  },
  {
    "name": "Dennis Ritchie",
    "city": "Bronxville",
    "country": "United States of America",
    "known_for": "C"
  },
  {
    "name": "Bjarne Stroustrup",
    "city": "Aarhus",
    "country": "Denmark",
    "known_for": "C++"
  }
]</pre>

How do I read this file in Python?

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import json

with open(file="data.json", mode="r") as opened_file:
    json_file_object = json.load(opened_file)

print(json_file_object)</pre>

This code will just open the file and make the contents as a python dictionary when loaded by **json.load()**.

Now, Let I want to get a dictionary from that list of dictionary with countries as the key and all the persons of a particular country will be in a list of that key. As an example &#8211; 

<pre class="EnlighterJSRAW" data-enlighter-language="generic" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">{
  'United Kingdom': [
    {
      'name': 'Tim Berners-Lee',
      'city': 'London',
      'country': 'United Kingdom',
      'known_for': 'HTML'
    }
  ],
  'United States of America': [
    {
      'name': 'Brendan Eich',
      'city': 'Pittsburgh',
      'country': 'United States of America',
      'known_for': 'Javascript'
    },
    {
      'name': 'Dennis Ritchie',
      'city': 'Bronxville',
      'country': 'United States of America',
      'known_for': 'C'
    }
  ]
}</pre>

How can I do that?

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import json

with open(file="data.json", mode="r") as opened_file:
    json_file_object = json.load(opened_file)


persons = json_file_object

new_persons = persons.copy()

return_obj_filter = {}
for i, v in enumerate(persons):
    commons = list(filter(lambda person: person["country"] == v["country"], new_persons))
    if commons:
        if return_obj_filter.get(v["country"]):
            return_obj_filter[v["country"]] = return_obj_filter[v["country"]].append(commons)
        else:
            return_obj_filter[v["country"]] = commons

        for ii in commons:
            indx = new_persons.index(ii)
            new_persons.pop(indx)
            
            
            
print(return_obj_filter)</pre>

I ran a loop and checked some conditions to make a dictionary. Now it can be done by another way.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import json
from itertools import groupby

with open(file="data.json", mode="r") as opened_file:
    json_file_object = json.load(opened_file)


persons = json_file_object

persons.sort(key=lambda x: x["country"])
gob = groupby(persons, key=lambda xx: xx["country"])
return_obj_gob = {}
for k, v in gob:
    return_obj_gob[k] = list(v)
print(return_obj_gob)</pre>

Here, I have used groupby function from itertools and also little bit lambda to sort and other key.

Obviously It can be done with many ways and can be optimized. I will try to update this post when I again have time working on this.