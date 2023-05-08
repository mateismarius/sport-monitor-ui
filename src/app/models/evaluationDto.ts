import { Player } from "./player";
import { Test } from "./test";

export interface EvaluationDto {
    test: Test,
    player: Player,
    playerId: number,
    testId: number,
    result: number,
    takenAt: Date | null,
    id: number,
    createdAt: Date,
    lastModified: Date
}