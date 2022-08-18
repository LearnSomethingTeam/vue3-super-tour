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
        :key="currentStep"
        :target="step.target"
        :header="step.header"
        :content="step.content"
        :params="step.params"
        :duration="step.duration"
        :offset="step.offset"

        :is-first="isFirst"
        :is-last="isLast"
        :buttons="buttons"
        :highlight="highlight"
        :stop-on-fail="stopOnTargetNotFound"
        :debug="debug"

        :prevCallback="step.prevCallback"
        :nextCallback="step.nextCallback"
        :skipCallback="step.skipCallback"

        @previous-step="previousStep"
        @next-step="nextStep"
        @stop="stop"
        @skip="skip"
        @finish="finish"
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
export default { name: 'v-tour' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'

import type { Tour, TourState } from '../lib';
import { KEYS } from '../constants'

const emit = defineEmits(['start', 'stop', 'skip', 'finish', 'prev', 'next', 'target-not-found']);
const {
  steps = [],
  name,
  buttons = {
    buttonSkip: 'Skip tour',
    buttonPrevious: 'Previous',
    buttonNext: 'Next',
    buttonStop: 'Finish'
  },
  debug,
  keys = {
    ESCAPE: true,
    ARROW_RIGHT: true,
    ARROW_LEFT: true
  },
  highlight,
  startTimeout = 0,
  stopOnTargetNotFound,
  useKeyboardNavigation = true,
  startCallback,
  finishCallback,
  skipCallback,
  stopCallback,
} = defineProps<Tour>();

const currentStep = ref(-1)

const isRunning = computed(() => currentStep.value > -1 && currentStep.value < numberOfSteps.value)

const isFirst = computed(() => currentStep.value === 0)

const isLast = computed(() => currentStep.value === steps.length - 1)

const numberOfSteps = computed(() => steps.length)

const step = computed(() => steps[currentStep.value])

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start(startStepIdx = 0) {
  await timeout(startTimeout);

  await startCallback?.();

  emit('start');
  currentStep.value = startStepIdx
}

async function previousStep() {
  let futureStep = currentStep.value - 1
  if (futureStep > -1) {
    await step.value.prevCallback?.();
    emit('prev', currentStep.value)
    currentStep.value = futureStep
  }
}

async function nextStep() {
  let futureStep = currentStep.value + 1
  if (futureStep < numberOfSteps.value && currentStep.value !== -1) {
    await step.value.nextCallback?.();
    emit('next', currentStep.value)
    currentStep.value = futureStep
  }
}

async function stop() {
  await stopCallback?.();
  emit('stop');
  document.body.classList.remove('v-tour--active')
  currentStep.value = -1
}

async function skip() {
  await step.value.skipCallback?.();
  await skipCallback?.();
  emit('skip');
  stop()
}

async function finish() {
  await finishCallback?.();
  emit('finish');
  stop()
}

function handleKeyup(e: KeyboardEvent) {
  if (debug) {
    console.log('[Vue Tour] A keyup event occured:', e)
  }
  switch (e.keyCode) {
    case KEYS.ARROW_RIGHT:
      keys.ARROW_RIGHT && nextStep()
      break
    case KEYS.ARROW_LEFT:
      keys.ARROW_LEFT && previousStep()
      break
    case KEYS.ESCAPE:
      keys.ESCAPE && stop()
      break
  }
}

defineExpose({ start, stop, skip, finish, previousStep, nextStep, currentStep, isRunning, isFirst, isLast, numberOfSteps, step })

onMounted(() => {
  const tour: TourState = { step, start, isRunning, currentStep, isFirst, isLast, previousStep, nextStep, stop, skip, finish }
  const app = getCurrentInstance()
  app!.appContext.config.globalProperties.$tours[name] = tour
  if (useKeyboardNavigation) {
    window.addEventListener('keyup', handleKeyup)
  }
})

onBeforeUnmount(() => {
  if (useKeyboardNavigation) {
    window.removeEventListener('keyup', handleKeyup)
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
