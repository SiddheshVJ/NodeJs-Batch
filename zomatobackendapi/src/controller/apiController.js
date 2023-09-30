export async function getData(db, colName, query) {
    return await db.collection(colName).find(query).toArray()
}

export async function postData(db, colName, data) {
    return await db.collection(colName).insert(data)
}

export async function getDataWithSort(db, colName, query, sort) {
    return await db.collection(colName).find(query).sort(sort).toArray()
}

export async function getDataWithSortLimit(db, colName, query, sort, skip, limit) {
    return await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
}

export async function updateData(db, colName, condition, data) {
    return await db.collection(colName).updateOne(condition, data)
}

export async function deleteData(db, colName, condition) {
    return await db.collection(colName).deleteOne(condition)
}