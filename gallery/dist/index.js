!function() {
    template.autoRender = function(dataTree) {
        var name, el;
        for (name in dataTree) if (Object.prototype.hasOwnProperty.call(dataTree, name) && (el = document.getElementById(name + "Html"))) {
            var data = dataTree[name];
            var callback = function(el, name) {
                return function(d) {
                    el.innerHTML = template(name + "Tpl", d);
                };
            }(el, name);
            "function" != typeof data ? callback(data) : data(callback);
        }
    };
    var tree = {
        imageList: function(callback) {
            $.getJSON("data.json").done(function(res) {
                if (1 !== res.status) return alert(res.msg + " - 错误代码: " + res.code);
                var data = {
                    list: res.result
                };
                callback(data);
            });
        }
    };
    template.autoRender(tree);
}();