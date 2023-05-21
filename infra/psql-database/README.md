# PostgreSQL Database

A PostgreSQL database instance that runs on a Raspberry Pi.

## Table of Contents

<!-- TOC -->
* [PostgreSQL Database](#postgresql-database)
  * [Table of Contents](#table-of-contents)
  * [Tech Stack](#tech-stack)
  * [Usage](#usage)
    * [Raspberry Pi Configuration](#raspberry-pi-configuration)
    * [Development PC Configuration](#development-pc-configuration)
    * [Database Configuration](#database-configuration)
  * [Miscellaneous](#miscellaneous)
    * [Parts List](#parts-list)
<!-- TOC -->

## Tech Stack

<table>
    <tr>
        <th>Logo</th>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><img alt="Ansible logo" width="32" src="https://simpleicons.org/icons/ansible.svg"></td>
        <td><a href="https://www.ansible.com">Ansible</a></td>
        <td>Automate bare metal provisioning and configuration</td>
    </tr>
    <tr>
        <td><img alt="PostgreSQL logo" width="32" src="https://wiki.postgresql.org/images/a/a4/PostgreSQL_logo.3colors.svg"></td>
        <td><a href="https://www.ansible.com">PostgreSQL</a></td>
        <td>Open source relational database</td>
    </tr> 
    <tr>
        <td><img alt="Raspbian logo" width="32" src="https://www.raspberrypi.com/app/uploads/2021/10/cropped-Raspberry-Pi-Favicon-100x100-1-300x300.png"></td>
        <td><a href="https://www.raspbian.org/">Raspbian</a></td>
        <td>Base OS for database host</td>
    </tr>
    <tr>
        <td><img alt="Renovate logo" width="32" src="https://docs.renovatebot.com/assets/images/logo.png"></td>
        <td><a href="https://www.whitesourcesoftware.com/free-developer-tools/renovate">Renovate</a></td>
        <td>Automatically update dependencies</td>
    </tr>
</table>

## Usage

To create the PSQL Instance follow the below steps in order to configure the Raspberry Pi and create the database instance.

### Raspberry Pi Configuration

Use the Raspberry Pi Imager to install Raspberry Pi OS (64 bit, lite) on the Pi's SD card.
Prior to installation, update the advanced configuration in the Imager, and set the following options:
- Set hostname: `psql.local`
- Enable Remote SSH: 'Allow public-key', and paste in your public SSH key(s)

After the Pi has had its OS installed:
- Turn the pi
- Connect it to the same network as your Development PC

### Development PC Configuration
- Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- Clone this repo
- Open a terminal and run `cd ./ansible && ansible all -m ping` to verify that ansible can ssh into the Raspberry Pi at `psql.local`

### Database Configuration 

After all prerequisites have been completed, use your Development PC to run the below command, which will install and start the PSQL database instance.
```
ansible-playbook ./ansible/main.yml
```

## Miscellaneous 

### Parts List

- 1 x Raspberry Pi Model 3b+ 1gb RAM
- 1 x Samsung EV0+ 32GB microSD card
- 1 x MicroUSB cable for power delivery 
- 1 x 15cm Cat6 ethernet cables
