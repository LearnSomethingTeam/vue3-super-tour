<template>
  <!-- <teleport to="body"> -->
    <!-- <div class="tour-mask" v-show="displayMask">
      <div class="tour-focus-container" v-bind:style="styleFocusContainer"></div>
    </div> -->
    <div class="v-step" :id="'v-step-' + hash" ref="VStep">
      <slot name="header">
        <div v-if="header" class="v-step__header">
          <div v-if="header.title" v-html="header.title"></div>
        </div>
      </slot>

      <slot name="content">
        <div class="v-step__content">
          <div v-if="content" v-html="content"></div>
          <div v-else>props is a demo step! The id of props step is {{ hash }} and it targets {{ target }}.</div>
        </div>
      </slot>

      <slot name="actions">
        <div class="v-step__buttons">
          <button @click.prevent="$emit('skip')" v-if="!isLast && buttons?.buttonSkip" class="v-step__button v-step__button-skip">{{ buttons.buttonSkip }}</button>
          <button @click.prevent="$emit('previous-step')" v-if="!isFirst && buttons?.buttonPrevious" class="v-step__button v-step__button-previous">{{ buttons.buttonPrevious }}</button>
          <button @click.prevent="$emit('next-step')" v-if="!isLast && buttons?.buttonNext" class="v-step__button v-step__button-next">{{ buttons.buttonNext }}</button>
          <button @click.prevent="$emit('finish')" v-if="isLast && buttons?.buttonStop" class="v-step__button v-step__button-stop">{{ buttons.buttonStop }}</button>
        </div>
      </slot>

      <div class="v-step__arrow" :class="{ 'v-step__arrow--dark': header && header.title }"></div>
    </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
export default { name: 'v-step' }
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type PropType, type Ref } from 'vue'
import { createPopper } from '@popperjs/core'
import jump from 'jump.js'
import sum from 'hash-sum'

import { DEFAULT_STEP_OPTIONS, HIGHLIGHT } from '../constants'
import type { Step } from '../lib';


const emit = defineEmits(['stop', 'finish', 'skip', 'previous-step', 'next-step', 'target-not-found']);

const {
  target,
  header,
  content,
  params: propParams,
  duration,
  offset,
  before,
  isFirst,
  isLast,
  buttons,
  displayMask,
  enableScrolling: propEnableScrolling,
  highlight,
  stopOnFail,
  debug,
} = defineProps<Step>();

const hash = sum(target)
const targetElement = document.querySelector(target) as HTMLElement

const params = computed(() => {
  return {
    ...DEFAULT_STEP_OPTIONS,
    ...{ highlight }, // Use global tour highlight setting first
    ...propParams // Then use local step parameters if defined
  }
})


const VStep: Ref<HTMLElement | null> = ref(null)

const createStep = () => {
  if (debug) {
    console.log('[Vue Tour] The target element ' + target + ' of .v-step[id="' + hash + '"] is:', targetElement)
  }

  if (targetElement) {
    enableScrolling()
    createHighlight()

    createPopper(
      targetElement,
      VStep.value as HTMLElement,
      params.value
    )
  } else {
    if (debug) {
      console.error('[Vue Tour] The target element ' + target + ' of .v-step[id="' + hash + '"] does not exist!')
    }
    emit('target-not-found', target);
    if (stopOnFail) {
      emit('stop');
    }
  }
}

