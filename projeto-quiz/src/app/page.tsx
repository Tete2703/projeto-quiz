"use client"

import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";
import { questions } from "@/data/questions";
import { title } from "process";
import { useState } from "react";

const Page = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const title = 'Quiz de Culinária'
  const [currenteQuestion, setCurrentQuestion] = useState(0)
  const loadNextQuestion = () => {
    if (questions[currenteQuestion + 1]) {
      setCurrentQuestion(currenteQuestion +1);
    } else {
      setShowResult(true);
    }
  }
  const handleAnswered = (answer: number) => {
    setAnswers ([...answers, answer]);
    loadNextQuestion()
  }

  const handleRestartButon = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-green-600">
      <div className="w-full max-w-xl rounded-md bg-white text-black shadow shadow-black">
        <div className="p-5 font-bold text-2xl border-b border-gray-300">
          {title}
        </div>
        <div className="p-5">
          {!showResult &&
          <QuestionItem
          question={questions[currenteQuestion]}
          count={currenteQuestion + 1}
          onAnswer={handleAnswered}
          />
        }
        {showResult &&
        <Results questions = {questions} answers = {answers}/>
        }
        </div>
        <div className="p-5 text-center border-t border-gray-300">
          {!showResult && `${currenteQuestion + 1} de ${questions.length} Pergunta${questions.length === 1 ? '' : 's'}`
          }
          {showResult &&
          <button className="px-3 py-2 rounded-md bg-green-800 text-white" onClick={handleRestartButon}>Reiniciar Quiz</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Page;