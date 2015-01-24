var test = require("tap").test
var lexers = require("..")

test("pygments-lexers", function (t) {
  t.ok(lexers.length > 350)
  t.equal(lexers[0].name, "ABAP")
  t.end()
})
