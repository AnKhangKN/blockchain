import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

// Lấy toàn bộ môn học
export const getSubjects = async (accessToken: string) => {
    try {
        const res = await axios.get(`${API}/admin/subjects`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Thêm môn học mới
export const addNewSubject = async (
    accessToken: string,
    name: string,
    code: string,
    credit?: number
) => {
    try {
        const res = await axios.post(
            `${API}/admin/subjects`,
            { name, code, credit },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const addSubjectTeacher = async (accessToken: string, teacherId: string, subjectId: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/subjects/teachers`,
            {teacherId, subjectId},
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }}
        )

        return res.data

    } catch (error) {
        console.log(error);
    }
}

export const addSubjectStudent = async (accessToken: string, studentId: string, subjectId: string) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/subjects/students`,
            {studentId, subjectId},
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }}
        )

        return res.data

    } catch (error) {
        console.log(error);
    }
}

export const deleteSubject = async (accessToken: string, subjectId: string) => {
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/subjects/${subjectId}`,
            {headers: { Authorization: `Bearer ${accessToken}`}}
        );

        return res.data
    } catch (error) {
        console.log(error);
    }
}
