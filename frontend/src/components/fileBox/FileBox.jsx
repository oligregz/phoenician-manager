import { useState } from 'react';
import parseCSV from '../../utils/transformCsv';

const FileBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCSVData] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      try {
        const data = await parseCSV(file);
        setCSVData(data);
      } catch (error) {
        console.error('Erro ao processar o arquivo CSV:', error);
      }
    }
  };

  const handleValidateClick = () => {
    console.log(csvData);
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
