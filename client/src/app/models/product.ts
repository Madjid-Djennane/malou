import { Topics } from './topics';
import { Thumbnail } from './thumbnail';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public tagline: string,
    public votes_count: number,
    public created_at: string,
    public topics: Topics[],
    public thumbnail: Thumbnail
  ) {}
}
