import { useEffect, useState } from "react";
import axios from "axios";
import { Lesson } from "@/interfaces/interface";

const useLesson = (courseId: string | undefined) => {
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState()
}