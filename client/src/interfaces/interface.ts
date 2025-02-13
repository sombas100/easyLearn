export interface User {
    userId: number;
    name: string;
    email: string;
    password: string;
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
    user: { 
        name: string, 
        email: string 
    }
    course: {
        title: string
    }
    progress: number;
    certificateUrl?: string;
}