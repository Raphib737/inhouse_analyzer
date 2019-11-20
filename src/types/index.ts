import { Match } from "./match_history";

export interface ApiData {
  match_history: Match[];
}

export interface PageComponentProps {
  data: ApiData | null;
}
