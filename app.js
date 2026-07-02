const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});
const games = {}
// everything is hereeee
app.command('/playxo', async ({ command, ack, respond }) => {
  await ack();                   
  const input = command.text;     
  const user = command.user_id;
  const channel = command.channel_id;
if (input === "") { 
await respond({text:"use /playxo startgame to play!"})
return;
}
if (input === "startgame") {
    games[user] =  { 11:"0",12:"0",13:"0",21:"0",22:"0",23:"0",31:"0",32:"0",33:"0",}
   await respond({text:"Got it! i started a game, say your first move by using /playxo 1,1(replace with whatever you'd like 1-3). You're X"});
   return;
}
const board = games[user]

if (!board) {
    await respond({text:"you havent started a game! Use /playxo startgame to play!"})
    return;
}
if (input.length === 3 && input.includes(',')){

let x = Number(input.slice(0,1))
let y = Number(input.slice(2,3))
let together = x.toString()+y.toString()
if (x === x && y === y){//checks if NaN
if ((x <= 3 && y <= 3)&&(x>0 && y>0)){//not bigger than 3 and not lower than 1
//await app.client.chat.postMessage({ channel: channelId, text: 'hi' });
if (iswin(x) === true || iswin(y) === true) {
  let winner = iswin(x) === x ? "you win!":"bot wins"
}
if (board[together] === "0") {
function iswin(player) {
   return ((board[11] === player && board[21] === player && board[31] === player) || (board[12] === player && board[22] === player && board[32] === player) || (board[13] === player && board[23] === player && board[33] === player))
/*vertical*/ || ((board[11] === player && board[12] === player && board[13] === player) || (board[21] === player && board[22] === player && board[23] === player) || (board[31] === player && board[32] === player && board[33] === player))
/*diagonal*/ || (board[11] === player && board[22] === player && board[33] === player || board[13] === player && board[22] === player && board[31] === player);
}
function getrandomspot() {
  let r = Math.floor((Math.random()*3)+1).toString()
  let c = Math.floor((Math.random()*3)+1).toString()
return r+c;
}

board[together] = "X"
 let randomspot = getrandomspot()
 let d = 0
 if (board[randomspot] != "0") {
  do {randomspot = getrandomspot();d++;if (d>18) {break}}
  while (board[randomspot] != "0")
  } else {board[randomspot] = "O"} 
  board[randomspot] = "O"
 let visualboard = `\`\`\`

      |     |     
   ${board[11]}   |  ${board[21]}  | ${board[31]}  
_ _ _ |_ _ _|_ _ _
      |     |     
   ${board[12]}   |  ${board[22]}  |  ${board[32]}
_ _ _ |_ _ _|_ _ _
      |     |     
   ${board[13]}   |  ${board[23]}  |  ${board[33]}
      |     |
  \`\`\``;

await respond({ text: visualboard, response_type: "in_channel" })

} else {await respond({text:"sorry,this spot is taken, choose another!"})}
} else {await respond({text:"sorry, there is only 3 rows and collumns 1-3 and 1-3(first number = across 1-3, second = down 1-3)"}); return;}
} else {await respond({text:"sorry, Not a Number, please say coords like 1,3 and 2,1 (first number = across 1-3, second = down 1-3)"}); return;}
} else {await respond({text:"sorry, please say coords like 1,3 and 2,1 (first number = across 1-3, second = down 1-3)"}); return;}

});

(async () => {
  await app.start();
  console.log('bot running');
})();