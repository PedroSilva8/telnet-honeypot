//Using js insted of ts because c.socket doesn't "exist" in @types/telnetlib

const telnetlib = require('telnetlib')
var geoip = require('geoip-country');
const fs = require('fs')

var access = fs.createWriteStream('./access.log', { flags: 'a' })

const server = telnetlib.createServer({ }, (c) => {
  c.on('negotiated', () => {
    var ip = c.socket.remoteAddress

    if (ip.startsWith('::ffff:'))
      ip = ip.split(':')[3]
    c.end()

    const ct = geoip.lookup(c.socket.remoteAddress).country;
    access.write(ip + " - " + ct + "\r\n");
    console.log(ip + " - " + ct);
  });
});
server.listen(23);