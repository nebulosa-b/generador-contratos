import { useState } from 'react';
import { Download, ArrowLeft, FileText } from 'lucide-react';
import ContractTypeSelector from './components/ContractTypeSelector';
import ContractForm from './components/ContractForm';
import ContractPreview from './components/ContractPreview';
import { ContractType, FormData } from './types';
import { generatePDF, generatePDFFilename } from './utils/pdfGenerator';

const emptyForm: FormData = {
  party1Name: '',
  party1DNI: '',
  party2Name: '',
  party2DNI: '',
  startDate: '',
  endDate: '',
  amount: '',
  paymentMethod: 'transfer',
  additionalClauses: ''
};

function App() {
  const [contractType, setContractType] = useState<ContractType | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleContractTypeSelect = (type: ContractType) => {
    setContractType(type);
    setFormData(emptyForm);
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
      <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
        <header className="px-8 py-6 flex items-center gap-3">
          <FileText size={20} className="text-[#1a1a1a]" />
          <span className="text-sm font-medium tracking-widest text-[#1a1a1a] uppercase">Contratos</span>
        </header>
        <div className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="w-full max-w-lg">
            <div className="mb-12">
              <h1 className="text-4xl font-light text-[#1a1a1a] tracking-tight leading-tight mb-3">
                Genera contratos<br />
                <span className="italic text-[#666]">en segundos.</span>
              </h1>
              <p className="text-sm text-[#999] tracking-wide">Selecciona el tipo de contrato para comenzar</p>
            </div>
            <ContractTypeSelector selectedType={null} onTypeSelect={handleContractTypeSelect} />
          </div>
        </div>
      </div>
    );
  }

  const typeLabel = {
    services: 'Prestación de Servicios',
    rental: 'Arrendamiento',
    collaboration: 'Colaboración'
  }[contractType];

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F7F6F3]/90 backdrop-blur-sm border-b border-[#E8E6E0] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setContractType(null)}
              className="flex items-center gap-2 text-sm text-[#999] hover:text-[#1a1a1a] transition-colors"
            >
              <ArrowLeft size={15} />
              Volver
            </button>
            <div className="w-px h-4 bg-[#E0DDD8]" />
            <span className="text-sm text-[#1a1a1a] font-medium">{typeLabel}</span>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={!isFormValid() || isGenerating}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              isFormValid() && !isGenerating
                ? 'bg-[#1a1a1a] text-white hover:bg-[#333] shadow-sm'
                : 'bg-[#E8E6E0] text-[#B0ADA8] cursor-not-allowed'
            }`}
          >
            <Download size={14} />
            {isGenerating ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Formulario */}
          <div>
            <ContractForm
              contractType={contractType}
              formData={formData}
              onFormChange={setFormData}
            />
          </div>

          {/* Preview */}
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium tracking-widest text-[#999] uppercase">Vista previa</span>
              <div className={`w-2 h-2 rounded-full transition-colors ${isFormValid() ? 'bg-emerald-400' : 'bg-[#D0CEC8]'}`} />
            </div>
            <ContractPreview contractType={contractType} formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
