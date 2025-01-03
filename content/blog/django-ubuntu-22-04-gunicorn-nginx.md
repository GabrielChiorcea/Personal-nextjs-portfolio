# Ghid pentru configurarea unui server Django cu Nginx și Gunicorn

Acest ghid te va învăța cum să configurezi un server web pentru o aplicație Django utilizând Nginx și Gunicorn pe un server Ubuntu. Vom aborda pașii pentru instalarea pachetelor necesare, crearea unui mediu virtual Python și configurarea serverului pentru a rula aplicația Django în producție.

## Pregătirea serverului

Începe prin actualizarea serverului și instalarea pachetelor necesare pentru a putea configura aplicația Django:

```bash

`sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv python3-dev libpq-dev nginx -y` 
```

Explicație:

-   `python3-pip`: Pachetul pentru instalarea de pachete Python.
-   `python3-venv`: Permite crearea unui mediu virtual pentru Python.
-   `python3-dev`: Pachetele de dezvoltare pentru Python.
-   `libpq-dev`: Bibliotecă necesară pentru interacțiunea cu PostgreSQL.
-   `nginx`: Server web de utilizat pentru a deservi aplicația Django.

### Crearea directorului pentru site

Următorul pas este să creezi directorul pentru fișierele aplicației tale Django.

```bash
`sudo mkdir -p /var/www/domain.com/app` 
```

Acum, setează permisiunile corecte pentru a permite accesul utilizatorului curent:

```bash

`sudo chown -R $USER:$USER /var/www/domain.com/app
sudo chmod -R 755 /var/www/domain.com` 
```

Aceste comenzi asigură că directorul are permisiuni corespunzătoare pentru a fi folosit de utilizatorul curent și pentru a fi accesibil pentru aplicațiile care rulează pe server.

### Configurarea Virtual Host în Nginx

Pentru a configura Nginx să servească aplicația Django, creează un fișier de configurare pentru domeniul tău.

```bash

`sudo nano /etc/nginx/sites-available/domain.com` 
```

Adaugă următoarea configurație:

nginx

`server {
    listen 80;
    server_name domain.com www.domain.com;

    root /var/www/domain.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}` 

Explicație:

-   Configurația de mai sus redirecționează traficul HTTP pe portul 80 către rădăcina site-ului tău. Dacă ai nevoie de HTTPS, vom configura SSL mai târziu.

#### Configurarea SSL

Pentru a asigura conexiuni securizate, este recomandat să folosești HTTPS. Dacă ai un certificat SSL de la Let's Encrypt, poți folosi următoarea configurație:

nginx

`server {
    listen 80;
    server_name domain.com www.domain.com;
    return 301 https://$host$request_uri;
}

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
}` 

Explicație:

-   Nginx va redirecționa traficul HTTP pe HTTPS și va gestiona fișierele statice pentru aplicația ta Django.
-   `proxy_pass` redirecționează cererile către Gunicorn, care rulează aplicația Django pe portul 8000.

### Activarea Virtual Host și repornirea Nginx

Activează configurația pentru Nginx prin crearea unui link simbolic:

```bash

`sudo ln -s /etc/nginx/sites-available/domain.com /etc/nginx/sites-enabled/` 
```

Verifică configurația Nginx pentru erori:

bash

`sudo nginx -t` 

Dacă nu sunt erori, repornește Nginx:

```bash

`sudo systemctl restart nginx
```

## 2. Configurarea proiectului Django

### Crearea unui mediu virtual pentru Python

Intră în directorul aplicației tale și creează un mediu virtual Python:

```bash

`cd /var/www/domain.com/app
python3 -m venv venv
source venv/bin/activate` 
```

Instalează Django și Gunicorn în mediul virtual:

```bash

`pip install django gunicorn` 
```

### Crearea proiectului Django

Acum, creează un proiect Django folosind comanda:

```bash

`django-admin startproject myproject .` 
```

### Testarea aplicației Django

Verifică dacă aplicația rulează corect prin utilizarea serverului de dezvoltare:

```bash

`python3 manage.py runserver` 
```

### Migrările bazei de date

Execută migrarea bazei de date pentru a crea structura inițială:

```bash

`python manage.py migrate` 
```

### Configurarea fișierelor statice

Django necesită un director pentru fișierele statice. Creează-l:

```bash

`mkdir -p /var/www/domain.com/app/static` 
```

Modifică `settings.py` pentru a configura locația fișierelor statice:

```python

`STATIC_ROOT = "/var/www/domain.com/app/static/"
STATIC_URL = "/static/"` 
```

Colectează fișierele statice:

```bash

`python manage.py collectstatic` 
```

Setează permisiunile fișierelor statice pentru utilizatorul `www-data`:

```bash

`sudo chown -R www-data:www-data /var/www/domain.com/app/static
sudo chmod -R 755 /var/www/domain.com/app/static` 
```

### Crearea unui serviciu Systemd pentru Gunicorn

Crează un fișier de serviciu pentru Gunicorn:

```bash

`sudo nano /etc/systemd/system/gunicorn.service` 
```

Adaugă următoarele setări:

ini

`[Unit]
Description=gunicorn daemon for Django project
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/domain.com/app
ExecStart=/var/www/domain.com/app/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8000 myproject.wsgi:application

[Install]
WantedBy=multi-user.target` 

Verifică permisiunile fișierului:

bash

`ls -l /etc/systemd/system/gunicorn.service` 

Permisiunile ar trebui să fie:

bash

`-rw-r--r-- 1 root root  [data] /etc/systemd/system/gunicorn.service` 

Dacă permisiunile nu sunt corecte, ajustează-le:

bash

`sudo chmod 644 /etc/systemd/system/gunicorn.service` 

### Activarea și pornirea serviciului Gunicorn

Activează și pornește serviciul:

bash

`sudo systemctl start gunicorn
sudo systemctl enable gunicorn` 

Verifică starea serviciului:

bash

`sudo systemctl status gunicorn` 

----------

enter code here
