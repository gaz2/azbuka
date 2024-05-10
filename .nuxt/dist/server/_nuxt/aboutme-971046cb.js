import { T as Title, M as Meta } from "./components-a4303dbf.js";
import { _ as _export_sfc, V as VContainer, b as VRow, d as VCol, a as __nuxt_component_0 } from "../server.mjs";
import { withCtx, createVNode, createTextVNode, useSSRContext, ref, resolveComponent, unref, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { V as VCard, a as VCardActions, b as VBtn } from "./VCard-b419ec0f.js";
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
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
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
                      "max-width": "400",
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div class="d-flex flex-column fill-height justify-center align-center text-white-50"${_scopeId4}><h1 class="text-white-h6 font-weight mb-4 center-h1"${_scopeId4}> Азбука вкусов `);
                          _push5(ssrRenderComponent(VCard, {
                            class: "mx-auto",
                            width: "200",
                            height: "5",
                            style: { "background": "linear-gradient(rgba(133,140,137), rgba(249,51,52))" }
                          }, null, _parent5, _scopeId4));
                          _push5(`</h1></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-white-50" }, [
                              createVNode("h1", { class: "text-white-h6 font-weight mb-4 center-h1" }, [
                                createTextVNode(" Азбука вкусов "),
                                createVNode(VCard, {
                                  class: "mx-auto",
                                  width: "200",
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
                          _push5(`<div class="center-h2"${_scopeId4}> АЗБУКА ВКУСОВ СПБ — это направление для event индустрии. Начало создания 20019-2020 гг. ИДЕЯ проекта легко воспринимается – к алфавиту русского языка от А до Я привязаны ингредиенты, на основе которых сделаны напитки: Абрикос, Брусника, Вишня, Груша, Дуб и т.д. до буквы Я. Напитки изготовлены из фруктов, ягод, овощей и других культур с добавлением специй. Получился ассортимент из 33х букв. Они же послужили развитию следующей части развлечений для event сферы – Играм. </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "center-h2" }, " АЗБУКА ВКУСОВ СПБ — это направление для event индустрии. Начало создания 20019-2020 гг. ИДЕЯ проекта легко воспринимается – к алфавиту русского языка от А до Я привязаны ингредиенты, на основе которых сделаны напитки: Абрикос, Брусника, Вишня, Груша, Дуб и т.д. до буквы Я. Напитки изготовлены из фруктов, ягод, овощей и других культур с добавлением специй. Получился ассортимент из 33х букв. Они же послужили развитию следующей части развлечений для event сферы – Играм. ")
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
                          createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-white-50" }, [
                            createVNode("h1", { class: "text-white-h6 font-weight mb-4 center-h1" }, [
                              createTextVNode(" Азбука вкусов "),
                              createVNode(VCard, {
                                class: "mx-auto",
                                width: "200",
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
                          createVNode("div", { class: "center-h2" }, " АЗБУКА ВКУСОВ СПБ — это направление для event индустрии. Начало создания 20019-2020 гг. ИДЕЯ проекта легко воспринимается – к алфавиту русского языка от А до Я привязаны ингредиенты, на основе которых сделаны напитки: Абрикос, Брусника, Вишня, Груша, Дуб и т.д. до буквы Я. Напитки изготовлены из фруктов, ягод, овощей и других культур с добавлением специй. Получился ассортимент из 33х букв. Они же послужили развитию следующей части развлечений для event сферы – Играм. ")
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
                      flat: "",
                      style: { "background-color": "transparent" }
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-white-50" }, [
                          createVNode("h1", { class: "text-white-h6 font-weight mb-4 center-h1" }, [
                            createTextVNode(" Азбука вкусов "),
                            createVNode(VCard, {
                              class: "mx-auto",
                              width: "200",
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
                        createVNode("div", { class: "center-h2" }, " АЗБУКА ВКУСОВ СПБ — это направление для event индустрии. Начало создания 20019-2020 гг. ИДЕЯ проекта легко воспринимается – к алфавиту русского языка от А до Я привязаны ингредиенты, на основе которых сделаны напитки: Абрикос, Брусника, Вишня, Груша, Дуб и т.д. до буквы Я. Напитки изготовлены из фруктов, ягод, овощей и других культур с добавлением специй. Получился ассортимент из 33х букв. Они же послужили развитию следующей части развлечений для event сферы – Играм. ")
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
                    flat: "",
                    style: { "background-color": "transparent" }
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex flex-column fill-height justify-center align-center text-white-50" }, [
                        createVNode("h1", { class: "text-white-h6 font-weight mb-4 center-h1" }, [
                          createTextVNode(" Азбука вкусов "),
                          createVNode(VCard, {
                            class: "mx-auto",
                            width: "200",
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
                      createVNode("div", { class: "center-h2" }, " АЗБУКА ВКУСОВ СПБ — это направление для event индустрии. Начало создания 20019-2020 гг. ИДЕЯ проекта легко воспринимается – к алфавиту русского языка от А до Я привязаны ингредиенты, на основе которых сделаны напитки: Абрикос, Брусника, Вишня, Груша, Дуб и т.д. до буквы Я. Напитки изготовлены из фруктов, ягод, овощей и других культур с добавлением специй. Получился ассортимент из 33х букв. Они же послужили развитию следующей части развлечений для event сферы – Играм. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Anons.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "aboutme",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("Ведущий на свадьбу");
    ref("Ведущий в Выборге и Санкт-Петербурге");
    const description = ref("Ведущий на свадьбу в Выборге и Санкт-Петербурге!");
    const keywords = ref("Ведущий на садьбу в Выборге,ведущий на свадьбу с диджеем в Выборге,ведущий на свадьбу Выборг,ведущий на свадьбу СПб,поющий ведущий на свадьбу");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Galerysvadba = resolveComponent("Galerysvadba");
      const _component_Anons = __nuxt_component_3;
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
        style: { "background": "linear-gradient(rgba(247, 182, 2,0.6), rgba(247, 182, 2, 1))", "margin-top": "10px" }
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
                                                _push8(` На главную `);
                                              } else {
                                                return [
                                                  createTextVNode(" На главную ")
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
                                                createTextVNode(" На главную ")
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
                                              createTextVNode(" На главную ")
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
                              _push5(`<h2 class="text-h5 font-weight-thin mb-4"${_scopeId4}> Факты обо мне `);
                              _push5(ssrRenderComponent(VCard, {
                                class: "mx-auto",
                                width: "120",
                                height: "5",
                                style: { "background": "linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1))" }
                              }, null, _parent5, _scopeId4));
                              _push5(`</h2></div>`);
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
                                              createTextVNode(" На главную ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                    createTextVNode(" Факты обо мне "),
                                    createVNode(VCard, {
                                      class: "mx-auto",
                                      width: "120",
                                      height: "5",
                                      style: { "background": "linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1))" }
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
                              _push5(`<div${_scopeId4}>Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее. </div>`);
                            } else {
                              return [
                                createVNode("div", null, "Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее. ")
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
                                            createTextVNode(" На главную ")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                  createTextVNode(" Факты обо мне "),
                                  createVNode(VCard, {
                                    class: "mx-auto",
                                    width: "120",
                                    height: "5",
                                    style: { "background": "linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1))" }
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
                              createVNode("div", null, "Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее. ")
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
                                          createTextVNode(" На главную ")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                createTextVNode(" Факты обо мне "),
                                createVNode(VCard, {
                                  class: "mx-auto",
                                  width: "120",
                                  height: "5",
                                  style: { "background": "linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1))" }
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
                            createVNode("div", null, "Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее. ")
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
                                        createTextVNode(" На главную ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                              createTextVNode(" Факты обо мне "),
                              createVNode(VCard, {
                                class: "mx-auto",
                                width: "120",
                                height: "5",
                                style: { "background": "linear-gradient(rgba(40, 40, 40, 1), rgba(247, 182, 2,1))" }
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
                          createVNode("div", null, "Проведение свадеб в СПб начинается с тщательной подготовки задолго до самого события. Как правило, заказ услуг ведущего должен стать первоочередной целью будущих молодоженов. Именно он будет определять вместе с ними сценарий праздника, обговаривая каждый имеющийся нюанс. У популярных специалистов график может быть плотно расписан на несколько месяцев вперед, поэтому договариваться с тамадой лучше всего заранее. ")
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
      _push(ssrRenderComponent(_component_Galerysvadba, null, null, _parent));
      _push(ssrRenderComponent(_component_Anons, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/aboutme.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=aboutme-971046cb.js.map
