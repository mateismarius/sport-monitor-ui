
export interface Evaluation {
    test: string,
    player: string,
    result: number,
    takenAt: Date | null,
    id: number,
    createdAt: Date,
    lastModified: Date
}