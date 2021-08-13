// @START HACKING
(function () {
  // Obtenemos la definicion de la funcion original
  let prop = Object.getOwnPropertyDescriptor(
    Intl.NumberFormat.prototype,
    'format',
  );

  // Sobrescribimos el método "format"
  Object.defineProperty(Intl.NumberFormat.prototype, 'format', {
    get: function () {
      return function (value) {
        let fn = prop.get.call(this), // Recuperamos la funcion "formateadora" original
          opts = this.resolvedOptions(); // Obtenemos las opciones de "formateo"

        // Solo cambiamos el formateo cuando es moneda en español y el numero es >= 1.000 o menor a 10.000
        if (
          opts.style == 'currency' &&
          opts.locale.substr(0, 2) == 'es' &&
          opts.numberingSystem == 'latn' &&
          value >= 1000 &&
          value < 10000
        ) {
          let num = fn(10000), // -> [pre]10[sep]000[sub]
            pre = num.substr(0, num.indexOf('10')),
            sep = num.substr(num.indexOf('10') + 2, 1),
            sub = num.substr(num.indexOf('000') + 3);
          num = value.toString();
          return pre + num.slice(0, 1) + sep + num.slice(1) + sub;
        }
        // Sino devolvemos el número formateado normalmente
        return fn(value);
      };
    },
  });
})();

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'CLP',
  }).format(number);
};

export const translateFirebaseError = (error) => {
  switch (error) {
    case 'auth/invalid-email':
      return 'Formato del email incorrecto.';
    case 'auth/user-not-found':
      return 'El usuario no se encuentra registrado.';
    case 'auth/email-already-in-use':
      return 'La cuenta de correo ya se encuentra en uso. Intenta con otra.';
    case 'auth/weak-password':
      return 'Contraseña debil. Intenta con otra.';
    case 'auth/too-many-requests':
      return 'Has excedido el numero de intentos.';
    default:
      return 'Ha ocurrido un error, intenta nuevamente.';
  }
};
