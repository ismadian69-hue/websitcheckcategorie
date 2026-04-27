module.exports = (req,res) => {
const k = process.env.VT_API_KEY;
res.status(200).json({
ok:true,
len:k.length,
first:k.substring(0,5),
last:k.substring(k.length-5)
});
};
