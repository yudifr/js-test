let events  = require('events');

let eventEmit= new events.EventEmitter()

eventEmit.on('connection',() => {
    console.log('conn success')
})

eventEmit.emit('connection')