import { createContext, useContext, useReducer, type ReactNode } from 'react';

export type Chapter = 'intro' | 'chapter2' | 'chapter3' | 'chapter4' | 'chapter5' | 'chapter6' | 'finale';

export type IntroScene = 'clapperboard' | 'surprise' | 'password' | 'success';

export type Scene =
  | { chapter: 'intro'; scene: IntroScene }
  | { chapter: Chapter; scene: string };

export interface StoryState {
  chapter: Chapter;
  scene: string;
  history: Scene[];
  unlockedChapters: Chapter[];
}

export type StoryAction =
  | { type: 'GO_TO'; chapter: Chapter; scene: string }
  | { type: 'NEXT_SCENE'; scene: string }
  | { type: 'UNLOCK'; chapter: Chapter }
  | { type: 'RESTART' };

const initialState: StoryState = {
  chapter: 'intro',
  scene: 'clapperboard',
  history: [],
  unlockedChapters: ['intro'],
};

function reducer(state: StoryState, action: StoryAction): StoryState {
  switch (action.type) {
    case 'GO_TO':
      return {
        ...state,
        history: [...state.history, { chapter: state.chapter, scene: state.scene }],
        chapter: action.chapter,
        scene: action.scene,
      };
    case 'NEXT_SCENE':
      return {
        ...state,
        history: [...state.history, { chapter: state.chapter, scene: state.scene }],
        scene: action.scene,
      };
    case 'UNLOCK':
      if (state.unlockedChapters.includes(action.chapter)) return state;
      return {
        ...state,
        unlockedChapters: [...state.unlockedChapters, action.chapter],
      };
    case 'RESTART':
      return initialState;
    default:
      return state;
  }
}

interface StoryContextValue {
  state: StoryState;
  goTo: (chapter: Chapter, scene: string) => void;
  nextScene: (scene: string) => void;
  unlock: (chapter: Chapter) => void;
  restart: () => void;
}

const StoryContext = createContext<StoryContextValue | null>(null);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: StoryContextValue = {
    state,
    goTo: (chapter, scene) => dispatch({ type: 'GO_TO', chapter, scene }),
    nextScene: (scene) => dispatch({ type: 'NEXT_SCENE', scene }),
    unlock: (chapter) => dispatch({ type: 'UNLOCK', chapter }),
    restart: () => dispatch({ type: 'RESTART' }),
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) throw new Error('useStory must be used within StoryProvider');
  return ctx;
}
