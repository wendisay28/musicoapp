declare module 'react-router-dom' {
  import * as React from 'react';

  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export const Link: React.ForwardRefExoticComponent<LinkProps>;

  export interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
  }

  export interface NavigateProps {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export const Navigate: React.FC<NavigateProps>;

  export interface RouteProps {
    path?: string;
    element?: React.ReactNode;
    children?: React.ReactNode;
  }

  export const Route: React.FC<RouteProps>;

  export interface RoutesProps {
    children?: React.ReactNode;
  }

  export const Routes: React.FC<RoutesProps>;

  export interface BrowserRouterProps {
    children?: React.ReactNode;
  }

  export const BrowserRouter: React.FC<BrowserRouterProps>;

  export function useNavigate(): NavigateFunction;
  export function useLocation(): Location;
  export function useParams<T extends { [K in keyof T]?: string } = {}>(): T;
}
