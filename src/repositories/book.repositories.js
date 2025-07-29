import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
    )`);

    function createBookRepository( newBook, userId){
        return new Promise((res, rej) => {
            const { title, author } = newBook;
            db.run(
                `INSERT INTO books (title, author, userId) VALUES (?,?,?)`,
                [title, author, userId],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newBook});
                    }
                }
            )
        })
    }

    function findAllBooksRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM books`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findBookByIdRepository(bookId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM books WHERE id = ?`,
                [bookId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateBookRepository( updateBook, bookId){
        return new Promise((res, rej) => {
          const fields = ['title', 'author','userId']

          let query = 'UPDATE books SET'
          const values = []

          fields.forEach((field) => {
            if(updateBook[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateBook[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(bookId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: bookId, ...updateBook});

            }
          })
        })
    }

    function deleteBookRepository(bookId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM books
                    WHERE id = ? 
                `, [bookId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Book deleted deleted', bookId})
                    }
                })
        })
    }

    function searchBookRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM books WHERE
                title LIKE ? OR author LIKE ?`,
            [`%${search}%` , `%${search}%`],   // ira buscar caracteres da palavra , cada Search refere a cada variavel
            (err, rows) => {
                if (err) {
                    rej(err)
                } else {
                    res(rows)
                }
            }
        )
        })
    }

    export default{
        createBookRepository,
        findAllBooksRepository,
        findBookByIdRepository,
        updateBookRepository,
        deleteBookRepository,
        searchBookRepository
    }