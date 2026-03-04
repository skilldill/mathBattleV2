import { useState } from "react";
import { ApiService } from "../api/ApiService";
import { ExamLevelDto, ExamLevelPlayedDto } from "../types/ExamsLevelsDto";
import { getStoredExamLevelPlayed, isTelegramGameSession, saveStoredExamLevelPlayed } from "../utils/examProgressStorage";

export const useExamsLevels = () => {
    const [examsLevels, setExamsLevels] = useState<ExamLevelDto[]>([]);
    const [examLevelPlayed, setExamLevelPlayed] = useState<ExamLevelPlayedDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchExamsLevels = async () => {
        try {
            setLoading(true);
            const examsLevels = await ApiService.getExamsLevels();
            setExamsLevels(examsLevels);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchExamLevelPlayed = async (userId?: string) => {
        try {
            if (!isTelegramGameSession() || !userId) {
                setExamLevelPlayed(getStoredExamLevelPlayed());
                return;
            }

            const examLevelPlayed = await ApiService.getExamLevelPlayed(userId);
            setExamLevelPlayed(examLevelPlayed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const saveExamLevelPlayed = async (examLevelPlayed: ExamLevelPlayedDto) => {
        try {
            if (!isTelegramGameSession()) {
                setExamLevelPlayed(saveStoredExamLevelPlayed(examLevelPlayed));
                return;
            }

            await ApiService.saveExamLevelPlayed(examLevelPlayed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { examsLevels, examLevelPlayed, loading, fetchExamsLevels, fetchExamLevelPlayed, saveExamLevelPlayed };
}
