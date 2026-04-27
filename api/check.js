export default async function handler(req, res) {
try {
res.status(200).json({
keyExists: !!process.env.VT_API_KEY,
keyStart: process.env.VT_API_KEY?.slice(0,6) || null
});
} catch {
res.status(200).json({
keyExists:false
});
}
}
