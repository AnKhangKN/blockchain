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