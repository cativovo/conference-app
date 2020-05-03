import { GetTalkQuery } from './API';

// Base Action
type BaseActionType<T> = {
  type: T;
};

// Talks
export type Talk = Exclude<GetTalkQuery['getTalk'], null>;

type SetTalksActionType = BaseActionType<'SET_TALKS'> & {
  payload: {
    talks: Talk[];
  };
};
type SetInputActionType = BaseActionType<'SET_INPUT'> & {
  payload: {
    key: string;
    value: string;
  };
};
type ClearInputActionType = BaseActionType<'CLEAR_INPUT'>;
type ToggleLoadingActionType = BaseActionType<'TOGGLE_LOADING'>;

export type SetTalks = (talks: Talk[]) => SetTalksActionType;
export type SetInput = (key: string, value: string) => SetInputActionType;
export type ClearInput = () => ClearInputActionType;
export type ToggleLoading = () => ToggleLoadingActionType;

export type UseTalksActionTypes =
  | SetTalksActionType
  | SetInputActionType
  | ClearInputActionType
  | ToggleLoadingActionType;
