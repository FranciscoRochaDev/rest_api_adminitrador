import { Router } from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
* @swagger
*  components:
*      schemas:
*          Product:
*              type: object
*              properties:
*                  id:
*                      type: integer
*                      description: The product ID
*                      example: 1
*                  name:
*                      type: string
*                      description: The product name
*                      example: Monitor
*                  price:
*                      type: number
*                      description: The product price
*                      example: 300
*                  availability:
*                      type: boolean
*                      description: The product availability
*                      example: true
* 
* 
*/

/** 
* @swagger 
*   /api/products:
*       get:
*           summary: Get a list of products 
*           tags:
*               - Products
*           description: Return a list of products
*           responses:
*               200:
*                   description: Successfull Response
*                   content:
*                       application/json:
*                           schema:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/Product'
* 
*/
// Routing
router.get("/", getProduct)

/**
* @swagger
* 
* /api/products/{id}:
*   get:
*       summary: Get a product by ID 
*       tags:
*           - Products
*       description: Return a product based on its unique ID
*       parameters:
*           - in: path
*             name: id
*             description: The ID of the product to retrieve 
*             required: true
*             schema:
*                  type: integer
*       responses:
*           200:
*               description: Successful Response
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Product'
*           404:
*               description: Not found
*           400:
*               description:  Bad Request - Invalid ID
*/
router.get("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

/**
* @swagger
*   /api/products:
*       post:
*           summary: create a new product
*           tags:
*               - Products
*           description: Returns a new record in the database
*           requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name:
*                                   type: string
*                                   example: "Macbook pro M5"
*                               price:
*                                   type: number
*                                   example: 400
*       responses: 
*           201:
*              description: Product Created succesfully
*           400:
*              description: Bad request - invalid input data 
*   
*/

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

/**
* @swagger
* 
* /api/products/{id}:
*   put:
*       summary: Updates a product with user input
*       tags:
*           - Products
*       description: Returns the update products
*       parameters:
*           - in: path
*             name: id
*             description: 
*             required: true
*             schema:
*                  type: integer
*       requestBody:
*             required: true
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             name:
*                                 type: string
*                                 example: "Macbook pro M5"
*                             price:
*                                 type: number
*                                 example: 400
*       responses:
*             201:
*              description: Successful response
*              content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Product'
*             400:
*              description: Bad Request - Invalid ID or Invalid input data
*             404:
*              description: Not found
*/
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

/**
 * @swagger
* /api/products/{id}:
*  patch:
*      sumary: Update Product availability
*      tags:
*           - Products
*      description: Returns update availability
*      parameters:
*           - in: path
*             name: id
*             description: 
*             required: true
*             schema:
*                  type: integer
*      responses:
*          201:
*           description: Successful response
*           content:
*                application/json:
*                    schema:
*                        $ref: '#/components/schemas/Product'
*          400:
*           description: Bad Request - Invalid ID
*          404:
*           description: Not found
*/
router.patch("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
* /api/products/{id}:
*  delete:
*      sumary: Update Product availability
*      tags:
*           - Products
*      description: Returns update availability
*      parameters:
*           - in: path
*             name: id
*             description: 
*             required: true
*             schema:
*                  type: integer
*      responses:
*          200:
*           description: Successful response
*           content:
*                application/json:
*                    schema:
*                        type: string
*/
router.delete("/:id",
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router
