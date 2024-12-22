---
title: "How to Install and Use Let's Encrypt SSL on Your Server (Apache & Nginx)"
description: "Certbot is the recommended client for obtaining and renewing SSL certificates from Let's Encrypt. The installation process depends on your Linux distribution (or operating system), but the following steps are for Ubuntu. The process is similar for other distributions."
image: "/images/blog/cerbot.jpg"
date: "2024-12-20"
category: "Server"
---

Let’s Encrypt uses Automatic Certificate Management Environment (ACME) protocol to automate the process of obtaining and installing SSL certificates. The most common ACME client is Certbot, which is responsible for obtaining the certificates from Let’s Encrypt and configuring the server.

Let’s Encrypt certificates are domain-validated certificates, meaning they only verify the ownership of the domain and not the identity of the organization behind it. This is why they are ideal for personal blogs, small businesses, or any website that doesn’t require extended validation (EV) certificates.

## Install Certbot
## On Ubuntu/Debian.
Update existing packages:

```bash
sudo apt update
sudo apt upgrade
```
## Install Certbot and the plugin for Nginx or Apache (depending on your web server):

For Nginx:
```bash
sudo apt install certbot python3-certbot-nginx
```

For Apache:
```bash
sudo apt install certbot python3-certbot-apache
```

## On CentOS/RHEL.
Install EPEL repository (for CentOS 7 and below):

```bash
sudo yum install epel-release
```


Install Certbot:

```bash
sudo yum install certbot python2-certbot-nginx
```
## Obtain the SSL Certificate
After installation, you can obtain an SSL certificate for your domain. Certbot will automatically check if your domain is configured correctly and request the certificate from Let's Encrypt.

For Nginx:
```bash
sudo certbot --nginx
```

For Apache:
```bash
sudo certbot --apache
```
Certbot will ask you to enter your email address and accept the terms and conditions. It will then automatically verify your domain and configure the web server to use the SSL certificate.

Set Up Automatic Certificate Renewal
Let's Encrypt certificates are valid for only 90 days. It’s important to set up automatic renewal.

Certbot includes a cron job to handle automatic renewals, but you can check it by running:

```bash
sudo certbot renew --dry-run
```
This simulates the renewal process and will show you if everything is working fine.

## Check the Installation
Once you've configured Let's Encrypt, you can check that SSL is working by accessing your site using https:// in front of your domain. You can also verify with an online tool like SSL Labs.

Configure HTTP to HTTPS Redirection
To ensure that all visitors to your site are using HTTPS, you should redirect all HTTP traffic to HTTPS. If you used the Certbot plugin for Nginx or Apache, it will automatically configure this redirection.


1. For Nginx:

Example of SSL Configuration in Nginx (yourdomain.com.conf):

```bash
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        root /var/www/yourdomain;
        index index.html index.htm;
    }
}

```

In the server block configuration (usually /etc/nginx/sites-available/default), add a section for HTTP to HTTPS redirection:

```bash
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

2. For Apache:

In your Apache configuration file (located in /etc/apache2/sites-available/), ensure there’s a VirtualHost block for HTTPS (port 443) and an HTTP to HTTPS redirection block.

Example of SSL Configuration in Apache (default-ssl.conf):

```bash
<VirtualHost *:443>
    ServerAdmin webmaster@yourdomain.com
    DocumentRoot /var/www/yourdomain
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/yourdomain.com/chain.pem

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # Redirect HTTP to HTTPS
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteCond %{HTTPS} off
        RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    </IfModule>
</VirtualHost>

```

Then enable SSL and the default-ssl site configuration:

```bash
sudo a2enmod ssl
sudo a2ensite default-ssl
sudo systemctl restart apache2

```
Add this rule in your .htaccess file or Apache configuration:

```bash
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```


Periodically Check Certificates
Setting up and using Let's Encrypt SSL certificates is a straightforward process with Certbot, ensuring that your website traffic is encrypted and secure. Whether you're using Apache or Nginx, this guide provides the necessary steps to configure SSL and redirect HTTP to HTTPS.

By regularly checking your SSL certificates and ensuring automatic renewals, you can maintain a secure and trusted website for your visitors.








