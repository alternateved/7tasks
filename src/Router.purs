module Router
  ( Router(..)
  , route
  , routesComponent
  , wrapperComponent
  ) where

import Prelude

import Data.Foldable (oneOf)
import Data.Traversable (sequence_)
import Routing.Match (Match, lit)
import Specular.Dom.Element (attr, el, el_, text)
import Specular.Dom.Widget (Widget)

data Router
  = Index
  | Counter
  | Booker
  | Temperature

route :: Match Router
route =
  oneOf
    [ lit "counter" $> Counter
    , lit "booker" $> Booker
    , lit "temperature" $> Temperature
    ]

-- routesComponent :: Widget Unit

routesComponent :: Widget Unit
routesComponent = do
  let links = [ "counter", "booker", "temperature" ]
  sequence_ $ ((\name -> el_ "div" $  el "a" [ attr "href" ("#" <> name) ] $ text name) <$> links)

wrapperComponent :: Widget Unit -> Widget Unit
wrapperComponent inner =
  el_ "div" do
    el "a" [ attr "href" "/index.html" ] $ text "back"
    inner