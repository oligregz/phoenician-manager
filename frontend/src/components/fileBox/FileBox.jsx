import { useState, useEffect } from 'react';
import parseCSV from '../../utils/transformCsv';
import updateProduct from '../../service/product/update.service';
import checkRules from '../../utils/businessRules';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [validate, setValidate] = useState([]);
  const [isValid, setIsValidate] = useState(false);

  useEffect(() => {
  }, [csvData]);

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
      let isValid = true;
  
      await Promise.all(csvData.map(async (p) => {
        const rules = await checkRules(p);
        if (rules !== true) {
          isValid = false; 
        }
      }));
  
      setIsValidate(isValid);
    } catch (e) {
      setIsValidate(false);
      console.error(e);
      throw e;
    }
  };

  const handleUpdateProductClick = async () => {
    try {
      const results = await Promise.all(csvData.map(async (product) => {
        const productUpdated = await updateProduct(product);
        return productUpdated;
      }));
      setValidate(results)
      setIsValidate(false);
    } catch (e) {
      setIsValidate(false);
      return `Erro: ${e}`;
    }
  }

  return (
    <div>
      <div>FileBox</div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {selectedFile && (
        <p>Selected CSV file: {selectedFile.name}</p>
      )}
      {
        isValid ? 
        (
          <button onClick={handleUpdateProductClick}>Atualizar</button>
          ) : (
          <button onClick={handleValidateClick}>Validar</button>
        )
      }
    </div>
  );
};

export default FileBox;
