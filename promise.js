
var promise = function(fn){
  this.status = "pendding"
  var _this = this,
      ownResolves = []

  _this.then = function(call){
    if(_this.status !== "pendding")
      call()
    else{
      ownResolves.push(call)
    }
    return _this
  }

  function resolve(value){
    //console.log(_this.resolves)
    var resolves = _this.resolves
    _this.resolves = ownResolves.concat(_this.resolves)
    setTimeout(function(){
      var counter = 0 //执行下标
      for(var callback of _this.resolves){
        if(value instanceof promise){
          _this.resolves.splice(0, counter) //删除已执行的前counter项
          console.log(_this.resolves === resolves)
          break
        }
        value = callback(value)
        counter++
      }
    }, 0)
  }

  fn(resolve)
  
}
promise.prototype.resolves = []


var _async = new promise(
  function(resolve){
    setTimeout(function(){
      resolve("dsa")
    }, 1000)
  }
)
_async.then(function(res){
  console.log(res)
  return "hehe"
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
