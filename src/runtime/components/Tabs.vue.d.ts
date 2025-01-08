interface ScopedSlotType {
    default: (props: ScopedSlotType) => void,
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        tabs: any[],
        by: string,
        modelValue: any
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
    ("update:modelValue")[],
    "update: modelValue",
>
export default _default;
