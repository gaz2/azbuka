import { T as Title, M as Meta } from './components-a4303dbf.mjs';
import { V as VContainer, b as VRow, d as VCol, a as __nuxt_component_0$2, _ as _export_sfc, e as __nuxt_component_0$1 } from '../server.mjs';
import { ref, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext, openBlock, createBlock, Fragment, renderList } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'file:///home/gzdb/WebSitesProjects/azbuka/node_modules/vue/server-renderer/index.mjs';
import { V as VCard, a as VCardActions, b as VBtn } from './VCard-b419ec0f.mjs';
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

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VContainer, {
    fluid: "",
    justify: "center",
    align: "center"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow, {
          justify: "center",
          align: "center"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(1, (n) => {
                _push3(ssrRenderComponent(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_NuxtImg, {
                        src: "/casino1.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(VRow, {
                                class: "fill-height ma-0",
                                align: "center",
                                justify: "center"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_NuxtImg, {
                          src: "/casino1.webp",
                          alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                          sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]--><!--[-->`);
              ssrRenderList(1, (n) => {
                _push3(ssrRenderComponent(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_NuxtImg, {
                        src: "/casino2.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(VRow, {
                                class: "fill-height ma-0",
                                align: "center",
                                justify: "center"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_NuxtImg, {
                          src: "/casino2.webp",
                          alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                          sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]--><!--[-->`);
              ssrRenderList(1, (n) => {
                _push3(ssrRenderComponent(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_NuxtImg, {
                        src: "/casino3.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(VRow, {
                                class: "fill-height ma-0",
                                align: "center",
                                justify: "center"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_NuxtImg, {
                          src: "/casino3.webp",
                          alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                          sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]--><!--[-->`);
              ssrRenderList(1, (n) => {
                _push3(ssrRenderComponent(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_NuxtImg, {
                        src: "/casino4.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(VRow, {
                                class: "fill-height ma-0",
                                align: "center",
                                justify: "center"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_NuxtImg, {
                          src: "/casino4.webp",
                          alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                          sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                        }, {
                          placeholder: withCtx(() => [
                            createVNode(VRow, {
                              class: "fill-height ma-0",
                              align: "center",
                              justify: "center"
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                  return createVNode(VCol, {
                    key: _ctx.i,
                    class: "auto"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtImg, {
                        src: "/casino1.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx(() => [
                          createVNode(VRow, {
                            class: "fill-height ma-0",
                            align: "center",
                            justify: "center"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64)),
                (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                  return createVNode(VCol, {
                    key: _ctx.i,
                    class: "auto"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtImg, {
                        src: "/casino2.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx(() => [
                          createVNode(VRow, {
                            class: "fill-height ma-0",
                            align: "center",
                            justify: "center"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64)),
                (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                  return createVNode(VCol, {
                    key: _ctx.i,
                    class: "auto"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtImg, {
                        src: "/casino3.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx(() => [
                          createVNode(VRow, {
                            class: "fill-height ma-0",
                            align: "center",
                            justify: "center"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64)),
                (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                  return createVNode(VCol, {
                    key: _ctx.i,
                    class: "auto"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtImg, {
                        src: "/casino4.webp",
                        alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                        sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                      }, {
                        placeholder: withCtx(() => [
                          createVNode(VRow, {
                            class: "fill-height ma-0",
                            align: "center",
                            justify: "center"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  });
                }), 64))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VRow, {
            justify: "center",
            align: "center"
          }, {
            default: withCtx(() => [
              (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                return createVNode(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtImg, {
                      src: "/casino1.webp",
                      alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                      sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                    }, {
                      placeholder: withCtx(() => [
                        createVNode(VRow, {
                          class: "fill-height ma-0",
                          align: "center",
                          justify: "center"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                });
              }), 64)),
              (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                return createVNode(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtImg, {
                      src: "/casino2.webp",
                      alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                      sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                    }, {
                      placeholder: withCtx(() => [
                        createVNode(VRow, {
                          class: "fill-height ma-0",
                          align: "center",
                          justify: "center"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                });
              }), 64)),
              (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                return createVNode(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtImg, {
                      src: "/casino3.webp",
                      alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                      sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                    }, {
                      placeholder: withCtx(() => [
                        createVNode(VRow, {
                          class: "fill-height ma-0",
                          align: "center",
                          justify: "center"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                });
              }), 64)),
              (openBlock(), createBlock(Fragment, null, renderList(1, (n) => {
                return createVNode(VCol, {
                  key: _ctx.i,
                  class: "auto"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtImg, {
                      src: "/casino4.webp",
                      alt: "\u041A\u0430\u0437\u0438\u043D\u043E \u0432\u043A\u0443\u0441\u043E\u0432",
                      sizes: "xs:40vw sm:100vw md:200vw lg:400px"
                    }, {
                      placeholder: withCtx(() => [
                        createVNode(VRow, {
                          class: "fill-height ma-0",
                          align: "center",
                          justify: "center"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                });
              }), 64))
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Galerypodarky.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "podarochnaya-produkciya",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F");
    ref("\u0418\u0433\u0440\u044B \u043D\u0430 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432 \u0432 \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435");
    const description = ref("\u0418\u0433\u0440\u044B \u043D\u0430 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432 \u0432 \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435");
    const keywords = ref("\u0438\u0433\u0440\u044B,\u043B\u043E\u0442\u043E,\u043A\u0430\u0440\u0442\u044B \u043D\u0430 \u0431\u043E\u0447\u043A\u0443,\u043A\u043E\u043A\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043A\u0430\u0437\u0438\u043D\u043E,\u0430\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432,\u0430\u0437\u0431\u0443\u043A\u0430 \u0447\u0438\u0441\u0435\u043B,\u043B\u043E\u0442\u043E,\u043F\u043E\u0434\u0430\u0440\u043E\u043A \u043D\u0430 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F,\u043F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Galerypodarky = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}><br><br>`);
      _push(ssrRenderComponent(_component_Title, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(title))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(title)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Meta, {
        name: "description",
        content: unref(description)
      }, null, _parent));
      _push(ssrRenderComponent(_component_Meta, {
        name: "keywords",
        content: unref(keywords)
      }, null, _parent));
      _push(ssrRenderComponent(VContainer, {
        fluid: "",
        style: { "margin-top": "10px" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, {
              justify: "center",
              align: "center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "mx-auto",
                          flat: "",
                          style: { "background-color": "transparent" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex flex-column fill-height justify-center align-center text-black-50"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, {
                                to: "/",
                                class: "nav-link-black"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardActions, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBtn, {
                                            color: "#282828",
                                            text: "",
                                            style: { "margin-top": "-10px" }
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E `);
                                              } else {
                                                return [
                                                  createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VBtn, {
                                              color: "#282828",
                                              text: "",
                                              style: { "margin-top": "-10px" }
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardActions, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            color: "#282828",
                                            text: "",
                                            style: { "margin-top": "-10px" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
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
                              }, _parent5, _scopeId4));
                              _push5(`<h1 class="text-h5 font-weight mb-4 center-black-h1"${_scopeId4}> \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F `);
                              _push5(ssrRenderComponent(VCard, {
                                class: "mx-auto",
                                width: "180",
                                height: "5",
                                style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                              }, null, _parent5, _scopeId4));
                              _push5(`</h1></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                  createVNode(_component_NuxtLink, {
                                    to: "/",
                                    class: "nav-link-black"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCardActions, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            color: "#282828",
                                            text: "",
                                            style: { "margin-top": "-10px" }
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("h1", { class: "text-h5 font-weight mb-4 center-black-h1" }, [
                                    createTextVNode(" \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F "),
                                    createVNode(VCard, {
                                      class: "mx-auto",
                                      width: "180",
                                      height: "5",
                                      style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCard, {
                          class: "mx-auto",
                          flat: "",
                          style: { "background-color": "transparent" }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}> \u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0434\u0435\u043B\u0438\u043C \xAB\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438\xBB \u043F\u043E \u0418\u043C\u0435\u043D\u0438 \u0438\u0437 4 \u0438 5 \u0431\u0443\u043A\u0432. \u0415\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u041D\u0413, \u0414\u0420, 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F \u0438\u043B\u0438 8 \u043C\u0430\u0440\u0442\u0430. \u0418\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435, \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0430\u0431\u043E\u0440\u044B. </div>`);
                            } else {
                              return [
                                createVNode("div", null, " \u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0434\u0435\u043B\u0438\u043C \xAB\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438\xBB \u043F\u043E \u0418\u043C\u0435\u043D\u0438 \u0438\u0437 4 \u0438 5 \u0431\u0443\u043A\u0432. \u0415\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u041D\u0413, \u0414\u0420, 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F \u0438\u043B\u0438 8 \u043C\u0430\u0440\u0442\u0430. \u0418\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435, \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0430\u0431\u043E\u0440\u044B. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, {
                            class: "mx-auto",
                            flat: "",
                            style: { "background-color": "transparent" }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                createVNode(_component_NuxtLink, {
                                  to: "/",
                                  class: "nav-link-black"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardActions, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          color: "#282828",
                                          text: "",
                                          style: { "margin-top": "-10px" }
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("h1", { class: "text-h5 font-weight mb-4 center-black-h1" }, [
                                  createTextVNode(" \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F "),
                                  createVNode(VCard, {
                                    class: "mx-auto",
                                    width: "180",
                                    height: "5",
                                    style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                                  })
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCard, {
                            class: "mx-auto",
                            flat: "",
                            style: { "background-color": "transparent" }
                          }, {
                            default: withCtx(() => [
                              createVNode("div", null, " \u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0434\u0435\u043B\u0438\u043C \xAB\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438\xBB \u043F\u043E \u0418\u043C\u0435\u043D\u0438 \u0438\u0437 4 \u0438 5 \u0431\u0443\u043A\u0432. \u0415\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u041D\u0413, \u0414\u0420, 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F \u0438\u043B\u0438 8 \u043C\u0430\u0440\u0442\u0430. \u0418\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435, \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0430\u0431\u043E\u0440\u044B. ")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "auto" }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "mx-auto",
                          flat: "",
                          style: { "background-color": "transparent" }
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                              createVNode(_component_NuxtLink, {
                                to: "/",
                                class: "nav-link-black"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardActions, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        color: "#282828",
                                        text: "",
                                        style: { "margin-top": "-10px" }
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("h1", { class: "text-h5 font-weight mb-4 center-black-h1" }, [
                                createTextVNode(" \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F "),
                                createVNode(VCard, {
                                  class: "mx-auto",
                                  width: "180",
                                  height: "5",
                                  style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                                })
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(VCard, {
                          class: "mx-auto",
                          flat: "",
                          style: { "background-color": "transparent" }
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, " \u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0434\u0435\u043B\u0438\u043C \xAB\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438\xBB \u043F\u043E \u0418\u043C\u0435\u043D\u0438 \u0438\u0437 4 \u0438 5 \u0431\u0443\u043A\u0432. \u0415\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u041D\u0413, \u0414\u0420, 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F \u0438\u043B\u0438 8 \u043C\u0430\u0440\u0442\u0430. \u0418\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435, \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0430\u0431\u043E\u0440\u044B. ")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, {
                justify: "center",
                align: "center"
              }, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "auto" }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "mx-auto",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                            createVNode(_component_NuxtLink, {
                              to: "/",
                              class: "nav-link-black"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "#282828",
                                      text: "",
                                      style: { "margin-top": "-10px" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("h1", { class: "text-h5 font-weight mb-4 center-black-h1" }, [
                              createTextVNode(" \u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F "),
                              createVNode(VCard, {
                                class: "mx-auto",
                                width: "180",
                                height: "5",
                                style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                              })
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VCard, {
                        class: "mx-auto",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", null, " \u041E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0443\u0434\u0435\u043B\u0438\u043C \xAB\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u0438\xBB \u043F\u043E \u0418\u043C\u0435\u043D\u0438 \u0438\u0437 4 \u0438 5 \u0431\u0443\u043A\u0432. \u0415\u0435 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A \u041D\u0413, \u0414\u0420, 23 \u0444\u0435\u0432\u0440\u0430\u043B\u044F \u0438\u043B\u0438 8 \u043C\u0430\u0440\u0442\u0430. \u0418\u0437\u0433\u043E\u0442\u0430\u0432\u043B\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435, \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u044B \u043F\u043E\u0434 \u043D\u0430\u0431\u043E\u0440\u044B. ")
                        ]),
                        _: 1
                      })
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
      _push(ssrRenderComponent(_component_Galerypodarky, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/podarochnaya-produkciya.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=podarochnaya-produkciya-292209ad.mjs.map
