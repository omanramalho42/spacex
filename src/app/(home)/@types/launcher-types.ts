import { RocketProps } from "./rockets-types";

export interface LauncherProps {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: Date;
  launch_date_local: Date;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window?: number;
  rocket: RocketProps;
  ships: string[];
  telemetry: { flight_club?: string };
  launch_site: {
    site_id: string;
    site_name: string;
    site_name_long: string;
  };
  launch_success?: boolean;
  launch_failure_details: {
    time?: number;
    altitude?: number;
    reason?: string;
  };
  links: {
    mission_patch?: string;
    mission_patch_small?: string;
    reddit_campaign?: string;
    reddit_launch?: string;
    reddit_recovery?: string;
    reddit_media?: string;
    presskit?: string;
    article_link?: string;
    wikipedia?: string;
    video_link?: string;
    youtube_id?: string;
    flickr_images: string[];
  };
  details?: string;
  static_fire_date_utc?: Date;
  static_fire_date_unix?: number;
  timeline: { webcast_liftoff?: number };
  crew?: string[];
}
