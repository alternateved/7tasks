let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.4-20221207/packages.dhall
        sha256:2ae34b92177adee8938984859e554ef43b0d68736717856edb90effda076aa2a

in  upstream
  with specular =
    { dependencies =
      [ "prelude"
      , "aff"
      , "typelevel-prelude"
      , "record"
      , "unsafe-reference"
      , "random"
      , "debug"
      , "foreign-object"
      , "contravariant"
      , "avar"
      ]
    , repo = "https://github.com/restaumatic/purescript-specular.git"
    , version = "master"
    }
