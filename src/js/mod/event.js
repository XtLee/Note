var EventCenter = (function() {
  var events = {}; // 定义空对象存放订阅事件的对象
  function on(evt, handler) {
    events[evt] = events[evt] || []; // 如果没有订阅当前事件，创建缓存列表
    events[evt].push({
      handler: handler
    }); // 订阅事件添加到缓存列表 
  }
  function fire(evt, args) {
    if(!events[evt]) {
      return;
    } // 如果当前元素订阅事件即推送事件，否则不推送  
    for(var i=0; i<events[evt].length; i++) {
      events[evt][i].handler(args);
    } // 遍历订阅当前事件的所有对象并发布消息
  }
  return {
    on: on,
    fire: fire
  }
})();

module.exports = EventCenter;