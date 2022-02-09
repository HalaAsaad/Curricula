import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import {InputSwitch} from 'primereact/inputswitch';
import {Password} from 'primereact/password';

const InputRender = ({
    value,
    onChange,
    varient,
    options,
    optionLabel,
    optionValue,
    name,
    ...rest
}) => {
    let Input = (
        <>
        <InputText value={value} onChange={onChange} name={name} {...rest} />
        </>
    );
    if(varient === 'number') {
        Input = (
            <>
            <InputNumber 
            id={name}
            value={+value} 
            onChange={onChange} 
            name={name} 
            {...rest} />
            </>
        );
    } else if(varient === 'password') {
        Input = (
            <>
            <Password 
            id={name}
            value={value} 
            onChange={onChange} 
            name={name} 
            {...rest} />
            </>
        );
    } else if(varient === 'dropdown') {
        Input = (
            <>
            <Dropdown 
            id={name}
            name={name}
            optionLabel={optionLabel}
            optionValue={optionValue}
            value={value} 
            onChange={onChange} 
            options={options}
            {...rest}
            />
            </>
        );
    } else if(varient === 'inputswitch') {
        Input = (
            <>
            <InputSwitch 
            id={name}
            checked={value} 
            onChange={onChange} 
            name={name} 
            {...rest} />
            </>
        );
    }
    return (
       <div>
        {Input}
       </div>
    )   
   };
export default InputRender;