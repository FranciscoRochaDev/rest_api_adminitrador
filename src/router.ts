import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

// Routing
router.get("/", getProduct)

router.get("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

router.post("/",

    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valid')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)

router.put("/:id",
    param('id').isInt().withMessage('ID no valido'),
    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valid')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para Disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

router.patch("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router
