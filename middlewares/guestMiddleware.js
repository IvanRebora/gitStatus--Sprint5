// Nivel: ruta
// Objetivo: Si el usuario esta registrado no permitir ingresar a login o register

function guestMiddleware(req, res, next) {
    // Primero pregunto si hay algun unsuario en session y lo redirijo a su perfil
    if (req.session.userLogged) {
        return res.redirect('/profile');
    }
    next();
};

module.exports = guestMiddleware;