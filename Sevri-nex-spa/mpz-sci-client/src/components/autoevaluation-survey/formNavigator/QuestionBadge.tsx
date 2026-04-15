import { useSurveyState } from '@/store/autoevaluationSurveys/surveyStore'
import { Question } from '@/types/autoevaluationSurvey'
import { BsCheck2Circle } from 'react-icons/bs'

function QuestionBadge({
  question,
  numberBadge,
}: {
  question: Question
  numberBadge: number
}) {
  const { actualQuestion } = useSurveyState()

  const unansweredStyle =
    'border-primary-600 border hover:text-white transition-all hover:bg-primary-500 text-primary-600'
  const answeredStyle =
    'bg-green-500 hover:bg-green-400 text-green-100'
  const selectedStyle =
    'bg-primary-600 text-white'

  const selected = question.id === actualQuestion.id
  const answered = question.answers?.some(
    (answer) => answer.response !== null && answer.response !== undefined
  )

  return (
    <button
      type="button"
      className={`py-1 px-2 rounded-md ${
        selected
          ? selectedStyle
          : answered
          ? answeredStyle
          : unansweredStyle
      }`}
    >
      {answered && !selected ? <BsCheck2Circle /> : numberBadge}
    </button>
  )
}

export default QuestionBadge