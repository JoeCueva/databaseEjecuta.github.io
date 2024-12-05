var { Usuario } = require("../config/Relaciones")
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
    let datos = req.body
    let datoVerificar = Object.entries(datos).length
    console.log(datos
    )
    
    // console.log(newUsuario)
    if(datoVerificar != 0){
        // console.log(datos)
        let { password } = datos
        let newUsuario = await Usuario.build(datos)
        console.log(newUsuario)
        newUsuario.setearPassword( password )
        newUsuario.save()
        return res.status(201).json({
            ok: true,
            content: newUsuario,
            message: "Usuario registrado exitosamente"
        })
        // console.log("datos ingresados")
    }else{
        return res.status(404).json({
            ok: false,
            content: "",
            message: "DATOS NO INGRESADOS"
        })
    }
    // const {password} = req.body
    // console.log(req.body)
    // let newUsuario = Usuario.build(req.body)
    // console.log(newUsuario)
    // newUsuario.setearPassword( password )
    // await newUsuario.save()
    // return res.status(201).json({
    //     ok: true,
    //     content: newUsuario,
    //     message: "Usuario registrado exitosamente"
    // })
    
}

const login = async (req, res) => {
    console.log(req.body)
    const {  email, password } = req.body
    const usuarioEncontrar = await Usuario.findOne({
        where: {
            usuEmail: email
        }
    }).catch(error => {
        console.log(error)
    })
    console.log(usuarioEncontrar)
    if(usuarioEncontrar){
        // console.log(true)
        const validarPassword = usuarioEncontrar.validatePassword(password)
        if(validarPassword){
            const token = usuarioEncontrar.generarJWT()
            return res.status(200).json({
                ok: true,
                content: token,
                message: "Login Exitosamente"
            })
        }else{
            return res.status(401).json({
                ok: false,
                content: null,
                message: "La contraseña es incorrecta"
            })
        }
    }else{
        return res.status(401).json({
            ok: false,
            content: null,
            message: "El usuario o email es Incorrecto"
        })
    }
}
// console.log(req.headers.token)
const verifyToken = async (req, res) => {
    const tokenHeader = req.headers["authorization"].split(" ")[1]
    console.log(tokenHeader)
    const verficateToken = function(token){
        const tokenVerify = jwt.verify(token,"password", (err, auth) => {
            // console.log(auth)
            // console.log(err)
            if(err){
                return res.json({
                    ok: false,
                    content: err
                })
            }else{
                return res.json({
                    ok: true,
                    message: "Token aun intacta",
                })
            }
        })
    }
    verficateToken(tokenHeader)
}

module.exports = {
    registrar,
    login,
    verifyToken,
}