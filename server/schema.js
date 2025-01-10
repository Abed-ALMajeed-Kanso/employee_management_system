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
  