import { RouteLocation } from "vue-router";

const haveRoleGuard = (to:RouteLocation, from:RouteLocation, next: any) => {
    //Accedemos al token almacenado en el localStorage. 
    const userToken = localStorage.getItem('token');
    //Si hay token, podremos acceder a la vista. Si no, mostramos alerta y volvemos al login
    if(userToken){
        next();
    }else{
        alert('You need a token to access');
        next({name: 'login'});
    }
}

export default haveRoleGuard;