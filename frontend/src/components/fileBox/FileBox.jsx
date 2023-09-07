import { useState } from 'react';
import parseCSV from '../../utils/transformCsv';
import updateProduct from '../../service/product/update.service';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [validate, setValidate] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      try {
        const data = await parseCSV(file);
        setCSVData(data);
      } catch (e) {
        console.error(`Error processing CSV file: ${e}`);
        throw e;
      }
    }
  };

  const handleValidateClick = async () => {
    try {
      const results = await Promise.all(csvData.map(async (product) => {
        const productUpdated = await updateProduct(product);
        return productUpdated;
      }));
      setValidate(results)
      console.log(`FileBox | line: 34 | validate: ${validate}`);
    } catch (e) {
      return `Erro: ${e}`;
    }
  };

  return (
    <div>
      <div>FileBox</div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {selectedFile && (
        <p>Selected CSV file: {selectedFile.name}</p>
      )}
      <button onClick={handleValidateClick} >Validar</button>
    </div>
  );
};

export default FileBox;
