---
title: 'Explore InfluxDB: Part 1'
author: Fahad Ahammed
type: post
date: 2022-02-01T15:00:00+00:00
url: /explore-influxdb-part-1/
featured_image: /wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM-825x510.png
classic-editor-remember:
  - block-editor
categories:
  - Docker
  - Linux
  - Monitoring
  - Technology
tags:
  - docker
  - docker-compose
  - influxdb
  - influxdb2
  - monitoring

---
I have been trying to manage time to explore InfluxDB for observability. This article is one of many about InfluxDB and Telegraf. I will cover basic installation here.

<!--more-->

To install InfluxDB I have used docker-compose for now. In future, maybe I will choose and share some other form of installation.

docker-compose.yaml

<pre class="wp-block-code"><code>version: '3.8'

networks:
  influxdb:

services:
  influxdb:
    image: 'influxdb:latest'
    networks:
      - influxdb
    ports:
      - 8086:8086
    volumes:
      - $PWD/data/influxdb2_data:/var/lib/influxdb2
      - $PWD/data/influxdb2_config:/etc/influxdb2
    restart: on-failure
    environment:
      - TZ=Asia/Dhaka
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=influxdb
      - DOCKER_INFLUXDB_INIT_PASSWORD=influxdb
      - DOCKER_INFLUXDB_INIT_ORG=myorg
      - DOCKER_INFLUXDB_INIT_BUCKET=mybucket</code></pre>

<pre class="wp-block-code"><code>$ docker-compose up -d</code></pre>

Normally, `image: 'influxdb:latest'` is denoting to latest version of influx, influxdb2+. <figure class="wp-block-image size-full">

