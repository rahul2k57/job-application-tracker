function InputField({ label, type, name, placeholder, value, onChange }) {
    return (
        <div className="mb-5">
            <label className="block text-base font-medium text-slate-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-md
                    border
                    border-slate-300
                    px-4
                    py-3
                    text-base
                    text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:border-indigo-500
                    focus:ring-1
                    focus:ring-indigo-500
                    transition
                    duration-150
                "
            />
        </div>
    );
}

export default InputField;