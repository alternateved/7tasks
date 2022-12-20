module Main where

import Prelude

import Effect (Effect)
import Router (Router(..), route, routesComponent, wrapperComponent)
import Routing.Hash (matches)
import Specular.Dom.Widget (runMainWidgetInBody, runWidgetInBody)
import Tasks.Booker as Booker
import Tasks.Counter as Counter
import Tasks.Temperature as Temperature

main ∷ Effect Unit
main = do
    _ <- runWidgetInBody $ routesComponent
    join $ matches route \_ r -> runMainWidgetInBody $ wrapperComponent $ case r of 
                          Counter -> Counter.component
                          Booker -> Booker.component
                          Temperature -> Temperature.component
                          Index -> routesComponent