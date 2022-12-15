module Index where

import Prelude

import Specular.Dom.Element (attr, el, text)
import Specular.Dom.Widget (Widget)

component :: Widget Unit
component = do
  el "a" [attr "href" "counter"] $ do text "counter"
  el "a" [attr "href" "temperature"] $ do text "temperature"