[<img loading="lazy" width="660" height="663" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?resize=660%2C663&#038;ssl=1" alt="Explore InfluxDB" class="wp-image-5545" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?w=995&ssl=1 995w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?resize=768%2C771&ssl=1 768w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][1]</figure> 

Now we need telegraf on our servers from where we will get the metrics.

I have a ubuntu server at which some application is running.

  1. Docker
  2. Nginx
  3. Redis

So, I wanted to monitor those as well as host information.

First, I have installed telegraf.

<pre class="wp-block-code"><code>$ sudo wget https://dl.influxdata.com/telegraf/releases/telegraf_1.21.3-1_amd64.deb
$ sudo dpkg -i telegraf_1.21.3-1_amd64.deb</code></pre>

It will enable a systemd service and make it running when installation complete. After installation, stop the service.

<pre class="wp-block-code"><code>$ sudo service telegraf stop</code></pre>

make a backup of the configuration file

<pre class="wp-block-code"><code>$ sudo mv /etc/telegraf/telegraf.conf /etc/telegraf.conf_backup</code></pre>

Create a new configuration with passing some parameters

<pre class="wp-block-code"><code>$ sudo telegraf --sample-config --input-filter cpu:mem:system:net:swap:processes:disk:diskio:docker:nginx:redis --output-filter influxdb_v2 &gt; /etc/telegraf/telegraf.conf</code></pre>

Here we are generating sample config and writing the config to the default config file of telgraf. I have used some plugins to send the metrics to influxdb.

  1. cpu
  2. mem
  3. system
  4. net
  5. swap
  6. processes
  7. disk
  8. diskio
  9. docker
 10. nginx
 11. redis

After that, need to pass token to allow this telegraf for sending metrics to the influxdb and also the influxdb endpoint.

<pre class="wp-block-code"><code>
# Configuration for sending metrics to InfluxDB
&#91;&#91;outputs.influxdb_v2]]
  ## The URLs of the InfluxDB cluster nodes.
  ##
  ## Multiple URLs can be specified for a single cluster, only ONE of the
  ## urls will be written to each interval.
  ##   ex: urls = &#91;"https://us-west-2-1.aws.cloud2.influxdata.com"]
  urls = &#91;"http://localhost:8086"]
  ## Token for authentication.
  token = ""

  ## Organization is the name of the organization you wish to write to; must exist.
  organization = "myorg"

  ## Destination bucket to write into.
  bucket = "mybucket"</code></pre>

Change the url of the influxdb and also the token collected from Influxdb Data>API Tokens. Also need to change the organization and bucket if you want.

Restart the telegraf.

<pre class="wp-block-code"><code>$ sudo service telegraf restart</code></pre>

As soon as telegraf starts sending the data, You should be able to get the already created/default dashboard for system where you will be able to get information about uptime, load, cpu, memory, disk etc information. But what I also needed is nginx dashboard, redis and Docker dashboard.

Community plugins can be found here &#8211; <a href="https://github.com/influxdata/community-templates" target="_blank" rel="noreferrer noopener">https://github.com/influxdata/community-templates</a>

  1. **Redis:** https://raw.githubusercontent.com/influxdata/community-templates/master/redis/redis.yml
  2. **Nginx:** https://raw.githubusercontent.com/influxdata/community-templates/master/nginx\_mysql/nginx\_mysql.yml
  3. **Docker:** https://raw.githubusercontent.com/influxdata/community-templates/master/docker/docker.yml

To Apply the templates you can use &#8211;

<pre class="wp-block-code"><code>influx apply -f &lt;url_to_dashboard_template_yaml_file&gt;</code></pre>

Or

You can just import through the dashboard itself. Settings>Template>Lookup Template with the url in the input field.

Redis was kind of readymade. But Nginx and Docker needed to change some parameters/variables.

For nginx, there are two variables created and can be changed.

  1. mysqlBucket
  2. nginxBucket<figure class="wp-block-image size-large">

[<img loading="lazy" width="660" height="353" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=660%2C353&#038;ssl=1" alt="" class="wp-image-5543" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=1024%2C548&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=300%2C160&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=768%2C411&ssl=1 768w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=1536%2C822&ssl=1 1536w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?resize=2048%2C1095&ssl=1 2048w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?w=1320&ssl=1 1320w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?w=1980&ssl=1 1980w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][2]</figure> 



I did set only for nginx, as I did not need MySQL for now. I changed the bucket to my bucket at which telegraf is sending the metrics.

For Docker, there were no variables in the template file but default bucket set to docker. But I was not sending the metrics to the bucket named &#8220;docker&#8221;. So, I needed to edit all the graphs of the dashoard and replace the bucket &#8220;docker&#8221; with `v.dockerBucket`. Created a variable named dockerBucket setting value to the bucket where telegraf already sending the metrics.

Also I needed to add telegraf user to the docker group for giving telegraf permission to read docker stat from docker daemon.

<pre class="wp-block-code"><code>sudo usermod -aG docker telegraf</code></pre>

This is the solution of below error on telegraf service.

<pre class="wp-block-code"><code>2022-02-01T12:40:00Z E! &#91;inputs.docker] Error in plugin: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.21/info": dial unix /var/run/docker.sock: connect: permission denied,
2022-02-01T12:40:00Z E! &#91;inputs.docker] Error in plugin: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.21/containers/json?filters=%7B%22status%22%3A%5B%22running%22%5D%7D&limit=0": dial unix /var/run/docker.sock: connect: permission denied</code></pre>

For nginx, I needed to set some config to get the status too. First, needed to check if nginx install has the required module or not.

<pre class="wp-block-code"><code>$ nginx -V 2&gt;&1 | grep -o with-http_stub_status_module</code></pre>

If it doesn&#8217;t return anything then we need to install that module.

After having that, I have created a location block which will give nginx status in return.

<pre class="wp-block-code"><code>location /nginx_status {
 	stub_status;
 	allow 127.0.0.1;	#only allow requests from localhost
 	deny all;		#deny all other hosts	
 }</code></pre>

This endpoint was giving me some statistics/metrics of nginx itself. I needed to set this url to telegraf and restart telegraf service.

<pre class="wp-block-code"><code># Read Nginx's basic status information (ngx_http_stub_status_module)
&#91;&#91;inputs.nginx]]
  # An array of Nginx stub_status URI to gather stats.
  urls = &#91;"http://localhost/nginx_status"]

  ## Optional TLS Config
  #tls_ca = "/etc/telegraf/ca.pem"
  #tls_cert = "/etc/telegraf/cert.cer"
  #tls_key = "/etc/telegraf/key.key"
  ## Use TLS but skip chain & host verification
  insecure_skip_verify = false</code></pre>

Thus the required dashboards are ready. I might need some more later.

Final dashboard for one of my RaspberryPi 3B+ as of now:<figure class="wp-block-image size-large">

[<img loading="lazy" width="660" height="380" src="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?resize=660%2C380&#038;ssl=1" alt="" class="wp-image-5548" srcset="https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?resize=1024%2C589&ssl=1 1024w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?resize=300%2C173&ssl=1 300w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?resize=768%2C442&ssl=1 768w, https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?w=1077&ssl=1 1077w" sizes="(max-width: 660px) 100vw, 660px" data-recalc-dims="1" />][3]</figure> 

In next part I will try to cover the alert and task. Thank you for reading.

 [1]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.48.44-PM.png?ssl=1
 [2]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-01-at-8.07.36-PM.png?ssl=1
 [3]: https://i0.wp.com/fahadahammed.com/wp-content/uploads/2022/02/Screen-Shot-2022-02-02-at-12.38.56-AM.png?ssl=1