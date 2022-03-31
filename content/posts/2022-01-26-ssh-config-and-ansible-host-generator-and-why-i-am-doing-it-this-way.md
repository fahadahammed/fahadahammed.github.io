---
title: SSH Config and Ansible Host Generator and Why I am doing it this way?
author: Fahad Ahammed
type: post
date: 2022-01-26T14:50:35+00:00
url: /ssh-config-and-ansible-host-generator-and-why-i-am-doing-it-this-way/
featured_image: 'https://images.unsplash.com/photo-1615309661755-816dcd80bcd3?ixid=MnwxNzc4MTd8MHwxfGFsbHx8fHx8fHx8fDE2NDMyMDYwMjI&ixlib=rb-1.2.1&fm=jpg&q=85&fit=crop&w=825&h=510'
classic-editor-remember:
  - block-editor
categories:
  - programming
  - python
  - Technology
tags:
  - ansible
  - ansible inventory
  - python
  - scripts
  - ssh
  - ssh config

---
I am recently playing the role as an SRE and that is why I have to deal with a lot of servers. Not only cloud once or clusters but also bare metals as well as Virtual Machines. For more systematic environment preparation, I have Gitlab pipeline. But for basic tasks like change the config on demand or check a specific directory or search something or any other unpredictable or repeated tasks, I need Ansible for better grasp from my local machine or Bastion server. So, what do I have to do?

  * Create an entry to the .ssh/config file
  * Create an entry ansible host file as inventory

Repeated tasks? For me, yes. I needed to manage these. So, created a python script 

<!--more-->

that takes several arguments and store it into Ansible inventory and as well as in .ssh/config file for future ease of access. It does give me a better configuration handling.

The script is in here: <a href="https://github.com/fahadahammed/ssh-config-ansible-inventory-generator" target="_blank" rel="noreferrer noopener">https://github.com/fahadahammed/ssh-config-ansible-inventory-generator</a>

Let me share the current script here:

<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">import argparse
import os
import json
import os
import sys
import datetime
import uuid


def get_random_id():
    the_id = uuid.uuid4()
    return str(the_id)


class mjdb:
    def __init__(self, db_file_name="sshc_db.json"):
        self.db_file_name = db_file_name

    def create_db(self):
        try:
            if not os.path.exists(self.db_file_name):
                with open(self.db_file_name, 'a') as opened_db:
                    json.dump([], opened_db)
            return True
        except Exception as ex:
            print(ex)
            return False

    def insert_data(self, data):
        try:
            data["id"] = get_random_id()
            existing_data = self.read_all_data()
            to_insert = existing_data + [data]
            with open(self.db_file_name, 'w') as opened_db:
                json.dump(to_insert, opened_db)
            return True
        except Exception as ex:
            print(ex)
            return False

    def read_all_data(self):
        try:
            with open(self.db_file_name, 'r') as opened_db:
                to_return = json.load(opened_db)
            return to_return
        except Exception as ex:
            print(ex)
            return False


def cleanup_file(configfile):
    configfiledir = configfile.replace("/" + configfile.split("/")[-1], "")

    try:
        os.remove(configfile)
    except Exception as ex:
        if len(configfile.split("/")) > 2:
            os.mkdir(configfiledir)
        with open(configfile, "w") as of:
            of.write("")


def insert_timestamp_into_configfile(configfile):
    dt_now = str(datetime.datetime.now(tz=datetime.timezone(offset=datetime.timedelta(hours=6))))
    with open(configfile, "a") as of:
        of.write("# Generated at: " + dt_now)
        of.write("\n")


def generate_host_entry_string(name, host, port, user, log_level, compression, idf, configfile, comment):
    entry_template = f'''\n# -- &lt;
Host {name}
HostName {host}
Port {port}
User {user}
IdentityFile {idf}
LogLevel {log_level}
Compression {compression}
# Comment: {comment}
# -- >
\n'''

    with open(file=configfile, mode="a") as thefile:
        thefile.write(entry_template)

def generate_ansible_inventory_file(data_to_write, inventory_file_name="hosts.json"):
    with open(file=inventory_file_name, mode="w") as thefile:
        json.dump(data_to_write, thefile)
    
def read_list_of_hosts(db_file_name="sshc_db.json"):
    all_data = mjdb(db_file_name=db_file_name).read_all_data()
    to_return = ''''''
    for ii, i in enumerate(all_data):
        entry_template = f'''{ii+1}. {i["name"]} {i["host"]} {i["port"]} {i["user"]} {i["idf"]} {i["log_level"]} {i["compression"]} {i["comment"]}\n'''
        to_return += entry_template
    return to_return


