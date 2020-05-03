import { useReducer } from 'react';
import { ClearInput, SetInput, SetTalks, Talk, ToggleLoading, UseTalksActionTypes } from '../types';

// Actions generators
export const setTalks: SetTalks = (talks) => ({
  type: 'SET_TALKS',
  payload: {
    talks,
  },
});

export const setInput: SetInput = (key, value) => ({
  type: 'SET_INPUT',
  payload: {
    key,
    value,
  },
});

export const clearInput: ClearInput = () => ({
  type: 'CLEAR_INPUT',
});

export const toggleLoading: ToggleLoading = () => ({
  type: 'TOGGLE_LOADING',
});

const initialState = {
  name: '',
  description: '',
  speakerName: '',
  speakerBio: '',
  talks: [] as Talk[],
  isLoading: true,
};

const reducer: React.Reducer<typeof initialState, UseTalksActionTypes> = (state, action) => {
  switch (action.type) {
    case 'SET_TALKS': {
      return { ...state, talks: action.payload.talks, isLoading: false };
    }
    case 'SET_INPUT': {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    case 'CLEAR_INPUT': {
      return { ...initialState, talks: state.talks, isLoading: false };
    }
    default: {
      console.error('Invalid action.type');
      return state;
    }
  }
};

export const useTalks = () => useReducer(reducer, initialState);
