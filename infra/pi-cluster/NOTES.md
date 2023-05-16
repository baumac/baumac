# Future improvements
- Structure project
  - apps/* for apps
    - apps/*/charts for helm charts + deployments
    - apps/*/dockerfile for image
  - deployments/apps/* for argocd apps
  - pi-kluster/* for k3s cluster + provisioning
    - maybe rename this?
- ArgoCd apps to add:
 - monitoring (prometheus + grafana)
 - KIC
 - Kong Gateway
 - personal website
 - external dns
- Configure external dns
- Document how things are post-provisioning https://www.pidramble.com/wiki/setup/provision


# Commands
ssh-keygen -R node1.local
ssh-copy-id -i ~/.ssh/id_ed25519.pub pi@node1.local
export ANSIBLE_CONFIG=/mnt/c/Users/mjbau/Desktop/kluster/ansible.cfg
ansible all -m ping
ansible-playbook main.yml
curl -i 192.168.1.22:80
curl -i node1.local/echo

kubectl port-forward service/cluster-monitoring-kube-pr-prometheus 9090
ssh -L 9090:localhost:9090 pi@node1.local

kubectl get services -n monitoring
kubectl -n monitoring port-forward service/monitoring-grafana 3000:80
ssh -L 3001:127.0.0.1:3000 pi@node1.local
http://localhost:3001/login
username:admin password:prom-operator 

kubectl get services -n kong

kubectl get secrets/monitoring-grafana -n monitoring -o go-template='
{{range $k,$v := .data}}{{printf "%s: " $k}}{{if not $v}}{{$v}}{{else}}{{$v | base64decode}}{{end}}{{"\n"}}{{end}}'

# Debugging
kubectl describe pod promstack-grafana-68cbcc76bd-qbrd --namespace monitoring
kubectl exec -it {pod_name}
kubectl logs promstack-grafana-68cbcc76bd-qbrd --namespace monitoring --all-containers=true
kubectl logs promstack-grafana-68cbcc76bd-qbrd --namespace monitoring -c grafana -p

# Stopping point
- https://github.com/geerlingguy/pi-cluster

# Resources

- Parts list
  - 1 x Raspberry Pi Model 4b 4gb (master node)
  - 3 x Raspberry Pi Model 4b 2gb (worker node)
  - 4 x Samsung EV0+ 32GB microSD card
  - 4 x Raspberry Pi Poe HAT
  - 4 x Raspberry Pi Stackable Case
  - 4 x 15cm Cat6 etherent cables
  - 55W 4xPoE+ 5-port Gigabit Network Switch

- GeerlingGuy's guide
  - Part 1: [Let's Build a Raspberry Pi Cluster](https://www.youtube.com/watch?v=1SvNkdTzUng)
  - Part 2: [Configure microSD cards and Raspbian OS](https://www.youtube.com/watch?v=RZugKrvxWIQ)
  - Part 3: [Network a Cluster of Raspberry Pis](https://www.youtube.com/watch?v=RWT8Rhcya3o)
  - Part 4: [Provision LEMP with Ansible on a Raspberry Pi Cluster](https://www.youtube.com/watch?v=wgMFt2menlw)
  - Part 5: [Deploy Drupal 8 with Ansible on a Raspberry Pi Cluster](https://www.youtube.com/watch?v=S6WkYzF6I4A)
  - [Assembly](https://www.youtube.com/watch?v=M6zGntFBNw4)





rm - vrf $KONG_PREFIX/pids