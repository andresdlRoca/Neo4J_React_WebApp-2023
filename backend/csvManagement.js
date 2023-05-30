const neo4j = require('neo4j-driver');
const fs = require('fs');
const csv = require('csv-parser');

// Neo4j connection details
const uri = 'bolt://127.0.0.1:7687';
const username = 'neo4j';
const password = 'password';

// CSV file path
const path = require('path');
const csvFilePath = path.join(__dirname, '../csv/Data_01.csv');

// Create a Neo4j driver instance
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));


async function addNodeToNeo4j(session, labels, properties) {
    // Filter properties with empty values
    const filteredProperties = Object.fromEntries(
      Object.entries(properties).filter(([_, value]) => value !== '')
    );
  
    // Check if any properties remain after filtering
    if (Object.keys(filteredProperties).length === 0) {
      console.log('Skipping node creation as all properties are empty.');
      return;
    }
  
    const result = await session.run(
      `MERGE (n:${labels.join(':')})
      SET n = $properties
      RETURN n`,
      { properties: filteredProperties }
    );
    console.log(`Added node with labels [${labels.join(', ')}] and properties:`, filteredProperties);
  }
  
  
  
  // Generate a string of properties for a Cypher query
function generatePropertiesString(properties) {
    const propertyStrings = Object.entries(properties)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${key}: ${formatValue(value)}`);
    return `{${propertyStrings.join(', ')}}`;
  }
  
  
  // Format a value for a Cypher query
  function formatValue(value) {
    if (typeof value === 'string') {
      return `"${value}"`;
    } else if (typeof value === 'boolean') {
      return value.toString();
    } else {
      return value;
    }
  }
  


const promises = [];

// Read the CSV file and add data to Neo4j
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const labels = row.label.split(',');
    const properties = { ...row };
    delete properties.label;

    // Create a new Neo4j session
    const session = driver.session();

    // Call the function to add the node to Neo4j
    const promise = addNodeToNeo4j(session, labels, properties)
      .catch((error) => console.error(error))
      .finally(() => session.close());

    promises.push(promise);
  })
  .on('end', async () => {
    try {
      await Promise.all(promises);
      console.log('CSV processing finished.');
    } catch (error) {
      console.error(error);
    } finally {
      driver.close();
    }
  });

// ...
