import { ChangeEvent, ReactEventHandler } from "react"

interface FormFieldProps {
  labelName: string
  type: string
  name: string
  placeholder: string
  value: any
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  isSurpriseMe?: boolean
  handleSurpriseMe?: () => void
}

export const FormField = ({
  name,
  labelName,
  placeholder,
  isSurpriseMe,
  handleSurpriseMe,
  handleChange,
  type,
  value,
}: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>

        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
            Me Surpreenda
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  )
}