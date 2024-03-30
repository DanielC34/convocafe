export default async function handler(req, res) {
    const data = req.body
    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({id: "1", email: data.email, name: "John Doe"})
}