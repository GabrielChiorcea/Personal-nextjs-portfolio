---
date: "2004-01-10"
title: "Hosting Server"
description: "A fully configured server to host all of my projects."
image: "/images/project/06.jpg"
color: "#BE0000"
category: "Server"

projectInfo:
  - title: "Client"
    data: "Worldwide"
  - title: "Timeline"
    data: "Completed"
  - title: "Hosting Stack"
    data: |
      - **Operating System:** Ubuntu 20.04 LTS
      - **Firewall:** UFW (Uncomplicated Firewall)
      - **Database:** MariaDB
      - **Web Server:** Nginx
      - **Application Server:** Gunicorn
      - **Programming Language:** Python
      - **CI/CD Pipeline:** Jenkins
      - **Monitoring & Logging:** Prometheus & Grafana
      - **Backup & Recovery:** BorgBackup & Restic
      - **Infrastructure as Code:** Ansible & Terraform
  - title: "Functions"
    data: |
      - High-performance web hosting
      - Automated deployment
      - Secure and scalable infrastructure
      - Continuous monitoring and alerting
      - Automated backups and disaster recovery
live:
  - link: '#'
---

## Server Configuration

To analyze the implemented configurations, a live session can be arranged where I will provide access for a joint review.

This project represents a dedicated hosting server for all my applications, configured to provide performance, security, and scalability. The server is optimized to run modern applications with minimal response time and high reliability.

### **Firewall (UFW)**
Uncomplicated Firewall (UFW) is configured to protect the server by restricting access to necessary ports.
- HTTP (80) and HTTPS (443) for web access
- SSH with IP restrictions for security, dedicate IP.
- Custom ports for internal services
- Rate limiting for brute-force attack protection

###  **Operating System - Ubuntu 20.04 LTS**
Ubuntu 20.04 LTS was chosen for its stability, long-term support, and excellent compatibility with most server-side applications.
- Optimized kernel for performance and security
- Swap tuning for efficient memory management
- Automatic security updates and periodic security audits

###  **MariaDB - Database Management System**
MariaDB is installed to support applications that require data storage, especially those involving user authentication and account management.
- Configured with master-slave replication for redundancy
- Optimized for performance using query caching and indexing
- Automatic daily backup and fast recovery when needed
- Secure access via SSL connections and role-based authentication


```ini
[mysqld]
bind-address = 127.0.0.1
max_connections = 500
thread_cache_size = 128
table_open_cache = 4000
query_cache_type = 1
query_cache_size = 64M
query_cache_limit = 2M
tmp_table_size = 64M
max_heap_table_size = 64M
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 1
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1
innodb_read_io_threads = 8
innodb_write_io_threads = 8
log_error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 1
server-id = 1
log_bin = /var/log/mysql/mysql-bin.log
expire_logs_days = 10

```

### **Nginx - Web Server and Reverse Proxy**
Nginx was chosen for its high performance and capability to function as a reverse proxy for Python-based web applications.
- Configured with gzip and static caching for improved load speeds
- Supports HTTP/2 and SSL with Certbot for security
- Load balancing and failover for high availability
- Rate limiting to prevent DDoS attacks


#### `nginx.conf` (Optimized Nginx Reverse Proxy Configuration with SSL & HTTP/2)
```nginx
server {
    listen 80;
    server_name excelstore.gabrielchiorcea.texh;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name excelstore.gabrielchiorcea.texh;

    ssl_certificate /etc/letsencrypt/live/excelstore.gabrielchiorcea.texh/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/excelstore.gabrielchiorcea.texh/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    client_max_body_size 10M;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```


### **Gunicorn - Python Application Server**
Gunicorn is used to run Python applications and ensure scalability.
- Configured as a systemd daemon for maximum uptime
- Uses worker threads to efficiently manage multiple connections
- Automatic restart in case of failure for increased resilience
- Supports WebSocket connections and asynchronous processing


#### `gunicorn.service` (Optimized Systemd Service for Gunicorn)
```ini
[Unit]
Description= excelstore
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/....
ExecStart=/usr/bin/gunicorn --workers 4 --threads 2 --bind 0.0.0.0:8000 --access-logfile /var/log/gunicorn/access.log --error-logfile /var/log/gunicorn/error.log wsgi:app

Restart=always
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
```



### **Jenkins - CI/CD Pipeline**
Jenkins is configured to automate the deployment process.
- Integrated with GitHub for automatic deployment
- Pipeline defined with Bash scripts to manage code in the document root
- Configured with SSL for secure access
- Auto-build trigger on every commit

### **Monitoring and Logging**
To ensure maximum uptime and rapid issue detection, the server includes:
- **Prometheus & Grafana** for metric monitoring and visual dashboards
- **Fail2Ban** to detect and block unauthorized access attempts
- **Elasticsearch & Kibana** for logging and traffic analysis

### **Backup and Disaster Recovery**
To protect data, the server has an automated backup and recovery system:
- **BorgBackup & Restic** for encrypted incremental backups
- **Automatic snapshots** for quick restoration
- **Disaster recovery plan** to restore the system in case of an attack

### **Automation and Security**
For each new project, I have created an automation script that:
- Automatically configures the application directory and Nginx vhost
- Generates and installs SSL via Certbot
- Adds the DNS zone in Cloudflare for easier management
- Creates backups and configures automatic monitoring

The server runs in a KVM virtualized environment, providing flexibility in resource allocation and easy migration.

This project demonstrates my knowledge of administering and configuring a professional hosting server capable of running modern applications in a secure and scalable environment.

---




