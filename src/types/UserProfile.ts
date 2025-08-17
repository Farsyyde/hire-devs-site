export type UserRole = "developer" | "client" | "unassigned";

export interface UserProfile {
  uid: string;
  email?: string;
  displayName?: string;
  headline?: string;           // short one-liner
  bio?: string;                // longer “about”
  stack?: string[];            // ["Next.js", "Solana", "Firebase"]
  links?: {
    website?: string;
    github?: string;
    x?: string;
    linkedin?: string;
    calendly?: string;
    portfolio?: string;
  };
  location?: string;
  availability?: "full-time" | "part-time" | "contract" | "open";
  hourlyRate?: number;         // optional
  premium?: boolean;           // your token/sub status
  role?: UserRole;             // "developer" for profiles
  isPublic?: boolean;          // controls public visibility
  updatedAt?: number;          // Date.now()
  createdAt?: number;          // Date.now()
}
