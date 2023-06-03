var dgram = require('dgram')
const Ap = require('./ApInterface')

const Pager = {

    listeningPort: 4210,
    pagingMessage: "page",

    page: (PagerIp) => {

        let client = dgram.createSocket('udp4')
        client.send(this.pagingMessage, 0, this.pagingMessage.length, this.listeningPort, PagerIp, () => {

            client.close()
        });

        Ap.deletePager(PagerIp)
    }
}

module.exports = Pager