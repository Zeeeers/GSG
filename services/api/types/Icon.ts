import { ImageUrl } from './ImageUrl';

export interface Icon {
    id: number;
    category: string;
    name: string;
    tags: Array<string> | string;
    image: string;
    image_url: ImageUrl;
}
