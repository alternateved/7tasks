module Tasks.Counter where

import Prelude

import Data.Array (modifyAt, replicate, (!!))
import Data.Maybe (fromMaybe)
import Effect (Effect)
import Effect.Class (class MonadEffect)
import Specular.Dom.Element (attr, class_, dynText, el, el_, onClick_, text)
import Specular.Dom.Widget (Widget)
import Specular.FRP (Dynamic)
import Specular.Ref (Ref)
import Specular.Ref as Ref

type Counter = Int
type Counters = Ref (Array Counter)

mkCounters :: forall m. MonadEffect m => Array Int -> m Counters
mkCounters = Ref.new

modifyCounters :: Counters -> Int -> (Int -> Int) -> Effect Unit
modifyCounters cs i f = Ref.modify cs f'
  where
  f' xs = fromMaybe [] $ modifyAt i f xs

readCounters :: Counters -> Int -> Dynamic Int
readCounters cs i = fromMaybe 0 <<< (_ !! i) <$> Ref.value cs

component :: Widget Unit
component = do
  -- | Generate list of counters
  counters <- mkCounters $ replicate 3 0

  -- | Subtract 1 from counter value
  let subtractCb i = modifyCounters counters i (add (negate 1))

  -- | Add 1 to counter value
  let addCb i = modifyCounters counters i (add 1)

  -- 1
  el_ "div" do
    el "button" [ class_ "btn", attr "type" "button", onClick_ (addCb 0) ] do
      text "+"

    dynText $ show <$> readCounters counters 0

    el "button" [ class_ "btn", attr "type" "button", onClick_ (subtractCb 0) ] do
      text "-"

  -- 2
  el_ "div" do
    el "button" [ class_ "btn", attr "type" "button", onClick_ (addCb 1) ] do
      text "+"

    dynText $ show <$> readCounters counters 1

    el "button" [ class_ "btn", attr "type" "button", onClick_ (subtractCb 1) ] do
      text "-"

  -- 3
  el_ "div" do
    el "button" [ class_ "btn", attr "type" "button", onClick_ (addCb 2) ] do
      text "+"

    dynText $ show <$> readCounters counters 2

    el "button" [ class_ "btn", attr "type" "button", onClick_ (subtractCb 2) ] do
      text "-"
