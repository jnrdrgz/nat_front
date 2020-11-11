import axios from "axios";

export const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("upload_preset", "nat_app");
    formData.append("file", file);
    //formData.append("api_key", "");
  
    const config = {
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        
      },
    };
  
    let secure_url = ""
    await axios.post(
      "https://api.cloudinary.com/v1_1/dy5tuirk1/image/upload",
      formData,
      config
    ).then(r => {
        console.log(r)
        console.log(r.data.secure_url)
        secure_url = r.data.secure_url
        return r
    })
    .catch(e =>{
        console.log(e)
        console.log(e.response.data)
    });

    return secure_url;
  };
  