# Render tree data
## Technical Stack
  * D3.js
  * Webcomponent
  * Web dev server
  * Express
  * Postgresql
## Install postgresql & nodejs
**Nodejs & git is assumed to be latest & already installed**
_Prefer Docker or self installation depending on workstation_
Docker commmand for installing postgres is below.
## Install postgres 

```docker
docker run -d --name dev-postgres -e POSTGRES_PASSWORD=Pass2020! -v ${HOME}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres
```
   OR
1. Download Postgres [https://www.postgresql.org/download/]
2. Setup database server [https://www.postgresql.org/docs/9.1/server-start.html]

**Setting up of Database server is mandatory**

You can use PgAdmin to setup database
## Install PgAdmin
```docker
docker run --rm -p 5050:5050 thajeztah/pgadmin4
```
for simplicity purpose; keep **database name** as **Postgres** ( Default name = default user name ) & **schema name** as **public** ( again default value )

**Setting up of Database is mandatory**

## Setup of the solution
This application uses port at 8000 & 3000; so keep them available. Kill ( if neccessary ) any running process using these port
You can use
```bash
fuser -k 3000/tcp
```
OR
```
kill -9 $(lsof -t -i:3000)
```

Kill process at 8000
```bash
fuser -k 8000/tcp
```
OR
```
kill -9 $(lsof -t -i:8000)
```

### The code needs to be checked out/cloned/downloaded from 
```bash
git clone https://github.com/raichuAK/DisplayData.git
```
Navigate to work directory
```
cd DisplayData
```
Do npm install or yarn install
```
npm install
```

#### Now run the application. This is divided into migration & running main application
##### Migrate
```nodejs
npm run migrate
```

##### Run main application
The flow of network:
WebDevServer running at port 8000 --(proxy is used)---> API Express Server running on 3000 ----->Postgres on 5432

To start the application
```nodejs
npm run web
```
*By default web page is opened in your default browser at http://localhost:8000/public*

#### Optional debug steps
You can check API connection at 
http://localhost:3000/api/parent/

**API Specification**
> GET http://localhost:3000/api/parent/
 - Default response with parent node
 - Get item details i.e. Name, desciption & parent with parentId http://localhost:3000/api/parent/:parentId
 - Get all data http://localhost:3000/api/parent/all
   **( Given sample data size it was redundant to use server side pagination ( Although API end points exist to do it )**

### Run test tool
**Database should be up & running**
```npm
npm run test
```