def get_host_by_host_number(hn, db_file_name="sshc_db.json"):
    the_index = hn-1
    all_data = mjdb(db_file_name=db_file_name).read_all_data()
    return all_data[the_index]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='SSH Config and Ansible Inventory Generator !')
    mg1 = parser.add_mutually_exclusive_group(required=True)

    mg1.add_argument("--init", choices=["yes", "no"], help="Initialize DB?")
    mg1.add_argument("--insert", choices=["yes", "no"], help="Insert data?")
    mg1.add_argument("--read", choices=["yes", "no"], help="Read Inventory?")
    mg1.add_argument("--generate", choices=["yes", "no"], help="Generate SSH Config from Database?")
    parser.add_argument('--name', help='Server Name?')
    parser.add_argument('--host', help='SSH Host?')
    parser.add_argument('--user', help='SSH User?', default="root")
    parser.add_argument('--port', help='SSH Port?', default=22)
    parser.add_argument('--idf', help='SSH Identity File?', default="/Users/fahad/.ssh/id_rsa")
    parser.add_argument('--comment', help='SSH Identity File?', default="No Comment.")
    parser.add_argument('--configfile', help='SSH Config File?', default="/Users/fahad/.ssh/config")
    parser.add_argument('--groups',  nargs='+', help='Which group to include?', default=[])

    parser.add_argument("--hn", help="Which Host by giving Host Number?")

    args = parser.parse_args()

    idf = args.idf
    configfile = args.configfile
    # user_home = os.path.expanduser("~")
    user_home = "."
    if "~" in idf:
        idf = idf.replace("~", user_home)
    if "~" in configfile:
        configfile = configfile.replace("~", user_home)

    if args.init == "yes":
        print("Initializing Database...")
        mjdb().create_db()
        print("Done.")

    elif args.insert == "yes":
        name = str(args.name).lower()
        host = args.host
        port = int(args.port)
        user = args.user
        comment = args.comment
        groups = args.groups

        if not name or not host or not port or not user:
            exit("Some required parameters missing.")

        data = {
            "name": name, "host": host, "port": port, "user": user,
            "log_level": "DEBUG", "compression": "yes", "idf": idf,
            "comment": comment
        }
        print("Inserting data...")
        mjdb().insert_data(data=data)
        print("Done.")

    elif args.read == "yes":
        print("Reading data...")
        print(read_list_of_hosts())
        print("Done.")
    elif args.generate == "yes":
        print("Generating SSH Config File...")
        the_data = mjdb().read_all_data()
        if the_data:
            all_hosts = {}
            groups = []
            for i in the_data:
                groups += i.get("groups", [])
                all_hosts[i.get("name")] = {
                    "ansible_host": i.get("name"),
                    "ansible_port": i.get("port"),
                    "ansible_user": i.get("user"),
                    "ansible_ssh_private_key_file": i.get("idf")
                }
                generate_host_entry_string(name=i["name"], host=i["host"], port=i["port"],
                                           user=i["user"], log_level=i["log_level"],
                                           compression=i["compression"], idf=i["idf"],
                                           configfile=configfile, comment=i["comment"]
                                       )
            groups = list(set(groups))
            children = {}
            for i in groups:
                hosts = {}
                for j in the_data:
                    if i in j.get("groups", []):
                        hosts[j["name"]] = None
                children[i] = {
                    "hosts": hosts
                }
            ansible_inventory_data = {
                "all": {
                    "hosts": all_hosts,
                    "children": children
                },
                "others": {
                    "generated_at": str(datetime.datetime.now(tz=datetime.timezone(offset=datetime.timedelta(hours=6))))
                }
            }
            generate_ansible_inventory_file(data_to_write=ansible_inventory_data)
            print("Done.")
        else:
            exit("No data in DB.")</pre>

Now, it has some flow to manage.

## Help {#help}

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ python3 sshc.py --help</pre>

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">usage: sshc.py [-h] (--init {yes,no} | --insert {yes,no} | --read {yes,no} | --generate {yes,no})
               [--name NAME] [--host HOST] [--user USER] [--port PORT] [--idf IDF]
               [--comment COMMENT] [--configfile CONFIGFILE] [--groups GROUPS] [--hn HN]

SSH Config and Ansible Inventory Generator !

optional arguments:
  -h, --help            show this help message and exit
  --init {yes,no}       Initialize DB?
  --insert {yes,no}     Insert data?
  --read {yes,no}       Read Inventory?
  --generate {yes,no}   Generate SSH Config from Database?
  --name NAME           Server Name?
  --host HOST           SSH Host?
  --user USER           SSH User?
  --port PORT           SSH Port?
  --idf IDF             SSH Identity File?
  --comment COMMENT     SSH Identity File?
  --configfile CONFIGFILE
                        SSH Config File?
  --groups GROUPS       Which group to include?
  --hn HN               Which Host by giving Host Number?
</pre>

### Need the DB to be initiated for the first time {#need-the-db-to-be-initiated-for-the-first-time}

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ python3 sshc.py --init yes</pre>

### [][1]How to insert host information to the Database? {#how-to-insert-host-information-to-the-database}

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">$ python3 sshc.py --insert yes --name Google --host 8.8.8.8 --port 22 --user groot --idf /home/fahad/fahad.pem --comment "This is the server where you are not authorized to have access." --configfile /home/fahad/.ssh/config --groups google, fun</pre>

### [][2]How to generate ssh config and as well as ansible inventory file {#how-to-generate-ssh-config-and-as-well-as-ansible-inventory-file}

<pre class="EnlighterJSRAW" data-enlighter-language="shell" data-enlighter-theme="" data-enlighter-highlight="" data-enlighter-linenumbers="" data-enlighter-lineoffset="" data-enlighter-title="" data-enlighter-group="">% python3 sshc.py --generate yes</pre>

I am getting a .ssh/config and hosts.json file from this script. There might be some other way but I am managing ssh configs and Ansible hosts with this tool.

 [1]: https://github.com/fahadahammed/ssh-config-ansible-inventory-generator#how-to-insert-host-information-to-the-database
 [2]: https://github.com/fahadahammed/ssh-config-ansible-inventory-generator#how-to-generate-ssh-config-and-as-well-as-ansible-inventory-file