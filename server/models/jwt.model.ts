export type Session {
id: string;
dateCreated: string;
userName: string;
issued: number;
expires: number;
}

/**
* Identical to the Session type, but without the `issued` and `expires` properties.
*/
export type PartialSession = Omit<Session, "issued" | "expires">;

export interface EncodeResult {
  token: string,
  expires: number,
  issued: number
}

export interface DecodeResult {
  type: 'valid' | "integrity-error" | "invalid-token";
  session?: Session;
}

export type ExpirationStatus = "expired" | "active" | "grace";
