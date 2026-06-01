# Region Challenge Discord Bot
 
A Discord bot for League of Legends groups to randomly select challenges, track wins, and assign roles to players.
 
## Features
 
- **Random Challenge Selection** — Picks a random challenge from a predefined list so your group always has something new to play
- **Win Tracking** — Records and stores wins per player directly on your Discord server
## Prerequisites
 
- [Node.js](https://nodejs.org/) v16 or higher
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))
## Installation
 
1. Clone the repository:
   ```bash
   git clone https://github.com/olotolo/Region-Challenge-Discord-Bot.git
   cd Region-Challenge-Discord-Bot
   ```
 
2. Install dependencies:
   ```bash
   npm install
   ```
 
3. Create a `.env` file in the root directory and add your bot token:
   ```
   TOKEN=your_discord_bot_token_here
   ```
 
4. Start the bot:
   ```bash
   node index.js
   ```
 
## Usage
 
| Command | Description |
|---|---|
| `!challenge` | Randomly selects a challenge for the group |
| `!win @player` | Records a win for the mentioned player |
| `!stats` | Shows the current win standings |
| `!roles` | Randomly assigns League of Legends roles to players |
 
## Built With
 
- [Node.js](https://nodejs.org/)
- [discord.js](https://discord.js.org/)
## Author
 
**Ole Schlichting** — [GitHub](https://github.com/olotolo)
 
