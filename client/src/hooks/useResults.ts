import { ApiService } from "../api/ApiService";
import { ResultDto, ResultListDto } from "../types/MathTaskDto";
import { useState } from "react";

export const useResults = () => {
    const [resultsList, setResultsList] = useState<ResultListDto[]>([]);
    const [result, setResult] = useState<ResultDto>();
    const [loading, setLoading] = useState(false);

    const fetchResultsByUserId = async (userId: string) => {
        try {   
            setLoading(true);
            const results = await ApiService.getResultsByUserId(userId);
            setResultsList(results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchResultById = async (id: string) => {
        try {
            setLoading(true);
            const result = await ApiService.getResultById(id);
            setResult(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return { resultsList, result, loading, fetchResultsByUserId, fetchResultById };
}