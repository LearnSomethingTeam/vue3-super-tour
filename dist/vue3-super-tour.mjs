import { defineComponent as ht, ref as mt, computed as ne, onMounted as gt, getCurrentInstance as Dt, onBeforeUnmount as $t, resolveComponent as Bt, openBlock as M, createElementBlock as Y, renderSlot as Re, unref as $, createBlock as It, createCommentVNode as re, onUnmounted as jt, createElementVNode as Ae, toDisplayString as te, withModifiers as Te, normalizeClass as Vt } from "vue";
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
}, Ht = { class: "v-tour" }, Mt = { name: "v-tour" }, tt = /* @__PURE__ */ ht({
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
    start: null,
    finish: null,
    show: null,
    hide: null,
    prev: null,
    next: null,
    skip: null,
    stop: null,
    targetNotFound: null
  },
  emits: ["start", "stop", "show", "hide", "skip", "finish", "prev", "next", "target-not-found"],
  setup(e, { expose: t, emit: n }) {
    const r = mt(-1), o = ne(() => r.value > -1 && r.value < u.value), a = ne(() => r.value === 0), s = ne(() => r.value === e.steps.length - 1), u = ne(() => e.steps.length), i = ne(() => e.steps[r.value]);
    async function p(f) {
      return new Promise((c) => setTimeout(c, f));
    }
    async function l(f = 0) {
      var c;
      await p(e.startTimeout), r.value = f, await ((c = e.start) == null ? void 0 : c.call(e, f)), await d(f), n("start", f);
    }
    async function d(f) {
      var c, v, g;
      await ((v = (c = i.value).show) == null ? void 0 : v.call(c)), await ((g = e.show) == null ? void 0 : g.call(e, f)), n("show", f);
    }
    async function y(f) {
      var c, v, g;
      await ((v = (c = i.value).hide) == null ? void 0 : v.call(c)), await ((g = e.hide) == null ? void 0 : g.call(e, f)), n("hide", f);
    }
    async function h() {
      var c, v, g;
      let f = r.value - 1;
      f > -1 && (await ((v = (c = i.value).prev) == null ? void 0 : v.call(c)), await ((g = e.prev) == null ? void 0 : g.call(e, r.value)), await y(r.value), n("prev", r.value), r.value = f, await d(r.value));
    }
    async function w() {
      var c, v, g;
      let f = r.value + 1;
      f < u.value && r.value !== -1 && (await ((v = (c = i.value).next) == null ? void 0 : v.call(c)), await ((g = e.next) == null ? void 0 : g.call(e, r.value)), await y(r.value), n("next", r.value), r.value = f, await d(r.value));
    }
    async function m() {
      var f, c, v;
      await ((c = (f = i.value).stop) == null ? void 0 : c.call(f)), await y(r.value), await ((v = e.stop) == null ? void 0 : v.call(e, r.value)), n("stop", r.value), document.body.classList.remove("v-tour--active"), r.value = -1;
    }
    async function b() {
      var f, c, v;
      await ((c = (f = i.value).skip) == null ? void 0 : c.call(f)), await ((v = e.skip) == null ? void 0 : v.call(e, r.value)), n("skip", r.value), m();
    }
    async function E() {
      var f, c, v;
      await ((c = (f = i.value).finish) == null ? void 0 : c.call(f)), await ((v = e.finish) == null ? void 0 : v.call(e, r.value)), n("finish", r.value), m();
    }
    async function O(f) {
      var c, v, g;
      await ((v = (c = i.value).targetNotFound) == null ? void 0 : v.call(c, f)), await ((g = e.targetNotFound) == null ? void 0 : g.call(e, r.value, f)), n("target-not-found", r.value, f);
    }
    function x(f) {
      switch (e.debug && console.log("[Vue Tour] A keyup event occured:", f), f.keyCode) {
        case je.ARROW_RIGHT:
          e.keys.ARROW_RIGHT && w();
          break;
        case je.ARROW_LEFT:
          e.keys.ARROW_LEFT && h();
          break;
        case je.ESCAPE:
          e.keys.ESCAPE && m();
          break;
      }
    }
    return t({ start: l, stop: m, skip: b, finish: E, previousStep: h, nextStep: w, currentStep: r, isRunning: o, isFirst: a, isLast: s, numberOfSteps: u, step: i }), gt(() => {
      const f = { step: i, start: l, isRunning: o, currentStep: r, isFirst: a, isLast: s, previousStep: h, nextStep: w, stop: m, skip: b, finish: E }, c = Dt();
      c.appContext.config.globalProperties.$tours[e.name] = f, e.useKeyboardNavigation && window.addEventListener("keyup", x);
    }), $t(() => {
      e.useKeyboardNavigation && window.removeEventListener("keyup", x);
    }), (f, c) => {
      const v = Bt("v-step");
      return M(), Y("div", Ht, [
        Re(f.$slots, "default", {
          currentStep: r.value,
          steps: e.steps,
          onPreviousStep: h,
          onNextStep: w,
          onStop: m,
          onSkip: b,
          onFinish: E,
          isFirst: $(a),
          isLast: $(s),
          buttons: e.buttons,
          highlight: e.highlight,
          debug: e.debug
        }, () => [
          e.steps[r.value] ? (M(), It(v, {
            key: r.value,
            target: $(i).target,
            title: $(i).title,
            content: $(i).content,
            params: $(i).params,
            duration: $(i).duration,
            offset: $(i).offset,
            "is-first": $(a),
            "is-last": $(s),
            buttons: e.buttons,
            highlight: e.highlight,
            "stop-on-fail": e.stopOnTargetNotFound,
            debug: e.debug,
            onPrev: h,
            onNext: w,
            onStop: m,
            onSkip: b,
            onFinish: E,
            onTargetNotFound: O
          }, null, 8, ["target", "title", "content", "params", "duration", "offset", "is-first", "is-last", "buttons", "highlight", "stop-on-fail", "debug"])) : re("", !0)
        ])
      ]);
    };
  }
});
var P = "top", B = "bottom", I = "right", L = "left", Ne = "auto", ye = [P, B, I, L], oe = "start", me = "end", Wt = "clippingParents", yt = "viewport", pe = "popper", qt = "reference", nt = /* @__PURE__ */ ye.reduce(function(e, t) {
  return e.concat([t + "-" + oe, t + "-" + me]);
}, []), bt = /* @__PURE__ */ [].concat(ye, [Ne]).reduce(function(e, t) {
  return e.concat([t, t + "-" + oe, t + "-" + me]);
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
      var o = t.elements[r], a = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), u = s.reduce(function(i, p) {
        return i[p] = "", i;
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
var _ = Math.max, Le = Math.min, ie = Math.round;
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
function Ce(e) {
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
  var o = Ce(e);
  for (He(o) && (o = o.host); D(o) && ["html", "body"].indexOf(W(o)) < 0; ) {
    var a = F(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function be(e) {
  for (var t = H(e), n = rt(e); n && nn(n) && F(n).position === "static"; )
    n = rt(n);
  return n && (W(n) === "html" || W(n) === "body" && F(n).position === "static") ? t : n || rn(e) || t;
}
function We(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function de(e, t, n) {
  return _(e, Le(t, n));
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
  })) : t, xt(typeof t != "number" ? t : Et(t, ye));
};
function sn(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, u = V(n.placement), i = We(u), p = [L, I].indexOf(u) >= 0, l = p ? "height" : "width";
  if (!(!a || !s)) {
    var d = an(o.padding, n), y = Me(a), h = i === "y" ? P : L, w = i === "y" ? B : I, m = n.rects.reference[l] + n.rects.reference[i] - s[i] - n.rects.popper[l], b = s[i] - n.rects.reference[i], E = be(a), O = E ? i === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, x = m / 2 - b / 2, f = d[h], c = O - y[l] - d[w], v = O / 2 - y[l] / 2 + x, g = de(f, v, c), A = i;
    n.modifiersData[r] = (t = {}, t[A] = g, t.centerOffset = g - v, t);
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
var fn = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function cn(e) {
  var t = e.x, n = e.y, r = window, o = r.devicePixelRatio || 1;
  return {
    x: ie(t * o) / o || 0,
    y: ie(n * o) / o || 0
  };
}
function ot(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, u = e.position, i = e.gpuAcceleration, p = e.adaptive, l = e.roundOffsets, d = e.isFixed, y = s.x, h = y === void 0 ? 0 : y, w = s.y, m = w === void 0 ? 0 : w, b = typeof l == "function" ? l({
    x: h,
    y: m
  }) : {
    x: h,
    y: m
  };
  h = b.x, m = b.y;
  var E = s.hasOwnProperty("x"), O = s.hasOwnProperty("y"), x = L, f = P, c = window;
  if (p) {
    var v = be(n), g = "clientHeight", A = "clientWidth";
    if (v === H(n) && (v = z(n), F(v).position !== "static" && u === "absolute" && (g = "scrollHeight", A = "scrollWidth")), v = v, o === P || (o === L || o === I) && a === me) {
      f = B;
      var T = d && v === c && c.visualViewport ? c.visualViewport.height : v[g];
      m -= T - r.height, m *= i ? 1 : -1;
    }
    if (o === L || (o === P || o === B) && a === me) {
      x = I;
      var k = d && v === c && c.visualViewport ? c.visualViewport.width : v[A];
      h -= k - r.width, h *= i ? 1 : -1;
    }
  }
  var S = Object.assign({
    position: u
  }, p && fn), R = l === !0 ? cn({
    x: h,
    y: m
  }) : {
    x: h,
    y: m
  };
  if (h = R.x, m = R.y, i) {
    var N;
    return Object.assign({}, S, (N = {}, N[f] = O ? "0" : "", N[x] = E ? "0" : "", N.transform = (c.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + m + "px)" : "translate3d(" + h + "px, " + m + "px, 0)", N));
  }
  return Object.assign({}, S, (t = {}, t[f] = O ? m + "px" : "", t[x] = E ? h + "px" : "", t.transform = "", t));
}
function vn(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, u = n.roundOffsets, i = u === void 0 ? !0 : u;
  if (process.env.NODE_ENV !== "production") {
    var p = F(t.elements.popper).transitionProperty || "";
    s && ["transform", "top", "right", "bottom", "left"].some(function(d) {
      return p.indexOf(d) >= 0;
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
const pn = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: vn,
  data: {}
};
var ke = {
  passive: !0
};
function dn(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, u = s === void 0 ? !0 : s, i = H(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(l) {
    l.addEventListener("scroll", n.update, ke);
  }), u && i.addEventListener("resize", n.update, ke), function() {
    a && p.forEach(function(l) {
      l.removeEventListener("scroll", n.update, ke);
    }), u && i.removeEventListener("resize", n.update, ke);
  };
}
const hn = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: dn,
  data: {}
};
var mn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Pe(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return mn[t];
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
function yn(e) {
  var t = H(e), n = z(e), r = t.visualViewport, o = n.clientWidth, a = n.clientHeight, s = 0, u = 0;
  return r && (o = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = r.offsetLeft, u = r.offsetTop)), {
    width: o,
    height: a,
    x: s + Ge(e),
    y: u
  };
}
function bn(e) {
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
  return ["html", "body", "#document"].indexOf(W(e)) >= 0 ? e.ownerDocument.body : D(e) && Ye(e) ? e : St(Ce(e));
}
function he(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = St(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = H(r), s = o ? [a].concat(a.visualViewport || [], Ye(r) ? r : []) : r, u = t.concat(s);
  return o ? u : u.concat(he(Ce(s)));
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
  return t === yt ? Fe(yn(e)) : ae(t) ? wn(t) : Fe(bn(z(e)));
}
function On(e) {
  var t = he(Ce(e)), n = ["absolute", "fixed"].indexOf(F(e).position) >= 0, r = n && D(e) ? be(e) : e;
  return ae(r) ? t.filter(function(o) {
    return ae(o) && wt(o, r) && W(o) !== "body";
  }) : [];
}
function xn(e, t, n) {
  var r = t === "clippingParents" ? On(e) : [].concat(t), o = [].concat(r, [n]), a = o[0], s = o.reduce(function(u, i) {
    var p = it(e, i);
    return u.top = _(p.top, u.top), u.right = Le(p.right, u.right), u.bottom = Le(p.bottom, u.bottom), u.left = _(p.left, u.left), u;
  }, it(e, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function At(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? V(r) : null, a = r ? ue(r) : null, s = t.x + t.width / 2 - n.width / 2, u = t.y + t.height / 2 - n.height / 2, i;
  switch (o) {
    case P:
      i = {
        x: s,
        y: t.y - n.height
      };
      break;
    case B:
      i = {
        x: s,
        y: t.y + t.height
      };
      break;
    case I:
      i = {
        x: t.x + t.width,
        y: u
      };
      break;
    case L:
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
  var p = o ? We(o) : null;
  if (p != null) {
    var l = p === "y" ? "height" : "width";
    switch (a) {
      case oe:
        i[p] = i[p] - (t[l] / 2 - n[l] / 2);
        break;
      case me:
        i[p] = i[p] + (t[l] / 2 - n[l] / 2);
        break;
    }
  }
  return i;
}
function ge(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.boundary, s = a === void 0 ? Wt : a, u = n.rootBoundary, i = u === void 0 ? yt : u, p = n.elementContext, l = p === void 0 ? pe : p, d = n.altBoundary, y = d === void 0 ? !1 : d, h = n.padding, w = h === void 0 ? 0 : h, m = xt(typeof w != "number" ? w : Et(w, ye)), b = l === pe ? qt : pe, E = e.rects.popper, O = e.elements[y ? b : l], x = xn(ae(O) ? O : O.contextElement || z(e.elements.popper), s, i), f = se(e.elements.reference), c = At({
    reference: f,
    element: E,
    strategy: "absolute",
    placement: o
  }), v = Fe(Object.assign({}, E, c)), g = l === pe ? v : f, A = {
    top: x.top - g.top + m.top,
    bottom: g.bottom - x.bottom + m.bottom,
    left: x.left - g.left + m.left,
    right: g.right - x.right + m.right
  }, T = e.modifiersData.offset;
  if (l === pe && T) {
    var k = T[o];
    Object.keys(A).forEach(function(S) {
      var R = [I, B].indexOf(S) >= 0 ? 1 : -1, N = [P, B].indexOf(S) >= 0 ? "y" : "x";
      A[S] += k[N] * R;
    });
  }
  return A;
}
function En(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, u = n.flipVariations, i = n.allowedAutoPlacements, p = i === void 0 ? bt : i, l = ue(r), d = l ? u ? nt : nt.filter(function(w) {
    return ue(w) === l;
  }) : ye, y = d.filter(function(w) {
    return p.indexOf(w) >= 0;
  });
  y.length === 0 && (y = d, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var h = y.reduce(function(w, m) {
    return w[m] = ge(e, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[V(m)], w;
  }, {});
  return Object.keys(h).sort(function(w, m) {
    return h[w] - h[m];
  });
}
function Sn(e) {
  if (V(e) === Ne)
    return [];
  var t = Pe(e);
  return [at(e), t, at(t)];
}
function An(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, u = s === void 0 ? !0 : s, i = n.fallbackPlacements, p = n.padding, l = n.boundary, d = n.rootBoundary, y = n.altBoundary, h = n.flipVariations, w = h === void 0 ? !0 : h, m = n.allowedAutoPlacements, b = t.options.placement, E = V(b), O = E === b, x = i || (O || !w ? [Pe(b)] : Sn(b)), f = [b].concat(x).reduce(function(ee, U) {
      return ee.concat(V(U) === Ne ? En(t, {
        placement: U,
        boundary: l,
        rootBoundary: d,
        padding: p,
        flipVariations: w,
        allowedAutoPlacements: m
      }) : U);
    }, []), c = t.rects.reference, v = t.rects.popper, g = /* @__PURE__ */ new Map(), A = !0, T = f[0], k = 0; k < f.length; k++) {
      var S = f[k], R = V(S), N = ue(S) === oe, le = [P, B].indexOf(R) >= 0, fe = le ? "width" : "height", C = ge(t, {
        placement: S,
        boundary: l,
        rootBoundary: d,
        altBoundary: y,
        padding: p
      }), j = le ? N ? I : L : N ? B : P;
      c[fe] > v[fe] && (j = Pe(j));
      var we = Pe(j), K = [];
      if (a && K.push(C[R] <= 0), u && K.push(C[j] <= 0, C[we] <= 0), K.every(function(ee) {
        return ee;
      })) {
        T = S, A = !1;
        break;
      }
      g.set(S, K);
    }
    if (A)
      for (var Oe = w ? 3 : 1, De = function(U) {
        var ve = f.find(function(Ee) {
          var Q = g.get(Ee);
          if (Q)
            return Q.slice(0, U).every(function($e) {
              return $e;
            });
        });
        if (ve)
          return T = ve, "break";
      }, ce = Oe; ce > 0; ce--) {
        var xe = De(ce);
        if (xe === "break")
          break;
      }
    t.placement !== T && (t.modifiersData[r]._skip = !0, t.placement = T, t.reset = !0);
  }
}
const Tn = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: An,
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
  return [P, I, B, L].some(function(t) {
    return e[t] >= 0;
  });
}
function kn(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = ge(t, {
    elementContext: "reference"
  }), u = ge(t, {
    altBoundary: !0
  }), i = st(s, r), p = st(u, o, a), l = ut(i), d = ut(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: p,
    isReferenceHidden: l,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": l,
    "data-popper-escaped": d
  });
}
const Rn = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: kn
};
function Pn(e, t, n) {
  var r = V(e), o = [L, P].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = a[0], u = a[1];
  return s = s || 0, u = (u || 0) * o, [L, I].indexOf(r) >= 0 ? {
    x: u,
    y: s
  } : {
    x: s,
    y: u
  };
}
function Ln(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = bt.reduce(function(l, d) {
    return l[d] = Pn(d, t.rects, a), l;
  }, {}), u = s[t.placement], i = u.x, p = u.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = s;
}
const Nn = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ln
};
function Cn(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = At({
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
  fn: Cn,
  data: {}
};
function $n(e) {
  return e === "x" ? "y" : "x";
}
function Bn(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, u = s === void 0 ? !1 : s, i = n.boundary, p = n.rootBoundary, l = n.altBoundary, d = n.padding, y = n.tether, h = y === void 0 ? !0 : y, w = n.tetherOffset, m = w === void 0 ? 0 : w, b = ge(t, {
    boundary: i,
    rootBoundary: p,
    padding: d,
    altBoundary: l
  }), E = V(t.placement), O = ue(t.placement), x = !O, f = We(E), c = $n(f), v = t.modifiersData.popperOffsets, g = t.rects.reference, A = t.rects.popper, T = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, k = typeof T == "number" ? {
    mainAxis: T,
    altAxis: T
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, T), S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (!!v) {
    if (a) {
      var N, le = f === "y" ? P : L, fe = f === "y" ? B : I, C = f === "y" ? "height" : "width", j = v[f], we = j + b[le], K = j - b[fe], Oe = h ? -A[C] / 2 : 0, De = O === oe ? g[C] : A[C], ce = O === oe ? -A[C] : -g[C], xe = t.elements.arrow, ee = h && xe ? Me(xe) : {
        width: 0,
        height: 0
      }, U = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ot(), ve = U[le], Ee = U[fe], Q = de(0, g[C], ee[C]), $e = x ? g[C] / 2 - Oe - Q - ve - k.mainAxis : De - Q - ve - k.mainAxis, kt = x ? -g[C] / 2 + Oe + Q + Ee + k.mainAxis : ce + Q + Ee + k.mainAxis, Be = t.elements.arrow && be(t.elements.arrow), Rt = Be ? f === "y" ? Be.clientTop || 0 : Be.clientLeft || 0 : 0, Ue = (N = S == null ? void 0 : S[f]) != null ? N : 0, Pt = j + $e - Ue - Rt, Lt = j + kt - Ue, Xe = de(h ? Le(we, Pt) : we, j, h ? _(K, Lt) : K);
      v[f] = Xe, R[f] = Xe - j;
    }
    if (u) {
      var ze, Nt = f === "x" ? P : L, Ct = f === "x" ? B : I, J = v[c], Se = c === "y" ? "height" : "width", Ke = J + b[Nt], Qe = J - b[Ct], Ie = [P, L].indexOf(E) !== -1, Je = (ze = S == null ? void 0 : S[c]) != null ? ze : 0, Ze = Ie ? Ke : J - g[Se] - A[Se] - Je + k.altAxis, _e = Ie ? J + g[Se] + A[Se] - Je - k.altAxis : Qe, et = h && Ie ? on(Ze, J, _e) : de(h ? Ze : Ke, J, h ? _e : Qe);
      v[c] = et, R[c] = et - J;
    }
    t.modifiersData[r] = R;
  }
}
const In = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Bn,
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
var ft = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", zn = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", ct = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function vt() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Kn(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? ct : o;
  return function(u, i, p) {
    p === void 0 && (p = a);
    var l = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ct, a),
      modifiersData: {},
      elements: {
        reference: u,
        popper: i
      },
      attributes: {},
      styles: {}
    }, d = [], y = !1, h = {
      state: l,
      setOptions: function(E) {
        var O = typeof E == "function" ? E(l.options) : E;
        m(), l.options = Object.assign({}, a, l.options, O), l.scrollParents = {
          reference: ae(u) ? he(u) : u.contextElement ? he(u.contextElement) : [],
          popper: he(i)
        };
        var x = Wn(Xn([].concat(r, l.options.modifiers)));
        if (l.orderedModifiers = x.filter(function(S) {
          return S.enabled;
        }), process.env.NODE_ENV !== "production") {
          var f = Un([].concat(x, l.options.modifiers), function(S) {
            var R = S.name;
            return R;
          });
          if (Yn(f), V(l.options.placement) === Ne) {
            var c = l.orderedModifiers.find(function(S) {
              var R = S.name;
              return R === "flip";
            });
            c || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var v = F(i), g = v.marginTop, A = v.marginRight, T = v.marginBottom, k = v.marginLeft;
          [g, A, T, k].some(function(S) {
            return parseFloat(S);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return w(), h.update();
      },
      forceUpdate: function() {
        if (!y) {
          var E = l.elements, O = E.reference, x = E.popper;
          if (!vt(O, x)) {
            process.env.NODE_ENV !== "production" && console.error(ft);
            return;
          }
          l.rects = {
            reference: Hn(O, be(x), l.options.strategy === "fixed"),
            popper: Me(x)
          }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach(function(S) {
            return l.modifiersData[S.name] = Object.assign({}, S.data);
          });
          for (var f = 0, c = 0; c < l.orderedModifiers.length; c++) {
            if (process.env.NODE_ENV !== "production" && (f += 1, f > 100)) {
              console.error(zn);
              break;
            }
            if (l.reset === !0) {
              l.reset = !1, c = -1;
              continue;
            }
            var v = l.orderedModifiers[c], g = v.fn, A = v.options, T = A === void 0 ? {} : A, k = v.name;
            typeof g == "function" && (l = g({
              state: l,
              options: T,
              name: k,
              instance: h
            }) || l);
          }
        }
      },
      update: qn(function() {
        return new Promise(function(b) {
          h.forceUpdate(), b(l);
        });
      }),
      destroy: function() {
        m(), y = !0;
      }
    };
    if (!vt(u, i))
      return process.env.NODE_ENV !== "production" && console.error(ft), h;
    h.setOptions(p).then(function(b) {
      !y && p.onFirstUpdate && p.onFirstUpdate(b);
    });
    function w() {
      l.orderedModifiers.forEach(function(b) {
        var E = b.name, O = b.options, x = O === void 0 ? {} : O, f = b.effect;
        if (typeof f == "function") {
          var c = f({
            state: l,
            name: E,
            instance: h,
            options: x
          }), v = function() {
          };
          d.push(c || v);
        }
      });
    }
    function m() {
      d.forEach(function(b) {
        return b();
      }), d = [];
    }
    return h;
  };
}
var Qn = [hn, Dn, pn, tn, Nn, Tn, In, ln, Rn], Jn = /* @__PURE__ */ Kn({
  defaultModifiers: Qn
}), Zn = function(t, n, r, o) {
  return t /= o / 2, t < 1 ? r / 2 * t * t + n : (t--, -r / 2 * (t * (t - 2) - 1) + n);
}, pt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
  return typeof e;
} : function(e) {
  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, _n = function() {
  var t = void 0, n = void 0, r = void 0, o = void 0, a = void 0, s = void 0, u = void 0, i = void 0, p = void 0, l = void 0, d = void 0, y = void 0;
  function h() {
    return window.scrollY || window.pageYOffset;
  }
  function w(O) {
    return O.getBoundingClientRect().top + n;
  }
  function m(O) {
    p || (p = O), l = O - p, d = a(l, n, u, i), window.scrollTo(0, d), l < i ? window.requestAnimationFrame(m) : b();
  }
  function b() {
    window.scrollTo(0, n + u), t && s && (t.setAttribute("tabindex", "-1"), t.focus()), typeof y == "function" && y(), p = !1;
  }
  function E(O) {
    var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    switch (i = x.duration || 1e3, o = x.offset || 0, y = x.callback, a = x.easing || Zn, s = x.a11y || !1, n = h(), typeof O > "u" ? "undefined" : pt(O)) {
      case "number":
        t = void 0, s = !1, r = n + O;
        break;
      case "object":
        t = O, r = w(t);
        break;
      case "string":
        t = document.querySelector(O), r = w(t);
        break;
    }
    switch (u = r - n + o, pt(x.duration)) {
      case "number":
        i = x.duration;
        break;
      case "function":
        i = x.duration(u);
        break;
    }
    window.requestAnimationFrame(m);
  }
  return E;
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
    return Tt(o, t[a], a, n);
  }
}
function Tt(e, t, n, r) {
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
  return tr(Tt(0, e, "", []).toString(16), 8);
}
var ar = or;
const ir = ["id"], sr = {
  key: 0,
  class: "v-step__header"
}, ur = ["innerHTML"], lr = { class: "v-step__content" }, fr = ["innerHTML"], cr = { key: 1 }, vr = { class: "v-step__buttons" }, pr = { name: "v-step" }, dt = /* @__PURE__ */ ht({
  ...pr,
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
    finish: null,
    show: null,
    hide: null,
    prev: null,
    next: null,
    skip: null,
    stop: null,
    targetNotFound: null
  },
  emits: ["finish", "show", "hide", "prev", "next", "skip", "stop", "target-not-found"],
  setup(e, { emit: t }) {
    const n = ar(e.target), r = document.querySelector(e.target), o = ne(() => ({
      ...Ft,
      highlight: e.highlight,
      ...e.params
    })), a = mt(null), s = () => {
      e.debug && console.log("[Vue Tour] The target element " + e.target + ' of .v-step[id="' + n + '"] is:', r), r ? (u(), p(), Jn(
        r,
        a.value,
        o.value
      )) : (e.debug && console.error("[Vue Tour] The target element " + e.target + ' of .v-step[id="' + n + '"] does not exist!'), t("target-not-found", e.target), e.stopOnFail && t("stop"));
    }, u = () => {
      var d, y;
      if (e.enableScrolling && r)
        if (e.duration !== void 0 || e.offset !== void 0) {
          let h = {
            duration: (d = e.duration) != null ? d : 1e3,
            offset: (y = e.offset) != null ? y : 0,
            callback: void 0,
            a11y: !1
          };
          er(r, h);
        } else
          r == null || r.scrollIntoView({ behavior: "smooth" });
    }, i = () => (e.debug && console.log(`[Vue Tour] Highlight is ${o.value.highlight ? "enabled" : "disabled"} for .v-step[id="${n}"]`), o.value.highlight), p = () => {
      if (i() && r) {
        document.body.classList.add(q.CLASSES.ACTIVE);
        const d = window.getComputedStyle(r).getPropertyValue("transition");
        d !== "all 0s ease 0s" && (r.style.transition = `${d}, ${q.TRANSITION}`), r.classList.add(q.CLASSES.TARGET_HIGHLIGHTED), r.style.position || r.classList.add(q.CLASSES.TARGET_RELATIVE);
      } else
        document.body.classList.remove(q.CLASSES.ACTIVE);
    }, l = () => {
      if (i() && r) {
        const d = r.style.transition;
        r.classList.remove(q.CLASSES.TARGET_HIGHLIGHTED), r.classList.remove(q.CLASSES.TARGET_RELATIVE), d.includes(q.TRANSITION) && setTimeout(() => {
          r.style.transition = d.replace(`, ${q.TRANSITION}`, "");
        }, 0);
      }
    };
    return gt(() => {
      t("show"), s();
    }), jt(() => {
      l(), t("hide");
    }), (d, y) => (M(), Y("div", {
      class: "v-step",
      id: "v-step-" + $(n),
      ref_key: "VStep",
      ref: a
    }, [
      Re(d.$slots, "header", {}, () => [
        e.title ? (M(), Y("div", sr, [
          Ae("div", { innerHTML: e.title }, null, 8, ur)
        ])) : re("", !0)
      ]),
      Re(d.$slots, "content", {}, () => [
        Ae("div", lr, [
          e.content ? (M(), Y("div", {
            key: 0,
            innerHTML: e.content
          }, null, 8, fr)) : (M(), Y("div", cr, "props is a demo step! The id of props step is " + te($(n)) + " and it targets " + te(e.target) + ".", 1))
        ])
      ]),
      Re(d.$slots, "actions", {}, () => {
        var h, w, m, b;
        return [
          Ae("div", vr, [
            !e.isLast && ((h = e.buttons) == null ? void 0 : h.buttonSkip) ? (M(), Y("button", {
              key: 0,
              onClick: y[0] || (y[0] = Te((E) => d.$emit("skip"), ["prevent"])),
              class: "v-step__button v-step__button-skip"
            }, te(e.buttons.buttonSkip), 1)) : re("", !0),
            !e.isFirst && ((w = e.buttons) == null ? void 0 : w.buttonPrevious) ? (M(), Y("button", {
              key: 1,
              onClick: y[1] || (y[1] = Te((E) => d.$emit("prev"), ["prevent"])),
              class: "v-step__button v-step__button-previous"
            }, te(e.buttons.buttonPrevious), 1)) : re("", !0),
            !e.isLast && ((m = e.buttons) == null ? void 0 : m.buttonNext) ? (M(), Y("button", {
              key: 2,
              onClick: y[2] || (y[2] = Te((E) => d.$emit("next"), ["prevent"])),
              class: "v-step__button v-step__button-next"
            }, te(e.buttons.buttonNext), 1)) : re("", !0),
            e.isLast && ((b = e.buttons) == null ? void 0 : b.buttonStop) ? (M(), Y("button", {
              key: 3,
              onClick: y[3] || (y[3] = Te((E) => d.$emit("finish"), ["prevent"])),
              class: "v-step__button v-step__button-stop"
            }, te(e.buttons.buttonStop), 1)) : re("", !0)
          ])
        ];
      }),
      Ae("div", {
        class: Vt(["v-step__arrow", { "v-step__arrow--dark": !!e.title }])
      }, null, 2)
    ], 8, ir));
  }
});
const hr = (e) => {
  const t = {};
  e.config.globalProperties.$tours = t, e.component(tt.name, tt), e.component(dt.name, dt);
};
export {
  hr as default
};
