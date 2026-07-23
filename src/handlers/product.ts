import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProduct = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            attributes: { exclude: ["createdAt", "updatedAt", "availability"]}
        })
        res.json({ data: products })
    } catch (error) {
        console.error(error)
    }

}

export const getProductById = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const products = await Product.findByPk(id as string)

        if (!products) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({ data: products })
    } catch (error) {
        console.error(error)
    }

}

export const createProduct = async (req: Request, res: Response) => {

    try {
        const saveProduct = await Product.create(req.body)
        res.json({ data: saveProduct })
    } catch (error) {
        console.error(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    const { id } = req.params
    const products = await Product.findByPk(id as string)

    if (!products) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // ACTUALIZAR PRODUCT
    await products.update(req.body)
    // GUARDAR PRODUCT ACTUALIZADO
    await products.save()

    res.json({ data: products })

}

export const updateAvailability = async (req: Request, res: Response) => {

    const { id } = req.params
    const products = await Product.findByPk(id as string)

    if (!products) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // ACTUALIZAR PRODUCT
    products.availability = !products.dataValues.availability
    // GUARDAR PRODUCT ACTUALIZADO
    await products.save()

    res.json({ data: products })

}

export const deleteProduct = async (req, res) => {

    const { id } = req.params
    const products = await Product.findByPk(id as string)

    if (!products) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // ELIMINAR PRODUCT
    await products.destroy()
    // GUARDAR PRODUCT ACTUALIZADO
    await products.save()

    res.json({ data: 'Producto Eliminado' })

}
