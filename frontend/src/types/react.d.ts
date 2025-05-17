/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace React {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }

  interface ForwardRefExoticComponent<P> {
    (props: P): ReactElement | null;
    displayName?: string;
  }
}

declare namespace JSX {
  interface Element extends React.ReactElement<any, any> { }

  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }

  interface ElementAttributesProperty {
    props: {};
  }

  interface ElementChildrenAttribute {
    children: {};
  }

  interface IntrinsicAttributes extends React.Attributes { }

  interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
