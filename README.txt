THIS VERSION HAS BEEN ABORTED DUE TO ENTIRE STRUCTURE CHANGES THAT WILL NEED TO OCCUR FOR THE GAME TO HAPPEN

For the new version of this title, go to:   https://github.com/AznIronMan/Limitless

The following is now an archive.

=============================================
LIMITLESS by Geoff Clark
PUBLISHED by CLARKTRIBEGAMES LLC
VERSION ALPHA 0.2.1
=============================================

SUPPORT THE DEVELOPMENT OF THIS GAME @ 

 https://www.patreon.com/clarktribegames
 https://paypal.me/aznblusuazn

JOIN THE COMMUNITY ON FACEBOOK OR DISCORD

  https://facebook.com/clarktribe.games
  https://discord.gg/6kW4der

=============================================

This game is written in Node.js and should
work on any operating system that supports
Node.js v19.0.0 or higher.

https://nodejs.org/en/download/

=============================================

ABOUT THIS GAME

LIMITLESS is an arena game that will be 
completely customizable.  It is a homage to 
the old school late 80's-90's RPG games, 
specifically the turn based battle.  This 
game will be completely customizable.  Some
of the features will include the ability to
"level up" your chosen character, the NPC 
players to "level up", and an option for the
game world to develop while not in game play.

This is very early development, not playable 
at this time.

This game was inspired by the author's kids 
and their love for arena/simulation games and
the author's enjoyment of late 80's-90's RPG 
games.

Music in Limitless provided by BenSound.com 
Please check out their site for awesome free
music! -- https://www.bensound.com

See the TODO.txt for developing ideas/features
on https://github.com/AznBlusuazn/Limitless/

Copy of this code without the content of the 
Author is prohibited.

Contact the author:  info@clarktribegames.com

=============================================

COPYRIGHT AND TRADEMARK DISCLAIMER

*ALL PRODUCT AND COMPANY NAMES ARE TRADEMARKS
OR REGISTERED(R) TRADEMARKS OF THEIR
RESPECTIVE HOLDERS.  USE OF THEM DOES NOT
IMPLY ANY AFFILIATION WITH OR ENDORSEMENT BY
THEM.*

=============================================

DEVELOPMENT NOTES

[CURRENT UPDATE]

ALPHA 0.2.1 - "THE REBIRTH"

2022.11.06-2133
- small gitignore modification for dev environment
- removed tools from file structure and added assets and js instead
- added clientLauncher to index after server is started
- added server shutdown when client window is closed
- added google api variable check and correction to prevent false warnings when starting client
- changed main client page from index to welcome
- added html and js to welcome as placeholder

2022.11.05-1752
- remapped game folders/files to be built out in the user home profile instead of install directory
- added condition for Limitless data folder to be made in Documents if on Windows system
- added condition for mac/Linux that if user is root to create the gamefiles in install directory
- added express module
- created ui folder with a placeholder index.html for splash page
- moved launcher to the index.js

2022.11.04-1419
- removed debug from env and switched to a simplier way to detect the debug mode (for dev only)
- simplified the error exit if the initial checks fail
- reordered some of the startup checks for better efficiency
- added node version requirement to readme
- added section comments in startup
- added db version checker
- fixed db queries from potential error
- added warnings for higher or lower db version numbers

2022.11.03-2217
- added logger with timestamp and info
- replaced all console.log with new logger feature
- added check to create new log file each session
- added check for if ./logs/ does not exist to create the dir
- added 'npm run start' from cli to start limitless
- added debugger mode (DEBUG=true in .env) for no logs, only stdout for logging
- added logic to determine stdout or logfile
- fixed logger issue with circular dependency error
- added cli running function in filer
- added keypress prompt and wait for response functions in logger
- added checks for node modules, db folder, db file, and env file with fail prompt and exit if cannot be created/foundation
- added os detection for multi platform support (windows, macos, and linux at this time)
- swapped out switch case for object literals in logger
- added ctg cloud db reader
- added url downloader to filer
- added default db download from ctg cloud if no db is found
- added find and create if not found - avatars, music, saves, and sound folders
- renamed db folder to data
- removed dbDir from env file and made it a const in the vault
- fixed an error in the checkEnv logic
- added header to env file
- added headers to the sections in the vault file

2022.11.02-1956
- updated versioning from vb.net style to node.js style
- added eslint and prettier to project
- added security to private key information
- secured env creation
- added magic and vault for future use

2022.10.25-1931
- removed sqlite for sqlite3 and nw-gyp
- created db functions with dbUpdate, dbGetVal, dbGetCol, dbGetRow for db queries
- added default db name for env
- added aa-sqlite module
- revamp db with aa-sqlite queries and removed the sqlite3 queries
- added db folder to env
- added dbAdd and dbDel to db queries

2022.10.24-2026
- node.js foundation established 
- added sqlite, fs-extra, dotenv modules
- added .env file placeholder
- added filer and startup functions
- updated readme to reflect new changes
- updated license
- added default database from archived builds (as placeholder for now)
- created new github (https://github.com/AznBlusuazn/Limitless) and archived the former githubs
- archived githubs are https://github.com/AznBlusuazn/Limitless-OldVB and https://github.com/AznBlusuazn/Arena

=============================================
