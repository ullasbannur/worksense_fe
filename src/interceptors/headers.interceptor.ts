import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');

  const cloneReq= req.clone({
    setHeaders:{
      Authorization: `${token}`
    }
  })

  return next(cloneReq);
  // return next(req);

};
