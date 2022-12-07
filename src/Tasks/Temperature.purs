module Tasks.Temperature where

import Prelude

import Effect (Effect)
import Specular.Dom.Element (attr, bindValueOnChange, el, el_, text)
import Specular.Dom.Widget (emptyWidget, runMainWidgetInBody)
import Specular.Ref (Ref)
import Specular.Ref as Ref

newtype Fahrenheit = Fahrenheit Number
newtype Celsius = Celsius Number

derive newtype instance showFahrenheit :: Show Fahrenheit
derive newtype instance showCelsius :: Show Celsius

celsiusToFahrenheit :: Celsius -> Fahrenheit
celsiusToFahrenheit (Celsius c) = Fahrenheit $ c * (9.0 / 5.0) + 32.0

fahrenheitToCelsius :: Fahrenheit -> Celsius
fahrenheitToCelsius (Fahrenheit f) = Celsius $ (f - 32.0) * (5.0 / 9.0)

component :: Effect Unit
component = do
  runMainWidgetInBody do

    celsius :: Ref String <- Ref.new "0.0"
    fahrenheit :: Ref String <- Ref.new "32.0"

    el_ "div" do
      el_ "strong" $ text "Temperature Converter"

    el_ "div" do
      -- | Create an input box for Celsius
      el "input"
        [ attr "type" "text"
        , bindValueOnChange celsius
        ]
        emptyWidget
      el_ "span" $ text " Celsius"

    el_ "div" do
      -- | Create an input box for Fahrenheit
      el "input"
        [ attr "type" "text"
        , bindValueOnChange fahrenheit
        ]
        emptyWidget
      el_ "span" $ text " Fahrenheit"
