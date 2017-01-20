import 'reflect-metadata';
import { Lookup } from './models/lookup';
import { LookupItem, LookupResult } from './models';
import { Parser } from './parsing';
import * as koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';

var bodyParser = require('koa-bodyparser');

import { createConnection } from "typeorm";

import {
  Categories2,
  Client,
  Datasource,
  Datasource44,
  Datasource45,
  Datasource53,
  Language2,
  Order_type
} from './esiclient';

const app = new koa();
const router = new Router();

let client = new Client('https://esi.tech.ccp.is/latest');

let dbConnection: Connection = null;

async function GetConnection() {
  if (dbConnection != null) {
    return dbConnection;
  }
  return await createConnection({
    driver: {
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "password1",
      database: "irc"
    },
    entities: [
      LookupItem,
      Lookup
    ],
    autoSchemaSync: true,
  })
}

async function SaveLookup(lookup: Lookup) {
  let connection = await GetConnection();
  await connection.entityManager.persist(lookup);
}

async function GetAllLookups(): Promise<Array<Lookup>> {
  var connection = await GetConnection();
  let repo = connection.getRepository(Lookup);
  return await repo.find({
    alias: "repo",
    innerJoinAndSelect: {
      "metadata": "repo.items"
    }
  });
}

async function GetLookupById(id: number): Promise<Lookup> {
  var connection = await GetConnection();
  let repo = connection.getRepository(Lookup);
  return await repo.findOneById(id, {
    alias: "repo",
    innerJoinAndSelect: {
      "metadata": "repo.items"
    }
  });
}


GetConnection().then((connection => {
  dbConnection = connection;
})).then(() => {
  GetLookupById(9).then(lookup => {
    console.log(JSON.stringify(lookup));
  });
});



async function lookupItemPrice(lookupItem: LookupItem): Promise<LookupResult> {
  let items = await client.get_search(lookupItem.name, [Categories2.Inventorytype], Language2.EnUs, true, Datasource45.Tranquility);
  let lowestItemID = Math.min(...items.inventorytype);
  let type = await client.get_universe_types_type_id(lowestItemID, Datasource53.Tranquility);
  let marketDetails = await client.get_markets_region_id_orders(10000002, lowestItemID, Order_type.Buy, 1, Datasource44.Tranquility);
  let bestBuyPrice = Math.max(...marketDetails.filter(det => det.is_buy_order).map(det => det.price))
  return new LookupResult(0, type.type_name, bestBuyPrice, lookupItem.quantity, lowestItemID);
}

router.post('/api/item/', async (ctx, next) => {
  var lookup = new Lookup();
  let itemsToLookup = Parser.parse((<any>ctx.request).body.data).filter(item => item !== undefined);
  lookup.items = itemsToLookup;
  SaveLookup(lookup);
  let results = await Promise.all(itemsToLookup.map(async (item) => await lookupItemPrice(item)));
  let id = 0;
  results.forEach(res => {
    res.id = ++id;
  });
  ctx.body = results;
});


app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname + '/static'))
  .listen(4000);