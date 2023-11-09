const socket = io(), md = markdownit({ html: true, linkify: true, typographer: false }), messages = document.getElementById('messages'), form = document.getElementById('form'), input = document.getElementById('input'), usercard = document.getElementById('usercard');

function scrollToBottom(id) {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
}

input?.focus();

function renderFlair(flair, username) {
  const el = document.createElement("strong");
  
  el.innerText = flair ? `${username} ` : username;
  if (flair) {
    const { usernameColor, color, bg, text } = flair;
    el.style.color = usernameColor;
    const flairEl = el.appendChild(document.createElement("span"));
    flairEl.style.color = color;
    flairEl.style.backgroundColor = bg;
    flairEl.innerText = `[${text}]`;
  }
  return el;
}

function renderOnline(users) {
    const list = document.getElementById("userList")
    if (!list) return;
    list.textContent = "";
    let serverEl = document.createElement("li")
    let serverPfp  = document.createElement("img")
    serverPfp.src = "https://i2.wp.com/replit.com/public/images/evalbot/evalbot_42.png"
    serverPfp.width = 30
    serverPfp.height = 30
    serverPfp.style = "border-radius: 1rem; vertical-align: middle;"
    let serverName = renderFlair(null, "SERVER")
    serverEl.appendChild(serverPfp)
    serverEl.appendChild(serverName)
    list.appendChild(serverEl)
  let charEl = document.createElement("li")
  let charPfp  = document.createElement("img")
  charPfp.src = "https://th.bing.com/th/id/R.f2ae9fb395860bc6b659f5434aca7e4e?rik=x91x0EDojGTK2w&pid=ImgRaw&r=0"
  charPfp.width = 30
  charPfp.height = 30
  charPfp.style = "border-radius: 1rem; vertical-align: middle;"
  let charName = renderFlair({ usernameColor: 'gold', color: 'black', bg: 'white', text: 'AI' }, "Charles");
  charEl.appendChild(charPfp)
  charEl.appendChild(charName)
  list.appendChild(charEl)
  let doxrEl = document.createElement("li")
  let doxrPfp  = document.createElement("img")
  doxrPfp.src = "https://www.bacancytechnology.com/blog/wp-content/uploads/2019/08/ezgif.com-optimize-5.gif"
  doxrPfp.width = 30
  doxrPfp.height = 30
  doxrPfp.style = "border-radius: 1rem; vertical-align: middle;"
  let doxrName = renderFlair({ usernameColor: 'gold', color: 'black', bg: 'white', text: 'AI' }, "DoxrGPT");
  doxrEl.appendChild(doxrPfp)
  doxrEl.appendChild(doxrName)
  list.appendChild(doxrEl)
    for (const { pfp, username, flair } of users) {
        if (username !== "FBI-CONNECT") {
            let displayName = renderFlair(flair, username)
            let displayPfp  = document.createElement("img")
            displayPfp.src = pfp
            displayPfp.width = 30
            displayPfp.height = 30
            displayPfp.style = "border-radius: 1rem; vertical-align: middle;"
            let userEl = document.createElement("li")
            userEl.appendChild(displayPfp)
            userEl.appendChild(displayName)
            list.appendChild(userEl)
        }
    }
}

if (!muted) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value?.trim()) {
      if (input.value.slice(0, 8) === "$refresh") socket.emit('refresh');
      else if (input.value === "$clear") {
        messages.innerHTML = ""; const item = document.createElement('li'); item.innerHTML = 'Cleared chat.'; messages.appendChild(item); window.scrollTo(0, document.body.scrollHeight);
      } else if (input.value === '$restart') socket.emit('restart');
      else if (input.value.startsWith("$ban")) socket.emit("ban", input.value.slice(5)); 
      else if (input.value.startsWith("$unban")) socket.emit("unban", input.value.slice(7));
      else if (input.value.startsWith("$reload-banned")) socket.emit("reload-banned-users");
      else if (input.value === '$console' && username === 'doxr') eruda.init();
      else if (input.value === '$spoof' && spf.includes(username)) shSP();
      else if (input.value.slice(0, 7) === '$image ') socket.emit('chat message', '<img src="' + input.value.slice(7) + '" width="50" alt="User Submitted Image">')
      else if (input.value === '$rules') rules_showdown();
      else if (input.value === '$commands') commands_showdown();
      else socket.emit('chat message', input.value);
    }
    input.value = '';
  });
} else {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("You are muted and cannot send messages");
  });
}

