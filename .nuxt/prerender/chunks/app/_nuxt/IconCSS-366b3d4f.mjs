import { useSSRContext, defineComponent, computed, mergeProps } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/index.mjs';
import { _ as _export_sfc, Z as useAppConfig } from '../server.mjs';
import { ssrRenderAttrs } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ofetch/dist/node.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/hookable/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unctx/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/defu/dist/defu.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/klona/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unhead/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/@unhead/shared/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue-router/dist/vue-router.node.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/h3/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/ufo/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/@iconify/vue/dist/offline.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/@iconify/vue/dist/iconify.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/destr/dist/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/scule/dist/index.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "IconCSS",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const appConfig = useAppConfig();
    const props = __props;
    const iconName = computed(() => {
      var _a;
      return ((((_a = appConfig.nuxtIcon) == null ? void 0 : _a.aliases) || {})[props.name] || props.name).replace(/^i-/, "");
    });
    const iconUrl = computed(() => `url('https://api.iconify.design/${iconName.value.replace(":", "/")}.svg')`);
    const sSize = computed(() => {
      var _a, _b, _c;
      if (!props.size && typeof ((_a = appConfig.nuxtIcon) == null ? void 0 : _a.size) === "boolean" && !((_b = appConfig.nuxtIcon) == null ? void 0 : _b.size)) {
        return void 0;
      }
      const size = props.size || ((_c = appConfig.nuxtIcon) == null ? void 0 : _c.size) || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        "--17e81e26": iconUrl.value
      } };
      _push(`<span${ssrRenderAttrs(mergeProps({
        style: { width: sSize.value, height: sSize.value }
      }, _attrs, _cssVars))} data-v-2717c442></span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-icon/dist/runtime/IconCSS.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IconCSS = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2717c442"]]);

export { IconCSS as default };
//# sourceMappingURL=IconCSS-366b3d4f.mjs.map
