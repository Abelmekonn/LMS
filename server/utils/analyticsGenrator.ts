import { Document, model, Model } from "mongoose";

interface MonthData {
    month: string;
    count: number;
}

export async function generateLastMonthData<T extends Document>(
    model: Model<T>
): Promise<{ last12Month: MonthData[]}> {
    const last12Months: MonthData[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), 
                                currentDate.getMonth(), 
                                currentDate.getDate() - i * 28)

        const startDate = new Date(endDate.getFullYear(), 
                                    endDate.getMonth(), 
                                    endDate.getDate() - 28);

        const monthYear = endDate.toLocaleDateString('default', 
                                                    { day: "numeric", 
                                                    month: "short", 
                                                    year: "numeric" 
                                                })

        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });
        last12Months.push({ month: monthYear, count })
    };
    return { last12Month: last12Months };
}