=============================================
LIMITLESS by Geoff Clark
PUBLISHED by CLARKTRIBEGAMES LLC
VERSION ALPHA 0.2.000.0000
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
Node.js.

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

2022.11.03-0015
- added logger with timestamp and info
- replaced all console.log with new logger feature
- added check to create new log file each session
- added check for if ./logs/ does not exist to create the dir
- added 'npm run start' from cli to start limitless

2022.11.02-1956
- updated versioning from vb.net style to node.js style
- added eslint and prettier to project
- added security to private key information
- secured env creation
- added magic and vault for future use

2022.10.25-1931
- added aa-sqlite module
- revamp db with aa-sqlite queries and removed the sqlite3 queries
- added db folder to env
- added dbAdd and dbDel to db queries

2022.10.25-1139
- removed sqlite for sqlite3 and nw-gyp
- created db functions with dbUpdate, dbGetVal, dbGetCol, dbGetRow for db queries
- added default db name for env

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
