const NFT = require("../Model/nftModel")

exports.getAllNfts = async(req,res,next) => {
    try{
    const Nft = await NFT.find();

    //SEND RESPONSE
    res.status(200).json({
        status: success,
        results: Nft.length,
        data : {
            Nft
        }
    })}catch(error){
        next(error)
    }
}

exports.getNft = async(req, res, next) => {
    try {
    const nft = await NFT.findById(req.params.id);
        if (!nft) {
            return res.status(404).json({
                status: 'fail',
                message: 'No NFT found with that ID'
            });
        }
    
        res.status(200).json({
            status: 'success',
            data: {
                nft
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.createNft = async(req, res, next) => {
    try {
    const newNft = await NFT.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                nft: newNft
            }
        });
    } catch (error) {
        next(error);
    }
}