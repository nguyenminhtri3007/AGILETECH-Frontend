export interface PostModelProps {
  id?: number;
  title: string;
  description: string;
  tags: string[];
}

export class PostModel implements PostModelProps {
  id?: number;
  title: string;
  description: string;
  tags: string[];

  constructor(data: PostModelProps) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.tags = data.tags;
  }

  static toJson(post: PostModel) {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      tags: post.tags,
    };
  }
} 

export interface GalleryModelProps {
  id: string;
  imageUrl: string;
  description: string;
}

export class GalleryModel implements GalleryModelProps {
  id: string;
  imageUrl: string;
  description: string;

  constructor(data: GalleryModelProps) {
    this.id = data.id;
    this.imageUrl = data.imageUrl;
    this.description = data.description;
  }

  static fromJson(json: any): GalleryModel {
    return new GalleryModel({
      id: json.id,
      imageUrl: json.imageUrl,
      description: json.description,
    });
  }
} 