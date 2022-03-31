---
title: Ansible to change user password
author: Fahad Ahammed
type: post
date: 2022-02-09T14:49:16+00:00
url: /ansible-to-change-user-password/
classic-editor-remember:
  - block-editor
categories:
  - Linux
  - Technology
tags:
  - ansible
  - change root password of servers using ansible

---
One of the most basic things to do in a Linux Server. We can use just `passwd <user>` to change the password of a user. But to do that in 100s of server can be a tricky one. Ansible is the savior on that perspective.

<!--more-->

```yaml
---
- hosts: my100servers
  become: true
  tasks:
    - name: passwd change
      user:
        name: root
        password:  "{{ 'PLAIN_PASSWORD' | password_hash('sha512') }}"
```

Above playbook is well tested on linux systems.

```bash
$ ansible-playbook password-change.yaml
```

```bash
PLAY &#91;my100servers] ***************************************************************************************

TASK &#91;Gathering Facts] *******************************************************************************
ok: &#91;server3]
ok: &#91;server1]
ok: &#91;server4]
ok: &#91;server2]
ok: &#91;server5]
.........................
TASK &#91;passwd change] *********************************************************************************
&lt;a href="ok: &#91;server3]
ok: &#91;server1]
ok: &#91;server4]
ok: &#91;server2]
ok: &#91;server5]
.................">changed: &#91;server3]
changed&lt;/a>: &#91;server1]
&lt;a href="ok: &#91;server3]
ok: &#91;server1]
ok: &#91;server4]
ok: &#91;server2]
ok: &#91;server5]
.................">changed&lt;/a>: &#91;server4]
&lt;a href="ok: &#91;server3]
ok: &#91;server1]
ok: &#91;server4]
ok: &#91;server2]
ok: &#91;server5]
.................">changed&lt;/a>: &#91;server2]
&lt;a href="ok: &#91;server3]
ok: &#91;server1]
ok: &#91;server4]
ok: &#91;server2]
ok: &#91;server5]
.................">changed&lt;/a>: &#91;server5]
..........................

PLAY RECAP *******************************************************************************************
server1                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
server2                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
server3                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
server4                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
server5                   : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0 
..........................
```