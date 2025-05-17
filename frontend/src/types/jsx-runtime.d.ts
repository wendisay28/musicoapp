declare module 'react/jsx-runtime' {
  export namespace JSX {
    interface Element {
      type: any;
      props: any;
      key: string | null;
    }

    interface ElementClass {
      render(): Element;
    }

    interface ElementAttributesProperty {
      props: {};
    }

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicAttributes {
      key?: string | number;
    }

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
