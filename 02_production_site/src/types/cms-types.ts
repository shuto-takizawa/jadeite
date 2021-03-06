type Reference<T, R> = T extends 'get' ? R : string | null;
interface GetsType<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
type DateType = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};
type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
  ? GetsType<{ id: string } & DateType & Required<P>>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P);

export type teams<T='get'> = Structure<
T,
{
  /**
   * チーム名
   */
  name: string
  /**
   * スラッグ
   */
  slug: string
  /**
   * 説明文
   */
  description: string
  /**
   * 戦績
   */
  battle_record?: Reference<T,team_battle_record>[]
  /**
   * チーム画像
   */
  image?: { url: string, width: number, height: number }
  /**
   * 所属メンバー
   */
  members?: Reference<T,members>[]
}>

export type team_battle_record<T='get'> = Structure<
T,
{
  /**
   * 結果内容
   */
  result_content: string
  /**
   * 結果日時
   */
  result_data: string
}>

export type tags<T='get'> = Structure<
T,
{
  /**
   * タグ名
   */
  name: string
}>

export type sponsors<T='get'> = Structure<
T,
{
  /**
   * スポンサー名
   */
  name: string
  /**
   * 説明文
   */
  description: string
  /**
   * ロゴ
   */
  logo: { url: string, width: number, height: number }
  /**
   * 公式URL
   */
  url: string
  /**
   * Twitter
   */
  twitter?: string
  /**
   * Youtube
   */
  youtube?: string
}>

export type news<T='get'> = Structure<
T,
{
  /**
   * タイトル
   */
  title: string
  /**
   * 公開日
   */
  post_date: string
  /**
   * 内容
   */
  content: string
  /**
   * サムネイル
   */
  thumbnail: { url: string, width: number, height: number }
  /**
   * タグ
   */
  tags?: Reference<T,tags>[]
}>

export type members<T='get'> = Structure<
T,
{
  /**
   * 名前
   */
  name: string
  /**
   * スラッグ
   */
  slug: string
  /**
   * 説明文
   */
  description: string
  /**
   * アイコン画像
   */
  icon?: { url: string, width: number, height: number }
  /**
   * Twitter
   */
  twitter?: string
  /**
   * Youtube
   */
  youtube?: string
  /**
   * Twitch
   */
  twitch?: string
}>

export type gallery<T='get'> = Structure<
T,
{
  /**
   * 画像タイトル
   */
  title: string
  /**
   * 画像ファイル
   */
  image: { url: string, width: number, height: number }
}>


export interface EndPoints {
  get: {
    teams: teams<'get'>
    team_battle_record: team_battle_record<'get'>
    tags: tags<'get'>
    sponsors: sponsors<'get'>
    news: news<'get'>
    members: members<'get'>
    gallery: gallery<'get'>
  }
  gets: {
    teams: teams<'gets'>
    team_battle_record: team_battle_record<'gets'>
    tags: tags<'gets'>
    sponsors: sponsors<'gets'>
    news: news<'gets'>
    members: members<'gets'>
    gallery: gallery<'gets'>
  }
  post: {
    teams: teams<'post'>
    team_battle_record: team_battle_record<'post'>
    tags: tags<'post'>
    sponsors: sponsors<'post'>
    news: news<'post'>
    members: members<'post'>
    gallery: gallery<'post'>
  }
  put: {
    teams: teams<'put'>
    team_battle_record: team_battle_record<'put'>
    tags: tags<'put'>
    sponsors: sponsors<'put'>
    news: news<'put'>
    members: members<'put'>
    gallery: gallery<'put'>
  }
  patch: {
    teams: teams<'patch'>
    team_battle_record: team_battle_record<'patch'>
    tags: tags<'patch'>
    sponsors: sponsors<'patch'>
    news: news<'patch'>
    members: members<'patch'>
    gallery: gallery<'patch'>
  }
}
