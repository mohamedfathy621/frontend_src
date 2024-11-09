import { register,login,refresh_token,get_medications,get_chart } from "./handle_requests";
import { login_form,register_form } from "./Forms_classes";
import { jwtDecode } from 'jwt-decode'
import { send_order } from "./handle_requests";
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
        localStorage.setItem('username',formData.get('username'))
        check_out(type,setPage,setLoggedin)
        setNotification([result.data.message,(notification+1)%10])
        setValidations([]);
    }
    else if(result.data.status==='failure'){
        let error_array={}
        console.log(result)
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

export function log_out(setNotification,setRefill_request,setTotal,setLogged,setPage,count){
    const confirm = window.confirm('are you sure you want to log out')
    if(confirm){
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem('username')
        sessionStorage.removeItem('refills')
        sessionStorage.removeItem('total')
        setNotification(['logged out',count+1])
        setRefill_request({})
        setTotal(0)
        setLogged(false)
        setPage('login')
    }
}

export function check_token(isMounted,setProducts,setPage,setLogged,setNotification,notification){
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem('refreshToken')
    if(validate_JWT(accessToken)){
        if(!isMounted.current){
          isMounted.current=true;
          get_medications(accessToken).then((result)=>{
          
            if(result.data.status==='success'){
              setProducts(result.data.medications)
            }
          
          })  
        }
        setLogged(true)
        setPage('home')
        setNotification(['welcome back',notification[1]+1])
      }
      else if(refreshToken){
        refresh_token({'refresh':refreshToken}).then((result)=>{
          console.log(result)
          if(result.data.status==='success'){
            setLogged(true)
            setNotification([result.data.message,notification[1]+1])
            localStorage.setItem('accessToken', result.data.access_token);
            localStorage.setItem('refreshToken', result.data.refresh_token);
          }
          else{
            setNotification([result.data.message,notification[1]+1])
            setLogged(false)
          }
        }) 
      }
      else{
        setLogged(false)
        sessionStorage.removeItem('refills')
        sessionStorage.removeItem('total')
        localStorage.removeItem('username')
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
}

export function ask_chart(){
    const accessToken = localStorage.getItem("accessToken");
    return get_chart(accessToken).then((result)=>{
        console.log(result.data)
        return result.data
    })
}

export function try_refresh(setNotification,setRefill_request,setTotal,setCart,count,total_price,refill_request){
    const confirm = window.confirm(`are you sure you want to submit your order`);
    if(confirm){
        const accessToken = localStorage.getItem("accessToken");
        const username = localStorage.getItem('username');
        send_order(accessToken,{'username':username,'totalprice':total_price,'orderlist':refill_request}).then((result)=>{
                console.log(result)
         })
         setNotification(['Order sent',count+1])
         setRefill_request({})
         setTotal(0)
         setCart(false)
         sessionStorage.removeItem('refills')
         sessionStorage.removeItem('total')
    }
}
export function handel_refill(product,refill_request,total_price,setTotal,setRefill_request){
    const confirm = window.confirm(`add ${product.name} to refill list`);
        if(confirm){
            const temp={...refill_request}
            if(!temp[product.name]){
                temp[product.name]={'quantaity':1,'price':product.price}
            }
            else{
                temp[product.name]={'quantaity':temp[product.name].quantaity+1,'price':product.price}
            }
            sessionStorage.setItem('refills', JSON.stringify(temp));
            sessionStorage.setItem('total',total_price+parseFloat(product.price))
            setTotal(total_price+parseFloat(product.price))
            setRefill_request(temp)
        }
}