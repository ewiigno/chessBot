# chessBot (NOT FINISHED!)

This bot is using discord.js and is made to play chess on your discord server
Important note: all commands displayed need to be used with a prefix. The standard prefix is `!` . For example you type `!help` instead of `help`.

# How to get this bot
Download the files and run chess.js with node (I will probably find a better solution when I´m finished with this bot).

## All commands for this bot
#### commands in every channel

help   => show all available commands
challenge [username/nickname/id]   => challenge a player for a chess game
accept   => accept first of outstanding challenges
accept [username/nickname/id]   => accept a specific challenge
deny   => deny all challenges
deny [username/nickname/id]   => deny a specific challenge


#### commands in a chess channel

move [currentField] [endField]    => move a piece
update    => update board
surrender    => surrender
draw   => offers your opponent a draw
draw [accept/deny/offer]   => accepts/denies/offers a draw
player   => see who's playing
delete   => delete this channel when the game is over 


## How to use it?

#### challenge and accept
First you need to challenge an other player that is a member of your guild. Do this by using `challenge [username/nickname/id]`. As you can see you can use the name, the nickname or the id of this user. You can have several challenges active at the same time.
To accept a challenge you need to use either `accept [username/nickname/id]` or just `accept`. With these commands you accept the first challenge that fits.

#### in a chess channel
When a challenge gets accepted, a new channel will appear. This is where these two players can play their own game. Again, there can be several games at the same time.
The most important commmand is `move [currentField] [endField]`. This is how you move your pieces. The fields in this commands display the coordinates on a chess game which are always one letter and one number. An example for this command with the standard prefix is `move c2 c3`. Be aware that a move must be possible.

