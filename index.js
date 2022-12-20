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

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
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
  var voidLeft = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map12($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map12 = map(dictFunctor);
    return function(x) {
      return map12($$const(x));
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map12 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map12($$const(identity2))(a))(b);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map12 = map(dictApply.Functor0());
    return function(f) {
      return function(a) {
        return function(b) {
          return apply1(map12(f)(a))(b);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure13 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply5(pure13(f))(a);
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

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind7 = bind(dictMonad.Bind1());
    var pure6 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind7(f)(function(f$prime) {
          return bind7(a)(function(a$prime) {
            return pure6(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

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
  var one = function(dict) {
    return dict.one;
  };
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
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

  // output/Effect/index.js
  var $runtime_lazy = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
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

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
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
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
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

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
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
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a) {
    return maybe(a)(identity4);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();
  var altMaybe = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Nothing) {
          return v1;
        }
        ;
        return v;
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var plusMaybe = /* @__PURE__ */ function() {
    return {
      empty: Nothing.value,
      Alt0: function() {
        return altMaybe;
      }
    };
  }();
  var alternativeMaybe = {
    Applicative0: function() {
      return applicativeMaybe;
    },
    Plus1: function() {
      return plusMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };

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
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var foldr = function(dict) {
    return dict.foldr;
  };
  var oneOf = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictPlus) {
      return foldr22(alt(dictPlus.Alt0()))(empty(dictPlus));
    };
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure6 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure6(unit));
      };
    };
  };
  var sequence_ = function(dictApplicative) {
    var traverse_1 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return traverse_1(dictFoldable)(identity5);
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var indexl = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(idx) {
      var go2 = function(cursor) {
        return function(a) {
          if (cursor.elem instanceof Just) {
            return cursor;
          }
          ;
          var $296 = cursor.pos === idx;
          if ($296) {
            return {
              elem: new Just(a),
              pos: cursor.pos
            };
          }
          ;
          return {
            pos: cursor.pos + 1 | 0,
            elem: cursor.elem
          };
        };
      };
      var $455 = foldl22(go2)({
        elem: Nothing.value,
        pos: 0
      });
      return function($456) {
        return function(v) {
          return v.elem;
        }($455($456));
      };
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldableEither = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Left) {
            return mempty3;
          }
          ;
          if (v1 instanceof Right) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append3 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append3(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
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
    return function(apply5) {
      return function(map12) {
        return function(pure6) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure6([]);
                  case 1:
                    return map12(array1)(f(array[bot]));
                  case 2:
                    return apply5(map12(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply5(apply5(map12(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply5(map12(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity6);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value13 = b;
              while (true) {
                var maybe2 = f(value13);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust5(maybe2);
                result.push(fst2(tuple));
                value13 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value13 = b;
              while (true) {
                var tuple = f(value13);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value13 = fromJust5(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var map3 = /* @__PURE__ */ map(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var applyList = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(map3(v.value0)(v1))(apply(applyList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var bindList = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(v1(v.value0))(bind(bindList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 164, column 1 - line 166, column 37): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyList;
    }
  };
  var applicativeList = {
    pure: function(a) {
      return new Cons(a, Nil.value);
    },
    Apply0: function() {
      return applyList;
    }
  };

  // output/Data.List/index.js
  var map4 = /* @__PURE__ */ map(functorMaybe);
  var singleton3 = function(a) {
    return new Cons(a, Nil.value);
  };
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var unsnoc = function(lst) {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Cons && v.value1 instanceof Nil) {
            $tco_done = true;
            return new Just({
              revInit: v1,
              last: v.value0
            });
          }
          ;
          if (v instanceof Cons) {
            $tco_var_v = v.value1;
            $copy_v1 = new Cons(v.value0, v1);
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 270, column 3 - line 270, column 21): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return map4(function(h) {
      return {
        init: reverse(h.revInit),
        last: h.last
      };
    })(go2(lst)(Nil.value));
  };
  var fromFoldable = function(dictFoldable) {
    return foldr(dictFoldable)(Cons.create)(Nil.value);
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

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare2(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable2 = function(dictOrd) {
    var insert1 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert1(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };

  // output/Data.Semiring.Free/index.js
  var append12 = /* @__PURE__ */ append(semigroupList);
  var bind2 = /* @__PURE__ */ bind(bindList);
  var pure2 = /* @__PURE__ */ pure(applicativeList);
  var semiringFree = /* @__PURE__ */ function() {
    return {
      add: function(v) {
        return function(v1) {
          return append12(v)(v1);
        };
      },
      zero: Nil.value,
      mul: function(v) {
        return function(v1) {
          return bind2(v)(function(xs) {
            return bind2(v1)(function(ys) {
              return pure2(append12(xs)(ys));
            });
          });
        };
      },
      one: singleton3(Nil.value)
    };
  }();
  var free = function(a) {
    return singleton3(singleton3(a));
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton4 = function(c) {
    return c;
  };
  var length2 = function(s) {
    return s.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i = s.indexOf(x);
          return i === -1 ? nothing : just(i);
        };
      };
    };
  };
  var take = function(n) {
    return function(s) {
      return s.substr(0, n);
    };
  };
  var drop = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };
  var splitAt = function(i) {
    return function(s) {
      return { before: s.substring(0, i), after: s.substring(i) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length)
        return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v) {
    return function(str) {
      var v1 = splitAt(length2(v))(str);
      var $20 = v1.before === v;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };

  // output/Data.Validation.Semiring/index.js
  var V = function(x) {
    return x;
  };
  var validation = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Validation.Semiring (line 49, column 1 - line 49, column 84): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var invalid = function($113) {
    return V(Left.create($113));
  };
  var functorV = functorEither;
  var applyV = function(dictSemiring) {
    var mul2 = mul(dictSemiring);
    return {
      apply: function(v) {
        return function(v1) {
          if (v instanceof Left && v1 instanceof Left) {
            return new Left(mul2(v.value0)(v1.value0));
          }
          ;
          if (v instanceof Left) {
            return new Left(v.value0);
          }
          ;
          if (v1 instanceof Left) {
            return new Left(v1.value0);
          }
          ;
          if (v instanceof Right && v1 instanceof Right) {
            return new Right(v.value0(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Validation.Semiring (line 90, column 1 - line 94, column 54): " + [v.constructor.name, v1.constructor.name]);
        };
      },
      Functor0: function() {
        return functorV;
      }
    };
  };
  var applicativeV = function(dictSemiring) {
    var applyV1 = applyV(dictSemiring);
    return {
      pure: function($121) {
        return V(Right.create($121));
      },
      Apply0: function() {
        return applyV1;
      }
    };
  };
  var altV = function(dictSemiring) {
    var add4 = add(dictSemiring);
    return {
      alt: function(v) {
        return function(v1) {
          if (v instanceof Left && v1 instanceof Left) {
            return new Left(add4(v.value0)(v1.value0));
          }
          ;
          if (v instanceof Left) {
            return v1;
          }
          ;
          if (v instanceof Right) {
            return new Right(v.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Validation.Semiring (line 105, column 1 - line 108, column 36): " + [v.constructor.name, v1.constructor.name]);
        };
      },
      Functor0: function() {
        return functorV;
      }
    };
  };

  // output/Routing.Match.Error/index.js
  var UnexpectedPath = /* @__PURE__ */ function() {
    function UnexpectedPath2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedPath2.create = function(value0) {
      return new UnexpectedPath2(value0);
    };
    return UnexpectedPath2;
  }();
  var ExpectedBoolean = /* @__PURE__ */ function() {
    function ExpectedBoolean2() {
    }
    ;
    ExpectedBoolean2.value = new ExpectedBoolean2();
    return ExpectedBoolean2;
  }();
  var ExpectedEnd = /* @__PURE__ */ function() {
    function ExpectedEnd2() {
    }
    ;
    ExpectedEnd2.value = new ExpectedEnd2();
    return ExpectedEnd2;
  }();
  var ExpectedNumber = /* @__PURE__ */ function() {
    function ExpectedNumber2() {
    }
    ;
    ExpectedNumber2.value = new ExpectedNumber2();
    return ExpectedNumber2;
  }();
  var ExpectedInt = /* @__PURE__ */ function() {
    function ExpectedInt2() {
    }
    ;
    ExpectedInt2.value = new ExpectedInt2();
    return ExpectedInt2;
  }();
  var ExpectedString = /* @__PURE__ */ function() {
    function ExpectedString2() {
    }
    ;
    ExpectedString2.value = new ExpectedString2();
    return ExpectedString2;
  }();
  var ExpectedQuery = /* @__PURE__ */ function() {
    function ExpectedQuery2() {
    }
    ;
    ExpectedQuery2.value = new ExpectedQuery2();
    return ExpectedQuery2;
  }();
  var ExpectedPathPart = /* @__PURE__ */ function() {
    function ExpectedPathPart2() {
    }
    ;
    ExpectedPathPart2.value = new ExpectedPathPart2();
    return ExpectedPathPart2;
  }();
  var KeyNotFound = /* @__PURE__ */ function() {
    function KeyNotFound2(value0) {
      this.value0 = value0;
    }
    ;
    KeyNotFound2.create = function(value0) {
      return new KeyNotFound2(value0);
    };
    return KeyNotFound2;
  }();
  var Fail = /* @__PURE__ */ function() {
    function Fail2(value0) {
      this.value0 = value0;
    }
    ;
    Fail2.create = function(value0) {
      return new Fail2(value0);
    };
    return Fail2;
  }();
  var showMatchError = function(err) {
    if (err instanceof UnexpectedPath) {
      return "expected path part: " + err.value0;
    }
    ;
    if (err instanceof KeyNotFound) {
      return "key: " + (err.value0 + " has not found in query part");
    }
    ;
    if (err instanceof ExpectedQuery) {
      return "expected query - found path";
    }
    ;
    if (err instanceof ExpectedNumber) {
      return "expected number";
    }
    ;
    if (err instanceof ExpectedInt) {
      return "expected int";
    }
    ;
    if (err instanceof ExpectedBoolean) {
      return "expected boolean";
    }
    ;
    if (err instanceof ExpectedEnd) {
      return "expected end";
    }
    ;
    if (err instanceof ExpectedString) {
      return "expected string var";
    }
    ;
    if (err instanceof ExpectedPathPart) {
      return "expected path part, found query";
    }
    ;
    if (err instanceof Fail) {
      return "match error: " + err.value0;
    }
    ;
    throw new Error("Failed pattern match at Routing.Match.Error (line 19, column 3 - line 29, column 39): " + [err.constructor.name]);
  };

  // output/Routing.Types/index.js
  var Path = /* @__PURE__ */ function() {
    function Path2(value0) {
      this.value0 = value0;
    }
    ;
    Path2.create = function(value0) {
      return new Path2(value0);
    };
    return Path2;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0) {
      this.value0 = value0;
    }
    ;
    Query2.create = function(value0) {
      return new Query2(value0);
    };
    return Query2;
  }();

  // output/Routing.Match/index.js
  var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeV(semiringFree));
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var bind3 = /* @__PURE__ */ bind(bindList);
  var map5 = /* @__PURE__ */ map(functorList);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var pure1 = /* @__PURE__ */ pure(applicativeList);
  var one2 = /* @__PURE__ */ one(semiringFree);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altV(semiringFree));
  var runMatch = function(v) {
    return function(route2) {
      var foldErrors = function(errs) {
        return new Left(foldl2(function(b) {
          return function(a) {
            return a + ("\n" + b);
          };
        })("")(bind3(map5(reverse)(unwrap2(errs)))(function(es) {
          return pure1(foldl2(function(b) {
            return function(a) {
              return a + (";" + b);
            };
          })("")(map5(showMatchError)(es)));
        })));
      };
      return validation(foldErrors)(function($109) {
        return Right.create(snd($109));
      })(v(route2));
    };
  };
  var matchFunctor = {
    map: function(fn) {
      return function(v) {
        return function(r) {
          return validation(invalid)(function(v1) {
            return pure3(new Tuple(v1.value0, fn(v1.value1)));
          })(v(r));
        };
      };
    }
  };
  var matchAlt = {
    alt: function(v) {
      return function(v1) {
        return function(r) {
          return alt2(v(r))(v1(r));
        };
      };
    },
    Functor0: function() {
      return matchFunctor;
    }
  };
  var matchPlus = {
    empty: /* @__PURE__ */ $$const(/* @__PURE__ */ invalid(one2)),
    Alt0: function() {
      return matchAlt;
    }
  };
  var lit = function(input) {
    return function(route2) {
      if (route2 instanceof Cons && (route2.value0 instanceof Path && route2.value0.value0 === input)) {
        return pure3(new Tuple(route2.value1, unit));
      }
      ;
      if (route2 instanceof Cons && route2.value0 instanceof Path) {
        return invalid(free(new UnexpectedPath(input)));
      }
      ;
      return invalid(free(ExpectedPathPart.value));
    };
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
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
    function Slot2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Slot2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Slot2(value0, value1, value22);
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

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value13) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value13);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value13) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value13;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head3, tail) {
      this.head = head3;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head3) {
      return function(tail) {
        return new Cons3(head3, tail);
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
    return function(foldr3) {
      return function(xs) {
        return listToArray(foldr3(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
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
  var $runtime_lazy2 = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
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
        var go2 = function(x) {
          return updateAt(i)(f(x))(xs);
        };
        return maybe(Nothing.value)(go2)(index(xs)(i));
      };
    };
  };
  var head2 = function(xs) {
    return index(xs)(0);
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

  // output/Data.Function.Uncurried/foreign.js
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };

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
  var singleton5 = function(k) {
    return function(v) {
      return runST(bindFlipped2(poke2(k)(v))(newImpl));
    };
  };

  // output/Specular.Dom.Browser/foreign.js
  function createTextNodeImpl(text7) {
    return function() {
      return document.createTextNode(text7);
    };
  }
  function setTextImpl(node) {
    return function(text7) {
      return function() {
        node.textContent = text7;
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
          var parent2 = node.parentNode;
          if (parent2 !== null) {
            return Just2(parent2);
          } else {
            return Nothing2;
          }
        };
      };
    };
  }
  function insertBeforeImpl(newNode) {
    return function(nodeAfter) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(newNode, nodeAfter);
        };
      };
    };
  }
  function appendChildImpl(newNode) {
    return function(parent2) {
      return function() {
        parent2.appendChild(newNode);
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

  // output/Effect.Uncurried/foreign.js
  var runEffectFn1 = function runEffectFn12(fn) {
    return function(a) {
      return function() {
        return fn(a);
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
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
  function new_(value13) {
    return { value: value13 };
  }
  function read3(ref) {
    return ref.value;
  }
  function write3(ref, value13) {
    ref.value = value13;
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
  function empty4() {
    return [];
  }
  function push2(self, x) {
    self.push(x);
  }
  function remove(self, x) {
    var index3 = self.indexOf(x);
    if (index3 !== -1) {
      self.splice(index3, 1);
    }
  }
  function length4(self) {
    return self.length;
  }
  function iterate3(self, fn) {
    for (var i = 0; i < self.length; i++) {
      fn(self[i]);
    }
  }

  // output/Specular.Internal.Incremental.Node/foreign.js
  function _new2(none3, source, dependents, observers, value13, height8) {
    return {
      source,
      dependents,
      observers,
      value: value13,
      height: height8,
      adjustedHeight: height8,
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
  function set_adjustedHeight(node, value13) {
    node.adjustedHeight = value13;
  }
  function set_changedAt(node, value13) {
    node.changedAt = value13;
  }
  function get_height(node) {
    return node.height;
  }
  function set_height(node, value13) {
    node.height = value13;
  }
  function get_name(node) {
    return node.name;
  }
  function set_name(node, value13) {
    node.name = value13;
  }
  function get_value(node) {
    return node.value;
  }
  function set_value(node, value13) {
    node.value = value13;
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
  function begin_(name16) {
    let frameIndex = frameNameToIndex[name16];
    if (frameIndex === void 0) {
      frameIndex = frames.length;
      frameNameToIndex[name16] = frameIndex;
      frames.push({ name: name16 });
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
    var numDependents = length4(observers);
    var dependents = get_dependents(node);
    var numObservers = length4(dependents);
    return numDependents + numObservers | 0;
  };
  var name2 = function(node) {
    return unsafePerformEffect(function() {
      return get_name(node);
    });
  };
  var create = function(source) {
    var dependents = empty4();
    var observers = empty4();
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
  var $runtime_lazy3 = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
      return val;
    };
  };
  var pure4 = /* @__PURE__ */ pure(applicativeEffect);
  var max3 = /* @__PURE__ */ max(ordInt);
  var readVar = function(v) {
    return v;
  };
  var newVar = function(val) {
    var node = create({
      compute: function(node2) {
        var value13 = valueExc(node2);
        return some(value13);
      },
      dependencies: pure4([])
    });
    set_value(node, some(val));
    return node;
  };
  var map6 = function(fn, a) {
    var deps = [toSomeNode(a)];
    return create({
      compute: function(v) {
        var value_a = valueExc(a);
        return some(fn(value_a));
      },
      dependencies: pure4(deps)
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
    return set_adjustedHeight(node, max3(oldAdjustedHeight)(newHeight));
  };
  var recomputeNode = function(node) {
    var height8 = get_height(node);
    var adjustedHeight = get_adjustedHeight(node);
    var $34 = adjustedHeight > height8;
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
      var value13 = source.compute(node);
      set_value(node, value13);
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
    return function __do4() {
      addObserver(node, handler);
      var value13 = get_value(node);
      removeObserver(node, handler);
      return fromSome(value13);
    };
  };
  var readDynamic = function(dictMonadEffect) {
    var liftEffect1 = liftEffect(dictMonadEffect);
    return function(v) {
      return liftEffect1(function __do4() {
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
        return unsafePerformEffect(function __do4() {
          var n = map6(f, v);
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
      return liftEffect1(function __do4() {
        var $$var = newVar(initial);
        annotate(readVar($$var), "root Dynamic");
        var dynamic = readVar($$var);
        return {
          dynamic,
          read: readDynamic1(dynamic),
          set: function(x) {
            return function __do5() {
              var name16 = get_name(readVar($$var));
              var mark = begin("set " + name16);
              setVar($$var, x);
              stabilize2();
              return end(mark);
            };
          },
          modify: function(f) {
            return function __do5() {
              var name16 = get_name(readVar($$var));
              var mark = begin("modify " + name16);
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
  var changed = function(v) {
    return v;
  };
  var _subscribeNode = function(handler, node) {
    var h = function(value13) {
      return enqueue(globalEffectQueue, handler(value13));
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
          return liftEffect1(function __do4() {
            var currentValue = valueExc(v);
            return liftEffect2(handler(currentValue))();
          });
        });
      };
    };
  };
  var _subscribeEvent = function(handler, v) {
    return _subscribeNode(handler, v);
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
    var bind7 = bind(Bind1);
    var liftEffect5 = liftEffect(dictMonadEffect);
    var discard12 = discard3(Bind1);
    var pure13 = pure(Monad0.Applicative0());
    if (enabled) {
      return function(name16) {
        return function(action2) {
          return bind7(liftEffect5(function() {
            return begin(name16);
          }))(function(mark) {
            return bind7(action2)(function(result) {
              return discard12(liftEffect5(function() {
                return end(mark);
              }))(function() {
                return pure13(result);
              });
            });
          });
        };
      };
    }
    ;
    return function(v) {
      return function(action2) {
        return action2;
      };
    };
  };

  // output/Specular.Dom.Builder/index.js
  var $runtime_lazy4 = function(name16, moduleName, init) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name16 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init();
      state3 = 2;
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
    return function(parent2) {
      return function(v) {
        return function __do4() {
          var actionsMutable = emptyDelayed();
          var env = {
            parent: parent2,
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
    onCleanup: function(action2) {
      return mkBuilder(function(env) {
        return pushDelayed(env.cleanup)(action2);
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
  var pure12 = /* @__PURE__ */ pure(applicativeBuilder);
  var $lazy_monadReplaceBuilder = /* @__PURE__ */ $runtime_lazy4("monadReplaceBuilder", "Specular.Dom.Builder", function() {
    return {
      newSlot: bind1(getEnv)(function(env) {
        return bind1(liftEffect3(createTextNode("")))(function(placeholderBefore) {
          return bind1(liftEffect3(createTextNode("")))(function(placeholderAfter) {
            return discard22(liftEffect3(appendChild(placeholderBefore)(env.parent)))(function() {
              return discard22(liftEffect3(appendChild(placeholderAfter)(env.parent)))(function() {
                return bind1(liftEffect3($$new(mempty1)))(function(cleanupRef) {
                  var replace3 = function(inner) {
                    return measure2("slot replace")(function __do4() {
                      measure2("slot remove DOM")(removeAllBetween(placeholderBefore)(placeholderAfter))();
                      var fragment = createDocumentFragment();
                      var v = measure2("slot init")(runBuilderWithUserEnv(env.userEnv)(fragment)(inner))();
                      join2(read(cleanupRef))();
                      var m_parent = parentNode(placeholderAfter)();
                      (function() {
                        if (m_parent instanceof Just) {
                          insertBefore(fragment)(placeholderAfter)(m_parent.value0)();
                          return write(measure2("slot cleanup")(function __do5() {
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
                  var destroy = function __do4() {
                    removeAllBetween(placeholderBefore)(placeholderAfter)();
                    removeNode(placeholderBefore)();
                    removeNode(placeholderAfter)();
                    return join2(read(cleanupRef))();
                  };
                  var append3 = function __do4() {
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
                    return pure12(new Slot(replace3, destroy, append3));
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
  function setProperty(node, property, value13) {
    node[property] = value13;
  }

  // output/Specular.Dom.Widgets.Input/foreign.js
  function getTextInputValue(node) {
    return function() {
      return node.value;
    };
  }

  // output/Specular.Dom.Element/index.js
  var measure3 = /* @__PURE__ */ measure(monadEffectEffect);
  var mempty2 = /* @__PURE__ */ mempty(monoidArray);
  var bind12 = /* @__PURE__ */ bind(bindBuilder);
  var subscribeDyn_2 = /* @__PURE__ */ subscribeDyn_(/* @__PURE__ */ monadFRP(monadEffectBuilder)(monadCleanupBuilder));
  var readDynamic2 = /* @__PURE__ */ readDynamic(monadEffectEffect);
  var unsafeEventTarget = function(e) {
    return e.target;
  };
  var withTargetValue = function(cb) {
    return function(event) {
      return function __do4() {
        var value13 = getTextInputValue(unsafeEventTarget(event))();
        return cb(value13)();
      };
    };
  };
  var text2 = function(str) {
    return mkBuilder$prime(function(env) {
      var node = createTextNode(str)();
      return appendChild(node)(env.parent)();
    });
  };
  var semigroupProp = {
    append: function(v) {
      return function(v1) {
        return function(node, cleanups) {
          v(node, cleanups);
          return v1(node, cleanups);
        };
      };
    }
  };
  var append13 = /* @__PURE__ */ append(semigroupProp);
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
  var attr = function(name16) {
    return function(value13) {
      return attrs(singleton5(name16)(value13));
    };
  };
  var _subscribeDyn = function(cleanups, dyn, handler) {
    var unsub = _subscribeEvent(runEffectFn1(handler), changed(dyn));
    pushDelayed(cleanups)(unsub)();
    var initialValue = readDynamic2(dyn)();
    return handler(initialValue);
  };
  var propertyD = function(property) {
    return function(dyn) {
      return function(node, cleanups) {
        return _subscribeDyn(cleanups, dyn, function(v) {
          return setProperty(node, property, v);
        });
      };
    };
  };
  var valueD = /* @__PURE__ */ propertyD("value");
  var bindValueOnChange = function(v) {
    return append13(valueD(v.value0))(on("change")(withTargetValue(function($80) {
      return v.value1($$const($80));
    })));
  };

  // output/Router/index.js
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindBuilder);
  var voidLeft2 = /* @__PURE__ */ voidLeft(matchFunctor);
  var Index = /* @__PURE__ */ function() {
    function Index2() {
    }
    ;
    Index2.value = new Index2();
    return Index2;
  }();
  var Counter = /* @__PURE__ */ function() {
    function Counter2() {
    }
    ;
    Counter2.value = new Counter2();
    return Counter2;
  }();
  var Booker = /* @__PURE__ */ function() {
    function Booker2() {
    }
    ;
    Booker2.value = new Booker2();
    return Booker2;
  }();
  var Temperature = /* @__PURE__ */ function() {
    function Temperature2() {
    }
    ;
    Temperature2.value = new Temperature2();
    return Temperature2;
  }();
  var wrapperComponent = function(inner) {
    return el_("div")(discard5(el("a")([attr("href")("/index.html")])(text2("back")))(function() {
      return inner;
    }));
  };
  var routesComponent = /* @__PURE__ */ function() {
    var links = ["counter", "booker", "temperature"];
    return sequence_(applicativeBuilder)(foldableArray)(map(functorArray)(function(name16) {
      return el_("div")(el("a")([attr("href")("#" + name16)])(text2(name16)));
    })(links));
  }();
  var route = /* @__PURE__ */ function() {
    return oneOf(foldableArray)(matchPlus)([voidLeft2(lit("counter"))(Counter.value), voidLeft2(lit("booker"))(Booker.value), voidLeft2(lit("temperature"))(Temperature.value)]);
  }();

  // output/JSURI/foreign.js
  function _decodeURIComponent(fail, succeed, input) {
    try {
      return succeed(decodeURIComponent(input));
    } catch (err) {
      return fail(err);
    }
  }

  // output/JSURI/index.js
  var $$decodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_decodeURIComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Control.Alternative/index.js
  var guard = function(dictAlternative) {
    var pure6 = pure(dictAlternative.Applicative0());
    var empty5 = empty(dictAlternative.Plus1());
    return function(v) {
      if (v) {
        return pure6(unit);
      }
      ;
      if (!v) {
        return empty5;
      }
      ;
      throw new Error("Failed pattern match at Control.Alternative (line 48, column 1 - line 48, column 54): " + [v.constructor.name]);
    };
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i = 0; i < n; ++i) {
            var o = iter.next();
            if (o.done)
              return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum1 = fromEnum(dictBoundedEnum);
    var bottom2 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum1(bottom2);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.CodePoints/index.js
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map7 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons = function(s) {
    var v = length2(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map7(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length2(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length5 = function($74) {
    return length3(toCodePointArray($74));
  };
  var indexOf2 = function(p) {
    return function(s) {
      return map7(function(i) {
        return length5(take(i)(s));
      })(indexOf(p)(s));
    };
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton4($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton6 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(v) {
    return function(v1) {
      if (v < 1) {
        return "";
      }
      ;
      var v2 = uncons(v1);
      if (v2 instanceof Just) {
        return singleton6(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
      }
      ;
      return v1;
    };
  };
  var take2 = /* @__PURE__ */ _take(takeFallback);
  var splitAt2 = function(i) {
    return function(s) {
      var before = take2(i)(s);
      return {
        before,
        after: drop(length2(before))(s)
      };
    };
  };
  var drop2 = function(n) {
    return function(s) {
      return drop(length2(take2(n)(s)))(s);
    };
  };

  // output/Routing.Parser/index.js
  var map8 = /* @__PURE__ */ map(functorArray);
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindMaybe);
  var guard2 = /* @__PURE__ */ guard(alternativeMaybe);
  var apply3 = /* @__PURE__ */ apply(applyMaybe);
  var map1 = /* @__PURE__ */ map(functorMaybe);
  var fromFoldable4 = /* @__PURE__ */ fromFoldable2(ordString)(foldableArray);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var fromFoldable1 = /* @__PURE__ */ fromFoldable(foldableArray);
  var append2 = /* @__PURE__ */ append(semigroupList);
  var map23 = /* @__PURE__ */ map(functorList);
  var fromFoldable22 = /* @__PURE__ */ fromFoldable(foldableMaybe);
  var parseQueryPart = function(decoder) {
    var part2tuple = function(input) {
      var keyVal = map8(decoder)(split("=")(input));
      return discard6(guard2(length3(keyVal) <= 2))(function() {
        return apply3(map1(Tuple.create)(head2(keyVal)))(index(keyVal)(1));
      });
    };
    var $27 = map1(fromFoldable4);
    var $28 = traverse2(part2tuple);
    var $29 = split("&");
    return function($30) {
      return $27($28($29($30)));
    };
  };
  var parse = function(decoder) {
    return function(hash2) {
      var pathParts = function(str) {
        var parts = fromFoldable1(map8(function($31) {
          return Path.create(decoder($31));
        })(split("/")(str)));
        var v2 = unsnoc(parts);
        if (v2 instanceof Just && (v2.value0.last instanceof Path && v2.value0.last.value0 === "")) {
          return v2.value0.init;
        }
        ;
        return parts;
      };
      var v = map1(flip(splitAt2)(hash2))(indexOf2("?")(hash2));
      if (v instanceof Just) {
        return append2(pathParts(v.value0.before))(map23(Query.create)(fromFoldable22(parseQueryPart(decoder)(drop2(1)(v.value0.after)))));
      }
      ;
      if (v instanceof Nothing) {
        return pathParts(hash2);
      }
      ;
      throw new Error("Failed pattern match at Routing.Parser (line 32, column 3 - line 37, column 21): " + [v.constructor.name]);
    };
  };

  // output/Routing/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var matchWith = function(decoder) {
    return function(matcher) {
      var $2 = runMatch(matcher);
      var $3 = parse(decoder);
      return function($4) {
        return $2($3($4));
      };
    };
  };
  var match = /* @__PURE__ */ matchWith(function($6) {
    return fromJust4($$decodeURIComponent($6));
  });

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.Location/foreign.js
  function hash(location2) {
    return function() {
      return location2.hash;
    };
  }

  // output/Web.HTML.Window/foreign.js
  function location(window2) {
    return function() {
      return window2.location;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.HashChangeEvent.EventTypes/index.js
  var hashchange = "hashchange";

  // output/Routing.Hash/index.js
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var map9 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindEffect);
  var join3 = /* @__PURE__ */ join(bindEffect);
  var apply4 = /* @__PURE__ */ apply(applyEffect);
  var pure5 = /* @__PURE__ */ pure(applicativeEffect);
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var getHash = /* @__PURE__ */ bind4(/* @__PURE__ */ bind4(windowImpl)(location))(/* @__PURE__ */ function() {
    var $16 = map9(function() {
      var $18 = fromMaybe("");
      var $19 = stripPrefix("#");
      return function($20) {
        return $18($19($20));
      };
    }());
    return function($17) {
      return $16(hash($17));
    };
  }());
  var foldHashes = function(cb) {
    return function(init) {
      return function __do4() {
        var ref = bindFlipped3($$new)(bindFlipped3(init)(getHash))();
        var win = map9(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return bindFlipped3(flip(write)(ref))(join3(apply4(map9(cb)(read(ref)))(getHash)));
        })();
        addEventListener2(hashchange)(listener)(false)(win)();
        return removeEventListener(hashchange)(listener)(false)(win);
      };
    };
  };
  var matchesWith = function(dictFoldable) {
    var indexl2 = indexl(dictFoldable);
    return function(parser) {
      return function(cb) {
        var go2 = function(a) {
          var $21 = maybe(pure5(a))(function(b) {
            return voidRight2(new Just(b))(cb(a)(b));
          });
          var $22 = indexl2(0);
          return function($23) {
            return $21($22(parser($23)));
          };
        };
        return foldHashes(go2)(go2(Nothing.value));
      };
    };
  };
  var matches = /* @__PURE__ */ function() {
    var $24 = matchesWith(foldableEither);
    return function($25) {
      return $24(match($25));
    };
  }();

  // output/Specular.Dom.Widget/foreign.js
  function documentBody() {
    return document.body;
  }

  // output/Specular.Dom.Widget/index.js
  var bind5 = /* @__PURE__ */ bind(bindBuilder);
  var newSlot2 = /* @__PURE__ */ newSlot(monadReplaceBuilder);
  var discard7 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard7(bindBuilder);
  var onCleanup3 = /* @__PURE__ */ onCleanup(monadCleanupBuilder);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectBuilder);
  var map10 = /* @__PURE__ */ map(functorEffect);
  var runWidgetInNode = function(parent2) {
    return function(widget) {
      return runBuilder(parent2)(bind5(newSlot2)(function(slot) {
        return discard1(onCleanup3(destroySlot(slot)))(function() {
          return liftEffect4(replaceSlot(slot)(widget));
        });
      }));
    };
  };
  var runWidgetInBody = function(widget) {
    return function __do4() {
      var body = documentBody();
      return runWidgetInNode(body)(widget)();
    };
  };
  var runMainWidgetInNode = function(parent2) {
    return function(widget) {
      return map10(fst)(runWidgetInNode(parent2)(widget));
    };
  };
  var runMainWidgetInBody = function(widget) {
    return function __do4() {
      var body = documentBody();
      return runMainWidgetInNode(body)(widget)();
    };
  };
  var emptyWidget = /* @__PURE__ */ pure(applicativeBuilder)(unit);

  // output/Tasks.Booker/index.js
  var component = /* @__PURE__ */ el_("div")(/* @__PURE__ */ discard(discardUnit)(bindBuilder)(/* @__PURE__ */ el_("div")(/* @__PURE__ */ el("input")([/* @__PURE__ */ attr("type")("text")])(emptyWidget)))(function() {
    return el_("div")(el("input")([attr("type")("text")])(emptyWidget));
  }));

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
  var value12 = function(v) {
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
  var map11 = /* @__PURE__ */ map(functorDynamic);
  var modify5 = /* @__PURE__ */ modify4(monadEffectEffect);
  var add3 = /* @__PURE__ */ add(semiringInt);
  var discard8 = /* @__PURE__ */ discard(discardUnit)(bindBuilder);
  var show2 = /* @__PURE__ */ show(showInt);
  var readCounters = function(cs) {
    return function(i) {
      return map11(function() {
        var $13 = fromMaybe(0);
        return function($14) {
          return $13(function(v) {
            return index(v)(i);
          }($14));
        };
      }())(value12(cs));
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
  var component2 = /* @__PURE__ */ bind(bindBuilder)(/* @__PURE__ */ mkCounters(monadEffectBuilder)(/* @__PURE__ */ replicate(3)(0)))(function(counters) {
    var subtractCb = function(i) {
      return modifyCounters(counters)(i)(add3(-1 | 0));
    };
    var addCb = function(i) {
      return modifyCounters(counters)(i)(add3(1));
    };
    return discard8(el_("div")(discard8(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(0))])(text2("+")))(function() {
      return discard8(dynText(map11(show2)(readCounters(counters)(0))))(function() {
        return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(0))])(text2("-"));
      });
    })))(function() {
      return discard8(el_("div")(discard8(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(1))])(text2("+")))(function() {
        return discard8(dynText(map11(show2)(readCounters(counters)(1))))(function() {
          return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(1))])(text2("-"));
        });
      })))(function() {
        return el_("div")(discard8(el("button")([class_("btn"), attr("type")("button"), onClick_(addCb(2))])(text2("+")))(function() {
          return discard8(dynText(map11(show2)(readCounters(counters)(2))))(function() {
            return el("button")([class_("btn"), attr("type")("button"), onClick_(subtractCb(2))])(text2("-"));
          });
        }));
      });
    });
  });

  // output/Tasks.Temperature/index.js
  var bind6 = /* @__PURE__ */ bind(bindBuilder);
  var $$new3 = /* @__PURE__ */ $$new2(monadEffectBuilder);
  var discard9 = /* @__PURE__ */ discard(discardUnit)(bindBuilder);
  var component3 = /* @__PURE__ */ bind6(/* @__PURE__ */ $$new3("0.0"))(function(v) {
    return bind6($$new3("32.0"))(function(v1) {
      return el_("div")(discard9(el_("div")(discard9(el("input")([attr("type")("text"), bindValueOnChange(v)])(emptyWidget))(function() {
        return el_("span")(text2(" Celsius"));
      })))(function() {
        return el_("div")(discard9(el("input")([attr("type")("text"), bindValueOnChange(v1)])(emptyWidget))(function() {
          return el_("span")(text2(" Fahrenheit"));
        }));
      }));
    });
  });

  // output/Main/index.js
  var join4 = /* @__PURE__ */ join(bindEffect);
  var main = function __do3() {
    runWidgetInBody(routesComponent)();
    return join4(matches(route)(function(v) {
      return function(r) {
        return runMainWidgetInBody(wrapperComponent(function() {
          if (r instanceof Counter) {
            return component2;
          }
          ;
          if (r instanceof Booker) {
            return component;
          }
          ;
          if (r instanceof Temperature) {
            return component3;
          }
          ;
          if (r instanceof Index) {
            return routesComponent;
          }
          ;
          throw new Error("Failed pattern match at Main (line 16, column 75 - line 20, column 51): " + [r.constructor.name]);
        }()));
      };
    }))();
  };

  // <stdin>
  main();
})();
