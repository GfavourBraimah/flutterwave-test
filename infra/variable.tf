variable "hcloud_token" {
  description = "Hetzner Cloud API Token"
  type        = string
  sensitive   = true
}

variable "ssh_key_path" {
  description = "Path to your local public SSH key"
  type        = string
  default     = "~/.ssh/id_rsa.pub" # Change this to ~/.ssh/id_ed25519.pub if you use ed25519
}