import './Donut.css'; // Импортируем CSS файл для анимаций

const Donut = ({
    centerX = 1,
    centerY = 1,
    outerRadius = 1,
    innerRadius = 0.6,
    size = 400, // Новый пропс для размера
    gradientType = 'linear', // Тип градиента: 'linear' или 'radial'
    gradientColors = ['#ff0000', '#00ff00'], // Цвета градиента
}) => {
    const pathData = `
        M ${centerX},${centerY}
        m -${outerRadius}, 0
        a ${outerRadius},${outerRadius} 0 1,0 ${outerRadius * 2},0
        a ${outerRadius},${outerRadius} 0 1,0 -${outerRadius * 2},0
        M ${centerX},${centerY}
        m -${innerRadius}, 0
        a ${innerRadius},${innerRadius} 0 1,1 ${innerRadius * 2},0
        a ${innerRadius},${innerRadius} 0 1,1 -${innerRadius * 2},0
        Z
    `;

    return (
        <svg width={size} height={size} className="donut-path" viewBox={`0 0 2 2`}>
            <defs>
                {gradientType === 'linear' ? (
                    <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {gradientColors.map((color, index) => (
                            <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
                        ))}
                    </linearGradient>
                ) : (
                    <radialGradient id="donutGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        {gradientColors.map((color, index) => (
                            <stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
                        ))}
                    </radialGradient>
                )}
            </defs>
            <path d={pathData} fill="url(#donutGradient)" />
        </svg>
    );
};

export default Donut;
