import type { Tour } from '../lib';
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Tour>>> & {
            onStop?: ((stepIdx: number) => any) | undefined;
            onStart?: ((stepIdx: number) => any) | undefined;
            onFinish?: ((stepIdx: number) => any) | undefined;
            onShow?: ((stepIdx: number) => any) | undefined;
            onHide?: ((stepIdx: number) => any) | undefined;
            onPrev?: ((stepIdx: number) => any) | undefined;
            onNext?: ((stepIdx: number) => any) | undefined;
            onSkip?: ((stepIdx: number) => any) | undefined;
            "onTarget-not-found"?: ((stepIdx: number, target: string) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: ((event: "stop", stepIdx: number) => void) & ((event: "start", stepIdx: number) => void) & ((event: "finish", stepIdx: number) => void) & ((event: "show", stepIdx: number) => void) & ((event: "hide", stepIdx: number) => void) & ((event: "prev", stepIdx: number) => void) & ((event: "next", stepIdx: number) => void) & ((event: "skip", stepIdx: number) => void) & ((event: "target-not-found", stepIdx: number, target: string) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Tour>>> & {
            onStop?: ((stepIdx: number) => any) | undefined;
            onStart?: ((stepIdx: number) => any) | undefined;
            onFinish?: ((stepIdx: number) => any) | undefined;
            onShow?: ((stepIdx: number) => any) | undefined;
            onHide?: ((stepIdx: number) => any) | undefined;
            onPrev?: ((stepIdx: number) => any) | undefined;
            onNext?: ((stepIdx: number) => any) | undefined;
            onSkip?: ((stepIdx: number) => any) | undefined;
            "onTarget-not-found"?: ((stepIdx: number, target: string) => any) | undefined;
        }, {
            start: (startStepIdx?: number) => Promise<void>;
            stop: () => Promise<void>;
            skip: () => Promise<void>;
            finish: () => Promise<void>;
            previousStep: () => Promise<void>;
            nextStep: () => Promise<void>;
            currentStep: import("vue").Ref<number>;
            isRunning: import("vue").ComputedRef<boolean>;
            isFirst: import("vue").ComputedRef<boolean>;
            isLast: import("vue").ComputedRef<boolean>;
            numberOfSteps: import("vue").ComputedRef<number>;
            step: import("vue").ComputedRef<import("../lib").Step>;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            start: (stepIdx: number) => void;
        } & {
            stop: (stepIdx: number) => void;
        } & {
            show: (stepIdx: number) => void;
        } & {
            hide: (stepIdx: number) => void;
        } & {
            skip: (stepIdx: number) => void;
        } & {
            finish: (stepIdx: number) => void;
        } & {
            prev: (stepIdx: number) => void;
        } & {
            next: (stepIdx: number) => void;
        } & {
            "target-not-found": (stepIdx: number, target: string) => void;
        }, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Tour>>> & {
        onStop?: ((stepIdx: number) => any) | undefined;
        onStart?: ((stepIdx: number) => any) | undefined;
        onFinish?: ((stepIdx: number) => any) | undefined;
        onShow?: ((stepIdx: number) => any) | undefined;
        onHide?: ((stepIdx: number) => any) | undefined;
        onPrev?: ((stepIdx: number) => any) | undefined;
        onNext?: ((stepIdx: number) => any) | undefined;
        onSkip?: ((stepIdx: number) => any) | undefined;
        "onTarget-not-found"?: ((stepIdx: number, target: string) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        start: (startStepIdx?: number) => Promise<void>;
        stop: () => Promise<void>;
        skip: () => Promise<void>;
        finish: () => Promise<void>;
        previousStep: () => Promise<void>;
        nextStep: () => Promise<void>;
        currentStep: import("vue").Ref<number>;
        isRunning: import("vue").ComputedRef<boolean>;
        isFirst: import("vue").ComputedRef<boolean>;
        isLast: import("vue").ComputedRef<boolean>;
        numberOfSteps: import("vue").ComputedRef<number>;
        step: import("vue").ComputedRef<import("../lib").Step>;
    }> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Tour>>> & {
    onStop?: ((stepIdx: number) => any) | undefined;
    onStart?: ((stepIdx: number) => any) | undefined;
    onFinish?: ((stepIdx: number) => any) | undefined;
    onShow?: ((stepIdx: number) => any) | undefined;
    onHide?: ((stepIdx: number) => any) | undefined;
    onPrev?: ((stepIdx: number) => any) | undefined;
    onNext?: ((stepIdx: number) => any) | undefined;
    onSkip?: ((stepIdx: number) => any) | undefined;
    "onTarget-not-found"?: ((stepIdx: number, target: string) => any) | undefined;
}, {
    start: (startStepIdx?: number) => Promise<void>;
    stop: () => Promise<void>;
    skip: () => Promise<void>;
    finish: () => Promise<void>;
    previousStep: () => Promise<void>;
    nextStep: () => Promise<void>;
    currentStep: import("vue").Ref<number>;
    isRunning: import("vue").ComputedRef<boolean>;
    isFirst: import("vue").ComputedRef<boolean>;
    isLast: import("vue").ComputedRef<boolean>;
    numberOfSteps: import("vue").ComputedRef<number>;
    step: import("vue").ComputedRef<import("../lib").Step>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    start: (stepIdx: number) => void;
} & {
    stop: (stepIdx: number) => void;
} & {
    show: (stepIdx: number) => void;
} & {
    hide: (stepIdx: number) => void;
} & {
    skip: (stepIdx: number) => void;
} & {
    finish: (stepIdx: number) => void;
} & {
    prev: (stepIdx: number) => void;
} & {
    next: (stepIdx: number) => void;
} & {
    "target-not-found": (stepIdx: number, target: string) => void;
}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {};
});
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
