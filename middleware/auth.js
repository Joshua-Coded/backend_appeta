import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized, login required" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Authentication failed" });
    }
}

export default authMiddleware;