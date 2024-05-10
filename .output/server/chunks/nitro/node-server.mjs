globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync, constants } from 'fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'path';
import { fileURLToPath } from 'url';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d[\d.]{0,14}\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
const TRAILING_SLASH_RE = /\/$|\/\?/;
function hasTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return (s0.slice(0, -1) || "/") + (s.length > 0 ? `?${s.join("?")}` : "");
}
function withTrailingSlash(input = "", queryParameters = false) {
  if (!queryParameters) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  const [s0, ...s] = input.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "");
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto,
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  const [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  const { pathname, search, hash } = parsePath(
    path.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol,
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol ? parsed.protocol + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    // @ts-ignore
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode !== void 0) {
      node = nextNode;
    } else {
      node = node.placeholderChildNode;
      if (node !== null) {
        params[node.paramName] = section;
        paramsFound = true;
      } else {
        break;
      }
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildNode = childNode;
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      node = childNode;
    }
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections[sections.length - 1];
    node.data = null;
    if (Object.keys(node.children).length === 0) {
      const parentNode = node.parent;
      parentNode.children.delete(lastSection);
      parentNode.wildcardChildNode = null;
      parentNode.placeholderChildNode = null;
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildNode: null
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table);
}
function _createMatcher(table) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table) {
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path.startsWith(key)) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        table.static.set(path, node.data);
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== void 0) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === void 0) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : void 0;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? void 0 : arg1;
    if (data) {
      const encoding = arg2 === callback ? void 0 : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = void 0;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$1(this, "statusCode", 500);
    __publicField$1(this, "fatal", false);
    __publicField$1(this, "unhandled", false);
    __publicField$1(this, "statusMessage");
    __publicField$1(this, "data");
    __publicField$1(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$1(H3Error, "__h3_error__", true);
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (allowHead && event.method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  return event.web?.request?.body || event._requestBody || new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(name, value);
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders(
    getProxyRequestHeaders(event),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  const response = await _getFetch(opts.fetch)(target, {
    headers: opts.headers,
    ignoreResponseError: true,
    // make $ofetch.raw transparent
    ...opts.fetchOptions
  });
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name)) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. **/
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. **/
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    return Object.assign(handler, { __is_handler__: true });
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  return Object.assign(_handler, { __is_handler__: true });
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler
          );
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const app = {
    // @ts-ignore
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    handler,
    stack,
    options
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(
      normalizeLayer({ ...arg2, route: "/", handler: arg1 })
    );
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      await options.onAfterResponse(event, void 0);
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    let path = event.path || "/";
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      if (opts.preemptive || opts.preemtive) {
        throw createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${event.path || "/"}.`
        });
      } else {
        return;
      }
    }
    const method = (event.node.req.method || "get").toLowerCase();
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      if (opts.preemptive || opts.preemtive) {
        throw createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        });
      } else {
        return;
      }
    }
    event.context.matchedRoute = matched;
    const params = matched.params || {};
    event.context.params = params;
    return Promise.resolve(handler(event)).then((res) => {
      if (res === void 0 && (opts.preemptive || opts.preemtive)) {
        return null;
      }
      return res;
    });
  });
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      await sendError(event, error, !!app.options.debug);
    }
  };
  return toNodeHandle;
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1,
          timeout: context.options.timeout
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    }
    const hasBody = context.response.body && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch$1({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch || createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char.toUpperCase() === char;
}
function splitByCase(string_, separators) {
  const splitters = separators ?? STR_SPLITTERS;
  const parts = [];
  if (!string_ || typeof string_ !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of string_) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff[buff.length - 1];
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(string_, joiner) {
  return !string_ ? "" : (Array.isArray(string_) ? string_ : splitByCase(string_)).map((p) => p.toLowerCase()).join(joiner ?? "-");
}
function snakeCase(string_) {
  return kebabCase(string_, "_");
}

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {
    "buildId": "d8ff422f-c5e5-4204-81ff-d37e58c8bad0"
  }
};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {},
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
  }
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

class WordArray {
  constructor(words, sigBytes) {
    words = this.words = words || [];
    this.sigBytes = sigBytes === void 0 ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this._minBufferSize = 0;
    this.blockSize = 512 / 32;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    this._hash = new WordArray([...H]);
  }
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) || null;
    },
    getItemRaw(key) {
      return data.get(key) || null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          await asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys = rawKeys.map((key) => mount.mountpoint + normalizeKey$1(key)).filter((key) => !maskedMounts.some((p) => key.startsWith(p)));
        allKeys.push(...keys);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.\:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/gzdb/WebSitesProjects/azbuka/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(headers.Etag || headers.etag) || `W/"${hash(body)}"`;
      headers["last-modified"] = String(headers["Last-Modified"] || headers["last-modified"]) || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        event.node.res.setHeader(name, value);
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const isErrorPage = event.path.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e-6q26o9IoaD6/FKZMiMwtkI8v6Bw\"",
    "mtime": "2024-05-10T14:43:37.072Z",
    "size": 62,
    "path": "../public/_payload.json"
  },
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"1459-5d/2uABMChBll85FVgFiBX2YiqU\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 5209,
    "path": "../public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"3dbd-+EntQInyK5XivPqRumQiFJT89s4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 15805,
    "path": "../public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"11f9-1oSgc6kyDnv+tkU0usT17kMWGO4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 4601,
    "path": "../public/apple-touch-icon.png"
  },
  "/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e3f-wHy3f+f2QQMUPge4Sc1+99zeIhg\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 20031,
    "path": "../public/azbuka-f.jpg"
  },
  "/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10e1a-qU2QNTSC3rVY3UYOmfJ6O1nDy0g\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 69146,
    "path": "../public/azbuka1.webp"
  },
  "/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"b318-oj7HvuXrM6Vw6kt5Q1J3o9BLL6o\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 45848,
    "path": "../public/azbuka2.webp"
  },
  "/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"a94e-FJInr+r/8hgKfHE7glAuBgXj3kY\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 43342,
    "path": "../public/azbuka3.webp"
  },
  "/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"9b02-/gJxSD1l/2AmC11NK/M/WhS4vWk\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 39682,
    "path": "../public/azbuka4.webp"
  },
  "/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"ea00-4wk2iegmdpqzaPpTN094uc5pF1A\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 59904,
    "path": "../public/azbuka5.webp"
  },
  "/casino1.webp": {
    "type": "image/webp",
    "etag": "\"abb4-VYTcsm3XpGNGZ+oI5pVsebmNmhE\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 43956,
    "path": "../public/casino1.webp"
  },
  "/casino2.webp": {
    "type": "image/webp",
    "etag": "\"88b8-mtlrr2aOnCDtLvOZbTPUJnxuuW4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 35000,
    "path": "../public/casino2.webp"
  },
  "/casino3.webp": {
    "type": "image/webp",
    "etag": "\"d658-Hc6ob1EvxSjcNY5AcoXlKp3RYCU\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 54872,
    "path": "../public/casino3.webp"
  },
  "/casino4.webp": {
    "type": "image/webp",
    "etag": "\"cf72-G4paOYvHeLXK9Bl3U13y6MpOioI\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 53106,
    "path": "../public/casino4.webp"
  },
  "/casino5.webp": {
    "type": "image/webp",
    "etag": "\"92e2-yPeBFk/J3Odwuc/WeD+POdiLEGg\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 37602,
    "path": "../public/casino5.webp"
  },
  "/cazino11.jpg": {
    "type": "image/jpeg",
    "etag": "\"f341-5Vy/7NcqdhFYGlpXSHel8vcgr7E\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 62273,
    "path": "../public/cazino11.jpg"
  },
  "/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"104a6-kJUaIf5iGvhYXix5jLgfvXIpUAs\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 66726,
    "path": "../public/cazino12.jpg"
  },
  "/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"d3bf-wQHnyEoDebnCyredltnqnQamO0k\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 54207,
    "path": "../public/cazino13.jpg"
  },
  "/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"c2c6-WXsGf7NFm2o5p6f6dmLx1Ucx1y4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 49862,
    "path": "../public/cazino14.jpg"
  },
  "/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b183-se46KZpzY79bjzsDr77IpgBgc6I\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 45443,
    "path": "../public/cazino15.jpg"
  },
  "/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1d1-BcIra/05VD5P0kOd+VjGTXRb/3s\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 45521,
    "path": "../public/cazino16.jpg"
  },
  "/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d4f-7BmzgjGMj3hfiN8hn6IsL2GKimk\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 73039,
    "path": "../public/cazino17.jpg"
  },
  "/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c58-Ghcq+25VUWb+jlEbfsuxp0hZvW4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 40024,
    "path": "../public/cazino18.jpg"
  },
  "/cazinonew-5.webp": {
    "type": "image/webp",
    "etag": "\"1417a-VkkGDcklp5TpvW63tGHoUXeB3eE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 82298,
    "path": "../public/cazinonew-5.webp"
  },
  "/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"e610-kU8fSYp1ETQIkQW590M9+hY9Rsc\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 58896,
    "path": "../public/cazinonew5.webp"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"148-uSdtRPUSBqoaUqtRoR2jNkq5c+E\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 328,
    "path": "../public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"2cb-1rssq3TZxlvYdUGOYdsZWg0JbIE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 715,
    "path": "../public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-/0+h9imwguef2gNlD38wPEm6lrI\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"10b79-jmF32Mt1dCCM99XkPTUliNkxp9Y\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 68473,
    "path": "../public/golf1.jpg"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"3c2e-/0+h9imwguef2gNlD38wPEm6lrI\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 15406,
    "path": "../public/icon.png"
  },
  "/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"498fe-oAsj5TjE+Ympa+FbJtCy0PE95zk\"",
    "mtime": "2024-05-10T14:43:19.708Z",
    "size": 301310,
    "path": "../public/index.html"
  },
  "/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"4ff2-CVLMLoP+J4OO7b56r3QtJhp05c0\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 20466,
    "path": "../public/index.html.br"
  },
  "/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"97c7-fmayw/q0GKfJtH/+2nN7riNPMIc\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 38855,
    "path": "../public/index.html.gz"
  },
  "/ink.webp": {
    "type": "image/webp",
    "etag": "\"210b8-LF6TTbCeqbURwJpwSWq0r5/6H9w\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 135352,
    "path": "../public/ink.webp"
  },
  "/karty1.webp": {
    "type": "image/webp",
    "etag": "\"136e6-b3iso0uZ3kThhBNrgtIXkD2ntC4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 79590,
    "path": "../public/karty1.webp"
  },
  "/karty2.webp": {
    "type": "image/webp",
    "etag": "\"1084c-viLLRotBwHkUoPcQ+Lsh0cAY2VE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 67660,
    "path": "../public/karty2.webp"
  },
  "/karty3.jpg": {
    "type": "image/jpeg",
    "etag": "\"11e1f-GdFL+OB8zitc5tjU2hMmO/O6eh0\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 73247,
    "path": "../public/karty3.jpg"
  },
  "/karty3.webp": {
    "type": "image/webp",
    "etag": "\"feb2-pcdlCz+VdVyhlXCUfeSdTFvaQxw\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 65202,
    "path": "../public/karty3.webp"
  },
  "/karty5.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf7f-Fedr611OrdwudgF+CTfl//lxTrE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 53119,
    "path": "../public/karty5.jpg"
  },
  "/karty8.jpg": {
    "type": "image/jpeg",
    "etag": "\"e2ee-DcUUrznreveDEZf0JsShp9y3f4g\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 58094,
    "path": "../public/karty8.jpg"
  },
  "/karty9.jpg": {
    "type": "image/jpeg",
    "etag": "\"c1b8-+q5JwQiXf47rdlOaSinEQYOe4sg\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 49592,
    "path": "../public/karty9.jpg"
  },
  "/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"13640-y6gHzavbimAlFr2w24kZUn9x3jw\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 79424,
    "path": "../public/kartynew-1.webp"
  },
  "/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"9c0a-ZkrhS6WAesun5XuCxH45HRPyaLA\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 39946,
    "path": "../public/kartynew-2.webp"
  },
  "/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"665e-Ow+BOZ6q+IIY6d/hc1DlcctGVnI\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 26206,
    "path": "../public/kartynew-3.webp"
  },
  "/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"88c0-LorcZaQoHDpxguF96xo+NQuoDV4\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 35008,
    "path": "../public/kartynew-4.webp"
  },
  "/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"84de-+O+5eO/DFovmUFLnQhW7Ko1gie0\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 34014,
    "path": "../public/kartynew-5.webp"
  },
  "/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"66da-kPQ/XTHJ6L3yagIBj9JbePryEvs\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 26330,
    "path": "../public/kartynew-6.webp"
  },
  "/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3da8-VMXw4srGW8vgboqaDOGwtXweY0I\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 15784,
    "path": "../public/loft.jpg"
  },
  "/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b456-h34oHcLHxnqJf80eqRP2S8TecNA\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 46166,
    "path": "../public/loto1.jpg"
  },
  "/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"14f40-mzuZ9Fgy0pFHMM5GtNXGxdRS+/w\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 85824,
    "path": "../public/loto2.jpg"
  },
  "/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1414a-drXoEwHUBV9wXPJ4UXJYHil4okk\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 82250,
    "path": "../public/loto3.jpg"
  },
  "/loto4.jpg": {
    "type": "image/jpeg",
    "etag": "\"120c9-nrD2nZxbRH8f7AcgSWJ0yrsVFt0\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 73929,
    "path": "../public/loto4.jpg"
  },
  "/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"114da-PIr++siQs/9HWFEdswbztkA9Pog\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 70874,
    "path": "../public/loto5.jpg"
  },
  "/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"d0ca-Ti9Z5yPf6XegEvVf5jAFYZSqBuE\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 53450,
    "path": "../public/loto6.jpg"
  },
  "/loto7.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c53-kAJ/b8MxJsnuj4uAJID9GEzHiLI\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 40019,
    "path": "../public/loto7.jpg"
  },
  "/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"d933-O7apFw8cTYnNX72IGDxH+1ZwAbY\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 55603,
    "path": "../public/loto8.jpg"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"50c-pKKsmnM/ejZbAu38utdC/p02l94\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 1292,
    "path": "../public/manifest.json"
  },
  "/manifest.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"125-qDy3gCGhSrKoMcGMsKPvpRkSQiQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 293,
    "path": "../public/manifest.json.br"
  },
  "/manifest.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"161-DOHfs+SqYdh8338UKlWA7Fiv1CQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 353,
    "path": "../public/manifest.json.gz"
  },
  "/production.webp": {
    "type": "image/webp",
    "etag": "\"adae-txsTbXOVwo8XcXK1T3yx/93OGdg\"",
    "mtime": "2024-05-10T14:43:12.145Z",
    "size": 44462,
    "path": "../public/production.webp"
  },
  "/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"4a77-ODNyjQWciK84RfJMxFctSawrsow\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 19063,
    "path": "../public/royal.jpg"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"107-vzG6+RvdL83iSkXj8qG+M3M8b2k\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 263,
    "path": "../public/site.webmanifest"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5a2-l8fKxp+EeYRWHojyorrxEV5RUi8\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 1442,
    "path": "../public/sw.js"
  },
  "/sw.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1c8-aib4oiJ7C0Wy2QuGoja2xN+d4Fw\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 456,
    "path": "../public/sw.js.br"
  },
  "/sw.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"232-5BM/RAkAhHGkCc7kVSY4Y+W7WbQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 562,
    "path": "../public/sw.js.gz"
  },
  "/_nuxt/IconCSS.f0bffe53.js": {
    "type": "application/javascript",
    "etag": "\"322-9I+1rqIZ2i5hoPzQCdHCsQZFHmw\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 802,
    "path": "../public/_nuxt/IconCSS.f0bffe53.js"
  },
  "/_nuxt/IconCSS.fe0874d9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-wcoyXH7uDWGP6s8t4bK/iz3ANnk\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 258,
    "path": "../public/_nuxt/IconCSS.fe0874d9.css"
  },
  "/_nuxt/VCard.109b8863.js": {
    "type": "application/javascript",
    "etag": "\"69c1-evKcMbs8yTqjzggZG8ZF5subaL8\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 27073,
    "path": "../public/_nuxt/VCard.109b8863.js"
  },
  "/_nuxt/VCard.109b8863.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1e9e-QenFyhjS3/Hcj2EOWtELND6DzVQ\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 7838,
    "path": "../public/_nuxt/VCard.109b8863.js.br"
  },
  "/_nuxt/VCard.3e5b5e6e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a7b-hEsRa/jYH5lPI3RWLGxxQH0qpes\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 27259,
    "path": "../public/_nuxt/VCard.3e5b5e6e.css"
  },
  "/_nuxt/VCard.3e5b5e6e.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"ee6-Up68nga2ZhGqsty13Eely+SteIY\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 3814,
    "path": "../public/_nuxt/VCard.3e5b5e6e.css.br"
  },
  "/_nuxt/aboutme.402cd251.js": {
    "type": "application/javascript",
    "etag": "\"11c2-vSDqb+RlX7qklPHT799c35GOkA4\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 4546,
    "path": "../public/_nuxt/aboutme.402cd251.js"
  },
  "/_nuxt/aboutme.402cd251.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"611-r5U3PJQ8ltaaG/OT+JEqjRLny5g\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1553,
    "path": "../public/_nuxt/aboutme.402cd251.js.br"
  },
  "/_nuxt/auth.54b9d60a.js": {
    "type": "application/javascript",
    "etag": "\"2b3-Pt4Y0F8oMal41AqfAvg9hg/gbQk\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 691,
    "path": "../public/_nuxt/auth.54b9d60a.js"
  },
  "/_nuxt/azbuka-chisel.418cbe6d.js": {
    "type": "application/javascript",
    "etag": "\"17e1-xlB1biKvMOVgaeZfMBfdOm7z/i0\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 6113,
    "path": "../public/_nuxt/azbuka-chisel.418cbe6d.js"
  },
  "/_nuxt/azbuka-chisel.418cbe6d.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"5bb-IimPBhU9gSm/FsgMsmjSHn6apVg\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1467,
    "path": "../public/_nuxt/azbuka-chisel.418cbe6d.js.br"
  },
  "/_nuxt/cazino-vkusov.1aa8a9d5.js": {
    "type": "application/javascript",
    "etag": "\"18bf-PnCvuj3brzmsq8HbHFqpNSpQYmA\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 6335,
    "path": "../public/_nuxt/cazino-vkusov.1aa8a9d5.js"
  },
  "/_nuxt/cazino-vkusov.1aa8a9d5.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"555-1S6529fiuW1Qdn/LTJ22sqthBm8\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1365,
    "path": "../public/_nuxt/cazino-vkusov.1aa8a9d5.js.br"
  },
  "/_nuxt/components.4008c2f1.js": {
    "type": "application/javascript",
    "etag": "\"500-rZyhhlG+/nGHKhX31+JsGF9TCRo\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1280,
    "path": "../public/_nuxt/components.4008c2f1.js"
  },
  "/_nuxt/components.4008c2f1.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"21a-xMasqpoHcHURMdRI9Jyuag23ees\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 538,
    "path": "../public/_nuxt/components.4008c2f1.js.br"
  },
  "/_nuxt/entry.02700669.js": {
    "type": "application/javascript",
    "etag": "\"3b6a5-8zg0PXvfqAtYRK+P+OAWbnEHODc\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 243365,
    "path": "../public/_nuxt/entry.02700669.js"
  },
  "/_nuxt/entry.02700669.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"13613-A9NeEGPQ7zKYdtV9G1/hVPurbxM\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 79379,
    "path": "../public/_nuxt/entry.02700669.js.br"
  },
  "/_nuxt/entry.715de368.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5e19-//50zju+Qg+UtDkZlcjPT4sDfVU\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 24089,
    "path": "../public/_nuxt/entry.715de368.css"
  },
  "/_nuxt/entry.715de368.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"94c-//FT3+e1FDzdBLy7jEdRh4wfeRw\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 2380,
    "path": "../public/_nuxt/entry.715de368.css.br"
  },
  "/_nuxt/error-404.41dc0cbb.js": {
    "type": "application/javascript",
    "etag": "\"8ad-4w7MQ9p0VlYEie/2HICJO/W15I8\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 2221,
    "path": "../public/_nuxt/error-404.41dc0cbb.js"
  },
  "/_nuxt/error-404.41dc0cbb.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3cb-BY/joNoOu7rTEEBKupV5IdrbdMU\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 971,
    "path": "../public/_nuxt/error-404.41dc0cbb.js.br"
  },
  "/_nuxt/error-404.7fc72018.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-iNt1cqPQ0WDudfCTZVQd31BeRGs\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.7fc72018.css"
  },
  "/_nuxt/error-404.7fc72018.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3bc-A93v76RyHPRfYe4hBxU+FIdEgzQ\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 956,
    "path": "../public/_nuxt/error-404.7fc72018.css.br"
  },
  "/_nuxt/error-500.52443430.js": {
    "type": "application/javascript",
    "etag": "\"756-QUuhFgqFFRXdCu5WXBGn7/Mh8hc\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1878,
    "path": "../public/_nuxt/error-500.52443430.js"
  },
  "/_nuxt/error-500.52443430.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"348-LLoHh8DI+/utJKTs2NY9VbGgRhs\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 840,
    "path": "../public/_nuxt/error-500.52443430.js.br"
  },
  "/_nuxt/error-500.c5df6088.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-ByRo+49BgcevWdRjJy3CMx2IA5k\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.c5df6088.css"
  },
  "/_nuxt/error-500.c5df6088.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"274-4xEvWHud9noP0LeNHeTu/3OGrf0\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 628,
    "path": "../public/_nuxt/error-500.c5df6088.css.br"
  },
  "/_nuxt/index.07851027.js": {
    "type": "application/javascript",
    "etag": "\"1103-toqXCXVOsgv9hXwl3ffGT35ojdk\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 4355,
    "path": "../public/_nuxt/index.07851027.js"
  },
  "/_nuxt/index.07851027.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3fc-scmkLNFcmXSCKx0amiZ1vDL57b0\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1020,
    "path": "../public/_nuxt/index.07851027.js.br"
  },
  "/_nuxt/index.b78d0226.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c-N/owBWprcFGkg6QeshnhqzF7TIA\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 108,
    "path": "../public/_nuxt/index.b78d0226.css"
  },
  "/_nuxt/karty-na-bochku.e50944d4.js": {
    "type": "application/javascript",
    "etag": "\"12fc-WR8XCHLFvnF0JcY83ZiKfIUdur0\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 4860,
    "path": "../public/_nuxt/karty-na-bochku.e50944d4.js"
  },
  "/_nuxt/karty-na-bochku.e50944d4.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"55c-2Kz/NExAvKT3yG7r8Yz5BNnzHfY\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1372,
    "path": "../public/_nuxt/karty-na-bochku.e50944d4.js.br"
  },
  "/_nuxt/podarochnaya-produkciya.06dfce7e.js": {
    "type": "application/javascript",
    "etag": "\"e56-aT7lJNj3Nv/dSkW/4+y9U8wv89E\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 3670,
    "path": "../public/_nuxt/podarochnaya-produkciya.06dfce7e.js"
  },
  "/_nuxt/podarochnaya-produkciya.06dfce7e.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"46a-7UkPTeZIbBMPqH/EDbuHdgjQDjI\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1130,
    "path": "../public/_nuxt/podarochnaya-produkciya.06dfce7e.js.br"
  },
  "/_nuxt/video.5c65c472.js": {
    "type": "application/javascript",
    "etag": "\"1605-fxNjMmpY8UsH9KmQDF8tv9YLEuc\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 5637,
    "path": "../public/_nuxt/video.5c65c472.js"
  },
  "/_nuxt/video.5c65c472.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"535-G1AAIZwHC0pNekva0UMohjva8i4\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1333,
    "path": "../public/_nuxt/video.5c65c472.js.br"
  },
  "/azbuka-chisel/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e-Cll7IaPgN3lK+CDfXefZWFz506U\"",
    "mtime": "2024-05-10T14:43:23.092Z",
    "size": 62,
    "path": "../public/azbuka-chisel/_payload.json"
  },
  "/azbuka-chisel/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"48b92-9bVayGtJTx4XHn0H0r2C5K9KPSs\"",
    "mtime": "2024-05-10T14:43:19.708Z",
    "size": 297874,
    "path": "../public/azbuka-chisel/index.html"
  },
  "/azbuka-chisel/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"5166-Cb6dC6BbzpZYmHMJS0X9amBY8Sw\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 20838,
    "path": "../public/azbuka-chisel/index.html.br"
  },
  "/azbuka-chisel/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"98e0-VU6hj1svhwAzrX1gz1DQEMWb7MY\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 39136,
    "path": "../public/azbuka-chisel/index.html.gz"
  },
  "/cazino-vkusov/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e-Cll7IaPgN3lK+CDfXefZWFz506U\"",
    "mtime": "2024-05-10T14:43:26.816Z",
    "size": 62,
    "path": "../public/cazino-vkusov/_payload.json"
  },
  "/cazino-vkusov/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"48f3c-9ntoBBFRw7sW5y4wFkbSQ3bp4jQ\"",
    "mtime": "2024-05-10T14:43:19.708Z",
    "size": 298812,
    "path": "../public/cazino-vkusov/index.html"
  },
  "/cazino-vkusov/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"512e-DDLSTg2H1/bYoA81ojuKy/FEdH4\"",
    "mtime": "2024-05-10T14:43:39.012Z",
    "size": 20782,
    "path": "../public/cazino-vkusov/index.html.br"
  },
  "/cazino-vkusov/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"988d-LLpMJpQDxkI+7kbF+R8Q3kvLC9g\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 39053,
    "path": "../public/cazino-vkusov/index.html.gz"
  },
  "/karty-na-bochku/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e-Cll7IaPgN3lK+CDfXefZWFz506U\"",
    "mtime": "2024-05-10T14:43:28.448Z",
    "size": 62,
    "path": "../public/karty-na-bochku/_payload.json"
  },
  "/karty-na-bochku/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"4838a-jsIuaPBR3gzDdnrZLRrgzAZ4iyA\"",
    "mtime": "2024-05-10T14:43:19.708Z",
    "size": 295818,
    "path": "../public/karty-na-bochku/index.html"
  },
  "/karty-na-bochku/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"5018-BgvdJqeLkjrPzT9H5FV7xmx6B/s\"",
    "mtime": "2024-05-10T14:43:39.108Z",
    "size": 20504,
    "path": "../public/karty-na-bochku/index.html.br"
  },
  "/karty-na-bochku/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"97ea-I0RFLg7QbTH5VH+CeVOlZrNbtJQ\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 38890,
    "path": "../public/karty-na-bochku/index.html.gz"
  },
  "/video/_payload.json": {
    "type": "application/json;charset=utf-8",
    "etag": "\"3e-Cll7IaPgN3lK+CDfXefZWFz506U\"",
    "mtime": "2024-05-10T14:43:29.432Z",
    "size": 62,
    "path": "../public/video/_payload.json"
  },
  "/video/index.html": {
    "type": "text/html;charset=utf-8",
    "etag": "\"4a184-X/O6SeUmDd3ce5Y79VgIq8VCRj4\"",
    "mtime": "2024-05-10T14:43:19.708Z",
    "size": 303492,
    "path": "../public/video/index.html"
  },
  "/video/index.html.br": {
    "type": "text/html; charset=utf-8",
    "encoding": "br",
    "etag": "\"51ba-CRIFasmko4MYlLsnNsHCMUaBmFY\"",
    "mtime": "2024-05-10T14:43:39.360Z",
    "size": 20922,
    "path": "../public/video/index.html.br"
  },
  "/video/index.html.gz": {
    "type": "text/html; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"9868-fZXSviWELr5CFSyVRZ4xxPvrcv0\"",
    "mtime": "2024-05-10T14:43:38.980Z",
    "size": 39016,
    "path": "../public/video/index.html.gz"
  },
  "/_ipx/f_jpg&s_1024x683/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.368Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_1024x683/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_1024x683/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.640Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_1024x683/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_1024x683/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.052Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_1024x683/golf1.jpg"
  },
  "/_ipx/f_jpg&s_1024x683/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.236Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_1024x683/loft.jpg"
  },
  "/_ipx/f_jpg&s_1024x683/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.872Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_1024x683/royal.jpg"
  },
  "/_ipx/f_jpg&s_10486x6991/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.404Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_10486x6991/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_10486x6991/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.868Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_10486x6991/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_10486x6991/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_10486x6991/golf1.jpg"
  },
  "/_ipx/f_jpg&s_10486x6991/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.280Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_10486x6991/loft.jpg"
  },
  "/_ipx/f_jpg&s_10486x6991/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.008Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_10486x6991/royal.jpg"
  },
  "/_ipx/f_jpg&s_11796x7864/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.408Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_11796x7864/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_11796x7864/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.860Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_11796x7864/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_11796x7864/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_11796x7864/golf1.jpg"
  },
  "/_ipx/f_jpg&s_11796x7864/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-NbaxZMnwnhvjbjGV86vbKk1t8i0\"",
    "mtime": "2024-05-10T14:43:29.280Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_11796x7864/loft.jpg"
  },
  "/_ipx/f_jpg&s_11796x7864/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.980Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_11796x7864/royal.jpg"
  },
  "/_ipx/f_jpg&s_16384x10923/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.436Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_16384x10923/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_16384x10923/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.860Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_16384x10923/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_16384x10923/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.208Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_16384x10923/golf1.jpg"
  },
  "/_ipx/f_jpg&s_16384x10923/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.292Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_16384x10923/loft.jpg"
  },
  "/_ipx/f_jpg&s_16384x10923/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.004Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_16384x10923/royal.jpg"
  },
  "/_ipx/f_jpg&s_2048x1366/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.356Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_2048x1366/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_2048x1366/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.744Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_2048x1366/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_2048x1366/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_2048x1366/golf1.jpg"
  },
  "/_ipx/f_jpg&s_2048x1366/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.224Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_2048x1366/loft.jpg"
  },
  "/_ipx/f_jpg&s_2048x1366/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.928Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_2048x1366/royal.jpg"
  },
  "/_ipx/f_jpg&s_20972x13982/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.436Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_20972x13982/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_20972x13982/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.860Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_20972x13982/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_20972x13982/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.160Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_20972x13982/golf1.jpg"
  },
  "/_ipx/f_jpg&s_20972x13982/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.284Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_20972x13982/loft.jpg"
  },
  "/_ipx/f_jpg&s_20972x13982/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.004Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_20972x13982/royal.jpg"
  },
  "/_ipx/f_jpg&s_23593x15729/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.436Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_23593x15729/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_23593x15729/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.928Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_23593x15729/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_23593x15729/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.244Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_23593x15729/golf1.jpg"
  },
  "/_ipx/f_jpg&s_23593x15729/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.356Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_23593x15729/loft.jpg"
  },
  "/_ipx/f_jpg&s_23593x15729/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.016Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_23593x15729/royal.jpg"
  },
  "/_ipx/f_jpg&s_32768x21846/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.436Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_32768x21846/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_32768x21846/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.860Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_32768x21846/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_32768x21846/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.208Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_32768x21846/golf1.jpg"
  },
  "/_ipx/f_jpg&s_32768x21846/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.320Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_32768x21846/loft.jpg"
  },
  "/_ipx/f_jpg&s_32768x21846/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.016Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_32768x21846/royal.jpg"
  },
  "/_ipx/f_jpg&s_4096x2731/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.368Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_4096x2731/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_4096x2731/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.744Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_4096x2731/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_4096x2731/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_4096x2731/golf1.jpg"
  },
  "/_ipx/f_jpg&s_4096x2731/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.224Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_4096x2731/loft.jpg"
  },
  "/_ipx/f_jpg&s_4096x2731/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.928Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_4096x2731/royal.jpg"
  },
  "/_ipx/f_jpg&s_47186x31458/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.456Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_47186x31458/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_47186x31458/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.928Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_47186x31458/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_47186x31458/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.208Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_47186x31458/golf1.jpg"
  },
  "/_ipx/f_jpg&s_47186x31458/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.336Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_47186x31458/loft.jpg"
  },
  "/_ipx/f_jpg&s_47186x31458/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:29.016Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_47186x31458/royal.jpg"
  },
  "/_ipx/f_jpg&s_5898x3932/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.392Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_5898x3932/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_5898x3932/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.744Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_5898x3932/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_5898x3932/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_5898x3932/golf1.jpg"
  },
  "/_ipx/f_jpg&s_5898x3932/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-NbaxZMnwnhvjbjGV86vbKk1t8i0\"",
    "mtime": "2024-05-10T14:43:29.280Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_5898x3932/loft.jpg"
  },
  "/_ipx/f_jpg&s_5898x3932/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.940Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_5898x3932/royal.jpg"
  },
  "/_ipx/f_jpg&s_8192x5462/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"5bd2-vJwpwxZrKj8df/h7n/UGLia+uwA\"",
    "mtime": "2024-05-10T14:43:29.368Z",
    "size": 23506,
    "path": "../public/_ipx/f_jpg&s_8192x5462/azbuka-f.jpg"
  },
  "/_ipx/f_jpg&s_8192x5462/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1be-9YrEhFGSGJ7lko2SqCcaUOyx/6Y\"",
    "mtime": "2024-05-10T14:43:28.744Z",
    "size": 45502,
    "path": "../public/_ipx/f_jpg&s_8192x5462/cazino15.jpg"
  },
  "/_ipx/f_jpg&s_8192x5462/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"14fcd-r4W8tCdyApN59GWKBgApASDxXwA\"",
    "mtime": "2024-05-10T14:43:29.128Z",
    "size": 85965,
    "path": "../public/_ipx/f_jpg&s_8192x5462/golf1.jpg"
  },
  "/_ipx/f_jpg&s_8192x5462/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3b2e-u731OONtFACQ3wzvlmMMtZjwrZM\"",
    "mtime": "2024-05-10T14:43:29.244Z",
    "size": 15150,
    "path": "../public/_ipx/f_jpg&s_8192x5462/loft.jpg"
  },
  "/_ipx/f_jpg&s_8192x5462/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"519a-eAhyovV3XJNzkumtG+ODR0e5XJA\"",
    "mtime": "2024-05-10T14:43:28.940Z",
    "size": 20890,
    "path": "../public/_ipx/f_jpg&s_8192x5462/royal.jpg"
  },
  "/_ipx/f_webp&s_1024x683/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:33.880Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_1024x683/azbuka1.webp"
  },
  "/_ipx/f_webp&s_1024x683/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.452Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_1024x683/azbuka5.webp"
  },
  "/_ipx/f_webp&s_1024x683/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:32.748Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_1024x683/casino5.webp"
  },
  "/_ipx/f_webp&s_1024x683/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.308Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_1024x683/karty1.webp"
  },
  "/_ipx/f_webp&s_10486x6991/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.856Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_10486x6991/azbuka1.webp"
  },
  "/_ipx/f_webp&s_10486x6991/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.208Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_10486x6991/azbuka5.webp"
  },
  "/_ipx/f_webp&s_10486x6991/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.432Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_10486x6991/casino5.webp"
  },
  "/_ipx/f_webp&s_10486x6991/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.024Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_10486x6991/karty1.webp"
  },
  "/_ipx/f_webp&s_11796x7864/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.856Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_11796x7864/azbuka1.webp"
  },
  "/_ipx/f_webp&s_11796x7864/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.988Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_11796x7864/azbuka5.webp"
  },
  "/_ipx/f_webp&s_11796x7864/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.432Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_11796x7864/casino5.webp"
  },
  "/_ipx/f_webp&s_11796x7864/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.728Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_11796x7864/karty1.webp"
  },
  "/_ipx/f_webp&s_16384x10923/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.852Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_16384x10923/azbuka1.webp"
  },
  "/_ipx/f_webp&s_16384x10923/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.208Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_16384x10923/azbuka5.webp"
  },
  "/_ipx/f_webp&s_16384x10923/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.432Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_16384x10923/casino5.webp"
  },
  "/_ipx/f_webp&s_16384x10923/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.348Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_16384x10923/karty1.webp"
  },
  "/_ipx/f_webp&s_2048x1366/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.856Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_2048x1366/azbuka1.webp"
  },
  "/_ipx/f_webp&s_2048x1366/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.780Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_2048x1366/azbuka5.webp"
  },
  "/_ipx/f_webp&s_2048x1366/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:32.924Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_2048x1366/casino5.webp"
  },
  "/_ipx/f_webp&s_2048x1366/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.640Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_2048x1366/karty1.webp"
  },
  "/_ipx/f_webp&s_20972x13982/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.852Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_20972x13982/azbuka1.webp"
  },
  "/_ipx/f_webp&s_20972x13982/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.212Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_20972x13982/azbuka5.webp"
  },
  "/_ipx/f_webp&s_20972x13982/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.760Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_20972x13982/casino5.webp"
  },
  "/_ipx/f_webp&s_20972x13982/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.024Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_20972x13982/karty1.webp"
  },
  "/_ipx/f_webp&s_23593x15729/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:35.308Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_23593x15729/azbuka1.webp"
  },
  "/_ipx/f_webp&s_23593x15729/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.376Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_23593x15729/azbuka5.webp"
  },
  "/_ipx/f_webp&s_23593x15729/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.760Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_23593x15729/casino5.webp"
  },
  "/_ipx/f_webp&s_23593x15729/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.452Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_23593x15729/karty1.webp"
  },
  "/_ipx/f_webp&s_30x30/android-chrome-192x192.png": {
    "type": "image/webp",
    "etag": "\"1ae-dFN6AOmmIhmrrsXhQA9CFG8W0cQ\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 430,
    "path": "../public/_ipx/f_webp&s_30x30/android-chrome-192x192.png"
  },
  "/_ipx/f_webp&s_32768x21846/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.856Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_32768x21846/azbuka1.webp"
  },
  "/_ipx/f_webp&s_32768x21846/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.348Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_32768x21846/azbuka5.webp"
  },
  "/_ipx/f_webp&s_32768x21846/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.760Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_32768x21846/casino5.webp"
  },
  "/_ipx/f_webp&s_32768x21846/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.348Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_32768x21846/karty1.webp"
  },
  "/_ipx/f_webp&s_4096x2731/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.024Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_4096x2731/azbuka1.webp"
  },
  "/_ipx/f_webp&s_4096x2731/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.988Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_4096x2731/azbuka5.webp"
  },
  "/_ipx/f_webp&s_4096x2731/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:32.924Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_4096x2731/casino5.webp"
  },
  "/_ipx/f_webp&s_4096x2731/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.728Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_4096x2731/karty1.webp"
  },
  "/_ipx/f_webp&s_47186x31458/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:35.308Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_47186x31458/azbuka1.webp"
  },
  "/_ipx/f_webp&s_47186x31458/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:37.444Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_47186x31458/azbuka5.webp"
  },
  "/_ipx/f_webp&s_47186x31458/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.880Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_47186x31458/casino5.webp"
  },
  "/_ipx/f_webp&s_47186x31458/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:36.452Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_47186x31458/karty1.webp"
  },
  "/_ipx/f_webp&s_5898x3932/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.856Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_5898x3932/azbuka1.webp"
  },
  "/_ipx/f_webp&s_5898x3932/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.988Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_5898x3932/azbuka5.webp"
  },
  "/_ipx/f_webp&s_5898x3932/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.432Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_5898x3932/casino5.webp"
  },
  "/_ipx/f_webp&s_5898x3932/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.768Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_5898x3932/karty1.webp"
  },
  "/_ipx/f_webp&s_60x60/android-chrome-192x192.png": {
    "type": "image/webp",
    "etag": "\"2ca-ZyiH1vhAdu2PZHmoCiKAj5j7FWo\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 714,
    "path": "../public/_ipx/f_webp&s_60x60/android-chrome-192x192.png"
  },
  "/_ipx/f_webp&s_8192x5462/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:34.852Z",
    "size": 68136,
    "path": "../public/_ipx/f_webp&s_8192x5462/azbuka1.webp"
  },
  "/_ipx/f_webp&s_8192x5462/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"e57c-m5ZUT8vowy5YwpRa/dfh2tDatAM\"",
    "mtime": "2024-05-10T14:43:36.988Z",
    "size": 58748,
    "path": "../public/_ipx/f_webp&s_8192x5462/azbuka5.webp"
  },
  "/_ipx/f_webp&s_8192x5462/casino5.webp": {
    "type": "image/webp",
    "etag": "\"8a3e-xNrFGr16XWF5pgN1XukXdJFTPOE\"",
    "mtime": "2024-05-10T14:43:33.432Z",
    "size": 35390,
    "path": "../public/_ipx/f_webp&s_8192x5462/casino5.webp"
  },
  "/_ipx/f_webp&s_8192x5462/karty1.webp": {
    "type": "image/webp",
    "etag": "\"1152c-hWTrYPa1mn+a21fJ1ToSTNG/FPU\"",
    "mtime": "2024-05-10T14:43:35.640Z",
    "size": 70956,
    "path": "../public/_ipx/f_webp&s_8192x5462/karty1.webp"
  },
  "/_ipx/w_1024&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"12660-nQnmW1p7c6QrUK89hzkkv0dtTUY\"",
    "mtime": "2024-05-10T14:43:31.036Z",
    "size": 75360,
    "path": "../public/_ipx/w_1024&f_webp/ink.webp"
  },
  "/_ipx/w_10486&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.584Z",
    "size": 140356,
    "path": "../public/_ipx/w_10486&f_webp/ink.webp"
  },
  "/_ipx/w_11796&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.584Z",
    "size": 140356,
    "path": "../public/_ipx/w_11796&f_webp/ink.webp"
  },
  "/_ipx/w_128/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"133c-mFUKBr8FR3XB5ynVT+a+1zs4Bn0\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 4924,
    "path": "../public/_ipx/w_128/azbuka1.webp"
  },
  "/_ipx/w_128/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"f6e-IcfwKTZgT2s2oLsxkhWpD0ch04U\"",
    "mtime": "2024-05-10T14:43:20.460Z",
    "size": 3950,
    "path": "../public/_ipx/w_128/azbuka2.webp"
  },
  "/_ipx/w_128/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"fec-s4cB+9NXWu8urDANOaLN3WYr6Xs\"",
    "mtime": "2024-05-10T14:43:20.884Z",
    "size": 4076,
    "path": "../public/_ipx/w_128/azbuka3.webp"
  },
  "/_ipx/w_128/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"eaa-ju6uKeK4Q/uBjDtf/Zb9ZYnUlLE\"",
    "mtime": "2024-05-10T14:43:21.348Z",
    "size": 3754,
    "path": "../public/_ipx/w_128/azbuka4.webp"
  },
  "/_ipx/w_128/casino1.webp": {
    "type": "image/webp",
    "etag": "\"dc6-HrMVAdpfpSdT1nBSd06WUZCnx6w\"",
    "mtime": "2024-05-10T14:43:23.268Z",
    "size": 3526,
    "path": "../public/_ipx/w_128/casino1.webp"
  },
  "/_ipx/w_128/casino2.webp": {
    "type": "image/webp",
    "etag": "\"e2e-4skRrKqFkosAkzDPrRDjN4AOrDQ\"",
    "mtime": "2024-05-10T14:43:23.576Z",
    "size": 3630,
    "path": "../public/_ipx/w_128/casino2.webp"
  },
  "/_ipx/w_128/casino3.webp": {
    "type": "image/webp",
    "etag": "\"e14-FC7GQDaKMQ+4bxGDLxJH2qrXiOQ\"",
    "mtime": "2024-05-10T14:43:24.064Z",
    "size": 3604,
    "path": "../public/_ipx/w_128/casino3.webp"
  },
  "/_ipx/w_128/casino4.webp": {
    "type": "image/webp",
    "etag": "\"ddc-k9kwRKXfS+7tKRzeSLOZJ9AcU6w\"",
    "mtime": "2024-05-10T14:43:24.664Z",
    "size": 3548,
    "path": "../public/_ipx/w_128/casino4.webp"
  },
  "/_ipx/w_128/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"1250-R6CgTQUgtJzexOITvTlUTB3Dl80\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 4688,
    "path": "../public/_ipx/w_128/cazino12.jpg"
  },
  "/_ipx/w_128/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d2-yet97D/+jdJN1IN4VRzsGXV2yK0\"",
    "mtime": "2024-05-10T14:43:25.756Z",
    "size": 4562,
    "path": "../public/_ipx/w_128/cazino13.jpg"
  },
  "/_ipx/w_128/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"101c-igudyeH+rPWOOSXVwPUC9kjd1ms\"",
    "mtime": "2024-05-10T14:43:25.896Z",
    "size": 4124,
    "path": "../public/_ipx/w_128/cazino14.jpg"
  },
  "/_ipx/w_128/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"1098-a96HB5SKZv8axxFPfV+RmwcQX4g\"",
    "mtime": "2024-05-10T14:43:26.120Z",
    "size": 4248,
    "path": "../public/_ipx/w_128/cazino15.jpg"
  },
  "/_ipx/w_128/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"f55-Z1CGZ2MpYuv02cM0kSCoqCW+W00\"",
    "mtime": "2024-05-10T14:43:26.304Z",
    "size": 3925,
    "path": "../public/_ipx/w_128/cazino16.jpg"
  },
  "/_ipx/w_128/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"1226-hm/7zLQNR94reC31P0Y9jmD4v64\"",
    "mtime": "2024-05-10T14:43:26.484Z",
    "size": 4646,
    "path": "../public/_ipx/w_128/cazino17.jpg"
  },
  "/_ipx/w_128/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"fdc-EKcdxsJ5p+cNxLnPNI8Q84gmoHU\"",
    "mtime": "2024-05-10T14:43:26.668Z",
    "size": 4060,
    "path": "../public/_ipx/w_128/cazino18.jpg"
  },
  "/_ipx/w_128/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"dae-aQk94re3t/c69kO4PkNIry19Fx4\"",
    "mtime": "2024-05-10T14:43:25.088Z",
    "size": 3502,
    "path": "../public/_ipx/w_128/cazinonew5.webp"
  },
  "/_ipx/w_128/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"104c-8y4Ci2NbnCIGlv6PMBKPjodEvv8\"",
    "mtime": "2024-05-10T14:43:26.924Z",
    "size": 4172,
    "path": "../public/_ipx/w_128/kartynew-1.webp"
  },
  "/_ipx/w_128/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"1002-uMItceTNv8mAg3KaswmqsIhl9y0\"",
    "mtime": "2024-05-10T14:43:27.192Z",
    "size": 4098,
    "path": "../public/_ipx/w_128/kartynew-2.webp"
  },
  "/_ipx/w_128/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"dec-DLLuVNFVuGOratRETr0WN1u5hc8\"",
    "mtime": "2024-05-10T14:43:27.496Z",
    "size": 3564,
    "path": "../public/_ipx/w_128/kartynew-3.webp"
  },
  "/_ipx/w_128/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"d40-ZHilW44eIoV2ENUc07Sg62EiiLk\"",
    "mtime": "2024-05-10T14:43:27.800Z",
    "size": 3392,
    "path": "../public/_ipx/w_128/kartynew-4.webp"
  },
  "/_ipx/w_128/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"f6c-u7hzLB6V37njVLeicoySMzVlOns\"",
    "mtime": "2024-05-10T14:43:28.036Z",
    "size": 3948,
    "path": "../public/_ipx/w_128/kartynew-5.webp"
  },
  "/_ipx/w_128/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"e42-G/MXesk/Ht9eRSJrpcv1kbaiZgc\"",
    "mtime": "2024-05-10T14:43:28.440Z",
    "size": 3650,
    "path": "../public/_ipx/w_128/kartynew-6.webp"
  },
  "/_ipx/w_128/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"11b1-oCI2SoFRt4qJe2QNKSdymU+WP7M\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 4529,
    "path": "../public/_ipx/w_128/loto1.jpg"
  },
  "/_ipx/w_128/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"11b7-gRu3pIH7rLTvDyNJyxlYVyLmvKs\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 4535,
    "path": "../public/_ipx/w_128/loto2.jpg"
  },
  "/_ipx/w_128/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"10a8-iZg5uqrs34H63/u74q25nY7+zj0\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 4264,
    "path": "../public/_ipx/w_128/loto3.jpg"
  },
  "/_ipx/w_128/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"1308-Wbx5kABhd7vMpe6m+/25eBjA//M\"",
    "mtime": "2024-05-10T14:43:22.552Z",
    "size": 4872,
    "path": "../public/_ipx/w_128/loto5.jpg"
  },
  "/_ipx/w_128/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"1129-pcEguIlEHSVz2kHWTItD1birKBE\"",
    "mtime": "2024-05-10T14:43:22.840Z",
    "size": 4393,
    "path": "../public/_ipx/w_128/loto6.jpg"
  },
  "/_ipx/w_128/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"11fd-8CK3ocp1Kt5uvrhgy4YLOrSEQgo\"",
    "mtime": "2024-05-10T14:43:23.060Z",
    "size": 4605,
    "path": "../public/_ipx/w_128/loto8.jpg"
  },
  "/_ipx/w_1280/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 68136,
    "path": "../public/_ipx/w_1280/azbuka1.webp"
  },
  "/_ipx/w_1280/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"aee2-v/tgqTeTdP9M9Su5REU7zhC4Tkk\"",
    "mtime": "2024-05-10T14:43:20.884Z",
    "size": 44770,
    "path": "../public/_ipx/w_1280/azbuka2.webp"
  },
  "/_ipx/w_1280/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"a352-N/Vk0OCVRW/sYDiad/MKZGH/H9Q\"",
    "mtime": "2024-05-10T14:43:21.344Z",
    "size": 41810,
    "path": "../public/_ipx/w_1280/azbuka3.webp"
  },
  "/_ipx/w_1280/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"93d6-NahNtC2/kN+wzly0CHLmZwXt+9U\"",
    "mtime": "2024-05-10T14:43:21.780Z",
    "size": 37846,
    "path": "../public/_ipx/w_1280/azbuka4.webp"
  },
  "/_ipx/w_1280/casino1.webp": {
    "type": "image/webp",
    "etag": "\"a546-fxkc9rVI0F1AthsGTkXayF0PHcI\"",
    "mtime": "2024-05-10T14:43:23.572Z",
    "size": 42310,
    "path": "../public/_ipx/w_1280/casino1.webp"
  },
  "/_ipx/w_1280/casino2.webp": {
    "type": "image/webp",
    "etag": "\"81b2-oBoSSawN3kjTWAbgdwwsFBRuPns\"",
    "mtime": "2024-05-10T14:43:23.988Z",
    "size": 33202,
    "path": "../public/_ipx/w_1280/casino2.webp"
  },
  "/_ipx/w_1280/casino3.webp": {
    "type": "image/webp",
    "etag": "\"ce0e-LU+1QvIVrLcpTOHlbZNNxGxqNWY\"",
    "mtime": "2024-05-10T14:43:24.512Z",
    "size": 52750,
    "path": "../public/_ipx/w_1280/casino3.webp"
  },
  "/_ipx/w_1280/casino4.webp": {
    "type": "image/webp",
    "etag": "\"c936-Wxhl4v4Tr9imul7LrhKFdT2dDds\"",
    "mtime": "2024-05-10T14:43:25.068Z",
    "size": 51510,
    "path": "../public/_ipx/w_1280/casino4.webp"
  },
  "/_ipx/w_1280/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"f681-+bfAoci7crhFrakGZgqH6uoKV5c\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 63105,
    "path": "../public/_ipx/w_1280/cazino12.jpg"
  },
  "/_ipx/w_1280/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca99-yD3WC3/p9lLpHXEbONDeJYOs4fQ\"",
    "mtime": "2024-05-10T14:43:25.840Z",
    "size": 51865,
    "path": "../public/_ipx/w_1280/cazino13.jpg"
  },
  "/_ipx/w_1280/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"ba67-k4bVQkiUZyO/MGJr403r8EN39nw\"",
    "mtime": "2024-05-10T14:43:26.060Z",
    "size": 47719,
    "path": "../public/_ipx/w_1280/cazino14.jpg"
  },
  "/_ipx/w_1280/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"a715-3UQG0/DDWHhXEwOcsxG7tv80g2M\"",
    "mtime": "2024-05-10T14:43:26.232Z",
    "size": 42773,
    "path": "../public/_ipx/w_1280/cazino15.jpg"
  },
  "/_ipx/w_1280/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a8f9-f+yG7AxpQ3zOV65hIJ4UMQsrq4Q\"",
    "mtime": "2024-05-10T14:43:26.368Z",
    "size": 43257,
    "path": "../public/_ipx/w_1280/cazino16.jpg"
  },
  "/_ipx/w_1280/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11215-DpFFyQlJSTbAm3WZi9NrfQ/mBQY\"",
    "mtime": "2024-05-10T14:43:26.668Z",
    "size": 70165,
    "path": "../public/_ipx/w_1280/cazino17.jpg"
  },
  "/_ipx/w_1280/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"93fc-Z6NgCMyqZPkZpeYmJCL2XBXqyks\"",
    "mtime": "2024-05-10T14:43:26.784Z",
    "size": 37884,
    "path": "../public/_ipx/w_1280/cazino18.jpg"
  },
  "/_ipx/w_1280/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"eece-IzzpUCi/i1ehLWOA66SovgLCbmM\"",
    "mtime": "2024-05-10T14:43:25.428Z",
    "size": 61134,
    "path": "../public/_ipx/w_1280/cazinonew5.webp"
  },
  "/_ipx/w_1280/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"a7ea-21sn+0epbSJTjDMTCbyQym6aBB0\"",
    "mtime": "2024-05-10T14:43:27.164Z",
    "size": 42986,
    "path": "../public/_ipx/w_1280/kartynew-1.webp"
  },
  "/_ipx/w_1280/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"a39e-x2xdfmA6EJ42x4RNEvjFeS4TZhQ\"",
    "mtime": "2024-05-10T14:43:27.404Z",
    "size": 41886,
    "path": "../public/_ipx/w_1280/kartynew-2.webp"
  },
  "/_ipx/w_1280/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"6970-Ecw67BFbZSvmMGIZmVpFDp5M+28\"",
    "mtime": "2024-05-10T14:43:27.676Z",
    "size": 26992,
    "path": "../public/_ipx/w_1280/kartynew-3.webp"
  },
  "/_ipx/w_1280/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"8d18-CimfO0pb5fSeAPDfLbrmHR8jAww\"",
    "mtime": "2024-05-10T14:43:28.036Z",
    "size": 36120,
    "path": "../public/_ipx/w_1280/kartynew-4.webp"
  },
  "/_ipx/w_1280/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"8894-rfJB6mgXDcolvdOmeE6H+S/lcmI\"",
    "mtime": "2024-05-10T14:43:28.276Z",
    "size": 34964,
    "path": "../public/_ipx/w_1280/kartynew-5.webp"
  },
  "/_ipx/w_1280/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"6956-WfBgyt4JjwJtmZoRSzV9LJM0RF8\"",
    "mtime": "2024-05-10T14:43:28.444Z",
    "size": 26966,
    "path": "../public/_ipx/w_1280/kartynew-6.webp"
  },
  "/_ipx/w_1280/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a91c-TKinx1TlmX3aI/eMeu1L7LtPcfo\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 43292,
    "path": "../public/_ipx/w_1280/loto1.jpg"
  },
  "/_ipx/w_1280/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"147ef-k3417Irp0piU/3LjeGyQD9iZEGU\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 83951,
    "path": "../public/_ipx/w_1280/loto2.jpg"
  },
  "/_ipx/w_1280/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"13c8e-BXp/hO0kTO5hUU/UKRgFHvtHCAs\"",
    "mtime": "2024-05-10T14:43:22.528Z",
    "size": 81038,
    "path": "../public/_ipx/w_1280/loto3.jpg"
  },
  "/_ipx/w_1280/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"10a8f-CGaJpyIPtfkccWh5F8LJQbwBWGY\"",
    "mtime": "2024-05-10T14:43:22.724Z",
    "size": 68239,
    "path": "../public/_ipx/w_1280/loto5.jpg"
  },
  "/_ipx/w_1280/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c548-zSPVb/5rGCW3kB2/y03GOUqzpGg\"",
    "mtime": "2024-05-10T14:43:22.912Z",
    "size": 50504,
    "path": "../public/_ipx/w_1280/loto6.jpg"
  },
  "/_ipx/w_1280/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd64-GKo2C/KQGUfu7BI6916hkYtqmgg\"",
    "mtime": "2024-05-10T14:43:23.060Z",
    "size": 52580,
    "path": "../public/_ipx/w_1280/loto8.jpg"
  },
  "/_ipx/w_1536/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:20.452Z",
    "size": 68136,
    "path": "../public/_ipx/w_1536/azbuka1.webp"
  },
  "/_ipx/w_1536/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"aee2-v/tgqTeTdP9M9Su5REU7zhC4Tkk\"",
    "mtime": "2024-05-10T14:43:20.884Z",
    "size": 44770,
    "path": "../public/_ipx/w_1536/azbuka2.webp"
  },
  "/_ipx/w_1536/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"a352-N/Vk0OCVRW/sYDiad/MKZGH/H9Q\"",
    "mtime": "2024-05-10T14:43:21.344Z",
    "size": 41810,
    "path": "../public/_ipx/w_1536/azbuka3.webp"
  },
  "/_ipx/w_1536/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"93d6-NahNtC2/kN+wzly0CHLmZwXt+9U\"",
    "mtime": "2024-05-10T14:43:21.780Z",
    "size": 37846,
    "path": "../public/_ipx/w_1536/azbuka4.webp"
  },
  "/_ipx/w_1536/casino1.webp": {
    "type": "image/webp",
    "etag": "\"a546-fxkc9rVI0F1AthsGTkXayF0PHcI\"",
    "mtime": "2024-05-10T14:43:23.652Z",
    "size": 42310,
    "path": "../public/_ipx/w_1536/casino1.webp"
  },
  "/_ipx/w_1536/casino2.webp": {
    "type": "image/webp",
    "etag": "\"81b2-oBoSSawN3kjTWAbgdwwsFBRuPns\"",
    "mtime": "2024-05-10T14:43:24.108Z",
    "size": 33202,
    "path": "../public/_ipx/w_1536/casino2.webp"
  },
  "/_ipx/w_1536/casino3.webp": {
    "type": "image/webp",
    "etag": "\"ce0e-LU+1QvIVrLcpTOHlbZNNxGxqNWY\"",
    "mtime": "2024-05-10T14:43:24.512Z",
    "size": 52750,
    "path": "../public/_ipx/w_1536/casino3.webp"
  },
  "/_ipx/w_1536/casino4.webp": {
    "type": "image/webp",
    "etag": "\"c936-Wxhl4v4Tr9imul7LrhKFdT2dDds\"",
    "mtime": "2024-05-10T14:43:25.088Z",
    "size": 51510,
    "path": "../public/_ipx/w_1536/casino4.webp"
  },
  "/_ipx/w_1536/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"f681-+bfAoci7crhFrakGZgqH6uoKV5c\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 63105,
    "path": "../public/_ipx/w_1536/cazino12.jpg"
  },
  "/_ipx/w_1536/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca99-yD3WC3/p9lLpHXEbONDeJYOs4fQ\"",
    "mtime": "2024-05-10T14:43:25.840Z",
    "size": 51865,
    "path": "../public/_ipx/w_1536/cazino13.jpg"
  },
  "/_ipx/w_1536/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"ba67-k4bVQkiUZyO/MGJr403r8EN39nw\"",
    "mtime": "2024-05-10T14:43:25.984Z",
    "size": 47719,
    "path": "../public/_ipx/w_1536/cazino14.jpg"
  },
  "/_ipx/w_1536/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"a715-3UQG0/DDWHhXEwOcsxG7tv80g2M\"",
    "mtime": "2024-05-10T14:43:26.232Z",
    "size": 42773,
    "path": "../public/_ipx/w_1536/cazino15.jpg"
  },
  "/_ipx/w_1536/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a8f9-f+yG7AxpQ3zOV65hIJ4UMQsrq4Q\"",
    "mtime": "2024-05-10T14:43:26.432Z",
    "size": 43257,
    "path": "../public/_ipx/w_1536/cazino16.jpg"
  },
  "/_ipx/w_1536/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11215-DpFFyQlJSTbAm3WZi9NrfQ/mBQY\"",
    "mtime": "2024-05-10T14:43:26.668Z",
    "size": 70165,
    "path": "../public/_ipx/w_1536/cazino17.jpg"
  },
  "/_ipx/w_1536/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"93fc-Z6NgCMyqZPkZpeYmJCL2XBXqyks\"",
    "mtime": "2024-05-10T14:43:26.856Z",
    "size": 37884,
    "path": "../public/_ipx/w_1536/cazino18.jpg"
  },
  "/_ipx/w_1536/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"eece-IzzpUCi/i1ehLWOA66SovgLCbmM\"",
    "mtime": "2024-05-10T14:43:25.428Z",
    "size": 61134,
    "path": "../public/_ipx/w_1536/cazinonew5.webp"
  },
  "/_ipx/w_1536/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"a7ea-21sn+0epbSJTjDMTCbyQym6aBB0\"",
    "mtime": "2024-05-10T14:43:27.192Z",
    "size": 42986,
    "path": "../public/_ipx/w_1536/kartynew-1.webp"
  },
  "/_ipx/w_1536/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"a39e-x2xdfmA6EJ42x4RNEvjFeS4TZhQ\"",
    "mtime": "2024-05-10T14:43:27.404Z",
    "size": 41886,
    "path": "../public/_ipx/w_1536/kartynew-2.webp"
  },
  "/_ipx/w_1536/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"6970-Ecw67BFbZSvmMGIZmVpFDp5M+28\"",
    "mtime": "2024-05-10T14:43:27.712Z",
    "size": 26992,
    "path": "../public/_ipx/w_1536/kartynew-3.webp"
  },
  "/_ipx/w_1536/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"8d18-CimfO0pb5fSeAPDfLbrmHR8jAww\"",
    "mtime": "2024-05-10T14:43:28.036Z",
    "size": 36120,
    "path": "../public/_ipx/w_1536/kartynew-4.webp"
  },
  "/_ipx/w_1536/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"8894-rfJB6mgXDcolvdOmeE6H+S/lcmI\"",
    "mtime": "2024-05-10T14:43:28.440Z",
    "size": 34964,
    "path": "../public/_ipx/w_1536/kartynew-5.webp"
  },
  "/_ipx/w_1536/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"6956-WfBgyt4JjwJtmZoRSzV9LJM0RF8\"",
    "mtime": "2024-05-10T14:43:28.640Z",
    "size": 26966,
    "path": "../public/_ipx/w_1536/kartynew-6.webp"
  },
  "/_ipx/w_1536/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a91c-TKinx1TlmX3aI/eMeu1L7LtPcfo\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 43292,
    "path": "../public/_ipx/w_1536/loto1.jpg"
  },
  "/_ipx/w_1536/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"147ef-k3417Irp0piU/3LjeGyQD9iZEGU\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 83951,
    "path": "../public/_ipx/w_1536/loto2.jpg"
  },
  "/_ipx/w_1536/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"13c8e-BXp/hO0kTO5hUU/UKRgFHvtHCAs\"",
    "mtime": "2024-05-10T14:43:22.528Z",
    "size": 81038,
    "path": "../public/_ipx/w_1536/loto3.jpg"
  },
  "/_ipx/w_1536/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"10a8f-CGaJpyIPtfkccWh5F8LJQbwBWGY\"",
    "mtime": "2024-05-10T14:43:22.724Z",
    "size": 68239,
    "path": "../public/_ipx/w_1536/loto5.jpg"
  },
  "/_ipx/w_1536/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c548-zSPVb/5rGCW3kB2/y03GOUqzpGg\"",
    "mtime": "2024-05-10T14:43:22.924Z",
    "size": 50504,
    "path": "../public/_ipx/w_1536/loto6.jpg"
  },
  "/_ipx/w_1536/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd64-GKo2C/KQGUfu7BI6916hkYtqmgg\"",
    "mtime": "2024-05-10T14:43:23.168Z",
    "size": 52580,
    "path": "../public/_ipx/w_1536/loto8.jpg"
  },
  "/_ipx/w_16384&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.584Z",
    "size": 140356,
    "path": "../public/_ipx/w_16384&f_webp/ink.webp"
  },
  "/_ipx/w_2048&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:31.036Z",
    "size": 140356,
    "path": "../public/_ipx/w_2048&f_webp/ink.webp"
  },
  "/_ipx/w_20972&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.584Z",
    "size": 140356,
    "path": "../public/_ipx/w_20972&f_webp/ink.webp"
  },
  "/_ipx/w_23593&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.924Z",
    "size": 140356,
    "path": "../public/_ipx/w_23593&f_webp/ink.webp"
  },
  "/_ipx/w_256/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"35d0-Z15FxCv4DjepT++vn0pQixnuULI\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 13776,
    "path": "../public/_ipx/w_256/azbuka1.webp"
  },
  "/_ipx/w_256/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"2798-lWCmMATQbRM4vk2DrYWcO5TDeMY\"",
    "mtime": "2024-05-10T14:43:20.460Z",
    "size": 10136,
    "path": "../public/_ipx/w_256/azbuka2.webp"
  },
  "/_ipx/w_256/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"2684-MieTX2uyRaBSoZzW6fhsq2pEtt0\"",
    "mtime": "2024-05-10T14:43:20.888Z",
    "size": 9860,
    "path": "../public/_ipx/w_256/azbuka3.webp"
  },
  "/_ipx/w_256/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"253c-1ZXP2bZna9b4sd4a820TmrWMPJ8\"",
    "mtime": "2024-05-10T14:43:21.508Z",
    "size": 9532,
    "path": "../public/_ipx/w_256/azbuka4.webp"
  },
  "/_ipx/w_256/casino1.webp": {
    "type": "image/webp",
    "etag": "\"24b6-H7Y0QV9sgZdY0FsRW3GrIYUqasE\"",
    "mtime": "2024-05-10T14:43:23.268Z",
    "size": 9398,
    "path": "../public/_ipx/w_256/casino1.webp"
  },
  "/_ipx/w_256/casino2.webp": {
    "type": "image/webp",
    "etag": "\"223e-ws0+jq6D95xGhM6n8DUOMwQVF9I\"",
    "mtime": "2024-05-10T14:43:23.740Z",
    "size": 8766,
    "path": "../public/_ipx/w_256/casino2.webp"
  },
  "/_ipx/w_256/casino3.webp": {
    "type": "image/webp",
    "etag": "\"27b6-xThOeyLTUb50W6xaiZ5jRkFnru8\"",
    "mtime": "2024-05-10T14:43:24.312Z",
    "size": 10166,
    "path": "../public/_ipx/w_256/casino3.webp"
  },
  "/_ipx/w_256/casino4.webp": {
    "type": "image/webp",
    "etag": "\"279a-STI2QV6QMZy+7/WB4PKIGRKm2QU\"",
    "mtime": "2024-05-10T14:43:24.772Z",
    "size": 10138,
    "path": "../public/_ipx/w_256/casino4.webp"
  },
  "/_ipx/w_256/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"3bf2-j1lA7dbEmjDU5Rm8q6+nRUws/6g\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 15346,
    "path": "../public/_ipx/w_256/cazino12.jpg"
  },
  "/_ipx/w_256/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"359b-kwoVDeiQWnxe3Qow+uATiIKNBKA\"",
    "mtime": "2024-05-10T14:43:25.756Z",
    "size": 13723,
    "path": "../public/_ipx/w_256/cazino13.jpg"
  },
  "/_ipx/w_256/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"30bc-zrD5p+0pliZsEDcYMeDKdBLt4xI\"",
    "mtime": "2024-05-10T14:43:26.016Z",
    "size": 12476,
    "path": "../public/_ipx/w_256/cazino14.jpg"
  },
  "/_ipx/w_256/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f76-7iktdJ+L5OAde8A8dd51Tovoavk\"",
    "mtime": "2024-05-10T14:43:26.232Z",
    "size": 12150,
    "path": "../public/_ipx/w_256/cazino15.jpg"
  },
  "/_ipx/w_256/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c65-hkjmspZviHVVYcTsjJzlc106I4o\"",
    "mtime": "2024-05-10T14:43:26.432Z",
    "size": 11365,
    "path": "../public/_ipx/w_256/cazino16.jpg"
  },
  "/_ipx/w_256/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"3782-qIkSLac93vKaKYhx1XJQV2qSHZg\"",
    "mtime": "2024-05-10T14:43:26.564Z",
    "size": 14210,
    "path": "../public/_ipx/w_256/cazino17.jpg"
  },
  "/_ipx/w_256/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c16-gCnQ/kfy55Y1YqBpko7j/5JRGfo\"",
    "mtime": "2024-05-10T14:43:26.816Z",
    "size": 11286,
    "path": "../public/_ipx/w_256/cazino18.jpg"
  },
  "/_ipx/w_256/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"2962-55ruMaiBIdlO7vjMJfO0RQiLMis\"",
    "mtime": "2024-05-10T14:43:25.420Z",
    "size": 10594,
    "path": "../public/_ipx/w_256/cazinonew5.webp"
  },
  "/_ipx/w_256/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"3032-X6fFFde8ZVBa1HxVH0QuIyLMmhc\"",
    "mtime": "2024-05-10T14:43:26.924Z",
    "size": 12338,
    "path": "../public/_ipx/w_256/kartynew-1.webp"
  },
  "/_ipx/w_256/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"2f6e-/GJmnwI+fxHWO5P/yXJ69ayePTs\"",
    "mtime": "2024-05-10T14:43:27.404Z",
    "size": 12142,
    "path": "../public/_ipx/w_256/kartynew-2.webp"
  },
  "/_ipx/w_256/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"25d4-dcSVUzZ7u1/X0mUJPx9ZmVSdct0\"",
    "mtime": "2024-05-10T14:43:27.496Z",
    "size": 9684,
    "path": "../public/_ipx/w_256/kartynew-3.webp"
  },
  "/_ipx/w_256/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"2726-fMCjDV1l4dyRy1c0AFW1J+e3VzU\"",
    "mtime": "2024-05-10T14:43:27.804Z",
    "size": 10022,
    "path": "../public/_ipx/w_256/kartynew-4.webp"
  },
  "/_ipx/w_256/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"2a5c-YzXfAR2Lkmzgz1Kfp8eGbn3jr/g\"",
    "mtime": "2024-05-10T14:43:28.168Z",
    "size": 10844,
    "path": "../public/_ipx/w_256/kartynew-5.webp"
  },
  "/_ipx/w_256/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"25d4-SFhefg4LzKQoC6bY6H3GicPfDLE\"",
    "mtime": "2024-05-10T14:43:28.440Z",
    "size": 9684,
    "path": "../public/_ipx/w_256/kartynew-6.webp"
  },
  "/_ipx/w_256/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"326b-4JTU3de5R3wGuyt8uisUhOlIsUs\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 12907,
    "path": "../public/_ipx/w_256/loto1.jpg"
  },
  "/_ipx/w_256/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"3436-LrdGsU6YzCKsUC7Gsmm3u1P1iQg\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 13366,
    "path": "../public/_ipx/w_256/loto2.jpg"
  },
  "/_ipx/w_256/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"2f86-PAHoWbHrdVOhWxRLemyBgxbu+ig\"",
    "mtime": "2024-05-10T14:43:22.528Z",
    "size": 12166,
    "path": "../public/_ipx/w_256/loto3.jpg"
  },
  "/_ipx/w_256/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"391c-Fv8VZTnCHEPt4qooBLkqBep533Y\"",
    "mtime": "2024-05-10T14:43:22.640Z",
    "size": 14620,
    "path": "../public/_ipx/w_256/loto5.jpg"
  },
  "/_ipx/w_256/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"33fc-xmm2/ZW3DgBoT/aWCepOVYM90Z4\"",
    "mtime": "2024-05-10T14:43:22.840Z",
    "size": 13308,
    "path": "../public/_ipx/w_256/loto6.jpg"
  },
  "/_ipx/w_256/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"36b2-ICtwauPmNhU8V6OdC35tYjuAxGA\"",
    "mtime": "2024-05-10T14:43:23.108Z",
    "size": 14002,
    "path": "../public/_ipx/w_256/loto8.jpg"
  },
  "/_ipx/w_3072/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10a28-tQ0jgHLNnAYvBYcqekKzj1PpZpM\"",
    "mtime": "2024-05-10T14:43:20.452Z",
    "size": 68136,
    "path": "../public/_ipx/w_3072/azbuka1.webp"
  },
  "/_ipx/w_3072/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"aee2-v/tgqTeTdP9M9Su5REU7zhC4Tkk\"",
    "mtime": "2024-05-10T14:43:20.888Z",
    "size": 44770,
    "path": "../public/_ipx/w_3072/azbuka2.webp"
  },
  "/_ipx/w_3072/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"a352-N/Vk0OCVRW/sYDiad/MKZGH/H9Q\"",
    "mtime": "2024-05-10T14:43:21.344Z",
    "size": 41810,
    "path": "../public/_ipx/w_3072/azbuka3.webp"
  },
  "/_ipx/w_3072/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"93d6-NahNtC2/kN+wzly0CHLmZwXt+9U\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 37846,
    "path": "../public/_ipx/w_3072/azbuka4.webp"
  },
  "/_ipx/w_3072/casino1.webp": {
    "type": "image/webp",
    "etag": "\"a546-fxkc9rVI0F1AthsGTkXayF0PHcI\"",
    "mtime": "2024-05-10T14:43:23.828Z",
    "size": 42310,
    "path": "../public/_ipx/w_3072/casino1.webp"
  },
  "/_ipx/w_3072/casino2.webp": {
    "type": "image/webp",
    "etag": "\"81b2-oBoSSawN3kjTWAbgdwwsFBRuPns\"",
    "mtime": "2024-05-10T14:43:24.312Z",
    "size": 33202,
    "path": "../public/_ipx/w_3072/casino2.webp"
  },
  "/_ipx/w_3072/casino3.webp": {
    "type": "image/webp",
    "etag": "\"ce0e-LU+1QvIVrLcpTOHlbZNNxGxqNWY\"",
    "mtime": "2024-05-10T14:43:24.772Z",
    "size": 52750,
    "path": "../public/_ipx/w_3072/casino3.webp"
  },
  "/_ipx/w_3072/casino4.webp": {
    "type": "image/webp",
    "etag": "\"c936-Wxhl4v4Tr9imul7LrhKFdT2dDds\"",
    "mtime": "2024-05-10T14:43:25.068Z",
    "size": 51510,
    "path": "../public/_ipx/w_3072/casino4.webp"
  },
  "/_ipx/w_3072/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"f681-+bfAoci7crhFrakGZgqH6uoKV5c\"",
    "mtime": "2024-05-10T14:43:25.756Z",
    "size": 63105,
    "path": "../public/_ipx/w_3072/cazino12.jpg"
  },
  "/_ipx/w_3072/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca99-yD3WC3/p9lLpHXEbONDeJYOs4fQ\"",
    "mtime": "2024-05-10T14:43:25.912Z",
    "size": 51865,
    "path": "../public/_ipx/w_3072/cazino13.jpg"
  },
  "/_ipx/w_3072/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"ba67-k4bVQkiUZyO/MGJr403r8EN39nw\"",
    "mtime": "2024-05-10T14:43:26.120Z",
    "size": 47719,
    "path": "../public/_ipx/w_3072/cazino14.jpg"
  },
  "/_ipx/w_3072/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"a715-3UQG0/DDWHhXEwOcsxG7tv80g2M\"",
    "mtime": "2024-05-10T14:43:26.260Z",
    "size": 42773,
    "path": "../public/_ipx/w_3072/cazino15.jpg"
  },
  "/_ipx/w_3072/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a8f9-f+yG7AxpQ3zOV65hIJ4UMQsrq4Q\"",
    "mtime": "2024-05-10T14:43:26.508Z",
    "size": 43257,
    "path": "../public/_ipx/w_3072/cazino16.jpg"
  },
  "/_ipx/w_3072/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11215-DpFFyQlJSTbAm3WZi9NrfQ/mBQY\"",
    "mtime": "2024-05-10T14:43:26.612Z",
    "size": 70165,
    "path": "../public/_ipx/w_3072/cazino17.jpg"
  },
  "/_ipx/w_3072/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"93fc-Z6NgCMyqZPkZpeYmJCL2XBXqyks\"",
    "mtime": "2024-05-10T14:43:26.856Z",
    "size": 37884,
    "path": "../public/_ipx/w_3072/cazino18.jpg"
  },
  "/_ipx/w_3072/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"eece-IzzpUCi/i1ehLWOA66SovgLCbmM\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 61134,
    "path": "../public/_ipx/w_3072/cazinonew5.webp"
  },
  "/_ipx/w_3072/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"a7ea-21sn+0epbSJTjDMTCbyQym6aBB0\"",
    "mtime": "2024-05-10T14:43:27.192Z",
    "size": 42986,
    "path": "../public/_ipx/w_3072/kartynew-1.webp"
  },
  "/_ipx/w_3072/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"a39e-x2xdfmA6EJ42x4RNEvjFeS4TZhQ\"",
    "mtime": "2024-05-10T14:43:27.416Z",
    "size": 41886,
    "path": "../public/_ipx/w_3072/kartynew-2.webp"
  },
  "/_ipx/w_3072/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"6970-Ecw67BFbZSvmMGIZmVpFDp5M+28\"",
    "mtime": "2024-05-10T14:43:27.828Z",
    "size": 26992,
    "path": "../public/_ipx/w_3072/kartynew-3.webp"
  },
  "/_ipx/w_3072/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"8d18-CimfO0pb5fSeAPDfLbrmHR8jAww\"",
    "mtime": "2024-05-10T14:43:28.168Z",
    "size": 36120,
    "path": "../public/_ipx/w_3072/kartynew-4.webp"
  },
  "/_ipx/w_3072/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"8894-rfJB6mgXDcolvdOmeE6H+S/lcmI\"",
    "mtime": "2024-05-10T14:43:28.280Z",
    "size": 34964,
    "path": "../public/_ipx/w_3072/kartynew-5.webp"
  },
  "/_ipx/w_3072/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"6956-WfBgyt4JjwJtmZoRSzV9LJM0RF8\"",
    "mtime": "2024-05-10T14:43:28.744Z",
    "size": 26966,
    "path": "../public/_ipx/w_3072/kartynew-6.webp"
  },
  "/_ipx/w_3072/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a91c-TKinx1TlmX3aI/eMeu1L7LtPcfo\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 43292,
    "path": "../public/_ipx/w_3072/loto1.jpg"
  },
  "/_ipx/w_3072/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"147ef-k3417Irp0piU/3LjeGyQD9iZEGU\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 83951,
    "path": "../public/_ipx/w_3072/loto2.jpg"
  },
  "/_ipx/w_3072/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"13c8e-BXp/hO0kTO5hUU/UKRgFHvtHCAs\"",
    "mtime": "2024-05-10T14:43:22.552Z",
    "size": 81038,
    "path": "../public/_ipx/w_3072/loto3.jpg"
  },
  "/_ipx/w_3072/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"10a8f-CGaJpyIPtfkccWh5F8LJQbwBWGY\"",
    "mtime": "2024-05-10T14:43:22.836Z",
    "size": 68239,
    "path": "../public/_ipx/w_3072/loto5.jpg"
  },
  "/_ipx/w_3072/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c548-zSPVb/5rGCW3kB2/y03GOUqzpGg\"",
    "mtime": "2024-05-10T14:43:23.060Z",
    "size": 50504,
    "path": "../public/_ipx/w_3072/loto6.jpg"
  },
  "/_ipx/w_3072/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd64-GKo2C/KQGUfu7BI6916hkYtqmgg\"",
    "mtime": "2024-05-10T14:43:23.232Z",
    "size": 52580,
    "path": "../public/_ipx/w_3072/loto8.jpg"
  },
  "/_ipx/w_32768&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.584Z",
    "size": 140356,
    "path": "../public/_ipx/w_32768&f_webp/ink.webp"
  },
  "/_ipx/w_400/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"639a-9obXAwciHy9SYG2mFPn11w7IVl0\"",
    "mtime": "2024-05-10T14:43:20.272Z",
    "size": 25498,
    "path": "../public/_ipx/w_400/azbuka1.webp"
  },
  "/_ipx/w_400/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"45b0-wT8Pe/q8gnup74GyNZSd57XYreA\"",
    "mtime": "2024-05-10T14:43:20.884Z",
    "size": 17840,
    "path": "../public/_ipx/w_400/azbuka2.webp"
  },
  "/_ipx/w_400/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"424a-jPYKgqEm//dLl/1VgtpbVpL9PQo\"",
    "mtime": "2024-05-10T14:43:21.344Z",
    "size": 16970,
    "path": "../public/_ipx/w_400/azbuka3.webp"
  },
  "/_ipx/w_400/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"42bc-8fNLqLBx0Bc6LaJjVcYkUu6IBEo\"",
    "mtime": "2024-05-10T14:43:21.780Z",
    "size": 17084,
    "path": "../public/_ipx/w_400/azbuka4.webp"
  },
  "/_ipx/w_400/casino1.webp": {
    "type": "image/webp",
    "etag": "\"44fc-Ba6NaUDaWQYNM6o5plNw2GWyzB8\"",
    "mtime": "2024-05-10T14:43:23.576Z",
    "size": 17660,
    "path": "../public/_ipx/w_400/casino1.webp"
  },
  "/_ipx/w_400/casino2.webp": {
    "type": "image/webp",
    "etag": "\"3958-w9Ir8KckjjJAKEhHN67ZDRdPdUc\"",
    "mtime": "2024-05-10T14:43:23.988Z",
    "size": 14680,
    "path": "../public/_ipx/w_400/casino2.webp"
  },
  "/_ipx/w_400/casino3.webp": {
    "type": "image/webp",
    "etag": "\"49ba-PjCgHjS1ZQK6UIxvMebwKfRoqMM\"",
    "mtime": "2024-05-10T14:43:24.556Z",
    "size": 18874,
    "path": "../public/_ipx/w_400/casino3.webp"
  },
  "/_ipx/w_400/casino4.webp": {
    "type": "image/webp",
    "etag": "\"48da-dFbkm3SIBpOtPkbielGz6nzcJjo\"",
    "mtime": "2024-05-10T14:43:25.084Z",
    "size": 18650,
    "path": "../public/_ipx/w_400/casino4.webp"
  },
  "/_ipx/w_400/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"81d8-eMKu1VEZvXjgwfwYzGPzbQFZUkw\"",
    "mtime": "2024-05-10T14:43:25.756Z",
    "size": 33240,
    "path": "../public/_ipx/w_400/cazino12.jpg"
  },
  "/_ipx/w_400/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"6a37-xZ6xs6MVJkNLjH79TC6svUPh8QY\"",
    "mtime": "2024-05-10T14:43:25.972Z",
    "size": 27191,
    "path": "../public/_ipx/w_400/cazino13.jpg"
  },
  "/_ipx/w_400/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"61ff-SYWPJIWtmI/R+rp8NOhEJyVdU3w\"",
    "mtime": "2024-05-10T14:43:26.120Z",
    "size": 25087,
    "path": "../public/_ipx/w_400/cazino14.jpg"
  },
  "/_ipx/w_400/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"59e7-LLRVWHqx9emCz45n8Hz5zSdxVgg\"",
    "mtime": "2024-05-10T14:43:26.304Z",
    "size": 23015,
    "path": "../public/_ipx/w_400/cazino15.jpg"
  },
  "/_ipx/w_400/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"58fc-+VjF1DCyq3n2Xe8p/rS+6xppwHk\"",
    "mtime": "2024-05-10T14:43:26.484Z",
    "size": 22780,
    "path": "../public/_ipx/w_400/cazino16.jpg"
  },
  "/_ipx/w_400/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"7070-VZcKnH29GPFNP1EvP1DIQq7RtzA\"",
    "mtime": "2024-05-10T14:43:26.784Z",
    "size": 28784,
    "path": "../public/_ipx/w_400/cazino17.jpg"
  },
  "/_ipx/w_400/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"5251-ylOSuEwIsOQkp+M/MueCqrQCq08\"",
    "mtime": "2024-05-10T14:43:26.924Z",
    "size": 21073,
    "path": "../public/_ipx/w_400/cazino18.jpg"
  },
  "/_ipx/w_400/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"4e34-LYWXCrQ25QlpREV/S0WNUx0Gza4\"",
    "mtime": "2024-05-10T14:43:25.420Z",
    "size": 20020,
    "path": "../public/_ipx/w_400/cazinonew5.webp"
  },
  "/_ipx/w_400/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"5930-hz/roc+y2Hs3ryN6I/UBN9GX1Hw\"",
    "mtime": "2024-05-10T14:43:27.192Z",
    "size": 22832,
    "path": "../public/_ipx/w_400/kartynew-1.webp"
  },
  "/_ipx/w_400/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"5b70-5EQR0zgNQQy5qcDpR1KQZbEdCV4\"",
    "mtime": "2024-05-10T14:43:27.584Z",
    "size": 23408,
    "path": "../public/_ipx/w_400/kartynew-2.webp"
  },
  "/_ipx/w_400/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"42d0-Y7X4a2BgoUAmMls6qYHjxXKm1Eg\"",
    "mtime": "2024-05-10T14:43:27.828Z",
    "size": 17104,
    "path": "../public/_ipx/w_400/kartynew-3.webp"
  },
  "/_ipx/w_400/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"4ff2-tfHieb0gqw5wYvtr79Nhw2LBVEE\"",
    "mtime": "2024-05-10T14:43:28.036Z",
    "size": 20466,
    "path": "../public/_ipx/w_400/kartynew-4.webp"
  },
  "/_ipx/w_400/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"4fa6-YAQE317hNZ7l2WzoG47i0/F+Qqk\"",
    "mtime": "2024-05-10T14:43:28.440Z",
    "size": 20390,
    "path": "../public/_ipx/w_400/kartynew-5.webp"
  },
  "/_ipx/w_400/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"42de-VZZukpdBKibWrlQ6CQICbaEWhz8\"",
    "mtime": "2024-05-10T14:43:28.640Z",
    "size": 17118,
    "path": "../public/_ipx/w_400/kartynew-6.webp"
  },
  "/_ipx/w_400/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"61e4-2eUHGZvW/wY7I/gy/tsf/66U1O8\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 25060,
    "path": "../public/_ipx/w_400/loto1.jpg"
  },
  "/_ipx/w_400/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"67d2-qjOIpGrKWhfBXCUZQzkaSIiLeZA\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 26578,
    "path": "../public/_ipx/w_400/loto2.jpg"
  },
  "/_ipx/w_400/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"5ffb-yDtDQ9U2VaYU3XI7b4lcMu+vl4A\"",
    "mtime": "2024-05-10T14:43:22.640Z",
    "size": 24571,
    "path": "../public/_ipx/w_400/loto3.jpg"
  },
  "/_ipx/w_400/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"7130-+ENoKJYZQK4a//D/x4XSXjVcK5A\"",
    "mtime": "2024-05-10T14:43:22.836Z",
    "size": 28976,
    "path": "../public/_ipx/w_400/loto5.jpg"
  },
  "/_ipx/w_400/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"6b66-HHmGokv6iu+hqP+RFgSF5jNqyNQ\"",
    "mtime": "2024-05-10T14:43:23.060Z",
    "size": 27494,
    "path": "../public/_ipx/w_400/loto6.jpg"
  },
  "/_ipx/w_400/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"71eb-zoeBW3FSGz+5lMEwREKptEu72U8\"",
    "mtime": "2024-05-10T14:43:23.168Z",
    "size": 29163,
    "path": "../public/_ipx/w_400/loto8.jpg"
  },
  "/_ipx/w_4096&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:31.036Z",
    "size": 140356,
    "path": "../public/_ipx/w_4096&f_webp/ink.webp"
  },
  "/_ipx/w_47186&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:32.924Z",
    "size": 140356,
    "path": "../public/_ipx/w_47186&f_webp/ink.webp"
  },
  "/_ipx/w_5898&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:31.036Z",
    "size": 140356,
    "path": "../public/_ipx/w_5898&f_webp/ink.webp"
  },
  "/_ipx/w_640/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"b34a-BR89jF2TJ0XVyUCjXd5zJha5oIo\"",
    "mtime": "2024-05-10T14:43:20.136Z",
    "size": 45898,
    "path": "../public/_ipx/w_640/azbuka1.webp"
  },
  "/_ipx/w_640/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"7aa2-XpH4T7Q3jA06dXJz+zOFuDZzZ4Y\"",
    "mtime": "2024-05-10T14:43:20.884Z",
    "size": 31394,
    "path": "../public/_ipx/w_640/azbuka2.webp"
  },
  "/_ipx/w_640/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"7420-awBEw5NjShxuG70X+tRgsbw31KQ\"",
    "mtime": "2024-05-10T14:43:21.344Z",
    "size": 29728,
    "path": "../public/_ipx/w_640/azbuka3.webp"
  },
  "/_ipx/w_640/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"7590-eqQRLu3EOUxwkE99vnUEgi2bXGs\"",
    "mtime": "2024-05-10T14:43:21.780Z",
    "size": 30096,
    "path": "../public/_ipx/w_640/azbuka4.webp"
  },
  "/_ipx/w_640/casino1.webp": {
    "type": "image/webp",
    "etag": "\"7836-zQ6CLCv+rz1gmPZ5te5tnb4hF7I\"",
    "mtime": "2024-05-10T14:43:23.428Z",
    "size": 30774,
    "path": "../public/_ipx/w_640/casino1.webp"
  },
  "/_ipx/w_640/casino2.webp": {
    "type": "image/webp",
    "etag": "\"601c-doz/4Q04KbIixc60kSok2Ppqtns\"",
    "mtime": "2024-05-10T14:43:23.980Z",
    "size": 24604,
    "path": "../public/_ipx/w_640/casino2.webp"
  },
  "/_ipx/w_640/casino3.webp": {
    "type": "image/webp",
    "etag": "\"8824-cR/5ZJTUVChAG9JU+lKPQBKk4GU\"",
    "mtime": "2024-05-10T14:43:24.460Z",
    "size": 34852,
    "path": "../public/_ipx/w_640/casino3.webp"
  },
  "/_ipx/w_640/casino4.webp": {
    "type": "image/webp",
    "etag": "\"8512-JsMgJWzpFpvcWUSNz/agyivpThM\"",
    "mtime": "2024-05-10T14:43:24.928Z",
    "size": 34066,
    "path": "../public/_ipx/w_640/casino4.webp"
  },
  "/_ipx/w_640/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"f681-+bfAoci7crhFrakGZgqH6uoKV5c\"",
    "mtime": "2024-05-10T14:43:25.616Z",
    "size": 63105,
    "path": "../public/_ipx/w_640/cazino12.jpg"
  },
  "/_ipx/w_640/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca99-yD3WC3/p9lLpHXEbONDeJYOs4fQ\"",
    "mtime": "2024-05-10T14:43:25.836Z",
    "size": 51865,
    "path": "../public/_ipx/w_640/cazino13.jpg"
  },
  "/_ipx/w_640/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"ba67-k4bVQkiUZyO/MGJr403r8EN39nw\"",
    "mtime": "2024-05-10T14:43:25.984Z",
    "size": 47719,
    "path": "../public/_ipx/w_640/cazino14.jpg"
  },
  "/_ipx/w_640/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"a715-3UQG0/DDWHhXEwOcsxG7tv80g2M\"",
    "mtime": "2024-05-10T14:43:26.232Z",
    "size": 42773,
    "path": "../public/_ipx/w_640/cazino15.jpg"
  },
  "/_ipx/w_640/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a8f9-f+yG7AxpQ3zOV65hIJ4UMQsrq4Q\"",
    "mtime": "2024-05-10T14:43:26.368Z",
    "size": 43257,
    "path": "../public/_ipx/w_640/cazino16.jpg"
  },
  "/_ipx/w_640/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"e2c6-Fdqj4+sJ+Vx3eCnUF8B3i/OC+MQ\"",
    "mtime": "2024-05-10T14:43:26.688Z",
    "size": 58054,
    "path": "../public/_ipx/w_640/cazino17.jpg"
  },
  "/_ipx/w_640/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"93fc-Z6NgCMyqZPkZpeYmJCL2XBXqyks\"",
    "mtime": "2024-05-10T14:43:26.816Z",
    "size": 37884,
    "path": "../public/_ipx/w_640/cazino18.jpg"
  },
  "/_ipx/w_640/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"98e2-gh1s8AJXn+4EoRlnsNDqClDgsnk\"",
    "mtime": "2024-05-10T14:43:25.420Z",
    "size": 39138,
    "path": "../public/_ipx/w_640/cazinonew5.webp"
  },
  "/_ipx/w_640/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"a7ea-21sn+0epbSJTjDMTCbyQym6aBB0\"",
    "mtime": "2024-05-10T14:43:27.164Z",
    "size": 42986,
    "path": "../public/_ipx/w_640/kartynew-1.webp"
  },
  "/_ipx/w_640/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"a39e-x2xdfmA6EJ42x4RNEvjFeS4TZhQ\"",
    "mtime": "2024-05-10T14:43:27.404Z",
    "size": 41886,
    "path": "../public/_ipx/w_640/kartynew-2.webp"
  },
  "/_ipx/w_640/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"6970-Ecw67BFbZSvmMGIZmVpFDp5M+28\"",
    "mtime": "2024-05-10T14:43:27.640Z",
    "size": 26992,
    "path": "../public/_ipx/w_640/kartynew-3.webp"
  },
  "/_ipx/w_640/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"8d18-CimfO0pb5fSeAPDfLbrmHR8jAww\"",
    "mtime": "2024-05-10T14:43:28.036Z",
    "size": 36120,
    "path": "../public/_ipx/w_640/kartynew-4.webp"
  },
  "/_ipx/w_640/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"8894-rfJB6mgXDcolvdOmeE6H+S/lcmI\"",
    "mtime": "2024-05-10T14:43:28.280Z",
    "size": 34964,
    "path": "../public/_ipx/w_640/kartynew-5.webp"
  },
  "/_ipx/w_640/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"6956-WfBgyt4JjwJtmZoRSzV9LJM0RF8\"",
    "mtime": "2024-05-10T14:43:28.608Z",
    "size": 26966,
    "path": "../public/_ipx/w_640/kartynew-6.webp"
  },
  "/_ipx/w_640/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a91c-TKinx1TlmX3aI/eMeu1L7LtPcfo\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 43292,
    "path": "../public/_ipx/w_640/loto1.jpg"
  },
  "/_ipx/w_640/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"d1e9-9vDGg8m1nawHBNg3ciQDu5C16qc\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 53737,
    "path": "../public/_ipx/w_640/loto2.jpg"
  },
  "/_ipx/w_640/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"c7ea-lXvob9m4G63HOU5j67LMcUWHkDo\"",
    "mtime": "2024-05-10T14:43:22.528Z",
    "size": 51178,
    "path": "../public/_ipx/w_640/loto3.jpg"
  },
  "/_ipx/w_640/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"e3d7-EqFkRXWxcw5/b68GKas3keILM+c\"",
    "mtime": "2024-05-10T14:43:22.724Z",
    "size": 58327,
    "path": "../public/_ipx/w_640/loto5.jpg"
  },
  "/_ipx/w_640/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c548-zSPVb/5rGCW3kB2/y03GOUqzpGg\"",
    "mtime": "2024-05-10T14:43:22.912Z",
    "size": 50504,
    "path": "../public/_ipx/w_640/loto6.jpg"
  },
  "/_ipx/w_640/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd64-GKo2C/KQGUfu7BI6916hkYtqmgg\"",
    "mtime": "2024-05-10T14:43:23.092Z",
    "size": 52580,
    "path": "../public/_ipx/w_640/loto8.jpg"
  },
  "/_ipx/w_800/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"e676-pYKZ9cYwJAgkTQgcmBWsEDNSFFY\"",
    "mtime": "2024-05-10T14:43:20.460Z",
    "size": 58998,
    "path": "../public/_ipx/w_800/azbuka1.webp"
  },
  "/_ipx/w_800/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"981a-7GtaSRQbugO5zGfjd5KKUD+pDcI\"",
    "mtime": "2024-05-10T14:43:21.072Z",
    "size": 38938,
    "path": "../public/_ipx/w_800/azbuka2.webp"
  },
  "/_ipx/w_800/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"8ed2-IbqsLXac8jji7a/N7IpeNP+4WhQ\"",
    "mtime": "2024-05-10T14:43:21.780Z",
    "size": 36562,
    "path": "../public/_ipx/w_800/azbuka3.webp"
  },
  "/_ipx/w_800/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"93d6-NahNtC2/kN+wzly0CHLmZwXt+9U\"",
    "mtime": "2024-05-10T14:43:21.896Z",
    "size": 37846,
    "path": "../public/_ipx/w_800/azbuka4.webp"
  },
  "/_ipx/w_800/casino1.webp": {
    "type": "image/webp",
    "etag": "\"a546-fxkc9rVI0F1AthsGTkXayF0PHcI\"",
    "mtime": "2024-05-10T14:43:23.828Z",
    "size": 42310,
    "path": "../public/_ipx/w_800/casino1.webp"
  },
  "/_ipx/w_800/casino2.webp": {
    "type": "image/webp",
    "etag": "\"7680-ydZncrRfk9lfenCEKMFLvtBvKcg\"",
    "mtime": "2024-05-10T14:43:24.408Z",
    "size": 30336,
    "path": "../public/_ipx/w_800/casino2.webp"
  },
  "/_ipx/w_800/casino3.webp": {
    "type": "image/webp",
    "etag": "\"aa4e-6G+hwrP5rEMWTUfmnsGEeOkcryA\"",
    "mtime": "2024-05-10T14:43:24.932Z",
    "size": 43598,
    "path": "../public/_ipx/w_800/casino3.webp"
  },
  "/_ipx/w_800/casino4.webp": {
    "type": "image/webp",
    "etag": "\"aa18-kLiWhsRNyonwEbizASu+x9ki+4E\"",
    "mtime": "2024-05-10T14:43:25.420Z",
    "size": 43544,
    "path": "../public/_ipx/w_800/casino4.webp"
  },
  "/_ipx/w_800/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"f681-+bfAoci7crhFrakGZgqH6uoKV5c\"",
    "mtime": "2024-05-10T14:43:25.792Z",
    "size": 63105,
    "path": "../public/_ipx/w_800/cazino12.jpg"
  },
  "/_ipx/w_800/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"ca99-yD3WC3/p9lLpHXEbONDeJYOs4fQ\"",
    "mtime": "2024-05-10T14:43:25.972Z",
    "size": 51865,
    "path": "../public/_ipx/w_800/cazino13.jpg"
  },
  "/_ipx/w_800/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"ba67-k4bVQkiUZyO/MGJr403r8EN39nw\"",
    "mtime": "2024-05-10T14:43:26.132Z",
    "size": 47719,
    "path": "../public/_ipx/w_800/cazino14.jpg"
  },
  "/_ipx/w_800/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"a715-3UQG0/DDWHhXEwOcsxG7tv80g2M\"",
    "mtime": "2024-05-10T14:43:26.336Z",
    "size": 42773,
    "path": "../public/_ipx/w_800/cazino15.jpg"
  },
  "/_ipx/w_800/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"a8f9-f+yG7AxpQ3zOV65hIJ4UMQsrq4Q\"",
    "mtime": "2024-05-10T14:43:26.508Z",
    "size": 43257,
    "path": "../public/_ipx/w_800/cazino16.jpg"
  },
  "/_ipx/w_800/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11215-DpFFyQlJSTbAm3WZi9NrfQ/mBQY\"",
    "mtime": "2024-05-10T14:43:26.784Z",
    "size": 70165,
    "path": "../public/_ipx/w_800/cazino17.jpg"
  },
  "/_ipx/w_800/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"93fc-Z6NgCMyqZPkZpeYmJCL2XBXqyks\"",
    "mtime": "2024-05-10T14:43:26.924Z",
    "size": 37884,
    "path": "../public/_ipx/w_800/cazino18.jpg"
  },
  "/_ipx/w_800/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"c86e-JvdEXVn7cJmVRCnjmzty0CifHho\"",
    "mtime": "2024-05-10T14:43:25.648Z",
    "size": 51310,
    "path": "../public/_ipx/w_800/cazinonew5.webp"
  },
  "/_ipx/w_800/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"a7ea-21sn+0epbSJTjDMTCbyQym6aBB0\"",
    "mtime": "2024-05-10T14:43:27.404Z",
    "size": 42986,
    "path": "../public/_ipx/w_800/kartynew-1.webp"
  },
  "/_ipx/w_800/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"a39e-x2xdfmA6EJ42x4RNEvjFeS4TZhQ\"",
    "mtime": "2024-05-10T14:43:27.616Z",
    "size": 41886,
    "path": "../public/_ipx/w_800/kartynew-2.webp"
  },
  "/_ipx/w_800/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"6970-Ecw67BFbZSvmMGIZmVpFDp5M+28\"",
    "mtime": "2024-05-10T14:43:27.880Z",
    "size": 26992,
    "path": "../public/_ipx/w_800/kartynew-3.webp"
  },
  "/_ipx/w_800/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"8d18-CimfO0pb5fSeAPDfLbrmHR8jAww\"",
    "mtime": "2024-05-10T14:43:28.276Z",
    "size": 36120,
    "path": "../public/_ipx/w_800/kartynew-4.webp"
  },
  "/_ipx/w_800/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"8894-rfJB6mgXDcolvdOmeE6H+S/lcmI\"",
    "mtime": "2024-05-10T14:43:28.608Z",
    "size": 34964,
    "path": "../public/_ipx/w_800/kartynew-5.webp"
  },
  "/_ipx/w_800/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"6956-WfBgyt4JjwJtmZoRSzV9LJM0RF8\"",
    "mtime": "2024-05-10T14:43:28.640Z",
    "size": 26966,
    "path": "../public/_ipx/w_800/kartynew-6.webp"
  },
  "/_ipx/w_800/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"a91c-TKinx1TlmX3aI/eMeu1L7LtPcfo\"",
    "mtime": "2024-05-10T14:43:22.036Z",
    "size": 43292,
    "path": "../public/_ipx/w_800/loto1.jpg"
  },
  "/_ipx/w_800/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"1228d-KwFiRnuPiHolx2a/+FLORQ3IQQ4\"",
    "mtime": "2024-05-10T14:43:22.288Z",
    "size": 74381,
    "path": "../public/_ipx/w_800/loto2.jpg"
  },
  "/_ipx/w_800/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"116f1-691hetPNAWc06rVx3Kecm6j2rkQ\"",
    "mtime": "2024-05-10T14:43:22.724Z",
    "size": 71409,
    "path": "../public/_ipx/w_800/loto3.jpg"
  },
  "/_ipx/w_800/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"10a8f-CGaJpyIPtfkccWh5F8LJQbwBWGY\"",
    "mtime": "2024-05-10T14:43:22.840Z",
    "size": 68239,
    "path": "../public/_ipx/w_800/loto5.jpg"
  },
  "/_ipx/w_800/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"c548-zSPVb/5rGCW3kB2/y03GOUqzpGg\"",
    "mtime": "2024-05-10T14:43:23.060Z",
    "size": 50504,
    "path": "../public/_ipx/w_800/loto6.jpg"
  },
  "/_ipx/w_800/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"cd64-GKo2C/KQGUfu7BI6916hkYtqmgg\"",
    "mtime": "2024-05-10T14:43:23.268Z",
    "size": 52580,
    "path": "../public/_ipx/w_800/loto8.jpg"
  },
  "/_ipx/w_8192&f_webp/ink.webp": {
    "type": "image/webp",
    "etag": "\"22444-0iAcZMJhYaFROJzYFSmWCtREuqY\"",
    "mtime": "2024-05-10T14:43:31.036Z",
    "size": 140356,
    "path": "../public/_ipx/w_8192&f_webp/ink.webp"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-7SwW1WKKJaeh0UcOFqK6IR840k0\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/d8ff422f-c5e5-4204-81ff-d37e58c8bad0.json": {
    "type": "application/json",
    "etag": "\"8b-59yk4WHUoM0HMiGdu4PDr+KI6Pw\"",
    "mtime": "2024-05-10T14:43:11.465Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/d8ff422f-c5e5-4204-81ff-d37e58c8bad0.json"
  }
};

function normalizeWindowsPath(input = "") {
  if (!input || !input.includes("\\")) {
    return input;
  }
  return input.replace(/\\/g, "/");
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

const maxAge = 31536000;
const filter = /\.(js|mjs|json|css|html)$/i;
  
async function readAsset (id, res) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  let assetPath = resolve(serverDir, assets[id].path);

  if (filter.test(assetPath)) {
    try {
      await promises.access(`${assetPath}.br`, constants.R_OK | constants.W_OK);
      assetPath = `${assetPath}.br`;
      res.setHeader('Content-Encoding', 'br');
    } catch {}
  }

  res.setHeader("Cache-Control", `max-age=${maxAge}, immutable`);

  return promises.readFile(assetPath);
}

const publicAssetBases = {"/_nuxt/builds/meta":{"maxAge":31536000},"/_nuxt/builds":{"maxAge":1},"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id, event.res);
});

const _BJ7mRp = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts.fs?.dir ? isAbsolute(opts.fs.dir) ? opts.fs.dir : fileURLToPath$1(new URL(opts.fs.dir, globalThis._importMeta_.url)) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_nwELg5 = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_nwELg5, lazy: true, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _BJ7mRp, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_nwELg5, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((err) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", function(req, res) {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", function() {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", function(socket) {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", function() {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((err) => {
      const errString = typeof err === "string" ? err : JSON.stringify(err);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT, 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((err) => {
          console.error(err);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch as $, encodePath as A, nodeServer as B, send as a, setResponseStatus as b, setResponseHeaders as c, useRuntimeConfig as d, eventHandler as e, getQuery as f, getResponseStatus as g, createError$1 as h, getRouteRules as i, joinURL as j, getResponseStatusText as k, klona as l, defu as m, hasProtocol as n, parseQuery as o, parseURL as p, encodeParam as q, createHooks as r, setResponseHeader as s, withoutTrailingSlash as t, useNitroApp as u, withLeadingSlash as v, withTrailingSlash as w, withQuery as x, isScriptProtocol as y, sanitizeStatusCode as z };
//# sourceMappingURL=node-server.mjs.map
