import { getRequestDependencies, getPreloadLinks, getPrefetchLinks, createRenderer } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { eventHandler, setResponseHeader, send, getResponseStatus, setResponseStatus, setResponseHeaders, getQuery, createError, appendResponseHeader, getResponseStatusText } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/h3/dist/index.mjs';
import { stringify, uneval } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/devalue/index.js';
import { joinURL, withoutTrailingSlash } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/server-renderer/index.mjs';
import { renderSSRHead } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/@unhead/ssr/dist/index.mjs';
import { u as useNitroApp, a as useRuntimeConfig, b as useStorage, g as getRouteRules } from './nitro/nitro-prerenderer.mjs';
import { version, unref } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/index.mjs';
import { createServerHead as createServerHead$1 } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unhead/dist/index.mjs';
import { defineHeadPlugin } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ofetch/dist/node.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/destr/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/hookable/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/scule/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/klona/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/defu/dist/defu.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ohash/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/fs.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/memory.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/pathe/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ipx/dist/index.mjs';

function defineRenderHandler(handler) {
  return eventHandler(async (event) => {
    if (event.path.endsWith("/favicon.ico")) {
      setResponseHeader(event, "Content-Type", "image/x-icon");
      return send(
        event,
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
    }
    const response = await handler(event);
    if (!response) {
      const _currentStatus = getResponseStatus(event);
      setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
      return send(
        event,
        "No response returned from render handler: " + event.path
      );
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (response.headers) {
      setResponseHeaders(event, response.headers);
    }
    if (response.statusCode || response.statusMessage) {
      setResponseStatus(event, response.statusCode, response.statusMessage);
    }
    return response.body;
  });
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const Vue3 = version.startsWith("3");

function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref, lastKey = "") {
  if (ref instanceof Promise)
    return ref;
  const root = resolveUnref(ref);
  if (!ref || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}

const VueReactivityPlugin = defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});

const headSymbol = "usehead";
function vueInstall(head) {
  const plugin = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1(options);
  head.use(VueReactivityPlugin);
  head.install = vueInstall(head);
  return head;
}

const unheadPlugins = [];

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"http-equiv":"cache-control","content":"max-age=604800"},{"http-equiv":"cache-control","content":"public"},{"hid":"description","name":"description","content":"Игры на корпоратив, настольные игры спб,!"},{"hid":"keywords","name":"keywords","content":"игры,лото,карты на бочку,коктельное казино,азбука вкусов,подарок на 23 февраля,подарочная продукция"},{"property":"og:site_name","content":"Игры на корпоратив"},{"hid":"og:type","property":"og:type","content":"website"},{"hid":"og:url","property":"og:url","content":"https://ink.obrend.ru/"},{"hid":"og:image:secure_url","property":"og:image:secure_url","content":"/favicon.ico"},{"hid":"og:title","property":"og:title","content":"Игры на корпоратив"},{"hid":"og:description","property":"og:description","content":"Игры на корпоратив, настольные игры спб,!"},{"hid":"og:image","property":"og:image","content":"/favicon.ico"},{"name":"twitter:card","content":"summary_large_image"},{"hid":"twitter:url","name":"twitter:url","content":"https://ink.obrend.ru/"},{"hid":"twitter:title","name":"twitter:title","content":"Игры на корпоратив"},{"hid":"twitter:description","name":"twitter:description","content":"Игры на корпоратив, настольные игры спб,!"},{"hid":"twitter:image","name":"twitter:image","content":"/favicon.ico"},{"name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Игры на корпоратив в Санкт-Петербурге"},{"name":"author","content":"anonymous"},{"name":"description","content":"Игры на корпоратив, настольные игры спб,!"},{"name":"theme-color","content":"#4f46e5"},{"property":"og:type","content":"website"},{"property":"og:title","content":"Игры на корпоратив в Санкт-Петербурге"},{"property":"og:site_name","content":"Игры на корпоратив в Санкт-Петербурге"},{"property":"og:description","content":"Игры на корпоратив, настольные игры спб,!"}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"preconnect","href":"https://fonts.gstatic.com"},{"rel":"preload","type":"style","href":"https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"},{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"},{"rel":"canonical","href":"https://ink.obrend.ru/"},{"rel":"preload","type":"image/webp","sizes":"1920x1200","href":"/ink.webp"},{"rel":"apple-touch-icon","sizes":"180x180","href":"/apple-touch-icon.png"},{"rel":"icon","type":"image/png","sizes":"32x32","href":"/favicon-32x32.png"},{"rel":"icon","type":"image/png","sizes":"16x16","href":"/favicon-16x16.png"},{"rel":"manifest","href":"/site.webmanifest"},{"rel":"preload","type":"image/png","sizes":"192x192","href":"/android-chrome-192x192.png"},{"rel":"shortcut icon","href":"/icon.png"},{"rel":"apple-touch-icon","href":"/icon.png","sizes":"512x512"},{"rel":"manifest","href":"/manifest.json"}],"style":[],"script":[],"noscript":[],"title":"Игры на корпоратив в Санкт-Петербурге","shortTitle":"Игры на корпоратив в Санкт-Петербурге","description":"Игры на корпоратив, настольные игры спб,!","keywords":"игры,лото,карты на бочку,коктельное казино,азбука вкусов,подарок на 23 февраля,подарочная продукция","htmlAttrs":{"lang":"en"}};

const appRootId = "__nuxt";

const appRootTag = "div";

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('./app/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getEntryIds = () => getClientManifest().then((r) => Object.values(r).filter(
  (r2) => (
    // @ts-expect-error internal key set by CSS inlining configuration
    r2._globalCSS
  )
).map((r2) => r2.src));
const getServerEntry = () => import('./app/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => import('./app/styles.mjs').then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    return `<${appRootTag}${` id="${appRootId}"` }>${html}</${appRootTag}>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await import('./rollup/_virtual_spa-template.mjs').then((r) => r.template).catch(() => "");
  const options = {
    manifest,
    renderToString: () => `<${appRootTag}${` id="${appRootId}"` }>${spaTemplate}</${appRootTag}>`,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.modules = ssrContext.modules || /* @__PURE__ */ new Set();
    ssrContext.payload = {
      _errors: {},
      serverRendered: false,
      data: {},
      state: {}
    };
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const payloadCache = useStorage("internal:nuxt:prerender:payload") ;
useStorage("internal:nuxt:prerender:island") ;
useStorage("internal:nuxt:prerender:island-props") ;
const PAYLOAD_URL_RE = /\/_payload(\.[a-zA-Z0-9]+)?.json(\?.*)?$/ ;
const PRERENDER_NO_SSR_ROUTES = /* @__PURE__ */ new Set(["/index.html", "/200.html", "/404.html"]);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = parseInt(ssrError.statusCode);
  }
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const islandContext = void 0;
  let url = ssrError?.url || islandContext?.url || event.path;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !islandContext;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event._path = url;
    event.node.req.url = url;
    if (await payloadCache.hasItem(url)) {
      return payloadCache.getItem(url);
    }
  }
  const routeOptions = getRouteRules(event);
  const head = createServerHead({
    plugins: unheadPlugins
  });
  const headEntryOptions = { mode: "server" };
  head.push(appHead, headEntryOptions);
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false && !islandContext || (PRERENDER_NO_SSR_ROUTES.has(url) ),
    head,
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: {},
    islandContext
  };
  const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && !islandContext;
  const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(useRuntimeConfig().app.baseURL, url, "_payload.json" ) : void 0;
  {
    ssrContext.payload.prerenderedAt = Date.now();
  }
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    {
      await payloadCache.setItem(url, response2);
    }
    return response2;
  }
  if (_PAYLOAD_EXTRACTION) {
    appendResponseHeader(event, "x-nitro-prerender", joinURL(url, "_payload.json" ));
    await payloadCache.setItem(withoutTrailingSlash(url), renderPayloadResponse(ssrContext));
  }
  {
    const source = ssrContext.modules ?? ssrContext._registeredComponents;
    if (source) {
      for (const id of await getEntryIds()) {
        source.add(id);
      }
    }
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? ssrContext._registeredComponents ?? []) ;
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (_PAYLOAD_EXTRACTION) {
    head.push({
      link: [
        { rel: "preload", as: "fetch", crossorigin: "anonymous", href: payloadURL } 
      ]
    }, headEntryOptions);
  }
  head.push({ style: inlinedStyles });
  head.push({
    link: Object.values(styles).map(
      (resource) => ({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file) })
    )
  }, headEntryOptions);
  if (!NO_SCRIPTS) {
    head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    head.push({
      script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: splitPayload(ssrContext).initial, src: payloadURL })  : renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.experimentalNoScripts) {
    head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(head);
  const htmlContext = {
    island: Boolean(islandContext),
    htmlAttrs: [htmlAttrs],
    head: normalizeChunks([headTags, ssrContext.styles]),
    bodyAttrs: [bodyAttrs],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [_rendered.html],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html>
<html ${joinAttrs(html.htmlAttrs)}>
<head>${joinTags(html.head)}</head>
<body ${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>
</html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    type: "application/json",
    id: opts.id,
    innerHTML: contents,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${uneval(opts.ssrContext.config)}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
