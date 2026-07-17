terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.66.0" # This grabs 1.66.1, 1.66.2, etc., safely.
    }
  }
}
provider "hcloud" {
  token = var.hcloud_token
}

# 1. Upload your local SSH key to Hetzner
resource "hcloud_ssh_key" "my_key" {
  name       = "reaper-macbook-key"
  public_key = file(var.ssh_key_path)
}

# 2. Create the Cloud Firewall (Only allow Web and SSH traffic)
resource "hcloud_firewall" "web_firewall" {
  name = "web-firewall"

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }

  rule {
    direction  = "in"
    protocol   = "tcp"
    port       = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

# 3. Provision the Server (Using the updated CX23 plan)
resource "hcloud_server" "test_server" {
  name        = "nuxt-test-server"
  image       = "ubuntu-24.04"
  server_type = "cx23"  # UPDATED: 2 vCPU, 4GB RAM (~€5.99/mo)
  location    = "fsn1"  # Falkenstein, Germany
  
  ssh_keys     = [hcloud_ssh_key.my_key.id]
  firewall_ids = [hcloud_firewall.web_firewall.id]
  
  # Inject the Bash script
  user_data = file("setup.sh")
}

# 4. Output the new Server's IP address when done
output "server_ip" {
  value = hcloud_server.test_server.ipv4_address
}