const myLogger =  (req, res, next) => {
    console.log('LOGGED')
    next()
}

const auth =  (req,res,next) => {
    const token = "Hello";
    if(token){
        console.log("delete");
        next();
    } else{
        res.status(400).json({"error": "User not found"})
    }
}

export default (myLogger, auth)