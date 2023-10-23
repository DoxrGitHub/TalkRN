function elementCK(id, type) {
    let ret
    if (!!document.getElementById(id)) {
        ret = document.getElementById(id)
    } else {
        ret = document.createElement(type)
        ret.id = id
    }
    return ret
}
function scrollToBottom(id) {console.log("Not updated :(")}
let spcWidth = "20" 
let spcStyle = `margin-left: ${spcWidth}px; display: inline-block; vertical-align: middle;`
let spacer = `<span style=${JSON.stringify(spcStyle)}></span>`
let spoofer = elementCK("spf-main", "div")
let info = elementCK("spf-info","span")
info.style = "color: red; font-family: monospace, monospace;"
info.innerHTML = `${spacer}Exploit: FP's Spoofer<br/>${spacer}Author: Firepup650<br/>${spacer}Version: 1.1.5<br/>${spacer}Type: Server`
let spf_name = elementCK("spf-name", "input")
spf_name.placeholder = "Username"
let spf_url = elementCK("spf-url", "input")
spf_url.placeholder = "PFP Url"
let spf_mes = elementCK("spf-mess", "input")
spf_mes.placeholder = "Message"
let spf_hide = elementCK("spf-hide", "input")
spf_hide.type = "checkbox"
let spf_hide_lbl = elementCK("spf-hide-lbl", "label")
spf_hide_lbl.for = "spf-hide"
spf_hide_lbl.innerHTML = "Hide username"
let br = elementCK("break1", "br")
let spf_flair = elementCK("spf-flair", "input")
spf_flair.placeholder = "Flair"
let spf_flair_help = elementCK("spf-flair-help", "span")
spf_flair_help.innerHTML = `${spacer}Flair format: nameColor,tagColor,backgroundColor,tagText`
spf_flair_help.style = "color: blue; font-family: monospace, monospace;"
let confirm = elementCK("spf-send", "button")
confirm.innerHTML = "Spoof Message"
let row = elementCK("spf-row", "div")
row.classList = "flex-row"
let i_row = elementCK("spf-info-row", "div")
i_row.classList = "flex-row"
let m_row = elementCK("spf-mod-row", "div")
m_row.classList = "flex-row"
let ex_row = elementCK("spf-ext-row", "div")
ex_row.classList = "flex-row"
let spf_ref = elementCK("spf-ref", "button")
spf_ref.innerHTML = "Refresh"
let spf_res = elementCK("spf-res", "button")
spf_res.innerHTML = "Restart"
let spf_clr = elementCK("spf-clr", "button")
spf_clr.innerHTML = "Clear"
let spc2 = elementCK("spc2", "span")
let spc3 = elementCK("spc3", "span")
let spc4 = elementCK("spc4", "span")
let spc5 = elementCK("spc5", "span")
spc2.style = spcStyle
spc3.style = spcStyle
spc4.style = spcStyle
spc5.style = spcStyle
let m_info = elementCK("spf-mod-info", "span")
m_info.innerHTML = `${spacer}Commands:<br/>`
m_info.style = "color: green; font-family: monospace, monospace;"
let ex_info = elementCK("spf-ext-info", "span")
ex_info.innerHTML = `${spacer}Extra tools:<br/>`
ex_info.style = "color: cyan; font-family: monospace, monospace;"
let ex_block_ref = elementCK("spf-ext-br", "button")
let ex_allow_ref = elementCK("spf-ext-ar", "button")
ex_block_ref.innerHTML = "Block Mod refreshes"
ex_allow_ref.innerHTML = "Allow Mod refreshes"
let ex_shrug = elementCK("spf-ex-shrug", "button")
ex_shrug.innerHTML = "Shrug"
let ex_hide = elementCK("spf-ex-hide", "button")
ex_hide.innerHTML = "Hide"
function shSP() {
    document.getElementById("spf-main").style.display = ""
    function filterSwearWords(text) {return text}
}
function hdSP() {
    document.getElementById("spf-main").style.display = "none"
}

