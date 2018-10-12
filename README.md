# cross-pipe

Create two streams that are cross piped.

```
npm install cross-pipe
```

Useful if you have an API that accepts a stream
but want to return a stream that represents that pipeline as well

## Usage

```js
const crossPipe = require('cross-pipe')

const [ a, b ] = crossPipe()

a.write('hi')

b.on('data', function (data) {
  console.log('b: ' + data) // prints hi
  b.write('hey')
  a.on('data', function (data) {
    console.log('a: ' + data) // prints hey
  })
})
```

If you are using something like [noise-peer](https://github.com/emilbayes/noise-peer) that accepts the underlying socket in the constructor but you want to return a generic stream in a pipeline you do it with a cross pipe like so

```js
function replicate () {
  const [ a, b ] = crossPipe()

  const stream = noise(b)

  // do stuff with stream

  // a reprensents the pipeline now
  return a
}
```

## License

MIT
