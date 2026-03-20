/**
 * Middleware de autorização por role (só para o portal admin).
 * Deve ser usado APÓS o middleware `authenticate`.
 *
 * @example
 * router.delete("/users/:id", authenticate, authorize("ADMIN"), deleteUser);
 */
export function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Não autenticado.",
            });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Não tem permissão para realizar esta ação.",
            });
            return;
        }
        next();
    };
}
