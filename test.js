const tape = require('tape')
const xp = require('./')

tape('basic', function (t) {
  const [ a, b ] = xp()

  b.once('readable', function () {
    t.same(b.read(), Buffer.from('hi'))
    b.write('ho')
    a.once('readable', function () {
      t.same(a.read(), Buffer.from('ho'))
      t.end()
    })
  })

  a.write('hi')
})

tape('basic obj', function (t) {
  const [ a, b ] = xp.obj()

  b.once('readable', function () {
    t.same(b.read(), { hi: true })
    b.write({ ho: true })
    a.once('readable', function () {
      t.same(a.read(), { ho: true })
      t.end()
    })
  })

  a.write({ hi: true })
})
