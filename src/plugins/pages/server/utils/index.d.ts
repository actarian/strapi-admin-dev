import * as seo from '../services/seo';

type S = {
  seo: typeof seo;
};

export function getService<T extends keyof S>(name: T): ReturnType<S[T]>;
