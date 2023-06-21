var dgram = require('dgram')
const Ap = require('./ApInterface')

const Pager = {

    pagers: [],

    listeningPort: 4210,
    pagingMessage: "page",

    page: (PagerIp) => {

        let client = dgram.createSocket('udp4')
        const pagingMessage = this.pagingMessage;
        client.send(pagingMessage, 0, 4, this.listeningPort, PagerIp, () => {

            client.close()
        });

        Ap.deletePager(PagerIp)
    }
}

module.exports = Pager