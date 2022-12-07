(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map5 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map5($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map5 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply1(map5(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure12 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply3(pure12(f))(a);
      };
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind13 = bind(dictBind);
    return function(m) {
      return bind13(m)(identity3);
    };
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value2) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value2);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value2) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value2;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons(head, tail) {
      this.head = head;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head) {
      return function(tail) {
        return new Cons(head, tail);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  };
  var _updateAt = function(just) {
    return function(nothing) {
      return function(i) {
        return function(a) {
          return function(l) {
            if (i < 0 || i >= l.length)
              return nothing;
            var l1 = l.slice();
            l1[i] = a;
            return just(l1);
          };
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupUnit = {
    append: function(v) {
      return function(v1) {
        return unit;
      };
    }
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind3 = bind(dictMonad.Bind1());
    var pure3 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind3(f)(function(f$prime) {
          return bind3(a)(function(a$prime) {
            return pure3(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var max = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare3(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
  };

  // output/Data.Monoid/index.js
  var monoidUnit = {
    mempty: unit,
    Semigroup0: function() {
      return semigroupUnit;
    }
  };
  var monoidArray = {
    mempty: [],
    Semigroup0: function() {
      return semigroupArray;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  var foreachE = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name3, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);
  var lift22 = /* @__PURE__ */ lift2(applyEffect);
  var semigroupEffect = function(dictSemigroup) {
    return {
      append: lift22(append(dictSemigroup))
    };
  };
  var monoidEffect = function(dictMonoid) {
    var semigroupEffect1 = semigroupEffect(dictMonoid.Semigroup0());
    return {
      mempty: pureE(mempty(dictMonoid)),
      Semigroup0: function() {
        return semigroupEffect1;
      }
    };
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref) {
      return function() {
        ref.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name3, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var fst = function(v) {
    return v.value0;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map5) {
        return function(pure3) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure3([]);
                  case 1:
                    return map5(array1)(f(array[bot]));
                  case 2:
                    return apply3(map5(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map5(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply3(map5(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Array/index.js
  var updateAt = /* @__PURE__ */ function() {
    return _updateAt(Just.create)(Nothing.value);
  }();
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var modifyAt = function(i) {
    return function(f) {
      return function(xs) {
        var go = function(x) {
          return updateAt(i)(f(x))(xs);
        };
        return maybe(Nothing.value)(go)(index(xs)(i));
      };
    };
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Specular.Internal.Effect/foreign.js
  function emptyDelayed() {
    return [];
  }
  function pushDelayed(effs) {
    return function(eff) {
      return function() {
        effs.push(eff);
      };
    };
  }
  function unsafeFreezeDelayed(x) {
    return function() {
      return x;
    };
  }
  function sequenceEffects(effects) {
    return function sequenceEffects_eff() {
      for (var i = 0; i < effects.length; i++) {
        effects[i]();
      }
    };
  }

  // output/Control.Monad.Cleanup/index.js
  var onCleanup = function(dict) {
    return dict.onCleanup;
  };

  // output/Control.Monad.Replace/index.js
  var Slot = /* @__PURE__ */ function() {
    function Slot2(value0, value1, value2) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
    }
    ;
    Slot2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return new Slot2(value0, value1, value2);
        };
      };
    };
    return Slot2;
  }();
  var replaceSlot = function(v) {
    return v.value0;
  };
  var newSlot = function(dict) {
    return dict.newSlot;
  };
  var destroySlot = function(v) {
    return v.value1;
  };

  // output/Foreign.Object/foreign.js
  function runST(f) {
    return f();
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindST);
  var singleton2 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };

  // output/Specular.Dom.Browser/foreign.js
  function createTextNodeImpl(text3) {
    return function() {
      return document.createTextNode(text3);
    };
  }
  function setTextImpl(node) {
    return function(text3) {
      return function() {
        node.textContent = text3;
      };
    };
  }
  function createDocumentFragmentImpl() {
    return document.createDocumentFragment();
  }
  function createElementImpl(tag) {
    return function() {
      return document.createElement(tag);
    };
  }
  function createElementNSImpl(namespace) {
    return function(tag) {
      return function() {
        return document.createElementNS(namespace, tag);
      };
    };
  }
  function _setAttributes(node, attrs2) {
    for (var k in attrs2) {
      if (attrs2.hasOwnProperty(k)) {
        node.setAttribute(k, attrs2[k]);
      }
    }
  }
  function parentNodeImpl(Just2) {
    return function(Nothing2) {
      return function(node) {
        return function() {
          var parent = node.parentNode;
          if (parent !== null) {
            return Just2(parent);
          } else {
            return Nothing2;
          }
        };
      };
    };
  }
  function insertBeforeImpl(newNode) {
    return function(nodeAfter) {
      return function(parent) {
        return function() {
          parent.insertBefore(newNode, nodeAfter);
        };
      };
    };
  }
  function appendChildImpl(newNode) {
    return function(parent) {
      return function() {
        parent.appendChild(newNode);
      };
    };
  }
  function removeAllBetweenImpl(from2) {
    return function(to) {
      return function() {
        if (!from2.parentNode) {
          return;
        }
        var node = from2.nextSibling;
        while (node && node !== to) {
          var next = node.nextSibling;
          node.parentNode.removeChild(node);
          node = next;
        }
      };
    };
  }
  function addEventListenerImpl(eventType) {
    return function(handler) {
      return function(node) {
        return function() {
          var listener = function(event) {
            handler(event)();
          };
          node.addEventListener(eventType, listener);
          return function() {
            node.removeEventListener(eventType, listener);
          };
        };
      };
    };
  }
  function removeNode(node) {
    return function() {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    };
  }

  // output/Specular.Dom.Browser/index.js
  var setText = setTextImpl;
  var setAttributes = function(node) {
    return function(attrs2) {
      return function() {
        return _setAttributes(node, attrs2);
      };
    };
  };
  var removeAllBetween = removeAllBetweenImpl;
  var parentNode = /* @__PURE__ */ function() {
    return parentNodeImpl(Just.create)(Nothing.value);
  }();
  var insertBefore = insertBeforeImpl;
  var createTextNode = createTextNodeImpl;
  var createElementNS = function(v) {
    if (v instanceof Just) {
      return createElementNSImpl(v.value0);
    }
    ;
    if (v instanceof Nothing) {
      return createElementImpl;
    }
    ;
    throw new Error("Failed pattern match at Specular.Dom.Browser (line 44, column 1 - line 44, column 61): " + [v.constructor.name]);
  };
  var createElement = /* @__PURE__ */ function() {
    return createElementNS(Nothing.value);
  }();
  var createDocumentFragment = createDocumentFragmentImpl;
  var appendChild = appendChildImpl;
  var addEventListener = addEventListenerImpl;

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Specular.Internal.Incremental.Array/foreign.js
  function iterate2(self, fn) {
    for (var i = 0; i < self.length; i++) {
      fn(self[i]);
    }
  }

  // output/Specular.Internal.Incremental.Optional/foreign.js
  var none = {
    toString: function() {
      return "none";
    }
  };

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a) {
    return function(b) {
      return a === b;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Specular.Internal.Incremental.Optional/index.js
  var Optional = function(x) {
    return x;
  };
  var some = Optional;
  var isSome = function(opt) {
    return !unsafeRefEq(opt)(none);
  };
  var fromSome = function(v) {
    if (isSome(v)) {
      return v;
    }
    ;
    if (otherwise) {
      return unsafeCrashWith("Optional.fromSome: none");
    }
    ;
    throw new Error("Failed pattern match at Specular.Internal.Incremental.Optional (line 24, column 1 - line 24, column 38): " + [v.constructor.name]);
  };

  // output/Specular.Internal.Incremental.Ref/foreign.js
  function new_(value2) {
    return { value: value2 };
  }
  function read3(ref) {
    return ref.value;
  }
  function write3(ref, value2) {
    ref.value = value2;
  }

  // output/Specular.Internal.Incremental.Global/index.js
  var stabilizationIsNotInProgress = /* @__PURE__ */ function() {
    return -1 | 0;
  }();
  var globalTotalRefcount = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(0);
  });
  var globalLastStabilizationNum = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(0);
  });
  var globalCurrentStabilizationNum = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_(stabilizationIsNotInProgress);
  });

  // output/Specular.Internal.Incremental.MutableArray/foreign.js
  function empty3() {
    return [];
  }
  function push2(self, x) {
    self.push(x);
  }
  function remove(self, x) {
    var index2 = self.indexOf(x);
    if (index2 !== -1) {
      self.splice(index2, 1);
    }
  }
  function length2(self) {
    return self.length;
  }
  function iterate3(self, fn) {
    for (var i = 0; i < self.length; i++) {
      fn(self[i]);
    }
  }

  // output/Specular.Internal.Incremental.Node/foreign.js
  function _new2(none3, source, dependents, observers, value2, height) {
    return {
      source,
      dependents,
      observers,
      value: value2,
      height,
      adjustedHeight: height,
      inRecomputeQueue: false,
      nextInRecomputeQueue: none3,
      name: "",
      changedAt: -2
    };
  }
  function get_dependents(node) {
    return node.dependents;
  }
  function get_observers(node) {
    return node.observers;
  }
  function get_source(node) {
    return node.source;
  }
  function get_adjustedHeight(node) {
    return node.adjustedHeight;
  }
  function set_adjustedHeight(node, value2) {
    node.adjustedHeight = value2;
  }
  function set_changedAt(node, value2) {
    node.changedAt = value2;
  }
  function get_height(node) {
    return node.height;
  }
  function set_height(node, value2) {
    node.height = value2;
  }
  function get_name(node) {
    return node.name;
  }
  function set_name(node, value2) {
    node.name = value2;
  }
  function get_value(node) {
    return node.value;
  }
  function set_value(node, value2) {
    node.value = value2;
  }

  // output/Specular.Internal.Profiling/foreign.js
  if (typeof global === "undefined") {
    global = window;
  }
  var enabled = !!global.SPECULAR_PROFILING_ENABLED;
  var frameNameToIndex = {};
  var frames = [];
  var events = [];
  global.SpecularProfiling = {
    open: (url) => {
      const w = window.open(url || "http://localhost:1234");
      window.addEventListener("message", (event) => {
        if (event.source === w && event.data.type === "getProfile") {
          console.log("received getProfile");
          w.postMessage(
            {
              type: "loadInitialProfile",
              profile: SpecularProfiling.getProfile()
            },
            "*"
          );
        }
      });
    },
    getProfile() {
      return {
        shared: {
          frames
        },
        profiles: [
          {
            type: "evented",
            name: "page",
            unit: "milliseconds",
            startValue: events.length !== 0 ? events[0].at : 0,
            endValue: events.length !== 0 ? events[events.length - 1].at : 0,
            events
          }
        ]
      };
    },
    clear: () => {
      events.length = 0;
    }
  };
  function begin_(name3) {
    let frameIndex = frameNameToIndex[name3];
    if (frameIndex === void 0) {
      frameIndex = frames.length;
      frameNameToIndex[name3] = frameIndex;
      frames.push({ name: name3 });
    }
    events.push({ type: "O", frame: frameIndex, at: performance.now() });
    return frameIndex;
  }
  function end_(frame) {
    events.push({ type: "C", frame, at: performance.now() });
  }
  var begin = enabled ? begin_ : () => {
  };
  var end = enabled ? end_ : () => {
  };

  // output/Specular.Internal.Incremental.Node/index.js
  var valueExc = function(node) {
    var value_opt = get_value(node);
    return fromSome(value_opt);
  };
  var toSomeNode = unsafeCoerce2;
  var refcount = function(node) {
    var observers = get_observers(node);
    var numDependents = length2(observers);
    var dependents = get_dependents(node);
    var numObservers = length2(dependents);
    return numDependents + numObservers | 0;
  };
  var name2 = function(node) {
    return unsafePerformEffect(function() {
      return get_name(node);
    });
  };
  var create = function(source) {
    var dependents = empty3();
    var observers = empty3();
    return _new2(none, source, dependents, observers, none, 0);
  };
  var annotate = /* @__PURE__ */ function() {
    if (enabled) {
      return set_name;
    }
    ;
    return function(v, v1) {
      return unit;
    };
  }();

  // output/Specular.Internal.Incremental.PriorityQueue/foreign.js
  function new_2(none3, priorityField, presentField, nextField) {
    return {
      none: none3,
      priorityField,
      presentField,
      nextField,
      priorityHeads: [],
      count: 0
    };
  }
  var PRIORITY_WARNING_MARK = 250;
  function add2(pq, node) {
    if (node[pq.presentField]) {
      return false;
    }
    node[pq.presentField] = true;
    pq.count++;
    var priority = node[pq.priorityField];
    while (priority >= pq.priorityHeads.length) {
      pq.priorityHeads.push(pq.none);
      if (pq.priorityHeads.length === PRIORITY_WARNING_MARK) {
        console.warn("Specular: Node height reached " + PRIORITY_WARNING_MARK);
      }
    }
    node[pq.nextField] = pq.priorityHeads[priority];
    pq.priorityHeads[priority] = node;
    return true;
  }
  var removeMin = function(pq) {
    for (var priority = 0; priority < pq.priorityHeads.length; priority++) {
      var node = pq.priorityHeads[priority];
      if (node !== pq.none) {
        node[pq.presentField] = false;
        pq.priorityHeads[priority] = node[pq.nextField];
        node[pq.nextField] = pq.none;
        pq.count--;
        return node;
      }
    }
    return pq.none;
  };
  function drain(pq, fn) {
    while (pq.count > 0) {
      fn(removeMin(pq));
    }
  }

  // output/Specular.Internal.Incremental/index.js
  var $runtime_lazy3 = function(name3, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var max2 = /* @__PURE__ */ max(ordInt);
  var readVar = function(v) {
    return v;
  };
  var newVar = function(val) {
    var node = create({
      compute: function(node2) {
        var value2 = valueExc(node2);
        return some(value2);
      },
      dependencies: pure2([])
    });
    set_value(node, some(val));
    return node;
  };
  var map2 = function(fn, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(v) {
        var value_a = valueExc(a);
        return some(fn(value_a));
      },
      dependencies: pure2(deps)
    });
  };
  var globalRecomputeQueue = /* @__PURE__ */ unsafePerformEffect(function() {
    return new_2(none, "height", "inRecomputeQueue", "nextInRecomputeQueue");
  });
  var setVar = function(v, val) {
    set_value(v, some(val));
    add2(globalRecomputeQueue, toSomeNode(v));
    return unit;
  };
  var ensureHeight = function(node, newHeight) {
    var oldAdjustedHeight = get_adjustedHeight(node);
    return set_adjustedHeight(node, max2(oldAdjustedHeight)(newHeight));
  };
  var recomputeNode = function(node) {
    var height = get_height(node);
    var adjustedHeight = get_adjustedHeight(node);
    var $34 = adjustedHeight > height;
    if ($34) {
      var mark = begin("bump height " + name2(node));
      var dependents = get_dependents(node);
      iterate3(dependents, function(dependent) {
        return ensureHeight(dependent, adjustedHeight + 1 | 0);
      });
      set_height(node, adjustedHeight);
      add2(globalRecomputeQueue, node);
      return end(mark);
    }
    ;
    var mark = begin("compute " + name2(node));
    var source = get_source(node);
    var newValue_opt = source.compute(node);
    (function() {
      var $35 = isSome(newValue_opt);
      if ($35) {
        var newValue = fromSome(newValue_opt);
        set_value(node, some(newValue));
        var currentStabilizationNum = read3(globalCurrentStabilizationNum);
        set_changedAt(node, currentStabilizationNum);
        var dependents2 = get_dependents(node);
        iterate3(dependents2, function(dependent) {
          var _added = add2(globalRecomputeQueue, dependent);
          return unit;
        });
        var observers = get_observers(node);
        return iterate3(observers, function(observer) {
          return observer(newValue);
        });
      }
      ;
      return unit;
    })();
    return end(mark);
  };
  var stabilize = function __do() {
    var mark = begin("stabilize");
    var oldStabilizationNum = read3(globalLastStabilizationNum);
    var currentStabilizationNum = oldStabilizationNum + 1 | 0;
    write3(globalLastStabilizationNum, currentStabilizationNum);
    write3(globalCurrentStabilizationNum, currentStabilizationNum);
    drain(globalRecomputeQueue, recomputeNode);
    write3(globalCurrentStabilizationNum, stabilizationIsNotInProgress);
    return end(mark);
  };
  var $lazy_addDependent = /* @__PURE__ */ $runtime_lazy3("addDependent", "Specular.Internal.Incremental", function() {
    return function(node, dependent) {
      var oldRefcount = refcount(node);
      var dependents = get_dependents(node);
      push2(dependents, dependent);
      return $lazy_handleRefcountChange(103)(node, oldRefcount);
    };
  });
  var $lazy_connect = /* @__PURE__ */ $runtime_lazy3("connect", "Specular.Internal.Incremental", function() {
    return function(node) {
      var mark = begin("connect " + name2(node));
      var source = get_source(node);
      var dependencies = source.dependencies();
      iterate2(dependencies, function(dependency) {
        $lazy_addDependent(142)(dependency, toSomeNode(node));
        var dependencyHeight = get_height(dependency);
        var ourHeight = get_height(node);
        var $36 = (dependencyHeight + 1 | 0) > ourHeight;
        if ($36) {
          set_height(node, dependencyHeight + 1 | 0);
          return set_adjustedHeight(node, dependencyHeight + 1 | 0);
        }
        ;
        return unit;
      });
      var value2 = source.compute(node);
      set_value(node, value2);
      return end(mark);
    };
  });
  var $lazy_disconnect = /* @__PURE__ */ $runtime_lazy3("disconnect", "Specular.Internal.Incremental", function() {
    return function(node) {
      var mark = begin("disconnect " + name2(node));
      var source = get_source(node);
      var dependencies = source.dependencies();
      iterate2(dependencies, function(dependency) {
        return $lazy_removeDependent(164)(dependency, toSomeNode(node));
      });
      return end(mark);
    };
  });
  var $lazy_handleRefcountChange = /* @__PURE__ */ $runtime_lazy3("handleRefcountChange", "Specular.Internal.Incremental", function() {
    return function(node, oldRefcount) {
      var newcount = refcount(node);
      (function() {
        var $37 = oldRefcount === 0 && newcount > 0;
        if ($37) {
          return $lazy_connect(116)(node);
        }
        ;
        var $38 = oldRefcount > 0 && newcount === 0;
        if ($38) {
          return $lazy_disconnect(118)(node);
        }
        ;
        return unit;
      })();
      var oldTotalRefcount = read3(globalTotalRefcount);
      return write3(globalTotalRefcount, (oldTotalRefcount - oldRefcount | 0) + newcount | 0);
    };
  });
  var $lazy_removeDependent = /* @__PURE__ */ $runtime_lazy3("removeDependent", "Specular.Internal.Incremental", function() {
    return function(node, dependent) {
      var oldRefcount = refcount(node);
      var dependents = get_dependents(node);
      remove(dependents, dependent);
      return $lazy_handleRefcountChange(110)(node, oldRefcount);
    };
  });
  var handleRefcountChange = /* @__PURE__ */ $lazy_handleRefcountChange(112);
  var addObserver = function(node, observer) {
    var oldRefcount = refcount(node);
    var observers = get_observers(node);
    push2(observers, observer);
    return handleRefcountChange(node, oldRefcount);
  };
  var removeObserver = function(node, observer) {
    var oldRefcount = refcount(node);
    var observers = get_observers(node);
    remove(observers, observer);
    return handleRefcountChange(node, oldRefcount);
  };

  // output/Specular.Internal.Queue/foreign.js
  function new_3() {
    return {
      elements: [],
      end: 0,
      first: 0
    };
  }
  function enqueue(q, elem2) {
    q.elements[q.end] = elem2;
    q.end++;
  }
  function drain2(q, fn) {
    while (q.first < q.end) {
      var elem2 = q.elements[q.first];
      q.elements[q.first] = void 0;
      q.first++;
      fn(elem2);
    }
    q.first = 0;
    q.end = 0;
  }

  // output/Specular.FRP.Base/index.js
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var readNode = function(node) {
    var handler = function(v) {
      return unit;
    };
    return function __do3() {
      addObserver(node, handler);
      var value2 = get_value(node);
      removeObserver(node, handler);
      return fromSome(value2);
    };
  };
  var readDynamic = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect1(function __do3() {
        var mark = begin("readDynamic");
        var result = readNode(v)();
        end(mark);
        return result;
      });
    };
  };
  var readDynamic1 = /* @__PURE__ */ readDynamic(monadEffectEffect);
  var monadFRP = function(dictMonadEffect) {
    return function(dictMonadCleanup) {
      return {
        MonadEffect0: function() {
          return dictMonadEffect;
        },
        MonadCleanup1: function() {
          return dictMonadCleanup;
        }
      };
    };
  };
  var globalEffectQueue = /* @__PURE__ */ unsafePerformEffect(new_3);
  var functorDynamic = {
    map: function(f) {
      return function(v) {
        return unsafePerformEffect(function __do3() {
          var n = map2(f, v);
          annotate(n, "map " + name2(v));
          return n;
        });
      };
    }
  };
  var drainEffects = function() {
    return drain2(globalEffectQueue, function(handler) {
      return handler();
    });
  };
  var stabilize2 = function __do2() {
    var mark = begin("Specular.stabilize");
    stabilize();
    drainEffects();
    return end(mark);
  };
  var newDynamic = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(initial) {
      return liftEffect1(function __do3() {
        var $$var = newVar(initial);
        annotate(readVar($$var), "root Dynamic");
        var dynamic = readVar($$var);
        return {
          dynamic,
          read: readDynamic1(dynamic),
          set: function(x) {
            return function __do4() {
              var name3 = get_name(readVar($$var));
              var mark = begin("set " + name3);
              setVar($$var, x);
              stabilize2();
              return end(mark);
            };
          },
          modify: function(f) {
            return function __do4() {
              var name3 = get_name(readVar($$var));
              var mark = begin("modify " + name3);
              var x = valueExc(readVar($$var));
              setVar($$var, f(x));
              stabilize2();
              return end(mark);
            };
          }
        };
      });
    };
  };
  var _subscribeNode = function(handler, node) {
    var h = function(value2) {
      return enqueue(globalEffectQueue, handler(value2));
    };
    addObserver(node, h);
    return function() {
      return removeObserver(node, h);
    };
  };
  var subscribeNode = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(dictMonadCleanup) {
      var bind13 = bind(dictMonadCleanup.Monad0().Bind1());
      var onCleanup4 = onCleanup(dictMonadCleanup);
      return function(handler) {
        return function(event) {
          return bind13(liftEffect1(function() {
            return _subscribeNode(handler, event);
          }))(function(unsub) {
            return onCleanup4(unsub);
          });
        };
      };
    };
  };
  var subscribeDyn_ = function(dictMonadFRP) {
    var MonadCleanup1 = dictMonadFRP.MonadCleanup1();
    var discard23 = discard2(MonadCleanup1.Monad0().Bind1());
    var MonadEffect0 = dictMonadFRP.MonadEffect0();
    var subscribeNode1 = subscribeNode(MonadEffect0)(MonadCleanup1);
    var liftEffect1 = liftEffect(MonadEffect0);
    return function(handler) {
      return function(v) {
        return discard23(subscribeNode1(handler)(v))(function() {
          return liftEffect1(function __do3() {
            var currentValue = valueExc(v);
            return liftEffect2(handler(currentValue))();
          });
        });
      };
    };
  };

  // output/Specular.Internal.RIO/foreign.js
  function pureImpl(x) {
    return function RIO_pure_eff(_) {
      return x;
    };
  }
  function mapImpl(f) {
    return function(io_x) {
      return function RIO_map_eff(env) {
        return f(io_x(env));
      };
    };
  }
  function applyImpl(io_f) {
    return function(io_x) {
      return function RIO_apply_eff(env) {
        var f = io_f(env);
        return f(io_x(env));
      };
    };
  }
  function bindImpl(io_x) {
    return function(k) {
      return function RIO_bind_eff(env) {
        return k(io_x(env))(env);
      };
    };
  }
  function askImpl(env) {
    return env;
  }
  function runRIO(env) {
    return function(io) {
      return function runRIO_eff() {
        return io(env);
      };
    };
  }
  function rio(f) {
    return function RIO_rio_eff(env) {
      return f(env)();
    };
  }

  // output/Specular.Internal.RIO/index.js
  var RIO = function(x) {
    return x;
  };
  var functorRIO = {
    map: mapImpl
  };
  var applyRIO = {
    apply: applyImpl,
    Functor0: function() {
      return functorRIO;
    }
  };
  var bindRIO = {
    bind: bindImpl,
    Apply0: function() {
      return applyRIO;
    }
  };
  var applicativeRIO = {
    pure: pureImpl,
    Apply0: function() {
      return applyRIO;
    }
  };
  var monadRIO = {
    Applicative0: function() {
      return applicativeRIO;
    },
    Bind1: function() {
      return bindRIO;
    }
  };
  var monadAskRIO = {
    ask: askImpl,
    Monad0: function() {
      return monadRIO;
    }
  };
  var monadEffectRIO = {
    liftEffect: unsafeCoerce2,
    Monad0: function() {
      return monadRIO;
    }
  };

  // output/Specular.Profiling/index.js
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var measure = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var Bind1 = Monad0.Bind1();
    var bind3 = bind(Bind1);
    var liftEffect5 = liftEffect(dictMonadEffect);
    var discard12 = discard3(Bind1);
    var pure12 = pure(Monad0.Applicative0());
    if (enabled) {
      return function(name3) {
        return function(action) {
          return bind3(liftEffect5(function() {
            return begin(name3);
          }))(function(mark) {
            return bind3(action)(function(result) {
              return discard12(liftEffect5(function() {
                return end(mark);
              }))(function() {
                return pure12(result);
              });
            });
          });
        };
      };
    }
    ;
    return function(v) {
      return function(action) {
        return action;
      };
    };
  };

  // output/Specular.Dom.Builder/index.js
  var $runtime_lazy4 = function(name3, moduleName, init) {
    var state2 = 0;
    var val;
    return function(lineNumber) {
      if (state2 === 2)
        return val;
      if (state2 === 1)
        throw new ReferenceError(name3 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state2 = 1;
      val = init();
      state2 = 2;
      return val;
    };
  };
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var mempty1 = /* @__PURE__ */ mempty(/* @__PURE__ */ monoidEffect(monoidUnit));
  var measure2 = /* @__PURE__ */ measure(monadEffectEffect);
  var join2 = /* @__PURE__ */ join(bindEffect);
  var applySecond2 = /* @__PURE__ */ applySecond(applyEffect);
  var Builder = function(x) {
    return x;
  };
  var runBuilderWithUserEnv = function(userEnv) {
    return function(parent) {
      return function(v) {
        return function __do3() {
          var actionsMutable = emptyDelayed();
          var env = {
            parent,
            cleanup: actionsMutable,
            userEnv
          };
          var result = runRIO(env)(v)();
          var actions = unsafeFreezeDelayed(actionsMutable)();
          return new Tuple(result, sequenceEffects(actions));
        };
      };
    };
  };
  var runBuilder$prime = function(env, v) {
    return v(env);
  };
  var runBuilder = /* @__PURE__ */ runBuilderWithUserEnv(unit);
  var monadEffectBuilder = monadEffectRIO;
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectBuilder);
  var monadBuilder = monadRIO;
  var mkBuilder$prime = function($63) {
    return Builder(RIO($63));
  };
  var mkBuilder = function($64) {
    return Builder(rio($64));
  };
  var monadCleanupBuilder = {
    onCleanup: function(action) {
      return mkBuilder(function(env) {
        return pushDelayed(env.cleanup)(action);
      });
    },
    Monad0: function() {
      return monadBuilder;
    }
  };
  var onCleanup2 = /* @__PURE__ */ onCleanup(monadCleanupBuilder);
  var getEnv = /* @__PURE__ */ ask(monadAskRIO);
  var bindBuilder = bindRIO;
  var bind1 = /* @__PURE__ */ bind(bindBuilder);
  var discard22 = /* @__PURE__ */ discard4(bindBuilder);
  var applicativeBuilder = applicativeRIO;
  var pure1 = /* @__PURE__ */ pure(applicativeBuilder);
  var $lazy_monadReplaceBuilder = /* @__PURE__ */ $runtime_lazy4("monadReplaceBuilder", "Specular.Dom.Builder", function() {
    return {
      newSlot: bind1(getEnv)(function(env) {
        return bind1(liftEffect3(createTextNode("")))(function(placeholderBefore) {
          return bind1(liftEffect3(createTextNode("")))(function(placeholderAfter) {
            return discard22(liftEffect3(appendChild(placeholderBefore)(env.parent)))(function() {
              return discard22(liftEffect3(appendChild(placeholderAfter)(env.parent)))(function() {
                return bind1(liftEffect3($$new(mempty1)))(function(cleanupRef) {
                  var replace = function(inner) {
                    return measure2("slot replace")(function __do3() {
                      measure2("slot remove DOM")(removeAllBetween(placeholderBefore)(placeholderAfter))();
                      var fragment = createDocumentFragment();
                      var v = measure2("slot init")(runBuilderWithUserEnv(env.userEnv)(fragment)(inner))();
                      join2(read(cleanupRef))();
                      var m_parent = parentNode(placeholderAfter)();
                      (function() {
                        if (m_parent instanceof Just) {
                          insertBefore(fragment)(placeholderAfter)(m_parent.value0)();
                          return write(measure2("slot cleanup")(function __do4() {
                            v.value1();
                            return write(mempty1)(cleanupRef)();
                          }))(cleanupRef)();
                        }
                        ;
                        if (m_parent instanceof Nothing) {
                          return write(v.value1)(cleanupRef)();
                        }
                        ;
                        throw new Error("Failed pattern match at Specular.Dom.Builder (line 118, column 9 - line 131, column 37): " + [m_parent.constructor.name]);
                      })();
                      return v.value0;
                    });
                  };
                  var destroy = function __do3() {
                    removeAllBetween(placeholderBefore)(placeholderAfter)();
                    removeNode(placeholderBefore)();
                    removeNode(placeholderAfter)();
                    return join2(read(cleanupRef))();
                  };
                  var append2 = function __do3() {
                    var fragment = createDocumentFragment();
                    var v = runBuilderWithUserEnv(env.userEnv)(fragment)(newSlot($lazy_monadReplaceBuilder(0)))();
                    modify_(function(v1) {
                      return applySecond2(v1)(v.value1);
                    })(cleanupRef)();
                    var m_parent = parentNode(placeholderAfter)();
                    (function() {
                      if (m_parent instanceof Just) {
                        return insertBefore(fragment)(placeholderAfter)(m_parent.value0)();
                      }
                      ;
                      if (m_parent instanceof Nothing) {
                        return unit;
                      }
                      ;
                      throw new Error("Failed pattern match at Specular.Dom.Builder (line 150, column 9 - line 154, column 22): " + [m_parent.constructor.name]);
                    })();
                    return v.value0;
                  };
                  return discard22(onCleanup2(join2(read(cleanupRef))))(function() {
                    return pure1(new Slot(replace, destroy, append2));
                  });
                });
              });
            });
          });
        });
      }),
      Monad0: function() {
        return monadBuilder;
      },
      MonadCleanup1: function() {
        return monadCleanupBuilder;
      }
    };
  });
  var monadReplaceBuilder = /* @__PURE__ */ $lazy_monadReplaceBuilder(93);

  // output/Specular.Dom.Element/foreign.js
  var spacesRE = /\s+/;
  function splitClasses(classes) {
    return classes.split(spacesRE).filter((x) => x !== "");
  }
  function _addClass(node, cls) {
    node.classList.add(...splitClasses(cls));
  }

  // output/Specular.Dom.Element/index.js
  var measure3 = /* @__PURE__ */ measure(monadEffectEffect);
  var mempty2 = /* @__PURE__ */ mempty(monoidArray);
  var bind12 = /* @__PURE__ */ bind(bindBuilder);
  var subscribeDyn_2 = /* @__PURE__ */ subscribeDyn_(/* @__PURE__ */ monadFRP(monadEffectBuilder)(monadCleanupBuilder));
  var text2 = function(str) {
    return mkBuilder$prime(function(env) {
      var node = createTextNode(str)();
      return appendChild(node)(env.parent)();
    });
  };
  var on = function(eventType) {
    return function(cb) {
      return function(node, _cleanups) {
        addEventListener(eventType)(function(e) {
          return measure3("event: " + eventType)(cb(e));
        })(node)();
        return unit;
      };
    };
  };
  var onClick = function(cb) {
    return on("click")(cb);
  };
  var onClick_ = function(cb) {
    return onClick(function(v) {
      return cb;
    });
  };
  var initElement = function(env, node, props, body) {
    var mark = begin("el");
    var result = runBuilder$prime({
      parent: node,
      cleanup: env.cleanup,
      userEnv: env.userEnv
    }, body);
    foreachE(props)(function(v) {
      return function() {
        return v(node, env.cleanup);
      };
    })();
    appendChild(node)(env.parent)();
    end(mark);
    return result;
  };
  var el = function(tagName) {
    return function(props) {
      return function(body) {
        return mkBuilder$prime(function(env) {
          var node = createElement(tagName)();
          return initElement(env, node, props, body);
        });
      };
    };
  };
  var el_ = function(tagName) {
    return el(tagName)(mempty2);
  };
  var dynText = function(strD) {
    return bind12(mkBuilder$prime(function(env) {
      var node = createTextNode("")();
      appendChild(node)(env.parent)();
      return node;
    }))(function(node) {
      return subscribeDyn_2(setText(node))(strD);
    });
  };
  var class_ = function(cls) {
    return function(node, v) {
      return _addClass(node, cls);
    };
  };
  var attrs = function(a) {
    return function(node, v) {
      return setAttributes(node)(a)();
    };
  };
  var attr = function(name3) {
    return function(value2) {
      return attrs(singleton2(name3)(value2));
    };
  };

  // output/Specular.Dom.Widget/foreign.js
  function documentBody() {
    return document.body;
  }

  // output/Specular.Dom.Widget/index.js
  var bind2 = /* @__PURE__ */ bind(bindBuilder);
  var newSlot2 = /* @__PURE__ */ newSlot(monadReplaceBuilder);
  var discard5 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard5(bindBuilder);
  var onCleanup3 = /* @__PURE__ */ onCleanup(monadCleanupBuilder);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectBuilder);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var runWidgetInNode = function(parent) {
    return function(widget) {
      return runBuilder(parent)(bind2(newSlot2)(function(slot) {
        return discard1(onCleanup3(destroySlot(slot)))(function() {
          return liftEffect4(replaceSlot(slot)(widget));
        });
      }));
    };
  };
  var runMainWidgetInNode = function(parent) {
    return function(widget) {
      return map3(fst)(runWidgetInNode(parent)(widget));
    };
  };
  var runMainWidgetInBody = function(widget) {
    return function __do3() {
      var body = documentBody();
      return runMainWidgetInNode(body)(widget)();
    };
  };

  // output/Specular.Ref/index.js
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ref2.create = function(value0) {
      return function(value1) {
        return new Ref2(value0, value1);
      };
    };
    return Ref2;
  }();
  var value = function(v) {
    return v.value0;
  };
  var $$new2 = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var bind13 = bind(Monad0.Bind1());
    var newDynamic2 = newDynamic(dictMonadEffect);
    var pure22 = pure(Monad0.Applicative0());
    return function(initial) {
      return bind13(newDynamic2(initial))(function(v) {
        return pure22(new Ref(v.dynamic, v.modify));
      });
    };
  };
  var modify4 = function(dictMonadEffect) {
    var liftEffect5 = liftEffect(dictMonadEffect);
    return function(v) {
      return function($112) {
        return liftEffect5(v.value1($112));
      };
    };
  };

  // output/Tasks.Counter/index.js
  var map4 = /* @__PURE__ */ map(functorDynamic);
  var modify5 = /* @__PURE__ */ modify4(monadEffectEffect);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindBuilder);
  var show2 = /* @__PURE__ */ show(showInt);
  var readCounters = function(cs) {
    return function(i) {
      return map4(function() {
        var $13 = fromMaybe(0);
        return function($14) {
          return $13(function(v) {
            return index(v)(i);
          }($14));
        };
      }())(value(cs));
    };
  };
  var modifyCounters = function(cs) {
    return function(i) {
      return function(f) {
        var f$prime = function(xs) {
          return fromMaybe([])(modifyAt(i)(f)(xs));
        };
        return modify5(cs)(f$prime);
      };
    };
  };
  var mkCounters = function(dictMonadEffect) {
    return $$new2(dictMonadEffect);
  };
  var component = /* @__PURE__ */ runMainWidgetInBody(/* @__PURE__ */ bind(bindBuilder)(/* @__PURE__ */ mkCounters(monadEffectBuilder)(/* @__PURE__ */ replicate(3)(0)))(function(counters) {
    var subtractCb = function(i) {
      return modifyCounters(counters)(i)(add3(-1 | 0));
    };
    var addCb = function(i) {
      return modifyCounters(counters)(i)(add3(1));
    };
    return discard6(el_("div")(discard6(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(0))])(text2("+")))(function() {
      return discard6(dynText(map4(show2)(readCounters(counters)(0))))(function() {
        return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(0))])(text2("-"));
      });
    })))(function() {
      return discard6(el_("div")(discard6(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(1))])(text2("+")))(function() {
        return discard6(dynText(map4(show2)(readCounters(counters)(1))))(function() {
          return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(1))])(text2("-"));
        });
      })))(function() {
        return el_("div")(discard6(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(2))])(text2("+")))(function() {
          return discard6(dynText(map4(show2)(readCounters(counters)(2))))(function() {
            return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(2))])(text2("-"));
          });
        }));
      });
    });
  }));

  // output/Main/index.js
  var main = component;

  // <stdin>
  main();
})();
