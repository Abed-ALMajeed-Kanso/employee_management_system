import * as mongodb from 'mongodb';
import { Employee } from './employee';

export const collections : {
    employees?: mongodb.Collection<Employee>;
} = {}

export async function connectToDatabase (uri: string){
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackProject");
    await applySchemaValidation(db);

    const employeesConnection = db.collection<Employee>('employees');
    collections.employees = employeesConnection;
}
async function applySchemaValidation(db: mongodb.Db){
    const jsonSchema = {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "position", "level"],
          additionalProperties: false,
          properties: {
            _id: {
              bsonType: "objectId",
              description: "'_id' must be an ObjectId if provided",
            },
            name: {
              bsonType: "string",
              description: "'name' is required and must be a string",
            },
            position: {
              bsonType: "string",
              description: "'position' is required and must be a string with a minimum length of 5",
              minLength: 5,
            },
            level: {
              bsonType: "string",
              description: "'level' is required and must be one of 'junior', 'mid', or 'senior'",
              enum: ["junior", "mid", "senior"],
            },
          },
        },
      };

    await db.command({
        collMod: 'employess',
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) =>{
        if(error.codeName === 'NamespaceNotFound'){
            await db.createCollection('employees', {validator: jsonSchema})
        }
    })
}