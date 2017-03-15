
class DatabaseCollection {
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    findUnique(fields){
      return this.db.collection(this.collection).distinct(fields)
    }

    findOne(recordId) {
        return this.db.collection(this.collection).findOne({_id: this.db.getObjectId(recordId)});
    }

    findFirst(filter) {
        return this.db.collection(this.collection).findOne(filter);
    }

    findMany(filters=null) {
        return this.db.executeQuery(this.collection, filters);
    }

    count(filter) {
        return this.db.collection(this.collection).count(filter);
    }

    update(recordId, fields) {
        return this.db.collection(this.collection).findOneAndUpdate({_id: this.db.getObjectId(recordId)}, {$set: fields},{
            returnOriginal: false
        })
            .then( response => {
                return response.value;
            });
    }

    remove(recordId) {
        return this.db.collection(this.collection)
            .findOneAndDelete({_id: this.db.getObjectId(recordId)})
            .then( (response) => {
                return response.value;
            });
    }

    create(record) {
        return this.db.collection(this.collection).insertOne(record)
            .then(() => {
                return record;
            });
    }
}

module.exports = DatabaseCollection;
