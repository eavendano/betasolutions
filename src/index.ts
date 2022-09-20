import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import {initializeDB} from "./config/dbconfig";
import {rolesRouter} from "./routers/roles.router";
import {employeeRouter} from "./routers/employees.router";
import {departmentsRouter} from "./routers/departments.router";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const DBNAME: string = process.env.DBNAME as string;

initializeDB(DBNAME);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/roles", rolesRouter);
app.use("/employees", employeeRouter);
app.use("/departments", departmentsRouter)


app.listen(PORT, () => {
    console.log(`Application running on port: ${PORT}`);
});