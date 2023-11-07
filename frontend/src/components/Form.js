import React from 'react';
import './Form.css';

function Form({ fields, onSubmit }) {

    return (
        <form className="generic-form" onSubmit={onSubmit}>
            {fields.map(field => (
                <div key={field.name}>
                    <input
                        className='form-input'
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={field.value || ""}
                        onChange={field.onChange}
                    />
                    {field.error && <div className="input-error">{field.error}</div>}
                </div>
            ))}
        </form>
    );
}

export default Form;

