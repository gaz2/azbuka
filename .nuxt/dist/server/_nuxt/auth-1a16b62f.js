import { _ as _export_sfc, V as VContainer, b as VRow, d as VCol, e as __nuxt_component_0, f as __nuxt_component_1 } from "../server.mjs";
import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "ofetch";
import "#internal/nitro";
import "hookable";
import "unctx";
import "destr";
import "devalue";
import "defu";
import "klona";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "h3";
import "ufo";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_img = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(VContainer, mergeProps({ class: "ma-auto" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, { class: "d-flex justify-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="d-flex justify-center align-center"${_scopeId3}> Nuxt 3 Base by <a href="https://github.com/jojomatik" class="ml-2"${_scopeId3}>`);
                    _push4(ssrRenderComponent(_component_nuxt_img, {
                      src: "/assets/jojomatik.png",
                      width: "120",
                      preload: "",
                      alt: "Jojomatik Logo",
                      class: "d-flex"
                    }, null, _parent4, _scopeId3));
                    _push4(`</a></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "d-flex justify-center align-center" }, [
                        createTextVNode(" Nuxt 3 Base by "),
                        createVNode("a", {
                          href: "https://github.com/jojomatik",
                          class: "ml-2"
                        }, [
                          createVNode(_component_nuxt_img, {
                            src: "/assets/jojomatik.png",
                            width: "120",
                            preload: "",
                            alt: "Jojomatik Logo",
                            class: "d-flex"
                          })
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { class: "d-flex justify-center" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "d-flex justify-center align-center" }, [
                      createTextVNode(" Nuxt 3 Base by "),
                      createVNode("a", {
                        href: "https://github.com/jojomatik",
                        class: "ml-2"
                      }, [
                        createVNode(_component_nuxt_img, {
                          src: "/assets/jojomatik.png",
                          width: "120",
                          preload: "",
                          alt: "Jojomatik Logo",
                          class: "d-flex"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, { class: "d-flex justify-center" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_NuxtPage, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_NuxtPage)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { class: "d-flex justify-center" }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtPage)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { class: "d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex justify-center align-center" }, [
                    createTextVNode(" Nuxt 3 Base by "),
                    createVNode("a", {
                      href: "https://github.com/jojomatik",
                      class: "ml-2"
                    }, [
                      createVNode(_component_nuxt_img, {
                        src: "/assets/jojomatik.png",
                        width: "120",
                        preload: "",
                        alt: "Jojomatik Logo",
                        class: "d-flex"
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, { class: "d-flex justify-center" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  auth as default
};
//# sourceMappingURL=auth-1a16b62f.js.map
