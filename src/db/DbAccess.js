"use strict";

const mongodb = require("mongodb");
const util = require("util");


class DbAccess
{
    constructor(db)
    {
        this._db = db;
    }

    getObjectId(idStr)
    {
        return mongodb.ObjectID(idStr);
    }

    collection(name)
    {
        return this._db.collection(name);
    }

    executeQuery(model, filters)
    {
        if (!filters)
            filters = {};

        if (filters.find) {
            Object.keys(filters.find).forEach(function (key) {
                if (key.slice(-3) === "_id") {
                    if (mongodb.ObjectId.isValid(filters.find[key])) {
                        filters.find[key] = new mongodb.ObjectID(filters.find[key].toString());
                    }
                    else {
                        Object.keys(filters.find[key]).forEach(function (key2) {
                            if (mongodb.ObjectId.isValid(filters.find[key][key2])) {
                                filters.find[key][key2] = new mongodb.ObjectID(filters.find[key][key2].toString());
                            }
                        });
                    }
                }
            });
        }

        var cursor = this._db.collection(model).find(filters.find || {});

        if (filters.select)
            cursor = cursor.project(filters.select);

        if (filters.sort)
            cursor = cursor.sort(filters.sort);

        if (filters.limit !== null && filters.limit !== undefined)
            cursor = cursor.limit(filters.limit);

        if (filters.skip !== null && filters.skip !== undefined)
            cursor = cursor.skip(filters.skip);

        return cursor.toArray();
    };
}

module.exports = DbAccess;
