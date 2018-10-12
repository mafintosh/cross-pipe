const duplexify = require('duplexify')
const stream = require('readable-stream')

module.exports = createCrossPiper(false)
module.exports.obj = createCrossPiper(true)

function createCrossPiper (objectMode) {
  const make = objectMode ? duplexify.obj : duplexify

  return createCrossPipe

  function createCrossPipe () {
    const inc = new stream.PassThrough({ objectMode })
    const out = new stream.PassThrough({ objectMode })
    return [
      make(inc, out),
      make(out, inc)
    ]
  }
}
