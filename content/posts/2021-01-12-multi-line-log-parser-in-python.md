---
title: Multi line Log Parser in Python
author: Fahad Ahammed
type: post
date: 2021-01-12T15:59:19+00:00
url: /multi-line-log-parser-in-python/
featured_image: /wp-content/uploads/2021/01/log_format.png
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - How to parse logs using Python
  - python
  - python multiline log parser
  - python3

---
So, I have a log file that is not single line log. It is kind of java stack trace. What I needed to do is read those log files and create some actions depending on them. I could use already built tools. But I thought why not just do this as simply as printing strings.

This is an example of the log format I wanted to play with. It seems too simple to pile up the Filebeats or elastic stack.

<!--more-->

So, I have that log format. First I want to read the file.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">with open(file=log_file, mode="r") as of:
    log_file_obj = of.readlines()</pre>

This log\_file\_obj is now a list of lines of the log file. It can be a huge object in the memory. But as I have fixed and limited size log files, I can risk opening them like that.

If logs were single lined, I could use this list to do the actions. But What I had to do is this.

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">def log_reader(log_file=None):

    def line_match(line):
        rr = line.startswith("[DUMMY]")
        if rr:
            return True
        else:
            return False

    def yeild_matches(full_log):
        log = []
        for line in full_log:
            if line_match(line):
                if len(log) > 0:
                    yield "\n".join(log)
                    log = []

            log.append(line)

        yield "\n".join(log)

    if log_file:
        with open(file=log_file, mode="r") as of:
            log_file_obj = of.readlines()
            print(type(log_file_obj))
            log_list = list(yeild_matches(full_log=log_file_obj))
            return log_list
    else:
        return False


if __name__ == "__main__":
    fulllog = log_reader(log_file="multiline.log")
    print(fulllog)</pre>

Thus the output should be &#8211; 

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">['[DUMMY] - A\n\nB\n\nC\n\nD\n\nDUMMY\n\n....A\n\nCXDD\n', '[DUMMY] --\n', '[DUMMY] KKKKK\n\naskldfhkja\n\naslkdfhksd\n', '[DUMMY] ++ ++']</pre>

This is just a simple code snippet.