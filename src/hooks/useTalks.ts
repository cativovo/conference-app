import { useReducer } from 'react';
import { ClearInput, SetInput, SetTalks, Talk, UseTalksActionTypes } from '../types';

// Actions generators
export const setListTalks: SetTalks = (talks) => ({
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

const initialState = {
  name: '',
  description: '',
  speakerName: '',
  speakerBio: '',
  talks: [] as Talk[],
};

const reducer: React.Reducer<typeof initialState, UseTalksActionTypes> = (state, action) => {
  switch (action.type) {
    case 'SET_TALKS': {
      return { ...state, talks: action.payload.talks };
    }
    case 'SET_INPUT': {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    case 'CLEAR_INPUT': {
      return { ...initialState, talks: state.talks };
    }
    default: {
      console.error('Invalid action.type');
      return state;
    }
  }
};

export const useTalks = useReducer(reducer, initialState);
