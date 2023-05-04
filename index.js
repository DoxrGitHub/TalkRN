const{getUserInfo:getUserInfo}=require("@replit/repl-auth"),app=require("express")(),http=require("http").Server(app),io=require("socket.io")(http),md=require("markdown-it")({html:!0,linkify:!0,typographer:!1});require("dotenv").config();
app.engine("html",require("ejs").renderFile),app.set("view engine","html"),app.set("views","views");

let chatStopped = false;

process.stdin.on('data', (data) => {
  const command = data.toString().trim();
  if (command.startsWith('message ')) {
    const mag = command.slice(8);
    io.emit('serverchat', md.render(mag));
  } else if (command === 'serverstop') {
    chatStopped = true;
    console.log('Chat stopped');
  } else if (command.startsWith('impasta ')) {
    const msg = command.slice(8);
    io.emit('sussy', md.render(msg));
  } else {
    console.log('Command not Recognized.')
  }
});


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
    
app.get('/', (req, res) => {
  const user = getUserInfo(req);
  const bannedUser = ["amasad", "soren", "testing-websites", "E221098", "RalphMason"];
const noPfp=["https://i2.wp.com/replit.com/public/images/evalbot/evalbot_17.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_18.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_19.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_20.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_21.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_22.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_23.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_24.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_25.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_26.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_27.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_28.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_29.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_30.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_31.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_32.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_33.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_34.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_35.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_36.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_37.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_38.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_39.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_40.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_41.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_42.png","https://i2.wp.com/replit.com/public/images/evalbot/evalbot_43.png"];

  if (user) {
    if(user.profileImage){
      var profpic = user.profileImage;
    } else {
      var profpic = noPfp.random();
    }
    if (bannedUser.some(banned => user.name.includes(banned))) {
      res.render('banned.html');
    } else {
      res.render('index.html', {
        username: user.name,
        profileImage: profpic
      });
      console.log('\x1b[32m', user.name + " joined. USER LOG: " + user.name + " | " + user.profileImage);
    }
  } else {
    res.render('login.html');
  }
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
  socket.on('chat message', (msg) => {
    if (!chatStopped) {
      io.emit('chat message', md.render(msg));
    } else {
      io.emit('chat message', md.render("*Chat is currently stopped. This could be because major maintainence is underway. If refreshing doesn't help, please wait for some time and refresh.*"));
    }
  });
});

http.listen(process.env.PORT, () => {
  console.log('\x1b[32m', 'TalkRN server started.');
  console.log('\x1b[41m', 'COMMAND ZONE');
  console.log('\x1b[41m', 'In Console, there are some commands. Type the command and press   Enter.');
  console.log('\x1b[41m', 'serverstop [Does not send the message the user intends to send. When the user tries to chat, an error returns. Use this when index.js has a complete update. First, command, then press the stop button.]');
    console.log('\x1b[41m', 'message x [Sends a crude message. Replace x with your message.]');
});