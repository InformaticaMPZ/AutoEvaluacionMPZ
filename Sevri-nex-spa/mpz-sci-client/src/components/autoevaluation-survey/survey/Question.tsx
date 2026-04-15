import React, { useEffect, useMemo, useState } from 'react'
import { useAutoevaluationState } from '@/store/autoevaluationSurveys/autoevaluationSurveysStore'
import { useGlobalState } from '@/store/globalState'
import { Answer, Question as QuestionType } from '@/types/autoevaluationSurvey'
import { FaRegFile } from 'react-icons/fa'
import { BiPlus } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs'
import { useSurveyStore } from '@/store/autoevaluationSurveys/answerToSave'

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1] || '')
    }
    reader.onerror = reject
  })

function Question({ question }: { question: QuestionType }) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [observations, setObservations] = useState<string>('')
  const [checked, setChecked] = useState<boolean | null>(null)

  const { actualAxie, actualSurvey } = useAutoevaluationState()
  const { department_id } = useGlobalState()
  const setAnswer = useSurveyStore((state) => state.setAnswer)

  const questionAnswer = useMemo(
    () =>
      question.answers.find(
        (answer) =>
          answer.question_id === question.id &&
          answer.axie_id === actualAxie.id &&
          answer.department_id === department_id
      ),
    [question.answers, question.id, actualAxie.id, department_id]
  )

  const updateAnswer = async () => {
    if (checked === null) return

    const answer: Answer = {
      ...questionAnswer,
      id: questionAnswer?.id || 0,
      survey_id: actualSurvey.id,
      document: file ? await fileToBase64(file) : '',
      file_name: file?.name || '',
      mime_type: file?.type || '',
      observations,
      question_id: question.id,
      response: checked ? 'yes' : 'no',
      department_id,
      axie_id: actualAxie.id,
    }

    setAnswer(answer)
  }

  useEffect(() => {
    updateAnswer()
  }, [checked, observations, file])

  useEffect(() => {
    if (questionAnswer) {
      setFile(undefined)
      setObservations(questionAnswer.observations || '')
      setChecked(
        questionAnswer.response === 'yes'
          ? true
          : questionAnswer.response === 'no'
          ? false
          : null
      )
    } else {
      setFile(undefined)
      setObservations('')
      setChecked(null)
    }
  }, [questionAnswer])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleDeleteFile = () => {
    setFile(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="rounded-lg shadow-lg bg-white p-6 transition-all border border-gray-200">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h4 className="text-primary-800 font-semibold text-lg">{question.title}</h4>
          {!questionAnswer && <span className="text-red-500 text-sm">*</span>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="observations"
            className="text-blue-500 text-xs font-semibold mb-2"
          >
            Observaciones
          </label>
          <textarea
            id="observations"
            name="observations"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="border-2 border-blue-500 p-3 text-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <button
            type="button"
            className={`text-white py-2 px-4 rounded-lg transition-all ${
              checked === true
                ? 'bg-green-800 hover:bg-green-700'
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            onClick={() => setChecked(true)}
          >
            Sí
          </button>

          <button
            type="button"
            className={`text-white py-2 px-4 rounded-lg transition-all ${
              checked === false
                ? 'bg-red-800 hover:bg-red-700'
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
            onClick={() => setChecked(false)}
          >
            No
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-green-600 hover:text-green-700 transition-all"
          >
            <BiPlus size={30} />
            <input
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              type="file"
            />
          </button>

          {file ? (
            <div className="flex items-center gap-2">
              <FaRegFile size={24} />
              <p className="text-sm text-blue-900">
                Archivo seleccionado: {file.name}
              </p>
              <button
                type="button"
                onClick={handleDeleteFile}
                className="text-red-600 hover:text-red-700"
              >
                <BsFillTrashFill size={20} />
              </button>
            </div>
          ) : questionAnswer?.document ? (
            <div className="flex items-center gap-2">
              <FaRegFile size={24} />
              <p className="text-sm text-blue-900">
                Archivo actual: {questionAnswer.file_name || 'Adjunto existente'}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-green-600 hover:text-green-700"
              >
                Reemplazar
              </button>
            </div>
          ) : (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Adjuntar archivo
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Question