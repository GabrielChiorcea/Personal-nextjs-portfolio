---
title: "Guide to Setting Up a Django Server with Nginx and Gunicorn"
description: "This step-by-step guide will show you how to set up a web server for your Django app using Nginx and Gunicorn on an Ubuntu server. We'll walk you through everything from installing the necessary packages to configuring your environment to run Django in production. Let's get started!"
image: "/images/blog/django.jpg"
date: "2024-12-28"
category: "Server"
---


## Preparing the Server

First things first: we need to update your server and install the essential packages.

 -  Run these commands to update and install everything you need:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv python3-dev libpq-dev nginx -y
```

Here’s what each package is for:

- `python3-pip`: The tool that lets you install Python packages you’ll need for your app.
    
- `python3-venv`: Allows you to create a virtual environment for Python—this keeps things nice and clean.
    
- `python3-dev`: Development headers and libraries for building Python packages.
    
- `libpq-dev`: Required for connecting your Django app to PostgreSQL if you're using that as your database.
    
-  `nginx`: This is the web server we’re going to use to serve your Django app.

----------

### Creating the App Directory

Now let’s create the directory where your Django app will live and set the right permissions.

1.  Make the directory:

```bash
sudo mkdir -p /var/www/domain.com/app
```
2.  Set the correct permissions:

```bash
sudo chown -R $USER:$USER /var/www/domain.com/app
sudo chmod -R 755 /var/www/domain.com
``` 
What’s happening here:
-   `mkdir -p`: Makes sure all the necessary folders are created (even the ones in the path).
  
-   `chown`: Changes the ownership of the directory to the current user (you).
  
-  `chmod`: Ensures the right read/execute permissions for the directory.

----------

### Configuring Nginx for Your App

Now it’s time to set up Nginx to serve your Django app. Let’s create a configuration file for your domain.

1.  Create the config file:
```bash
sudo nano /etc/nginx/sites-available/domain.com
```

2.  Add the following content to the file:


```bash
`server {
    listen 80;
    server_name domain.com www.domain.com;

    root /var/www/domain.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}` 
```
What’s happening here:
 -   `listen 80`: Tells Nginx to listen for HTTP traffic on port 80 (the standard for web traffic).
    
 -   `server_name`: This specifies which domains Nginx should handle with this config.
   
 -  `try_files`: It checks if the requested files exist. If not, it returns a 404 error.

----------

### Setting Up SSL with Let's Encrypt

For added security, you should use HTTPS. If you don’t already have an SSL certificate, Let’s Encrypt is a free, trusted option.

1.  First, let’s redirect all HTTP traffic to HTTPS:


```bash
server {
    listen 80;
    server_name domain.com www.domain.com;
    return 301 https://$host$request_uri;
}
```

2.  Next, let’s set up the HTTPS server configuration:

```bash
server {
    listen 443 ssl;
    server_name domain.com www.domain.com;

    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /var/www/domain.com/app/static/;
    }
}
``` 

 Here’s what’s going on:
-   `proxy_pass`: This tells Nginx to forward incoming requests to Gunicorn (which will run your Django app on port 8000).
    
-   `alias`: This directs Nginx to the static files folder where your Django app will store its static assets.

----------

### Activating the Nginx Configuration and Restarting the Service

Now that we’ve got Nginx set up, let’s activate the configuration and restart Nginx.

1.  Enable the site by creating a symbolic link:

```bash
sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled/` 
```

2.  Check for configuration errors:
```bash
sudo nginx -t
```

3.  If everything checks out, restart Nginx:
```bash
sudo systemctl restart nginx
```

----------

## Setting Up the Django Project

Next, let’s get your Django project set up and ready to go!

1.  Create a virtual environment for Python:

```bash
cd /var/www/domain.com/app
python3 -m venv venv
source venv/bin/activate 
```

2.  Install Django and Gunicorn:

```bash
pip install django gunicorn 
```

----------

### Creating the Django Project

