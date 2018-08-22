export class NewsCreate {
  constructor(
    public title: string,
    public summary: string,
    public category: string,
    public publisher: string,
    public date: Date,
    public imageUrl: string
  ) { }
}


