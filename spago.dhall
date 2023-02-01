{ name = "7tasks"
, dependencies =
  [ "arrays"
  , "console"
  , "effect"
  , "foldable-traversable"
  , "invariant"
  , "maybe"
  , "numbers"
  , "prelude"
  , "specular"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
