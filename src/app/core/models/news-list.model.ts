export class NewsList {
  constructor(
    public id: string,
    public title: string,
    public summary: string,
    public category: string,
    public publisher: string,
    public date: Date,
    public imageUrl: string,
  ) { }
}