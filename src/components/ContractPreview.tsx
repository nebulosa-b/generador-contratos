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

  const paymentMethodLabel = {
    transfer: 'Transferencia bancaria',
    cash: 'Efectivo',
    bizum: 'Bizum'
  }[formData.paymentMethod];

  const typeTitle = {
    services: 'Contrato de Prestación de Servicios',
    rental: 'Contrato de Arrendamiento',
    collaboration: 'Contrato de Colaboración'
  }[contractType];

  const blank = (val?: string) => val || '_______________';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E8E6E0] overflow-hidden max-h-[75vh] overflow-y-auto">
      <div id="contract-preview" className="p-10 font-serif">

        {/* Cabecera */}
        <div className="text-center mb-10 pb-8 border-b border-[#E8E6E0]">
          <p className="text-[10px] tracking-[0.2em] text-[#999] uppercase mb-4">Documento privado</p>
          <h1 className="text-xl font-semibold text-[#1a1a1a] leading-tight mb-3">
            {typeTitle}
          </h1>
          <div className="flex items-center justify-center gap-6 text-xs text-[#999]">
            <span>Nº {contractNumber}</span>
            <span className="w-1 h-1 rounded-full bg-[#D0CEC8]" />
            <span>{currentDate}</span>
          </div>
        </div>

        {/* Partes */}
        <div className="mb-8">
          <p className="text-xs text-[#666] leading-relaxed mb-6">
            En {currentDate}, se celebra el presente contrato entre las siguientes partes:
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Primera parte', name: formData.party1Name, dni: formData.party1DNI },
              { label: 'Segunda parte', name: formData.party2Name, dni: formData.party2DNI },
            ].map((p) => (
              <div key={p.label} className="bg-[#F7F6F3] rounded-xl p-5">
                <p className="text-[10px] tracking-widest text-[#999] uppercase mb-3">{p.label}</p>
                <p className="text-sm text-[#1a1a1a] font-medium mb-1">{blank(p.name)}</p>
                <p className="text-xs text-[#666]">DNI: {blank(p.dni)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Condiciones generales */}
        <div className="mb-8">
          <p className="text-[10px] tracking-widest text-[#999] uppercase mb-4">Condiciones generales</p>
          <div className="space-y-2">
            {[
              { label: 'Fecha de inicio', value: formData.startDate ? formatDate(new Date(formData.startDate)) : undefined },
              { label: 'Fecha de fin', value: formData.endDate ? formatDate(new Date(formData.endDate)) : undefined },
              { label: 'Importe', value: formData.amount ? `${formData.amount} EUR` : undefined },
              { label: 'Forma de pago', value: paymentMethodLabel },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-baseline py-2 border-b border-[#F0EDE8]">
                <span className="text-xs text-[#999]">{row.label}</span>
                <span className="text-xs text-[#1a1a1a] font-medium">{blank(row.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campos específicos por tipo */}
        {contractType === 'services' && (
          <div className="mb-8 space-y-5">
            <p className="text-[10px] tracking-widest text-[#999] uppercase">Detalles del servicio</p>
            <div>
              <p className="text-xs text-[#999] mb-2">Descripción</p>
              <p className="text-xs text-[#1a1a1a] bg-[#F7F6F3] rounded-lg p-4 leading-relaxed whitespace-pre-wrap min-h-[48px]">
                {blank(formData.serviceDescription)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#999] mb-2">Entregables</p>
              <p className="text-xs text-[#1a1a1a] bg-[#F7F6F3] rounded-lg p-4 leading-relaxed whitespace-pre-wrap min-h-[48px]">
                {blank(formData.deliverables)}
              </p>
            </div>
          </div>
        )}

        {contractType === 'rental' && (
          <div className="mb-8 space-y-5">
            <p className="text-[10px] tracking-widest text-[#999] uppercase">Detalles del inmueble</p>
            <div>
              <p className="text-xs text-[#999] mb-2">Dirección</p>
              <p className="text-xs text-[#1a1a1a] bg-[#F7F6F3] rounded-lg p-4 leading-relaxed whitespace-pre-wrap min-h-[48px]">
                {blank(formData.propertyAddress)}
              </p>
            </div>
            <div className="flex justify-between items-baseline py-2 border-b border-[#F0EDE8]">
              <span className="text-xs text-[#999]">Fianza</span>
              <span className="text-xs text-[#1a1a1a] font-medium">{formData.deposit ? `${formData.deposit} EUR` : blank()}</span>
            </div>
          </div>
        )}

        {contractType === 'collaboration' && (
          <div className="mb-8 space-y-5">
            <p className="text-[10px] tracking-widest text-[#999] uppercase">Detalles de la colaboración</p>
            <div>
              <p className="text-xs text-[#999] mb-2">Proyecto</p>
              <p className="text-xs text-[#1a1a1a] bg-[#F7F6F3] rounded-lg p-4 leading-relaxed whitespace-pre-wrap min-h-[48px]">
                {blank(formData.projectDescription)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: formData.party1Name || 'Parte 1', val: formData.party1Percentage },
                { label: formData.party2Name || 'Parte 2', val: formData.party2Percentage },
              ].map((p) => (
                <div key={p.label} className="bg-[#F7F6F3] rounded-xl p-4 text-center">
                  <p className="text-xs text-[#999] mb-1">{p.label}</p>
                  <p className="text-2xl font-light text-[#1a1a1a]">{p.val || '—'}<span className="text-sm text-[#999]">{p.val ? '%' : ''}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.additionalClauses && (
          <div className="mb-8">
            <p className="text-[10px] tracking-widest text-[#999] uppercase mb-3">Cláusulas adicionales</p>
            <p className="text-xs text-[#1a1a1a] bg-[#F7F6F3] rounded-lg p-4 leading-relaxed whitespace-pre-wrap">
              {formData.additionalClauses}
            </p>
          </div>
        )}

        {/* Firmas */}
        <div className="mt-12 pt-8 border-t border-[#E8E6E0]">
          <div className="grid grid-cols-2 gap-8">
            {[formData.party1Name || 'Parte 1', formData.party2Name || 'Parte 2'].map((name) => (
              <div key={name} className="text-center">
                <div className="h-16 border-b border-[#D0CEC8] mb-3" />
                <p className="text-xs text-[#999]">{name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
