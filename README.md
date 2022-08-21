# Vue 3 Super Tour

Vue 3 Super Tour is a lightweight, simple and customizable feature tour plugin for use with Vue 3. It provides a quick and easy way to guide your users through your application.

We stand on the shoulders of giants: Vue 3 Super Tour was forked from [vue3-tour](https://github.com/alexandreDavid/vue3-tour), which was in turn forked from [vue-tour](https://github.com/pulsardev/vue-tour). The cycle continues.

The "Super" means it has been ported to Typescript and made more Vue-y: replacing configuration objects with props, and adding emitted events alongside callbacks. It has also been ported from the Options API to the Composition API, which should minimize performance impact. Mostly this fork was made to ease our own build process at [Learn Something](https://github.com/LearnSomethingTeam).

![Vue Tour](./screenshot.gif "Vue Tour")


## Getting Started

You can install `vue3-super-tour` using npm or by downloading the minified build on GitHub.

```
npm install vue3-super-tour
```

Then import the plugin in your application entry point (typically main.js if you used vue-cli to scaffold your project) and tell Vue to use it. Also don't forget to include the styles. You can add the styles provided by default or customize them to your own liking.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Vue3SuperTour from 'vue3-super-tour'

import 'vue3-super-tour/dist/vue3-tour.css'

const app = createApp(App)

app.use(Vue3SuperTour)

app.mount('#app')
```

Finally put a `v-tour` component in your template anywhere in your app (usually in App.vue) and pass it an array of steps.
The `target` property of each step can target a DOM element in any component of your app (as long as it exists in the DOM when the concerned step pops up).

```html
<template>
  <div>
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div class="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div data-v-step="2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>

    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        steps: [
          {
            target: '#v-step-0',  // We're using document.querySelector() under the hood
            title: 'Get Started',
            content: `Discover <strong>Vue 3 Super Tour</strong>!`
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue.js!'
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            }
          }
        ]
      }
    },
    mounted: function () {
      this.$tours['myTour'].start()
    }
  }
</script>
```

For all individual elements you want to add a step on, make sure it can be retrieved with `document.querySelector()`. You can use any selector, an ID, a CSS class, data attributes, etc.
Once this is done and your steps correctly target some DOM elements of your application, you can start the tour by calling the following method.

```javascript
this.$tours['myTour'].start()
```

For a more detailed documentation, checkout the [docs for vue-tour](https://github.com/pulsardev/vue-tour/wiki).

## Event handling

Event handling is possible using Vue event handlers or through callbacks on `Tour` and `Step` and thus `v-tour` and `v-step`, allowing programmatic reaction to any tour events. The callbacks are defined such that sync and async are both handled gracefully, and of course Vue event handlers do the same.

This comes in handy when you need to change what's shown on the screen between steps. For example, you may want to hide
one set of menus and open a view, or maybe you need to perform an async operation. This is especially useful in single-page applications.

Event handling can be as simple as providing a callback in a step:

```typescript
const step = {
  target: '#ok-button',
  content: 'After that, click the OK button',
  nextCallback() {
    console.log('next clicked on OK button step');
  }
}
```

The same could be accomplished by binding the `next` event: `<v-step ... @next="handleNext">`.

Relevant callbacks and events can also be handled at the tour level, capturing events from any step:

```typescript
const tour = {
  name: 'example-tour',
  steps: [
    {
      target: '#ok-button',
      content: 'After that, click the OK button',
    }
  ],
  nextCallback(stepIdx: number) {
    console.log('next was clicked on one of the steps', stepIdx);
  }
};
```

Use of events and callbacks is demonstrated in detail in the example app.

### Tour events

The following events are emitted by `v-tour`:
```typescript
(e: 'start', stepIdx: number): void;
(e: 'stop', stepIdx: number): void;
(e: 'stepShown', stepIdx: number): void;
(e: 'stepHidden', stepIdx: number): void;
(e: 'skip', stepIdx: number): void;
(e: 'finish', stepIdx: number): void;
(e: 'prev', stepIdx: number): void;
(e: 'next', stepIdx: number): void;
(e: 'target-not-found', stepIdx: number, target: string): void;
```

### Tour callbacks

The following callbacks can be bound on `v-tour`:

```typescript
/** Called when the tour starts */
start?: (stepIdx: number) => void | Promise<void>;

/** Called when the tour is finished */
finish?: (stepIdx: number) => void | Promise<void>;

/** Called when a step is shown */
stepShown?: (stepIdx: number) => void | Promise<void>;

/** Called when a step is hidden (after being shown) */
stepHidden?: (stepIdx: number) => void | Promise<void>;

/** Called if previous is chosen on the current step */
prev?: (stepIdx: number) => void | Promise<void>;

/** Called if next is chosen on the current step */
next?: (stepIdx: number) => void | Promise<void>;

/** Called when the tour is skipped */
skip?: (stepIdx: number) => void | Promise<void>;

/** Called any time the tour stops, whether finished or skipped or due to an error */
stop?: (stepIdx: number) => void | Promise<void>;

/** Called if the current step's target isn't found */
targetNotFound?: (stepIdx: number, target: string) => void | Promise<void>;
```

### Step events

The following events are emitted by `v-step`:

```typescript
(e: 'shown'): void;
(e: 'hidden'): void;
(e: 'stop'): void;
(e: 'skip'): void;
(e: 'finish'): void;
(e: 'prev'): void;
(e: 'next'): void;
(e: 'target-not-found', target: string): void;
```

### Step callbacks

The following callbacks can be bound on `v-step`:

```typescript
/** Called any time this step is shown */
shown?: () => void | Promise<void>;

/** Called any time this step is hidden (after having been shown) */
hidden?: () => void | Promise<void>;

/** Called if previous is chosen on this step */
prev?: () => void | Promise<void>;

/** Called if next is chosen on this step */
next?: () => void | Promise<void>;

/** Called if skip is chosen on this step */
skip?: () => void | Promise<void>;

/** Called if the target is not found */
targetNotFound?: (target: string) => void | Promise<void>;
```

## Something Missing?

If you have a feature request or found a bug, [let us know](https://github.com/LearnSomethingTeam/vue3-super-tour/issues) by submitting an issue.
