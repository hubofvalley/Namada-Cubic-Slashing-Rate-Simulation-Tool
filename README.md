# Cubic Slashing Rate Simulation Tool

This repository contains the source code and documentation for the Cubic Slashing Rate Simulation Tool by Grand Valley.

## Purpose of This Tool

This tool helps stakers understand Namada's unique Cubic Slashing system, which penalizes validators based on their voting power. It helps you assess risks, rewards, and encourages decentralized staking by spreading your stake across smaller validators.

## How Does Namada Slashing Work?

1. Think of slashing as a penalty: the more marbles (stake) a validator controls, the harsher the penalty if they misbehave.
2. When misbehavior happens, the validator is frozen – no one can withdraw their marbles until it's resolved.
3. The penalty increases if the validator controls more marbles, encouraging fair play.
4. The penalty is delayed, giving others time to react and protect their stake.
5. Validators can return after proving they’re ready to follow the rules again.

## Why Stake with Small Validators?

1. Think of a big jar: if it falls, everyone loses more. Spread your stake across many jars (smaller validators).
2. Spreading your marbles across jars protects your investment and strengthens the network.
3. Decentralization keeps the network secure and balanced.
4. Supporting smaller validators like Grand Valley promotes stability for Namada ([tnam1qyplu8gruqmmvwp7x7kd92m6x4xpyce265fa05r6](https://explorer75.org/namada/validators/tnam1qyplu8gruqmmvwp7x7kd92m6x4xpyce265fa05r6)).
5. Don’t put all your marbles in one jar – spread them for safety!

Let's Buidl Namada Together, Let's Shiedl Together. - Grand Valley

---

## How to Use the Simulation Tool

1. **Select Validator**: Choose a validator from the dropdown menu.
2. **Input Epoch**: Enter the epoch in which the infractions occurred.
3. **Input Infractions**: Enter the number of infractions for the selected epoch.
4. **Run Simulation**: Click the "Run Simulation" button to calculate the potential CSR and slashed NAM for the selected validator.
5. **View Results**: The simulation results will be displayed in the table below, showing the CSR percentage and the amount of slashed NAM for each validator.

---

## Hosting Guide

This guide provides instructions to host the website locally on **Windows** and **Ubuntu** systems.

### Hosting on Windows

#### Prerequisites:

1. **Node.js** installed (download from [nodejs.org](https://nodejs.org)).
2. A text editor (optional, e.g., Visual Studio Code).

#### Steps:

1. **Clone the Repo**
     ```bash
     git clone https://github.com/hubofvalley/Namada-Cubic-Slashing-Rate-Simulation-Tool.git
     cd Namada-Cubic-Slashing-Rate-Simulation-Tool
     ```

2. **Install Node.js and Dependencies**

   - Open Command Prompt or PowerShell.
   - Navigate to the project directory and run:
     ```bash
     npm install
     ```

3. **Start the Local Server**

   - After installation, start the server using:
     ```bash
     npm start -- --port=<your-port-number>
     ```
   - Replace `<your-port-number>` with your desired port (e.g., `3000`, `8080`).

4. **Access the Website**

   - Open your browser and visit `http://localhost:<your-port-number>`.

5. **Optional: Deploy on a Hosting Platform**
   - You can upload the project files to hosting services like Netlify, Vercel, or GitHub Pages (see additional instructions below).

---

### Hosting on Ubuntu

### Prerequisites:

1. **Install Node.js and npm**:

   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   ```

2. **Install Git**:

   ```bash
   sudo apt install -y git
   ```

3. **Install xdg-utils**:

   ```bash
   sudo apt install -y xdg-utils
   ```

4. **Install live-server**:
   ```bash
   npm install live-server --save-dev
   ```

### Steps:

1. **Clone the Project**:

   ```bash
   cd $HOME
   git clone https://github.com/hubofvalley/Namada-Cubic-Slashing-Rate-Simulation-Tool.git
   cd Namada-Cubic-Slashing-Rate-Simulation-Tool
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Grant Permissions**:

   ```bash
   sudo chmod +x $HOME/Namada-Cubic-Slashing-Rate-Simulation-Tool/node_modules/opn/xdg-open
   sudo chmod +x $HOME/Namada-Cubic-Slashing-Rate-Simulation-Tool/node_modules/.bin/live-server
   sudo chown $USER:$USER $HOME/Namada-Cubic-Slashing-Rate-Simulation-Tool
   sudo chown $USER:$USER /usr/bin/npm
   ```

4. **Set Up the Website as a Service**:

   - Create a systemd service file:

     ```bash
     sudo tee /etc/systemd/system/csr-tool.service > /dev/null <<EOF
     [Unit]
     Description=Cubic Slashing Rate Tool Service
     After=network.target

     [Service]
     Type=simple
     WorkingDirectory=$HOME/Namada-Cubic-Slashing-Rate-Simulation-Tool
     ExecStart=/usr/bin/npm start -- --port=<your-port-number>
     Restart=on-failure
     User=$USER

     [Install]
     WantedBy=multi-user.target
     EOF
     ```

5. **Start and Enable the Service**:

   ```bash
   sudo systemctl daemon-reload && \
   sudo systemctl enable csr-tool && \
   sudo systemctl restart csr-tool && sudo systemctl status csr-tool
   ```

6. **Access the Website**:
   - If hosting locally, visit `http://localhost:<your-port-number>` in your browser.
   - If hosting on a cloud server, use the server's **public IP address** with the specified port.

### Example:

If you want to use port 3000, your service file should look like this:

```bash
[Unit]
Description=Cubic Slashing Rate Tool Service
After=network.target

[Service]
Type=simple
WorkingDirectory=$USER/Namada-Cubic-Slashing-Rate-Simulation-Tool
ExecStart=/usr/bin/npm start -- --port=3000
Restart=on-failure
User=$USER

[Install]
WantedBy=multi-user.target
```

### Verify npm Path:

If `which npm` outputs a different path, use that path in the `ExecStart` line. For example, if `which npm` outputs `/usr/local/bin/npm`, update the service file accordingly:

```bash
ExecStart=/usr/local/bin/npm start -- --port=3000
```

By following these steps, you should be able to set up the CSR Tool service using a dedicated user, which is a better practice for security and isolation.

---

### Additional Notes:

- **Windows**: If `npm` or `node` commands are not recognized, ensure the Node.js installation path is added to your system's `PATH` environment variable.
- **Ubuntu**: If hosting on a server, make sure the firewall allows access to the specified port (e.g., configure `ufw` if necessary).

---

## Links

- [Grand Valley's X](https://x.com/bacvalley)
- [Valley of Namadillo](https://valley-of-namadillo.grandvalleys.com/)
- [Grand Valley's GitHub](https://github.com/hubofvalley)
