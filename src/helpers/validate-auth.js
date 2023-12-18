// Metordo para proteger rutas y a la vez está siendo exportado
module.exports.isAuthenticated = (req,res,next)=>{
    // Si existe un inicio de sesión
    if(req.isAuthenticated()){
        // Continuar
        return next()
    }
    // Redireccionamiento
    res.redirect('/user/login')
}

// Redireccionar a la vista portafolios si el usuairo ya inició sesión
module.exports.redirectIfAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()) {
        return res.redirect('/portafolios');
    }
        return next();
}