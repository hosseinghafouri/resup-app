var dgram = require('dgram')
const EventEmitter = require('events');

const Ap = {

    Ip: '192.168.4.1',
    listeningPort: 4210,
    joinMessage: "join",

    clientRemoveMessage: (PagerIp) => {
        return `delete:${PagerIp}`
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

                server.send(Ap.joinMessage, 0, Ap.joinMessage.length, Ap.listeningPort, Ap.Ip)

                // Emit an event
                server.on('message', (msg, rinfo) => {

                    if (rinfo.address === Ap.Ip) {
                        let pagersdata = []
                        let data = msg.toString("utf-8");
                        data = data.split(';')

                        data.forEach(element => {
                            let pager = element.split(',')
                            pagersdata.push([pager[0], pager[1]])
                        });

                        this.emit('pagersdata', pagersdata);
                    }
                });
            }
        }
}

module.exports = Ap