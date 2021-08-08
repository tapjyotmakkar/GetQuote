# GetQuote
React UI baceked by .NET Web API to stores and retrieves a currency conversion quote

# Tools and technology used
    .net core
    .net core EF
    .net core in memory db
    react
    jest tests
    react-hook-form
    bootstrap

# Web API

* Open `getQuote.sln` in Visual Studio 2019 hit F5 and you should be presented with swagger endpoints listing
* Swagger link https://localhost:44325/swagger/index.html

#### Web API Assumptions
* The currencies list and rates on a given day are being sourced from free third party API's like freecurrencyconverter
* Just to demonstrate use of a data store for the test have used an in memory DB, else would use an Azure SQL DB/on premise one
* A first quote is created as part of the seeded data using DataSeeder.cs

# UI
* Open folder `getquotewebapp` in VSCode
* machine would need to npm and node installed on it
* on terminal type `npm install`
* then `npm start` and it should bring up UI on http://localhost:3000/

Tests
* To run the react app tests written in jest, type `npm test`
* To run backend test use test explorer in VS2019

# could'nt dos
* Would have hosted the web api and UI as containers in a K8 cluster using AZURE ACS and AKS
* Wanted to play around with react-hook-forms, else Formik with Material UI control library is a better way to do this using Dialogs and is a more elegant prod solution
* CI/CD pipelines in github
