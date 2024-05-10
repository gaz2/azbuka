import { T as Title, M as Meta } from './components-a4303dbf.mjs';
import { V as VContainer, b as VRow, d as VCol, a as __nuxt_component_0$2, _ as _export_sfc } from '../server.mjs';
import { ref, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VCard, a as VCardActions, b as VBtn } from './VCard-b419ec0f.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'url';
import 'node:url';
import 'ipx';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

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
                          _push5(`<div class="d-flex flex-column fill-height justify-center align-center text-white-50"${_scopeId4}><h1 class="text-white-h6 font-weight mb-4 center-h1"${_scopeId4}> \u0410\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432 `);
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
                                createTextVNode(" \u0410\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432 "),
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
                          _push5(`<div class="center-h2"${_scopeId4}> \u0410\u0417\u0411\u0423\u041A\u0410 \u0412\u041A\u0423\u0421\u041E\u0412 \u0421\u041F\u0411 \u2014 \u044D\u0442\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F event \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438. \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F 20019-2020 \u0433\u0433. \u0418\u0414\u0415\u042F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043B\u0435\u0433\u043A\u043E \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u2013 \u043A \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \u043E\u0442 \u0410 \u0434\u043E \u042F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B, \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u0430\u043D\u044B \u043D\u0430\u043F\u0438\u0442\u043A\u0438: \u0410\u0431\u0440\u0438\u043A\u043E\u0441, \u0411\u0440\u0443\u0441\u043D\u0438\u043A\u0430, \u0412\u0438\u0448\u043D\u044F, \u0413\u0440\u0443\u0448\u0430, \u0414\u0443\u0431 \u0438 \u0442.\u0434. \u0434\u043E \u0431\u0443\u043A\u0432\u044B \u042F. \u041D\u0430\u043F\u0438\u0442\u043A\u0438 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0438\u0437 \u0444\u0440\u0443\u043A\u0442\u043E\u0432, \u044F\u0433\u043E\u0434, \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0439. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0438\u0437 33\u0445 \u0431\u0443\u043A\u0432. \u041E\u043D\u0438 \u0436\u0435 \u043F\u043E\u0441\u043B\u0443\u0436\u0438\u043B\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F event \u0441\u0444\u0435\u0440\u044B \u2013 \u0418\u0433\u0440\u0430\u043C. </div>`);
                        } else {
                          return [
                            createVNode("div", { class: "center-h2" }, " \u0410\u0417\u0411\u0423\u041A\u0410 \u0412\u041A\u0423\u0421\u041E\u0412 \u0421\u041F\u0411 \u2014 \u044D\u0442\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F event \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438. \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F 20019-2020 \u0433\u0433. \u0418\u0414\u0415\u042F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043B\u0435\u0433\u043A\u043E \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u2013 \u043A \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \u043E\u0442 \u0410 \u0434\u043E \u042F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B, \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u0430\u043D\u044B \u043D\u0430\u043F\u0438\u0442\u043A\u0438: \u0410\u0431\u0440\u0438\u043A\u043E\u0441, \u0411\u0440\u0443\u0441\u043D\u0438\u043A\u0430, \u0412\u0438\u0448\u043D\u044F, \u0413\u0440\u0443\u0448\u0430, \u0414\u0443\u0431 \u0438 \u0442.\u0434. \u0434\u043E \u0431\u0443\u043A\u0432\u044B \u042F. \u041D\u0430\u043F\u0438\u0442\u043A\u0438 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0438\u0437 \u0444\u0440\u0443\u043A\u0442\u043E\u0432, \u044F\u0433\u043E\u0434, \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0439. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0438\u0437 33\u0445 \u0431\u0443\u043A\u0432. \u041E\u043D\u0438 \u0436\u0435 \u043F\u043E\u0441\u043B\u0443\u0436\u0438\u043B\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F event \u0441\u0444\u0435\u0440\u044B \u2013 \u0418\u0433\u0440\u0430\u043C. ")
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
                              createTextVNode(" \u0410\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432 "),
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
                          createVNode("div", { class: "center-h2" }, " \u0410\u0417\u0411\u0423\u041A\u0410 \u0412\u041A\u0423\u0421\u041E\u0412 \u0421\u041F\u0411 \u2014 \u044D\u0442\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F event \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438. \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F 20019-2020 \u0433\u0433. \u0418\u0414\u0415\u042F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043B\u0435\u0433\u043A\u043E \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u2013 \u043A \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \u043E\u0442 \u0410 \u0434\u043E \u042F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B, \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u0430\u043D\u044B \u043D\u0430\u043F\u0438\u0442\u043A\u0438: \u0410\u0431\u0440\u0438\u043A\u043E\u0441, \u0411\u0440\u0443\u0441\u043D\u0438\u043A\u0430, \u0412\u0438\u0448\u043D\u044F, \u0413\u0440\u0443\u0448\u0430, \u0414\u0443\u0431 \u0438 \u0442.\u0434. \u0434\u043E \u0431\u0443\u043A\u0432\u044B \u042F. \u041D\u0430\u043F\u0438\u0442\u043A\u0438 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0438\u0437 \u0444\u0440\u0443\u043A\u0442\u043E\u0432, \u044F\u0433\u043E\u0434, \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0439. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0438\u0437 33\u0445 \u0431\u0443\u043A\u0432. \u041E\u043D\u0438 \u0436\u0435 \u043F\u043E\u0441\u043B\u0443\u0436\u0438\u043B\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F event \u0441\u0444\u0435\u0440\u044B \u2013 \u0418\u0433\u0440\u0430\u043C. ")
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
                            createTextVNode(" \u0410\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432 "),
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
                        createVNode("div", { class: "center-h2" }, " \u0410\u0417\u0411\u0423\u041A\u0410 \u0412\u041A\u0423\u0421\u041E\u0412 \u0421\u041F\u0411 \u2014 \u044D\u0442\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F event \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438. \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F 20019-2020 \u0433\u0433. \u0418\u0414\u0415\u042F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043B\u0435\u0433\u043A\u043E \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u2013 \u043A \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \u043E\u0442 \u0410 \u0434\u043E \u042F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B, \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u0430\u043D\u044B \u043D\u0430\u043F\u0438\u0442\u043A\u0438: \u0410\u0431\u0440\u0438\u043A\u043E\u0441, \u0411\u0440\u0443\u0441\u043D\u0438\u043A\u0430, \u0412\u0438\u0448\u043D\u044F, \u0413\u0440\u0443\u0448\u0430, \u0414\u0443\u0431 \u0438 \u0442.\u0434. \u0434\u043E \u0431\u0443\u043A\u0432\u044B \u042F. \u041D\u0430\u043F\u0438\u0442\u043A\u0438 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0438\u0437 \u0444\u0440\u0443\u043A\u0442\u043E\u0432, \u044F\u0433\u043E\u0434, \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0439. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0438\u0437 33\u0445 \u0431\u0443\u043A\u0432. \u041E\u043D\u0438 \u0436\u0435 \u043F\u043E\u0441\u043B\u0443\u0436\u0438\u043B\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F event \u0441\u0444\u0435\u0440\u044B \u2013 \u0418\u0433\u0440\u0430\u043C. ")
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
                          createTextVNode(" \u0410\u0437\u0431\u0443\u043A\u0430 \u0432\u043A\u0443\u0441\u043E\u0432 "),
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
                      createVNode("div", { class: "center-h2" }, " \u0410\u0417\u0411\u0423\u041A\u0410 \u0412\u041A\u0423\u0421\u041E\u0412 \u0421\u041F\u0411 \u2014 \u044D\u0442\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u043B\u044F event \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438. \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F 20019-2020 \u0433\u0433. \u0418\u0414\u0415\u042F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043B\u0435\u0433\u043A\u043E \u0432\u043E\u0441\u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0441\u044F \u2013 \u043A \u0430\u043B\u0444\u0430\u0432\u0438\u0442\u0443 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E \u044F\u0437\u044B\u043A\u0430 \u043E\u0442 \u0410 \u0434\u043E \u042F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u0438\u043D\u0433\u0440\u0435\u0434\u0438\u0435\u043D\u0442\u044B, \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u0434\u0435\u043B\u0430\u043D\u044B \u043D\u0430\u043F\u0438\u0442\u043A\u0438: \u0410\u0431\u0440\u0438\u043A\u043E\u0441, \u0411\u0440\u0443\u0441\u043D\u0438\u043A\u0430, \u0412\u0438\u0448\u043D\u044F, \u0413\u0440\u0443\u0448\u0430, \u0414\u0443\u0431 \u0438 \u0442.\u0434. \u0434\u043E \u0431\u0443\u043A\u0432\u044B \u042F. \u041D\u0430\u043F\u0438\u0442\u043A\u0438 \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u044B \u0438\u0437 \u0444\u0440\u0443\u043A\u0442\u043E\u0432, \u044F\u0433\u043E\u0434, \u043E\u0432\u043E\u0449\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u043F\u0435\u0446\u0438\u0439. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0441\u044F \u0430\u0441\u0441\u043E\u0440\u0442\u0438\u043C\u0435\u043D\u0442 \u0438\u0437 33\u0445 \u0431\u0443\u043A\u0432. \u041E\u043D\u0438 \u0436\u0435 \u043F\u043E\u0441\u043B\u0443\u0436\u0438\u043B\u0438 \u0440\u0430\u0437\u0432\u0438\u0442\u0438\u044E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0447\u0430\u0441\u0442\u0438 \u0440\u0430\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u0439 \u0434\u043B\u044F event \u0441\u0444\u0435\u0440\u044B \u2013 \u0418\u0433\u0440\u0430\u043C. ")
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
    const title = ref("\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443");
    ref("\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u0432 \u0412\u044B\u0431\u043E\u0440\u0433\u0435 \u0438 \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435");
    const description = ref("\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 \u0432 \u0412\u044B\u0431\u043E\u0440\u0433\u0435 \u0438 \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0435!");
    const keywords = ref("\u0412\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0430\u0434\u044C\u0431\u0443 \u0432 \u0412\u044B\u0431\u043E\u0440\u0433\u0435,\u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 \u0441 \u0434\u0438\u0434\u0436\u0435\u0435\u043C \u0432 \u0412\u044B\u0431\u043E\u0440\u0433\u0435,\u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 \u0412\u044B\u0431\u043E\u0440\u0433,\u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 \u0421\u041F\u0431,\u043F\u043E\u044E\u0449\u0438\u0439 \u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Title = Title;
      const _component_Meta = Meta;
      const _component_NuxtLink = __nuxt_component_0$2;
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
                              _push5(`<h2 class="text-h5 font-weight-thin mb-4"${_scopeId4}> \u0424\u0430\u043A\u0442\u044B \u043E\u0431\u043E \u043C\u043D\u0435 `);
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
                                  createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                    createTextVNode(" \u0424\u0430\u043A\u0442\u044B \u043E\u0431\u043E \u043C\u043D\u0435 "),
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
                              _push5(`<div${_scopeId4}>\u041F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0432\u0430\u0434\u0435\u0431 \u0432 \u0421\u041F\u0431 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0437\u0430\u0434\u043E\u043B\u0433\u043E \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0437\u0430\u043A\u0430\u0437 \u0443\u0441\u043B\u0443\u0433 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043C\u043E\u043B\u043E\u0434\u043E\u0436\u0435\u043D\u043E\u0432. \u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430, \u043E\u0431\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043C\u0435\u044E\u0449\u0438\u0439\u0441\u044F \u043D\u044E\u0430\u043D\u0441. \u0423 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432 \u0433\u0440\u0430\u0444\u0438\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043B\u043E\u0442\u043D\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0432\u043F\u0435\u0440\u0435\u0434, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043E\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u043C\u0430\u0434\u043E\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0437\u0430\u0440\u0430\u043D\u0435\u0435. </div>`);
                            } else {
                              return [
                                createVNode("div", null, "\u041F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0432\u0430\u0434\u0435\u0431 \u0432 \u0421\u041F\u0431 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0437\u0430\u0434\u043E\u043B\u0433\u043E \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0437\u0430\u043A\u0430\u0437 \u0443\u0441\u043B\u0443\u0433 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043C\u043E\u043B\u043E\u0434\u043E\u0436\u0435\u043D\u043E\u0432. \u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430, \u043E\u0431\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043C\u0435\u044E\u0449\u0438\u0439\u0441\u044F \u043D\u044E\u0430\u043D\u0441. \u0423 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432 \u0433\u0440\u0430\u0444\u0438\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043B\u043E\u0442\u043D\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0432\u043F\u0435\u0440\u0435\u0434, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043E\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u043C\u0430\u0434\u043E\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0437\u0430\u0440\u0430\u043D\u0435\u0435. ")
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
                                createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                  createTextVNode(" \u0424\u0430\u043A\u0442\u044B \u043E\u0431\u043E \u043C\u043D\u0435 "),
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
                              createVNode("div", null, "\u041F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0432\u0430\u0434\u0435\u0431 \u0432 \u0421\u041F\u0431 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0437\u0430\u0434\u043E\u043B\u0433\u043E \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0437\u0430\u043A\u0430\u0437 \u0443\u0441\u043B\u0443\u0433 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043C\u043E\u043B\u043E\u0434\u043E\u0436\u0435\u043D\u043E\u0432. \u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430, \u043E\u0431\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043C\u0435\u044E\u0449\u0438\u0439\u0441\u044F \u043D\u044E\u0430\u043D\u0441. \u0423 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432 \u0433\u0440\u0430\u0444\u0438\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043B\u043E\u0442\u043D\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0432\u043F\u0435\u0440\u0435\u0434, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043E\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u043C\u0430\u0434\u043E\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0437\u0430\u0440\u0430\u043D\u0435\u0435. ")
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
                              createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                                createTextVNode(" \u0424\u0430\u043A\u0442\u044B \u043E\u0431\u043E \u043C\u043D\u0435 "),
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
                            createVNode("div", null, "\u041F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0432\u0430\u0434\u0435\u0431 \u0432 \u0421\u041F\u0431 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0437\u0430\u0434\u043E\u043B\u0433\u043E \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0437\u0430\u043A\u0430\u0437 \u0443\u0441\u043B\u0443\u0433 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043C\u043E\u043B\u043E\u0434\u043E\u0436\u0435\u043D\u043E\u0432. \u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430, \u043E\u0431\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043C\u0435\u044E\u0449\u0438\u0439\u0441\u044F \u043D\u044E\u0430\u043D\u0441. \u0423 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432 \u0433\u0440\u0430\u0444\u0438\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043B\u043E\u0442\u043D\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0432\u043F\u0435\u0440\u0435\u0434, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043E\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u043C\u0430\u0434\u043E\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0437\u0430\u0440\u0430\u043D\u0435\u0435. ")
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
                            createVNode("h2", { class: "text-h5 font-weight-thin mb-4" }, [
                              createTextVNode(" \u0424\u0430\u043A\u0442\u044B \u043E\u0431\u043E \u043C\u043D\u0435 "),
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
                          createVNode("div", null, "\u041F\u0440\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0441\u0432\u0430\u0434\u0435\u0431 \u0432 \u0421\u041F\u0431 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 \u0442\u0449\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438 \u0437\u0430\u0434\u043E\u043B\u0433\u043E \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F. \u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u043E, \u0437\u0430\u043A\u0430\u0437 \u0443\u0441\u043B\u0443\u0433 \u0432\u0435\u0434\u0443\u0449\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u043E\u043E\u0447\u0435\u0440\u0435\u0434\u043D\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u043C\u043E\u043B\u043E\u0434\u043E\u0436\u0435\u043D\u043E\u0432. \u0418\u043C\u0435\u043D\u043D\u043E \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0438\u043C\u0438 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u043F\u0440\u0430\u0437\u0434\u043D\u0438\u043A\u0430, \u043E\u0431\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u0438\u043C\u0435\u044E\u0449\u0438\u0439\u0441\u044F \u043D\u044E\u0430\u043D\u0441. \u0423 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u043E\u0432 \u0433\u0440\u0430\u0444\u0438\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u043B\u043E\u0442\u043D\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0432\u043F\u0435\u0440\u0435\u0434, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043E\u0433\u043E\u0432\u0430\u0440\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0442\u0430\u043C\u0430\u0434\u043E\u0439 \u043B\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043E \u0437\u0430\u0440\u0430\u043D\u0435\u0435. ")
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

export { _sfc_main as default };
//# sourceMappingURL=aboutme-971046cb.mjs.map
