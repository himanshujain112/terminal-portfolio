let isTyping = false;
const bootElement = document.getElementById("boot");
const input = document.getElementById("commandInput");

const asciiLogo = `
  ___ ___ __                            __          __       
 |   Y   |__.--------.---.-.-----.-----|  |--.--.--|  .-----.
 |.  1   |  |        |  _  |     |__ --|     |  |  ||_|__ --|
 |.  _   |__|__|__|__|___._|__|__|_____|__|__|_____|  |_____|
 |:  |   |                                                   
 |::.|:. |                                                   
 '--- ---'                                                   
  _______            __    ___       __ __                   
 |   _   .-----.----|  |_.'  _.-----|  |__.-----.            
 |.  1   |  _  |   _|   _|   _|  _  |  |  |  _  |            
 |.  ____|_____|__| |____|__| |_____|__|__|_____|            
 |:  |                                                       
 |::.|                                                       
 '---'                                                       
`;

const bootLines = [
	"Login: himanshu",
	"Password: ********",
	"Access granted.",
	"Booting up Himanshu's Terminal Portfolio...",
	"Loading modules...",
	"Initializing UI components...",
	"Establishing secure connection...",
	"System ready. Type 'help' for a list of commands.\n",
];

const commands = {
	help: `
Available commands: 
	help		: # show all available commands
	whoami		: # Short bio
	projects	: # Lists my awesome projects
	contact		: # show email/socials
	sysinfo		: # Try it yourself
	resume		: #opens downloadble PDF resume
	clear		: # clears screen\n`,
	whoami: "I am Himanshu Jain, a backend developer and game dev enthusiast.\n",
	projects: `
1. Elemently ~ Chrome Extension
   📝 Description : A productivity tool that allows users to remove, hide, or extract elements from any webpage in real time.
   👤 Type        : Solo Project
   🛠️ Tech Stack  : HTML, CSS, JavaScript, Chrome Extensions API
   🚀 Status      : Live
   🔗 Repo        : github.com/himanshujain112/Elemently-chrome-extension

2. HackLeague ~ Discord Bot
   📝 Description : An AI-powered Discord bot that delivers coding challenges, validates your solutions, and tracks progress.
   👤 Type        : Solo Project
   🛠️ Tech Stack  : Python (discord.py), Gemini API, AWS EC2, Vim
   🌟 Features    : Daily challenges, AI code review, leaderboard, auto roles
   🚀 Status      : Live (10+ servers, 500+ users)
   🔗 Invite      : discord.com/oauth2/authorize?client_id=1353039280800268471

3. Climoo ~ Gamified Mobile App
   📝 Description : A cozy weather + mood tracking app with ambient design and a virtual companion to cheer you up.
   👤 Type        : Solo Project
   🛠️ Tech Stack  : FastAPI, PostgreSQL, Godot 4.4
   🌟 Features    : Mood logger, weather updates, virtual buddy, profile sync
   🚧 Status      : MVP in progress
   🔗 Devlog      : debuglife.fun/2025/05/Climoo-app-devlog-1.html

4. Terminal Portfolio ~ Personal Website
   📝 Description : A command-line inspired interactive portfolio to explore my projects and background like a terminal UI.
   👤 Type        : Solo Project
   🛠️ Tech Stack  : HTML, CSS, JavaScript
   🌟 Features    : Typing effects, command parser, easter eggs
   🚀 Status      : Live
   🔗 Live        : himanshujain.me
\n\n`,
	contact: `
Email		: Himanshujain82669@Gmail.com
GitHub		: github.com/himanshujain112
Instagram	: @Himanshu_jain112\n
`,

	sysinfo: `System Info:\nOS: PortfolioOS v1.0\nRAM: 16GB Terminal Memory\nCPU: Brainstorm Engine 3.14GHz\nUptime: ${Math.floor(
		Math.random() * 300
	)} mins\n`,
	matrix: "Switching to Matrix mode...\n(Feature coming soon)\n",
	"unlock pro":
		"Unlocking Pro Mode... Enhanced features activated!\nASCII effects, dynamic system info, glowing UI. More coming soon!\n",
	clear: "__CLEAR_SCREEN__",
};

async function typeWords(line, delay = 60) {
	isTyping = true; // 🔒 Lock input
	input.disabled = true;
	const words = line.split(" ");
	let index = 0;
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (index >= words.length) {
				clearInterval(interval);
				bootElement.innerHTML += "\n";
				isTyping = false;
				input.disabled = false;
				input.focus();
				resolve();
			} else {
				bootElement.innerHTML += words[index++] + " ";
				bootElement.scrollTop = bootElement.scrollHeight;
			}
		}, delay);
	});
}

async function showBootSequence() {
	bootElement.innerHTML += asciiLogo + "\n";
	for (const line of bootLines) {
		await typeWords(line);
	}
}

showBootSequence();

input.addEventListener("keydown", async function (event) {
	if (event.key === "Enter") {
		const command = input.value.trim();
		bootElement.innerHTML += `> ${command}\n`;

		if (command in commands) {
			const response = commands[command];
			if (response === "__CLEAR_SCREEN__") {
				bootElement.innerHTML = asciiLogo;
			} else {
				input.value = "";
				await typeWords(response);
			}
		} else {
			input.value = "";
			await typeWords(`Command not found: ${command}`);
		}
		input.value = "";
	}
});
