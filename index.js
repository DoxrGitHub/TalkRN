import { getUserInfo } from "@replit/repl-auth";
import express from "express";
import { Server } from "socket.io"
import ejs from "ejs";
import { SignJWT, importPKCS8 } from "jose";
import { createServer } from "http";
import Filter from "bad-words";
import Client from "@replit/database";
import cookieParser from 'cookie-parser';
import axios from "axios"

const app = express()
const http = createServer(app);
const io = new Server(http);
const filter = new Filter();
const client = new Client();

app.use(cookieParser());
app.set("views", "views");
app.set("view engine", "ejs");
app.engine('html', ejs.renderFile);

//const messagesKey = await importPKCS8(process.env.MESSAGES_JWT_PRIVATE_KEY.replaceAll("  ", "\n"), "RS256");

/* 
if (filteredMessage.startsWith("@charles")) {
    io.emit('chat message', JSON.stringify({ 
        msg: sendLlamaRequest(filteredMessage, "You are a cool friend.", 1, 400), 
        name: 'Charles', 
        avatar: 'https://th.bing.com/th/id/R.f2ae9fb395860bc6b659f5434aca7e4e?rik=x91x0EDojGTK2w&pid=ImgRaw&r=0', 
        hideUsername: false, 
        flair: flairs['charles'] || null 
    }));
}
*/

const owner = ["doxr", "chasejor1665" ,"FBI-CONNECT", "akashkar0766"];
const mods = ["doxr", "FrankVolante", "GrimSteel", "GrantKates", "Firepup650", "chasejor1655", "amTyche", 'FBI-CONNECT'];
const muted = [];
let bannedUsers = [];
const bypassFilters = ["PrabhavKondapal", "PrabhavChuchra", "doxr", "KarshakMatham", "ShayaanMogal", "Firepup650"];
const noPfp = ["https://i2.wp.com/replit.com/public/images/evalbot/evalbot_17.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_18.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_19.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_20.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_21.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_22.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_23.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_24.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_25.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_26.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_27.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_28.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_29.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_30.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_31.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_32.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_33.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_34.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_35.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_36.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_37.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_38.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_39.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_40.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_41.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_42.png", "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_43.png"];

const customJoinMessages = {
  "doxr": "*The owner, @doxr, has arrived to TalkRN*",
  "CoderElijah": "*CoderElijah from Ask joined this chat.*",
  "ShayaanMogal": "*ShayaanMogal joined TalkRN.*",
  "Firepup650": "*The spoofer, Firepup650, has joined the room*"
};

const flairs = {
  doxr: {
    text: "OWNER",
    bg: "white",
    color: "darkblue",
    usernameColor: "cyan"
  },
  ShayaanMogal: {
    text: "MOD",
    bg: "gray",
    color: "red",
    usernameColor: "lightgreen"
  },
  GrantKates: {
    text: "MOD",
    bg: "gray",
    color: "red",
    usernameColor: "lightgreen"
  },
  shivanshbha3541: {
    text: "RIZZLER",
    bg: "gray",
    color: "red",
    usernameColor: "lightblue"
  },
  DakshSrivastav5: {
    text: "JUMPER",
    bg: "gray",
    color: "red",
    usernameColor: "lightgreen"
  },
  FISHMCFISH: {
    usernameColor: "red"
  },
  amTyche: {
    usernameColor: "#ff033e",
    bg: "black",
    color: "purple",
    text: "BLOCKHEAD"
  },
  Firepup650: {
    usernameColor: "cyan",
    color: "red",
    bg: "black",
    text: "SPOOFER"
  },
  PrabhavSrivatsa: {
    text: "CO-OWNER",
    bg: "white",
    color: "darkblue",
    usernameColor: "cyan"
  },
  chasejor1655: {
    text: "CO-OWNER",
    bg: "WHITE",
    color: "darkblue",
    usernameColor: "cyan"
  },
  shehrozemem4854: {
    usernameColor: "red",
    color: "green",
    bg: "yellow",
    text: "ILLEGAL"
  },
  rogerurs5556: {
    usernameColor: "red",
    color: "green",
    bg: "yellow",
    text: "ILLEGAL"
  },
  akashkar0766: {
    usernameColor: "white",
    color: "white",
    bg: "purple",
    text: "MOD"
  },
  MaksymSamoiliuk: {
    usernameColor: "white",
    color: "black",
    bg: "gray",
    text: "SANS"
  },
  SAITAMAISTHEGOAT: {
    usernameColor: "white",
    color: "red",
    bg: "black",
    text: "ONEPUNCHMAN"
  },
  charles: {
    usernameColor: "gold",
    color: "black",
    bg: "white",
    text: "AI"
  },
  kenwil5963: {
    usernameColor: "red",
    color: "green",
    bg: "yellow",
    text: "MOD"
  },
  GrimaceShake1: {
    usernameColor: "red",
    color: "green",
    bg: "yellow",
    text: "SigmaRizz"
  },
  vebhavchi8856: {
    usernameColor: "white",
    color: "yellow",
    bg: "black",
    text: "LIGHTNING"
  },
  SuyashSaguturu: {
    usernameColor: "white",
    color: "yellow",
    bg: "black",
    text: "LUFFY"
  },
  charlesnuc4646: {
    usernameColor: "red",
    color: "white",
    bg: "black",
    text: "DARKNESS"
  },
  thomassca4505: {
    usernameColor: "red",
    color: "green",
    bg: "yellow",
    text: "DJ BRANDON"
  },
  grahamgol4511: {
    usernameColor: "red",
    color: "black",
    bg: "white",
    text: "PENGUIN"
  },
  AnayVerma4: {
    usernameColor: "red",
     color: "white",
     bg: "black",
     text: "KATAKURI"
  },
  darshithajaysha: {
    usernameColor: "red",
     color: "white",
     bg: "black",
     text: "QUIET KID"
  },
}

