export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    //recorro el arreglo de bojetos con los errores y muestro los msjs de error
    return res.status(400).json({ error: error.issues.map((e) => e.message) });
  }
};
