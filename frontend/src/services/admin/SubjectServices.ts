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
};

// Lấy 1 môn học theo ID
export const getSubjectById = async (id: string, accessToken: string) => {
    try {
        const res = await axios.get(`${API}/admin/subjects/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Cập nhật môn học
export const updateSubject = async (
    id: string,
    data: {
        name: string;
        code: string;
        credit?: number;
    },
    accessToken: string
) => {
    try {
        const res = await axios.put(`${API}/admin/subjects/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// Xóa môn học
export const deleteSubject = async (id: string, accessToken: string) => {
    try {
        const res = await axios.delete(`${API}/admin/subjects/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
