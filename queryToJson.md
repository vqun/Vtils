## queryToJson
JS里需要很经常出现把一个query串转换成对象，特别是经常会从location中获取一个query，然后转成对象，以便于获取其中某个key-value。

所谓query串，其格式就是来源于url中的search值，格式满足：`key1=value1&key2=value2&...&keyN=valueN`，其中，valueN可能为空，转成的对象就是：
```javascript
var obj = {
  "key1": value1,
  "key2": value2,
  ...
  "keyN": valueN
}
```
OK，知道了格式及转换格式后，其实，也很简单，就是对query做split操作，当然也可以使用正则exec。

以下给出split的实现：
```javascript
function queryToJson(query) {
  query = "+query; // conver to string
  var obj = {}, pairs = query.split('&'), name, cname, value, cur, step;
  step = obj;
  for (var k = pairs.length; k; ) {
    cur = pairs[--k].split("=");
    name = cur[0].split("."); value = cur[1];
    while (name.length > 1 && (cname = name.shift())) {
      if (!step[cname])
        step[cname] = {};
      step = step[cname]
    }
    step[name.shift()] = value;
    step = obj;
  }
  return obj;
}
```
顺道给出使用正则exec的实现：
```javascript
function queryToJson(query){
  query = "" + query; // conver to string
  var rg = /([^&=]+)\=([^&=]*)/gm;
  var mt, obj = {};
  while(mt = rg.exec(query)){
    obj[mt[1]] = mt[2];
  }
  return obj;
}
```
问题来了，哪个实现速度更快呢。。。请自行测试，谢谢！

以上实现省略了一些细节，比如，encode，key重复等。这个需要具体自行去解决，就不给出了。

**转载请注明：`https://github.com/vqun/Vtils/blob/master/queryToJson.md`**
