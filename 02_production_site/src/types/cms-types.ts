type Reference<T, R> = T extends 'get' ? R : string | null;
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type tags<T='get'> = Structure<
T,
{
  /**
   * タグ名
   */
  name: string
}>

export type news<T='get'> = Structure<
T,
{
  /**
   * タイトル
   */
  title: string
  /**
   * 内容
   */
  content: string
  /**
   * サムネイル
   */
  thumbnail: { url: string, width: number, height: number }
  /**
   * タグ名
   */
  tags?: Reference<T,unknown>[]
}>


export interface EndPoints {
  get: {
    tags: tags<'get'>
    news: news<'get'>
  }
  post: {
    tags: tags<'post'>
    news: news<'post'>
  }
  put: {
    tags: tags<'put'>
    news: news<'put'>
  }
  patch: {
    tags: tags<'patch'>
    news: news<'patch'>
  }
}
