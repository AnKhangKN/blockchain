import axios from "axios";

export const getSubjects = async (accessToken: string) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/teacher/subjects`,
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