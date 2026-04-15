import { Axie } from '@/types/autoevaluationSurvey'
import QuestionBadge from './QuestionBadge'

function FormNavigator({ axie }: { axie: Axie }) {
  const sections = axie.sections

  return (
    <div className="w-60 bg-dark border text-primary-500 justify-center py-4 px-8 rounded-lg shadow-md shadow-gray-300">
      <div className="text-lg font-bold rounded-md">
        Navigator Survey
      </div>

      <div className="rounded-md space-y-1">
        {sections?.map((section, index) => (
          <div key={index}>
            <h3>{section.title}</h3>
            <div className="grid grid-cols-5 gap-1">
              {section.questions?.map((question, secondIndex) => (
                <QuestionBadge
                  key={question.id}
                  numberBadge={((index) * section.questions.length + secondIndex) + 1}
                  question={question}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormNavigator