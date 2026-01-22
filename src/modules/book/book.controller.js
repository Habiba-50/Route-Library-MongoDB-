import { Router } from "express";
import { aggregate1, aggregate2, aggregate3, aggregate4, createBooks, createManyBooks, getAllBooks, getBookByExecludeGeners, getBookByGenre, getBookBySkipLimit, getBookByTitle, getBookByYearInteger, getBooksBeforeYear, updateFuture,} from './book.service.js';

const router=Router()

//Insert one document into the books collection.
router.post("/", async (req, res, next) => {
    
    const result = await createBooks(req.body);
    return res.status(201).json({message:"Book Done" , result})
})

// --------------------------------------------------------

// Insert multiple documents into the books collection
router.post("/batch", async (req, res, next) => {
    
    const result = await createManyBooks(req.body);
    return res.status(201).json({message:"Books Done" , result})
})

// -------------------------------------------------------

// Update the book with title “Future” change the year to be 2022.
router.patch("/:title", async (req, res, next) => {
    const { year } = req.body
    const { title } = req.params
    console.log(year , title);
    
    const result = await updateFuture(year , title);
    return res.status(201).json({message:"Updated Successfully" , result})
})

// ----------------------------------------------------

// Find a Book with title “Brave New World”.
router.get("/title", async (req, res, next) => {
    const { title } = req.query
    console.log(title);
    
    const result = await getBookByTitle(title);
    return res.status(201).json({result})
})

// -----------------------------------------------------

// Find all books published between 1990 and 2010.
router.get("/year", async (req, res, next) => {
    // const { from , to } = req.query
    const from = Number(req.query.from);
    const to = Number(req.query.to);
    console.log(from, to);
    
    const result = await getAllBooks(from, to);
    return res.status(201).json(result)
})

// -------------------------------------------

// Find books where the genre includes "Science Fiction".

router.get("/genre", async (req, res, next) => {
  const { genre } = req.query;
  console.log(genre);

  const result = await getBookByGenre(genre);
  return res.status(201).json({ result });
});

// ----------------------------------------------------------

// Skip the first two books, limit the results to the next three, sorted by year in descending order.

router.get("/skip-limit", async (req, res, next) => {
  
  const result = await getBookBySkipLimit();
  return res.status(200).json({ result });
});

// ----------------------------------------------------------

// Find books where the year field stored as an integer.

router.get("/year-integer", async (req, res, next) => {
  const result = await getBookByYearInteger();
  return res.status(200).json({ result });
});

// --------------------------------------------------------------

// Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".

router.get("/execlude-geners", async (req, res, next) => {
  const result = await getBookByExecludeGeners();
  return res.status(200).json({ result });
});

// ----------------------------------------------------------------

// Delete all books published before 2000.

router.delete("/before-year", async (req, res, next) => {
    const { year } = req.query
    console.log(year);
    
  const result = await getBooksBeforeYear(year);
  return res.status(200).json({ result });
});

// ----------------------------------------------------

// Aggregate 1:

router.get("/aggregate1", async (req, res, next) => {
    const result = await aggregate1()
    return res.status(200).json({ result });
})

// --------------------------------------------------

// Aggregate 2:
router.get("/aggregate2", async (req, res, next) => {
  const result = await aggregate2();
  return res.status(200).json({ result });
});

// -------------------------------------------------

// Aggregate 3:

router.get("/aggregate3", async (req, res, next) => {
  const result = await aggregate3();
  return res.status(200).json({ result });
});

// ------------------------------------------------

// Aggregate 4

router.get("/aggregate4", async (req, res, next) => {
  const result = await aggregate4();
  return res.status(200).json({ result });
});

export default router