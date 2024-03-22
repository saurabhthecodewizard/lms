import { Document, Model } from 'mongoose';

interface Month {
    month: string;
    count: number;
}

export async function generateLastYearData<T extends Document>(
    model: Model<T>,
    whereClause?: any
): Promise<{ lastYearData: Month[] }> {
    const lastYearData: Month[] = []
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - i * 28);
        const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 28);

        const monthYear = endDate.toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        const count = await model.countDocuments({
            ...whereClause,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            },
        })

        lastYearData.push({
            month: monthYear,
            count: count
        })
    }

    return {
        lastYearData
    }
}