import type { App } from 'vue'

import type { Modifier, OptionsGeneric } from '@popperjs/core';
import type { ComputedRef, Ref } from 'vue';

export type ButtonID = 'buttonSkip' | 'buttonPrevious' | 'buttonNext' | 'buttonStop';

export type KeyID = 'ESCAPE' | 'ARROW_LEFT' | 'ARROW_RIGHT';

export type EnabledButtons = Record<ButtonID, boolean>;

export type Labels = Record<ButtonID, string>;

export type StepOptions = Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;

/**
 * The main interface for steps to be provided to the tour
 */
export interface Step {
  target: string;
  title?: string;
  content: string;
  params?: StepOptions;
  duration?: number;
  offset?: number;
  isFirst?: boolean;
  isLast?: boolean;
  buttons?: Record<ButtonID, string | false>;
  displayMask?: boolean;
  enableScrolling?: boolean;
  highlight?: boolean;
  stopOnFail?: boolean;
  debug?: boolean;

  /** Called any time this step is shown */
  show?: () => void | Promise<void>;

  /** Called any time this step is hidden (after having been shown) */
  hide?: () => void | Promise<void>;

  /** Called if previous is chosen on this step */
  prev?: () => void | Promise<void>;

  /** Called if next is chosen on this step */
  next?: () => void | Promise<void>;

  /** Called if skip is chosen on this step */
  skip?: () => void | Promise<void>;

  /** Called if the target is not found */
  targetNotFound?: (target: string) => void | Promise<void>;
}

export interface Tour {
  steps?: Step[];
  name: string;
  buttons?: Record<ButtonID, string | false>;
  debug?: boolean;
  keys?: Record<KeyID, boolean>;
  highlight?: boolean;
  startTimeout?: number;
  stopOnTargetNotFound?: boolean;
  useKeyboardNavigation?: boolean;

  /** Called when the tour starts */
  start?: (stepIdx: number) => void | Promise<void>;

  /** Called when the tour is finished */
  finish?: (stepIdx: number) => void | Promise<void>;

  /** Called when a step is shown */
  show?: (stepIdx: number) => void | Promise<void>;

  /** Called when a step is hidden (after being shown) */
  hide?: (stepIdx: number) => void | Promise<void>;

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
}

/**
 * A representation of the tour held in $tours
 */
export interface TourState {
  step: ComputedRef<Step>;
  start: (startStepIdx?: number) => Promise<void>;
  isRunning: ComputedRef<boolean>;
  currentStep: Ref<number>;
  isFirst: ComputedRef<boolean>;
  isLast: ComputedRef<boolean>;
  previousStep: () => Promise<void>;
  nextStep: () => Promise<void>;
  stop: () => void;
  skip: () => void;
  finish: () => void;
}

import VTour from './components/VTour.vue'
import VStep from './components/VStep.vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $tours: Record<string, TourState>;
  }
}

export default (app: App) => {
  const tours: Record<string,TourState> = {};
  app.config.globalProperties.$tours = tours;

  app.component(VTour.name, VTour)
  app.component(VStep.name, VStep)
}