const enableScrolling = () => {
  if (propEnableScrolling) {
    if (duration !== undefined || offset !== undefined) {
      let jumpOptions = {
        duration: duration ?? 1000,
        offset: offset ?? 0,
        callback: undefined,
        a11y: false
      }

      jump(targetElement, jumpOptions)
    } else {
      // Use the native scroll by default if no scroll options has been defined
      targetElement?.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

const isHighlightEnabled = () => {
  if (debug) {
    console.log(`[Vue Tour] Highlight is ${params.value.highlight ? 'enabled' : 'disabled'} for .v-step[id="${hash}"]`)
  }
  return params.value.highlight
}

const createHighlight = () => {
  if (isHighlightEnabled() && targetElement) {
    document.body.classList.add(HIGHLIGHT.CLASSES.ACTIVE)
    const transitionValue = window.getComputedStyle(targetElement).getPropertyValue('transition')

    // Make sure our background doesn't flick on transitions
    if (transitionValue !== 'all 0s ease 0s') {
      targetElement.style.transition = `${transitionValue}, ${HIGHLIGHT.TRANSITION}`
    }

    targetElement.classList.add(HIGHLIGHT.CLASSES.TARGET_HIGHLIGHTED)
    // The element must have a position, if it doesn't have one, add a relative position class
    if (!targetElement.style.position) {
      targetElement.classList.add(HIGHLIGHT.CLASSES.TARGET_RELATIVE)
    }
  } else {
    document.body.classList.remove(HIGHLIGHT.CLASSES.ACTIVE)
  }
}

const removeHighlight = () => {
  if (isHighlightEnabled()) {
    const currentTransition = targetElement.style.transition
    targetElement.classList.remove(HIGHLIGHT.CLASSES.TARGET_HIGHLIGHTED)
    targetElement.classList.remove(HIGHLIGHT.CLASSES.TARGET_RELATIVE)
    // Remove our transition when step is finished.
    if (currentTransition.includes(HIGHLIGHT.TRANSITION)) {
      setTimeout(() => {
        targetElement.style.transition = currentTransition.replace(`, ${HIGHLIGHT.TRANSITION}`, '')
      }, 0)
    }
  }
}

onMounted(createStep)

onUnmounted(removeHighlight)
</script>

<style lang="scss" scoped>
  .v-step {
    background: #50596c; /* #ffc107, #35495e */
    color: white;
    max-width: 320px;
    border-radius: 3px;
    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
    padding: 1rem;
    text-align: center;
    z-index: 10000;
  }

  .v-step .v-step__arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 0.5rem;
  }

  .v-step .v-step__arrow {
    border-color: #50596c; /* #ffc107, #35495e */

    &--dark {
      border-color: #454d5d;
    }
  }

  .v-step[x-placement^="top"] {
    margin-bottom: 0.5rem;
  }

  .v-step[x-placement^="top"] .v-step__arrow {
    border-width: 0.5rem 0.5rem 0 0.5rem;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    bottom: -0.5rem;
    left: calc(50% - 1rem);
    margin-top: 0;
    margin-bottom: 0;
  }

  .v-step[x-placement^="bottom"] {
    margin-top: 0.5rem;
  }

  .v-step[x-placement^="bottom"] .v-step__arrow {
    border-width: 0 0.5rem 0.5rem 0.5rem;
    border-left-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    top: -0.5rem;
    left: calc(50% - 1rem);
    margin-top: 0;
    margin-bottom: 0;
  }

  .v-step[x-placement^="right"] {
    margin-left: 0.5rem;
  }

  .v-step[x-placement^="right"] .v-step__arrow {
    border-width: 0.5rem 0.5rem 0.5rem 0;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    left: -0.5rem;
    top: calc(50% - 1rem);
    margin-left: 0;
    margin-right: 0;
  }

  .v-step[x-placement^="left"] {
    margin-right: 0.5rem;
  }

  .v-step[x-placement^="left"] .v-step__arrow {
    border-width: 0.5rem 0 0.5rem 0.5rem;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    right: -0.5rem;
    top: calc(50% - 1rem);
    margin-left: 0;
    margin-right: 0;
  }

  /* Custom */

  .v-step__header {
    margin: -1rem -1rem 0.5rem;
    padding: 0.5rem;
    background-color: #454d5d;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .v-step__content {
    margin: 0 0 1rem 0;
  }

  .v-step__button {
    background: transparent;
    border: .05rem solid white;
    border-radius: .1rem;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: .8rem;
    height: 1.8rem;
    line-height: 1rem;
    outline: none;
    margin: 0 0.2rem;
    padding: .35rem .4rem;
    text-align: center;
    text-decoration: none;
    transition: all .2s ease;
    vertical-align: middle;
    white-space: nowrap;

    &:hover {
      background-color: rgba(white, 0.95);
      color: #50596c;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.5);

    .tour-focus-container {
      border-radius: 4px;
      transition:opacity 0.2s;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 1;
      pointer-events: auto;
      box-shadow: 0px 0px 0px 9999px rgba(17,55,80,0.4), 0px 0px 15px rgba(0,0,0,0.5);
    }
  }
</style>
