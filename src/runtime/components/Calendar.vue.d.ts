interface ScopedSlotType {
  calendarPageDate: Date;
  dates: Date[];
  next: () => void;
  prev: () => void;
  update: () => void;
}

declare const _default: import("vue").DefineComponent<
  import("vue").ExtractPropTypes<{
    id: any;
    initialDate: Date;
    isFixedNumberDays: Boolean;
    forEachDate: Function;
    onUpdate: Function;
    deps: any[];
  }>,
  {
    $slots: {
      default: (props: ScopedSlotType) => void;
    };
  },
  {},
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  {},
  {}
>;
export default _default;
