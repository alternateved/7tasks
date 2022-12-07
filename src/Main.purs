module Main where

import Prelude (Unit)

import Effect (Effect)
import Tasks.Counter as Counter
import Tasks.Temperature as Temperature

main :: Effect Unit
main = Counter.component
