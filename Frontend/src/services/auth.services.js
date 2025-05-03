import axios from "axios";

export const verifyUser = async () => {
    try {
        const { data } = await axios.get("/api/auth/user");
        return data;
    } catch (error) {
        console.error("Error verifying user:", error);
        throw error;
    }
}
  
