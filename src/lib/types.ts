export type GroupedByUsername = {
  username: string;
  rank: number;
  tweets: {
    url: string;
    topic: string;
  }[];
  profile?: {
    id_str: string;
    name: string;
    profile_image_url_https: string;
    screen_name: string;
    verified: boolean;
    is_blue_verified: boolean;
    profile_image_shape: string;
  };
}[];
