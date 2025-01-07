export interface MyComponentSlotProps {
    data: {
        message: string
        value: number
    }
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Select: DefineComponent<{}, {}, {
            $slots: {
                default: (arg: { data: string }) => VNode[];
            }
        }>
    }
}