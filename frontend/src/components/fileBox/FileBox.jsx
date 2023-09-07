import { useState, useEffect } from 'react';
import parseCSV from '../../utils/transformCsv';
import updateProduct from '../../service/product/update.service';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [validate, setValidate] = useState([]);
  const [isValid, setIsValide] = useState(false);

  useEffect(() => {
    console.log(csvData);
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
      await Promise.all(csvData.map(async (p) => {
        if (!p.code || !p.salesprice) {
          setIsValide(false)
          throw new Error('"code" or "salesprice" fields are not valid !')
        }
        console.log(p);
      }));
      setIsValide(true);
    } catch (e) {
      setIsValide(false);
      return `Erro: ${e}`;
    }
  };

  const handleUpdateProductclick = async () => {
    try {
      const results = await Promise.all(csvData.map(async (product) => {
        const productUpdated = await updateProduct(product);
        return productUpdated;
      }));
      setValidate(results)
      setIsValide(false);
    } catch (e) {
      setIsValide(false);
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
          <button onClick={handleUpdateProductclick}>Atualizar</button>
          ) : (
          <button onClick={handleValidateClick}>Validar</button>
        )
      }
    </div>
  );
};

export default FileBox;
