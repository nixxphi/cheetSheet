const fs = require('fs');

// Function to load the synonym map into memory
function loadSynonymMap() {
  try {
    // Read the JSON file
    const data = fs.readFileSync('../data/synonym_map.json', 'utf8');
    const synonymMap = JSON.parse(data);
    return synonymMap;

  } catch (error) {
    console.error('Error loading synonym map:', error);
    return {};
  }
}


const synonymMapping = loadSynonymMap();

// Export the loaded synonym map for use in other modules
module.exports = synonymMapping;
