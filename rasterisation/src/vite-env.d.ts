/// <reference types="vite/client" />

declare module "lit-element-state" {
  export class LitState<T extends {}> {
    addObserver(callback: () => void, properties?: (keyof T)[]): void;
  }

  export function stateVar(): (
    protoOrDescriptor: Object,
    name?: PropertyKey | undefined
  ) => any;

  export function observeState<T>(klass: T): T;
}
