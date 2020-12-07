import {
    EDataBlockType,
    EDataQueryMethod,
    EDatasetColumnType,
    EDataQueryFunction,
} from 'ptnl-constructor-sdk/enums';
import { IWidgetConfig } from 'ptnl-constructor-sdk/interfaces';
import { filterBlock, sortBlock } from 'ptnl-constructor-sdk/config-blocks';
import { EBlockKey } from './enum';

export const config: IWidgetConfig = {
    label: {
        ru: 'Прогресс бар',
        en: 'Progress bar',
    },
    icon: 'icon.svg',
    dataOptions: [
        {
            method: EDataQueryMethod.Aggregate,
            blocks: [
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Fact,
                    dataType: EDatasetColumnType.Fact,
                    function: EDataQueryFunction.Sum,
                    label: {
                        ru: 'Факт',
                        en: 'Fact',
                    },
                    max: 1,
                },
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Plan,
                    dataType: EDatasetColumnType.Fact,
                    function: EDataQueryFunction.Sum,
                    label: {
                        ru: 'План',
                        en: 'Plan',
                    },
                    max: 1,
                },
                {
                    type: EDataBlockType.Column,
                    key: EBlockKey.Group,
                    dataType: EDatasetColumnType.Dimension,
                    function: EDataQueryFunction.Group,
                    label: {
                        ru: 'Группировка',
                        en: 'Group',
                    },
                    max: 1,
                },
                ...filterBlock,
                ...sortBlock,
            ],
        },
    ],
};
