module Main where

import Prelude

import Effect (Effect)
import Specular.Dom.Element (el_, text)
import Specular.Dom.Widget (runMainWidgetInBody, emptyWidget)
import Tasks.Booker as Booker
import Tasks.Counter as Counter
import Tasks.Temperature as Temperature

main :: Effect Unit
main = do
  runMainWidgetInBody do
    el_ "strong" $ text "Counter"
    el_ "div" $ Counter.component
    el_ "br" $ emptyWidget
    el_ "strong" $ text "Temperature"
    el_ "div" $ Temperature.component
    el_ "br" $ emptyWidget
    el_ "strong" $ text "Flight Booker"
    el_ "div" $ Booker.component
