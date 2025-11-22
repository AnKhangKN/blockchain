import axios from "axios";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

// LOGIN (không cần accessToken)
export const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${API}/shared/login`, {
            email,
            password,
        }, {
        withCredentials: true,
      });
        return res.data;
    } catch (err) {
        console.log("Login error:", err);
        throw err;
    }
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${API}/shared/token/refresh`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// REGISTER
export const register = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${API}/shared/register`, {
            email,
            password,
        });
        return res.data;
    } catch (err) {
        console.log("Register error:", err);
        throw err;
    }
};

// VERIFY WALLET
export const verifyWallet = async (accessToken: string, walletAddress: string) => {
    try {
        const res = await axios.post(
            `${API}/shared/verify-wallet`,
            { walletAddress },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.log("Verify wallet error:", err);
        throw err;
    }
};

export const UserDetail = async (accessToken: string) => {
    try {
        const res = await axios.get(`${API}/shared/user-details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (err) {
        console.log("Get user detail error:", err);
        throw err;
    }
};
