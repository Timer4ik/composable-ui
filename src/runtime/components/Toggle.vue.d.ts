interface ScopedSlotType {
    active: boolean
    toggle: () => void
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        initialValue: any
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
    {},
    {}
>
export default _default;
