export default function handler(req,res){
const key = process.env.VT_API_KEY || "";
res.status(200).json({
length:key.length,
start:key.slice(0,5)
});
}
