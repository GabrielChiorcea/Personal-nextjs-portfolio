---
title: "How to Set Up a Kubernetes Cluster on Linux Using MicroK8s or K3s"
description: "Kubernetes is an essential tool in the modern tech stack, and the ability to run it efficiently on Linux—whether for development or production—is crucial for developers and DevOps engineers."
image: "/images/blog/kubernetes.jpg"
date: "2024-12-28"
category: "Server"
---

In this article, we'll cover how to set up a Kubernetes cluster using two popular solutions: MicroK8s and K3s.

We’ll cover:

1. What MicroK8s and K3s are.
2. How to install each solution on a Linux system.
3. Setting up a functional cluster, either on a single machine or multiple nodes.
4. Testing the cluster with a practical example.


## What Are MicroK8s and K3s?

MicroK8s:

MicroK8s is a lightweight Kubernetes distribution developed by Canonical (the team behind Ubuntu). It’s designed to be:

1. Easy to install and configure, especially for Ubuntu users.
2. Ideal for local development or single-node setups.
3. Simple to expand by enabling preconfigured modules like DNS, the Kubernetes dashboard, or storage support.

<em>Use Cases</em>:
   - Local Kubernetes Development: Ideal for testing applications and scripts in a local Kubernetes environment.
   - CI/CD Pipelines: Its fast setup makes it great for continuous integration and delivery workflows.
   - Edge Computing: Small resource requirements make it well-suited for deploying Kubernetes on IoT or edge devices.
   - Educational Purposes: Simplified Kubernetes environment for learning and experimentation.

K3s:

K3s, developed by Rancher Labs, is a lightweight version of Kubernetes that:

1. Is designed for resource-constrained devices like Raspberry Pi or edge servers.
2. Reduces complexity by removing less commonly used components.
3. Works great for distributed clusters with multiple nodes, using a one-liner installation.

<em>Use Cases</em>:
   - Edge and IoT Devices: K3s is designed to work well in environments where computing power, memory, or storage is limited, such as edge devices or IoT gateways.
   - Small Clusters: It's perfect for small Kubernetes clusters or development environments that need to be fast and lightweight.
   - CI/CD Pipelines: Developers can use K3s to set up local Kubernetes clusters for testing or continuous integration purposes without the overhead of a full Kubernetes deployment.
   - Cloud and Virtualized Environments: You can use K3s for managing Kubernetes clusters in resource-constrained cloud instances or virtualized environments where Kubernetes might otherwise be too heavy.

<strong>Which one should you choose?</strong>

<em>Choose MicroK8s if you’re working on a single system or are in the Ubuntu ecosystem.</em>

<em>Choose K3s if you need a distributed cluster or are working with limited hardware.</em>


##  Prerequisites

Hardware Requirements:

- Single-node: At least 2 GB of RAM, 2 CPU cores.
- Multi-node: At least 2 GB of RAM per node with multi-core processors.
- Disk space: 20 GB per node (SSD recommended).

Software Requirements:
1. Operating System:
    - Ubuntu 20.04 or later (ideal for MicroK8s).
    - Other Linux distributions (Debian, CentOS, RHEL) work well with K3s.
2. Networking tools: Ensure the firewall allows Kubernetes traffic.
3. Root/sudo access on all nodes in the cluster.


## Installing and Configuring MicroK8s
Step 1: Install MicroK8s
MicroK8s can be installed easily using Snap. On Ubuntu-based systems:

```bash
sudo snap install microk8s --classic
```

Step 2: Configure the User
After installation, you’ll need to add your current user to the microk8s group:

```bash
sudo usermod -a -G microk8s $USER
sudo chown -R $USER ~/.kube
```
Restart your terminal session to apply the changes.

Step 3: Enable Useful Add-ons
MicroK8s comes with pre-installed but disabled add-ons. Enable commonly used ones:

```bash
microk8s enable dns dashboard storage
```

These will enable internal DNS, the Kubernetes dashboard, and storage.

Step 4: Check Cluster Status
Ensure everything is set up correctly:

```bash
microk8s status --wait-ready
```


## Installing and Configuring K3s
Step 1: Install the Master Node
On the main (master) node, run the following command to install K3s:

```bash
curl -sfL https://get.k3s.io | sh -
```

This will download and automatically configure K3s. A kubeconfig file will be generated and can be found at /etc/rancher/k3s/k3s.yaml.

Step 2: Get the Token
To add worker nodes, you’ll need the token generated during installation. Retrieve it with:

```bash
cat /var/lib/rancher/k3s/server/node-token
```

Step 3: Add Worker Nodes
On each worker node, install K3s and connect it to the master:
```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<TOKEN> sh -
```

Step 4: Verify the Cluster
On the master node, verify the connected nodes:

```bash
kubectl get nodes
```

## Testing the Cluster
To confirm that your cluster is working correctly, deploy a simple application:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --type=NodePort --port=80
```

Find the exposed port using:

```bash
kubectl get services
```
Access the application at http://<NODE_IP>:<PORT>.

## Troubleshooting Common Issues in Kubernetes Clusters

Even with a solid Kubernetes setup, issues are bound to arise. Here are some of the most common problems and how to address them effectively:

1. DNS Issues in MicroK8s
If DNS isn’t working:
  - Check if CoreDNS is running:
```bash
microk8s kubectl get pods -n kube-system
```  

  - If it's in CrashLoopBackOff, check the logs:
```bash 
microk8s kubectl logs -n kube-system <coredns-pod-name>  
```

  - Ensure that iptables isn’t blocking DNS traffic:
```bash
sudo iptables -F  
```

2. Worker Nodes Not Connecting in K3s
If a worker node isn’t showing up in kubectl get nodes:

   - Verify that you’re using the correct URL and token from the master node:
```bash
cat /var/lib/rancher/k3s/server/node-token  
```

Open port 6443 on the master node:
```bash
sudo ufw allow 6443/tcp
```
3. Service Inaccessible
If your applications are unreachable:

  - Check the NodePort for your service:
```bash
kubectl get services
```
  - Ensure readiness probes are properly configured:
```bash
kubectl describe pod <pod-name>  
```

  - Open the NodePort range (30000-32767):
```bash
sudo ufw allow 30000:32767/tcp  
```

4. Cluster Nodes in ‘NotReady’ State
If nodes are marked as NotReady:

   - Check hardware resources:
```bash
free -h
```

  - Make sure the container runtime (e.g., Docker/Containerd) is running:
```bash
sudo systemctl restart docker
```

   - Reinstall networking plugins:
```bash
microk8s enable dns flannel  
```

5. Pods Stuck in Pending State
When pods can’t be scheduled:

   - Inspect events for the pod:
```bash
kubectl describe pod <pod-name>  
```

   - Remove unnecessary taints from nodes:
```bash
kubectl taint nodes <node-name> key=value:NoSchedule-  
```

These tips will help you quickly diagnose and resolve most Kubernetes cluster issues. The key is to dive into logs and system events to pinpoint where things are breaking down. Good luck! 