interface ScopedSlotType {
    on: {
        input: (event: any) => void
        blur: (event: any) => void
    }
    bind: {
        modelValue: any
        value: any
        onInput: (event: any) => void
        onBlur: (event: any) => void
    }
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        modelValue: number | string
        id: number | string
        min: number
        max: number
        fixed: number
        step: number
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
    ("update:modelValue")[],
    "update:modelValue",
>
export default _default;
