import { useRef, useState, useEffect } from 'react';
import { showInfoMixinAlert } from '@/utils';
import { useFollowUpState } from '@/store/follow_up/followUpStore';
import { FollowUpFormProps } from '@/utils/schemas/followUp/proposedActionsForm';
import { ProposedAction as MatureModelProposedActions } from "@/types";
import { ProposedAction as AutoEvaluationProposedAction } from "@/types/autoevaluationSurvey";
import { ProposedAction as SevriProposedActions } from "@/types/sevri";

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] || "");
    };
    reader.onerror = reject;
  });

const base64ToFile = async (
  base64: string,
  fileName: string,
  mimeType: string
): Promise<File> => {
  const response = await fetch(`data:${mimeType};base64,${base64}`);
  const blob = await response.blob();
  return new File([blob], fileName, { type: mimeType });
};

const useCrudFollowUp = (proposedAction: FollowUpFormProps) => {
  const {
    updateSevriProposedAction,
    updateAutoEvaluationProposedAction,
    updateMatureModelProposedAction
  } = useFollowUpState();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      if (proposedAction.attachments?.length) {
        const loadedFiles = await Promise.all(
          proposedAction.attachments.map((att) =>
            base64ToFile(att.attachment, att.name, att.attachment_type)
          )
        );
        setFiles(loadedFiles);
      } else {
        setFiles([]);
      }
    };

    loadFiles();
  }, [proposedAction]);

  const handleSubmit = async (values: FollowUpFormProps) => {
    let fileData = {};

    if (files.length > 0) {
      const attachments = await Promise.all(
        files.map(async (file) => ({
          attachment: await fileToBase64(file),
          name: file.name,
          attachment_type: file.type,
        }))
      );

      fileData = { attachments };
    }

    values = { ...values, ...fileData };

    let response;

    if (values.modelType === "matureModel") {
      const data = {
        survey_id: proposedAction.survey_id,
        id: proposedAction.id,
        user_id: proposedAction.user_id,
        accomplishment_level: values.accomplishment_level,
        action_date: values.action_date,
        description: values.description,
        event_id: values.event_id,
        indicators: values.indicators,
        justification: values.justification,
        responsible_email: values.responsible_email,
        responsible_name: values.responsible_name,
        attachments: values.attachments,
        observations: values.observations,
        evaluation_id: proposedAction.evaluation_id,
      } as MatureModelProposedActions;

      response = await updateMatureModelProposedAction(data);
    } else if (values.modelType === "autoEvaluation") {
      const data = {
        survey_id: proposedAction.survey_id,
        id: proposedAction.id,
        user_id: proposedAction.user_id,
        accomplishment_level: values.accomplishment_level,
        action_date: values.action_date,
        description: values.description,
        event_id: values.event_id,
        indicators: values.indicators,
        justification: values.justification,
        responsible_email: values.responsible_email,
        responsible_name: values.responsible_name,
        attachments: values.attachments,
        observations: values.observations,
      } as AutoEvaluationProposedAction;

      response = await updateAutoEvaluationProposedAction(data);
    } else if (values.modelType === "sevri") {
      const data = {
        id: proposedAction.id,
        accomplishment_level: values.accomplishment_level,
        action_date: values.action_date,
        description: values.description,
        event_id: values.event_id,
        indicators: values.indicators,
        justification: values.justification,
        responsible_email: values.responsible_email,
        responsible_name: values.responsible_name,
        observations: values.observations,
        attachments: values.attachments,
      } as SevriProposedActions;

      response = await updateSevriProposedAction(data);
    }

    if (!response) {
      showInfoMixinAlert("Error", "No se pudo actualizar la acción propuesta", "error");
      return false;
    }

    showInfoMixinAlert(
      "Acción Propuesta Actualizada",
      "La acción propuesta ha sido actualizada exitosamente",
      "success"
    );
    return true;
  };

  return {
    handleSubmit,
    fileInputRef,
    file,
    setFile,
    files,
    setFiles,
  };
};

export default useCrudFollowUp;