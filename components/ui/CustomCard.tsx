const CustomCard = function (props: { review: string | null | undefined; prod: string | null | undefined; num: number }) {
    let color = '#00ca92';
    if (props.num < 75)
        color = '#ffc22d' // warning
    if (props.num < 50)
        color ='#ff6f70' // error
    const style = { "--value": props.num, "color": color} as React.CSSProperties;
    return (
        <div className="flex p-5 w-full bg-white border border-red-600 rounded rounded-lg box-border gap-5">
            <div className="w-1/4 h-full">
                <div className="radial-progress" style={style} role="progressbar">
                    {props.num}%
                </div>
            </div>
            <div className="flex flex-col h-full content-center justify-start">
                <p className="font-bold text-lg lg:text-xl">{props.review}</p>
                <p>{props.prod}</p>
            </div>
        </div>
    )
}

export default CustomCard;