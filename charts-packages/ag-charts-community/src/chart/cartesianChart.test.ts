import { describe, expect, it, beforeEach, afterEach, jest } from '@jest/globals';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { AgCartesianChartOptions, AgChartOptions } from './agChartOptions';
import { AgChartV2 } from './agChartV2';
import { CartesianChart } from './cartesianChart';
import { Chart, ChartUpdateType } from './chart';
import { SeriesNodeDataContext } from './series/series';
import {
    waitForChartStability,
    IMAGE_SNAPSHOT_DEFAULTS,
    setupMockCanvas,
    extractImageData,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
} from './test/utils';

expect.extend({ toMatchImageSnapshot });

export function getData(): any[] {
    return [
        {
            year: '2001',
            adults: 24,
            men: 22,
            women: 25,
            children: 13,
            portions: 3.4,
        },
        {
            year: '2003',
            adults: 24,
            men: 22,
            women: 26,
            children: 11,
            portions: 3.4,
        },
        {
            year: '2005',
            adults: 28,
            men: 26,
            women: 30,
            children: 17,
            portions: 3.7,
        },
        {
            year: '2007',
            adults: 29,
            men: 25,
            women: 31,
            children: 21,
            portions: 3.8,
        },
        {
            year: '2009',
            adults: 26,
            men: 25,
            women: 28,
            children: 21,
            portions: 3.5,
        },
        {
            year: '2011',
            adults: 27,
            men: 24,
            women: 29,
            children: 18,
            portions: 3.6,
        },
        {
            year: '2013',
            adults: 26,
            men: 25,
            women: 28,
            children: 16,
            portions: 3.6,
        },
        {
            year: '2015',
            adults: 26,
            men: 24,
            women: 27,
            children: 20,
            portions: 3.5,
        },
        {
            year: '2017',
            adults: 29,
            men: 26,
            women: 32,
            children: 18,
            portions: 3.8,
        },
    ];
}

const OPTIONS: AgCartesianChartOptions = {
    autoSize: true,
    data: getData(),
    title: {
        text: 'Fruit & Vegetable Consumption',
        fontSize: 15,
    },
    series: [
        {
            type: 'line',
            xKey: 'year',
            yKey: 'portions',
            yName: 'Portions',
            strokeWidth: 3,
            marker: { enabled: true },
        },
        {
            type: 'area',
            xKey: 'year',
            yKeys: ['adults', 'children'],
            yNames: ['Adults', 'Children'],
            strokeWidth: 3,
            normalizedTo: 32,
            marker: { enabled: true },
        },
        {
            type: 'column',
            xKey: 'year',
            yKey: 'women',
            yName: 'Women',
            grouped: true,
            strokeWidth: 0,
        },
        {
            type: 'column',
            xKey: 'year',
            yKey: 'men',
            yName: 'Men',
            grouped: true,
            strokeWidth: 0,
        },
    ],
    axes: [
        {
            type: 'category',
            position: 'bottom',
            gridStyle: [{ lineDash: [0] }],
        },
        {
            // primary y axis
            type: 'number',
            position: 'left',
            keys: ['women', 'men', 'children', 'adults'],
            title: { text: 'Adults Who Eat 5 A Day (%)' },
        },
        {
            // secondary y axis
            type: 'number',
            position: 'right',
            keys: ['portions'],
            title: { text: 'Portions Consumed (Per Day)' },
        },
    ],
    legend: {
        position: 'bottom',
        item: { marker: { strokeWidth: 0 } },
    },
};

describe('CartesianChart', () => {
    let ctx = setupMockCanvas();

    const compare = async (chart: Chart) => {
        await waitForChartStability(chart);

        const imageData = extractImageData(ctx);
        (expect(imageData) as any).toMatchImageSnapshot(IMAGE_SNAPSHOT_DEFAULTS);
    };

    const YKEYS = OPTIONS.series!.reduce((r, s: any) => {
        return r.concat(s.yKey ? [s.yKey] : s.yKeys);
    }, []);

    describe('Series Highlighting', () => {
        beforeEach(() => {
            console.warn = jest.fn();
        });

        afterEach(() => {
            expect(console.warn).not.toBeCalled();
        });

        it('should render a complex chart', async () => {
            const options: AgChartOptions = { ...OPTIONS };
            options.autoSize = false;
            options.width = CANVAS_WIDTH;
            options.height = CANVAS_HEIGHT;

            const chart = AgChartV2.create<any>(options);
            await compare(chart);
        });

        it.each(YKEYS)(`should render series with yKey [%s] appropriately`, async (yKey) => {
            const options: AgChartOptions = { ...OPTIONS };
            options.autoSize = false;
            options.width = CANVAS_WIDTH;
            options.height = CANVAS_HEIGHT;

            const chart: CartesianChart = AgChartV2.create<any>(options);
            await waitForChartStability(chart);

            const seriesImpl = chart.series.find((v: any) => v.yKey === yKey || v.yKeys?.some((s) => s.includes(yKey)));

            const nodeDataArray: SeriesNodeDataContext<any, any>[] = seriesImpl!['contextNodeData'];
            const nodeData = nodeDataArray.find((n) => n.itemId === yKey);

            chart.changeHighlightDatum({ datum: nodeData?.nodeData[3] });
            chart.update(ChartUpdateType.SERIES_UPDATE);
            await compare(chart);
        });
    });
});
