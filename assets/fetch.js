const headers = {
			'X-Requested-With': 'replit',
			'Referrer': 'https://replit.com',
			'User-Agent': 'Mozilla/5.0',
			'Content-Type': 'application/json',
			//'Cookie': 'connect.sid=None'
		}
async function eGQL(username) {
    let raw = await fetch('https://egress-killer.batcarrot.repl.co', {method: 'POST', body: JSON.stringify({"query":`query userNameAndImage(username: String!) {
  userByUsername(username: $username) {
    displayName
    image
  }
}`,"variables":{"username":username}, "SID":""}), headers: headers})
  console.log("Fetched (E)")
  let json = await raw.json()
  console.log(json)
  let name = json.name
  let pfp = json.image
  return {name, pfp}
}
async function rGQL() {
    let raw = await fetch('https://replit.com/graphql', {method: 'POST', body: JSON.stringify({"query":`query userByUsername($username: String!) {
  userByUsername(username: $username) {
    displayName
    image
  }
}`,"variables":{"username":"Firepup650"}}), headers: headers})
    console.log("Fetched (R)")
    let json = await raw.json()
    console.log(json)
    let name = json.name
    let pfp = json.image
    return {name, pfp}
}