function LoginWithReplit(){window.addEventListener("message",function e(t){if("auth_complete"!==t.data)return;window.removeEventListener("message",e);n.close();location.reload()});var e=screen.width/2-175,t=screen.height/2-250,n=window.open("https://repl.it/auth_with_repl_site?domain="+location.host,"_blank","modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=350, height=500, top="+t+", left="+e)}async function getUserInfo(){return fetch("/__replauthuser").then(e=>e.json()).then(e=>e||null).catch(()=>null)} 

async function getUserInfo() {
  return fetch("/__replauthuser")
    .then((e) => e.json())
    .then((e) => e || null)
    .catch(() => null);
}
function LoginWithAMC() {
  window.addEventListener("message", function e(t) {
    if ("auth_complete" !== t.data) return;
    window.removeEventListener("message", e);
    n.close();
    location.reload();
  });
  var e = screen.width / 2 - 175,
    t = screen.height / 2 - 250,
    n = window.open(
      "https://amctrain.glitch.me/oauth/talkrn/start",
      "_blank",
      "modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=350, height=500, top=" +
        t +
        ", left=" +
        e,
    );
}

async function getAMCUsrInfo() {
  return fetch("https://amctrain.glitch.me/tokens/talkrn/check")
    .then((e) => e.json())
    .then((e) => e || null)
    .catch(() => null);
}

// nice can you link that on login.htmll done
// why the hell is this minified