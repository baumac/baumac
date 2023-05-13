# Raspberry Pi Cluster

TODO change the workflow badge to be for this project.
[![CI](https://github.com/geerlingguy/pi-cluster/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/geerlingguy/pi-cluster/actions?query=workflow%3ACI)

A Kubernetes cluster of RaspbeSrry Pis that is provisioned using Ansible and uses Kong's API Gateway.

Inspired by _geerlingguy's_ [pi-cluster](https://github.com/geerlingguy/pi-cluster).

# Why

I use this cluster to learn more about Kubernetes and to self-host my personal website.

## Usage

1. Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) on your dev computer.
2. Install [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) on your dev computer.
3. Update the `hosts.ini` file to have the correct hostsnames for the `contral_plane` and `nodes`. 

### Raspberry Pi Setup

For each Pi, use the Raspberry Pi Image to install Raspberry Pi OS (64 bit, lite) on its SD card. Before installation, update the advanced configration in the Imager, and set the following options:
  - Set hostname: `node1.local` (set to `2` for node 2, `3` for node 3, etc.)
  - Enable Remote SSH: 'Allow public-key', and paste in my public SSH key(s)

Before proceeding further:
  - make sure each hostname is unique
  - make sure each hostname matches what is in `hosts.ini`

### SSH connection test

To test the SSH connection from my Ansible controller/development computer, connect to each server, and accept the hostkey:

```
ssh pi@node1.local
```

You can then test Ansible's connection with:

```
ansible all -m ping
```

It should respond with a 'SUCCESS' message for each node.

### Cluster configuration and K3s installation

Run the playbook:

```
ansible-playbook main.yml
```

When the playbook finishes the Kong Ingress controller and Kong API Gateway should be installed on the cluster.

This can be verified by ssh'ing into node 1 and running `curl -i localhost:80`.

You can also log into node 1, switch to the root user account (`sudo su`), then use `kubectl` to manage the cluster (e.g. view Drupal pods with `kubectl get pods -n drupal`).

The K3s' `kubeconfig` file is located at `/etc/rancher/k3s/k3s.yaml`. If you'd like to manage the cluster from other hosts (or using a tool like Lens), copy the contents of that file, replacing `localhost` with the IP address or hostname of the control plane node, and paste the contents into a file `~/.kube/config`.

### Upgrading the cluster

Run the upgrade playbook:

```
ansible-playbook upgrade.yml
```

### Shutting down the cluster

The safest way to shut down the cluster is to run the following command:

```
ansible all -m community.general.shutdown -b
```

