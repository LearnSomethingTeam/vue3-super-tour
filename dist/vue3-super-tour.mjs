import { defineComponent as mt, ref as ht, computed as ne, onMounted as gt, getCurrentInstance as Dt, onBeforeUnmount as It, resolveComponent as $t, openBlock as M, createElementBlock as Y, renderSlot as Ce, unref as I, createBlock as Bt, createCommentVNode as re, onUnmounted as jt, createElementVNode as ke, toDisplayString as te, withModifiers as Ae, normalizeClass as Vt } from "vue";
const q = {
  CLASSES: {
    ACTIVE: "v-tour--active",
    TARGET_HIGHLIGHTED: "v-tour__target--highlighted",
    TARGET_RELATIVE: "v-tour__target--relative"
  },
  TRANSITION: "box-shadow 0s ease-in-out 0s",
  useKeyboardNavigation: !0,
  startTimeout: 0,
  stopOnTargetNotFound: !0
}, Ft = {
  modifiers: [
    {
      name: "arrow",
      options: {
        element: ".v-step__arrow"
      }
    }
  ],
  placement: "bottom"
}, je = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESCAPE: 27
}, Ht = { class: "v-tour" }, Mt = { name: "v-tour" }, tt = /* @__PURE__ */ mt({
  ...Mt,
  props: {
    steps: { default: () => [] },
    name: null,
    buttons: { default: () => ({
      buttonSkip: "Skip tour",
      buttonPrevious: "Previous",
      buttonNext: "Next",
      buttonStop: "Finish"
    }) },
    debug: { type: Boolean },
    keys: { default: () => ({
      ESCAPE: !0,
      ARROW_RIGHT: !0,
      ARROW_LEFT: !0
    }) },
    highlight: { type: Boolean },
    startTimeout: { default: 0 },
    stopOnTargetNotFound: { type: Boolean },
    useKeyboardNavigation: { type: Boolean, default: !0 },
    startCallback: null,
    finishCallback: null,
    prevCallback: null,
    nextCallback: null,
    skipCallback: null,
    stopCallback: null,
    targetNotFoundCallback: null
  },
  emits: ["start", "stop", "skip", "finish", "prev", "next", "target-not-found"],
  setup(e, { expose: t, emit: n }) {
    const r = ht(-1), o = ne(() => r.value > -1 && r.value < u.value), a = ne(() => r.value === 0), s = ne(() => r.value === e.steps.length - 1), u = ne(() => e.steps.length), i = ne(() => e.steps[r.value]);
    async function v(c) {
      return new Promise((d) => setTimeout(d, c));
    }
    async function l(c = 0) {
      var d;
      await v(e.startTimeout), await ((d = e.startCallback) == null ? void 0 : d.call(e, c)), n("start", c), r.value = c;
    }
    async function f() {
      var d, m, w;
      let c = r.value - 1;
      c > -1 && (await ((m = (d = i.value).prevCallback) == null ? void 0 : m.call(d)), await ((w = e.prevCallback) == null ? void 0 : w.call(e, r.value)), n("prev", r.value), r.value = c);
    }
    async function g() {
      var d, m, w;
      let c = r.value + 1;
      c < u.value && r.value !== -1 && (await ((m = (d = i.value).nextCallback) == null ? void 0 : m.call(d)), await ((w = e.nextCallback) == null ? void 0 : w.call(e, r.value)), n("next", r.value), r.value = c);
    }
    async function p() {
      var c;
      await ((c = e.stopCallback) == null ? void 0 : c.call(e, r.value)), n("stop", r.value), document.body.classList.remove("v-tour--active"), r.value = -1;
    }
    async function b() {
      var c, d, m;
      await ((d = (c = i.value).skipCallback) == null ? void 0 : d.call(c)), await ((m = e.skipCallback) == null ? void 0 : m.call(e, r.value)), n("skip", r.value), p();
    }
    async function h() {
      var c;
      await ((c = e.finishCallback) == null ? void 0 : c.call(e, r.value)), n("finish", r.value), p();
    }
    async function y(c) {
      var d, m, w;
      await ((m = (d = i.value).targetNotFoundCallback) == null ? void 0 : m.call(d, c)), await ((w = e.targetNotFoundCallback) == null ? void 0 : w.call(e, r.value, c)), n("target-not-found", r.value, c);
    }
    function x(c) {
      switch (e.debug && console.log("[Vue Tour] A keyup event occured:", c), c.keyCode) {
        case je.ARROW_RIGHT:
          e.keys.ARROW_RIGHT && g();
          break;
        case je.ARROW_LEFT:
          e.keys.ARROW_LEFT && f();
          break;
        case je.ESCAPE:
          e.keys.ESCAPE && p();
          break;
      }
    }
    return t({ start: l, stop: p, skip: b, finish: h, previousStep: f, nextStep: g, currentStep: r, isRunning: o, isFirst: a, isLast: s, numberOfSteps: u, step: i }), gt(() => {
      const c = { step: i, start: l, isRunning: o, currentStep: r, isFirst: a, isLast: s, previousStep: f, nextStep: g, stop: p, skip: b, finish: h }, d = Dt();
      d.appContext.config.globalProperties.$tours[e.name] = c, e.useKeyboardNavigation && window.addEventListener("keyup", x);
    }), It(() => {
      e.useKeyboardNavigation && window.removeEventListener("keyup", x);
    }), (c, d) => {
      const m = $t("v-step");
      return M(), Y("div", Ht, [
        Ce(c.$slots, "default", {
          currentStep: r.value,
          steps: e.steps,
          onPreviousStep: f,
          onNextStep: g,
          onStop: p,
          onSkip: b,
          onFinish: h,
          isFirst: I(a),
          isLast: I(s),
          buttons: e.buttons,
          highlight: e.highlight,
          debug: e.debug
        }, () => [
          e.steps[r.value] ? (M(), Bt(m, {
            key: r.value,
            target: I(i).target,
            title: I(i).title,
            content: I(i).content,
            params: I(i).params,
            duration: I(i).duration,
            offset: I(i).offset,
            "is-first": I(a),
            "is-last": I(s),
            buttons: e.buttons,
            highlight: e.highlight,
            "stop-on-fail": e.stopOnTargetNotFound,
            debug: e.debug,
            onPrev: f,
            onNext: g,
            onStop: p,
            onSkip: b,
            onFinish: h,
            onTargetNotFound: y
          }, null, 8, ["target", "title", "content", "params", "duration", "offset", "is-first", "is-last", "buttons", "highlight", "stop-on-fail", "debug"])) : re("", !0)
        ])
      ]);
    };
  }
});
var R = "top", $ = "bottom", B = "right", P = "left", Le = "auto", be = [R, $, B, P], oe = "start", he = "end", Wt = "clippingParents", bt = "viewport", ve = "popper", qt = "reference", nt = /* @__PURE__ */ be.reduce(function(e, t) {
  return e.concat([t + "-" + oe, t + "-" + he]);
}, []), yt = /* @__PURE__ */ [].concat(be, [Le]).reduce(function(e, t) {
  return e.concat([t, t + "-" + oe, t + "-" + he]);
}, []), Gt = "beforeRead", Yt = "read", Ut = "afterRead", Xt = "beforeMain", zt = "main", Kt = "afterMain", Qt = "beforeWrite", Jt = "write", Zt = "afterWrite", Ve = [Gt, Yt, Ut, Xt, zt, Kt, Qt, Jt, Zt];
function W(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function H(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function ae(e) {
  var t = H(e).Element;
  return e instanceof t || e instanceof Element;
}
function D(e) {
  var t = H(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function He(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = H(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function _t(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !D(a) || !W(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var u = o[s];
      u === !1 ? a.removeAttribute(s) : a.setAttribute(s, u === !0 ? "" : u);
    }));
  });
}
function en(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], a = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), u = s.reduce(function(i, v) {
        return i[v] = "", i;
      }, {});
      !D(o) || !W(o) || (Object.assign(o.style, u), Object.keys(a).forEach(function(i) {
        o.removeAttribute(i);
      }));
    });
  };
}
const tn = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: _t,
  effect: en,
  requires: ["computeStyles"]
};
function V(e) {
  return e.split("-")[0];
}
var _ = Math.max, Pe = Math.min, ie = Math.round;
function se(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, o = 1;
  if (D(e) && t) {
    var a = e.offsetHeight, s = e.offsetWidth;
    s > 0 && (r = ie(n.width) / s || 1), a > 0 && (o = ie(n.height) / a || 1);
  }
  return {
    width: n.width / r,
    height: n.height / o,
    top: n.top / o,
    right: n.right / r,
    bottom: n.bottom / o,
    left: n.left / r,
    x: n.left / r,
    y: n.top / o
  };
}
function Me(e) {
  var t = se(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function wt(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && He(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function F(e) {
  return H(e).getComputedStyle(e);
}
function nn(e) {
  return ["table", "td", "th"].indexOf(W(e)) >= 0;
}
function z(e) {
  return ((ae(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function Ne(e) {
  return W(e) === "html" ? e : e.assignedSlot || e.parentNode || (He(e) ? e.host : null) || z(e);
}
function rt(e) {
  return !D(e) || F(e).position === "fixed" ? null : e.offsetParent;
}
function rn(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && D(e)) {
    var r = F(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Ne(e);
  for (He(o) && (o = o.host); D(o) && ["html", "body"].indexOf(W(o)) < 0; ) {
    var a = F(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function ye(e) {
  for (var t = H(e), n = rt(e); n && nn(n) && F(n).position === "static"; )
    n = rt(n);
  return n && (W(n) === "html" || W(n) === "body" && F(n).position === "static") ? t : n || rn(e) || t;
}
function We(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function de(e, t, n) {
  return _(e, Pe(t, n));
}
function on(e, t, n) {
  var r = de(e, t, n);
  return r > n ? n : r;
}
function Ot() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function xt(e) {
  return Object.assign({}, Ot(), e);
}
function Et(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var an = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, xt(typeof t != "number" ? t : Et(t, be));
};
function sn(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, u = V(n.placement), i = We(u), v = [P, B].indexOf(u) >= 0, l = v ? "height" : "width";
  if (!(!a || !s)) {
    var f = an(o.padding, n), g = Me(a), p = i === "y" ? R : P, b = i === "y" ? $ : B, h = n.rects.reference[l] + n.rects.reference[i] - s[i] - n.rects.popper[l], y = s[i] - n.rects.reference[i], x = ye(a), c = x ? i === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, d = h / 2 - y / 2, m = f[p], w = c - g[l] - f[b], O = c / 2 - g[l] / 2 + d, S = de(m, O, w), k = i;
    n.modifiersData[r] = (t = {}, t[k] = S, t.centerOffset = S - O, t);
  }
}
function un(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  if (o != null && !(typeof o == "string" && (o = t.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (D(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !wt(t.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    t.elements.arrow = o;
  }
}
const ln = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: sn,
  effect: un,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ue(e) {
  return e.split("-")[1];
}
var cn = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function fn(e) {
  var t = e.x, n = e.y, r = window, o = r.devicePixelRatio || 1;
  return {
    x: ie(t * o) / o || 0,
    y: ie(n * o) / o || 0
  };
}
function ot(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, u = e.position, i = e.gpuAcceleration, v = e.adaptive, l = e.roundOffsets, f = e.isFixed, g = s.x, p = g === void 0 ? 0 : g, b = s.y, h = b === void 0 ? 0 : b, y = typeof l == "function" ? l({
    x: p,
    y: h
  }) : {
    x: p,
    y: h
  };
  p = y.x, h = y.y;
  var x = s.hasOwnProperty("x"), c = s.hasOwnProperty("y"), d = P, m = R, w = window;
  if (v) {
    var O = ye(n), S = "clientHeight", k = "clientWidth";
    if (O === H(n) && (O = z(n), F(O).position !== "static" && u === "absolute" && (S = "scrollHeight", k = "scrollWidth")), O = O, o === R || (o === P || o === B) && a === he) {
      m = $;
      var A = f && O === w && w.visualViewport ? w.visualViewport.height : O[S];
      h -= A - r.height, h *= i ? 1 : -1;
    }
    if (o === P || (o === R || o === $) && a === he) {
      d = B;
      var T = f && O === w && w.visualViewport ? w.visualViewport.width : O[k];
      p -= T - r.width, p *= i ? 1 : -1;
    }
  }
  var E = Object.assign({
    position: u
  }, v && cn), C = l === !0 ? fn({
    x: p,
    y: h
  }) : {
    x: p,
    y: h
  };
  if (p = C.x, h = C.y, i) {
    var L;
    return Object.assign({}, E, (L = {}, L[m] = c ? "0" : "", L[d] = x ? "0" : "", L.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", L));
  }
  return Object.assign({}, E, (t = {}, t[m] = c ? h + "px" : "", t[d] = x ? p + "px" : "", t.transform = "", t));
}
function pn(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, u = n.roundOffsets, i = u === void 0 ? !0 : u;
  if (process.env.NODE_ENV !== "production") {
    var v = F(t.elements.popper).transitionProperty || "";
    s && ["transform", "top", "right", "bottom", "left"].some(function(f) {
      return v.indexOf(f) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var l = {
    placement: V(t.placement),
    variation: ue(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ot(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: i
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ot(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const vn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: pn,
  data: {}
};
var Te = {
  passive: !0
};
function dn(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, u = s === void 0 ? !0 : s, i = H(t.elements.popper), v = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && v.forEach(function(l) {
    l.addEventListener("scroll", n.update, Te);
  }), u && i.addEventListener("resize", n.update, Te), function() {
    a && v.forEach(function(l) {
      l.removeEventListener("scroll", n.update, Te);
    }), u && i.removeEventListener("resize", n.update, Te);
  };
}
const mn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: dn,
  data: {}
};
var hn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Re(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return hn[t];
  });
}
var gn = {
  start: "end",
  end: "start"
};
function at(e) {
  return e.replace(/start|end/g, function(t) {
    return gn[t];
  });
}
function qe(e) {
  var t = H(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ge(e) {
  return se(z(e)).left + qe(e).scrollLeft;
}
function bn(e) {
  var t = H(e), n = z(e), r = t.visualViewport, o = n.clientWidth, a = n.clientHeight, s = 0, u = 0;
  return r && (o = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = r.offsetLeft, u = r.offsetTop)), {
    width: o,
    height: a,
    x: s + Ge(e),
    y: u
  };
}
function yn(e) {
  var t, n = z(e), r = qe(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = _(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = _(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -r.scrollLeft + Ge(e), i = -r.scrollTop;
  return F(o || n).direction === "rtl" && (u += _(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: u,
    y: i
  };
}
function Ye(e) {
  var t = F(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function St(e) {
  return ["html", "body", "#document"].indexOf(W(e)) >= 0 ? e.ownerDocument.body : D(e) && Ye(e) ? e : St(Ne(e));
}
function me(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = St(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = H(r), s = o ? [a].concat(a.visualViewport || [], Ye(r) ? r : []) : r, u = t.concat(s);
  return o ? u : u.concat(me(Ne(s)));
}
function Fe(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function wn(e) {
  var t = se(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function it(e, t) {
  return t === bt ? Fe(bn(e)) : ae(t) ? wn(t) : Fe(yn(z(e)));
}
function On(e) {
  var t = me(Ne(e)), n = ["absolute", "fixed"].indexOf(F(e).position) >= 0, r = n && D(e) ? ye(e) : e;
  return ae(r) ? t.filter(function(o) {
    return ae(o) && wt(o, r) && W(o) !== "body";
  }) : [];
}
function xn(e, t, n) {
  var r = t === "clippingParents" ? On(e) : [].concat(t), o = [].concat(r, [n]), a = o[0], s = o.reduce(function(u, i) {
    var v = it(e, i);
    return u.top = _(v.top, u.top), u.right = Pe(v.right, u.right), u.bottom = Pe(v.bottom, u.bottom), u.left = _(v.left, u.left), u;
  }, it(e, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function kt(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? V(r) : null, a = r ? ue(r) : null, s = t.x + t.width / 2 - n.width / 2, u = t.y + t.height / 2 - n.height / 2, i;
  switch (o) {
    case R:
      i = {
        x: s,
        y: t.y - n.height
      };
      break;
    case $:
      i = {
        x: s,
        y: t.y + t.height
      };
      break;
    case B:
      i = {
        x: t.x + t.width,
        y: u
      };
      break;
    case P:
      i = {
        x: t.x - n.width,
        y: u
      };
      break;
    default:
      i = {
        x: t.x,
        y: t.y
      };
  }
  var v = o ? We(o) : null;
  if (v != null) {
    var l = v === "y" ? "height" : "width";
    switch (a) {
      case oe:
        i[v] = i[v] - (t[l] / 2 - n[l] / 2);
        break;
      case he:
        i[v] = i[v] + (t[l] / 2 - n[l] / 2);
        break;
    }
  }
  return i;
}
function ge(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.boundary, s = a === void 0 ? Wt : a, u = n.rootBoundary, i = u === void 0 ? bt : u, v = n.elementContext, l = v === void 0 ? ve : v, f = n.altBoundary, g = f === void 0 ? !1 : f, p = n.padding, b = p === void 0 ? 0 : p, h = xt(typeof b != "number" ? b : Et(b, be)), y = l === ve ? qt : ve, x = e.rects.popper, c = e.elements[g ? y : l], d = xn(ae(c) ? c : c.contextElement || z(e.elements.popper), s, i), m = se(e.elements.reference), w = kt({
    reference: m,
    element: x,
    strategy: "absolute",
    placement: o
  }), O = Fe(Object.assign({}, x, w)), S = l === ve ? O : m, k = {
    top: d.top - S.top + h.top,
    bottom: S.bottom - d.bottom + h.bottom,
    left: d.left - S.left + h.left,
    right: S.right - d.right + h.right
  }, A = e.modifiersData.offset;
  if (l === ve && A) {
    var T = A[o];
    Object.keys(k).forEach(function(E) {
      var C = [B, $].indexOf(E) >= 0 ? 1 : -1, L = [R, $].indexOf(E) >= 0 ? "y" : "x";
      k[E] += T[L] * C;
    });
  }
  return k;
}
function En(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, u = n.flipVariations, i = n.allowedAutoPlacements, v = i === void 0 ? yt : i, l = ue(r), f = l ? u ? nt : nt.filter(function(b) {
    return ue(b) === l;
  }) : be, g = f.filter(function(b) {
    return v.indexOf(b) >= 0;
  });
  g.length === 0 && (g = f, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var p = g.reduce(function(b, h) {
    return b[h] = ge(e, {
      placement: h,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[V(h)], b;
  }, {});
  return Object.keys(p).sort(function(b, h) {
    return p[b] - p[h];
  });
}
function Sn(e) {
  if (V(e) === Le)
    return [];
  var t = Re(e);
  return [at(e), t, at(t)];
}
function kn(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, u = s === void 0 ? !0 : s, i = n.fallbackPlacements, v = n.padding, l = n.boundary, f = n.rootBoundary, g = n.altBoundary, p = n.flipVariations, b = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, y = t.options.placement, x = V(y), c = x === y, d = i || (c || !b ? [Re(y)] : Sn(y)), m = [y].concat(d).reduce(function(ee, U) {
      return ee.concat(V(U) === Le ? En(t, {
        placement: U,
        boundary: l,
        rootBoundary: f,
        padding: v,
        flipVariations: b,
        allowedAutoPlacements: h
      }) : U);
    }, []), w = t.rects.reference, O = t.rects.popper, S = /* @__PURE__ */ new Map(), k = !0, A = m[0], T = 0; T < m.length; T++) {
      var E = m[T], C = V(E), L = ue(E) === oe, le = [R, $].indexOf(C) >= 0, ce = le ? "width" : "height", N = ge(t, {
        placement: E,
        boundary: l,
        rootBoundary: f,
        altBoundary: g,
        padding: v
      }), j = le ? L ? B : P : L ? $ : R;
      w[ce] > O[ce] && (j = Re(j));
      var we = Re(j), K = [];
      if (a && K.push(N[C] <= 0), u && K.push(N[j] <= 0, N[we] <= 0), K.every(function(ee) {
        return ee;
      })) {
        A = E, k = !1;
        break;
      }
      S.set(E, K);
    }
    if (k)
      for (var Oe = b ? 3 : 1, De = function(U) {
        var pe = m.find(function(Ee) {
          var Q = S.get(Ee);
          if (Q)
            return Q.slice(0, U).every(function(Ie) {
              return Ie;
            });
        });
        if (pe)
          return A = pe, "break";
      }, fe = Oe; fe > 0; fe--) {
        var xe = De(fe);
        if (xe === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const An = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: kn,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function st(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function ut(e) {
  return [R, B, $, P].some(function(t) {
    return e[t] >= 0;
  });
}
function Tn(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = ge(t, {
    elementContext: "reference"
  }), u = ge(t, {
    altBoundary: !0
  }), i = st(s, r), v = st(u, o, a), l = ut(i), f = ut(v);
  t.modifiersData[n] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: v,
    isReferenceHidden: l,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": f
  });
}
const Cn = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Tn
};
function Rn(e, t, n) {
  var r = V(e), o = [P, R].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = a[0], u = a[1];
  return s = s || 0, u = (u || 0) * o, [P, B].indexOf(r) >= 0 ? {
    x: u,
    y: s
  } : {
    x: s,
    y: u
  };
}
function Pn(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = yt.reduce(function(l, f) {
    return l[f] = Rn(f, t.rects, a), l;
  }, {}), u = s[t.placement], i = u.x, v = u.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += v), t.modifiersData[r] = s;
}
const Ln = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Pn
};
function Nn(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = kt({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Dn = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Nn,
  data: {}
};
function In(e) {
  return e === "x" ? "y" : "x";
}
function $n(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, u = s === void 0 ? !1 : s, i = n.boundary, v = n.rootBoundary, l = n.altBoundary, f = n.padding, g = n.tether, p = g === void 0 ? !0 : g, b = n.tetherOffset, h = b === void 0 ? 0 : b, y = ge(t, {
    boundary: i,
    rootBoundary: v,
    padding: f,
    altBoundary: l
  }), x = V(t.placement), c = ue(t.placement), d = !c, m = We(x), w = In(m), O = t.modifiersData.popperOffsets, S = t.rects.reference, k = t.rects.popper, A = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, T = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), E = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (!!O) {
    if (a) {
      var L, le = m === "y" ? R : P, ce = m === "y" ? $ : B, N = m === "y" ? "height" : "width", j = O[m], we = j + y[le], K = j - y[ce], Oe = p ? -k[N] / 2 : 0, De = c === oe ? S[N] : k[N], fe = c === oe ? -k[N] : -S[N], xe = t.elements.arrow, ee = p && xe ? Me(xe) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ot(), pe = U[le], Ee = U[ce], Q = de(0, S[N], ee[N]), Ie = d ? S[N] / 2 - Oe - Q - pe - T.mainAxis : De - Q - pe - T.mainAxis, Tt = d ? -S[N] / 2 + Oe + Q + Ee + T.mainAxis : fe + Q + Ee + T.mainAxis, $e = t.elements.arrow && ye(t.elements.arrow), Ct = $e ? m === "y" ? $e.clientTop || 0 : $e.clientLeft || 0 : 0, Ue = (L = E == null ? void 0 : E[m]) != null ? L : 0, Rt = j + Ie - Ue - Ct, Pt = j + Tt - Ue, Xe = de(p ? Pe(we, Rt) : we, j, p ? _(K, Pt) : K);
      O[m] = Xe, C[m] = Xe - j;
    }
    if (u) {
      var ze, Lt = m === "x" ? R : P, Nt = m === "x" ? $ : B, J = O[w], Se = w === "y" ? "height" : "width", Ke = J + y[Lt], Qe = J - y[Nt], Be = [R, P].indexOf(x) !== -1, Je = (ze = E == null ? void 0 : E[w]) != null ? ze : 0, Ze = Be ? Ke : J - S[Se] - k[Se] - Je + T.altAxis, _e = Be ? J + S[Se] + k[Se] - Je - T.altAxis : Qe, et = p && Be ? on(Ze, J, _e) : de(p ? Ze : Ke, J, p ? _e : Qe);
      O[w] = et, C[w] = et - J;
    }
    t.modifiersData[r] = C;
  }
}
const Bn = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: $n,
  requiresIfExists: ["offset"]
};
function jn(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Vn(e) {
  return e === H(e) || !D(e) ? qe(e) : jn(e);
}
function Fn(e) {
  var t = e.getBoundingClientRect(), n = ie(t.width) / e.offsetWidth || 1, r = ie(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Hn(e, t, n) {
  n === void 0 && (n = !1);
  var r = D(t), o = D(t) && Fn(t), a = z(t), s = se(e, o), u = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((W(t) !== "body" || Ye(a)) && (u = Vn(t)), D(t) ? (i = se(t, !0), i.x += t.clientLeft, i.y += t.clientTop) : a && (i.x = Ge(a))), {
    x: s.left + u.scrollLeft - i.x,
    y: s.top + u.scrollTop - i.y,
    width: s.width,
    height: s.height
  };
}
function Mn(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(u) {
      if (!n.has(u)) {
        var i = t.get(u);
        i && o(i);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function Wn(e) {
  var t = Mn(e);
  return Ve.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function qn(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function X(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return [].concat(n).reduce(function(o, a) {
    return o.replace(/%s/, a);
  }, e);
}
var Z = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Gn = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', lt = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Yn(e) {
  e.forEach(function(t) {
    [].concat(Object.keys(t), lt).filter(function(n, r, o) {
      return o.indexOf(n) === r;
    }).forEach(function(n) {
      switch (n) {
        case "name":
          typeof t.name != "string" && console.error(X(Z, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
          break;
        case "enabled":
          typeof t.enabled != "boolean" && console.error(X(Z, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
          break;
        case "phase":
          Ve.indexOf(t.phase) < 0 && console.error(X(Z, t.name, '"phase"', "either " + Ve.join(", "), '"' + String(t.phase) + '"'));
          break;
        case "fn":
          typeof t.fn != "function" && console.error(X(Z, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "effect":
          t.effect != null && typeof t.effect != "function" && console.error(X(Z, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
          break;
        case "requires":
          t.requires != null && !Array.isArray(t.requires) && console.error(X(Z, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(t.requiresIfExists) || console.error(X(Z, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + lt.map(function(r) {
            return '"' + r + '"';
          }).join(", ") + '; but "' + n + '" was provided.');
      }
      t.requires && t.requires.forEach(function(r) {
        e.find(function(o) {
          return o.name === r;
        }) == null && console.error(X(Gn, String(t.name), r, r));
      });
    });
  });
}
function Un(e, t) {
  var n = /* @__PURE__ */ new Set();
  return e.filter(function(r) {
    var o = t(r);
    if (!n.has(o))
      return n.add(o), !0;
  });
}
function Xn(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var ct = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", zn = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", ft = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function pt() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Kn(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? ft : o;
  return function(u, i, v) {
    v === void 0 && (v = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ft, a),
      modifiersData: {},
      elements: {
        reference: u,
        popper: i
      },
      attributes: {},
      styles: {}
    }, f = [], g = !1, p = {
      state: l,
      setOptions: function(x) {
        var c = typeof x == "function" ? x(l.options) : x;
        h(), l.options = Object.assign({}, a, l.options, c), l.scrollParents = {
          reference: ae(u) ? me(u) : u.contextElement ? me(u.contextElement) : [],
          popper: me(i)
        };
        var d = Wn(Xn([].concat(r, l.options.modifiers)));
        if (l.orderedModifiers = d.filter(function(E) {
          return E.enabled;
        }), process.env.NODE_ENV !== "production") {
          var m = Un([].concat(d, l.options.modifiers), function(E) {
            var C = E.name;
            return C;
          });
          if (Yn(m), V(l.options.placement) === Le) {
            var w = l.orderedModifiers.find(function(E) {
              var C = E.name;
              return C === "flip";
            });
            w || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var O = F(i), S = O.marginTop, k = O.marginRight, A = O.marginBottom, T = O.marginLeft;
          [S, k, A, T].some(function(E) {
            return parseFloat(E);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return b(), p.update();
      },
      forceUpdate: function() {
        if (!g) {
          var x = l.elements, c = x.reference, d = x.popper;
          if (!pt(c, d)) {
            process.env.NODE_ENV !== "production" && console.error(ct);
            return;
          }
          l.rects = {
            reference: Hn(c, ye(d), l.options.strategy === "fixed"),
            popper: Me(d)
          }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(E) {
            return l.modifiersData[E.name] = Object.assign({}, E.data);
          });
          for (var m = 0, w = 0; w < l.orderedModifiers.length; w++) {
            if (process.env.NODE_ENV !== "production" && (m += 1, m > 100)) {
              console.error(zn);
              break;
            }
            if (l.reset === !0) {
              l.reset = !1, w = -1;
              continue;
            }
            var O = l.orderedModifiers[w], S = O.fn, k = O.options, A = k === void 0 ? {} : k, T = O.name;
            typeof S == "function" && (l = S({
              state: l,
              options: A,
              name: T,
              instance: p
            }) || l);
          }
        }
      },
      update: qn(function() {
        return new Promise(function(y) {
          p.forceUpdate(), y(l);
        });
      }),
      destroy: function() {
        h(), g = !0;
      }
    };
    if (!pt(u, i))
      return process.env.NODE_ENV !== "production" && console.error(ct), p;
    p.setOptions(v).then(function(y) {
      !g && v.onFirstUpdate && v.onFirstUpdate(y);
    });
    function b() {
      l.orderedModifiers.forEach(function(y) {
        var x = y.name, c = y.options, d = c === void 0 ? {} : c, m = y.effect;
        if (typeof m == "function") {
          var w = m({
            state: l,
            name: x,
            instance: p,
            options: d
          }), O = function() {
          };
          f.push(w || O);
        }
      });
    }
    function h() {
      f.forEach(function(y) {
        return y();
      }), f = [];
    }
    return p;
  };
}
var Qn = [mn, Dn, vn, tn, Ln, An, Bn, ln, Cn], Jn = /* @__PURE__ */ Kn({
  defaultModifiers: Qn
}), Zn = function(t, n, r, o) {
  return t /= o / 2, t < 1 ? r / 2 * t * t + n : (t--, -r / 2 * (t * (t - 2) - 1) + n);
}, vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _n = function() {
  var t = void 0, n = void 0, r = void 0, o = void 0, a = void 0, s = void 0, u = void 0, i = void 0, v = void 0, l = void 0, f = void 0, g = void 0;
  function p() {
    return window.scrollY || window.pageYOffset;
  }
  function b(c) {
    return c.getBoundingClientRect().top + n;
  }
  function h(c) {
    v || (v = c), l = c - v, f = a(l, n, u, i), window.scrollTo(0, f), l < i ? window.requestAnimationFrame(h) : y();
  }
  function y() {
    window.scrollTo(0, n + u), t && s && (t.setAttribute("tabindex", "-1"), t.focus()), typeof g == "function" && g(), v = !1;
  }
  function x(c) {
    var d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    switch (i = d.duration || 1e3, o = d.offset || 0, g = d.callback, a = d.easing || Zn, s = d.a11y || !1, n = p(), typeof c > "u" ? "undefined" : vt(c)) {
      case "number":
        t = void 0, s = !1, r = n + c;
        break;
      case "object":
        t = c, r = b(t);
        break;
      case "string":
        t = document.querySelector(c), r = b(t);
        break;
    }
    switch (u = r - n + o, vt(d.duration)) {
      case "number":
        i = d.duration;
        break;
      case "function":
        i = d.duration(u);
        break;
    }
    window.requestAnimationFrame(h);
  }
  return x;
}, er = _n();
function tr(e, t) {
  for (; e.length < t; )
    e = "0" + e;
  return e;
}
function G(e, t) {
  var n, r, o;
  if (t.length === 0)
    return e;
  for (n = 0, o = t.length; n < o; n++)
    r = t.charCodeAt(n), e = (e << 5) - e + r, e |= 0;
  return e < 0 ? e * -2 : e;
}
function nr(e, t, n) {
  return Object.keys(t).sort().reduce(r, e);
  function r(o, a) {
    return At(o, t[a], a, n);
  }
}
function At(e, t, n, r) {
  var o = G(G(G(e, n), rr(t)), typeof t);
  if (t === null)
    return G(o, "null");
  if (t === void 0)
    return G(o, "undefined");
  if (typeof t == "object" || typeof t == "function") {
    if (r.indexOf(t) !== -1)
      return G(o, "[Circular]" + n);
    r.push(t);
    var a = nr(o, t, r);
    if (!("valueOf" in t) || typeof t.valueOf != "function")
      return a;
    try {
      return G(a, String(t.valueOf()));
    } catch (s) {
      return G(a, "[valueOf exception]" + (s.stack || s.message));
    }
  }
  return G(o, t.toString());
}
function rr(e) {
  return Object.prototype.toString.call(e);
}
function or(e) {
  return tr(At(0, e, "", []).toString(16), 8);
}
var ar = or;
const ir = ["id"], sr = {
  key: 0,
  class: "v-step__header"
}, ur = ["innerHTML"], lr = { class: "v-step__content" }, cr = ["innerHTML"], fr = { key: 1 }, pr = { class: "v-step__buttons" }, vr = { name: "v-step" }, dr = /* @__PURE__ */ mt({
  ...vr,
  props: {
    target: null,
    title: null,
    content: null,
    params: null,
    duration: null,
    offset: null,
    isFirst: { type: Boolean },
    isLast: { type: Boolean },
    buttons: null,
    displayMask: { type: Boolean },
    enableScrolling: { type: Boolean },
    highlight: { type: Boolean },
    stopOnFail: { type: Boolean },
    debug: { type: Boolean },
    prevCallback: null,
    nextCallback: null,
    skipCallback: null,
    targetNotFoundCallback: null
  },
  emits: ["stop", "skip", "finish", "prev", "next", "target-not-found"],
  setup(e, { emit: t }) {
    const n = ar(e.target), r = document.querySelector(e.target), o = ne(() => ({
      ...Ft,
      highlight: e.highlight,
      ...e.params
    })), a = ht(null), s = () => {
      e.debug && console.log("[Vue Tour] The target element " + e.target + ' of .v-step[id="' + n + '"] is:', r), r ? (u(), v(), Jn(
        r,
        a.value,
        o.value
      )) : (e.debug && console.error("[Vue Tour] The target element " + e.target + ' of .v-step[id="' + n + '"] does not exist!'), t("target-not-found", e.target), e.stopOnFail && t("stop"));
    }, u = () => {
      var f, g;
      if (e.enableScrolling && r)
        if (e.duration !== void 0 || e.offset !== void 0) {
          let p = {
            duration: (f = e.duration) != null ? f : 1e3,
            offset: (g = e.offset) != null ? g : 0,
            callback: void 0,
            a11y: !1
          };
          er(r, p);
        } else
          r == null || r.scrollIntoView({ behavior: "smooth" });
    }, i = () => (e.debug && console.log(`[Vue Tour] Highlight is ${o.value.highlight ? "enabled" : "disabled"} for .v-step[id="${n}"]`), o.value.highlight), v = () => {
      if (i() && r) {
        document.body.classList.add(q.CLASSES.ACTIVE);
        const f = window.getComputedStyle(r).getPropertyValue("transition");
        f !== "all 0s ease 0s" && (r.style.transition = `${f}, ${q.TRANSITION}`), r.classList.add(q.CLASSES.TARGET_HIGHLIGHTED), r.style.position || r.classList.add(q.CLASSES.TARGET_RELATIVE);
      } else
        document.body.classList.remove(q.CLASSES.ACTIVE);
    }, l = () => {
      if (i() && r) {
        const f = r.style.transition;
        r.classList.remove(q.CLASSES.TARGET_HIGHLIGHTED), r.classList.remove(q.CLASSES.TARGET_RELATIVE), f.includes(q.TRANSITION) && setTimeout(() => {
          r.style.transition = f.replace(`, ${q.TRANSITION}`, "");
        }, 0);
      }
    };
    return gt(s), jt(l), (f, g) => (M(), Y("div", {
      class: "v-step",
      id: "v-step-" + I(n),
      ref_key: "VStep",
      ref: a
    }, [
      Ce(f.$slots, "header", {}, () => [
        e.title ? (M(), Y("div", sr, [
          ke("div", { innerHTML: e.title }, null, 8, ur)
        ])) : re("", !0)
      ], !0),
      Ce(f.$slots, "content", {}, () => [
        ke("div", lr, [
          e.content ? (M(), Y("div", {
            key: 0,
            innerHTML: e.content
          }, null, 8, cr)) : (M(), Y("div", fr, "props is a demo step! The id of props step is " + te(I(n)) + " and it targets " + te(e.target) + ".", 1))
        ])
      ], !0),
      Ce(f.$slots, "actions", {}, () => {
        var p, b, h, y;
        return [
          ke("div", pr, [
            !e.isLast && ((p = e.buttons) == null ? void 0 : p.buttonSkip) ? (M(), Y("button", {
              key: 0,
              onClick: g[0] || (g[0] = Ae((x) => f.$emit("skip"), ["prevent"])),
              class: "v-step__button v-step__button-skip"
            }, te(e.buttons.buttonSkip), 1)) : re("", !0),
            !e.isFirst && ((b = e.buttons) == null ? void 0 : b.buttonPrevious) ? (M(), Y("button", {
              key: 1,
              onClick: g[1] || (g[1] = Ae((x) => f.$emit("prev"), ["prevent"])),
              class: "v-step__button v-step__button-previous"
            }, te(e.buttons.buttonPrevious), 1)) : re("", !0),
            !e.isLast && ((h = e.buttons) == null ? void 0 : h.buttonNext) ? (M(), Y("button", {
              key: 2,
              onClick: g[2] || (g[2] = Ae((x) => f.$emit("next"), ["prevent"])),
              class: "v-step__button v-step__button-next"
            }, te(e.buttons.buttonNext), 1)) : re("", !0),
            e.isLast && ((y = e.buttons) == null ? void 0 : y.buttonStop) ? (M(), Y("button", {
              key: 3,
              onClick: g[3] || (g[3] = Ae((x) => f.$emit("finish"), ["prevent"])),
              class: "v-step__button v-step__button-stop"
            }, te(e.buttons.buttonStop), 1)) : re("", !0)
          ])
        ];
      }, !0),
      ke("div", {
        class: Vt(["v-step__arrow", { "v-step__arrow--dark": !!e.title }])
      }, null, 2)
    ], 8, ir));
  }
});
const mr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, dt = /* @__PURE__ */ mr(dr, [["__scopeId", "data-v-1b4a714e"]]), gr = (e) => {
  const t = {};
  e.config.globalProperties.$tours = t, e.component(tt.name, tt), e.component(dt.name, dt);
};
export {
  gr as default
};
