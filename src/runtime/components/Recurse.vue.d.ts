interface ScopedSlotType {
    default: (props: ScopedSlotType) => void,
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        slots: ScopedSlotType
    }>,
    {
        $slots: {
            default: (props: ScopedSlotType) => void,
        },
    },
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    {},
>
export default _default;
