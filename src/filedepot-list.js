#!/usr/bin/env node

require('dotenv').config({ silent: true });
const program = require('commander');
const models = require('filedepot-models');
require('console.table');

program
  .description('List all buckets managed by FileDepot')
  .option('-l, --list', 'list bucket IDs only')
  .parse(process.argv);


models.Bucket
  .findAll({
    logging: false
  })
  .then((buckets) => {
    if (program.list) {
      buckets.forEach((bucket) => {
        console.log(bucket.bucketId);
      });
      return;
    }

    let resultTable = [];
    buckets.forEach((bucket) => {
      resultTable.push([
        bucket.bucketId,
        bucket.path
      ]);
    });

    let columnHeaders = [
      'Bucket ID',
      'Path'
    ];

    console.table(
      columnHeaders,
      resultTable
    );
  });
