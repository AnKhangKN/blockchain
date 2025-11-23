import axios from "axios";

export const getUsers = async (accessToken: string) => {
    try {

        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users`,
            {headers: 
                {Authorization: `Bearer ${accessToken}`}
            }
        )

        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const getUserDetail = async (accessToken: string, userId: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users/${userId}`,
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }}
        )
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const updateUserRole = async (accessToken: string, userId: string, data: any) => {
    try {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/update-user-role/${userId}`,
             data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        return res.data

    } catch (error) {
        console.log(error);
    }
}

export const updateStudent = async (accessToken: string, userId: string, data: any) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/users-update/${userId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        return res.data
    } catch (error) {
        console.log(error);
    }
}