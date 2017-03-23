var utils = require('./utils')

var isFunction = utils.isFunction

function Next(fn) {
  this.__end__ = false
  this.__callbacks__ = {
    resolves: [],
    rejects: [],
  }
  isFunction(fn) && fn(this.__fullfilled__.bind(this, 0), this.__fullfilled__.bind(this, 1))
}

// 若无reject，则reject = resolve
Next.prototype.next = function (resolve, reject) {
  var __callbacks__ = this.__callbacks__
  var isResolveValid = isFunction(resolve)
  var isRejectValid = isFunction(reject)
  isResolveValid && __callbacks__.resolves.push(resolve)
  if (isResolveValid || isRejectValid) {
    __callbacks__.rejects.push(isRejectValid ? reject : resolve)
  }
  if(this.__end__) {
    this.__fullfilled__(this.type, this.data)
  }
  return this
}

Next.prototype.__fullfilled__ = function (type, data) {
  this.__end__ = true
  this.data = data
  this.__queueInvoke__(this.type = type)
}

Next.prototype.__queueInvoke__ = function(type) {
  var queue = this.__callbacks__[type === 0 ? 'resolves' : 'rejects'], fn
  while(fn = queue.shift()) {
    fn(this.data)
  }
}

export default Next
