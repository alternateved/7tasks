module Tasks.Temperature where

import Prelude

import Effect (Effect)
import Specular.Dom.Element (attr, bindValueOnChange, el, el_, text)
import Specular.Dom.Widget (emptyWidget, runMainWidgetInBody)
import Specular.Ref (Ref)
import Specular.Ref as Ref

class Convertible a b where
  to' :: a -> b
  from' :: b -> a

newtype Celsius = Celsius Number
newtype Fahrenheit = Fahrenheit Number

instance parseCelsius :: Convertible (Maybe Celsius) String where
  to' (Just (Celsius v)) = show v
  to' (Nothing) = ""
  from' str = Celsius <$> (fromString str)

instance parseFahrenheit :: Convertible (Maybe Fahrenheit) String where
  to' (Just (Fahrenheit v)) = show v
  to' (Nothing) = ""
  from' str = Fahrenheit <$> (fromString str)

instance celsiusFahrenheit :: Convertible Celsius Fahrenheit where
  to' (Celsius v) = Fahrenheit $ v * (9.0 / 5.0) + 32.0
  from' (Fahrenheit v) = Celsius $ (v - 32.0) * (5.0 / 9.0)

temperatureInput :: forall a. Ref String -> Widget a -> Widget a
temperatureInput bound =
  el "input" [ attr "type" "text", bindValueOnChange bound ]

defaultWith :: forall a. a -> Maybe a -> a
defaultWith fallback = case _ of
  Just x -> x
  Nothing -> fallback


component :: Effect Unit
component = do
  runMainWidgetInBody do
    celsius <- Ref.new $ Celsius 0.0
    let fahrenheit = imap to' from' celsius
    celsius :: Ref String <- Ref.new "0.0"
    fahrenheit :: Ref String <- Ref.new "32.0"

    el_ "div" do
      el_ "strong" $ text "Temperature Converter"

    el_ "div" do
      temperatureInput (imap (Just >>> to') (from' >>> defaultWith (Celsius 0.0)) celsius) emptyWidget
      el_ "span" $ text " Celsius"

    el_ "div" do
      temperatureInput (imap (Just >>> to') (from' >>> defaultWith (Fahrenheit 0.0)) fahrenheit) emptyWidget
      el_ "span" $ text " Fahrenheit"
