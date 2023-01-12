module Main where

import Prelude

import Data.Foldable (for_)
import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Effect (Effect)
import Specular.Dom.Element (attr, el, el_, onClick_, text)
import Specular.Dom.Widget (Widget, runMainWidgetInBody, emptyWidget)
import Specular.FRP (withDynamic_)
import Specular.Ref (Ref)
import Specular.Ref as Ref
import Tasks.Booker as Booker
import Tasks.Counter as Counter
import Tasks.Temperature as Temperature

data PageState = Index | Counter | Temperature | Booker

derive instance Generic PageState _
derive instance Eq PageState
instance Show PageState where
  show = genericShow

main :: Effect Unit
main = do
  pageState <- Ref.new Index
  runMainWidgetInBody do
    renderLinks pageState
    el_ "br" $ emptyWidget
    renderComponent pageState

renderComponent :: Ref PageState -> Widget Unit
renderComponent s = withDynamic_ (Ref.value s) $ \state ->
  case state of
    Index -> emptyWidget
    Counter -> render state Counter.component
    Temperature -> render state Temperature.component
    Booker -> render state Booker.component
  where
  render state c = do
    el_ "strong" $ text $ show state
    el_ "div" c
    el_ "br" $ emptyWidget

renderLinks :: Ref PageState -> Widget Unit
renderLinks state = do
  el "div" [ attr "style" "display: flex; justify-content: space-around;" ]
    $ for_ [ Index, Counter, Temperature, Booker ]
    $ renderLink
  where
  changeState newState = Ref.write state newState
  renderLink newState = el "a" [ attr "href" "#", onClick_ (changeState newState) ] $ text $ show newState
