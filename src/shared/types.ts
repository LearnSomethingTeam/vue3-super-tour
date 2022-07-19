import type { Modifier, OptionsGeneric, Placement } from '@popperjs/core';
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
  header?: {
    title?: string;
  },
  content: string;
  params?: StepOptions;
  duration?: number;
  offset?: number;
  before?: (triggeredBy: 'start' | 'previous' | 'next') => Promise<void>;
}

/**
 * A representation of the tour held in $tours
 */
export interface Tour {
  step: ComputedRef<Step>;
  start: (startStep: string) => Promise<void>;
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