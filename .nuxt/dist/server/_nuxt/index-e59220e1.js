import { _ as _export_sfc, V as VContainer, e as __nuxt_component_0$1, b as VRow, d as VCol, g as __nuxt_component_3, a as __nuxt_component_0$2 } from "../server.mjs";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { V as VCard, b as VBtn } from "./VCard-b419ec0f.js";
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
const _sfc_main$3 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VContainer, {
    fluid: "",
    style: { "background-color": "#FF3131" }
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard, {
          class: "d-flex align-center justify-center",
          "min-height": "250",
          flat: "",
          style: { "background-color": "transparent", "margin-top": "60px" }
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                class: "nuxtimg",
                alt: "Игры на корпоратив",
                src: "/ink.webp"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_NuxtImg, {
                  format: "webp",
                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                  class: "nuxtimg",
                  alt: "Игры на корпоратив",
                  src: "/ink.webp"
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard, {
            class: "d-flex align-center justify-center",
            "min-height": "250",
            flat: "",
            style: { "background-color": "transparent", "margin-top": "60px" }
          }, {
            default: withCtx(() => [
              createVNode(_component_NuxtImg, {
                format: "webp",
                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                class: "nuxtimg",
                alt: "Игры на корпоратив",
                src: "/ink.webp"
              })
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Start.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_Icon = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VContainer, {
    fluid: "",
    style: { "background": "linear-gradient(rgba(249,51,52,1), rgba(133,140,137,0.8))" }
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
                      "max-width": "600",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VBtn, {
                            block: "",
                            rounded: "",
                            href: "https://ink.obrend.ru/ink.pdf",
                            download: ""
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_Icon, {
                                  name: "material-symbols:download",
                                  width: "20",
                                  height: "20"
                                }, null, _parent6, _scopeId5));
                                _push6(`<p class="center-h2"${_scopeId5}> СКАЧАТЬ КП</p>`);
                              } else {
                                return [
                                  createVNode(_component_Icon, {
                                    name: "material-symbols:download",
                                    width: "20",
                                    height: "20"
                                  }),
                                  createVNode("p", { class: "center-h2" }, " СКАЧАТЬ КП")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VBtn, {
                              block: "",
                              rounded: "",
                              href: "https://ink.obrend.ru/ink.pdf",
                              download: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_Icon, {
                                  name: "material-symbols:download",
                                  width: "20",
                                  height: "20"
                                }),
                                createVNode("p", { class: "center-h2" }, " СКАЧАТЬ КП")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        class: "mx-auto",
                        "max-width": "600",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode(VBtn, {
                            block: "",
                            rounded: "",
                            href: "https://ink.obrend.ru/ink.pdf",
                            download: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Icon, {
                                name: "material-symbols:download",
                                width: "20",
                                height: "20"
                              }),
                              createVNode("p", { class: "center-h2" }, " СКАЧАТЬ КП")
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
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { cols: "auto" }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      class: "mx-auto",
                      "max-width": "600",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          block: "",
                          rounded: "",
                          href: "https://ink.obrend.ru/ink.pdf",
                          download: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "material-symbols:download",
                              width: "20",
                              height: "20"
                            }),
                            createVNode("p", { class: "center-h2" }, " СКАЧАТЬ КП")
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
                    "max-width": "600",
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        block: "",
                        rounded: "",
                        href: "https://ink.obrend.ru/ink.pdf",
                        download: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "material-symbols:download",
                            width: "20",
                            height: "20"
                          }),
                          createVNode("p", { class: "center-h2" }, " СКАЧАТЬ КП")
                        ]),
                        _: 1
                      })
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
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Buttonkp.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const Uslugi_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  const _component_NuxtImg = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VContainer, {
    fluid: "",
    style: { "background": "linear-gradient(rgba(133,140,137,0.8), rgba(255,255,255,1))" }
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
                      "max-width": "400",
                      "max-height": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_NuxtLink, {
                            to: "/cazino-vkusov",
                            class: "nav-link-black"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="d-flex flex-column fill-height justify-center align-center text-black-50"${_scopeId5}>`);
                                _push6(ssrRenderComponent(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h2 class="center-h2"${_scopeId6}> КАЗИНО ВКУСОВ </h2>`);
                                    } else {
                                      return [
                                        createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(`</div>`);
                                _push6(ssrRenderComponent(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "казино вкусов",
                                  src: "/casino5.webp"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                    createVNode(VBtn, {
                                      border: "",
                                      class: "text-center",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(_component_NuxtImg, {
                                    format: "webp",
                                    class: "white--text align-end",
                                    sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                    width: "300px",
                                    height: "200px",
                                    alt: "казино вкусов",
                                    src: "/casino5.webp"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, {
                              to: "/cazino-vkusov",
                              class: "nav-link-black"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                  createVNode(VBtn, {
                                    border: "",
                                    class: "text-center",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "казино вкусов",
                                  src: "/casino5.webp"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        class: "mx-auto",
                        "max-width": "400",
                        "max-height": "400",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, {
                            to: "/cazino-vkusov",
                            class: "nav-link-black"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                createVNode(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(_component_NuxtImg, {
                                format: "webp",
                                class: "white--text align-end",
                                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                width: "300px",
                                height: "200px",
                                alt: "казино вкусов",
                                src: "/casino5.webp"
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_NuxtLink, {
                            to: "/azbuka-chisel",
                            class: "nav-link-black"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="d-flex flex-column fill-height justify-center align-center text-black-50"${_scopeId5}>`);
                                _push6(ssrRenderComponent(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h2 class="center-h2"${_scopeId6}> АЗБУКА ЛОТО </h2>`);
                                    } else {
                                      return [
                                        createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(`</div>`);
                                _push6(ssrRenderComponent(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "азбука чисел",
                                  src: "/azbuka1.webp"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                    createVNode(VBtn, {
                                      border: "",
                                      class: "text-center",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(_component_NuxtImg, {
                                    format: "webp",
                                    class: "white--text align-end",
                                    sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                    width: "300px",
                                    height: "200px",
                                    alt: "азбука чисел",
                                    src: "/azbuka1.webp"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, {
                              to: "/azbuka-chisel",
                              class: "nav-link-black"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                  createVNode(VBtn, {
                                    border: "",
                                    class: "text-center",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "азбука чисел",
                                  src: "/azbuka1.webp"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        class: "mx-auto",
                        "max-width": "400",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, {
                            to: "/azbuka-chisel",
                            class: "nav-link-black"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                createVNode(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(_component_NuxtImg, {
                                format: "webp",
                                class: "white--text align-end",
                                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                width: "300px",
                                height: "200px",
                                alt: "азбука чисел",
                                src: "/azbuka1.webp"
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_NuxtLink, {
                            to: "/karty-na-bochku",
                            class: "nav-link-black"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="d-flex flex-column fill-height justify-center align-center text-black-50"${_scopeId5}>`);
                                _push6(ssrRenderComponent(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h2 class="center-h2"${_scopeId6}> КАРТЫ НА БОЧКУ </h2>`);
                                    } else {
                                      return [
                                        createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(`</div>`);
                                _push6(ssrRenderComponent(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "карты на бочку",
                                  src: "/karty1.webp"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                    createVNode(VBtn, {
                                      border: "",
                                      class: "text-center",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(_component_NuxtImg, {
                                    format: "webp",
                                    class: "white--text align-end",
                                    sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                    width: "300px",
                                    height: "200px",
                                    alt: "карты на бочку",
                                    src: "/karty1.webp"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, {
                              to: "/karty-na-bochku",
                              class: "nav-link-black"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                  createVNode(VBtn, {
                                    border: "",
                                    class: "text-center",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "карты на бочку",
                                  src: "/karty1.webp"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        class: "mx-auto",
                        "max-width": "400",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, {
                            to: "/karty-na-bochku",
                            class: "nav-link-black"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                createVNode(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(_component_NuxtImg, {
                                format: "webp",
                                class: "white--text align-end",
                                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                width: "300px",
                                height: "200px",
                                alt: "карты на бочку",
                                src: "/karty1.webp"
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, { cols: "auto" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_NuxtLink, {
                            to: "/video",
                            class: "nav-link-black"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<div class="d-flex flex-column fill-height justify-center align-center text-black-50"${_scopeId5}>`);
                                _push6(ssrRenderComponent(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h2 class="center-h2"${_scopeId6}> ВИДЕО </h2>`);
                                    } else {
                                      return [
                                        createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(`</div>`);
                                _push6(ssrRenderComponent(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "отзывы",
                                  text: "jgfjhgfjh",
                                  src: "/azbuka5.webp"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                    createVNode(VBtn, {
                                      border: "",
                                      class: "text-center",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(_component_NuxtImg, {
                                    format: "webp",
                                    class: "white--text align-end",
                                    sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                    width: "300px",
                                    height: "200px",
                                    alt: "отзывы",
                                    text: "jgfjhgfjh",
                                    src: "/azbuka5.webp"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, {
                              to: "/video",
                              class: "nav-link-black"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                  createVNode(VBtn, {
                                    border: "",
                                    class: "text-center",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(_component_NuxtImg, {
                                  format: "webp",
                                  class: "white--text align-end",
                                  sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                  width: "300px",
                                  height: "200px",
                                  alt: "отзывы",
                                  text: "jgfjhgfjh",
                                  src: "/azbuka5.webp"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        class: "mx-auto",
                        "max-width": "400",
                        flat: "",
                        style: { "background-color": "transparent" }
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, {
                            to: "/video",
                            class: "nav-link-black"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                                createVNode(VBtn, {
                                  border: "",
                                  class: "text-center",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(_component_NuxtImg, {
                                format: "webp",
                                class: "white--text align-end",
                                sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                                width: "300px",
                                height: "200px",
                                alt: "отзывы",
                                text: "jgfjhgfjh",
                                src: "/azbuka5.webp"
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
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, { cols: "auto" }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      "max-height": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: "/cazino-vkusov",
                          class: "nav-link-black"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                              createVNode(VBtn, {
                                border: "",
                                class: "text-center",
                                variant: "text"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_NuxtImg, {
                              format: "webp",
                              class: "white--text align-end",
                              sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                              width: "300px",
                              height: "200px",
                              alt: "казино вкусов",
                              src: "/casino5.webp"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VCol, { cols: "auto" }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: "/azbuka-chisel",
                          class: "nav-link-black"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                              createVNode(VBtn, {
                                border: "",
                                class: "text-center",
                                variant: "text"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_NuxtImg, {
                              format: "webp",
                              class: "white--text align-end",
                              sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                              width: "300px",
                              height: "200px",
                              alt: "азбука чисел",
                              src: "/azbuka1.webp"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VCol, { cols: "auto" }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: "/karty-na-bochku",
                          class: "nav-link-black"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                              createVNode(VBtn, {
                                border: "",
                                class: "text-center",
                                variant: "text"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_NuxtImg, {
                              format: "webp",
                              class: "white--text align-end",
                              sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                              width: "300px",
                              height: "200px",
                              alt: "карты на бочку",
                              src: "/karty1.webp"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VCol, { cols: "auto" }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      class: "mx-auto",
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, {
                          to: "/video",
                          class: "nav-link-black"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                              createVNode(VBtn, {
                                border: "",
                                class: "text-center",
                                variant: "text"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(_component_NuxtImg, {
                              format: "webp",
                              class: "white--text align-end",
                              sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                              width: "300px",
                              height: "200px",
                              alt: "отзывы",
                              text: "jgfjhgfjh",
                              src: "/azbuka5.webp"
                            })
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
                    "max-width": "400",
                    "max-height": "400",
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: "/cazino-vkusov",
                        class: "nav-link-black"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                            createVNode(VBtn, {
                              border: "",
                              class: "text-center",
                              variant: "text"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "center-h2" }, " КАЗИНО ВКУСОВ ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "white--text align-end",
                            sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                            width: "300px",
                            height: "200px",
                            alt: "казино вкусов",
                            src: "/casino5.webp"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    class: "mx-auto",
                    "max-width": "400",
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: "/azbuka-chisel",
                        class: "nav-link-black"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                            createVNode(VBtn, {
                              border: "",
                              class: "text-center",
                              variant: "text"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "center-h2" }, " АЗБУКА ЛОТО ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "white--text align-end",
                            sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                            width: "300px",
                            height: "200px",
                            alt: "азбука чисел",
                            src: "/azbuka1.webp"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    class: "mx-auto",
                    "max-width": "400",
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: "/karty-na-bochku",
                        class: "nav-link-black"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                            createVNode(VBtn, {
                              border: "",
                              class: "text-center",
                              variant: "text"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "center-h2" }, " КАРТЫ НА БОЧКУ ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "white--text align-end",
                            sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                            width: "300px",
                            height: "200px",
                            alt: "карты на бочку",
                            src: "/karty1.webp"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "auto" }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    class: "mx-auto",
                    "max-width": "400",
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: "/video",
                        class: "nav-link-black"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-black-50" }, [
                            createVNode(VBtn, {
                              border: "",
                              class: "text-center",
                              variant: "text"
                            }, {
                              default: withCtx(() => [
                                createVNode("h2", { class: "center-h2" }, " ВИДЕО ")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "white--text align-end",
                            sizes: "xs:320vw sm:640vw md:768vw lg:1024vw xl:1280vw xxl:1536vw",
                            width: "300px",
                            height: "200px",
                            alt: "отзывы",
                            text: "jgfjhgfjh",
                            src: "/azbuka5.webp"
                          })
                        ]),
                        _: 1
                      })
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
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Uslugi.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Start = __nuxt_component_0;
  const _component_Buttonkp = __nuxt_component_1;
  const _component_Uslugi = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Start, null, null, _parent));
  _push(ssrRenderComponent(_component_Buttonkp, null, null, _parent));
  _push(ssrRenderComponent(_component_Uslugi, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-e59220e1.js.map
