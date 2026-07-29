import React from 'react';

export type DefinedComponent<P = object, A = unknown> = {
  Component: React.ComponentType<P>;
  props: P | ((arg: A) => P);
};

type Props<P, A> = DefinedComponent<P, A>['props'];

function defineComponent<P extends object, A = unknown>(
  type: React.ComponentType<P> | DefinedComponent<P, A>,
  props: Props<P, A>
): DefinedComponent<P, A> {
  if (type && 'Component' in type) {
    return {
      Component: type.Component,
      props: (arg: A) =>
        Object.assign(
          {},
          resolveDefinedComponentProps(type.props, arg),
          resolveDefinedComponentProps(props, arg)
        ),
    };
  }

  return {
    Component: type,
    props,
  };
}

export function resolveDefinedComponentProps<P extends object, A = unknown>(
  props: Props<P, A>,
  arg: A
) {
  return typeof props === 'function' ? props(arg) : props;
}

export default defineComponent;
