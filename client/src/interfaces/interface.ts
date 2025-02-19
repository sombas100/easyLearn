export interface User {
    userId: number;
    name: string;
    email: string;
    role: string;
}

export interface Lesson {
    lessonId: number;
    courseId: number;
    title: string;
    content: string;
    videoUrl?: string;
}

export interface Course {
    courseId: number;
    title: string;
    description: string;
    videoUrl: string;
    lessons: Lesson[];
}

export interface Enrollment {
    enrollmentId: number;
    User?: { 
        name: string, 
        email: string,
        userId: number,
    }
    Course?: {
        title: string,
        courseId: number
    }
    progress: number;
    certificateUrl?: string;
}