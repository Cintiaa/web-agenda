const LocalStrategy = require('passport-local').Strategy
const Usuario = require('./models/usuario');


module.exports = function (passport) {
    //funções de serialização e desserialização de usuário
    //função done - nativa do passport e serve para sinalizar erro
    // e passar informações do usuário para o passport
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new LocalStrategy(function (username, password, done) {
        Usuario.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                done(err)
            } else {
                if (doc) {
                    var valid = doc.comparePassword(password, doc.password)
                    if (valid) {
                        // não adicione hash de senha à sessão
                        done(null, {
                            username: doc.username,
                            id: doc._id
                        })
                    } else {
                        done(null, false)
                    }
                } else {
                    done(null, false)
                }
            }
        })
    }))
}