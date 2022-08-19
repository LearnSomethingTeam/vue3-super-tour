# Vue 3 Super Tour

Vue 3 Super Tour is a lightweight, simple and customizable feature tour plugin for use with Vue.js 3. It provides a quick and easy way to guide your users through your application.

We stand on the shoulders of giants: Vue 3 Super Tour was forked from [vue3-tour](https://github.com/alexandreDavid/vue3-tour), which was in turn forked from [vue-tour](https://github.com/pulsardev/vue-tour). The cycle continues.

The "Super" means it has been ported to Typescript and made more Vue-y: using props and events rather than configuration objects and callbacks. It has also been ported from the Options API to the Composition API, which should minimize performance impact. Mostly this fork was made to ease our own build process at [Learn Something](https://github.com/LearnSomethingTeam).

![Vue Tour](./screenshot.gif "Vue Tour")

## Table of Contents

- [Getting Started](#getting-started)
- [Something Missing?](#something-missing)

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

## `before()` UI step functions

If you need to do UI setup work before a step, there's a `before` function you may include in any/each of
your steps. This function will get invoked before the start/next/previous step is rendered. The function must return a promise. The function is invoked when `start`, `nextStep`, and `previousStep` are triggered. When the promise is rejected, it will not move to the next or previous step. If the promise is resolved then it will move in the direction specified.

It's used when you need to change what's shown on the screen between steps. For example, you may want to hide
one set of menus and open a screen or you want to perform an async operation. This is especially useful in single-page applications.

```javascript
steps: [
  {
    target: '#v-step-0',  // We're using document.querySelector() under the hood
    content: `Discover <strong>Vue Tour</strong>!`,
    before: type => new Promise((resolve, reject) => {
      // Time-consuming UI/async operation here
      resolve('foo')
    })
  }
]
```

## Something Missing?

If you have a feature request or found a bug, [let us know](https://github.com/LearnSomethingTeam/vue3-super-tour/issues) by submitting an issue.
