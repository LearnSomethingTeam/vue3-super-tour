import type { Modifier, Placement } from '@popperjs/core';

export type ButtonID = 'buttonSkip' | 'buttonPrevious' | 'buttonNext' | 'buttonStop';

export type EnabledButtons = Record<ButtonID, boolean>;

export type Labels = Record<ButtonID, string>;

export interface Options {
  labels?: Labels;
  enabledButtons?: EnabledButtons;
  enabledNavigationKeys?: {
    ESCAPE: boolean;
    ARROW_RIGHT: boolean;
    ARROW_LEFT: boolean;
  };
}

export interface StepOptions {
  enabledButtons?: EnabledButtons;
  modifiers?: Array<Partial<Modifier<any,any>>>;
  placement?: Placement;
}

export interface Step {
  target: string;
  header?: {
    title?: string;
  },
  content: string;
  params?: {
    placement?: Placement;
  },
  duration?: unknown;
  offset?: unknown;
  before?: (triggeredBy: 'start' | 'previous' | 'next') => Promise<void>;
}

export interface Tour {
  step: Step;
  start: (startStep: string) => Promise<void>;
  isRunning: boolean;
  customOptions: Options;
  currentStep: number;
  isFirst: boolean;
  isLast: boolean;
  previousStep: () => Promise<void>;
  nextStep: () => Promise<void>;
  stop: () => void;
  skip: () => void;
  finish: () => void;
}