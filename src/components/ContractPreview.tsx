import { ContractType, FormData } from '../types';
import { generateContractNumber } from '../utils/contractNumber';
import { formatDate } from '../utils/dateFormatter';

interface ContractPreviewProps {
  contractType: ContractType;
  formData: FormData;
}

export default function ContractPreview({ contractType, formData }: ContractPreviewProps) {
  const contractNumber = generateContractNumber();
  const currentDate = formatDate(new Date());

  const isComplete =
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
      true);

  const paymentMethodLabel = {
    transfer: 'Transferencia bancaria',
    cash: 'Efectivo',
    bizum: 'Bizum'
  }[formData.paymentMethod];

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-h-screen overflow-y-auto">
      <div id="contract-preview" className="prose prose-sm max-w-none">
        <div className="text-center mb-8 pb-8 border-b-2 border-gray-300">
          <h1 className="text-2xl font-bold text-gray-900 m-0">
            {contractType === 'services' && 'CONTRATO DE PRESTACIÓN DE SERVICIOS'}
            {contractType === 'rental' && 'CONTRATO DE ARRENDAMIENTO'}
            {contractType === 'collaboration' && 'CONTRATO DE COLABORACIÓN'}
          </h1>
          <p className="text-sm text-gray-600 mt-2 mb-0">Número: {contractNumber}</p>
          <p className="text-sm text-gray-600 mt-1 mb-0">Fecha: {currentDate}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            En {currentDate}, se celebra el presente contrato entre:
          </p>

          <div className="grid grid-cols-2 gap-6 my-6">
            <div className="border border-gray-200 p-4 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">PRIMERA PARTE</h3>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Nombre:</span> {formData.party1Name || '_______________'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">DNI:</span> {formData.party1DNI || '_______________'}
              </p>
            </div>

            <div className="border border-gray-200 p-4 rounded">
              <h3 className="font-semibold text-gray-900 mb-2">SEGUNDA PARTE</h3>
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">Nombre:</span> {formData.party2Name || '_______________'}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">DNI:</span> {formData.party2DNI || '_______________'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">CONDICIONES GENERALES</h2>

          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Fecha de inicio:</span> {formData.startDate ? formatDate(new Date(formData.startDate)) : '_______________'}
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Fecha de fin:</span> {formData.endDate ? formatDate(new Date(formData.endDate)) : '_______________'}
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Importe:</span> {formData.amount ? `${formData.amount} EUR` : '_______________'}
          </p>

          <p className="text-sm text-gray-700 mb-3">
            <span className="font-medium">Forma de pago:</span> {paymentMethodLabel || '_______________'}
          </p>
        </div>

        {contractType === 'services' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">DETALLES DEL SERVICIO</h2>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Descripción del servicio:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                {formData.serviceDescription || '_______________'}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Entregables pactados:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                {formData.deliverables || '_______________'}
              </p>
            </div>
          </div>
        )}

        {contractType === 'rental' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">DETALLES DEL INMUEBLE</h2>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Dirección del inmueble:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                {formData.propertyAddress || '_______________'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Fianza:</span> {formData.deposit ? `${formData.deposit} EUR` : '_______________'}
              </p>
            </div>
          </div>
        )}

        {contractType === 'collaboration' && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">DETALLES DE LA COLABORACIÓN</h2>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Descripción del proyecto:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                {formData.projectDescription || '_______________'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Porcentaje {formData.party1Name}:</span> {formData.party1Percentage || '___'}%
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Porcentaje {formData.party2Name}:</span> {formData.party2Percentage || '___'}%
              </p>
            </div>
          </div>
        )}

        {formData.additionalClauses && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">CLÁUSULAS ADICIONALES</h2>
            <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded">
              {formData.additionalClauses}
            </p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t-2 border-gray-300">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-12">Firma Parte 1</p>
              <p className="text-xs text-gray-600">_________________</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-12">Firma Parte 2</p>
              <p className="text-xs text-gray-600">_________________</p>
            </div>
          </div>
        </div>
      </div>

      {!isComplete && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">Completa todos los campos obligatorios para ver la vista previa completa</p>
        </div>
      )}
    </div>
  );
}
