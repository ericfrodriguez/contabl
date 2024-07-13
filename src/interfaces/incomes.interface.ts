export interface Income {
    id: number;
    description: string;
    amount: string;
    date: Date;
    isRecurring: boolean | null;
    recurrenceDate: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}