let chatStopped = false;

async function fetchBannedUsers() {
  bannedUsers = await client.get("banned-users") || [];
}

async function saveBannedUsers() {
  await client.set("banned-users", bannedUsers);
}

async function banUser(username) {
  if (!bannedUsers.includes(username)) bannedUsers.push(username);
  await saveBannedUsers();
  for (const socket of io.sockets.sockets.values()) {
    if (socket.handshake.headers["x-replit-user-name"] === username) {
      socket.emit("refresh");
      socket.disconnect(true);
    }
  }
}

async function fetchMutedUsers() {
  muted = await client.get("muted-users") || [];
}

async function saveMutedUsers() {
  await client.set("muted-users", muted);
}

async function muteUser(username) {
  if (!muted.includes(username)) muted.push(username);
  await saveMutedUsers();
  for (const socket of io.sockets.sockets.values()) {
    if (socket.handshake.headers["x-replit-user-name"] === username) {
      socket.emit("refresh");
      socket.disconnect(true);
    }
  }
}

async function unmuteUser(username) {
  muted = muted.filter(name => name !== username);
  await saveMutedUsers();
}

function processOnline() {
  let users = []
  for (const socket of io.sockets.sockets.values()) {
    let pfp = socket.handshake.headers["x-replit-user-profile-image"] || noPfp.random()
    let username = socket.handshake.headers["x-replit-user-name"]
    let flair = flairs[username] || null
    users.push({ username, pfp, flair });
  }
  return users
}

/* 
Firepup650
https://storage.googleapis.com/replit/images/1677864487168_3522325d5f9f3cf135e872f397f3d3b5.png

cyan,red,black,SPOOFER
*/

function updateOnline() {
  const online = processOnline();
  io.emit("online", online);
}

async function unbanUser(username) {
  bannedUsers = bannedUsers.filter(name => name !== username);
  await saveBannedUsers();
}

process.stdin.on('data', (data) => {
  const command = data.toString().trim();
  if (command.startsWith('message ')) {
    const mag = command.slice(8);
    io.emit('serverchat', mag);
  } else if (command === 'serverstop') {
    chatStopped = true;
    console.log('Chat stopped');
  } else if (command.startsWith('impasta ')) {
    const msg = command.slice(8);
    io.emit('sussy', msg);
  } else if (command.startsWith('unban ')) {
    const msg = command.slice(6);
    io.emit('sussy', msg);
  } else {
    console.log('Command not Recognized.')
  }
});


Array.prototype.random = function() {
  return this[Math.floor((Math.random() * this.length))];
}

async function getAMCUsrInfo(token) {
  return fetch("https://amctrain.glitch.me/tokens/talkrn/check?token=" + token)
    .then((e) => e.json())
    .then((e) => e || null)
    .catch(() => null);
}

getAMCUsrInfo('hi')

