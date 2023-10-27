export interface RocketProps {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: { cores: any[] };
  second_stage: { block?: number; payloads: any[] };
  fairings: {
    reused?: boolean;
    recovery_attempt?: boolean;
    recovered?: boolean;
    ship?: string | null;
  };
}