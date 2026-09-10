import { Table } from '@vuu-ui/vuu-table';
import { TableConfig } from '@vuu-ui/vuu-table-types';
import { useData } from '@vuu-ui/vuu-utils';
import { useMemo } from 'react';

export const PricesTable = () => {
  const { VuuDataSource } = useData();
  const dataSource = useMemo(
    () =>
      new VuuDataSource({
        columns: [
          'symbolLevel',
          'level',
          'bidQuantity',
          'bid',
          'offer',
          'offerQuantity',
        ],
        table: { module: 'ALGO', table: 'prices' },
      }),
    [VuuDataSource]
  );

  const config = useMemo<TableConfig>(
    () => ({
      columnLayout: 'fit',
      columnSeparators: true,
      columns: [
        {
          name: 'bid',
          serverDataType: 'long',
        },
        {
          name: 'bidQuantity',
          serverDataType: 'long',
        },
        {
          name: 'level',
          serverDataType: 'int',
        },
        {
          name: 'offer',
          serverDataType: 'long',
        },
        {
          name: 'offerQuantity',
          serverDataType: 'long',
        },
        {
          name: 'symbol',
          serverDataType: 'long',
        },
        {
          name: 'symbolLevel',
          serverDataType: 'string',
        },
      ],
      zebraStripes: true,
    }),

    []
  );

  return <Table config={config} dataSource={dataSource} />;
};