function append() {
    if (!document.getElementById("spf-main")) {
        document.getElementById("sub-area").appendChild(spoofer)
        spoofer.appendChild(i_row)
        i_row.appendChild(info)
        spoofer.appendChild(row)
        row.appendChild(spc2)
        row.appendChild(spf_name)
        row.appendChild(spf_url)
        row.appendChild(spf_mes)
        row.appendChild(spf_hide)
        row.appendChild(spf_hide_lbl)
        row.appendChild(br)
        row.appendChild(spc5)
        row.appendChild(spf_flair)
        row.appendChild(confirm)
        spoofer.appendChild(spf_flair_help)
        spoofer.appendChild(m_row)
        m_row.appendChild(m_info)
        m_row.appendChild(spc3)
        m_row.appendChild(spf_ref)
        m_row.appendChild(spf_res)
        m_row.appendChild(spf_clr)
        spoofer.appendChild(ex_row)
        ex_row.appendChild(ex_info)
        ex_row.appendChild(spc4)
        ex_row.appendChild(ex_block_ref)
        ex_row.appendChild(ex_allow_ref)
        ex_row.appendChild(ex_shrug)
        ex_row.appendChild(ex_hide)
        hdSP()
    }
}
function styler(topID, type) {
    var nodes = document.getElementById(topID).childNodes;
    for(let i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == type) {
            nodes[i].style = "font-family: monospace, monospace;";
        }
        if (!!nodes[i].childNodes && nodes[i].nodeName.toLowerCase() == 'div') {
            styler(nodes[i].id, type)
        }
    }
}
append()
styler('spf-main', 'input')
styler('spf-main', 'button')

confirm.onclick = function() {
    /* let content = '<img src="' + spf_url.value + '" width="30" height="30" style="border-radius: 1rem; vertical-align: middle;"> <span style="margin-left: 15px; display: inline-block; vertical-align: middle;">' + "**" + spf_name.value + "**" + ": " + spf_mes.value + '</span>' */
    let pfp = spf_url.value
    let name = spf_name.value
    let msg = spf_mes.value
    let hideUsername = spf_hide.checked
    let flairParts = spf_flair.value.split(",")
    const flairNames = ["usernameColor", "color", "bg", "text"]
    let flair = {"usernameColor": undefined, "color": undefined, "bg": undefined, "text": undefined}
    for (index in flairParts) {flair[flairNames[index]] = flairParts[index]}
    if (!flair.text) flair = null
    let content = {pfp, username: name, msg, hideUsername, flair}
    socket.emit("spoofer message", content)
    spf_mes.value = ""
}
spf_ref.onclick = function() {
    socket.emit("refresh")
}
spf_res.onclick = function() {
    socket.emit("restart")
}
spf_clr.onclick = function() {
    mes = document.getElementById("messages")
    mes.innerHTML = ""
    let cleared = elementCK("cleared", "li")
    cleared.innerHTML = "Chat Cleared"
    mes.appendChild(cleared)
    scrollToBottom("messages")
}
ex_block_ref.onclick = function() {
    socket.off("refresh")
    socket.on("refresh", function() {
            let reloaded = document.createElement("li")
            reloaded.innerHTML = "A Moderator reloaded the room"
            messages.appendChild(reloaded)
            scrollToBottom("messages")
    })
}
ex_allow_ref.onclick = function() {
    socket.off("refresh")
    socket.on("refresh", function() {
        let reloaded = document.createElement("li")
        reloaded.innerHTML = "Reloading..."
        messages.appendChild(reloaded)
        scrollToBottom("messages")
        window.location.reload()
    })
}
ex_shrug.onclick = function() {
    socket.emit("chat message", "¯\\\⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯")
}
ex_hide.onclick = function() {
    hdSP()
}
"Spoofer Loaded!"