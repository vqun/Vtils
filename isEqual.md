曾经有一个交互，对列表筛选操作，用户筛选一堆后，当确定时，需要做一个判断：筛选前后，筛选项是否变化？  
如果筛选前后，实际筛选项没有变化，就不应该去发请求，因为这个交互是自己想出来的，于是乎，就出现了一个`全等`判断——`isEqual`。

`isEqual`和普通的相等判断不同，主要表现在：
* 1. 只比较基本类型，非基本类型，往`深比较`，就是往死里比
* 2. 数组比较与顺序无关，即[1,2]==[2,1]
以下是实现：
```javascript
function isEqual(o1, o2) {
  var type1 = is(o1), type2 = is(o2), matches = [];
  if (type1 != type2) return false;
  if (type1 == "Array") {
    if (o1.length != o2.length) return false;
    else {
      for (var j = o1.length; j--; )
        for (var q = o2.length; q--; )
          if (isEqual(o1[j], o2[q]))
            if (matches[q] != 1 && (matches[q] = 1))
              break;
      return matches.join("").length == o1.length;
    }
  }
  if (type1 == "Object") {
    for (var k in o1)
      if (!isEqual(o1[k], o2[k]))
        return false;
    for (var k in o2)
      if (!isEqual(o1[k], o2[k]))
        return false;
    return true;
  }
  return o1 == o2
}
```
因为遍历深度很深，复杂度O很大，以及使用了迭代，效率较低，建议高深度的酌情使用。目前，还没想到合适的算法，有想法的，不妨推荐，谢谢！

**转载请注明：`[https://github.com/vqun/Vtils/blob/master/isEqual.md](https://github.com/vqun/Vtils/blob/master/isEqual.md "isEqual")`**
