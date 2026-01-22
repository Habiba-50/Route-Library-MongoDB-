// import { users } from '../../DB/model/index.js'

import { bookModel } from "../../DB/model/book.model.js";

export const createIndex = async () => {
  const result = await bookModel.createIndex({ title: 1 });;

  return result;
};

export const createBooks = async (inputs) => {
  const result = await bookModel.insertOne(inputs);

  return result;
};

export const createManyBooks = async (inputs) => {
  const result = await bookModel.insertMany(inputs);

  return result;
};

export const updateFuture = async (year, title) => {
  const result = await bookModel.updateOne(
    { title: title },
    { $set: { year: year } },
  );
  return result;
};

export const getBookByTitle = async (title) => {
  const result = await bookModel.findOne({ title: title });
  return result;
};

export const getAllBooks = async (from, to) => {
  const result = await bookModel
    .find({ year: { $gte: from, $lte: to } })
    .toArray();
  console.log(result);

  return result;
};

export const getBookByGenre = async (genre) => {
  const result = await bookModel.find({genres: { $in: [genre] },}).toArray();
  return result;
};

export const getBookBySkipLimit = async () => {
  const result = await bookModel.find().sort({year:-1}).skip(2).limit(3).toArray()
  return result;
};

export const getBookByYearInteger = async () => {
  const result = await bookModel.find({ year: { $type: "int" } }).toArray();
  return result;
};

export const getBookByExecludeGeners = async () => {
  const result = await bookModel.find({genres:{$nin:["Horror", "Science Fiction"]}}).toArray();
  return result;
};

export const getBooksBeforeYear = async (input) => {
  // console.log(typeof (year), year);
  const year = Number(input)
  
  const result = await bookModel.deleteMany({ year: { $lt: year } });
  console.log(result);
  
  return result;
};

export const aggregate1 = async () => {
  const result = await bookModel.aggregate([
    {
      $match: { year: { $gt: 2000 } },
    },
    {
      $sort: { year: -1 },
    },
  ]).toArray();
  return result
}


export const aggregate2 = async () => {
  const result = await bookModel
    .aggregate([
      {
        $match: { year: { $gt: 2000 } },
      },
      {
        $project: { _id: 0, title: 1, author: 1, year: 1 },
      },
    ])
    .toArray();
  return result
}


export const aggregate3 = async () => {
  const result = await bookModel
    .aggregate([
    {
        $unwind:{
            path:"$genres",
            includeArrayIndex:"genresIndex",
            preserveNullAndEmptyArrays:true
        }
    },
])
    .toArray();
  return result
}

export const aggregate4 = async () => {
  const result = await bookModel
    .aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "_id",
          foreignField: "book_id",
          as: "logsData",
        },
      },
    ])
    .toArray();
  return result
}