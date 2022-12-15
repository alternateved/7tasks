module Main where

import Prelude

import Data.Foldable (oneOf)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Index as Index
import Routing.Hash (matches)
import Routing.Match (Match, lit)
import Specular.Dom.Widget (runMainWidgetInBody)
import Tasks.Counter as Counter
import Tasks.Temperature as Temperature

data Route
  = Index
  | Counter
  | Temperature

index :: Match Route
index = Index <$ lit "index"

counter :: Match Route
counter = Counter <$  lit "counter"

temperature :: Match Route
temperature = Temperature <$ lit "temperature"

route :: Match (Maybe Route)
route =
  oneOf
  [ Just <$> index
  , Just <$> counter
  , Just <$> temperature
  , pure Nothing
  ]

main :: Effect Unit
main = do
   join $ matches route \_ newRoute -> case newRoute of
      Nothing -> runMainWidgetInBody $ Index.component
      Just Index -> runMainWidgetInBody $ Index.component
      Just Counter -> runMainWidgetInBody $ Counter.component
      Just Temperature -> runMainWidgetInBody $ Temperature.component
    

