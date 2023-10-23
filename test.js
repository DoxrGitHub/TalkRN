import fs from 'fs'
const logStream = fs.createWriteStream('server.log', { flags: 'a' });
const now = new Date();

logStream.write('I am going to log the time: ' + now + '\n');