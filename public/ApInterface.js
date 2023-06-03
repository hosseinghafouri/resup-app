var dgram = require('dgram')
const EventEmitter = require('events');

const Ap = {

    Ip: '192.168.4.1',
    listeningPort: 4210,
    joinMessage: "join",

    clientRemoveMessage: (PagerIp) => {
        return `rm:${PagerIp}`
    },

    deletePager: (PagerIp) => {
        let client = dgram.createSocket('udp4')
        client.send(this.clientRemoveMessage(PagerIp), 0, (this.clientRemoveMessage(PagerIp)).length, this.listeningPort, this.Ip, () => {
            client.close()
        })
    },

    connect:
        class ConnectAp extends EventEmitter {
            join() {
                let server = dgram.createSocket('udp4')
                server.bind(Ap.listeningPort)

                server.send(Ap.joinMessage, 0, Ap.joinMessage.length, Ap.listeningPort, Ap.Ip, () => {
                    server.close()
                })

                // Emit an event
                server.on('message', (msg, rinfo) => {
                    if (rinfo.address === Ap.Ip) {

                        this.emit('pagersdata', { data: msg });
                    }
                });
            }
        }
}

module.exports = Ap