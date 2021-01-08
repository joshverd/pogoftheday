import axios from 'axios';

// Typescript doesn't like this for some reason
//
// @ts-ignore
import FormData from 'form-data';

// Types
import type { AxiosResponse } from 'axios';

export default {
  uploadImageToImgur,
}

// Uploads image to imgur and returns the URL to view image
async function uploadImageToImgur(
  {
    image,
  } : {
    image: Buffer,
  },
): Promise<string | undefined> {
  // Create a new FormData and add the image buffer to it
  const formData = new FormData();
  formData.append('image', image.toString('base64'));

  // The expected Imgur API Response
  type APIResponse = {
    data: {
      link: string,
    },
    success: boolean,
    status: number,
  }

  // Upload image to imgur API
  const response: AxiosResponse<APIResponse> = await axios({
    method: 'POST',
    url: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      // FormData sometimes needs to generate some really weird headers, just let it do its thing...
      ...formData.getHeaders(),
    },
    data: formData,
  });

  // Return the link
  return response.data.data.link;
}