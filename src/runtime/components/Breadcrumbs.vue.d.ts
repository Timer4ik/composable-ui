interface ScopedSlotType {
    items: (links: any) => any[]
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        links: any[]
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
