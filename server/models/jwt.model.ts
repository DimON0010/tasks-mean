export interface Session {
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

export type DecodeResult =
  | {
        type: "valid";
        session: Session;
    }
  | {
        type: "integrity-error";
    }
  | {
        type: "invalid-token";
    };

export type ExpirationStatus = "expired" | "active" | "grace";
