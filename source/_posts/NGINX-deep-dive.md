---
title: NGINX Deep Dive - Use Cases + Reverse Proxy Servers
date: 2022-02-14 14:59:50
tags: ["NGINX", "networking", "routing", "reverse-proxy"]
---

# Understanding NGINX

In an effort to dive a little deeper into how runtime networking really works, I've done some research on NGINX to better understand the use cases, and also drive further investigation into some networking basics that I've never been exposed to. Some of these topics are very high level and most likely well known to any real networking engineer, but this list of topics should be useful to anyone in a technical PM role who would want to better understand networking routing and operations. I'll refer to everything behind the NGINX web server as "app servers"

### 1. What is NGINX

NGINX is basically a gateway between the internet and the actual back-end infrastructure (servers running your application - thus, app server). The actual compute infrastructure can be anything from whole servers, docker containers, or kubernetes pods... pretty much any form of distributed computing you want to serve requests to.

{% asset_img NGINX_diag.png NGINX Reverse Proxy Architecture  %}

This set up is called a reverse-proxy where the web server (NGINX) sits in front of the app servers, aka between the internet and the app server. This is the opposite of a forward proxy (or regular proxy) where the web server sits in-between the client and the internet. I was confused about this at first, but it helps to visualize where the "internal network" that's firewalled off from the rest of the public internet is in these cases.

{% asset_img proxy_pic.png Types of Proxy Servers %}

_Regular/Forward Proxy:_ The internal network is owned and guarded by the client, that uses the proxy to control what is coming in or out of the client computer/network. This would be useful for an on-site government clearance network, that has sensitive material on the client server, that needs to be as locked away from the public as possible.

_Reverse Proxy_ (Typical NGINX use-case): This internal network is owned and guarded by the app server network, that uses the proxy to control what comes in or out of the app servers/network. This would be useful for any cloud app that want's to make sure the connections and content of the app are easily accessible, but only by the right users and methods.

To clarify further, the critical difference is this:

a. A forward proxy will make sure the the app server never communicates directly with the client (because it "sits" in front of the client)
b. A reverse proxy will make sure the client never communicates directly with the app server (because it "sits" in front of the app server)

You can also run NGINX as a regular web server as well to serve static content like images and HTML.

### 2. What does it do?

There are 4 primary use cases of an NGINX (or any reverse-proxy) server:

- **Load-balancing:** Having the web-server sitting in front of your app servers (or pods, etc) allow for logic to be performed on the incoming requests that can manage the load coming from clients. Depending on which Layer you're routing from (Layer 4 -- cant read/write HTTP data package contents, Layer 7 can), load balancing such as round-robin, least connections (server that has the lower number of current requests), and server response time. Layer 7 can inspect the data package and make decisions based on cookies and source IP persistence (knowing which user is who based on IP).

- **Back-end Routing:** Similar to load-balancing, you can direct traffic to specific app servers based on the request. An example of this would be: as Heroku user on a multi-tenant runtime, I need to have requests to my app routed to a specific instance/container (dyno) that's running my actual application. Therefore, there needs to be a router, the NGINX web server in this case, in place to direct incoming traffic to my app to my specific server resources in the Heroku runtime.

- **Caching**: You can cache static material on NGINX to be able to minimize database calls and minimize response times by having data on the edge, aka closer in sequence your clients than your application servers. [This is how CDNs work](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/). The best example would be having your app server hosted in a region far from your client. For example, your app server is hosted in US-West over in Oregon, but you service many users in Tokyo. Having an NGINX instance to route traffic from Tokyo with cached content can minimize the response time to the Tokyo user while the app server handles the request.

- **Authentication/Encryption**: You can offload some of the expensive compute away from your app server and onto NGINX, where it can process SSL/TLS encryption (encrypt or decrypt) and free up. You've also now got an added layer of security to prevent cyber attacks like DDoS.

### 3. Putting it all together

I'm going to map out a basic project where I would use NGINX to meet my requirements. Say I have an app server, that holds confidential patient data for a hospital network, with hospital locations all over the world, and has has millions of users daily based on staff usage for charting.

I want to build a web app that can do the following:

| Requirement                                                                                                                                                                                                                        | NGINX Use-Case                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| I want to provide fast access to my web app from anywhere in the world, even though my app server resides in US-West, so nurses in Tokyo can access and load the app quickly                                                       | Have an NGINX web-server in the Osaka region to handle requests and serve cached content                                                             |
| I want to make sure that any client accessing my app is doing so through the common ports HTTP (80) and HTTPS (443) and not the direct port on my app server, so I can prevent bad actors from directly hitting my app server      | Have an NGINX web-server that can be accessed through port 80/443, that can then forward and recieve requests to the open port on my app server      |
| I want to make sure my network load is distributed across 3 servers to make sure performance stays high, and patient data can be pulled up quickly                                                                                 | Have an NGINX web-server that can route requests to my 3 app servers on a basis of whichever app server is currently responding the fastest (Layer4) |
| I want to make sure any requests are not-readable by a 3rd party, and I want to make sure the only people accessing my app server are those that should, so that confidential patient information cannot be intercepted and viewed | Have an NGINX web-server that performs TLS encryption on the data sent between the clients and app server and authenticate any user at the gateway   |

---

If I had a forward proxy, it may solve some of the cases above, but I would not be able to perform any logic between the internet and my app servers, such as routing between the servers internal network.

It took me a minute to figure all of this out, so I hope this simplified one pager could one day be of some use.

### Reference Links + Videos :

Layer 4 Load-balancing: https://www.nginx.com/resources/glossary/layer-4-load-balancing/
NGINX Basics- https://www.youtube.com/watch?v=WHv_t_yK-QM
Reverse Proxy - https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/
NGINX Basics - https://www.youtube.com/watch?v=JKxlsvZXG7c
Proxy Servers - https://en.wikipedia.org/wiki/Proxy_server
