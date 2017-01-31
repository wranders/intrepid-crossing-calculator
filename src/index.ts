import 'reflect-metadata';
import { MarketApi, SearchApi, UniverseApi } from './esiclient';
import { LookupItem, LookupResult } from './models';
import { Lookup } from './models/lookup';
import { Parser } from './parsing';
import * as koa from 'koa';
import * as Router from 'koa-router';
import * as serve from 'koa-static';
import { Connection, createConnection } from 'typeorm';

var bodyParser = require('koa-bodyparser');

const app = new koa();
const router = new Router();

let dbConnection: Connection = null;

async function GetConnection() {

  if (dbConnection != null) {
    return dbConnection;
  }
  console.log("Establishing database connection");
  dbConnection = await createConnection({
    driver: {
      type: "postgres",
      host: process.env.PG_PORT_5432_TCP_ADDR,
      port: process.env.PG_PORT_5432_TCP_PORT,
      username: "postgres",
      password: "password1",
      database: "irc"
    },
    entities: [
      LookupItem,
      Lookup
    ],
    autoSchemaSync: true
  })
}

GetConnection().then(conn => {
  console.log("Connected to database");
}).catch((e) => {
  console.log("Error connecting to database: ");
  console.log(e);
});

async function SaveLookup(lookup: Lookup) {
  let connection = await GetConnection();
  await connection.entityManager.persist(lookup);
  var result = await connection.entityManager.createQueryBuilder(Lookup, 'lookup')
    .orderBy('lookup.id', "DESC").getOne();
  lookup.id = result.id;
  return lookup;
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

async function lookupItemPrice(lookupItem: LookupItem): Promise<LookupResult> {
  try {
    var search = new SearchApi();
    var universe = new UniverseApi();
    let market = new MarketApi();
    var items = (await search.getSearch(lookupItem.name, ["inventorytype"], "en-us", true));
    if (!items.body.inventorytype) {
      return new LookupResult(0, false, lookupItem.name, lookupItem.quantity, 0, 0);
    }
    let lowestItemID = Math.min(...items.body.inventorytype);
    let type = (await universe.getUniverseTypesTypeId(lowestItemID)).body;
    let marketDetails = (await market.getMarketsRegionIdOrders(10000002, "buy", lowestItemID)).body;
    let bestBuyPrice = Math.max(...marketDetails.map(det => det.price));
    return new LookupResult(0, true, type.name, bestBuyPrice * .85, lookupItem.quantity, lowestItemID);
  }
  catch (e) {
    console.log(e);
    return new LookupResult(0, false, lookupItem.name, lookupItem.quantity, 0, 0);
  }
}

router.post('/api/item/', async (ctx, next) => {
  var lookup = new Lookup(); 
  let itemsToLookup = Parser.parse((<any>ctx.request).body.data).filter(item => item !== undefined);
  lookup.items = itemsToLookup;
  lookup = await SaveLookup(lookup);
  console.log(lookup.id);
  let results = await Promise.all(itemsToLookup.map(async (item) => await lookupItemPrice(item)));
  let id = 0;
  results.forEach(res => {
    res.id = ++id;
  });
  ctx.body = { id: lookup.id, results };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(__dirname + '/static'))
  .listen(4000);