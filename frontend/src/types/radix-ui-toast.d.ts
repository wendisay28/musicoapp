declare module '@radix-ui/react-toast' {
  import * as React from 'react';
  
  export const Provider: React.ComponentType<any>;
  export const Viewport: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'ol'> & React.RefAttributes<HTMLOListElement>
  >;
  export const Root: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'li'> & React.RefAttributes<HTMLLIElement>
  >;
  export const Action: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'button'> & React.RefAttributes<HTMLButtonElement>
  >;
  export const Close: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'button'> & React.RefAttributes<HTMLButtonElement>
  >;
  export const Title: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>
  >;
  export const Description: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>
  >;
}