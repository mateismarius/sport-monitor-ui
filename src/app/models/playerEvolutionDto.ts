export interface PlayerEvolutionDto {
    testName: string;
    testResults: [
        {
            takenAt: Date;
            evolution: number;
        }
    ];
}