socket.on('refresh', () => window.location.reload());

// sorry im an idiot i fixed it
socket.on('chat message', function(rawMsg) {
  const { pfp, username, msg, hideUsername, flair, time } = JSON.parse(rawMsg);
  const chatItem = document.createElement('li');
  const pfpEl = chatItem.appendChild(new Image(30, 30));
  pfpEl.style.borderRadius = "1rem";
  pfpEl.style.verticalAlign = "middle";
  pfpEl.src = pfp;
  const msgSpan = chatItem.appendChild(document.createElement("span"));
  const contentSpan = document.createElement("span");
  const filteredMsg = msg;
  contentSpan.innerHTML = DOMPurify.sanitize(md.renderInline(filteredMsg), { FORBID_ATTR: ["onclick", "onload", "id", "class", "onkeypress"], FORBID_TAGS: ["style", "button", 'input', "h1", "h2", "h3", "h4", "h5", "h6", "iframe", "embed", "form", "audio", "video", "object", "html", "head", "body"] });
  if (!hideUsername) {
    const usernameStrong = renderFlair(flair, username);
    const formattedTime = new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    let htmlTime = ''  + formattedTime + ''
    msgSpan.append(usernameStrong, ' (' + htmlTime + ')', ": ");
  }
  msgSpan.appendChild(contentSpan);
  messages.appendChild(chatItem);
  scrollToBottom("messages");
  // WORKS
});

socket.on('modmessage', function(buggy) {
  let codour = document.createElement('li');
  codour.innerHTML = 'The server has been affected. Type: ' + buggy + '.';
  messages.appendChild(item);
  scrollToBottom("messages"); 
});

socket.on('online', function(users) {
    const list = document.getElementById("userList")
    list.textContent = "";
    let userEl = document.createElement("li")
    let w = document.createElement("span")
    w.innerHTML = "Working..."
    userEl.appendChild(w)
    list.appendChild(userEl)
    renderOnline(users)
});

const delay = ms => new Promise(res => setTimeout(res, ms));


function rules_showdown() {
  const item = document.createElement('li');
  item.innerHTML = `
  Rules: 
  <br>
  <strong>
  <br>Don't be mean, or swear.
  <br>Don't ask for custom flairs, or roles.
  <br>Don't be weird.
  <br> No spamming or text-art.
  <br>No zalgo text.
  <br>No bad, scary, or unfriendly images.
  <br>No suspicious links.
  <br>No hacking (unless you are admins).</strong>`;
  messages.appendChild(item);
  scrollToBottom("messages");
}

function commands_showdown() {
  const item = document.createElement('li');
  item.innerHTML = `Commands:
    <h3>Regular:</h3>
    <b>@charles [message] (Talk to Charles AI)<br>
    <b>@doxrgpt [message] (Talk to DoxrGPT AI)<br>
    <b>$clear</b> (Clear the chat)<br>
    <b>$commands</b> (View commands)<br>
    <b>$rules</b> (View rules)<br>
    <b>$image [url]</b> (Send an image)
    <h3>Moderators:</h3>
    <b>$refresh</b> (Force all users to refresh; install updates)<br>
    <b>$ban [user]</b> (Ban a user)<br>
    <b>$reload-banned</b> (Reload the database to check for banned or unbanned users)<br>
    <b>$unban [user]</b> (Unban a user)
    <h3>Owner:</h3>
    <b>$reload</b> (Reload backend by killing process; backend updates)<br>
    <b>$console</b> (eruda.init();)
    `;
  messages.appendChild(item);
  scrollToBottom("messages");
}

document.querySelectorAll("button.expand").forEach(function(btn) {
  btn.addEventListener("click", function() {
    btn.parentElement.classList.toggle("expanded");
  });
});