1.  Now, let’s create a new Django project:

```bash

django-admin startproject myproject 
```

2.  To test that everything’s running, start the Django development server:

```bash
python3 manage.py runserver
```

----------

### Configuring Static Files

1.  Create the static files directory:

```bash
mkdir -p /var/www/domain.com/app/static
```

2.  Update `settings.py` to point to the correct location for static files:


```bash
STATIC_ROOT = "/var/www/domain.com/app/static/"
STATIC_URL = "/static/"
```

3.  Collect all the static files:
```bash
python manage.py collectstatic
```
-----------
#### In Django, handling static files—like CSS, JavaScript, and images—requires special attention because of how static content is served in production versus development. Let’s break it down:

Why Static Files Need Configuration ?

By default, Django is optimized for development, and during development, it automatically serves static files using its built-in development server. However, this approach isn't suitable for production due to performance and security concerns. Instead:

In Development:

   - Django's development server (e.g., when you run python manage.py runserver) handles static files directly, pulling them from the STATICFILES_DIRS or app-specific static folders (<app_name>/static).
You don't need to create or configure STATIC_ROOT or manually run collectstatic.

In Production:

   - A web server like Nginx or Apache should serve static files. This ensures better performance since serving static assets isn’t what Django’s application server (like Gunicorn) is designed for.
Django needs all static files from various apps to be gathered into a single directory, specified by STATIC_ROOT. This is why the collectstatic command is necessary.
Without a properly set STATIC_ROOT, you can't collect and serve static files efficiently in production.

Why Create the Directory Manually?

   - The directory defined by STATIC_ROOT (e.g., /var/www/domain.com/app/static/) is where Django collects all static files when you run:

```bash
python manage.py collectstatic
```

You need to create this directory manually because:

1. It's not automatically created by Django: Django only expects the STATIC_ROOT setting to point to an existing location.
  
2. Flexibility in deployment: You might want the static directory to be in a specific location, independent of Django’s project structure. For example, /var/www/... is commonly used in production setups.
   
Do You Need This in Both Production and Development?
   - In Production: Yes, always. The STATIC_ROOT directory and the collectstatic process are essential in production environments because Django doesn’t serve static files directly. Instead, the web server (e.g., Nginx) will use the collected files.
   - In Development: Not typically. Django's development server handles static files automatically using the STATICFILES_DIRS and app-specific static folders. You don't need to configure STATIC_ROOT or run collectstatic.

If you're testing a production-like environment locally, you might set it up in development to mirror production, but it’s optional.

#### Key Takeaway

The manual creation of the STATIC_ROOT directory and running collectstatic are production-specific requirements. In development, Django simplifies the process, but in production, separating the app logic from static file serving is critical for performance and scalability.

-----------
4.  Set the right permissions on the static files folder:

```bash
sudo chown -R www-data:www-data /var/www/domain.com/app/static
sudo chmod -R 755 /var/www/domain.com/app/static
```



### Setting Up the Gunicorn Service

Gunicorn will serve your Django app, so let’s set it up with a systemd service.

1.  Create the Gunicorn service file:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

2.  Add the following configuration:

```bash
[Unit]
Description=gunicorn daemon for Django project
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/domain.com/app
ExecStart=/var/www/domain.com/app/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 myproject.wsgi:application

[Install]
WantedBy=multi-user.target
```

3.  Check the permissions:

```bash
ls -l /etc/systemd/system/gunicorn.service
```

If the permissions need fixing:

```bash
sudo chmod 644 /etc/systemd/system/gunicorn.service
```

----------

### Starting the Gunicorn Service

1.  Enable and start Gunicorn:

```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
```


2.  To check that everything’s working:


```bash
sudo systemctl status gunicorn
``` 

----------

And that’s it! You’ve successfully set up your Django app with Nginx and Gunicorn. Your app is now ready to handle traffic in production, and you’ve ensured it’s secure and performant. Enjoy the smooth sailing!
