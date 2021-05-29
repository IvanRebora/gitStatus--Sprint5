// Nivel: ruta
// Objetivo: Si el usuario esta registrado/logueado pero no en session, hago redirect a la vista login

function authMiddleware(req, res, next) {
    // Primero pregunto si NO hay algun unsuario en session
    console.log('req.session.userLogged en middleware');
    console.log(req.session.userLogged);
    if (!req.session.userLogged) {
        return res.redirect('/login');
    }
    next();
};

module.exports = authMiddleware;