var dgram = require('dgram')
const EventEmitter = require('events');

const Ap = {

    Ip: '192.168.4.1',
    listeningPort: 4210,
    joinMessage: "join",
    pageMessage: "page",

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

                this.server = dgram.createSocket('udp4')
                this.server.bind(Ap.listeningPort)

                this.server.send(Ap.joinMessage, 0, Ap.joinMessage.length, Ap.listeningPort, Ap.Ip)

                // Emit an event
                this.server.on('message', (msg, rinfo) => {

                    if (rinfo.address === Ap.Ip) {
                        let pagersdata = []
                        let data = msg.toString("utf-8");
                        console.log("row", data);
                        if (data === "") {
                            this.emit('pagersdata', pagersdata);
                            return;
                        }
                        data = data.split(';')

                        data.forEach(element => {
                            let pager = element.split(',')
                            if (pager[1] === undefined) {
                                return
                            }
                            pagersdata.push([pager[0], pager[1]])
                        });

                        this.emit('pagersdata', pagersdata);
                    }
                });
            }

            deletePager(PagerId) {
                this.server.send(Ap.clientRemoveMessage(PagerId), 0, (Ap.clientRemoveMessage(PagerId)).length, Ap.listeningPort, Ap.Ip)
            }

            pagePager(PagerIp) {
                this.server.send(Ap.pageMessage, 0, Ap.pageMessage.length, Ap.listeningPort, PagerIp)
            }
        }
}

module.exports = Ap