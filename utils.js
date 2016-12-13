const toString = Object.prototype.toString;

export const random = Math.random;

export function zeroize(d, digits = 2) {
  const zeroes = new Array(digits).join('0');
  return (zeroes + d).slice(-digits);
}

export function is(o) {
  return toString.call(o).slice(8, -1).toLowerCase();
}

export const isArray = typeof Array.isArray === 'function' ? Array.isArray : arr => is(arr) === 'array';

export const isNumber = n => is(n) === 'number';

export const isFunction = fn => is(fn) === 'function';

export const isPlainObject = o => is(o) === 'object';

export const isString = s => is(s) === 'string';

export const keys = isFunction(Object.keys) ? Object.keys : (o) => {
  const kis = [];
  if(isArray(o)) {
    let k = o.length;
    while(k--) kis.unshift(k);
  } else {
    for(const k in o) {
      o.hasOwnProperty(k) && kis.push(k);
    }
  }
  return kis;
}

export function travel(o, fn = (name, value) => value) {
  if(isPlainObject(o)) {
    const ret = {};
    for(const k in o) {
      if(o.hasOwnProperty(k)) {
        const ok = o[k];
        ret[k] = travel(ok, fn);
      }
    }
    return ret;
  }
  if(isArray(o)) {
    const ret = [];
    for(let k = o.length; k--;) {
      const ok = o[k];
      ret.unshift(travel(ok, fn));
    }
    return ret;
  }
  return fn(o.name || 'undefined', o);
}

function arrayFrom(arrLike) {
  if (!('length' in arrLike)) {
    return [];
  }
  if ('from' in Array) {
    return Array.from(arrLike);
  }
  return Array.prototype.slice.call(arrLike);
}

/*
 * author: vqun@github.com
 * see: https://github.com/vqun/Vtils/blob/master/queryToJson.md
 */
export function queryToJson(query){
  query = "" + query; // conver to string
  var rg = /([^&=]+)(?:\=([^&=]*))?/gm;
  var mt, obj = {};
  while(mt = rg.exec(query)){
    obj[mt[1]] = mt[2] || '';
  }
  return obj;
}

export const assign = Object.assign || function (target, source) {
  for (const k in source) {
    source.hasOwnProperty(k) && (target[k] = source[k]);
  }
  return target;
}

let unique = Math.random();
export const gen = () => (unique = unique * .85).toString(36).slice(2);

export function some(arr, fn) {
  if ('some' in arr) {
    return arr.some(fn);
  } else {
    for (let k = arr.length; k--; ) {
      if (fn(arr[k])) {
        return true;
      }
    }
  }
  return false;
}

export function merge() {
  if (typeof Object.assign === 'function') {
    const args = arrayFrom(arguments);
    args.unshift({});
    return Object.assign.apply(null, args);
  } else {
    const o = {};
    for (let k = 0, L = arguments.length; k < L;) {
      const obj = arguments[k++];
      for (let j in obj) {
        if (obj.hasOwnProperty(j)) {
          o[j] = obj[j];
        }
      }
    }
    return o;
  }
}
