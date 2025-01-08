interface ScopedSlotType {
    button: {
        bind: {
            ref: (el: any) => any;
        };
        on: {
            click: () => void;
        };
    }
    content: {
        on: {
            scroll: (e: any) => false | void;
        };
    }
    input: {
        bind: {
            ref: (el: any) => void;
        };
    }
    isOpened: boolean
    toggle: () => void,
    close: () => void
    wrapper: {
        bind: {
            ref: (el: any) => void;
        };
    }
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        id: string
    }>,
    {
        $slots: {
            default: (props: ScopedSlotType) => void,
        }
    },
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    ("select" | "reachedBottom")[],
    "select" | "reachedBottom",
>
export default _default;
