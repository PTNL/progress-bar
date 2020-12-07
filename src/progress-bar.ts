import { EBlockKey } from './enum';
import { Declare, Widget, OnChange } from 'ptnl-constructor-sdk';
import { DefaultDataOptionKey } from 'ptnl-constructor-sdk/constants';
import tippy, { followCursor } from 'tippy.js';

const container = document.getElementById('root');

const COLORS = [
    '#00AFD7',
    '#C724B1',
    '#10069F',
    '#FF9900',
    '#1857F0',
    '#FEDB00',
    '#78D64B',
    '#0C83E4',
    '#8A1F7A',
    '#E45D2B',
    '#F5C7D1',
    '#0E0F7D',
    '#ED6881',
    '#70B5EC',
    '#D76BC8',
    '#6F6CC3',
];

@Declare()
export class Progressbar extends Widget implements OnChange {
    get columns() {
        return this.dataSettings[DefaultDataOptionKey].columnsByBlock;
    }

    get rows(): any[] {
        return this.data[DefaultDataOptionKey];
    }

    onChange(): void {
        const topValue = this.getTopValue();

        const rows = this.rows
            .map((row, index) => {
                return this.renderItem(
                    index,
                    topValue,
                    this.getValue(row, EBlockKey.Plan),
                    this.getValue(row, EBlockKey.Fact),

                    this.getValue(row, EBlockKey.Group),
                    this.getName(EBlockKey.Plan),
                    this.getName(EBlockKey.Fact),
                );
            })
            .join('');

        container.innerHTML = `<table>${rows}</table>`;

        Array.from(document.querySelectorAll('.bar')).forEach((element) => {
            tippy(element, {
                content: element.querySelector('.tooltip-content').innerHTML,
                allowHTML: true,
                followCursor: true,
                plugins: [followCursor],
            });
        });

        this.ready();
    }

    private renderItem(
        index: number,
        topValue: number,
        planValue: number,
        factValue: number,
        label: string,
        planLabel: string,
        factLabel: string,
    ): string {
        const topPR = topValue / 100;
        const factWidth = factValue / topPR;
        const planWidth = planValue / topPR;

        const bg = COLORS[index % COLORS.length];
        return `
            <tr>
                <td>${label}</td>
                <td>
                    <div class="bar">
                        <div class="plan" style="width: ${planWidth}%; background: ${bg};"></div>
                        <div class="fact" style="width: ${factWidth}%; background: ${bg};"></div>
                        
                        <script class="tooltip-content" type="text/html">
                            <div>${planLabel} - <b>${planValue}</b></div>
                            <div>${factLabel} - <b>${factValue}</b></div>
                        </script>
    
                    </div>
                </td>
            </tr>
        `;
    }

    private getName(key) {
        if (this.columns[key] && this.columns[key].length) {
            return this.columns[key][0].name;
        }
        return null;
    }

    private getValue(row, key) {
        if (this.columns[key] && this.columns[key].length) {
            return row[this.columns[key][0].path];
        }
        return null;
    }

    private getTopValue(): number {
        let topValue = 0;

        this.rows.forEach((row) => {
            topValue = Math.max(
                topValue,
                row[this.columns[EBlockKey.Plan][0].path],
                row[this.columns[EBlockKey.Fact][0].path],
            );
        });

        return topValue;
    }
}
