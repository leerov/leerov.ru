'use client';
import React, { useState } from 'react';
import './donut.scss';

const Donut = ({
    centerX = 1,
    centerY = 1,
    outerRadius = 1,
    innerRadius = 0.6,
    size = 100,
    gradientType = 'linear', // 'linear' or 'radial'
    gradientColors = ['#e067f7', '#a434df'],
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Функция для генерации пути для SVG
    const generatePathData = () => {
        return `
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
    };

    const pathData = generatePathData();

    // Обработчик клика
    const handleClick = () => {
        setIsExpanded(true);
        setTimeout(() => {
            window.location.href = '/home';
        }, 1000);
    };

    // Генерация градиента
    const renderGradient = () => {
        const GradientComponent = gradientType === 'linear' ? 'linearGradient' : 'radialGradient';
        const gradientProps = gradientType === 'linear' 
            ? { x1: "0%", y1: "0%", x2: "100%", y2: "100%" } 
            : { cx: "50%", cy: "50%", r: "50%", fx: "50%", fy: "50%" };

        return (
            <GradientComponent id="donutGradient" {...gradientProps}>
                {gradientColors.map((color, index) => (
                    <stop 
                        key={index} 
                        offset={`${(index / (gradientColors.length - 1)) * 100}%`} 
                        stopColor={color} 
                    />
                ))}
            </GradientComponent>
        );
    };

    return (
        <div className="donut-container">
            <div className={`opacity-div ${isExpanded ? 'expanded' : ''}`} />
            <svg
                width={size}
                height={size}
                className={`donut-path ${isExpanded ? 'expanded' : ''}`}
                viewBox="0 0 2 2"
                onClick={handleClick}
            >
                <defs>
                    {renderGradient()}
                </defs>
                <path d={pathData} fill="url(#donutGradient)" />
            </svg>
        </div>
    );
    
};

export default Donut;
