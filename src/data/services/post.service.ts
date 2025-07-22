import CustomAxios from '../../common/config/axios.config';
import { AppConfig } from '../../common/config/app.config';
import { HandleHttp } from '../../common/service/handle-http';
import { GalleryModel, PostModel } from '../models/post.model';
import { log } from 'console';

const appConfig = new AppConfig();

export const getPosts = async (title?: string, page?: number) => {
  try {
    const domain = appConfig.getDomain();
    const params: any = {};
    if (title) params.title = title;
    if (page) params.page = page;
    const resp = await CustomAxios.get(`${domain}/posts`, { params });
    return resp.data;
  } catch (error) {
    console.log(error);
    throw HandleHttp.exception(error);
  }
};

export const getPostTags = async () => {
  try {
    const domain = appConfig.getDomain();
    const resp = await CustomAxios.get(`${domain}/posts/tags`);
    return resp.data;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
};

export const createPost = async (data: PostModel) => {
  try {
    const domain = appConfig.getDomain();
    const payload = PostModel.toJson(data);
    const resp = await CustomAxios.post(`${domain}/posts`, payload);
    return resp.data;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
};

export const updatePost = async (postId: number, data: PostModel) => {
  try {
    const domain = appConfig.getDomain();
    const payload = PostModel.toJson(data);
    const resp = await CustomAxios.patch(`${domain}/posts/${postId}`, payload);
    return resp.data;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
};

export const deletePost = async (postId: number) => {
  try {
    const domain = appConfig.getDomain();
    const resp = await CustomAxios.delete(`${domain}/posts/${postId}`);
    return resp.data;
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}; 

export const getGalleries = async () => {
  try {
    const domain = appConfig.getDomain();
    const resp = await CustomAxios.get(`${domain}/galleries`);
    console.log('====================================');
    console.log(resp);
    console.log('====================================');
    return resp.data.map((item: any) => GalleryModel.fromJson(item));
  } catch (error) {
    throw HandleHttp.exception(error);
  }
}; 