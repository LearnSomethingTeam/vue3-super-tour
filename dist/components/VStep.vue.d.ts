import type { Step } from '../lib';
declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Step>>> & {
            onStop?: (() => any) | undefined;
            onFinish?: (() => any) | undefined;
            onShow?: (() => any) | undefined;
            onHide?: (() => any) | undefined;
            onPrev?: (() => any) | undefined;
            onNext?: (() => any) | undefined;
            onSkip?: (() => any) | undefined;
            "onTarget-not-found"?: ((target: string) => any) | undefined;
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
        $emit: ((event: "stop") => void) & ((event: "finish") => void) & ((event: "show") => void) & ((event: "hide") => void) & ((event: "prev") => void) & ((event: "next") => void) & ((event: "skip") => void) & ((event: "target-not-found", target: string) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Step>>> & {
            onStop?: (() => any) | undefined;
            onFinish?: (() => any) | undefined;
            onShow?: (() => any) | undefined;
            onHide?: (() => any) | undefined;
            onPrev?: (() => any) | undefined;
            onNext?: (() => any) | undefined;
            onSkip?: (() => any) | undefined;
            "onTarget-not-found"?: ((target: string) => any) | undefined;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            show: () => void;
        } & {
            hide: () => void;
        } & {
            stop: () => void;
        } & {
            skip: () => void;
        } & {
            finish: () => void;
        } & {
            prev: () => void;
        } & {
            next: () => void;
        } & {
            "target-not-found": (target: string) => void;
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
    } & Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Step>>> & {
        onStop?: (() => any) | undefined;
        onFinish?: (() => any) | undefined;
        onShow?: (() => any) | undefined;
        onHide?: (() => any) | undefined;
        onPrev?: (() => any) | undefined;
        onNext?: (() => any) | undefined;
        onSkip?: (() => any) | undefined;
        "onTarget-not-found"?: ((target: string) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Step>>> & {
    onStop?: (() => any) | undefined;
    onFinish?: (() => any) | undefined;
    onShow?: (() => any) | undefined;
    onHide?: (() => any) | undefined;
    onPrev?: (() => any) | undefined;
    onNext?: (() => any) | undefined;
    onSkip?: (() => any) | undefined;
    "onTarget-not-found"?: ((target: string) => any) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    show: () => void;
} & {
    hide: () => void;
} & {
    stop: () => void;
} & {
    skip: () => void;
} & {
    finish: () => void;
} & {
    prev: () => void;
} & {
    next: () => void;
} & {
    "target-not-found": (target: string) => void;
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
