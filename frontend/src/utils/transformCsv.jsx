// csvParser.js
const parseCSV = async (csvFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const result = [];
        const text = event.target.result;
        const lines = text.split('\n');

        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const values = line.split(',');
            const obj = {};

            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = values[j];
            }

            result.push(obj);
          }
        }

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(csvFile);
  });
};

export default parseCSV;
