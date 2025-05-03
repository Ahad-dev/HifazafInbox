import axios from "axios";

const sendEmail = async (data) => {
    const response = await axios.post("/api/user/sendEmail", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });
    return response.data;
};

const getUserEmails = async ()=>{
    const response = await axios.get('/api/user/getEmails',{
        withCredentials:true,
    })
    return response.data;
    
}

const getEmailStats = async ()=>{
    const response = await axios.get('/api/user/getEmailStats',{
        withCredentials:true,
    })
    return response.data;
    
}


export {sendEmail,getUserEmails,getEmailStats};

