import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import {validationState} from './helper'
import { initialForm } from './helper';
const App = () => {
  const [getForm,setForm]=useState(initialForm);
  const [getFormValidation, setFormValidation]= useState(validationState)
  const [getUserName, setusername] = useState('');
  const [getSubmit, setSubmit] = useState(false);

  useEffect(()=>{
    if(getSubmit){
      let email = getForm.email.split('@')[0];
      setusername(`Hello ${email}`)
    }
  },[getFormValidation]);

  const onChangeHandler=(event)=>{
    setForm({
      ...getForm,
      [event.target.name]:event.target.value
    })
  }

  const onSubmitHandler =()=>{
    let getFormValidationDetails = getFormValidation;

    for(let obj in getFormValidationDetails){
      if(getFormValidationDetails[obj]['required']&& getForm[obj]==''){
        getFormValidationDetails[obj]['status'] = "required"
      }else if(getFormValidationDetails[obj]['pattern'] && !getFormValidationDetails[obj]['pattern'].test(getForm[obj])){
        getFormValidationDetails[obj]['status'] = "pattern"
      }else{
        getFormValidationDetails[obj]['status'] = false
      }
    }
    setFormValidation({...getFormValidationDetails});
    setSubmit(true );
  }



  return (
      <div className="container">
          <div>
          Name:<input type="text" value={getForm.name} onChange={onChangeHandler} data-testid='name' name="name"/>
          {getFormValidation['name']['status'] && <div className='danger'>{getFormValidation['name']['status']=='required'? getFormValidation['name']['requiredError']:getFormValidation['name']['patternMessage']}</div>}
          </div>
          <div>
            Email address:<input type="email" value={getForm.email} onChange={onChangeHandler} data-testid='email' name="email"/>
            {getFormValidation['email']['status'] && <div className='danger'>
            {getFormValidation['email']['status']=='required'? getFormValidation['email']['requiredError']:getFormValidation['email']['patternMessage']}
            </div>}
          </div>
          <div>
            Gender:<select onChange={onChangeHandler} value={getForm.gender} data-testid='gender' name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
          </div>
          <div> 
            Phone Number:<input type="number" value={getForm.phoneNumber} onChange={onChangeHandler} data-testid='phoneNumber' name="phoneNumber"/>
            {getFormValidation['phoneNumber']['status'] && <div className='danger'>
            {getFormValidation['phoneNumber']['status']=='required'? getFormValidation['phoneNumber']['requiredError']:getFormValidation['phoneNumber']['patternMessage']}
            </div>}
          </div>
          <div>
            Password:<input type="password" value={getForm.password} onChange={onChangeHandler} data-testid='password' name="password"/>
            {getFormValidation['password']['status'] && <div className='danger'>
            {getFormValidation['password']['status']=='required'? getFormValidation['password']['requiredError']:getFormValidation['password']['patternMessage']}
            </div>}
          </div>
          <div>
            <button onClick={onSubmitHandler} data-testid='submit'>Submit</button>
          </div>

          <div>
            <h1 style={{color:"red"}}>{getUserName}</h1>
          </div>
      </div>
  )
}

export default App;























// import React, {Component, useState} from "react";
// import '../styles/App.css';

// const App = () => {
  // const [getForm,setForm]=useState({
  //   name:'',
  //   email:'',
  //   gender:'male',
  //   phoneNumber:'',
  //   password:''
  // });

//   const [getError,setError]=useState("");

//   const [username,setusername]=useState("");

//   const onChangeHandler=(event)=>{
//     setForm({
//       ...getForm,
//       [event.target.name]:event.target.value
//     })
//   }

//   const getErrorHandler=()=>{

//     if(!getForm.name && !getForm.email && !getForm.phoneNumber && !getForm.password){
//       setError('All fields are mandatory');
//       return true;
//     }

//     if(!getForm.name){
//       setError('Name Error')
//       return true;
//     }
//     if(!getForm.email){
//       setError('Email Error')
//       return true;
//     }
//     if(!getForm.phoneNumber){
//       setError('Phone Number Error')
//       return true;
//     }
//     if(!getForm.password){
//       setError('Password Error')
//       return true;
//     }
//     if(!/^[a-zA-Z)0-9\s]*$/.test(getForm.name)){
//       setError('Name is not alphanumeric');
//       return true;
//     }
//     if(!(getForm.email).includes("@")){
//       setError('Email must contain @');
//       return true;
//     }
//     if(!/^(male|female|other)$/.test(getForm.gender)){
//       setError('Please identify as male, female or others');
//       return true;
//     }
//     if(!/^[0-9]*$/.test(getForm.phoneNumber)){
//       setError('Phone Number must contain only numbers');
//       return true;
//     }
//     if(getForm.password.length<=6){
//       setError('Password must contain atleast 6 letters');
//       return true;
//     }

//     return false;
//   }
//   const onSubmitHandler=(event)=>{
//     event.preventDefault();
//     setError('');
//     setusername('');
//     if(getErrorHandler()){
//       return true;
//     }
//     let username=getForm.email.split("@")[0];
//     setusername(`Hello ${username}`);
//     clearInputs();

//   }

//   function clearInputs (){
//     setForm({
//     name:'',
//     email:'',
//     gender:'male',
//     phoneNumber:'',
//     password:''
//     })
//   };

  // return (
  //   <div className="container">
  //     <form>
  //       <div>
  //       Name:<input type="text" value={getForm.name} onChange={onChangeHandler} data-testid='name' name="name"/>
  //       </div>
  //       <div>
  //         Email address:<input type="email" value={getForm.email} onChange={onChangeHandler} data-testid='email' name="email"/>
  //       </div>
  //       <div>
  //         Gender:<select onChange={onChangeHandler} value={getForm.gender} data-testid='gender' name="gender">
  //         <option value="male">Male</option>
  //         <option value="female">Female</option>
  //         <option value="other">Others</option>
  //       </select>
  //       </div>
  //       <div>
  //         Phone:<input type="number" value={getForm.phoneNumber} onChange={onChangeHandler} data-testid='phoneNumber' name="phoneNumber"/>
  //       </div>
  //       <div>
  //         Password:<input type="password" value={getForm.password} onChange={onChangeHandler} data-testid='password' name="password"/>
  //       </div>
  //       <div>
  //         <button onClick={onSubmitHandler} data-testid='submit'>Submit</button>
  //       </div>
  //       {getError}
  //       {username && <h1>{username}</h1>}
  //     </form>
  //   </div>
//   )
// }


// export default App;
