import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dgogba6lz/auto/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'vue-course');
  formData.append('file', file);

  try {
      const { data } = await axios.post(cloudUrl, formData);
      
      return data.secure_url;
  } catch (err) {
      console.error('error al cargar la imagen, revisar logs');
      console.log(err);
      return null;
  }
}

export default uploadImage;