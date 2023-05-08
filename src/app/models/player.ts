export interface Player {
    playerName: string;
    genre: string;
    dateOfBirth: Date | null;
    startDate: Date | null;
    badgeNo: string;
    isActive: boolean;
    id: number | null | undefined;
    createdAt: Date;
    lastModified: Date;
}