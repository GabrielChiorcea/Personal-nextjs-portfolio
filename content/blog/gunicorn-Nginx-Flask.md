Configurarea Gunicorn și Nginx pentru a rula una sau mai multe aplicații Flask

Atunci când dezvoltați aplicații Flask, ajungeți într-un moment învân care acestea trebuie să fie accesibile într-un mediu de producție. Combinarea Gunicorn și Nginx este una dintre cele mai populare soluții pentru a asigura performanțe și stabilitate.

În acest articol, vom detalia fiecare pas necesar pentru configurarea acestora astfel încât să puteți rula una sau mai multe aplicații Flask pe un server Linux.

Ce este Gunicorn și de ce avem nevoie de el?

Gunicorn (Green Unicorn) este un server WSGI performant, conceput pentru a servi aplicații Python, inclusiv Flask. El gestionează cererile clienților și le transmite aplicației Flask, oferind suport pentru mai multe conexiuni simultan prin utilizarea proceselor multiple de lucru (workers).

Pe de altă parte, Nginx este un server web care acționează ca un proxy invers, servind fișiere statice și redirecționând cererile dinamice către Gunicorn.

Pasul 1: Instalarea dependențelor

Asigurați-vă că toate pachetele necesare sunt instalate:

sudo apt update
sudo apt install python3 python3-venv python3-pip nginx

Pasul 2: Crearea aplicațiilor Flask

Pentru acest exemplu, vom configura două aplicații Flask (App1 și App2). Fiecare aplicație va avea propriul director, unde vom configura un mediu virtual Python.

Configurarea aplicației App1

Creați directorul pentru aplicație:

mkdir -p ~/apps/app1
cd ~/apps/app1

Configurați un mediu virtual Python:

python3 -m venv venv
source venv/bin/activate
pip install flask gunicorn

Creați fișierul aplicației Flask app.py:

from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from App 1!"

if __name__ == "__main__":
    app.run()

Repetați acești pași pentru App2, utilizând un alt director, cum ar fi ~/apps/app2, și modificați conținutul funcției hello() pentru a diferenția aplicațiile.

Pasul 3: Configurarea Gunicorn

Testați rularea aplicației folosind Gunicorn:

gunicorn -w 3 -b 127.0.0.1:8001 app:app

Acest exemplu folosește 3 worker-uri și ascultă pe portul 8001. Adăugați opțiunea --daemon pentru a rula în fundal:

gunicorn -w 3 -b 127.0.0.1:8001 --daemon app:app

Crearea unui serviciu systemd pentru App1

Pentru o gestionare mai ușoară, vom crea un fișier de serviciu systemd pentru fiecare aplicație. De exemplu, pentru App1:

Creați fișierul /etc/systemd/system/app1.service:

[Unit]
Description=Gunicorn instance for App 1
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/home/your_user/apps/app1
ExecStart=/home/your_user/apps/app1/venv/bin/gunicorn -w 3 -b 127.0.0.1:8001 app:app

[Install]
WantedBy=multi-user.target

Porniți și activați serviciul:

sudo systemctl start app1
sudo systemctl enable app1

Repetați acest proces pentru App2, schimbând porturile și căile corespunzătoare.

Pasul 4: Configurarea Nginx

Vom configura Nginx ca proxy invers pentru a redirecționa traficul către Gunicorn.

Configurarea Nginx pentru App1

Creați fișierul de configurare: /etc/nginx/sites-available/app1

server {
    listen 80;
    server_name app1.example.com;

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

Activați configurația site-ului:

sudo ln -s /etc/nginx/sites-available/app1 /etc/nginx/sites-enabled

Testați configurația Nginx și reporniți serverul:

sudo nginx -t
sudo systemctl reload nginx

Repetați acest proces pentru App2, folosind un alt nume de domeniu (și port).

Pasul 5: Testarea Configurației

Porniți serviciile Gunicorn pentru toate aplicațiile:

sudo systemctl start app1
sudo systemctl start app2

Accesați aplicațiile în browser:

http://app1.example.com pentru App1

http://app2.example.com pentru App2

Pasul 6: Asigurarea securității cu SSL

Pentru a securiza aplicațiile cu SSL, folosim Certbot:

Instalați Certbot:

sudo apt install certbot python3-certbot-nginx

Obțineți certificatul SSL:

sudo certbot --nginx -d app1.example.com

Repetați pentru celelalte domenii. Certbot va configura automat SSL în Nginx.

Concluzie

Prin configurarea Gunicorn și Nginx, am creat un mediu robust și scalabil pentru a rula una sau mai multe aplicații Flask. Acest setup este ideal pentru medii de producție, oferind performanțe și securitate. Dacă aveți întrebări sau sugestii, lăsați un comentariu!
