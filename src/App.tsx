import { useState } from 'react';
import { Download } from 'lucide-react';
import ContractTypeSelector from './components/ContractTypeSelector';
import ContractForm from './components/ContractForm';
import ContractPreview from './components/ContractPreview';
import { ContractType, FormData } from './types';
import { generatePDF, generatePDFFilename } from './utils/pdfGenerator';

function App() {
  const [contractType, setContractType] = useState<ContractType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    party1Name: '',
    party1DNI: '',
    party2Name: '',
    party2DNI: '',
    startDate: '',
    endDate: '',
    amount: '',
    paymentMethod: 'transfer',
    additionalClauses: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleContractTypeSelect = (type: ContractType) => {
    setContractType(type);
    setFormData({
      party1Name: '',
      party1DNI: '',
      party2Name: '',
      party2DNI: '',
      startDate: '',
      endDate: '',
      amount: '',
      paymentMethod: 'transfer',
      additionalClauses: ''
    });
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const filename = generatePDFFilename();
      await generatePDF('contract-preview', filename);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.party1Name &&
      formData.party1DNI &&
      formData.party2Name &&
      formData.party2DNI &&
      formData.startDate &&
      formData.endDate &&
      formData.amount &&
      formData.paymentMethod &&
      ((contractType === 'services' && formData.serviceDescription && formData.deliverables) ||
        (contractType === 'rental' && formData.propertyAddress && formData.deposit) ||
        (contractType === 'collaboration' && formData.projectDescription && formData.party1Percentage && formData.party2Percentage) ||
        false)
    );
  };

  if (!contractType) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <ContractTypeSelector selectedType={null} onTypeSelect={handleContractTypeSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Generador de Contratos</h1>
            </div>
            <button
              onClick={() => setContractType(null)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Cambiar tipo
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContractForm
              contractType={contractType}
              formData={formData}
              onFormChange={setFormData}
            />

            <button
              onClick={handleDownloadPDF}
              disabled={!isFormValid() || isGenerating}
              className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                isFormValid() && !isGenerating
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download size={20} />
              {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
            </button>
          </div>

          <div>
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Vista previa</h2>
              <ContractPreview contractType={contractType} formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
