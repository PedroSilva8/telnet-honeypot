const telnetlib = require('telnetlib')
const fs = require('fs')

var access = fs.createWriteStream('./access.log', { flags: 'a' })

const server = telnetlib.createServer({ }, (c) => {
  c.on('negotiated', () => {
    console.log(c.socket.remoteAddress)
    access.write(c.socket.remoteAddress + "\r\n");
    c.end()
  });
});
server.listen(23);