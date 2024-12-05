interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({label, placeholder, value, onChange, type = 'text'}:InputProps) {
    return (
        <div className="mb-4">
            <label className="text-sm text-white mb-1 block font-bold">{label}</label>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 rounded-md border-none outline-none bg-colorText2 text-colorText placeholder-colorText"
            />
        </div>
    );
};