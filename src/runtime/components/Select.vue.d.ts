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
    isOpened: Ref<boolean, boolean>
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
        id: String
    }>,
    {
        $slots: {
            default: (props: ScopedSlotType) => void
        }
    },
    {},
>
export default _default;
