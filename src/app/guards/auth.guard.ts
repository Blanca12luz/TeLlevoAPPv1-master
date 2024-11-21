import { AuthService } from './../service/auth.service';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = async (route, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);
  let isLoggedIn = await _auth.isLoggedIn();
  if (isLoggedIn) {
    const userInstance = await _auth.getUserInstance();
    console.log(userInstance);
    if (userInstance.tipo == 0 || userInstance.tipo == 1) {
      _router.navigate(['/tabs']);
    } else {
      _router.navigate(['/tipocuenta']);
    }
    // Si es FALSE, se permite el acceso a la ruta
    return false;
  }
  // Si es TRUE, se deniega manda a la ruta de login
  return true;
};
