interface ScopedSlotType {
    setPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
    paginator: {
        isRight: boolean;
        isLeft: boolean;
        pageLinks: number[];
        generateArrayOfPageLinks?: undefined;
    } | {
        isRight: boolean;
        isLeft: boolean;
        pageLinks: any[];
        generateArrayOfPageLinks: () => {
            isRight: boolean;
            isLeft: boolean;
            pageLinks: any[];
        };
    }
}

declare const _default: import("vue").DefineComponent<
    import("vue").ExtractPropTypes<{
        perView: number,
        currentPage: any,
        pageCount: any
        onCurrentPage: () => void;
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
    ("currentPage" | "pageCount")[],
    "currentPage" | "pageCount",
>
export default _default;
