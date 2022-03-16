export type Nullable<T> = T | null;

export type Keys<T extends Record<string, unknown>> = keyof T;
export type Values<T extends Record<string, unknown>> = T[Keys<T>];
export type Props = { [key: string]: any };
export type PropsOrUndefined = Props | undefined;