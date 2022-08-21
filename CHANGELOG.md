## 0.6.0
* Shorten callback names
* Introduce Step.shown, Step.hidden, Tour.stepShown, and Tour.stepHidden callbacks and corresponding events.

## 0.5.3
* Declare type in 'vue' module as specified in official docs, see https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties

## 0.5.2
* Declare type of $tours

## 0.5.1
* Add missing build artifacts.

## 0.5.0
This release unifies the exported API for smoother interaction between template and JS/TS code.
* `Tour` has been renamed `TourState`, representing the live tour element in `$tours`.
* A new `Tour` interface has been introduced, and `Step` has been adapted, such that `Tour` and `Step` now capture all props of `VTour` and `VStep` respectively. `<v-tour v-bind="tour">` and `<v-step v-bind="step">` should now be all that's needed.
* Explicitly type emitted events and add relevant parameters
* Return of the callbacks: define equivalent callbacks for all emitted `v-tour` and `v-step` events
* Update of example app to demonstrate handling of all events and use of all callbacks
* `step.header.title` was collapsed to just `step.title`, since there was nothing else in `header`

## 0.4.5

Move type declarations into root, allowing their direct export

## 0.4.4

Attempt to wildcard export types

## 0.4.0

* Port to Typescript
* Port to Composition API
* Change all callbacks to emitted events
* Change all configuration object entries possible into Vue props