import { axiosReq } from "./axiosDefaults";

export const imageUpload = async (image) => {
  if (!(image instanceof FormData)) {
    throw new Error("image must be an instance of FormData");
  }
  try {
    const response = await axiosReq.post(
      "http://localhost:4000/image-upload",
      image,
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 400) {
      return { formErrors: error.response.data };
    }

    throw new Error(`Failed to uploadImage(): ${error}`);
  }
};
