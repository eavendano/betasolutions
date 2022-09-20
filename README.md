# Beta Solutions Tech

---

## Project Instructions

### How to run the project.

The project was developed on the LTS version of NodeJS.
Since this is a NodeJS project, please ensure to run `npm i` on your directory location, and you should be ready.
Once you're done installing dependencies, simply perform the `npm run dev` command and the port 7000 should be reado for
testing. We use a local JSON file as Database so if you want to start from scratch, feel free to clean the file.

### How to test the project.
Here you can use the `Localhost_7000.json` file from [Insomnia](https://insomnia.rest/) to load the request collection.
The collection should also work on Postman if you feel more comfortable using it. Once imported you should be able to
perform the requested operations on the localhost:7000 endpoint.

### Observations
On the salary report you can use the words `asc` and `desc` to check the lowest or highest salaries, depending on what
operation you need to perform.

Other technical observations include:
 - Error management, meaning that in some cases where you can expect a 404 regarding not found what you will
   receive is a 500 because of how the database works and the operations we can perform on top of it.
 - Logging, logs should help us to reproduce scenarios and bugs but at this point functionality was favored
   over the logging detail.
 - Validation location, we put the validation on the router components of the apps, but it turns out it does not favor
   good design, since the optimal place should be the services, the problem we faced was error management in a way, since
   seding specific errors at the moment of development was not thought of. A solution is to send specific objects in the
   error and parse the types and messages on a base component but this is pending.