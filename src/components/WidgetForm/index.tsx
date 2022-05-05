import { CloseButton } from "../CloseButton";
import bugSvg from '../../assets/bug.svg';
import ideaSvg from '../../assets/idea.svg';
import thoughtSvg from '../../assets/thought.svg';
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
 
export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      src: bugSvg,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      src: ideaSvg,
      alt: 'Imagem de uma lampada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      src: thoughtSvg,
      alt: 'Imagem de um balão de pensamento'
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] m-auto md:w-auto">
      { feedbackSent ? (
      <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
      ):(
        <>
          {!feedbackType ? (
          <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
          ) : (
          <FeedbackContentStep 
            feedbackType={feedbackType} 
            onFeedbackRestartRequested={handleRestartFeedback}
            onFeedbackSent={() => setFeedbackSent(true)}
          />
        )}
        </>
      )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br" target="_blank">Rocketseat</a>
      </footer>
    </div>
  );
}