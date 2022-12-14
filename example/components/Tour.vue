<template>
  <div>
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div class="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div data-v-step="2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>

    <v-tour
      v-bind="tour"
      @start="startEvent"
      @stop="stopEvent"
      @show="showEvent"
      @hide="hideEvent"
      @skip="skipEvent"
      @finish="finishEvent"
      @prev="prevEvent"
      @next="nextEvent"
      @target-not-found="targetNotFoundEvent"
    />
  </div>
</template>

<script lang="ts">
import type { Tour } from "../../src/lib";

interface Data {
  tour: Tour;
}

export default {
  name: 'my-tour',
  data(): Data {
    return {
      tour: {
        name: 'myTour',
        steps: [
          {
            target: '#v-step-0',  // We're using document.querySelector() under the hood
            title: 'Get Started',
            content: `Discover <strong>Vue 3 Super Tour</strong>!`,
            finish() {
              console.log('finish from first step');
            },
            show() {
              console.log('first step shown');
            },
            hide() {
              console.log('first step hidden');
            },
            next() {
              console.log('next from first step');
            },
            skip() {
              console.log('skip from first step');
            },
            stop() {
              console.log('stopped from first step');
            },
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue 3!',
            finish() {
              console.log('finish from second step');
            },
            show() {
              console.log('second step shown');
            },
            hide() {
              console.log('second step hidden');
            },
            prev() {
              console.log('prev from second step');
            },
            next() {
              console.log('next from second step');
            },
            skip() {
              console.log('skip from second step');
            },
            stop() {
              console.log('stopped from second step');
            },
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            },
            finish() {
              console.log('finish from third step');
            },
            show() {
              console.log('third step shown');
            },
            hide() {
              console.log('third step hidden');
            },
            prev() {
              console.log('prev from third step');
            },
            next() {
              console.log('next from third step');
            },
            skip() {
              console.log('skip from third step');
            },
            stop() {
              console.log('stopped from third step');
            },
          },
          {
            target: '#fdjfksdfjsdkfjasdk',
            content: 'Non-existing target',
            finish() {
              console.log('finish from fourth step');
            },
            show() {
              console.log('fourth step shown');
            },
            hide() {
              console.log('fourth step hidden');
            },
            prev() {
              console.log('prev from fourth step');
            },
            stop() {
              console.log('stopped from fourth step');
            },
            targetNotFound(target: string) {
              console.warn('step targetNotFoundCallback', target);
            }
          }
        ],
        highlight: true,
        start(stepIdx: number) {
          console.log('start callback', stepIdx);
        },
        finish(stepIdx: number) {
          console.log('finish callback', stepIdx);
        },
        show(stepIdx: number) {
          console.log('tour step shown callback', stepIdx);
        },
        hide(stepIdx: number) {
          console.log('tour step hidden callback', stepIdx);
        },
        prev(stepIdx: number) {
          console.log('prev callback', stepIdx);
        },
        next(stepIdx: number) {
          console.log('next callback', stepIdx);
        },
        stop(stepIdx: number) {
          console.log('stop callback', stepIdx);
        },
        targetNotFound(stepIdx: number, target: string) {
          console.warn('targetNotFound callback', stepIdx, target);
        }
      },
    }
  },
  mounted: function () {
    this.$tours['myTour'].start()
  },
  methods: {
    startEvent(stepIdx: number) {
      console.log('start event', stepIdx);
    },
    finishEvent(stepIdx: number) {
      console.log('finish event', stepIdx);
    },
    showEvent(stepIdx: number) {
      console.log('show event', stepIdx);
    },
    hideEvent(stepIdx: number) {
      console.log('hide event', stepIdx);
    },
    stopEvent(stepIdx: number) {
      console.log('stop event', stepIdx);
    },
    prevEvent(stepIdx: number) {
      console.log('prev event', stepIdx);
    },
    nextEvent(stepIdx: number) {
      console.log('next event', stepIdx);
    },
    skipEvent(stepIdx: number) {
      console.log('skip event', stepIdx);
    },
    targetNotFoundEvent(stepIdx: number, target: string) {
      console.warn('target-not-found event', stepIdx, target);
    }
  },
}
</script>