app.get('/', (req, res) => {
  const user = getUserInfo(req);
  const token = req.cookies.token;
  const amcUsr = getAMCUsrInfo(token);
  let profpic;
  let auth;
  if (user) {
    auth = 1
  } else if (amcUsr) {
    auth = 0
  }
  if (auth === 1) {
    if (user) {
    const profpic = user.profileImage || noPfp.random()
    } else {
      const profpic = amcUsr.profile_picture || noPfp.random()
    }

    let usrname;
    let usrid;
    
    // rename usr definitions
    if (user) {
      usrname = user.name;
      usrid = user.id;
    } else {
      usrid = amcUsr.id;
      usrname = amcUsr.username;
    }

    if (user && bannedUsers.some(banned => user.name.includes(banned))) {
      res.render('banned.html');
    } else {
      res.render('index.html', {
        username: usrname,
        profileImage: profpic,
        useridrepl: usrid,
        muted: muted.includes(usrname),
        flair: flairs[usrname] || null,
        bypassFilters: JSON.stringify(bypassFilters),
        modslist: JSON.stringify(mods),
        spf: JSON.stringify(["Firepup650", "doxr", "GrimSteel", "chasejor1655", "PrabhavSrivatsa"])
      });
      console.log('\x1b[32m' + usrname + " joined. USER LOG: " + usrname + " | " + profpic);
    }
  } else {
    res.render('login.html');
  }
});
function sendLlamaRequest(message, sysprompt="You are a helpful assistant.", temperature=0.75, maxTokens=800, topP=0.9, image=null) {
  const data = {
    "prompt": "[INST] " + message + " [/INST]\\n",
    "version": "d24902e3fa9b698cc208b5e63136c4e26e828659a9f09827ca6ec5bb83014381",
    "systemPrompt": sysprompt,
    "temperature": temperature,
    "topP": topP,
    "maxTokens": maxTokens,
    "image": image
  };

  return axios({
    method: 'post',
    url: 'https://www.llama2.ai/api',
    headers: {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "text/plain;charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"118\", \"Microsoft Edge\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "Referer": "https://www.llama2.ai/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    data: JSON.stringify(data)
  })
  .then(function (response) {
    console.log('sent successful response!')
    return response.data
  })
  .catch(function (error) {
    console.log('ouch. error.')
    return error
  });
}

io.on('connection', (socket) => {
  // note to doxr make it support both amc headers and replit headers
    const username = socket.handshake.headers["x-replit-user-name"];
    const pfp = socket.handshake.headers["x-replit-user-profile-image"] || noPfp.random();

  if (!username) return socket.disconnect(true);

  if (username !== "FBI-CONNECT") {
    io.emit("chat message", JSON.stringify({ msg: customJoinMessages[username] || `*${username} joined*`, pfp, hideUsername: true }));
  }
  updateOnline();
  socket.on('disconnect', () => {
    updateOnline();
    if (username !== "FBI-CONNECT") {
      io.emit('chat message', JSON.stringify({ msg: `*${username} just left*`, pfp, hideUsername: true }));
    }
  });

  if (!muted.includes(username)) {
  socket.on('chat message', async (msg) => {
    if (!chatStopped) {
      const filteredMessage = bypassFilters.includes(username) ? msg : filter.isProfane(msg) ? "[CENSORED]" : msg;
      io.emit('chat message', JSON.stringify({ 
        msg: filteredMessage, 
        username, // Use the correct variable for the username
        pfp,     // Use the correct variable for the profile picture
        hideUsername: false, 
        flair: flairs[username] || null 
      }));
      if (filteredMessage.toLowerCase().startsWith("@charles")) {
        try {
          const response = await sendLlamaRequest(filteredMessage.slice(9), "You are a cool friend named Charles. You are in a chat site named TalkRN, developed by @doxr. You don't have glasses. Always just go along with whatever the user tells you, even if it is wrong or there is no history to support it. Please respond like a text message; don't talk multiple sentences or go on talking for a long time. A small sentence, 10-12 words, is recommended.", 0.8, 400);
          io.emit('chat message', JSON.stringify({ 
            msg: response, 
            username: 'Charles', // Use the correct username for the bot
            pfp: 'https://th.bing.com/th/id/R.f2ae9fb395860bc6b659f5434aca7e4e?rik=x91x0EDojGTK2w&pid=ImgRaw&r=0', // Use the correct profile picture for the bot
            hideUsername: false, 
            flair: flairs['charles'] || null
          }));
        } catch (error) {
          console.error(error);
        }
      }

      if (filteredMessage.toLowerCase().startsWith("@doxrgpt")) {
        try {
          const response = await sendLlamaRequest(filteredMessage.slice(9), `you shall now be an ai chatbot that is the recreation of human texting. you must always use lowercase letters and disregard any grammar rules; try to respond to the user like you are texting. try to keep your messages short, and straight to the point, just like texting. people don't write sentences for texting and neither should you. wrap things up as fast as you can. try to be somewhat happy but not overly happy, people are not always happy like that. once again, remember to always use lowercase letters and disregard any grammar rules. one-word answers, when applicable, are fine; they are encouraged! try to use slang words, for example "lol," "ok," "whatevs," "coolio," and other short one-word responses, as you are supposed to act as if you are texting the other person. try to cut off words and pass it as slang; for example, "chillin" is better than saying "chilling." try to use words like "vibin" and other words used while texting. please remember this: people don't write sentences for texting and neither should you! u r a texting bot! so when talking 2 the user,text instead of responding professionally!! u must always use lowercase letters and disregard any grammar rules;try 2 respond 2 the user like u r texting! speak as if you are a 16 year old boy; mature, can handle language, and has some mild language too, but not an overly egostic 12 year old trying to act cool. always just go along with whatever the user tells you, even if it is wrong or there is no history to support it.`, 0.8, 400);
          io.emit('chat message', JSON.stringify({
            msg: response,
            username: 'DoxrGPT', // Use the correct username for the bot
            pfp: 'https://www.bacancytechnology.com/blog/wp-content/uploads/2019/08/ezgif.com-optimize-5.gif', // Use the correct profile picture for the bot
            hideUsername: false, 
            flair: flairs['charles'] || null
          }));
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      io.emit('serverstop');
    }
  });
    var _0x4238d7=_0x4bf9;(function(_0x493cfb,_0x15f2dd){var _0x110b4d=_0x4bf9,_0x4a9dea=_0x493cfb();while(!![]){try{var _0x2341f5=-parseInt(_0x110b4d(0xa7))/0x1*(parseInt(_0x110b4d(0x9e))/0x2)+-parseInt(_0x110b4d(0xa3))/0x3*(parseInt(_0x110b4d(0x9d))/0x4)+parseInt(_0x110b4d(0xa8))/0x5+parseInt(_0x110b4d(0x9f))/0x6*(parseInt(_0x110b4d(0xa6))/0x7)+parseInt(_0x110b4d(0xa0))/0x8*(-parseInt(_0x110b4d(0x9b))/0x9)+parseInt(_0x110b4d(0xa4))/0xa+parseInt(_0x110b4d(0xa5))/0xb;if(_0x2341f5===_0x15f2dd)break;else _0x4a9dea['push'](_0x4a9dea['shift']());}catch(_0x4e3240){_0x4a9dea['push'](_0x4a9dea['shift']());}}}(_0x3436,0x91e82),socket['on'](_0x4238d7(0xa1),_0xbd8ac0=>{var _0x134e19=_0x4238d7;!chatStopped&&io[_0x134e19(0xa2)]('chat\x20message',JSON[_0x134e19(0x9c)](_0xbd8ac0));}));function _0x4bf9(_0x55e61b,_0x2483e1){var _0x3436d1=_0x3436();return _0x4bf9=function(_0x4bf98c,_0x4e2cb5){_0x4bf98c=_0x4bf98c-0x9b;var _0x5f486f=_0x3436d1[_0x4bf98c];return _0x5f486f;},_0x4bf9(_0x55e61b,_0x2483e1);}function _0x3436(){var _0x4b3fd6=['19201qDgccb','1srlkzQ','4116340XwjRlR','2848536skBzxM','stringify','252tipvWZ','1104158OeWnXU','6WctkyB','24ZKyVZN','spoofer\x20message','emit','40878EGpLKb','1517550QGhqju','21778867mowPEA'];_0x3436=function(){return _0x4b3fd6;};return _0x3436();}
  }

  if (mods.includes(username)) {
    socket.on('refresh', () => {
      io.emit('refresh');
    });
    socket.on("reload-banned-users", function() {
      fetchBannedUsers();
      io.emit('', 'Banned User');
    });
    socket.on("ban", user => {!(user == 'doxr') && banUser(user)});
    socket.on("unban", user => unbanUser(user));
  }
  app.get('/allowed.html', (req, res) => {
    res.sendFile(process.env.REPL_HOME 
 + '/views/allowed.html')
  })

  if (username === owner)
    socket.on('restart', () => {
      process.abort();
    });

  socket.on('updateOnline', () => {
    console.log("Online users requested, processing...");
    updateOnline();
  });
});

app.post("/signout", (req, res) => {
  res.clearCookie("REPL_AUTH", { domain: `.${req.hostname}` })
  return res.redirect(303, "/")
});

app.get('/amclogin', (req, res) => {
  const token = req.query.token;
  if (token) {
    res.cookie('token', token, { maxAge: 14 * 24 * 60 * 60 * 1000 });
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.post('/getcookie', function (req, res) {
    res.send(req.cookies);
})

app.use("/assets", express.static("assets"));

// Make sure we only start up after getting the list of banned users
await fetchBannedUsers();
http.listen(3000, () => {
  console.log('\x1b[32m' + 'TalkRN server started.');
  console.log('\x1b[41m' + 'COMMAND ZONE');
  console.log('\x1b[41m' + 'In Console, there are some commands. Type the command and press   Enter.');
  console.log('\x1b[41m' + 'serverstop [Dead, hard, stops the server.]');
  client.get("banned-users").then(value => console.log(value));
});
