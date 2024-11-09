import { register,login,refresh_token } from "./handle_requests";
import { login_form,register_form } from "./Forms_classes";
import { jwtDecode } from 'jwt-decode'
export function Map_forms(type){
    switch(type){
        case 'register':
            return register_form
        case 'login':
            return login_form
    }
}

function request_mapper(type,body){
    switch(type){
        case 'register':
            return register(body)
        case 'login':
            return login(body)
        case 'token':
            return refresh_token(body)

    }
}

function help_submit(formData){
    const formObject={}
    const validation_errors={}
    var toggle=true;
    formData.forEach((value, key) => {
       if(key!='password-confirm'){
                validation_errors[key]=validate_input(key,value) 
       }
       else{
            validation_errors[key]=formObject['password']===value
       }
       if(!validation_errors[key]){
        toggle=false;
       }
       formObject[key]=value;
    });
    
    return toggle?{data:formObject,valid:true}:{error:validation_errors,valid:false}
}
function check_out(state,setPage,setLoggedin){
    switch(state){
        case 'register':
            setPage('login')
            break
        case 'login':
            setPage('home')
            setLoggedin(true)
            break
    }
}
function validate_input(type,input){
    switch(type.toLowerCase()){
        case 'username':
            return /^[A-Za-z][A-Za-z0-9]{4,}$/.test(input)
        case 'password':
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input)
        case 'email':
            return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(input)
        default:
            return true
    }
}
function resolve_status(result,setNotification,notification,setValidations,formData,type,setPage,setLoggedin){
    if(result.data.status==='success'){
        localStorage.setItem('accessToken', result.data.access_token);
        localStorage.setItem('refreshToken', result.data.refresh_token);
        
        check_out(type,setPage,setLoggedin)
        setNotification([result.data.message,(notification+1)%10])
        setValidations([]);
    }
    else if(result.data.status==='faliure'){
        let error_array={}
        formData.forEach((value,key)=>{
            if(result.data.errors[key]){
                error_array[key]=false;
                error_array[key+"error"]=result.data.errors[key]
            }
            else{
                error_array[key]=true;
            }
        })
        setNotification([result.data.message,(notification+1)%10])
        setValidations(error_array);
    }
}
export function handle_submit(event,type,setNotification,notification,setValidations,setPage,setLoggedin){
    event.preventDefault();
    const formData = new FormData(event.target);
    const submit_validated=help_submit(formData)
    if(submit_validated.valid){
        request_mapper(type,submit_validated.data).then((result)=>{
           resolve_status(result,setNotification,notification,setValidations,formData,type,setPage,setLoggedin)
        })
    }
    else{
        setValidations(submit_validated.error);
    }
    event.target.reset() 
}

export function validate_JWT(token){
    if (!token) return false;
    const decoded = jwtDecode(token);
    
    const now = Date.now() / 1000; 
    
    return decoded.exp > now;
}