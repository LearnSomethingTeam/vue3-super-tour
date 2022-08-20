import type { App } from 'vue';
import type { Modifier, OptionsGeneric } from '@popperjs/core';
import type { ComputedRef, Ref } from 'vue';
export declare type ButtonID = 'buttonSkip' | 'buttonPrevious' | 'buttonNext' | 'buttonStop';
export declare type KeyID = 'ESCAPE' | 'ARROW_LEFT' | 'ARROW_RIGHT';
export declare type EnabledButtons = Record<ButtonID, boolean>;
export declare type Labels = Record<ButtonID, string>;
export declare type StepOptions = Partial<OptionsGeneric<Partial<Modifier<any, any>>>>;
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
    /** Called if previous is chosen on this step */
    prevCallback?: () => void | Promise<void>;
    /** Called if next is chosen on this step */
    nextCallback?: () => void | Promise<void>;
    /** Called if skip is chosen on this step */
    skipCallback?: () => void | Promise<void>;
    /** Called if the target is not found */
    targetNotFoundCallback?: (target: string) => void | Promise<void>;
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
    startCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called when the tour is finished */
    finishCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called if previous is chosen on the current step */
    prevCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called if next is chosen on the current step */
    nextCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called when the tour is skipped */
    skipCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called any time the tour stops, whether finished or skipped or due to an error */
    stopCallback?: (stepIdx: number) => void | Promise<void>;
    /** Called if the current step's target isn't found */
    targetNotFoundCallback?: (stepIdx: number, target: string) => void | Promise<void>;
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
declare module 'vue' {
    interface ComponentCustomProperties {
        $tours: Record<string, TourState>;
    }
}
declare const _default: (app: App) => void;
export default _default;
