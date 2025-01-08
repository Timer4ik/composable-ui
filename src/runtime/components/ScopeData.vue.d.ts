interface ScopedSlotType {
    data: any
    refetch: () => any
    loading: boolean
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        init: () => any,
        watchOn: any,
        initOnHasValue: boolean,
    }>,
    {
        $slots: {
            default: (props: ScopedSlotType) => void,
        }
    },
    {},
>
export default _default;
