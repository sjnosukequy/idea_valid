import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

const CustomCard = function (props: { review: string | null | undefined; prod: string | null | undefined; num: number }) {
    let color = '#10B981';
    let icon = ThumbsUp;
    let bgColor = 'bg-green-50';
    let borderColor = 'border-green-200';

    if (props.num < 75) {
        color = '#FBBF24';
        icon = Meh;
        bgColor = 'bg-yellow-50';
        borderColor = 'border-yellow-200';
    }
    if (props.num < 50) {
        color = '#EF4444';
        icon = ThumbsDown;
        bgColor = 'bg-red-50';
        borderColor = 'border-red-200';
    }

    const Icon = icon;

    return (
        <Card className={`w-full overflow-hidden ${bgColor} ${borderColor} border-2 transition-all duration-300 scale-95 hover:scale-100`}>
            <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 bg-white rounded-full shadow-inner"></div>
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="3"
                            />
                            <path
                                d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke={color}
                                strokeWidth="3"
                                strokeDasharray={`${props.num}, 100`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold" style={{ color: color }}>{props.num}%</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 flex items-center" style={{ color: color }}>
                            <Icon className="mr-2" /> {props.review}
                        </h3>
                        <p className="text-gray-600">{props.prod}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CustomCard;