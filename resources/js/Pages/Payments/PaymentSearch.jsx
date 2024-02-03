import React, { useState ,useEffect} from "react";
import { useForm, router, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryBtn from "@/Components/PrimaryBtn";
import Select, { components } from "react-select";
import InputError from '@/Components/InputError';



export default function PaymentSearch ({ className, customers, errors, customer_id }) {
    const { processing, recentlySuccessful } = useForm();
    let { flash } = usePage().props
    const Input = (props) =>
    {
        const { autoComplete = props.autoComplete } = props.selectProps;
        return <components.Input { ...props } autoComplete={ autoComplete } />;
    };

  

    const [optionsCustomers, setOptionsCustomers] = useState([])
    const [selectedOpt, setSelectedOpt] = useState('')

    const [optionsCustomersPhone, setOptionsCustomersPhone] = useState([])
    const [selectedOptPhone, setSelectedOptPhone] = useState('')

    const [optionsCustomersName, setOptionsCustomersName] = useState([])
    const [selectedOptName, setSelectedOptName] = useState('')

    const [values, setValues] = useState({
        display_name: '',
        mobile_number: '',
        customer_user_index: '',
        prev_balance: '',
        paid_amount: '',
        current_balance: '',
        notes: '',
        modify_user:''
    });

    const paindAmountChange =(e) =>{

        const current_balance = values.prev_balance - e.target.value

        setValues({
            ...values,
            paid_amount:e.target.value,
            current_balance: current_balance
        })
    }
  

    const getCustomers = () =>
    {
        let optionsCustomersArr = [];
        {
            customers.map((e) =>
            {
                optionsCustomersArr.push(
                    {
                        "value": e.id,
                        "label": e.customer_user_id
                    }
                );
            });
        }
        setOptionsCustomers(optionsCustomersArr)

        let optionsCustomersNameArr = [];
        {
            // console.log(customers)
            customers.map((e) =>
            {
                optionsCustomersNameArr.push(
                    {
                        "value": e.id,
                        "label": e.display_name
                    }
                );
            });
        }
        setOptionsCustomersName(optionsCustomersNameArr)

        let optionsCustomersPhoneArr = [];
        {
            customers.map((e) =>
            {
                optionsCustomersPhoneArr.push(
                    {
                        "value": e.id,
                        "label": e.mobile_number ?? e.mobile_number2
                    }
                );
            });
        }
        setOptionsCustomersPhone(optionsCustomersPhoneArr)
    }

    const getSelectedCustomer = (customer_id) =>
    {
        {
            let selectedRes = customers.filter(cus => customer_id == cus.id)
          
            setSelectedOpt(selectedRes[0]['customer_user_id'])
            setSelectedOptName(selectedRes[0]['display_name'])
            // selectedRes[0]['mobile_number'] && setSelectedOptPhone(selectedRes[0]['mobile_number'] + '-' + selectedRes[0]['mobile_number2'])
            selectedRes[0]['mobile_number'] ? setSelectedOptPhone(selectedRes[0]['mobile_number']) : setSelectedOptPhone('')
            
            // console.log(selectedRes[0]['balance'])
           
            setValues({ ...values, 
                prev_balance: selectedRes[0]['balance'], 
                customer_user_index: selectedRes[0]['customer_user_index'] ,
                display_name: selectedRes[0]['display_name'],
                mobile_number: selectedRes[0]['mobile_number'],
            })
        }
    }


    function customersNameHandleChange (e)
    {
        const value = e.value
       
        setValues(values => ({
            ...values,
            'display_name': value,
            'user_id': value,
        }))
        getSelectedCustomer(value)

       
    }

    function customersPhoneHandleChange (e)
    {
        const value = e.value
        // console.log(value);
        setValues(values => ({
            ...values,
            'mobile_number': value,
            'user_id': value,
        }))
        getSelectedCustomer(value)
    }

    useEffect(() =>
    {
        getCustomers()
        // customer_id ? getSelectedCustomer(customer_id) : ''
        
    }, [])

    function customersHandleChange (e)
    {
        const value = e.value
        // console.log(value);
        setValues(values => ({
            ...values,
            'user_id': value,
        }))
        getSelectedCustomer(value)
    }


    const submit = (e) =>
    {
        e.preventDefault();
        router.post('/payments/store', {payment:values})
        flash.status == 201 && location.reload()
    };

    const pageReset = (e) =>
    {
        router.get('/payments')
    }

  return (
      <div className="pt-12 ">
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-4">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <section className={ className }>
                      <header>
                          <h2 className="text-lg font-medium text-sky-600">Payments</h2>

                          {/* <p className="mt-1 text-sm text-gray-600">
                            Update your account's profile information and email address.
                        </p> */}
                      </header>

                      <form onSubmit={ submit } className="mt-6 space-y-6 ">
                          <div className='grid grid-cols-3 gap-4'>

                              <div>
                                  <InputLabel htmlFor="display_name" value="Name " className='required' />
                                  <Select
                                      name="display_name"
                                      className="autoselect border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                      components={ { Input } }
                                      autoComplete="user_id"
                                      value={ { value: values.display_name, label: selectedOptName } }
                                      options={ optionsCustomersName }
                                      onChange={ customersNameHandleChange }
                                      noOptionsMessage={ () => "No Data found..." }
                                  />
                                  {/* <InputError className="mt-2" message={ errors.display_name } /> */}
                              </div>

                              <div>
                                  <InputLabel htmlFor="mobile_number" value="mobile_number " className='required' />
                                  <Select
                                      name="mobile_number"
                                      className="autoselect border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                      components={ { Input } }
                                      autoComplete="user_id"
                                      value={ { value: values.mobile_number, label: selectedOptPhone } }
                                      options={ optionsCustomersPhone }
                                      onChange={ customersPhoneHandleChange }
                                      noOptionsMessage={ () => "No Data found..." }
                                  />
                                  {/* <InputError className="mt-2" message={ errors.mobile_number } /> */ }
                              </div>

                              <div>
                                  <InputLabel htmlFor="notes" value="notes" />

                                  <TextInput
                                      id="notes"
                                      className="mt-1 block w-full "
                                      value={ values.notes }
                                      isFocused
                                      autoComplete="notes"
                                      onChange={ (e) => setValues({ ...values, notes: e.target.value }) }
                                  />

                                  {/* <InputError className="mt-2" message={errors.name} /> */ }
                              </div>


                              </div>
                          <div className='grid grid-cols-3 gap-4'>

                              <div>
                                  <InputLabel htmlFor="prev_balance" value="prev_balance" />

                                  <TextInput
                                      id="prev_balance"
                                      className="mt-1 block w-full bg-gray-100"
                                      defaultValue={ values.prev_balance }
                                      isFocused
                                      autoComplete="prev_balance"
                                      readOnly={ true }

                                    //   onChange={ (e) => setData('prev_balance', e.target.value) }
                                  />

                                  {/* <InputError className="mt-2" message={errors.name} /> */ }
                              </div>

                              <div>
                                  <InputLabel htmlFor="paid_amount" value="paid_amount" />

                                  <TextInput
                                      id="paid_amount"
                                      className="mt-1 block w-full "
                                      value={ values.paid_amount }
                                      isFocused
                                      autoComplete="paid_amount"
                                      onChange={ (e) => paindAmountChange(e)}
                                  />

                                  {/* <InputError className="mt-2" message={errors.name} /> */ }
                              </div>

                              <div>
                                  <InputLabel htmlFor="current_balance" value="current_balance" />

                                  <TextInput
                                      id="current_balance"
                                      className="mt-1 block w-full bg-gray-100"
                                      defaultValue={ values.current_balance }
                                      isFocused
                                      autoComplete="current_balance"
                                      readOnly={ true }
                                    
                                    //   onChange={ (e) => setData('current_balance', e.target.value) }
                                  />

                                  {/* <InputError className="mt-2" message={errors.name} /> */ }
                              </div>

                          </div>


                          <div className="flex items-center gap-4">
                              <PrimaryButton disabled={ processing }>Paid</PrimaryButton>
                              <PrimaryBtn disabled={ processing } onClick={ pageReset } className="resetBtn">Reset</PrimaryBtn>

                              {/* <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition> */}
                          </div>

                      </form>
                  </section>
              </div>
          </div>
      </div >
  )
}
