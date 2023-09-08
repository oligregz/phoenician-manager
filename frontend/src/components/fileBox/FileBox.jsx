import React, { useState, useEffect } from 'react';
import parseCSV from '../../utils/transformCsv';
import updateProduct from '../../service/product/update.service';
import checkRules from '../../utils/businessRules';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [validate, setValidate] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const errorMessages = [];

      await Promise.all(csvData.map(async (p) => {
        const rules = await checkRules(p);
        if (rules !== true) {
          isValid = false;
          errorMessages.push(rules.message);
        }
      }));

      setIsValid(isValid);
      setErrorMessage(errorMessages.length > 0 ? errorMessages.join(', ') : null);
    } catch (e) {
      setIsValid(false);
      setErrorMessage(`${e}`);
    }
  };

  const handleUpdateProductClick = async () => {
    try {
      const results = await Promise.all(csvData.map(async (product) => {
        const productUpdated = await updateProduct(product);
        return productUpdated;
      }));
      setValidate(results);
      setIsValid(false);
    } catch (e) {
      setIsValid(false);
      setErrorMessage(`${e}`);
    }
  };

  return (
    <div>
      <div>FileBox</div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {selectedFile && (
        <p>Selected CSV file: {selectedFile.name}</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      {isValid ? (
        <button onClick={handleUpdateProductClick}>Atualizar</button>
      ) : (
        <button onClick={handleValidateClick}>Validar</button>
      )}
    </div>
  );
};

export default FileBox;