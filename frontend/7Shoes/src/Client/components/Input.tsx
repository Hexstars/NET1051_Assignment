import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label?: string;
    icon?: string;
    inputRef?: React.Ref<HTMLInputElement>; // Allow passing a ref
    containerClass?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, label, icon, inputRef, containerClass = "input-wrapper", className, ...props }, ref) => {
    return (
        <div className={containerClass}>
            {label && <label htmlFor={id} className="input-label">{label}</label>}
            <div className="input-group">
                <input ref={inputRef || ref} 
                id={id} 
                className={`input-field ${className}`}
                style={{ height: "40px", padding: "10px", fontSize: "16px" }}  
                {...props} />
                {icon && <i className="material-symbols-rounded">{icon}</i>}
            </div>
        </div>
    );
});

export default Input;
