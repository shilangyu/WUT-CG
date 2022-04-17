/// <reference types="vite/client" />

declare module "lit-element-state" {
  export class LitState {}

  export function stateVar(): (
    protoOrDescriptor: Object,
    name?: PropertyKey | undefined
  ) => any;

  export function observeState<T>(klass: T): T;
}
