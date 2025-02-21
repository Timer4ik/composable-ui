interface PreContent {
  name: string;
  isActive: boolean;
  data: any;
  on: (event: string, callback: Function) => Context;
  open: (data: any) => Context;
  close: (data: any) => Context;
  toggle: (data: any) => Context;
  emit: (name: any) => Context;
}

interface Context extends PreContent {
  events: Function;
}

interface ScopedSlotType extends PreContent { }

declare const _default: import("vue").DefineComponent<
  import("vue").ExtractPropTypes<{
    name: string;
    initialData: any;
    initialIsActive: boolean;
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
