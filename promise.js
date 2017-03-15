var promise = function(fn){
  this.status = "pendding"
  var resolves = [],
      _this = this

  this.then = function(call){
    if(this.status !== "pendding")
      call()
    else
      resolves.push(call)
    return this
  }

  function resolve(value){
    setTimeout(function() {
      _this.status = "fulfilled"
      resolves.forEach(function(callback) {
        value = callback(value) 
      });
    }, 0);
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
}).then(function(){
  console.log(_async)
})
console.log(_async)
