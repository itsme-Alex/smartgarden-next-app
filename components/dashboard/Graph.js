import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import styles from '@/styles/dashboard/graph.module.scss';

const formatDateToDay = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const formatDateTip = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('fr-FR', options);
};

const Graph = ({ electrovalves }) => {
    const containerRef = useRef();

    useEffect(() => {
        const data = [];
        let minDate = new Date();
        let maxDate = new Date(0);
        let minVolume = Infinity;
        let maxVolume = -Infinity;

        electrovalves.forEach((electrovalve) => {
            const volumeByDay = {};

            electrovalve.irrigations.forEach((irrigation) => {
                const day = formatDateToDay(irrigation.dateStart);
                const date = new Date(day);

                minDate = new Date(Math.min(minDate, date));
                maxDate = new Date(Math.max(maxDate, date));

                volumeByDay[day] = (volumeByDay[day] || 0) + irrigation.volume;
                minVolume = Math.min(minVolume, volumeByDay[day]);
                maxVolume = Math.max(maxVolume, volumeByDay[day]);
            });

            for (const [day, volume] of Object.entries(volumeByDay)) {
                data.push({ day, volume, name: electrovalve.name });
            }
        });

        if (data.length > 0) {
            const chart = Plot.plot({
                insetRight: 25,
                insetBottom: 15,
                grid: true,
                x: {
                    label: 'Jour',
                    type: 'utc',
                    domain: [minDate, maxDate],
                    style: { stroke: 'black' },
                    tickFormat: (d) => {
                        const date = new Date(d);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                    },
                    /*tickRotate: -45,*/ // Rotation de 45 degrés en sens anti-horaire
                },
                y: {
                    label: 'Volume (mm)',
                    grid: true,
                    domain: [minVolume, maxVolume],
                    style: { stroke: 'black' },
                    tickFormat: (d, i) => {
                        return d;
                    },
                },
                marks: [
                    Plot.ruleY([0]),
                    Plot.line(data, { x: 'day', y: 'volume', stroke: 'name', tip: d => `Volume: ${d.volume} mm à ${formatDateTip(d.day)}`
                    }),
                    Plot.text(data, Plot.selectLast({ x: 'day', y: 'volume', z: 'name', text: 'name', textAnchor: 'start', dx: 3, tip: d => `Volume: ${d.volume} mm à ${formatDateTip(d.day)}`
                    }))
                ],
            });

            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(chart);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = ''; // Utilisation de la référence pour effacer le graphique lors du démontage du composant
            }
        };
    }, [electrovalves]);

    return <div ref={containerRef} id="chart" className={styles.graph}></div>; // Utilisation de la référence
};

export default Graph;
