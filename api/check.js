export default function handler(req,res){
res.status(200).json({
keyExists: !!process.env.VT_API_KEY
});
}
