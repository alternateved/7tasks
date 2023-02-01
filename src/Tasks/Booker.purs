module Tasks.Booker where

import Prelude

import Specular.Dom.Element (attr, el, el_)
import Specular.Dom.Widget (Widget, emptyWidget)

component :: Widget Unit
component = do
  el_ "div" do
    el_ "div" do
      el "input" [ attr "type" "text" ] emptyWidget

    el_ "div" do
      el "input" [ attr "type" "text" ] emptyWidget

