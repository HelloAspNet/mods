/**
 * Created by wyd on 16/2/21.
 */
(function(){
  /**
   * 为template 扩展自动渲染方法
   * @param dataTree  所有数据组成的对象
   */
  template.autoRender = function(dataTree){
    var name, el;
    for(name in dataTree) {
      if (
        Object.prototype.hasOwnProperty.call(dataTree, name)
        && (el = document.getElementById(name + 'Html'))
      ) {
        var data = dataTree[name];
        var callback = (function(el, name){
          return function (d) {
            el.innerHTML = template(name + 'Tpl', d);
          }
        })(el, name);
        typeof data !== 'function' ? callback(data) : data(callback);
      }
    }
  };

  var tree = {
    imageList: function(callback){
      $.getJSON('data.json').done(function(res){
        if(res.status !== 1){
          return alert(res.msg + ' - 错误代码: ' + res.code);
        }
        var data = {
          list: res.result
        };
        callback(data);
      });
    }
  };

  template.autoRender(tree);
})();