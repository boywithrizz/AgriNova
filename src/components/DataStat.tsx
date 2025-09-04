export default function DataStat({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}{unit ? ` ${unit}` : ''}</span>
    </div>
  )
}
