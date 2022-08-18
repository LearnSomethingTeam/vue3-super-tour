<template>
  <div>
    <div id="v-step-0">A DOM element on your page. The first step will pop on this element because its ID is 'v-step-0'.</div>
    <div class="v-step-1">A DOM element on your page. The second step will pop on this element because its ID is 'v-step-1'.</div>
    <div data-v-step="2">A DOM element on your page. The third and final step will pop on this element because its ID is 'v-step-2'.</div>

    <v-tour
      v-bind="tour"
      @start="startEvent"
      @stop="stopEvent"
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
            header: {
              title: 'Get Started',
            },
            content: `Discover <strong>Vue 3 Super Tour</strong>!`,
            nextCallback() {
              console.log('next from first step');
            },
            skipCallback() {
              console.log('skip from first step');
            }
          },
          {
            target: '.v-step-1',
            content: 'An awesome plugin made with Vue.js!',
            prevCallback() {
              console.log('prev from second step');
            },
            nextCallback() {
              console.log('next from second step');
            },
            skipCallback() {
              console.log('skip from second step');
            }
          },
          {
            target: '[data-v-step="2"]',
            content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
            params: {
              placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            },
            prevCallback() {
              console.log('prev from third step');
            },
            nextCallback() {
              console.log('next from third step');
            },
            skipCallback() {
              console.log('skip from third step');
            }
          },
          {
            target: '#fdjfksdfjsdkfjasdk',
            content: 'Non-existing target',
            prevCallback() {
              console.log('prev from fourth step');
            },
            targetNotFoundCallback(target: string) {
              console.warn('step targetNotFoundCallback', target);
            }
          }
        ],
        highlight: true,
        startCallback(stepIdx: number) {
          console.log('startCallback', stepIdx);
        },
        finishCallback(stepIdx: number) {
          console.log('finishCallback', stepIdx);
        },
        stopCallback(stepIdx: number) {
          console.log('stopCallback', stepIdx);
        },
        targetNotFoundCallback(stepIdx: number, target: string) {
          console.warn('targetNotFoundCallback', stepIdx, target);
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
