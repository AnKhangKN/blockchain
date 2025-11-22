import axios from "axios";

export const getSubjects = async (accessToken: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/subjects`,
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

export const addNewSubject = async (accessToken: string ,name: string, code:string) => {
    try {

        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/subjects`,
            {name, code},
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