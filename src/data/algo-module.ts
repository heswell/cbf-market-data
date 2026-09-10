import { Table, VuuModule } from '@vuu-ui/vuu-data-test';
import { TableSchema } from '@vuu-ui/vuu-data-types';
import { AlgoTableName, schemas } from './algo-schemas';
import { pricesTable } from './pricesTable';

const tables: Record<AlgoTableName, Table> = {
  prices: pricesTable,
};

class AlgoModule extends VuuModule<AlgoTableName> {
  constructor() {
    super('ALGO');
  }

  protected get schemas(): Record<AlgoTableName, Readonly<TableSchema>> {
    return schemas;
  }

  protected get tables(): Record<AlgoTableName, Table> {
    return tables;
  }

  protected get menus() {
    return undefined;
  }

  protected get menuServices() {
    return undefined;
  }

  protected get services() {
    return undefined;
  }

  protected get visualLinks() {
    return undefined;
  }
}

export const algoModule = new AlgoModule();
