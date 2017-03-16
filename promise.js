var promise = function(fn){
  this.status = "pendding"
  var resolves = [],
      _this = this

  _this.then = function(call){
    if(_this.status !== "pendding")
      call()
    else
      resolves.push(call)
    return _this
  }

  function resolve(value){
    _this.status = "fulfilled"
    setTimeout(function(){
      for(var callback of resolves){
        if(value instanceof promise){
          
          break
        }
        value = callback(value)
      }
    }, 0)
  }

  fn(resolve)
  
}
var _async = new promise(
  function(resolve){
    setTimeout(function(){
      resolve("dsa")
    }, 1000)
  }
)
_async.then(function(res){
  console.log(res)
  return 3
}).then(function(res){
  console.log(res)
  var newPromise = new promise(function(resolve){
    setTimeout(function(){
      resolve()
    }, 1000)
  })
  newPromise.then(function(){
    console.log("inside_then")
  })
  return newPromise
}).then(function(){
  console.log(_async)
})
console.log(_async)
