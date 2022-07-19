<template>
  <div class="v-tour">
    <slot
      :current-step="currentStep"
      :steps="steps"
      @previous-step="previousStep"
      @next-step="nextStep"
      @stop="stop"
      @skip="skip"
      @finish="finish"
      :is-first="isFirst"
      :is-last="isLast"
      :buttons="buttons"
      :highlight="highlight"
      :debug="debug"
    >
      <!--Default slot {{ currentStep }}-->
      <v-step
        v-if="steps[currentStep]"
        :step="steps[currentStep]"
        :key="currentStep"
        @previous-step="previousStep"
        @next-step="nextStep"
        @stop="stop"
        @skip="skip"
        @finish="finish"
        :is-first="isFirst"
        :is-last="isLast"
        :buttons="buttons"
        :highlight="highlight"
        :stop-on-fail="stopOnTargetNotFound"
        :debug="debug"
        @target-not-found="$emit('target-not-found', $event)"
      >
        <!--<div v-if="index === 2" slot="actions">
          <a @click="nextStep">Next step</a>
        </div>-->
      </v-step>
    </slot>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance, defineComponent, type PropType } from 'vue'

import type { ButtonID, KeyID, Step, Tour } from '../shared/types';
import { KEYS } from '../shared/constants'

export default defineComponent({
  name: 'v-tour',
  emits: ['start', 'stop', 'skip', 'finish', 'previous-step', 'next-step', 'target-not-found'],
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      default: () => []
    },
    name: {
      type: String,
      required: true,
    },
    buttons: {
      type: Object as PropType<Record<ButtonID, string | false>>,
      default: {
        buttonSkip: 'Skip tour',
        buttonPrevious: 'Previous',
        buttonNext: 'Next',
        buttonStop: 'Finish'
      },
    },
    debug: Boolean,
    keys: {
      type: Object as PropType<Record<KeyID, boolean>>,
      default: {
        ESCAPE: true,
        ARROW_RIGHT: true,
        ARROW_LEFT: true
      }
    },
    highlight: Boolean,
    startTimeout: {
      type: Number,
      default: 0,
    },
    stopOnTargetNotFound: Boolean,
    useKeyboardNavigation: {
      type: Boolean,
      default: true,
    },
  },
  setup (props, ctx) {
    const currentStep = ref(-1)

    const isRunning = computed(() => currentStep.value > -1 && currentStep.value < numberOfSteps.value)

    const isFirst = computed(() => currentStep.value === 0)

    const isLast = computed(() => currentStep.value === props.steps.length - 1)

    const numberOfSteps = computed(() => props.steps.length)

    const step = computed(() => props.steps[currentStep.value])

    const start = async (startStep: string) => {
      // Wait for the DOM to be loaded, then start the tour
      const startStepIdx = typeof startStep !== 'undefined' ? parseInt(startStep, 10) : 0
      const step = props.steps[startStepIdx]
      let process = () => new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          ctx.emit('start');
          currentStep.value = startStepIdx
          resolve()
        }, props.startTimeout)
      })
      if (step.before) {
        try {
          await step.before('start')
        } catch (e) {
          return Promise.reject(e)
        }
      }
      await process()
      return Promise.resolve()
    }

    const previousStep = async () => {
      let futureStep = currentStep.value - 1
      let process = () => new Promise<void>((resolve, reject) => {
        ctx.emit('previous-step', currentStep.value)
        currentStep.value = futureStep
        resolve()
      })
      if (futureStep > -1) {
        let step = props.steps[futureStep]
        if (step.before) {
          try {
            await step.before('previous')
          } catch (e) {
            return Promise.reject(e)
          }
        }
        await process()
      }
      return Promise.resolve()
    }

    const nextStep = async () => {
      let futureStep = currentStep.value + 1
      let process = () => new Promise<void>((resolve, reject) => {
        ctx.emit('next-step', currentStep.value)
        currentStep.value = futureStep
        resolve()
      })
      if (futureStep < numberOfSteps.value && currentStep.value !== -1) {
        let step = props.steps[futureStep]
        if (step.before) {
          try {
            await step.before('next')
          } catch (e) {
            return Promise.reject(e)
          }
        }
        await process()
      }
      return Promise.resolve()
    }

    const stop = () => {
      ctx.emit('stop');
      document.body.classList.remove('v-tour--active')
      currentStep.value = -1
    }

    const skip = () => {
      ctx.emit('skip');
      stop()
    }

    const finish = () => {
      ctx.emit('finish');
      stop()
    }

    const handleKeyup = (e: KeyboardEvent) => {
      if (props.debug) {
        console.log('[Vue Tour] A keyup event occured:', e)
      }
      switch (e.keyCode) {
        case KEYS.ARROW_RIGHT:
          props.keys.ARROW_RIGHT && nextStep()
          break
        case KEYS.ARROW_LEFT:
          props.keys.ARROW_LEFT && previousStep()
          break
        case KEYS.ESCAPE:
          props.keys.ESCAPE && stop()
          break
      }
    }

    onMounted(() => {
      const tour: Tour = { step, start, isRunning, currentStep, isFirst, isLast, previousStep, nextStep, stop, skip, finish }
      const app = getCurrentInstance()
      app!.appContext.config.globalProperties.$tours[props.name] = tour
      if (props.useKeyboardNavigation) {
        window.addEventListener('keyup', handleKeyup)
      }
    })

    onBeforeUnmount(() => {
      if (props.useKeyboardNavigation) {
        window.removeEventListener('keyup', handleKeyup)
      }
    })

    return { currentStep, isFirst, isLast, previousStep, nextStep, stop, skip, finish }
  }
})
</script>

<style lang="scss">
  body.v-tour--active {
    pointer-events: none;
  }
  .v-tour {
    pointer-events: auto;
  }
  .v-tour__target--highlighted {
    box-shadow: 0 0 0 4px rgba(0,0,0,.4);
    pointer-events: auto;
    z-index: 9999;
  }
  .v-tour__target--relative {
    position: relative;
  }
</style>
