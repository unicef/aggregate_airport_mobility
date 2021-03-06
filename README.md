MagicBox Aggregate Mobility
===========================

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Chat on Gitter](https://badges.gitter.im/unicef-innovation-dev/Lobby.png)](https://gitter.im/unicef-innovation-dev/Lobby)
[![Build Status](https://travis-ci.org/unicef/magicbox-aggregate-mobility.svg?branch=master)](https://travis-ci.org/unicef/magicbox-aggregate-mobility)

Aggregate Amadeus mobility data by administrative boundary to produce CSV output


## What is this?

This repository aggregates [Amadeus](http://www.amadeus.com) mobility data by
administrative boundaries to output a CSV file where each line is
`orig,dest,count`.

Administrative boundaries (ABs) are concepts to describe different geospatial
concepts, like countries, states, provinces, and more. Read more about ABs [on
the MagicBox
wiki](https://github.com/unicef/magicbox/wiki/Administrative-boundaries).

### Why we use it

Amadeus provides a lot of raw data. Not all of it is useful for MagicBox. This
tool reduces the amount of data into three fields:

* `orig`: Origin airport
* `dest`: Destination airport
* `count`: Number of people traveling between `orig` to `dest`

This data helps us understand travel patterns for MagicBox. For example, we may
be able to predict a risk of a virus (e.g. Zika) to spread to a new location.


## Getting started

These instructions get you a copy of the project up and running on your local
machine for development and testing purposes.

### Prerequisites

* Node.js 7.0 or later
* gzip
* [Apache Spark](https://spark.apache.org/)
    * Java JDK 7 or later
    * [Apache Hadoop](https://hadoop.apache.org/)

Make sure `JAVA_HOME` environment variable is set on your system. If you install
Hadoop and Spark from the source, make sure they are on your system `PATH` (e.g.
`hadoop-3.0.0/bin` and `spark-2.2.1-bin-hadoop2.7/bin`).

### Installing

Run these commands at a command prompt.

```bash
git clone https://github.com/unicef/magicbox-aggregate-mobility.git
cd magicbox-aggregate-mobility
cp config_sample.js config.js
npm install
```


## Usage

### Configuration

There are a few different options to set in the `config.js` file:

* **`zipped`**: Stores compressed Amadeus traffic data
* **`processed`**: Final location of processed data
* **`spark_path`**: Install location of spark shell binary `spark-shell`.
Leave blank if `spark-shell` is in your path.
_note:_ please include a trailing slash.
* **`aggregation_level`**: value in form adminX where X is one of 0, 1, 2, 3, 4 or 5.
The administrative level boundary level data should be aggregated to.    
* **`fields`**: Filtered fields from raw Amadeus data

To get the compressed data…

More info coming soon.

<!--

To this section specifically, we need to cover these things:

* How can someone get the directories listed above
* Where can they get the compressed data? Is there test data?
* We should try to use sane defaults so a user doesn't have to change anything
  to run, unless they're making special changes

 -->


### Running with Docker

In this repository you can find a Dockerfile to build an image of this project.

Build the image:

```
docker build -t unicef/magicbox_aggregate_mobility .
```

You can then run this project within docker using:

```
docker run --rm -v $(pwd):/app unicef/magicbox_aggregate_mobility node main.js
```

## Running tests

```bash
npm run test
```


## Contributing

Check out the following:

1. [MagicBox contributing
   guidelines](https://github.com/unicef/magicbox/wiki/Contributing-guidelines)
2. [magicbox-aggregate-mobility
   checklist](https://github.com/unicef/magicbox-aggregate-mobility/blob/master/.github/CONTRIBUTING.md)


## Legal

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

This project is licensed under the [BSD 3-Clause
License](https://opensource.org/licenses/BSD-3-Clause).
