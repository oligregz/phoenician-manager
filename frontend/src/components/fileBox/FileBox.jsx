import React, { useState, useEffect } from 'react';
import parseCSV from '../../utils/transformCsv';
import updateProduct from '../../service/product/update.service';
import checkRules from '../../utils/businessRules';
import { getName, getCurrentPrice } from '../../utils/nameAndCurrentPrice';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);
  const [validate, setValidate] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productNames, setProductNames] = useState({});
  const [productPrices, setProductPrices] = useState({});
  const [isFileAttached, setIsFileAttached] = useState(false); // Novo estado para verificar se um arquivo está anexado

  useEffect(() => {
  }, [csvData]);

  useEffect(() => {
    // Atualize o estado isFileAttached quando um arquivo for selecionado ou removido
    setIsFileAttached(!!selectedFile);
  }, [selectedFile]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      try {
        const data = await parseCSV(file);
        setCSVData(data);
        setErrorMessage(null);

        const names = {};
        const prices = {};
        await Promise.all(data.map(async (product) => {
          names[product.code] = await getName(product.code);
          prices[product.code] = await getCurrentPrice(product.code);
        }));
        setProductNames(names);
        setProductPrices(prices);
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
        if (rules.error) {
          isValid = false;
          errorMessages.push(rules.error);
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
      {errorMessage && <div>
            <h2>Errors alidate:</h2>
            <p>{errorMessage}</p>
            <h2>Attach another file</h2>
          </div>}
      {isFileAttached ? ( // Verifica se um arquivo está anexado antes de mostrar o botão "Validate(Validar)"
        isValid ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Current price</th>
                  <th>New Price</th>
                </tr>
              </thead>
              <tbody>
                {csvData.map((product, index) => (
                  <tr key={index}>
                    <td>{product.code}</td>
                    <td>{productNames[product.code]}</td>
                    <td>{productPrices[product.code]}</td>
                    <td>{product.salesprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleUpdateProductClick}>Update(Atualizar)</button>
          </div>
        ) : (
          <div>
            <button onClick={handleValidateClick}>Validate(Validar)</button>
          </div>
        )
      ) : (
        <div>
          <button disabled>Validate(Validar)</button> {/* Desabilita o botão se nenhum arquivo estiver anexado */}
        </div>
      )}
    </div>
  );
};

export default FileBox;
