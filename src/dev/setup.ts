import { DefaultDataOptionKey } from 'ptnl-constructor-sdk/constants';
import { setupDevEnv } from 'ptnl-constructor-sdk/dev';
import { EDataset, ECitiesColumn } from 'ptnl-constructor-sdk/dev.assets';
import { EBlockKey } from '../enum';

import { config } from '../config';

setupDevEnv(config, {
    [DefaultDataOptionKey]: {
        dataset: EDataset.Cities,
        blocks: {
            [EBlockKey.Group]: [ECitiesColumn.City],
            [EBlockKey.Plan]: [ECitiesColumn.Population1989],
            [EBlockKey.Fact]: [ECitiesColumn.Population2020],
        },
    },
});
