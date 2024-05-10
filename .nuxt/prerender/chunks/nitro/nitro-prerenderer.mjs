globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineEventHandler, handleCacheHeaders, splitCookiesString, isEvent, createEvent, getRequestHeader, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseStatus, setResponseHeader, send, getRequestHeaders, removeResponseHeader, createError, getResponseHeader, lazyEventHandler, useBase, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ofetch/dist/node.mjs';
import destr from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/scule/dist/index.mjs';
import { klona } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/defu/dist/defu.mjs';
import { hash } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47memory from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/memory.mjs';
import unstorage_47drivers_47lru_45cache from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/lru-cache.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/fs-lite.mjs';
import { toRouteMatcher, createRouter } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/radix3/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, isAbsolute } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/pathe/dist/index.mjs';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ipx/dist/index.mjs';

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
      "dir": "/home/gzdb/WebSitesProjects/azbuka/public"
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

const serverAssets = [{"baseName":"server","dir":"/home/gzdb/WebSitesProjects/azbuka/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', unstorage_47drivers_47memory({"driver":"memory"}));
storage.mount('internal:nuxt:prerender:island', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('internal:nuxt:prerender:payload', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/home/gzdb/WebSitesProjects/azbuka/.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/gzdb/WebSitesProjects/azbuka","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/home/gzdb/WebSitesProjects/azbuka/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/gzdb/WebSitesProjects/azbuka/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/home/gzdb/WebSitesProjects/azbuka/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

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
  createRouter({ routes: config.nitro.routeRules })
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
        const query = getQuery(event.path);
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
  "/android-chrome-192x192.png": {
    "type": "image/png",
    "etag": "\"1459-5d/2uABMChBll85FVgFiBX2YiqU\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 5209,
    "path": "../../.output/public/android-chrome-192x192.png"
  },
  "/android-chrome-512x512.png": {
    "type": "image/png",
    "etag": "\"3dbd-+EntQInyK5XivPqRumQiFJT89s4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 15805,
    "path": "../../.output/public/android-chrome-512x512.png"
  },
  "/apple-touch-icon.png": {
    "type": "image/png",
    "etag": "\"11f9-1oSgc6kyDnv+tkU0usT17kMWGO4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 4601,
    "path": "../../.output/public/apple-touch-icon.png"
  },
  "/azbuka-f.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e3f-wHy3f+f2QQMUPge4Sc1+99zeIhg\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 20031,
    "path": "../../.output/public/azbuka-f.jpg"
  },
  "/azbuka1.webp": {
    "type": "image/webp",
    "etag": "\"10e1a-qU2QNTSC3rVY3UYOmfJ6O1nDy0g\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 69146,
    "path": "../../.output/public/azbuka1.webp"
  },
  "/azbuka2.webp": {
    "type": "image/webp",
    "etag": "\"b318-oj7HvuXrM6Vw6kt5Q1J3o9BLL6o\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 45848,
    "path": "../../.output/public/azbuka2.webp"
  },
  "/azbuka3.webp": {
    "type": "image/webp",
    "etag": "\"a94e-FJInr+r/8hgKfHE7glAuBgXj3kY\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 43342,
    "path": "../../.output/public/azbuka3.webp"
  },
  "/azbuka4.webp": {
    "type": "image/webp",
    "etag": "\"9b02-/gJxSD1l/2AmC11NK/M/WhS4vWk\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 39682,
    "path": "../../.output/public/azbuka4.webp"
  },
  "/azbuka5.webp": {
    "type": "image/webp",
    "etag": "\"ea00-4wk2iegmdpqzaPpTN094uc5pF1A\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 59904,
    "path": "../../.output/public/azbuka5.webp"
  },
  "/casino1.webp": {
    "type": "image/webp",
    "etag": "\"abb4-VYTcsm3XpGNGZ+oI5pVsebmNmhE\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 43956,
    "path": "../../.output/public/casino1.webp"
  },
  "/casino2.webp": {
    "type": "image/webp",
    "etag": "\"88b8-mtlrr2aOnCDtLvOZbTPUJnxuuW4\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 35000,
    "path": "../../.output/public/casino2.webp"
  },
  "/casino3.webp": {
    "type": "image/webp",
    "etag": "\"d658-Hc6ob1EvxSjcNY5AcoXlKp3RYCU\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 54872,
    "path": "../../.output/public/casino3.webp"
  },
  "/casino4.webp": {
    "type": "image/webp",
    "etag": "\"cf72-G4paOYvHeLXK9Bl3U13y6MpOioI\"",
    "mtime": "2024-05-10T14:43:11.545Z",
    "size": 53106,
    "path": "../../.output/public/casino4.webp"
  },
  "/casino5.webp": {
    "type": "image/webp",
    "etag": "\"92e2-yPeBFk/J3Odwuc/WeD+POdiLEGg\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 37602,
    "path": "../../.output/public/casino5.webp"
  },
  "/cazino11.jpg": {
    "type": "image/jpeg",
    "etag": "\"f341-5Vy/7NcqdhFYGlpXSHel8vcgr7E\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 62273,
    "path": "../../.output/public/cazino11.jpg"
  },
  "/cazino12.jpg": {
    "type": "image/jpeg",
    "etag": "\"104a6-kJUaIf5iGvhYXix5jLgfvXIpUAs\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 66726,
    "path": "../../.output/public/cazino12.jpg"
  },
  "/cazino13.jpg": {
    "type": "image/jpeg",
    "etag": "\"d3bf-wQHnyEoDebnCyredltnqnQamO0k\"",
    "mtime": "2024-05-10T14:43:11.557Z",
    "size": 54207,
    "path": "../../.output/public/cazino13.jpg"
  },
  "/cazino14.jpg": {
    "type": "image/jpeg",
    "etag": "\"c2c6-WXsGf7NFm2o5p6f6dmLx1Ucx1y4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 49862,
    "path": "../../.output/public/cazino14.jpg"
  },
  "/cazino15.jpg": {
    "type": "image/jpeg",
    "etag": "\"b183-se46KZpzY79bjzsDr77IpgBgc6I\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 45443,
    "path": "../../.output/public/cazino15.jpg"
  },
  "/cazino16.jpg": {
    "type": "image/jpeg",
    "etag": "\"b1d1-BcIra/05VD5P0kOd+VjGTXRb/3s\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 45521,
    "path": "../../.output/public/cazino16.jpg"
  },
  "/cazino17.jpg": {
    "type": "image/jpeg",
    "etag": "\"11d4f-7BmzgjGMj3hfiN8hn6IsL2GKimk\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 73039,
    "path": "../../.output/public/cazino17.jpg"
  },
  "/cazino18.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c58-Ghcq+25VUWb+jlEbfsuxp0hZvW4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 40024,
    "path": "../../.output/public/cazino18.jpg"
  },
  "/cazinonew-5.webp": {
    "type": "image/webp",
    "etag": "\"1417a-VkkGDcklp5TpvW63tGHoUXeB3eE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 82298,
    "path": "../../.output/public/cazinonew-5.webp"
  },
  "/cazinonew5.webp": {
    "type": "image/webp",
    "etag": "\"e610-kU8fSYp1ETQIkQW590M9+hY9Rsc\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 58896,
    "path": "../../.output/public/cazinonew5.webp"
  },
  "/favicon-16x16.png": {
    "type": "image/png",
    "etag": "\"148-uSdtRPUSBqoaUqtRoR2jNkq5c+E\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 328,
    "path": "../../.output/public/favicon-16x16.png"
  },
  "/favicon-32x32.png": {
    "type": "image/png",
    "etag": "\"2cb-1rssq3TZxlvYdUGOYdsZWg0JbIE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 715,
    "path": "../../.output/public/favicon-32x32.png"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-/0+h9imwguef2gNlD38wPEm6lrI\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 15406,
    "path": "../../.output/public/favicon.ico"
  },
  "/golf1.jpg": {
    "type": "image/jpeg",
    "etag": "\"10b79-jmF32Mt1dCCM99XkPTUliNkxp9Y\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 68473,
    "path": "../../.output/public/golf1.jpg"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"3c2e-/0+h9imwguef2gNlD38wPEm6lrI\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 15406,
    "path": "../../.output/public/icon.png"
  },
  "/ink.webp": {
    "type": "image/webp",
    "etag": "\"210b8-LF6TTbCeqbURwJpwSWq0r5/6H9w\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 135352,
    "path": "../../.output/public/ink.webp"
  },
  "/karty1.webp": {
    "type": "image/webp",
    "etag": "\"136e6-b3iso0uZ3kThhBNrgtIXkD2ntC4\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 79590,
    "path": "../../.output/public/karty1.webp"
  },
  "/karty2.webp": {
    "type": "image/webp",
    "etag": "\"1084c-viLLRotBwHkUoPcQ+Lsh0cAY2VE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 67660,
    "path": "../../.output/public/karty2.webp"
  },
  "/karty3.jpg": {
    "type": "image/jpeg",
    "etag": "\"11e1f-GdFL+OB8zitc5tjU2hMmO/O6eh0\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 73247,
    "path": "../../.output/public/karty3.jpg"
  },
  "/karty3.webp": {
    "type": "image/webp",
    "etag": "\"feb2-pcdlCz+VdVyhlXCUfeSdTFvaQxw\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 65202,
    "path": "../../.output/public/karty3.webp"
  },
  "/karty5.jpg": {
    "type": "image/jpeg",
    "etag": "\"cf7f-Fedr611OrdwudgF+CTfl//lxTrE\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 53119,
    "path": "../../.output/public/karty5.jpg"
  },
  "/karty8.jpg": {
    "type": "image/jpeg",
    "etag": "\"e2ee-DcUUrznreveDEZf0JsShp9y3f4g\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 58094,
    "path": "../../.output/public/karty8.jpg"
  },
  "/karty9.jpg": {
    "type": "image/jpeg",
    "etag": "\"c1b8-+q5JwQiXf47rdlOaSinEQYOe4sg\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 49592,
    "path": "../../.output/public/karty9.jpg"
  },
  "/kartynew-1.webp": {
    "type": "image/webp",
    "etag": "\"13640-y6gHzavbimAlFr2w24kZUn9x3jw\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 79424,
    "path": "../../.output/public/kartynew-1.webp"
  },
  "/kartynew-2.webp": {
    "type": "image/webp",
    "etag": "\"9c0a-ZkrhS6WAesun5XuCxH45HRPyaLA\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 39946,
    "path": "../../.output/public/kartynew-2.webp"
  },
  "/kartynew-3.webp": {
    "type": "image/webp",
    "etag": "\"665e-Ow+BOZ6q+IIY6d/hc1DlcctGVnI\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 26206,
    "path": "../../.output/public/kartynew-3.webp"
  },
  "/kartynew-4.webp": {
    "type": "image/webp",
    "etag": "\"88c0-LorcZaQoHDpxguF96xo+NQuoDV4\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 35008,
    "path": "../../.output/public/kartynew-4.webp"
  },
  "/kartynew-5.webp": {
    "type": "image/webp",
    "etag": "\"84de-+O+5eO/DFovmUFLnQhW7Ko1gie0\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 34014,
    "path": "../../.output/public/kartynew-5.webp"
  },
  "/kartynew-6.webp": {
    "type": "image/webp",
    "etag": "\"66da-kPQ/XTHJ6L3yagIBj9JbePryEvs\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 26330,
    "path": "../../.output/public/kartynew-6.webp"
  },
  "/loft.jpg": {
    "type": "image/jpeg",
    "etag": "\"3da8-VMXw4srGW8vgboqaDOGwtXweY0I\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 15784,
    "path": "../../.output/public/loft.jpg"
  },
  "/loto1.jpg": {
    "type": "image/jpeg",
    "etag": "\"b456-h34oHcLHxnqJf80eqRP2S8TecNA\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 46166,
    "path": "../../.output/public/loto1.jpg"
  },
  "/loto2.jpg": {
    "type": "image/jpeg",
    "etag": "\"14f40-mzuZ9Fgy0pFHMM5GtNXGxdRS+/w\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 85824,
    "path": "../../.output/public/loto2.jpg"
  },
  "/loto3.jpg": {
    "type": "image/jpeg",
    "etag": "\"1414a-drXoEwHUBV9wXPJ4UXJYHil4okk\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 82250,
    "path": "../../.output/public/loto3.jpg"
  },
  "/loto4.jpg": {
    "type": "image/jpeg",
    "etag": "\"120c9-nrD2nZxbRH8f7AcgSWJ0yrsVFt0\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 73929,
    "path": "../../.output/public/loto4.jpg"
  },
  "/loto5.jpg": {
    "type": "image/jpeg",
    "etag": "\"114da-PIr++siQs/9HWFEdswbztkA9Pog\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 70874,
    "path": "../../.output/public/loto5.jpg"
  },
  "/loto6.jpg": {
    "type": "image/jpeg",
    "etag": "\"d0ca-Ti9Z5yPf6XegEvVf5jAFYZSqBuE\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 53450,
    "path": "../../.output/public/loto6.jpg"
  },
  "/loto7.jpg": {
    "type": "image/jpeg",
    "etag": "\"9c53-kAJ/b8MxJsnuj4uAJID9GEzHiLI\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 40019,
    "path": "../../.output/public/loto7.jpg"
  },
  "/loto8.jpg": {
    "type": "image/jpeg",
    "etag": "\"d933-O7apFw8cTYnNX72IGDxH+1ZwAbY\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 55603,
    "path": "../../.output/public/loto8.jpg"
  },
  "/manifest.json": {
    "type": "application/json",
    "etag": "\"50c-pKKsmnM/ejZbAu38utdC/p02l94\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 1292,
    "path": "../../.output/public/manifest.json"
  },
  "/manifest.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"125-qDy3gCGhSrKoMcGMsKPvpRkSQiQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 293,
    "path": "../../.output/public/manifest.json.br"
  },
  "/manifest.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"161-DOHfs+SqYdh8338UKlWA7Fiv1CQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 353,
    "path": "../../.output/public/manifest.json.gz"
  },
  "/production.webp": {
    "type": "image/webp",
    "etag": "\"adae-txsTbXOVwo8XcXK1T3yx/93OGdg\"",
    "mtime": "2024-05-10T14:43:12.145Z",
    "size": 44462,
    "path": "../../.output/public/production.webp"
  },
  "/royal.jpg": {
    "type": "image/jpeg",
    "etag": "\"4a77-ODNyjQWciK84RfJMxFctSawrsow\"",
    "mtime": "2024-05-10T14:43:11.569Z",
    "size": 19063,
    "path": "../../.output/public/royal.jpg"
  },
  "/site.webmanifest": {
    "type": "application/manifest+json",
    "etag": "\"107-vzG6+RvdL83iSkXj8qG+M3M8b2k\"",
    "mtime": "2024-05-10T14:43:11.565Z",
    "size": 263,
    "path": "../../.output/public/site.webmanifest"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"5a2-l8fKxp+EeYRWHojyorrxEV5RUi8\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 1442,
    "path": "../../.output/public/sw.js"
  },
  "/sw.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1c8-aib4oiJ7C0Wy2QuGoja2xN+d4Fw\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 456,
    "path": "../../.output/public/sw.js.br"
  },
  "/sw.js.gz": {
    "type": "application/javascript",
    "encoding": "gzip",
    "etag": "\"232-5BM/RAkAhHGkCc7kVSY4Y+W7WbQ\"",
    "mtime": "2024-05-10T14:43:12.165Z",
    "size": 562,
    "path": "../../.output/public/sw.js.gz"
  },
  "/_nuxt/IconCSS.f0bffe53.js": {
    "type": "application/javascript",
    "etag": "\"322-9I+1rqIZ2i5hoPzQCdHCsQZFHmw\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 802,
    "path": "../../.output/public/_nuxt/IconCSS.f0bffe53.js"
  },
  "/_nuxt/IconCSS.fe0874d9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-wcoyXH7uDWGP6s8t4bK/iz3ANnk\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 258,
    "path": "../../.output/public/_nuxt/IconCSS.fe0874d9.css"
  },
  "/_nuxt/VCard.109b8863.js": {
    "type": "application/javascript",
    "etag": "\"69c1-evKcMbs8yTqjzggZG8ZF5subaL8\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 27073,
    "path": "../../.output/public/_nuxt/VCard.109b8863.js"
  },
  "/_nuxt/VCard.109b8863.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"1e9e-QenFyhjS3/Hcj2EOWtELND6DzVQ\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 7838,
    "path": "../../.output/public/_nuxt/VCard.109b8863.js.br"
  },
  "/_nuxt/VCard.3e5b5e6e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6a7b-hEsRa/jYH5lPI3RWLGxxQH0qpes\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 27259,
    "path": "../../.output/public/_nuxt/VCard.3e5b5e6e.css"
  },
  "/_nuxt/VCard.3e5b5e6e.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"ee6-Up68nga2ZhGqsty13Eely+SteIY\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 3814,
    "path": "../../.output/public/_nuxt/VCard.3e5b5e6e.css.br"
  },
  "/_nuxt/aboutme.402cd251.js": {
    "type": "application/javascript",
    "etag": "\"11c2-vSDqb+RlX7qklPHT799c35GOkA4\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 4546,
    "path": "../../.output/public/_nuxt/aboutme.402cd251.js"
  },
  "/_nuxt/aboutme.402cd251.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"611-r5U3PJQ8ltaaG/OT+JEqjRLny5g\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1553,
    "path": "../../.output/public/_nuxt/aboutme.402cd251.js.br"
  },
  "/_nuxt/auth.54b9d60a.js": {
    "type": "application/javascript",
    "etag": "\"2b3-Pt4Y0F8oMal41AqfAvg9hg/gbQk\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 691,
    "path": "../../.output/public/_nuxt/auth.54b9d60a.js"
  },
  "/_nuxt/azbuka-chisel.418cbe6d.js": {
    "type": "application/javascript",
    "etag": "\"17e1-xlB1biKvMOVgaeZfMBfdOm7z/i0\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 6113,
    "path": "../../.output/public/_nuxt/azbuka-chisel.418cbe6d.js"
  },
  "/_nuxt/azbuka-chisel.418cbe6d.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"5bb-IimPBhU9gSm/FsgMsmjSHn6apVg\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1467,
    "path": "../../.output/public/_nuxt/azbuka-chisel.418cbe6d.js.br"
  },
  "/_nuxt/cazino-vkusov.1aa8a9d5.js": {
    "type": "application/javascript",
    "etag": "\"18bf-PnCvuj3brzmsq8HbHFqpNSpQYmA\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 6335,
    "path": "../../.output/public/_nuxt/cazino-vkusov.1aa8a9d5.js"
  },
  "/_nuxt/cazino-vkusov.1aa8a9d5.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"555-1S6529fiuW1Qdn/LTJ22sqthBm8\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1365,
    "path": "../../.output/public/_nuxt/cazino-vkusov.1aa8a9d5.js.br"
  },
  "/_nuxt/components.4008c2f1.js": {
    "type": "application/javascript",
    "etag": "\"500-rZyhhlG+/nGHKhX31+JsGF9TCRo\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 1280,
    "path": "../../.output/public/_nuxt/components.4008c2f1.js"
  },
  "/_nuxt/components.4008c2f1.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"21a-xMasqpoHcHURMdRI9Jyuag23ees\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 538,
    "path": "../../.output/public/_nuxt/components.4008c2f1.js.br"
  },
  "/_nuxt/entry.02700669.js": {
    "type": "application/javascript",
    "etag": "\"3b6a5-8zg0PXvfqAtYRK+P+OAWbnEHODc\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 243365,
    "path": "../../.output/public/_nuxt/entry.02700669.js"
  },
  "/_nuxt/entry.02700669.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"13613-A9NeEGPQ7zKYdtV9G1/hVPurbxM\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 79379,
    "path": "../../.output/public/_nuxt/entry.02700669.js.br"
  },
  "/_nuxt/entry.715de368.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5e19-//50zju+Qg+UtDkZlcjPT4sDfVU\"",
    "mtime": "2024-05-10T14:43:11.509Z",
    "size": 24089,
    "path": "../../.output/public/_nuxt/entry.715de368.css"
  },
  "/_nuxt/entry.715de368.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"94c-//FT3+e1FDzdBLy7jEdRh4wfeRw\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 2380,
    "path": "../../.output/public/_nuxt/entry.715de368.css.br"
  },
  "/_nuxt/error-404.41dc0cbb.js": {
    "type": "application/javascript",
    "etag": "\"8ad-4w7MQ9p0VlYEie/2HICJO/W15I8\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 2221,
    "path": "../../.output/public/_nuxt/error-404.41dc0cbb.js"
  },
  "/_nuxt/error-404.41dc0cbb.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3cb-BY/joNoOu7rTEEBKupV5IdrbdMU\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 971,
    "path": "../../.output/public/_nuxt/error-404.41dc0cbb.js.br"
  },
  "/_nuxt/error-404.7fc72018.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-iNt1cqPQ0WDudfCTZVQd31BeRGs\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 3630,
    "path": "../../.output/public/_nuxt/error-404.7fc72018.css"
  },
  "/_nuxt/error-404.7fc72018.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"3bc-A93v76RyHPRfYe4hBxU+FIdEgzQ\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 956,
    "path": "../../.output/public/_nuxt/error-404.7fc72018.css.br"
  },
  "/_nuxt/error-500.52443430.js": {
    "type": "application/javascript",
    "etag": "\"756-QUuhFgqFFRXdCu5WXBGn7/Mh8hc\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1878,
    "path": "../../.output/public/_nuxt/error-500.52443430.js"
  },
  "/_nuxt/error-500.52443430.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"348-LLoHh8DI+/utJKTs2NY9VbGgRhs\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 840,
    "path": "../../.output/public/_nuxt/error-500.52443430.js.br"
  },
  "/_nuxt/error-500.c5df6088.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-ByRo+49BgcevWdRjJy3CMx2IA5k\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1950,
    "path": "../../.output/public/_nuxt/error-500.c5df6088.css"
  },
  "/_nuxt/error-500.c5df6088.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"274-4xEvWHud9noP0LeNHeTu/3OGrf0\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 628,
    "path": "../../.output/public/_nuxt/error-500.c5df6088.css.br"
  },
  "/_nuxt/index.07851027.js": {
    "type": "application/javascript",
    "etag": "\"1103-toqXCXVOsgv9hXwl3ffGT35ojdk\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 4355,
    "path": "../../.output/public/_nuxt/index.07851027.js"
  },
  "/_nuxt/index.07851027.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"3fc-scmkLNFcmXSCKx0amiZ1vDL57b0\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 1020,
    "path": "../../.output/public/_nuxt/index.07851027.js.br"
  },
  "/_nuxt/index.b78d0226.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c-N/owBWprcFGkg6QeshnhqzF7TIA\"",
    "mtime": "2024-05-10T14:43:11.517Z",
    "size": 108,
    "path": "../../.output/public/_nuxt/index.b78d0226.css"
  },
  "/_nuxt/karty-na-bochku.e50944d4.js": {
    "type": "application/javascript",
    "etag": "\"12fc-WR8XCHLFvnF0JcY83ZiKfIUdur0\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 4860,
    "path": "../../.output/public/_nuxt/karty-na-bochku.e50944d4.js"
  },
  "/_nuxt/karty-na-bochku.e50944d4.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"55c-2Kz/NExAvKT3yG7r8Yz5BNnzHfY\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1372,
    "path": "../../.output/public/_nuxt/karty-na-bochku.e50944d4.js.br"
  },
  "/_nuxt/podarochnaya-produkciya.06dfce7e.js": {
    "type": "application/javascript",
    "etag": "\"e56-aT7lJNj3Nv/dSkW/4+y9U8wv89E\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 3670,
    "path": "../../.output/public/_nuxt/podarochnaya-produkciya.06dfce7e.js"
  },
  "/_nuxt/podarochnaya-produkciya.06dfce7e.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"46a-7UkPTeZIbBMPqH/EDbuHdgjQDjI\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1130,
    "path": "../../.output/public/_nuxt/podarochnaya-produkciya.06dfce7e.js.br"
  },
  "/_nuxt/video.5c65c472.js": {
    "type": "application/javascript",
    "etag": "\"1605-fxNjMmpY8UsH9KmQDF8tv9YLEuc\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 5637,
    "path": "../../.output/public/_nuxt/video.5c65c472.js"
  },
  "/_nuxt/video.5c65c472.js.br": {
    "type": "application/javascript",
    "encoding": "br",
    "etag": "\"535-G1AAIZwHC0pNekva0UMohjva8i4\"",
    "mtime": "2024-05-10T14:43:11.521Z",
    "size": 1333,
    "path": "../../.output/public/_nuxt/video.5c65c472.js.br"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-7SwW1WKKJaeh0UcOFqK6IR840k0\"",
    "mtime": "2024-05-10T14:43:11.481Z",
    "size": 71,
    "path": "../../.output/public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/d8ff422f-c5e5-4204-81ff-d37e58c8bad0.json": {
    "type": "application/json",
    "etag": "\"8b-59yk4WHUoM0HMiGdu4PDr+KI6Pw\"",
    "mtime": "2024-05-10T14:43:11.465Z",
    "size": 139,
    "path": "../../.output/public/_nuxt/builds/meta/d8ff422f-c5e5-4204-81ff-d37e58c8bad0.json"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
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
      throw createError({
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
  return readAsset(id);
});

const _BJ7mRp = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts.fs?.dir ? isAbsolute(opts.fs.dir) ? opts.fs.dir : fileURLToPath(new URL(opts.fs.dir, globalThis._importMeta_.url)) : void 0;
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

const _lazy_nwELg5 = () => import('../renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
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
  const router = createRouter$1({
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

const localFetch = nitroApp.localFetch;
trapUnhandledNodeErrors();

export { useRuntimeConfig as a, useStorage as b, getRouteRules as g, localFetch as l, useNitroApp as u };
//# sourceMappingURL=nitro-prerenderer.mjs.map
