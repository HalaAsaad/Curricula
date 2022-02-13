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
    labelTitle,
    ...rest
}) => {
    let Input = (
        <div className="field">
            <span className="p-float-label">
                <InputText value={value} onChange={onChange} name={name} {...rest} />
                <label>{labelTitle}</label>
            </span>
        </div>
    );
    if(varient === 'number') {
        Input = (
            <div className="field">
                <span className="p-float-label">
                    <InputNumber 
                    id={name}
                    value={+value} 
                    onChange={onChange} 
                    name={name} 
                    {...rest} />
                    <label>{labelTitle}</label>
                </span>
            </div>
        );
    } else if(varient === 'password') {
        Input = (
            <div className="field">
                <span className="p-float-label">
                    <Password 
                    id={name}
                    value={value} 
                    onChange={onChange} 
                    name={name} 
                    {...rest} />
                    <label>{labelTitle}</label>
                </span>
            </div>
        );
    } else if(varient === 'dropdown') {
        Input = (
            <div className="field">
                <span className="p-float-label">
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
                    <label>{labelTitle}</label>
                </span>
            </div>
        );
    } else if(varient === 'inputswitch') {
        Input = (
            <div style={{ display:'flex', alignItems:'center' }}>
                <InputSwitch 
                id={name}
                checked={value} 
                onChange={onChange} 
                name={name} 
                {...rest} />
                <label>&nbsp; {labelTitle}</label>
            </div>
        );
    }
    return (
        <>
        {Input}
        </>
    )   
   };
export default InputRender;

// const inputs = [
//     {
//         name: 'active',
//         labelTitle: 'Active',
//         varient: 'inputswitch'
//     },
//     {
//         IsGroup: true,
//         inputs: [
//             {
//                 name: 'name',
//                 labelTitle: 'Name',
//                 varient: 'text'
//             },
//             {
//                 name: 'description',
//                 labelTitle: 'Description',
//                 varient: 'text'
//             },
//         ]
//     }
// ]