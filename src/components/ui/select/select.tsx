type SelectProps = {
    options: {id: number | string; name: string}[]
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    className?: string
    placeholder?: string
}

export const Select = ({
    options,
    value,
    onChange,
    className = '',
    placeholder = 'Select an option',
}: SelectProps) => {
    const borderStyle = 'border border-gray-500 rounded'
    const focusStyle = 'focus:outline-none focus:ring-2 focus:ring-blue-500 '
    const layoutStyle = 'w-full h-10 px-3 py-2'
    return (
        <select
            className={`${borderStyle} ${focusStyle} ${layoutStyle} bg-slate-800 cursor-pointer text-sm ${className}`}
            value={value}
            onChange={onChange}
        >
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}
