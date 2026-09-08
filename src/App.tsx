import { StoryProvider, useStory, type Chapter } from '@/story/StoryContext';
import IntroChapter from '@/chapters/IntroChapter';
import Chapter2 from '@/chapters/Chapter2';
import Chapter3 from '@/chapters/Chapter3';

const chapterComponents: Record<Chapter, React.ComponentType | null> = {
  intro: IntroChapter,
  chapter2: Chapter2,
  chapter3: Chapter3,
  chapter4: null,
  chapter5: null,
  chapter6: null,
  finale: null,
};

function StoryRouter() {
  const { state } = useStory();
  const ChapterComponent = chapterComponents[state.chapter];

  if (!ChapterComponent) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center paper-texture">
        <p className="font-hand text-2xl text-blush-500">More chapters coming soon...</p>
      </div>
    );
  }

  return <ChapterComponent />;
}

export default function App() {
  return (
    <StoryProvider>
      <StoryRouter />
    </StoryProvider>
  );
}
