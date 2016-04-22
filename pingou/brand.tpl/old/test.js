function Mod(classId, url, links){
  this.classId = classId;
  this.url = url;
  this.links = links || [];
  this.image = null;
  this.children = [];
}
Mod.parse = function(obj){
  return new Link(obj.classId, obj.url, obj.links, obj.image);
};

function Link(value, text, top, left){
  this.value = '';
  this.text = '';
  this.top = 0;
  this.left = 0;
}

Link.parse = function(obj){
  return new Link(obj.value, obj.text, obj.top, obj.left);
};

var len = MODS_CONFIG.modulesLength;
var mods = [
  Mod.parse({classId: 'header', url: 'header.jpg'}),
  Mod.parse({classId: 'nav', url: 'nav.png'}),
  Mod.parse({classId: 'body', url: ''}),
  Mod.parse({classId: 'footer', url: 'footer.jpg'})
];
while(len--){
  var classId = len + 1;
  var mod = Mod.parse({classId: classId, url: `${classId}.jpg`});
  mods.splice(2, 0, mod);
}

var header = Mod.parse({classId: 'header', url: 'header.jpg'});
var nav =  Mod.parse({classId: 'nav', url: 'nav.png'});
var body =  Mod.parse({classId: 'body', url: ''});
var footer =  Mod.parse({classId: 'footer', url: 'footer.jpg'});

body.children = $(Array(20)).map(function(i, v){
  var id = i + 1;
  return Mod.parse({classId: id, url: id + '.jpg'});
});
