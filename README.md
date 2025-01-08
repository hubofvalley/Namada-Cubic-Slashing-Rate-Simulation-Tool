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
1. **Download or Clone the Project**
   - Download the ZIP file from the GitHub repository, or use the following command:
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
     npm start
     ```
   - The local server will run at `http://localhost:3000` (or a different port if specified in `package.json`).

4. **Access the Website**
   - Open your browser and visit `http://localhost:3000`.

5. **Optional: Deploy on a Hosting Platform**
   - You can upload the project files to hosting services like Netlify, Vercel, or GitHub Pages (see additional instructions below).

---

### Hosting on Ubuntu

#### Prerequisites:
1. **Node.js** and **npm** installed:
   - Install Node.js:
     ```bash
     sudo apt update
     sudo apt install -y nodejs npm
     ```

2. **Git** installed:
   - Install Git:
     ```bash
     sudo apt install -y git
     ```

#### Steps:
1. **Clone the Project**
   - Open the terminal and run:
     ```bash
     git clone https://github.com/hubofvalley/Namada-Cubic-Slashing-Rate-Simulation-Tool.git
     cd Namada-Cubic-Slashing-Rate-Simulation-Tool
     ```

2. **Install Dependencies**
   - Inside the project directory, run:
     ```bash
     npm install
     ```

3. **Start the Local Server**
   - Run the following command to start the local server:
     ```bash
     npm start
     ```
   - The server will run at `http://localhost:3000`.

4. **Optional: Run the Server Permanently**
   - If you want the server to run continuously on an Ubuntu server:
     - Install **PM2** (a process manager for Node.js):
       ```bash
       sudo npm install -g pm2
       ```
     - Start the server with PM2:
       ```bash
       pm2 start npm -- start
       pm2 save
       pm2 startup
       ```

5. **Access the Website**
   - If hosting locally, visit `http://localhost:3000` in your browser.
   - If hosting on a cloud server, use the server's **public IP address**.

---

### Additional Notes:
- **Windows**: If `npm` or `node` commands are not recognized, ensure the Node.js installation path is added to your system's `PATH` environment variable.
- **Ubuntu**: If hosting on a server, make sure the firewall allows access to port 3000 (e.g., configure `ufw` if necessary).

---

## Links
- [Grand Valley's X](https://x.com/bacvalley)
- [Valley of Namadillo](https://valley-of-namadillo.grandvalleys.com/)
- [Grand Valley's GitHub](https://github.com/hubofvalley)
