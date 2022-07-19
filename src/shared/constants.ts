import type { StepOptions } from "./types"

export const DEFAULT_CALLBACKS = {
  onStart: () => {},
  onPreviousStep: (currentStep: number) => {},
  onNextStep: (currentStep: number) => {},
  onStop: () => {},
  onSkip: () => {},
  onFinish: () => {}
}

export const HIGHLIGHT = {
  CLASSES: {
    ACTIVE: 'v-tour--active',
    TARGET_HIGHLIGHTED: 'v-tour__target--highlighted',
    TARGET_RELATIVE: 'v-tour__target--relative'
  },
  TRANSITION: 'box-shadow 0s ease-in-out 0s',
  useKeyboardNavigation: true,
  startTimeout: 0,
  stopOnTargetNotFound: true
}

export const DEFAULT_STEP_OPTIONS: StepOptions = {
  modifiers: [
    {
      name: 'arrow',
      options: {
        element: '.v-step__arrow'
      }
    },
  ],
  placement: 'bottom'
}

export const KEYS = {
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  ESCAPE: 27
}