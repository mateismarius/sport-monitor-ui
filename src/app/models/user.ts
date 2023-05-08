export interface User {
    email: string;
    accessToken: string;
    expiration?: Date;
    refreshToken?: string;
    roles?: string[];
}