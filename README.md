# GoLang Book Listing App

<p align="center"><img src="https://proxsoftwaresolution.com/uploads/images/book_list.png"></p>

## Requirements & Installation
- Install GoLang at here : https://golang.org/dl
- Installation 
```
cd to_your_go_src_directory/
git clone https://github.com/zawmyolatt/books-list
cd books-list/
cp .env.example .env
go get -u github.com/subosito/gotenv
go get -u github.com/gorilla/mux
go get -u github.com/lib/pq
```

## Configuration and Run
- set PostgreSQL access URL in .env, alternately can use https://www.elephantsql.com
- create books index with this query
```
create table books (id serial, title varchar, author varchar, year varchar);
```
- Run the App Api Server
```
cd books-list/
go run main.go 
```
- Run the javascript user interface by open html/index.html, Cheer.


## License

The Book Listing App is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
