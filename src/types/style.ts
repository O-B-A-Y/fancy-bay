import Size from '../constants/size';

export type Breakpoint<T> = {
  [key in Size]?: T;
};
